# DeepRound: OpenAI x Outskill x Modal Product and Architecture Plan

## 1. Hackathon Context

DeepRound is being built for the **OpenAI x Outskill 7 Day AI Builders Hackathon**, where this idea has already been shortlisted among the selected builder cohort.

The event has selected around **1000 builders/developers across India** and focuses on shipping a real working product using **OpenAI Codex**, not just a prototype or pitch deck.

The practical hackathon constraint is:

```txt
7 days
        ↓
working product
        ↓
clear demo loop
        ↓
visible OpenAI/Codex usage
        ↓
real user pain
        ↓
technical originality
```

Likely evaluation criteria:

- working deployment
- product usefulness
- Codex usage depth
- agentic workflow quality
- execution speed
- demo clarity
- technical originality
- quality of product thinking

DeepRound is built around a personal but widely relevant problem:

> Builders can now ship faster than ever, but many still struggle to deeply explain, defend, and communicate what they built.

This problem became concrete after a real internship rejection where a deep systems-level question about embeddings and vector databases exposed the gap between having built AI systems and being able to explain them at senior-engineer depth.

That is the central insight:

```txt
Building skill ≠ explanation skill
```

The hackathon is the right context because the OpenAI/Codex era makes this gap more urgent. Tools can accelerate product creation, but builders still need to articulate:

- architecture decisions
- tradeoffs
- scaling behavior
- failure modes
- implementation depth
- product usefulness
- evidence behind resume claims

DeepRound exists to close that gap.

The 7-day build should prove one complete loop:

```txt
Resume / GitHub / DumpFlex / JD / Hackathon idea
        ↓
Builder Profile + Evidence Graph
        ↓
Best project / story / gap recommendations
        ↓
Realtime voice practice
        ↓
Recursive technical probing
        ↓
Actionable feedback + readiness report
```

The goal is not to build every possible career tool in 7 days.

The goal is to demonstrate the foundation of a comprehensive builder articulation ecosystem through one strong, working product loop.

---

## 2. Executive Summary

DeepRound is a voice-first builder readiness platform.

It helps builders turn scattered proof of work into stronger resumes, project stories, hackathon narratives, and live technical explanations.

The product should not be positioned as:

- an interview orchestrator
- a coding helper
- a LeetCode assistant
- a generic mock interview chatbot
- a generic resume builder

The sharper positioning is:

> DeepRound helps builders become as good at explaining their work as they are at building it.

The product center is a living builder profile, powered by evidence from resumes, GitHub, LinkedIn, Medium, DumpFlex, job descriptions, hackathon challenges, and voice practice history.

OpenAI provides intelligence and realtime voice feedback.

Codex accelerates product development during the 7-day hackathon.

Modal provides scalable cloud execution, background workers, repo inspection, refresh jobs, and parallel analysis pipelines.

---

## 3. Core Product Thesis

Modern AI builders can ship faster than ever using tools like Codex, Claude Code, Cursor, and other agentic development environments.

But shipping is not the same as explaining.

Many builders can create impressive projects but struggle to deeply explain:

- why the architecture works
- what tradeoffs were made
- how systems scale
- what breaks under load
- what implementation choices matter
- how technical concepts connect to business value
- how their claimed skills are proven by real work

DeepRound solves this explainability gap.

The core promise:

> DeepRound turns your actual proof of work into role-specific, company-aware, voice-based interview readiness.

---

## 4. Strategic Category

DeepRound should define a new product category:

> Technical articulation gym for modern builders.

Alternative category phrases:

- builder articulation platform
- voice-first technical readiness platform
- project defense arena
- technical speaking gym
- evidence-based career readiness system
- realtime builder communication playground

Avoid generic phrases:

- AI interview bot
- mock interview platform
- resume optimizer
- career chatbot
- coding assistant

The product should feel like a system that knows the user’s work, challenges weak claims, and helps them improve how they communicate.

---

## 4. Product North Star

The north star should be:

> Can this user convincingly explain, defend, and improve the way they present the work they claim to have built?

Everything in DeepRound should support that.

This includes:

- profile building
- resume analysis
- JD matching
- project ranking
- voice practice
- technical drilling
- communication coaching
- hackathon storywriting
- refresh/cache updates
- progress tracking

All modules should feed one shared context: the Builder Profile.

---

## 5. Central Object: Builder Profile

DeepRound should be profile-centered, not feature-centered.

Every feature should read from and write to a shared `BuilderProfile`.

### 5.1 Builder Profile Schema

```ts
type BuilderProfile = {
  identity: IdentityProfile;
  goals: UserGoals;
  experience: ExperienceProfile;
  skills: Skill[];
  projects: Project[];
  achievements: Achievement[];
  education: Education[];
  workExperience: WorkExperience[];
  content: PublicContent[];
  resumeClaims: ResumeClaim[];
  evidenceGraph: EvidenceGraph;
  preferences: UserPreferences;
  exclusions: ExclusionRule[];
  communicationProfile: CommunicationProfile;
  progressHistory: ProgressHistory;
};
```

### 5.2 Why Builder Profile Matters

Without a shared profile, DeepRound becomes scattered:

- resume tool
- voice tool
- hackathon tool
- JD tool
- project recommender

With a shared profile, every feature feels connected:

- Resume optimizer uses evidence from GitHub and DumpFlex.
- JD matcher maps requirements to profile proof.
- Voice coach drills weak areas.
- Hackathon dashboard turns projects into stronger stories.
- Project recommender chooses the best proof for a target role.
- Refresh jobs update the profile as the user grows.

This is how DeepRound becomes an ecosystem instead of a bundle of disconnected tools.

---

## 6. Product Layers

DeepRound should be structured into five layers.

```txt
Layer 1: Ingestion
Layer 2: Profile Intelligence
Layer 3: Recommendation and Strategy
Layer 4: Voice Playground
Layer 5: Output Artifacts
```

### 6.1 Layer 1: Ingestion

Users can provide:

- resume PDF
- GitHub URL
- LinkedIn URL
- Medium or blog URL
- portfolio URL
- hackathon or challenge URL
- job description text or URL
- manual project descriptions
- certificates
- achievements
- screenshots
- demo links
- DumpFlex notes

For the 7-day MVP, prioritize:

- resume upload
- GitHub URL or manual repo summaries
- JD text
- hackathon/challenge text
- DumpFlex text
- manual project list

Avoid deep LinkedIn automation in the MVP unless it is trivial, because scraping/authentication can burn time.

### 6.2 Layer 2: Profile Intelligence

This layer extracts:

- projects
- skills
- claims
- achievements
- proof
- technologies
- public content
- weak claims
- missing metrics
- unsupported skills
- role-aligned evidence

This layer should produce draft suggestions, not directly overwrite the polished profile.

### 6.3 Layer 3: Recommendation and Strategy

This layer answers:

- Which project should I lead with?
- Which resume bullet is weak?
- Which skills are unsupported?
- Which project fits this JD?
- What should I practice?
- What should I not mention?
- What is my strongest story?
- Where will a senior engineer challenge me?
- What is missing from my hackathon pitch?

### 6.4 Layer 4: Voice Playground

This is the emotional center of the product.

Users speak. DeepRound listens, interrupts, probes, scores, and improves them.

MVP modes:

- Rapid Fire
- Deep Round
- JD Attack
- Communication Coach
- Panel Mode if time permits
- Hackathon Pitch Practice if time permits

### 6.5 Layer 5: Output Artifacts

Users should leave with useful artifacts:

- improved resume bullets
- best project ranking
- project story
- technical explanation map
- likely follow-up questions
- hackathon pitch
- demo script
- readiness report
- personalized drill plan
- weak-area roadmap
- LinkedIn/About rewrite
- answer bank

---

## 7. Main Product Flow

The ideal DeepRound flow:

```txt
User enters sources
        ↓
DeepRound extracts Builder Profile
        ↓
User edits and approves profile
        ↓
User adds target context
        ↓
System recommends best positioning
        ↓
User enters voice playground
        ↓
System gives realtime and post-round feedback
        ↓
Profile and progress update
        ↓
User improves resume, story, and practice plan
```

Example:

```txt
User uploads resume
User adds GitHub URL
User pastes AI Engineer Intern JD
DeepRound builds Builder Profile
DeepRound recommends strongest project
DeepRound flags weak claims
DeepRound generates likely attack questions
User enters Deep Round voice practice
AI interrupts vague explanations
System gives stronger answer and readiness report
```

---

## 8. MVP Product Scope

The hackathon is only 7 days. The MVP must be comprehensive enough to prove the ecosystem, but narrow enough to ship.

### 8.1 MVP Modules

Build:

1. Profile Builder
2. Resume/JD Analyzer
3. Project Recommender
4. DumpFlex
5. Voice Playground
6. Hackathon Story Dashboard
7. Readiness Report

### 8.2 Post-MVP Roadmap

Defer:

- full LinkedIn sync
- full Medium sync
- group discussion simulation
- multi-user practice rooms
- advanced analytics
- institution dashboards
- public portfolio generator
- browser extension
- mobile app
- custom open-source LLM hosting

---

## 9. DumpFlex

DumpFlex should be a first-class concept.

Internally, treat it as a raw evidence inbox.

### 9.1 What Users Can Drop

Users can drop:

- new project ideas
- shipped features
- hackathon results
- certificates
- GitHub repos
- LinkedIn posts
- Medium articles
- internship experience
- freelance work
- metrics screenshots
- product demo links
- random notes
- achievement updates

### 9.2 DumpFlex Flow

```txt
DumpFlex raw item
        ↓
Extraction
        ↓
Classification
        ↓
User confirmation
        ↓
BuilderProfile update
```

### 9.3 Example DumpFlex Object

```ts
{
  id: "dump_123",
  type: "raw_note",
  source: "manual",
  content: "Built a latency dashboard for my RAG app",
  extracted_entities: {
    project: "RAG app",
    skills: ["observability", "latency tracking"],
    achievement: "built latency dashboard"
  },
  confidence: 0.82,
  status: "needs_review"
}
```

### 9.4 Suggested Actions

After processing a DumpFlex item, ask:

- Add to resume?
- Add to project story?
- Add to LinkedIn profile?
- Turn into voice practice?
- Use as proof for target JD?
- Ignore for now?

This makes the profile feel alive.

---

## 10. User Control and Exclusions

User trust is critical.

Users must control what the system can use.

### 10.1 Controls

Support:

- do not use this project
- hide this project
- use only for practice
- use in resume
- use in JD matching
- use in hackathon story
- do not mention publicly
- mark as outdated
- mark as private
- mark as not verified
- prefer for AI roles
- prefer for backend roles

### 10.2 Use Policy Schema

```ts
type UsePolicy = {
  useInResume: boolean;
  useInVoicePractice: boolean;
  useInJDMatch: boolean;
  useInHackathonStory: boolean;
  useInPublicProfile: boolean;
  private: boolean;
  excludedForRoles: string[];
};
```

If DeepRound uses information the user explicitly excluded, trust breaks immediately.

---

## 11. Refresh and Cache System

Refresh/cache is not a minor feature. It is core to making DeepRound a living profile system.

### 11.1 Cache Types

```txt
Raw Source Cache
Parsed Cache
Approved Profile Cache
Derived Recommendation Cache
Voice Session Cache
Progress Cache
```

### 11.2 Raw Source Cache

Stores original data:

- resume files
- GitHub fetched data
- JD text
- DumpFlex raw notes
- hackathon text
- blog text

### 11.3 Parsed Cache

Stores extracted entities:

- projects
- skills
- claims
- achievements
- technologies

### 11.4 Approved Profile Cache

Stores the user-approved Builder Profile.

This is the source of truth.

### 11.5 Derived Recommendation Cache

Stores generated outputs:

- project rankings
- JD match reports
- resume suggestions
- hackathon story drafts
- practice drills

### 11.6 Voice Session Cache

Stores:

- transcripts
- questions
- answers
- feedback
- scores
- interruptions

### 11.7 Progress Cache

Stores long-term progress:

- communication scores
- technical scores
- weak areas
- repeated mistakes
- readiness trends

### 11.8 Refresh Actions

Users should have:

- Refresh GitHub
- Re-upload Resume
- Re-analyze Profile
- Rebuild Recommendations
- Refresh JD Match
- Clear Old Suggestions
- Review New Changes

Refresh should show diffs:

```txt
New GitHub change detected:
- Added repo: rag-eval-dashboard
- Updated README in vector-search-lab
- New skill inferred: Prometheus

Approve these updates?
```

---

## 12. Resume Intelligence

DeepRound should not be a generic resume optimizer.

It should be a resume evidence analyzer.

### 12.1 Resume Analysis Should Answer

- What claims are strong?
- What claims are unsupported?
- Which bullets are vague?
- Which projects should be highlighted?
- Which skills are listed but not proven?
- What metrics are missing?
- What is risky in a technical conversation?
- What should be removed?
- What should be rewritten?

### 12.2 Strong Feedback Example

Weak feedback:

```txt
Improve this bullet by adding action verbs.
```

Strong DeepRound feedback:

```txt
You mention RAG, LLMs, and vector databases, but your bullet does not prove retrieval quality, latency, evaluation, or deployment. Add one metric and one architecture decision.
```

### 12.3 Objective Resume Comparison

Resume comparison should be objective and evidence-based.

Avoid:

```txt
This resume is better than yours.
```

Use:

```txt
Compared to stronger resumes for AI Engineer Intern roles, your resume has lower proof density in deployment, metrics, evaluation, system tradeoffs, and project outcomes.
```

### 12.4 Resume Score Schema

```ts
type ResumeScore = {
  roleAlignment: number;
  proofDensity: number;
  quantifiedImpact: number;
  projectDepth: number;
  skillEvidence: number;
  clarity: number;
  uniqueness: number;
  defensibility: number;
  atsCoverage: number;
};
```

---

## 13. JD Matching

JD matching should be a major differentiator.

### 13.1 JD Flow

```txt
JD text
        ↓
Extract required capabilities
        ↓
Compare against BuilderProfile
        ↓
Map skills to evidence
        ↓
Identify gaps
        ↓
Recommend projects
        ↓
Generate voice drills
```

### 13.2 Evidence Matching Principle

The key rule:

```txt
Skill mentioned does not mean skill proven.
```

DeepRound should map skills to actual evidence:

- GitHub projects
- resume bullets
- DumpFlex achievements
- blog posts
- demo links
- practice transcripts

### 13.3 Example JD Match Output

```txt
JD requires:
- Python
- SQL
- LLM APIs
- FastAPI
- Vector databases

User evidence:
- Python: strong, shown in 3 projects
- SQL: weak, only mentioned once
- LLM APIs: strong
- FastAPI: medium
- Vector DB: strong but explanation risk exists

Recommendation:
Lead with RAG Evaluation project.
Prepare SQL indexing and joins.
Practice vector retrieval explanation.
Add one bullet about FastAPI latency handling.
```

---

## 14. Project Recommender

Users often do not know which project to present.

DeepRound should recommend the strongest project for a target role, company, level, location, or challenge.

### 14.1 Ranking Criteria

```ts
type ProjectScore = {
  roleRelevance: number;
  technicalDepth: number;
  originality: number;
  measurableImpact: number;
  demoStrength: number;
  explanationDepth: number;
  followUpDefensibility: number;
  companyFit: number;
  recency: number;
};
```

### 14.2 Example Output

```txt
Best project to lead with:
RAG Evaluation Pipeline

Why:
- Strong match for AI Engineer role
- Shows embeddings, retrieval, evaluation, APIs
- Has deeper follow-up potential than chatbot project

Weakness:
- No clear metric in current description

Fix:
Add retrieval precision, latency, or evaluation result

Pitch:
“I built a RAG evaluation pipeline to compare chunking and retrieval strategies, then measured answer quality and latency tradeoffs.”
```

---

## 15. Voice Playground

The Voice Playground is the core product experience.

### 15.1 Design Principle

Do not center the product around questions.

Center it around depth gaps.

Examples:

- “You said vector database, but did not explain indexing.”
- “You mentioned scalability, but gave no bottleneck.”
- “You described what you built, but not why this architecture was chosen.”
- “You explained the happy path, but skipped failure modes.”
- “You used advanced terms without grounding them.”

### 15.2 Voice Modes

#### Rapid Fire Mode

Purpose:

- speed
- fluency
- confidence
- quick recall

Example prompts:

```txt
Explain SQL indexing in 30 seconds.
What is a Python generator?
Why use async APIs?
What is vector similarity?
What breaks when traffic increases 10x?
```

#### Deep Round Mode

Purpose:

- recursive technical depth

Flow:

```txt
Initial question
        ↓
User answer
        ↓
AI detects weak point
        ↓
Follow-up question
        ↓
User answer
        ↓
AI probes deeper
        ↓
Final feedback
```

#### JD Attack Mode

Purpose:

- role-specific readiness

It turns a job description into targeted voice drills.

#### Communication Coach Mode

Purpose:

- spoken English improvement
- clarity
- pacing
- confidence
- structure
- filler word reduction

#### Project Defense Mode

Purpose:

- defend actual projects
- explain architecture
- expose weak claims
- prepare for senior technical probing

#### Hackathon Pitch Practice

Purpose:

- explain idea clearly
- defend uniqueness
- align with judging criteria
- prepare for demo Q&A

#### Panel Mode

MVP alternative to group discussion.

Personas:

- Senior Engineer
- Product Lead
- Recruiter
- Communication Coach
- Hackathon Judge

---

## 16. Realtime Interruption Rules

Realtime interruption is the product’s “wow” moment.

### 16.1 Interrupt When

- user rambles
- answer is too vague
- user says unsupported claim
- user uses buzzwords without explanation
- user exceeds time
- filler words are excessive
- major technical error appears
- missing tradeoff
- missing example
- missing metric

### 16.2 Example Interruptions

```txt
Stop. You said “scalable,” but scalable along which dimension?
```

```txt
Pause. That sounds memorized. Explain it using your actual project.
```

```txt
You are using jargon. Explain it without saying “semantic search.”
```

```txt
You mentioned vector DB, but not indexing. Continue from there.
```

---

## 17. Communication and Technical Scoring

### 17.1 Communication Score

```ts
type CommunicationScore = {
  clarity: number;
  conciseness: number;
  structure: number;
  confidence: number;
  pacing: number;
  fillerWordRate: number;
  grammarQuality: number;
  jargonControl: number;
  answerCompleteness: number;
};
```

### 17.2 Technical Score

```ts
type TechnicalScore = {
  correctness: number;
  specificity: number;
  implementationDepth: number;
  tradeoffAwareness: number;
  failureModeAwareness: number;
  scalabilityReasoning: number;
  evidenceUsage: number;
};
```

### 17.3 Strong Feedback Format

```txt
Score:
Technical Depth: 6/10
Communication: 7/10

What worked:
You correctly mentioned embeddings and vector similarity.

What was weak:
You did not explain indexing, ANN search, recall/latency tradeoff, or evaluation.

Better answer:
“Embeddings are dense numerical vectors that encode semantic meaning...”

Next drill:
Explain HNSW indexing in 60 seconds.
```

---

## 18. Company, Location, and Level Context

DeepRound should not ask generic questions.

It should adapt to:

- company
- location
- role
- level
- audience type
- JD
- user background

### 18.1 Company Context

OpenAI-style:

- model behavior
- product usefulness
- evaluation
- safety
- latency
- reasoning depth
- agent workflows

Google-style:

- fundamentals
- scale
- algorithms
- clean system design
- tradeoffs

Startup-style:

- shipping speed
- pragmatic choices
- user pain
- constraints
- business impact

Research lab-style:

- assumptions
- experiments
- limitations
- rigor
- failure modes

### 18.2 Location Context

For India-focused users:

- campus placement expectations
- internship readiness
- spoken English confidence
- resume proof density
- project explanation clarity
- service/product company differences
- hackathon/demo culture

### 18.3 Level Context

Student / Intern:

- fundamentals
- project clarity
- learning ability
- implementation ownership

1–2 YOE:

- production awareness
- debugging
- APIs
- databases
- ownership

Senior:

- architecture
- tradeoffs
- scaling
- mentorship
- failure modes

Staff:

- system-wide reasoning
- organizational tradeoffs
- long-term design
- product/technical strategy

---

## 19. Hackathon Dashboard

DeepRound should include a hackathon-specific dashboard because it directly supports the OpenAI x Outskill event.

### 19.1 Purpose

Not building the project.

Instead:

> Help users represent, sharpen, and defend hackathon ideas.

### 19.2 Inputs

- hackathon URL/text
- challenge statement
- judging criteria
- rough project idea
- target user
- team skills
- project constraints

### 19.3 Outputs

- one-line pitch
- problem statement
- target user
- user pain
- why now
- solution thesis
- core workflow
- demo loop
- architecture summary
- technical originality
- judging alignment
- risk analysis
- final pitch script
- likely judge questions
- voice practice round

### 19.4 Example DeepRound Reframe

Weak framing:

```txt
AI interview prep tool.
```

Stronger framing:

```txt
Voice-first builder articulation platform that turns scattered proof of work into role-specific technical readiness.
```

---

## 20. Group Discussion Simulation

Group discussion simulation is valuable, but should not be in the 7-day MVP unless the core voice loop is already excellent.

### 20.1 Why It Is Hard

It requires:

- multiple AI personas
- turn-taking
- interruption logic
- disagreement handling
- social scoring
- moderation
- voice UX control

### 20.2 MVP Alternative

Build Panel Mode instead.

```txt
User speaks
        ↓
AI panel members evaluate one by one
        ↓
Coordinator summarizes feedback
```

This gives multi-perspective value without chaotic multi-speaker simulation.

### 20.3 Future GD Mode

Future scenarios:

- campus placement GD
- product debate
- architecture review
- investor Q&A
- hackathon judging room
- team design meeting

Future scoring:

- clarity
- assertiveness
- listening
- contribution quality
- disagreement quality
- leadership
- brevity
- technical correctness

---

## 21. Modal Strategy

Modal should power the cloud execution and heavy backend layer.

OpenAI should power intelligence and interaction.

Codex should power rapid development.

### 21.1 Core Narrative

> DeepRound uses OpenAI for realtime voice reasoning and feedback, Codex to accelerate development, and Modal to run scalable backend intelligence pipelines that process resumes, inspect repositories, refresh profiles, compare JDs, and generate readiness reports.

### 21.2 What Modal Should Handle

Modal should handle:

- resume parsing workers
- GitHub ingestion jobs
- Medium/blog ingestion
- batch embedding generation
- profile refresh jobs
- JD matching pipelines
- hackathon challenge analysis
- audio/transcript post-processing
- long-running analysis jobs
- sandboxed repo inspection
- background agent workers
- scheduled refresh/cache invalidation
- parallel panel feedback
- benchmark comparison

### 21.3 What OpenAI Should Handle

OpenAI should handle:

- realtime voice conversation
- structured extraction
- reasoning over profile
- question generation
- answer scoring
- feedback generation
- story rewriting
- JD/context understanding
- technical drilling
- embeddings

### 21.4 What Codex Should Handle

Codex should be used for:

- scaffolding the app
- implementing Modal workers
- refining schemas
- generating frontend components
- building prompt templates
- writing tests
- iterating product flows
- debugging integration issues

---

## 22. Modal Features To Use

### 22.1 Modal Web Functions

Use for backend endpoints:

```txt
/analyze-resume
/analyze-jd
/rank-projects
/build-profile
/analyze-hackathon
/refresh-github
/generate-readiness-report
```

### 22.2 Modal Queues

Use for async ingestion jobs.

Example:

```txt
User uploads resume
        ↓
Main app creates source record
        ↓
Push job into Modal Queue
        ↓
Modal worker extracts text, entities, claims
        ↓
Updates profile suggestions
```

### 22.3 Modal Volumes

Use for persistent storage:

- uploaded resumes
- parsed text
- extracted profile JSON
- audio transcripts
- generated reports
- cached GitHub snapshots

### 22.4 Modal Dicts

Use for:

- temporary job status
- analysis cache
- refresh status
- session summaries
- deduplication keys

### 22.5 Modal Cron / Period Jobs

Use for:

- refreshing GitHub repos
- refreshing project rankings
- re-analyzing stale profile data
- clearing old recommendation cache
- running profile completeness checks

### 22.6 Modal Sandboxes

Use for safe repo inspection.

Flow:

```txt
User connects GitHub repo
        ↓
Modal Sandbox clones repo
        ↓
Runs safe static inspection
        ↓
Extracts README, tech stack, package files, routes, tests
        ↓
Builds project understanding
        ↓
Deletes sandbox
```

This is one of the strongest technical originality points.

### 22.7 Modal Batch Processing

Use for:

- comparing resumes against benchmark patterns
- scoring projects
- generating embeddings
- running multiple evaluators in parallel

---

## 23. Best Modal Use Cases For DeepRound

### 23.1 Resume Intelligence Pipeline

```txt
Resume upload
        ↓
Modal worker extracts text
        ↓
OpenAI extracts structured claims
        ↓
Modal stores parsed result
        ↓
Evidence agent maps claims to profile
        ↓
User reviews suggestions
```

### 23.2 GitHub Repository Intelligence

```txt
GitHub URL
        ↓
Modal Sandbox clones repo
        ↓
Static analysis:
  - README
  - package.json / requirements.txt
  - file tree
  - API routes
  - model files
  - DB schema
  - tests
        ↓
OpenAI summarizes technical depth
        ↓
Project profile updates
```

### 23.3 DumpFlex Processing

```txt
User dumps note/link/text
        ↓
Modal background worker classifies it
        ↓
OpenAI extracts achievements, skills, projects
        ↓
System suggests profile updates
```

### 23.4 JD Intelligence Pipeline

```txt
JD text or URL
        ↓
Modal job extracts capability requirements
        ↓
OpenAI maps to BuilderProfile
        ↓
Modal runs project ranking
        ↓
Returns readiness plan
```

### 23.5 Voice Session Post-Processing

Realtime voice should stay low-latency with OpenAI.

Heavy scoring should happen after the session:

```txt
Transcript
        ↓
Modal post-processing job
        ↓
Deep scoring
        ↓
Weak area detection
        ↓
Progress update
        ↓
Readiness report
```

### 23.6 Parallel AI Panel

Modal can run evaluators in parallel:

```txt
Transcript
        ↓
Senior Engineer Agent
Product Lead Agent
Recruiter Agent
Communication Coach Agent
Hackathon Judge Agent
        ↓
Coordinator merges feedback
```

---

## 24. Proposed Technical Architecture

```txt
Frontend
  Next.js / React
        ↓
Main Backend
  API routes / FastAPI / Node
        ↓
Postgres + pgvector
  BuilderProfile, claims, evidence, sessions
        ↓
OpenAI
  Realtime voice, extraction, reasoning, feedback
        ↓
Modal
  Background workers, sandboxes, refresh, batch analysis
```

### 24.1 Runtime Split

Low latency:

- realtime voice
- immediate follow-up
- live interruptions

Background:

- resume parsing
- repo inspection
- JD matching
- project ranking
- readiness reports
- profile refresh
- benchmark comparison

Do not force heavy reasoning into the realtime voice path.

---

## 25. Modal Services

Suggested Modal services:

```txt
deepround-ingestion
deepround-analysis
deepround-refresh
deepround-sandbox
deepround-panel
```

### 25.1 Ingestion Worker

Handles:

- resume upload
- document parsing
- raw text extraction
- source normalization

### 25.2 Profile Analysis Worker

Handles:

- structured profile extraction
- claim detection
- evidence mapping
- weak claim detection

### 25.3 GitHub Sandbox Worker

Handles:

- clone repo
- inspect files
- summarize architecture
- identify technologies
- detect project depth

### 25.4 JD Match Worker

Handles:

- JD parsing
- skill requirement extraction
- profile gap analysis
- project recommendation

### 25.5 Voice Feedback Worker

Handles:

- transcript post-processing
- scoring
- improved answer generation
- weak-area updates

### 25.6 Refresh Worker

Handles:

- scheduled source refresh
- cache invalidation
- diff generation
- user approval suggestions

### 25.7 Hackathon Story Worker

Handles:

- challenge parsing
- judging criteria extraction
- idea enrichment
- demo script generation

---

## 26. MVP Modal Endpoints

Minimum useful Modal endpoints:

```txt
POST /modal/parse-resume
POST /modal/analyze-jd
POST /modal/process-dumpflex
POST /modal/rank-projects
POST /modal/analyze-hackathon
POST /modal/post-voice-feedback
POST /modal/panel-feedback
POST /modal/inspect-github
POST /modal/refresh-source
```

Each endpoint should return structured JSON.

---

## 27. Multi-Agent Architecture

Internally, DeepRound can use specialized agents.

Externally, avoid calling it a generic personal AI assistant.

Better external names:

- Interview Readiness Panel
- Builder Coach
- DeepRound Arena
- Profile Intelligence Layer
- Technical Speaking Gym

### 27.1 Agents

- Profile Agent
- Evidence Agent
- Resume Agent
- JD Agent
- Project Strategy Agent
- Voice Interview Agent
- Communication Agent
- Technical Depth Agent
- Hackathon Story Agent
- Coordinator Agent

### 27.2 Common Context Window

All agents should receive compact shared context:

```ts
type BuilderContext = {
  profileSummary: string;
  targetRole?: string;
  targetCompany?: string;
  location?: string;
  experienceLevel?: string;
  activeProjects: ProjectSummary[];
  excludedProjects: string[];
  verifiedClaims: Claim[];
  weakAreas: string[];
  recentPracticeScores: PracticeScore[];
  communicationGoals: string[];
};
```

This keeps outputs consistent.

---

## 28. Database Model

Minimum tables:

```txt
users
builder_profiles
sources
raw_documents
projects
skills
claims
evidence_items
dumpflex_items
job_descriptions
hackathon_challenges
resume_versions
voice_sessions
voice_turns
feedback_reports
recommendations
exclusion_rules
progress_metrics
```

### 28.1 Sources Table

```ts
{
  id,
  userId,
  type: "resume" | "github" | "linkedin" | "medium" | "dumpflex" | "manual" | "jd",
  url,
  filePath,
  rawText,
  lastFetchedAt,
  status
}
```

### 28.2 Claims Table

```ts
{
  id,
  userId,
  text,
  category: "skill" | "project" | "achievement" | "experience",
  sourceIds,
  confidence,
  verifiedStatus: "verified" | "inferred" | "user_provided" | "unsupported",
  usePolicy
}
```

### 28.3 Evidence Items Table

```ts
{
  id,
  claimId,
  sourceId,
  evidenceText,
  strength,
  type: "repo" | "resume_bullet" | "blog" | "manual" | "metric"
}
```

### 28.4 Voice Sessions Table

```ts
{
  id,
  userId,
  mode,
  targetRole,
  targetCompany,
  difficulty,
  startedAt,
  endedAt,
  summary,
  technicalScore,
  communicationScore
}
```

---

## 29. LLM Prompting Strategy

Use structured outputs.

Do not ask the model for random prose when extracting facts.

### 29.1 Extraction Schema Example

```ts
{
  projects: [
    {
      name: string,
      description: string,
      technologies: string[],
      evidence: string[],
      inferredSkills: string[],
      confidence: number
    }
  ],
  skills: [
    {
      name: string,
      evidence: string[],
      confidence: number
    }
  ],
  weakClaims: [
    {
      claim: string,
      reason: string,
      suggestedFix: string
    }
  ]
}
```

### 29.2 Multi-Pass Analysis

For important workflows:

1. Extract facts.
2. Map evidence.
3. Generate recommendations.
4. Generate user-facing explanation.

This is more reliable than one giant prompt.

---

## 30. Trust and Safety

DeepRound should not help users fake expertise.

### 30.1 Product Values

- honest
- evidence-based
- direct
- user-controlled
- improvement-focused

### 30.2 Warnings DeepRound Should Give

```txt
You should not claim ML infrastructure experience based only on this project.
```

```txt
This project proves API integration, but not distributed systems.
```

```txt
Your resume lists Kubernetes, but I found no supporting project evidence.
```

Honesty can become a brand differentiator.

---

## 31. Readiness Report

After analysis and voice practice, generate a report.

### 31.1 Report Sections

```txt
Overall readiness
Strongest projects
Weakest claims
JD alignment
Communication score
Technical depth score
Likely interview attacks
Recommended resume changes
Recommended practice drills
Next 3 actions
```

### 31.2 Example Report

```txt
Overall readiness: 72%

Strength:
Strong AI project portfolio with RAG and LLM API experience.

Weakness:
SQL and deployment evidence are underdeveloped.

Risk:
You may get challenged on vector database internals.

Next actions:
1. Add one metric to RAG project.
2. Practice embeddings retrieval explanation.
3. Rewrite resume bullet around evaluation and latency.
```

---

## 32. UI / UX Structure

### 32.1 Main Navigation

```txt
Home
Builder Profile
DumpFlex
Resume Lab
JD Match
Project Strategy
Voice Playground
Hackathon Lab
Progress
Settings
```

### 32.2 Home Dashboard

Show:

- readiness score
- strongest project
- current weak area
- next recommended drill
- latest DumpFlex items
- active target JD
- recent voice score
- suggested action

Example:

```txt
Your current AI Engineer readiness: 68%
Strongest project: RAG Evaluation Pipeline
Weakest area: SQL evidence and scaling explanation
Next drill: Vector DB retrieval deep round
```

### 32.3 Builder Profile Page

Editable sections:

- summary
- skills
- projects
- achievements
- experience
- education
- links
- preferences
- hidden/excluded items

### 32.4 DumpFlex Page

One big input box:

```txt
Drop anything: achievement, project update, note, link, certificate, idea...
```

Then cards:

```txt
Detected:
- Project update
- New skill
- Resume bullet opportunity
- Practice drill opportunity
```

### 32.5 Voice Playground Page

Mode cards:

- Rapid Fire
- Deep Round
- JD Attack
- Project Defense
- Communication Coach
- Hackathon Pitch
- Panel Mode

---

## 33. 7-Day Hackathon Build Plan

### Day 1: Product Skeleton and Data Model

Build:

- app shell
- navigation
- database schema
- user profile model
- source upload model
- project model
- claim/evidence model

Pages:

- Home
- Builder Profile
- DumpFlex
- Voice Playground placeholder

Goal:

```txt
A user can create a profile and manually add projects/skills.
```

### Day 2: Resume and Project Ingestion

Build:

- resume upload
- text extraction
- structured profile extraction
- manual profile editing
- source tracking
- confidence labels

Goal:

```txt
Upload resume → get draft BuilderProfile → user approves.
```

### Day 3: JD Match and Project Recommender

Build:

- JD input
- skill extraction
- JD-profile comparison
- evidence gap analysis
- project ranking
- recommended drills

Goal:

```txt
Paste JD → get strongest project + weak areas + practice plan.
```

### Day 4: DumpFlex and Refresh

Build:

- DumpFlex input
- extraction from raw note
- suggested profile updates
- approve/reject
- refresh/reanalyze flow

Goal:

```txt
User drops new achievement → system suggests where it belongs.
```

### Day 5: Voice Playground

Build:

- realtime voice session
- mode selection
- question generation from profile/JD
- transcript capture
- basic interruption logic
- post-answer feedback

Modes:

- Rapid Fire
- Deep Round
- JD Attack
- Communication Coach

Goal:

```txt
User speaks → AI probes → transcript + feedback generated.
```

### Day 6: Hackathon Dashboard and Reports

Build:

- hackathon/challenge input
- idea enrichment
- story builder
- demo script generator
- readiness report
- dashboard polish

Goal:

```txt
Paste hackathon challenge + idea → get strong pitch and practice round.
```

### Day 7: Demo Polish and Deployment

Build:

- end-to-end sample data
- polished dashboard states
- demo script
- loading states
- error handling
- final deployment

Goal:

```txt
One compelling 3-minute demo.
```

---

## 34. Hackathon Demo Script

### 34.1 Narrative

```txt
Builders can now ship fast with Codex.
But shipping is not the same as explaining.
DeepRound solves the explainability gap.
```

### 34.2 Demo Steps

1. Upload resume.
2. Add GitHub/project context.
3. Paste AI Engineer JD.
4. DeepRound builds profile.
5. It recommends best project.
6. It flags weak claims.
7. It generates technical attack questions.
8. User enters voice Deep Round.
9. AI interrupts vague explanation.
10. System gives stronger answer.
11. Readiness report updates.
12. Show Hackathon Story Dashboard as bonus.

### 34.3 Strong Demo Moment

Use the real trigger story:

```txt
Question: Explain how embeddings are represented and retrieved in a vector database.
```

Then show DeepRound catching a vague answer.

---

## 35. Best OpenAI + Modal + Outskill Narrative

Use this in the final pitch:

> DeepRound is built for the OpenAI x Outskill hackathon because the core problem is created by the new Codex era: builders can ship faster than ever, but they struggle to deeply explain what they built. We use OpenAI for real-time voice reasoning and feedback, Codex to accelerate development, and Modal to run scalable background intelligence pipelines that process proof of work, inspect projects, refresh profiles, and generate role-specific readiness plans.

This shows:

- OpenAI product alignment
- Codex usage depth
- Modal infrastructure depth
- real product architecture
- strong hackathon relevance

---

## 36. Best Use Of Modal Credits

Use Modal credits for:

- repeated demo processing
- sandbox repo inspection
- batch profile analysis
- multiple test users
- refresh jobs
- parallel panel feedback
- hosted backend workers
- optional GPU experiments

Avoid spending credits on:

- training a model
- serving a custom LLM without need
- GPU-heavy demos that do not improve the product
- complex video/audio models unless central to UX

The goal is not to spend credits.

The goal is to show Modal enables a real backend intelligence system.

---

## 37. What To Avoid

Avoid:

- building too many weak tools
- making a generic chatbot
- over-focusing on dashboard UI
- building a coding helper
- building a LeetCode clone
- making resume rewriting generic
- building full group discussion in MVP
- relying on LinkedIn scraping
- letting agents hallucinate profile facts
- auto-editing user profile without approval
- putting heavy analysis in the realtime voice path

---

## 38. Final MVP Decision

If scope has to be reduced, build this exact path:

```txt
Resume + Project Intake
        ↓
Builder Profile
        ↓
JD Match
        ↓
Best Project Recommendation
        ↓
Voice Deep Round
        ↓
Feedback + Readiness Report
```

Add DumpFlex and Hackathon Dashboard as supporting features.

This creates a complete and differentiated product in 7 days.

---

## 39. Final Positioning

Long version:

> DeepRound is a voice-first builder readiness platform that turns resumes, projects, GitHub, job descriptions, and raw achievements into a living builder profile, then helps users practice and improve how they explain their work through real-time technical voice feedback.

Short version:

> DeepRound helps builders become as good at explaining their work as they are at building it.

Sharpest category phrase:

> A technical articulation gym for modern builders.
