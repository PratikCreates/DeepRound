# DeepRound MVP Implementation Plan

This document outlines the architecture, data models, and API contracts for the DeepRound MVP. DeepRound is a voice-first builder readiness and project defense platform, designed for the OpenAI x Outskill 7-Day AI Builders Hackathon.

---

## 1. Technical Stack & Deployment Targets

* **Frontend & Orchestration**: Next.js 14 (App Router) + TypeScript + TailwindCSS
* **Database**: PostgreSQL (Supabase or Neon) + Prisma ORM + Zod schema runtime validation
* **Background Processing**: Modal Python Workers + Modal Volumes
* **Voice MVP**: push-to-talk turn-based voice loop using browser speech primitives first, with Hugging Face Inference for reasoning/feedback and OpenAI-compatible provider abstraction reserved for later upgrade
* **Models**: Hugging Face Inference API first for extraction, JD matching, scoring, feedback, and deployment testing
* **Auth**: **Simple passwordless demo auth** (Next.js middleware + session cookie mapping to the `User` table by email) to maximize development speed and eliminate third-party OAuth setup friction.
* **Hosting**: Vercel (Next.js App) + Modal Cloud (workers) + Supabase/Neon (Postgres)

---

## 2. Directory Structure (ASCII Format)

```txt
DeepRound/
  prisma/
    schema.prisma            # Database schemas & migrations
  modal/
    workers.py               # Modal background workers
    requirements.txt         # Modal runtime python packages
  src/
    app/
      api/
        voice/
          browser/
            route.ts         # Optional helper route for browser voice loop config
        profile/
          route.ts           # Profile CRUD operations
        dumpflex/
          route.ts           # Ingests DumpFlex raw items
        jd/
          analyze/
            route.ts         # Extracts JD capabilities
        github/
          inspect/
            route.ts         # Asynchronous inspection trigger
        voice/
          session/
            route.ts         # Initializes sessions
          session/[id]/
            route.ts         # Turn operations & session completion
      profile/
        page.tsx             # Builder Profile editor
      playground/
        page.tsx             # Voice Playground interface
      dumpflex/
        page.tsx             # DumpFlex inbox
      jd/
        page.tsx             # Job Description matcher
      page.tsx               # Home Dashboard
    components/
      dashboard/             # Dashboard panels & statistics
      profile/               # Profile and claim lists
      voice/                 # Browser voice and transcript interface components
      ui/                    # Premium glassmorphic design elements
    lib/
      ai/
        providers/
          openai-compatible.ts # Reserved adapter for future OpenAI-compatible providers
          huggingface.ts       # Hugging Face serverless task wrapper
          mock.ts            # Local mock fixtures provider
        router.ts            # AI task router logic
      db.ts                  # Database client instantiation
      modal/
        client.ts            # Client wrapper for calling Modal endpoints
      schemas/
        builder-profile.ts   # Zod validation for BuilderProfile
        ai-outputs.ts        # Zod validation for LLM extractions
        voice-session.ts     # Zod validation for transcript states
      prompts/
        extract-profile.ts   # System prompts for profile extraction
        analyze-jd.ts        # Prompts for JD mapping
        score-voice.ts       # Prompts for technical scoring
      cache.ts               # Local cache for expensive AI outputs
    styles/
      globals.css            # Style tokens & custom classes
```

---

## 3. Database Schema (Prisma Model)

We use PostgreSQL `JSONB` columns to store structured payload data, validated by Zod at the application boundaries. The `transcript` column in `VoiceSession` is nullable; application code defaults it to `[]` if null, avoiding Postgres JSON default insertion issues.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String         @id @default(uuid())
  email         String         @unique
  passwordHash  String?        // Not used during passwordless email session
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  profile       Profile?
  dumpflexItems DumpflexItem[]
  voiceSessions VoiceSession[]
}

model Profile {
  id          String   @id @default(uuid())
  userId      String   @unique
  profileData Json     // Validated by BuilderProfileSchema
  version     Int      @default(1)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model DumpflexItem {
  id                String   @id @default(uuid())
  userId            String
  type              String   // "raw_note" | "commit" | "pr" | "screenshot" | "link"
  content           String
  extractedEntities Json?    // Draft entities extracted from the note
  sourceRef         Json?    // Tracks origin files or links
  status            String   @default("needs_review") // "needs_review" | "approved" | "ignored"
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VoiceSession {
  id                 String    @id @default(uuid())
  userId             String
  mode               String    // "rapid_fire" | "deep_round" | "jd_attack" | "project_defense" | "hackathon_pitch"
  status             String    @default("active") // "active" | "completed"
  targetRole         String?
  targetCompany      String?
  startedAt          DateTime  @default(now())
  endedAt            DateTime?
  transcript         Json?     // Application defaults to `[]` when reading. Stores [{ speaker, text, timestamp }]
  summary            String?
  technicalScore     Float?
  communicationScore Float?
  feedbackReport     Json?     // Full scoring evaluation details
  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt
  user               User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

## 4. Metadata Formats inside JSONB

### 4.1 Resume / Ingestion Sources (Stored inside `profileData.sources[]`)
To keep the Postgres database lightweight, the raw uploaded binary resume file is parsed instantly and discarded, storing only the extracted text and metadata:
```ts
type SourceMetadata = {
  id: string;
  type: "resume";
  fileName: string;
  sourceHash: string;
  parsedAt: string;
  extractionConfidence: number;
  extractedText: string;
};
```

### 4.2 Job Progress (Stored inside `profileData.system.jobs[]`)
Asynchronous processing states (e.g., repo analysis) are tracked strictly under `profileData.system.jobs[]`:
```ts
type JobMetadata = {
  id: string;
  type: "github_inspection" | "resume_extraction";
  status: "pending" | "completed" | "failed";
  error?: string;
  createdAt: string;
  completedAt?: string;
};
```

---

## 5. Runtime & Provider Routing Architecture

### 5.1 Configurable Provider Router (`src/lib/ai/router.ts`)
To protect our credit budget and prevent model drift, models are read from environment variables with safe defaults.

```ts
export type ModelProvider = "huggingface" | "openai-compatible" | "mock";

export type ModelTask =
  | "extract_profile"
  | "analyze_jd"
  | "classify_dumpflex"
  | "rank_projects"
  | "score_transcript"
  | "generate_voice_question"
  | "generate_feedback";

interface TaskConfig {
  provider: ModelProvider;
  model: string;
}

export function getTaskConfig(task: ModelTask, devMode = false): TaskConfig {
  if (devMode) {
    return { provider: "mock", model: "local-fixture" };
  }
  
  switch (task) {
    case "generate_voice_question":
    case "score_transcript":
    case "generate_feedback":
    case "extract_profile":
    case "analyze_jd":
    case "classify_dumpflex":
    case "rank_projects":
      return {
        provider: "huggingface",
        model: process.env.HF_INFERENCE_MODEL || "meta-llama/Llama-3.1-8B-Instruct"
      };
    default:
      return { provider: "mock", model: "local-fixture" };
  }
}
```

---

## 6. API Contracts Specifications

### 6.1 `GET /api/voice/browser`
* **Purpose**: Returns browser voice-loop configuration for the push-to-talk MVP. This does not require OpenAI credentials.
* **Response Status**: `200 OK`
* **Response Body**:
  ```json
  {
    "speechRecognition": true,
    "speechSynthesis": true,
    "mode": "push_to_talk"
  }
  ```

### 6.2 `GET /api/profile`
* **Purpose**: Fetches current builder profile.
* **Response Status**: `200 OK`
* **Response Body**:
  ```json
  {
    "id": "prof_123",
    "profileData": {
      "identity": { "name": "John Doe", "email": "john@doe.com" },
      "projects": [],
      "skills": [],
      "claims": [],
      "sources": [],
      "system": { "jobs": [] }
    },
    "version": 1
  }
  ```

### 6.3 `PATCH /api/profile`
* **Purpose**: Merges edits or additions to the builder profile.
* **Request Body**: Partial updates to `profileData`.
* **Response Status**: `200 OK`
* **Response Body**:
  ```json
  { "success": true, "version": 2 }
  ```

### 6.4 `POST /api/dumpflex`
* **Purpose**: Adds text updates or commit strings to the review inbox.
* **Request Body**:
  ```json
  {
    "type": "raw_note" | "commit",
    "content": "Added RAG vector search latency optimization measuring 45ms P99."
  }
  ```
* **Response Status**: `201 Created`
* **Response Body**:
  ```json
  {
    "id": "df_abc123",
    "status": "needs_review"
  }
  ```

### 6.5 `POST /api/jd/analyze`
* **Purpose**: Extracts skills and requirements from JD.
* **Request Body**:
  ```json
  {
    "jdText": "Looking for an engineer experienced in FastAPI and PGVector..."
  }
  ```
* **Response Status**: `200 OK`
* **Response Body**:
  ```json
  {
    "requiredSkills": ["FastAPI", "PGVector"],
    "profileGaps": ["PGVector"],
    "projectRecommendations": [
      { "projectId": "p_rag", "relevanceScore": 0.92 }
    ]
  }
  ```

### 6.6 `POST /api/github/inspect`
* **Purpose**: Triggers background repository analysis on Modal.
* **Request Body**:
  ```json
  {
    "repoUrl": "https://github.com/user/repo"
  }
  ```
* **Response Status**: `202 Accepted`
* **Response Body**:
  ```json
  {
    "jobId": "job_inspect_999",
    "status": "pending"
  }
  ```

### 6.7 `POST /api/voice/session`
* **Purpose**: Initializes a new voice practice session.
* **Request Body**:
  ```json
  {
    "mode": "deep_round",
    "targetRole": "AI Engineer",
    "targetCompany": "Target Company"
  }
  ```
* **Response Status**: `201 Created`
* **Response Body**:
  ```json
  {
    "sessionId": "sess_888",
    "status": "active"
  }
  ```

### 6.8 `PATCH /api/voice/session/:id`
* **Purpose**: Appends transcripts/turns. Used for fallback modes or tracking turns.
* **Request Body**:
  ```json
  {
    "speaker": "user" | "ai",
    "text": "My vector database setup utilizes HNSW indexing."
  }
  ```
* **Response Status**: `200 OK`
* **Response Body**:
  ```json
  { "success": true }
  ```

### 6.9 `POST /api/voice/session/:id/finish`
* **Purpose**: Finalizes session and triggers post-session evaluation scoring.
* **Response Status**: `200 OK`
* **Response Body**:
  ```json
  {
    "sessionId": "sess_888",
    "status": "completed",
    "scores": {
      "technical": 8.5,
      "communication": 7.8
    },
    "feedbackReport": {
      "summary": "Demonstrated strong knowledge of HNSW indexes but missed details on pruning factors.",
      "gaps": ["Index recall parameters"]
    }
  }
  ```

---

## 7. Verification and Testing Checklist

### Automated Verification
* Run validation tests against raw mock model outputs using Zod schema fixtures.
* Prisma DB seed verification: Populate tables with mock user and profile models to verify Prisma schema configurations.

### Manual Verification
* Profile extraction test: Ingest test resume PDF, verify extracted skills populate correct JSONB properties.
* JD matching test: Paste sample JD, verify project recommendation rankings update dynamically.
* Browser voice loop test: Verify push-to-talk capture, transcript creation, and spoken response playback.
* Provider fallback test: Verify mock and Hugging Face providers can both generate drill questions and feedback.
* Golden-path cache test: Verify that cached queries return sub-second response times for demo consistency.
