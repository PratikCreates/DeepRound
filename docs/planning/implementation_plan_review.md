# DeepRound Implementation Plan Review

Review target: `implementation_plan.md`

Date: 2026-05-25

## Executive Verdict

The proposed architecture is directionally correct for the 7-day MVP.

I would approve the three main decisions with constraints:

1. **Next.js + TypeScript**: approve.
2. **PostgreSQL + Prisma**: approve, but keep schema JSONB-first and avoid relational expansion during the hackathon.
3. **Modal background workers**: approve, but restrict workers to static analysis, parsing, and async jobs. Do not put the realtime voice loop on Modal.

The main architectural change I would make is to add a clear provider abstraction and a stricter runtime split:

```txt
Realtime UX path -> Next.js client + OpenAI Realtime / fallback push-to-talk
Async intelligence path -> Next.js API routes -> Modal workers -> OpenAI/HF providers
Persistent state -> Postgres JSONB via Prisma
Demo safety -> cached perfect-path data + mock providers
```

The current implementation plan is solid as a starting draft, but it needs a few additions before coding starts:

- provider abstraction for OpenAI / Hugging Face / mock
- shared Zod schemas for `BuilderProfile`, `VoiceSession`, and AI outputs
- explicit auth decision
- file/artifact storage decision
- WebRTC token/session endpoint design
- Modal job status and retry flow
- production deployment target and database provider
- stricter Day-1/Day-2 voice spike deadline

---

## 1. Framework Choice: Next.js + TypeScript

### Decision

Approve.

The proposed framework choice in `implementation_plan.md:9` is the right default for this hackathon.

### Why It Works

Next.js + TypeScript gives DeepRound:

- one repo for frontend and backend API routes
- fast UI iteration
- typed application code
- easy dashboard construction
- direct API route integration for OpenAI session creation
- good deployment path through Vercel or similar platforms
- strong ecosystem for auth, forms, file uploads, and realtime UI

For DeepRound, the product needs to look polished quickly. Next.js is a good fit because the dashboard, profile editor, DumpFlex inbox, JD matcher, and voice playground are mostly web-app UX problems.

### Key Constraint

Do not overload Next.js API routes with long-running jobs.

Use Next.js for:

- UI rendering
- user actions
- lightweight API orchestration
- realtime session token creation
- reading/writing Postgres
- calling Modal endpoints

Do not use Next.js for:

- cloning GitHub repos
- large resume parsing jobs
- heavy batch model processing
- long-running background analysis
- sandboxed code/repo inspection

Those belong in Modal.

### Recommended Change

Add these directories to the proposed structure:

```txt
src/
  lib/
    ai/
      providers/
        openai.ts
        huggingface.ts
        mock.ts
      router.ts
    schemas/
      builder-profile.ts
      ai-outputs.ts
      voice-session.ts
    prompts/
      extract-profile.ts
      analyze-jd.ts
      score-voice.ts
    modal/
      client.ts
```

Reason: the current directory plan has `lib/` but does not explicitly separate provider routing, schemas, and prompts. Those will become hard to manage once OpenAI, HF, mocks, and Modal are all involved.

---

## 2. TypeScript and Schema Validation

### Decision

Use TypeScript, but do not rely on TypeScript alone.

### Required Addition

Add Zod schemas for the core JSON objects.

Why: the database stores flexible JSONB. TypeScript types disappear at runtime. Zod gives runtime validation before data enters `profileData`, `transcript`, or `feedbackReport`.

Recommended schemas:

```txt
BuilderProfileSchema
ProjectSchema
ClaimSchema
EvidenceItemSchema
DumpflexExtractionSchema
JDAnalysisSchema
ProjectRankingSchema
VoiceTurnSchema
FeedbackReportSchema
```

This is especially important because model outputs can be malformed.

### Practical Rule

Every LLM output should pass through:

```txt
raw model output -> JSON parse -> Zod validation -> normalized object -> database
```

If validation fails, store the raw output in logs but do not mutate the user profile.

---

## 3. Database Choice: PostgreSQL + Prisma

### Decision

Approve with caveats.

The choice in `implementation_plan.md:11` matches the agreed 4-table JSONB schema and is pragmatic for a 7-day MVP.

### Why It Works

Postgres gives:

- reliable persistence
- JSONB support
- easy future migration to normalized tables
- compatibility with Supabase/Neon/Railway
- query flexibility

Prisma gives:

- typed DB client
- simple migrations
- good developer speed
- clean local setup

### Main Caveat

Prisma’s `Json` type is convenient, but it does not give deep type safety inside JSONB columns. You still need Zod schemas at the application boundary.

### Schema Feedback

The four-table schema is correct, but I would adjust a few fields.

#### `User`

Current plan includes `passwordHash` at `implementation_plan.md:54`.

For the hackathon, decide early:

Option A: Use simple local/demo auth.

```txt
email + passwordHash
```

Option B: Use hosted auth.

```txt
Clerk / Supabase Auth / Auth.js
```

Recommendation: if this is a fast hackathon app, use Supabase Auth or Clerk if already familiar. If not, keep `passwordHash` but do not overbuild auth flows.

Add:

```prisma
updatedAt DateTime @updatedAt
```

#### `Profile`

Current `Profile` is good.

Add:

```prisma
createdAt DateTime @default(now())
version   Int      @default(1)
```

Reason: versioning helps with profile refresh and diff logic.

#### `DumpflexItem`

Add defaults and timestamps:

```prisma
status    String   @default("needs_review")
updatedAt DateTime @updatedAt
sourceRef Json?
```

Reason: DumpFlex needs review lifecycle and source tracking.

#### `VoiceSession`

Current schema has several required fields that should be optional while a session is in progress.

At `implementation_plan.md:99`, `endedAt` should be optional:

```prisma
endedAt DateTime?
```

These should also be optional or have defaults:

```prisma
summary            String?
technicalScore     Float?
communicationScore Float?
feedbackReport     Json?
```

Add:

```prisma
status String @default("active")
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
```

Reason: a voice session is created before transcript and scoring exist.

### Recommended Prisma Schema Shape

```prisma
model User {
  id            String         @id @default(uuid())
  email         String         @unique
  passwordHash  String?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  profile       Profile?
  dumpflexItems DumpflexItem[]
  voiceSessions VoiceSession[]
}

model Profile {
  id          String   @id @default(uuid())
  userId      String   @unique
  profileData Json
  version     Int      @default(1)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model DumpflexItem {
  id                String   @id @default(uuid())
  userId            String
  type              String
  content           String
  extractedEntities Json?
  sourceRef         Json?
  status            String   @default("needs_review")
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VoiceSession {
  id                 String    @id @default(uuid())
  userId             String
  mode               String
  status             String    @default("active")
  targetRole         String?
  targetCompany      String?
  startedAt          DateTime  @default(now())
  endedAt            DateTime?
  transcript         Json      @default("[]")
  summary            String?
  technicalScore     Float?
  communicationScore Float?
  feedbackReport     Json?
  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt
  user               User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

Note: verify Prisma support for JSON defaults with the selected database/provider. If JSON defaults create friction, set them in application code instead.

---

## 4. Modal as Execution Engine

### Decision

Approve.

The Modal decision in `implementation_plan.md:13` is technically strong and differentiates the project.

### Correct Uses

Use Modal for:

- GitHub repo static inspection
- resume parsing workers
- JD analysis workers
- DumpFlex processing
- transcript post-processing
- parallel feedback agents
- scheduled refresh jobs
- sandbox experiments

### Do Not Use Modal For

Do not use Modal for:

- realtime voice loop
- low-latency interruption
- simple CRUD
- UI state
- auth

### GitHub Worker Scope

Keep repo inspection static.

Worker should inspect:

```txt
README.md
package.json
requirements.txt
pyproject.toml
Dockerfile
docker-compose.yml
.env.example
src/app routes
API route files
schema files
config files
test folders
```

Do not run arbitrary user code.

Clone with:

```txt
git clone --depth 1
```

Add limits:

```txt
max repo size
max files scanned
max file size
allowed extensions
ignore node_modules, .git, dist, build, .next, venv
```

### Modal Job Model

Next.js should call Modal asynchronously and track job state.

Minimum flow:

```txt
POST /api/github/inspect
        ↓
create pending job record or return request id
        ↓
call Modal endpoint
        ↓
Modal processes repo
        ↓
Next.js stores result in profileData or DumpFlex suggestions
        ↓
UI shows review card
```

Because there is no separate jobs table in the 4-table MVP, job state can be stored inside `profileData.system.jobs` or `dumpflex_items.extractedEntities.processingStatus`.

If this becomes messy, add a fifth `jobs` table only if necessary. Do not add it on Day 1.

---

## 5. Provider Routing Gap

### Observation

The implementation plan does not yet include the provider routing strategy from `plan.md`.

This is a significant omission because credits are split across OpenAI, Modal, and Hugging Face.

### Required Addition

Add a provider router:

```ts
type ModelProvider = "openai" | "huggingface" | "mock";

type ModelTask =
  | "extract_profile"
  | "analyze_jd"
  | "classify_dumpflex"
  | "rank_projects"
  | "score_transcript"
  | "generate_hackathon_story"
  | "generate_voice_question"
  | "generate_feedback";
```

Routing rule:

```txt
OpenAI -> realtime voice and final-quality reasoning
Hugging Face -> cheap async experiments and fallback extraction
Mock -> repeated UI testing and demo fixtures
Modal -> execution layer, not model provider by itself
```

This should be implemented early because it affects API design.

---

## 6. Realtime Voice Architecture

### Decision

The plan is directionally correct, but needs more technical detail.

`implementation_plan.md:123` includes the WebRTC Day-3 deadline. Good.

### Required Endpoints

Add:

```txt
POST /api/realtime/session
POST /api/voice/session/start
PATCH /api/voice/session/:id/turn
POST /api/voice/session/:id/finish
```

Responsibilities:

- create OpenAI Realtime ephemeral session/token
- create local `VoiceSession` row
- append transcript turns
- finalize session
- trigger post-session scoring worker

### Fallback Mode

Fallback should be:

```txt
push-to-talk
browser speech recognition where available
text transcript preview
OpenAI text response
browser speech synthesis or OpenAI audio if available
post-session feedback
```

Do not add Deepgram/ElevenLabs unless already integrated.

### Product Rule

Realtime technical probing can interrupt.

Communication feedback should not interrupt during MVP.

Communication Coach should run post-session only:

- filler words
- pacing
- answer length
- structure
- clarity

This matches the updated plan.

---

## 7. File and Artifact Storage

### Gap

The implementation plan mentions resume upload but does not specify storage.

### Recommendation

For MVP:

Option A: store extracted text only in `profileData.sources`.

Option B: use Supabase Storage / S3-compatible storage for original files.

Given the 7-day constraint, I recommend:

```txt
Do not store large files in Postgres.
Store extracted text + metadata in JSONB.
Store original files only if the hosting/database setup makes it trivial.
```

Minimum source object inside `profileData`:

```ts
{
  id: "src_resume_1",
  type: "resume",
  fileName: "resume.pdf",
  extractedText: "...",
  sourceHash: "...",
  createdAt: "...",
  lastAnalyzedAt: "..."
}
```

---

## 8. Directory Structure Review

### Current Issue

The directory tree in `implementation_plan.md` has encoding artifacts. Replace box drawing characters with plain ASCII for portability.

### Recommended Structure

```txt
DeepRound/
  prisma/
    schema.prisma
  modal/
    workers.py
    requirements.txt
  src/
    app/
      api/
        realtime/session/route.ts
        profile/route.ts
        dumpflex/route.ts
        jd/analyze/route.ts
        github/inspect/route.ts
        voice/session/route.ts
      profile/page.tsx
      playground/page.tsx
      dumpflex/page.tsx
      jd/page.tsx
      page.tsx
    components/
      dashboard/
      profile/
      voice/
      ui/
    lib/
      ai/
        providers/
        router.ts
      db.ts
      modal/client.ts
      schemas/
      prompts/
      cache.ts
    styles/
      globals.css
```

---

## 9. Roadmap Review

### Current Roadmap

The 3-phase roadmap is reasonable, but the voice risk needs to move earlier.

### Change I Recommend

Start the WebRTC spike on Day 1, not Day 3.

Day 3 should be the decision deadline, not the first serious attempt.

Recommended adjustment:

```txt
Day 1: create OpenAI Realtime token endpoint and minimal browser connection spike
Day 2: test transcript capture and turn handling
Day 3: decide WebRTC or fallback permanently
```

Reason: voice is the demo’s highest-risk technical component. If it fails, the product loses its strongest differentiator.

---

## 10. Verification Plan Review

### Current Plan

The verification section in `implementation_plan.md:133` is too light for the complexity.

### Recommended Verification

Keep tests minimal but targeted:

Automated:

```txt
Zod schema validation tests
provider router mock tests
Prisma seed script
profile extraction fixture test
JD matching fixture test
```

Manual:

```txt
create profile
add project
add DumpFlex note
paste JD
rank project
start voice session
finish voice session
generate report
refresh/reanalyze profile
```

Demo rehearsal:

```txt
run perfect-path demo 5 times
verify no uncached calls block the UI
verify fallback voice mode works
verify Modal worker returns within acceptable time
```

---

## 11. What I Would Change Before Implementation

### Must Change

1. Add provider abstraction for OpenAI / Hugging Face / mock.
2. Add Zod schemas for all JSONB data and LLM outputs.
3. Make `VoiceSession.endedAt`, scores, summary, and feedback optional.
4. Add `createdAt`, `updatedAt`, and `status` fields where missing.
5. Start WebRTC spike on Day 1, with Day 3 as the final decision point.
6. Specify file/artifact storage strategy.
7. Restrict Modal repo analysis to static inspection only.
8. Add a minimal cache strategy for expensive model outputs.

### Should Change

1. Add `src/lib/prompts` and `src/lib/schemas` directories.
2. Add `src/lib/ai/router.ts`.
3. Add a `mock` provider for UI development.
4. Add clear API route list.
5. Add deployment target decision: Vercel + Supabase/Neon is the likely fastest path.
6. Add seed/demo profile fixture.

### Do Not Change

1. Keep Next.js + TypeScript.
2. Keep PostgreSQL.
3. Keep Prisma if the team is comfortable with it.
4. Keep Modal for background workers.
5. Keep the 4-table schema for MVP.
6. Keep Hackathon Story Lab thin.
7. Keep Communication Coach post-session only.

---

## Final Approval

I approve the proposed architecture with amendments.

Recommended final stack:

```txt
Frontend/App: Next.js App Router + TypeScript + Tailwind
Database: PostgreSQL + Prisma + JSONB + Zod validation
Background workers: Modal Python functions
Realtime voice: OpenAI Realtime WebRTC if working by Day 3
Fallback voice: Push-to-talk turn loop using browser speech primitives / OpenAI chat-audio
Async model testing: Hugging Face Inference + mock provider
Deployment: Vercel for app, Supabase/Neon for Postgres, Modal for workers
```

Most important engineering principle:

> Keep the realtime path simple, keep the database flexible, and move expensive/slow analysis into Modal workers.
