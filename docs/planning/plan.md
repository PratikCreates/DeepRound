# DeepRound: OpenAI x Outskill x Modal + Hugging Face Product and Architecture Plan

<!-- DEEPROUND_GUIDE_START -->

> Comprehensive 7-day hackathon plan for DeepRound: a voice-first builder articulation platform using OpenAI, Codex, Modal, and Hugging Face.

## Document Guide

### Important Notes

- Update as of 2026-05-25: the team has been informed that OpenAI API credits will not be provided for the hackathon. DeepRound should therefore use a Hugging Face-first inference strategy for the MVP, while keeping OpenAI/OpenAI-compatible adapters as future upgrade paths.
- The voice MVP should use browser push-to-talk speech capture and browser speech synthesis, with HF/mock providers generating drill questions and feedback.
- DeepRound has already been shortlisted for the OpenAI x Outskill 7 Day AI Builders Hackathon cohort.
- The product is not an interview orchestrator, coding helper, LeetCode clone, or generic resume optimizer.
- The core product loop is evidence intake -> Builder Profile -> recommendations -> realtime voice practice -> feedback report.
- Use Hugging Face for MVP inference/testing, browser speech primitives for voice I/O, Modal for backend execution, and keep OpenAI/OpenAI-compatible adapters as future upgrades.
- Build the 7-day MVP around one complete working demo loop instead of many shallow tools.

### Infrastructure Budget Summary

- Modal: 5 free-tier accounts x $250 credits = approximately $1,250 total experimental/demo credits.
- Hugging Face: 5 accounts totaling approximately $116.24 for inference experiments, datasets, and optional demo assets.
- OpenAI: reserve for realtime voice, recursive probing, final demo quality, and high-value reasoning paths.
- Architecture rule: support multiple providers, but do not make production depend on sharding workloads across multiple free-tier accounts.

### Full Outline

- [1. Hackathon Context](#1-hackathon-context)
- [2. Available Credits and Infrastructure Budget](#2-available-credits-and-infrastructure-budget)
  - [2.1 Modal Labs Credits](#21-modal-labs-credits)
  - [2.2 Hugging Face Credits](#22-hugging-face-credits)
  - [2.3 OpenAI Credits](#23-openai-credits)
  - [2.4 Credit Strategy](#24-credit-strategy)
- [3. Provider Routing Strategy](#3-provider-routing-strategy)
  - [3.1 Provider Roles](#31-provider-roles)
  - [3.2 Task Routing](#32-task-routing)
  - [3.3 Provider Interface](#33-provider-interface)
  - [3.4 Hugging Face Inference API Usage](#34-hugging-face-inference-api-usage)
  - [3.5 Caching Strategy](#35-caching-strategy)
  - [3.6 Demo Strategy](#36-demo-strategy)
- [4. Executive Summary](#4-executive-summary)
- [5. Core Product Thesis](#5-core-product-thesis)
- [6. Strategic Category](#6-strategic-category)
- [7. Product North Star](#7-product-north-star)
- [8. Central Object: Builder Profile](#8-central-object-builder-profile)
  - [8.1 Builder Profile Schema](#81-builder-profile-schema)
  - [8.2 Why Builder Profile Matters](#82-why-builder-profile-matters)
- [9. Product Layers](#9-product-layers)
  - [9.1 Layer 1: Ingestion](#91-layer-1-ingestion)
  - [9.2 Layer 2: Profile Intelligence](#92-layer-2-profile-intelligence)
  - [9.3 Layer 3: Recommendation and Strategy](#93-layer-3-recommendation-and-strategy)
  - [9.4 Layer 4: Voice Playground](#94-layer-4-voice-playground)
  - [9.5 Layer 5: Output Artifacts](#95-layer-5-output-artifacts)
- [10. Main Product Flow](#10-main-product-flow)
- [11. MVP Product Scope](#11-mvp-product-scope)
  - [11.1 MVP Modules](#111-mvp-modules)
  - [11.2 Post-MVP Roadmap](#112-post-mvp-roadmap)
- [12. DumpFlex](#12-dumpflex)
  - [12.1 What Users Can Drop](#121-what-users-can-drop)
  - [12.2 DumpFlex Flow](#122-dumpflex-flow)
  - [12.3 Example DumpFlex Object](#123-example-dumpflex-object)
  - [12.4 Suggested Actions](#124-suggested-actions)
- [13. User Control and Exclusions](#13-user-control-and-exclusions)
  - [13.1 Controls](#131-controls)
  - [13.2 Use Policy Schema](#132-use-policy-schema)
- [14. Refresh and Cache System](#14-refresh-and-cache-system)
  - [14.1 Cache Types](#141-cache-types)
  - [14.2 Raw Source Cache](#142-raw-source-cache)
  - [14.3 Parsed Cache](#143-parsed-cache)
  - [14.4 Approved Profile Cache](#144-approved-profile-cache)
  - [14.5 Derived Recommendation Cache](#145-derived-recommendation-cache)
  - [14.6 Voice Session Cache](#146-voice-session-cache)
  - [14.7 Progress Cache](#147-progress-cache)
  - [14.8 Refresh Actions](#148-refresh-actions)
- [15. Resume Intelligence](#15-resume-intelligence)
  - [15.1 Resume Analysis Should Answer](#151-resume-analysis-should-answer)
  - [15.2 Strong Feedback Example](#152-strong-feedback-example)
  - [15.3 Objective Resume Comparison](#153-objective-resume-comparison)
  - [15.4 Resume Score Schema](#154-resume-score-schema)
- [16. JD Matching](#16-jd-matching)
  - [16.1 JD Flow](#161-jd-flow)
  - [16.2 Evidence Matching Principle](#162-evidence-matching-principle)
  - [16.3 Example JD Match Output](#163-example-jd-match-output)
- [17. Project Recommender](#17-project-recommender)
  - [17.1 Ranking Criteria](#171-ranking-criteria)
  - [17.2 Example Output](#172-example-output)
- [18. Voice Playground](#18-voice-playground)
  - [18.1 Design Principle](#181-design-principle)
  - [18.2 Voice Modes](#182-voice-modes)
    - [Rapid Fire Mode](#rapid-fire-mode)
    - [Deep Round Mode](#deep-round-mode)
    - [JD Attack Mode](#jd-attack-mode)
    - [Communication Coach Mode](#communication-coach-mode)
    - [Project Defense Mode](#project-defense-mode)
    - [Hackathon Pitch Practice](#hackathon-pitch-practice)
    - [Panel Mode](#panel-mode)
- [19. Realtime Interruption Rules](#19-realtime-interruption-rules)
  - [19.1 Interrupt When](#191-interrupt-when)
  - [19.2 Example Interruptions](#192-example-interruptions)
- [20. Communication and Technical Scoring](#20-communication-and-technical-scoring)
  - [20.1 Communication Score](#201-communication-score)
  - [20.2 Technical Score](#202-technical-score)
  - [20.3 Strong Feedback Format](#203-strong-feedback-format)
- [21. Company, Location, and Level Context](#21-company-location-and-level-context)
  - [21.1 Company Context](#211-company-context)
  - [21.2 Location Context](#212-location-context)
  - [21.3 Level Context](#213-level-context)
- [22. Hackathon Dashboard](#22-hackathon-dashboard)
  - [22.1 Purpose](#221-purpose)
  - [22.2 Inputs](#222-inputs)
  - [22.3 Outputs](#223-outputs)
  - [22.4 Example DeepRound Reframe](#224-example-deepround-reframe)
- [23. Group Discussion Simulation](#23-group-discussion-simulation)
  - [23.1 Why It Is Hard](#231-why-it-is-hard)
  - [23.2 MVP Alternative](#232-mvp-alternative)
  - [23.3 Future GD Mode](#233-future-gd-mode)
- [24. Modal Strategy](#24-modal-strategy)
  - [24.1 Core Narrative](#241-core-narrative)
  - [24.2 What Modal Should Handle](#242-what-modal-should-handle)
  - [24.3 What OpenAI Should Handle](#243-what-openai-should-handle)
  - [24.4 What Codex Should Handle](#244-what-codex-should-handle)
- [25. Modal Features To Use](#25-modal-features-to-use)
  - [25.1 Modal Web Functions](#251-modal-web-functions)
  - [25.2 Modal Queues](#252-modal-queues)
  - [25.3 Modal Volumes](#253-modal-volumes)
  - [25.4 Modal Dicts](#254-modal-dicts)
  - [25.5 Modal Cron / Period Jobs](#255-modal-cron-period-jobs)
  - [25.6 Modal Sandboxes](#256-modal-sandboxes)
  - [25.7 Modal Batch Processing](#257-modal-batch-processing)
- [26. Best Modal Use Cases For DeepRound](#26-best-modal-use-cases-for-deepround)
  - [26.1 Resume Intelligence Pipeline](#261-resume-intelligence-pipeline)
  - [26.2 GitHub Repository Intelligence](#262-github-repository-intelligence)
  - [26.3 DumpFlex Processing](#263-dumpflex-processing)
  - [26.4 JD Intelligence Pipeline](#264-jd-intelligence-pipeline)
  - [26.5 Voice Session Post-Processing](#265-voice-session-post-processing)
  - [26.6 Parallel AI Panel](#266-parallel-ai-panel)
- [27. Proposed Technical Architecture](#27-proposed-technical-architecture)
  - [27.1 Runtime Split](#271-runtime-split)
- [28. Modal Services](#28-modal-services)
  - [28.1 Ingestion Worker](#281-ingestion-worker)
  - [28.2 Profile Analysis Worker](#282-profile-analysis-worker)
  - [28.3 GitHub Sandbox Worker](#283-github-sandbox-worker)
  - [28.4 JD Match Worker](#284-jd-match-worker)
  - [28.5 Voice Feedback Worker](#285-voice-feedback-worker)
  - [28.6 Refresh Worker](#286-refresh-worker)
  - [28.7 Hackathon Story Worker](#287-hackathon-story-worker)
- [29. MVP Modal Endpoints](#29-mvp-modal-endpoints)
- [30. Multi-Agent Architecture](#30-multi-agent-architecture)
  - [30.1 Agents](#301-agents)
  - [30.2 Common Context Window](#302-common-context-window)
- [31. Database Model](#31-database-model)
  - [31.1 Sources Table](#311-sources-table)
  - [31.2 Claims Table](#312-claims-table)
  - [31.3 Evidence Items Table](#313-evidence-items-table)
  - [31.4 Voice Sessions Table](#314-voice-sessions-table)
- [32. LLM Prompting Strategy](#32-llm-prompting-strategy)
  - [32.1 Extraction Schema Example](#321-extraction-schema-example)
  - [32.2 Multi-Pass Analysis](#322-multi-pass-analysis)
- [33. Trust and Safety](#33-trust-and-safety)
  - [33.1 Product Values](#331-product-values)
  - [33.2 Warnings DeepRound Should Give](#332-warnings-deepround-should-give)
- [34. Readiness Report](#34-readiness-report)
  - [34.1 Report Sections](#341-report-sections)
  - [34.2 Example Report](#342-example-report)
- [35. UI / UX Structure](#35-ui-ux-structure)
  - [35.1 Main Navigation](#351-main-navigation)
  - [35.2 Home Dashboard](#352-home-dashboard)
  - [35.3 Builder Profile Page](#353-builder-profile-page)
  - [35.4 DumpFlex Page](#354-dumpflex-page)
  - [35.5 Voice Playground Page](#355-voice-playground-page)
- [36. 7-Day Hackathon Build Plan](#36-7-day-hackathon-build-plan)
  - [Day 1: Product Skeleton and Data Model](#day-1-product-skeleton-and-data-model)
  - [Day 2: Resume and Project Ingestion](#day-2-resume-and-project-ingestion)
  - [Day 3: JD Match and Project Recommender](#day-3-jd-match-and-project-recommender)
  - [Day 4: DumpFlex and Refresh](#day-4-dumpflex-and-refresh)
  - [Day 5: Voice Playground](#day-5-voice-playground)
  - [Day 6: Hackathon Dashboard and Reports](#day-6-hackathon-dashboard-and-reports)
  - [Day 7: Demo Polish and Deployment](#day-7-demo-polish-and-deployment)
- [37. Hackathon Demo Script](#37-hackathon-demo-script)
  - [37.1 Narrative](#371-narrative)
  - [37.2 Demo Steps](#372-demo-steps)
  - [37.3 Strong Demo Moment](#373-strong-demo-moment)
- [38. Best OpenAI + Modal + Outskill Narrative](#38-best-openai-modal-outskill-narrative)
- [39. Best Use Of Modal Credits](#39-best-use-of-modal-credits)
- [40. What To Avoid](#40-what-to-avoid)
- [41. Final MVP Decision](#41-final-mvp-decision)
- [42. Final Positioning](#42-final-positioning)

<!-- DEEPROUND_GUIDE_END -->


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

## 2. Available Credits and Infrastructure Budget

DeepRound has access to multiple external compute/model credit pools during the hackathon.

These credits should be treated as **development, testing, experimentation, and demo infrastructure**, not as the long-term production business model.

### 2.1 Modal Labs Credits

Available Modal budget:

```txt
5 Modal Labs accounts
$250 credits per account
Total available Modal credits: ~$1,250
All accounts are on free tier
```

Recommended use:

- Account 1: main demo deployment
- Account 2: GitHub sandbox/repo inspection experiments
- Account 3: resume/JD batch processing tests
- Account 4: voice transcript/post-session scoring experiments
- Account 5: backup/demo fallback

Important constraint:

> Build DeepRound so it works with one Modal workspace/account. Do not design the core architecture to depend on sharding production workloads across multiple free-tier accounts.

The multiple accounts are useful for:

- experimentation
- fallback deployments
- parallel prototypes
- stress testing
- GPU trials
- backup demo infrastructure

Avoid:

- sharding production users across free accounts
- bypassing limits through account splitting
- building operational complexity around multiple accounts
- mentioning multiple free-tier accounts in the final public pitch

### 2.2 Hugging Face Credits

Available Hugging Face credits:

```txt
Account 1: $6.21
Account 2: $27.48
Account 3: $28.13
Account 4: $27.00
Account 5: $27.42
Total available HF credits: ~$116.24
```

These credits can help, but they should not be treated as the core production compute layer.

Best use:

- cheap inference testing
- open-source model experiments
- embeddings/reranking experiments
- sample datasets for resumes/JDs/projects
- lightweight Hugging Face Space demo if useful
- batch experiments for profile/JD matching

Avoid:

- fine-tuning LLMs for the MVP
- production realtime voice inference
- GPU-heavy experiments without clear product impact
- splitting production workloads across multiple HF accounts

### 2.3 OpenAI API Availability

The team has been informed that OpenAI API credits will not be provided for the hackathon. OpenAI should therefore be treated as a future upgrade path, not an MVP dependency.

Best use:

- realtime voice interviewer
- live interruption
- recursive technical probing
- final demo-quality feedback
- high-quality structured reasoning
- polished readiness reports

Cost-control approach:

```txt
Inference and testing -> Hugging Face Inference + mocks
Heavy backend processing -> Modal
Voice MVP -> browser speech capture/synthesis + HF/mock reasoning
Future upgrade -> OpenAI/OpenAI-compatible realtime provider
```

### 2.4 Credit Strategy

The practical strategy is:

```txt
Use Hugging Face first for MVP inference and testing
Use Modal for scalable backend execution and sandboxes
Use browser speech primitives for MVP voice I/O
Keep OpenAI/OpenAI-compatible adapters for later upgrades
Cache expensive outputs aggressively
Use mock/demo fixtures for repeated UI testing
```

This lets DeepRound keep development costs low while preserving demo quality.

---

## 3. Provider Routing Strategy

DeepRound should support multiple AI/model providers from day one.

This is not optional if credits are limited.

The product should not hardcode OpenAI into every background task.

### 3.1 Provider Roles

OpenAI:

- realtime voice
- high-quality reasoning
- recursive probing
- final feedback
- final demo flows

Modal:

- backend workers
- file processing
- repo inspection
- sandboxes
- refresh jobs
- parallel evaluation
- long-running jobs

Hugging Face:

- cheap inference testing
- embeddings
- reranking
- transcript summarization
- profile extraction experiments
- JD parsing experiments
- hackathon story draft experiments
- open-source model fallback

Mocks:

- repeated frontend testing
- demo fixture generation
- local development without spending credits

### 3.2 Task Routing

```txt
Realtime tasks:
- voice conversation
- interruption
- follow-up generation
- high-quality spoken feedback

Primary provider:
- OpenAI

Async/background tasks:
- resume analysis
- JD matching
- profile extraction
- project ranking
- DumpFlex classification
- report generation
- transcript summarization

Development provider:
- Hugging Face Inference or mock

Production/demo provider:
- OpenAI or hybrid

Execution provider:
- Modal
```

### 3.3 Provider Interface

Implement a provider abstraction:

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

type AIJob = {
  task: ModelTask;
  provider: ModelProvider;
  input: unknown;
  metadata?: {
    userId?: string;
    sourceId?: string;
    sessionId?: string;
    cacheKey?: string;
  };
};
```

This allows the same product workflow to switch between:

- OpenAI
- Hugging Face Inference Providers
- mock outputs
- future local/open-source models

### 3.4 Hugging Face Inference API Usage

Hugging Face Inference Providers can be used as a unified inference layer across multiple model providers and model types.

Use HF Inference for:

- profile extraction experiments
- resume/JD parsing drafts
- DumpFlex classification
- hackathon story drafts
- embeddings
- reranking
- summarization

Do not rely on HF Inference for:

- realtime voice
- final demo-critical interaction
- low-latency interruption
- high-stakes final scoring without validation

Reason:

> HF Inference quality and latency vary by model/provider. For the MVP, keep the loop turn-based and cache golden-path outputs so quality and latency remain demo-safe.

### 3.5 Caching Strategy

Cache all expensive AI outputs.

Cache by:

- user ID
- source hash
- task type
- provider
- prompt/schema version
- model name

Example cache key:

```txt
extract_profile:v3:openai:gpt-x:user_123:source_hash_abc
```

This prevents spending credits repeatedly while testing the UI.

### 3.6 Demo Strategy

For development:

- use mocks for UI
- use Hugging Face for cheap async tasks
- use Modal for background jobs
- use OpenAI only when testing voice quality

For final demo:

- use OpenAI for voice and top-level reasoning
- use Modal for backend worker credibility
- use precomputed/cached outputs for predictable flow
- keep Hugging Face as optional fallback/experimentation layer

---

## 4. Executive Summary

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

Hugging Face provides optional low-cost inference, embeddings/reranking experiments, datasets, and open-source model testing.

---

## 5. Core Product Thesis

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

## 6. Strategic Category

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

The product should feel like a system that knows the user's work, challenges weak claims, and helps them improve how they communicate.

---

## 7. Product North Star

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

## 8. Central Object: Builder Profile

DeepRound should be profile-centered, not feature-centered.

Every feature should read from and write to a shared `BuilderProfile`.

### 8.1 Builder Profile Schema

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

### 8.2 Why Builder Profile Matters

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

## 9. Product Layers

DeepRound should be structured into five layers.

```txt
Layer 1: Ingestion
Layer 2: Profile Intelligence
Layer 3: Recommendation and Strategy
Layer 4: Voice Playground
Layer 5: Output Artifacts
```

### 9.1 Layer 1: Ingestion

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

### 9.2 Layer 2: Profile Intelligence

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

### 9.3 Layer 3: Recommendation and Strategy

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

### 9.4 Layer 4: Voice Playground

This is the emotional center of the product.

Users speak. DeepRound listens, interrupts, probes, scores, and improves them.

MVP modes:

- Rapid Fire
- Deep Round
- JD Attack
- Communication Coach
- Panel Mode if time permits
- Hackathon Pitch Practice if time permits

### 9.5 Layer 5: Output Artifacts

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

## 10. Main Product Flow

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

## 11. MVP Product Scope

The hackathon is only 7 days. The MVP must be comprehensive enough to prove the ecosystem, but narrow enough to ship.

### 11.1 Strict MVP Priority Matrix

| Module / Feature | Priority | Scope and Constraints |
| :--- | :---: | :--- |
| **Builder Profile** | **P0** (Core) | Unified JSON-based profile model (skills, projects, claims) to act as common context. |
| **Voice Playground** | **P0** (Core) | Focus on **Deep Round Mode** (recursive depth probing) and **Project Defense Mode**. |
| **Resume/JD Analyzer** | **P1** (High) | Ingestion and mapping of claims vs. JD gaps. |
| **Project Recommender** | **P1** (High) | Scoring and ranking of best projects to present for a target role. |
| **DumpFlex (Text Ingestion)** | **P2** (Medium) | Text-only inbox. Classifies and maps raw developer notes to the profile. |
| **Readiness Report** | **P2** (Medium) | Simplified checklist-style feedback and overall readiness percentage. |
| **Hackathon Story Lab** | **P2** (Medium) | **Thin Demo-Support Feature**: Simple generator for pitch/judge Q&A drills, not a heavy module. |
| **Communication Coach** | **P2** (Medium) | Post-session feedback (filler words, pacing, structure) only; **no realtime interruption**. |

### 11.2 Core Feasibility Rules

* **Voice MVP Rule**: Do not block on OpenAI Realtime/WebRTC. Build push-to-talk browser speech capture, text fallback, HF/mock reasoning, and browser speech synthesis first. Keep realtime provider adapters as a future upgrade.

### 11.2 Post-MVP Roadmap

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

## 12. DumpFlex

DumpFlex should be a first-class concept.

Internally, treat it as a raw evidence inbox.

### 12.1 What Users Can Drop

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

### 12.2 DumpFlex Flow

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

### 12.3 Example DumpFlex Object

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

### 12.4 Suggested Actions

After processing a DumpFlex item, ask:

- Add to resume?
- Add to project story?
- Add to LinkedIn profile?
- Turn into voice practice?
- Use as proof for target JD?
- Ignore for now?

This makes the profile feel alive.

---

## 13. User Control and Exclusions

User trust is critical.

Users must control what the system can use.

### 13.1 Controls

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

### 13.2 Use Policy Schema

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

## 14. Refresh and Cache System

Refresh/cache is not a minor feature. It is core to making DeepRound a living profile system.

### 14.1 Cache Types

```txt
Raw Source Cache
Parsed Cache
Approved Profile Cache
Derived Recommendation Cache
Voice Session Cache
Progress Cache
```

### 14.2 Raw Source Cache

Stores original data:

- resume files
- GitHub fetched data
- JD text
- DumpFlex raw notes
- hackathon text
- blog text

### 14.3 Parsed Cache

Stores extracted entities:

- projects
- skills
- claims
- achievements
- technologies

### 14.4 Approved Profile Cache

Stores the user-approved Builder Profile.

This is the source of truth.

### 14.5 Derived Recommendation Cache

Stores generated outputs:

- project rankings
- JD match reports
- resume suggestions
- hackathon story drafts
- practice drills

### 14.6 Voice Session Cache

Stores:

- transcripts
- questions
- answers
- feedback
- scores
- interruptions

### 14.7 Progress Cache

Stores long-term progress:

- communication scores
- technical scores
- weak areas
- repeated mistakes
- readiness trends

### 14.8 Refresh Actions

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

## 15. Resume Intelligence

DeepRound should not be a generic resume optimizer.

It should be a resume evidence analyzer.

### 15.1 Resume Analysis Should Answer

- What claims are strong?
- What claims are unsupported?
- Which bullets are vague?
- Which projects should be highlighted?
- Which skills are listed but not proven?
- What metrics are missing?
- What is risky in a technical conversation?
- What should be removed?
- What should be rewritten?

### 15.2 Strong Feedback Example

Weak feedback:

```txt
Improve this bullet by adding action verbs.
```

Strong DeepRound feedback:

```txt
You mention RAG, LLMs, and vector databases, but your bullet does not prove retrieval quality, latency, evaluation, or deployment. Add one metric and one architecture decision.
```

### 15.3 Objective Resume Comparison

Resume comparison should be objective and evidence-based.

Avoid:

```txt
This resume is better than yours.
```

Use:

```txt
Compared to stronger resumes for AI Engineer Intern roles, your resume has lower proof density in deployment, metrics, evaluation, system tradeoffs, and project outcomes.
```

### 15.4 Resume Score Schema

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

## 16. JD Matching

JD matching should be a major differentiator.

### 16.1 JD Flow

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

### 16.2 Evidence Matching Principle

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

### 16.3 Example JD Match Output

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

## 17. Project Recommender

Users often do not know which project to present.

DeepRound should recommend the strongest project for a target role, company, level, location, or challenge.

### 17.1 Ranking Criteria

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

### 17.2 Example Output

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
"I built a RAG evaluation pipeline to compare chunking and retrieval strategies, then measured answer quality and latency tradeoffs."
```

---

## 18. Voice Playground

The Voice Playground is the core product experience.

### 18.1 Design Principle

Do not center the product around questions.

Center it around depth gaps.

Examples:

- "You said vector database, but did not explain indexing."
- "You mentioned scalability, but gave no bottleneck."
- "You described what you built, but not why this architecture was chosen."
- "You explained the happy path, but skipped failure modes."
- "You used advanced terms without grounding them."

### 18.2 Voice Modes

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

- Spoken English improvement (post-session metrics only)
- Clarity and confidence scoring
- Post-session feedback on pacing, structure, and filler word reduction
- *Note: No realtime interruptions during the session for communication errors to preserve voice loop responsiveness.*

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

## 19. Realtime Interruption Rules

Realtime interruption is the product's "wow" moment.

### 19.1 Interrupt When

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

### 19.2 Example Interruptions

```txt
Stop. You said "scalable," but scalable along which dimension?
```

```txt
Pause. That sounds memorized. Explain it using your actual project.
```

```txt
You are using jargon. Explain it without saying "semantic search."
```

```txt
You mentioned vector DB, but not indexing. Continue from there.
```

---

## 20. Communication and Technical Scoring

### 20.1 Communication Score

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

### 20.2 Technical Score

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

### 20.3 Strong Feedback Format

```txt
Score:
Technical Depth: 6/10
Communication: 7/10

What worked:
You correctly mentioned embeddings and vector similarity.

What was weak:
You did not explain indexing, ANN search, recall/latency tradeoff, or evaluation.

Better answer:
"Embeddings are dense numerical vectors that encode semantic meaning..."

Next drill:
Explain HNSW indexing in 60 seconds.
```

---

## 21. Company, Location, and Level Context

DeepRound should not ask generic questions.

It should adapt to:

- company
- location
- role
- level
- audience type
- JD
- user background

### 21.1 Company Context

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

### 21.2 Location Context

For India-focused users:

- campus placement expectations
- internship readiness
- spoken English confidence
- resume proof density
- project explanation clarity
- service/product company differences
- hackathon/demo culture

### 21.3 Level Context

Student / Intern:

- fundamentals
- project clarity
- learning ability
- implementation ownership

1-2 YOE:

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

## 22. Hackathon Dashboard

DeepRound should include a hackathon-specific dashboard because it directly supports the OpenAI x Outskill event.

### 22.1 Purpose

Not building the project.

Instead:

> Help users represent, sharpen, and defend hackathon ideas.

### 22.2 Inputs

- hackathon URL/text
- challenge statement
- judging criteria
- rough project idea
- target user
- team skills
- project constraints

### 22.3 Outputs

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

### 22.4 Example DeepRound Reframe

Weak framing:

```txt
AI interview prep tool.
```

Stronger framing:

```txt
Voice-first builder articulation platform that turns scattered proof of work into role-specific technical readiness.
```

---

## 23. Group Discussion Simulation

Group discussion simulation is valuable, but should not be in the 7-day MVP unless the core voice loop is already excellent.

### 23.1 Why It Is Hard

It requires:

- multiple AI personas
- turn-taking
- interruption logic
- disagreement handling
- social scoring
- moderation
- voice UX control

### 23.2 MVP Alternative

Build Panel Mode instead.

```txt
User speaks
        ↓
AI panel members evaluate one by one
        ↓
Coordinator summarizes feedback
```

This gives multi-perspective value without chaotic multi-speaker simulation.

### 23.3 Future GD Mode

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

## 24. Modal Strategy

Modal should power the cloud execution and heavy backend layer.

Hugging Face should power MVP inference and testing, while OpenAI/OpenAI-compatible providers remain future upgrade paths.

Codex should power rapid development.

### 24.1 Core Narrative

> DeepRound uses OpenAI for realtime voice reasoning and feedback, Codex to accelerate development, and Modal to run scalable backend intelligence pipelines that process resumes, inspect repositories, refresh profiles, compare JDs, and generate readiness reports.

### 24.2 What Modal Should Handle

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

### 24.3 What OpenAI Should Handle

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

### 24.4 What Codex Should Handle

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

## 25. Modal Features To Use

### 25.1 Modal Web Functions

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

### 25.2 Modal Queues

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

### 25.3 Modal Volumes

Use for persistent storage:

- uploaded resumes
- parsed text
- extracted profile JSON
- audio transcripts
- generated reports
- cached GitHub snapshots

### 25.4 Modal Dicts

Use for:

- temporary job status
- analysis cache
- refresh status
- session summaries
- deduplication keys

### 25.5 Modal Cron / Period Jobs

Use for:

- refreshing GitHub repos
- refreshing project rankings
- re-analyzing stale profile data
- clearing old recommendation cache
- running profile completeness checks

### 25.6 Modal Sandboxes

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

### 25.7 Modal Batch Processing

Use for:

- comparing resumes against benchmark patterns
- scoring projects
- generating embeddings
- running multiple evaluators in parallel

---

## 26. Best Modal Use Cases For DeepRound

### 26.1 Resume Intelligence Pipeline

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

### 26.2 GitHub Repository Intelligence

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

### 26.3 DumpFlex Processing

```txt
User dumps note/link/text
        ↓
Modal background worker classifies it
        ↓
OpenAI extracts achievements, skills, projects
        ↓
System suggests profile updates
```

### 26.4 JD Intelligence Pipeline

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

### 26.5 Voice Session Post-Processing

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

### 26.6 Parallel AI Panel

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

## 27. Proposed Technical Architecture

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

### 27.1 Runtime Split

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

## 28. Modal Services

Suggested Modal services:

```txt
deepround-ingestion
deepround-analysis
deepround-refresh
deepround-sandbox
deepround-panel
```

### 28.1 Ingestion Worker

Handles:

- resume upload
- document parsing
- raw text extraction
- source normalization

### 28.2 Profile Analysis Worker

Handles:

- structured profile extraction
- claim detection
- evidence mapping
- weak claim detection

### 28.3 GitHub Sandbox Worker

Handles:

- clone repo
- inspect files
- summarize architecture
- identify technologies
- detect project depth

### 28.4 JD Match Worker

Handles:

- JD parsing
- skill requirement extraction
- profile gap analysis
- project recommendation

### 28.5 Voice Feedback Worker

Handles:

- transcript post-processing
- scoring
- improved answer generation
- weak-area updates

### 28.6 Refresh Worker

Handles:

- scheduled source refresh
- cache invalidation
- diff generation
- user approval suggestions

### 28.7 Hackathon Story Worker

Handles:

- challenge parsing
- judging criteria extraction
- idea enrichment
- demo script generation

---

## 29. MVP Modal Endpoints

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

## 30. Multi-Agent Architecture

Internally, DeepRound can use specialized agents.

Externally, avoid calling it a generic personal AI assistant.

Better external names:

- Interview Readiness Panel
- Builder Coach
- DeepRound Arena
- Profile Intelligence Layer
- Technical Speaking Gym

### 30.1 Agents

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

### 30.2 Common Context Window

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

## 31. Database Model

To ensure high-speed iteration and avoid migration complexity during the 7-day hackathon, the database is flattened from a complex relational model to a 4-table schema leveraging PostgreSQL `JSONB` columns.

### 31.1 Schema Definition

#### 1. `users`
Tracks user credentials, authentication state, and registration metadata.
```ts
{
  id: string; // Primary Key
  email: string;
  passwordHash: string;
  createdAt: Date;
  metadata?: JSONB;
}
```

#### 2. `builder_profiles`
A single table containing the complete structured profile. All extracted skills, verified claims, and exclusions are stored within the JSONB payload.
```ts
{
  id: string; // Primary Key
  userId: string; // Foreign Key -> users.id
  profileData: JSONB; // Matches BuilderProfile schema (identity, projects, skills, claims, evidenceGraph, exclusionRules, preferences)
  updatedAt: Date;
}
```

#### 3. `dumpflex_items`
Tracks the raw inputs dropped by the user, their extraction status, and whether they have been approved to merge into the main profile.
```ts
{
  id: string; // Primary Key
  userId: string; // Foreign Key -> users.id
  type: "raw_note" | "commit" | "pr" | "screenshot" | "link";
  content: string;
  extractedEntities: JSONB; // Draft projects, skills, or achievements extracted
  status: "needs_review" | "approved" | "ignored";
  createdAt: Date;
}
```

#### 4. `voice_sessions`
Stores speech transcripts, raw turns, evaluation scores, and the generated post-session feedback report.
```ts
{
  id: string; // Primary Key
  userId: string; // Foreign Key -> users.id
  mode: "rapid_fire" | "deep_round" | "jd_attack" | "project_defense" | "hackathon_pitch";
  targetRole?: string;
  targetCompany?: string;
  startedAt: Date;
  endedAt: Date;
  transcript: JSONB; // Array of turns: [{ speaker: "ai"|"user", text: string, timestamp: number }]
  summary: string;
  technicalScore: number;
  communicationScore: number;
  feedbackReport: JSONB; // Full evaluation report (clarity, specificity, tradeoffs, action items)
}
```

---

## 32. LLM Prompting Strategy

Use structured outputs.

Do not ask the model for random prose when extracting facts.

### 32.1 Extraction Schema Example

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

### 32.2 Multi-Pass Analysis

For important workflows:

1. Extract facts.
2. Map evidence.
3. Generate recommendations.
4. Generate user-facing explanation.

This is more reliable than one giant prompt.

---

## 33. Trust and Safety

DeepRound should not help users fake expertise.

### 33.1 Product Values

- honest
- evidence-based
- direct
- user-controlled
- improvement-focused

### 33.2 Warnings DeepRound Should Give

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

## 34. Readiness Report

After analysis and voice practice, generate a report.

### 34.1 Report Sections

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

### 34.2 Example Report

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

## 35. UI / UX Structure

### 35.1 Main Navigation

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

### 35.2 Home Dashboard

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

### 35.3 Builder Profile Page

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

### 35.4 DumpFlex Page

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

### 35.5 Voice Playground Page

Mode cards:

- Rapid Fire
- Deep Round
- JD Attack
- Project Defense
- Communication Coach
- Hackathon Pitch
- Panel Mode

---

## 36. 7-Day Hackathon Build Plan

### Day 1: Product Skeleton and Data Model

Build:

- App shell and navigation skeleton
- Database setup with **4-table JSONB schema** (`users`, `builder_profiles`, `dumpflex_items`, `voice_sessions`)
- Profile and claims schema validation via Pydantic / TypeScript types

Pages:

- Home Dashboard
- Builder Profile (with basic manual edit form)
- DumpFlex (raw input box)
- Voice Playground (placeholder screen)

Goal:

```txt
A user can create a profile and manually add projects/skills stored in JSONB.
```

### Day 2: Resume and Project Ingestion

Build:

- Resume PDF parser and extraction worker
- OpenAI/HF extraction parser to populate BuilderProfile structure
- Source tracking, diff view, and manual approval UI for extracted changes

Goal:

```txt
Upload resume -> get draft BuilderProfile -> user approves differences -> profile updates.
```

### Day 3: JD Match and Project Recommender

Build:

- JD capability extraction parser
- Profile gap comparison and scoring
- Project relevance ranker
- **Voice MVP Checkpoint**: Verify browser push-to-talk capture, text fallback, HF/mock response generation, and browser speech synthesis. Do not add external audio providers unless the core loop is already stable.

Goal:

```txt
Paste JD -> get recommended projects and gap drills + hard freeze on voice backend strategy.
```

### Day 4: DumpFlex and Refresh

Build:

- DumpFlex text classifier (classify note as project, skill, or claim)
- Commit and PR scraper/parser for GitHub integration
- Suggested profile updates approval drawer
- Scheduled refresh jobs

Goal:

```txt
User drops commit or text note -> system identifies corresponding profile field and suggests merge.
```

### Day 5: Voice Playground

Build:

- Voice session UI using push-to-talk browser speech capture plus text fallback
- Deep Round (depth probing) and Project Defense (architecture questions) modes
- Session transcript recording
- **Post-Session Communication Coach**: Log turn timings and counts to calculate pacing and filler word rates. Generate communication scores post-session (no active interruption for communication errors).

Goal:

```txt
User conducts voice session -> receives inline interruption for technical depth gaps -> transcript captured.
```

### Day 6: Hackathon Story Dashboard and Reports

Build:

- **Hackathon Story Lab (Thin Demo-Support)**: Simple generator that transforms the user's project profile into a 1-minute pitch outline and a list of expected judge questions.
- Post-session scoring merger and structured readiness report generator
- Dashboard polish (adding progress charts and recommendation cards)

Goal:

```txt
Paste hackathon challenge -> get pitch outline, readiness report, and custom judge practice round.
```

### Day 7: Demo Polish and Deployment

Build:

- Cache "golden path" sample dataset for predictable, sub-second latency demo performance
- Add visual indicators, loading skeletons, and fallback states
- Final application deployment to production/demo environments

Goal:

```txt
One compelling, lag-free 3-minute demo video or live presentation.
```

---

## 37. Hackathon Demo Script

### 37.1 Narrative

```txt
Builders can now ship fast with Codex.
But shipping is not the same as explaining.
DeepRound solves the explainability gap.
```

### 37.2 Demo Steps

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

### 37.3 Strong Demo Moment

Use the real trigger story:

```txt
Question: Explain how embeddings are represented and retrieved in a vector database.
```

Then show DeepRound catching a vague answer.

---

## 38. Best OpenAI + Modal + Outskill Narrative

Use this in the final pitch:

> DeepRound is built for the OpenAI x Outskill hackathon because the core problem is created by the new Codex era: builders can ship faster than ever, but they struggle to deeply explain what they built. We use OpenAI for real-time voice reasoning and feedback, Codex to accelerate development, and Modal to run scalable background intelligence pipelines that process proof of work, inspect projects, refresh profiles, and generate role-specific readiness plans.

This shows:

- OpenAI product alignment
- Codex usage depth
- Modal infrastructure depth
- real product architecture
- strong hackathon relevance

---

## 39. Best Use Of Modal Credits

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

## 40. What To Avoid

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

## 41. Final MVP Decision

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

## 42. Final Positioning

Long version:

> DeepRound is a voice-first builder readiness platform that turns resumes, projects, GitHub, job descriptions, and raw achievements into a living builder profile, then helps users practice and improve how they explain their work through real-time technical voice feedback.

Short version:

> DeepRound helps builders become as good at explaining their work as they are at building it.

Sharpest category phrase:

> A technical articulation gym for modern builders.
