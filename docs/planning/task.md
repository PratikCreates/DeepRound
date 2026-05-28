# DeepRound MVP Implementation Tasks

- [ ] **Phase 1: Foundation Setup**
  - [ ] Initialize Next.js 14 project in workspace
  - [ ] Configure TailwindCSS & glassmorphic theme variables
  - [ ] Install core dependencies (`prisma`, `@prisma/client`, `zod`, `lucide-react`)
  - [ ] Set up environment variable validation via Zod (checking `DATABASE_URL`, `HF_TOKEN_PRIMARY`, optional standby HF tokens)
  - [ ] Scaffold folder layout (`src/lib/ai`, `src/lib/schemas`, `src/lib/prompts`, etc.)

- [ ] **Phase 2: Data Layer Integration**
  - [ ] Configure Prisma schema with the 4 JSONB-based tables (`User`, `Profile`, `DumpflexItem`, `VoiceSession`)
  - [ ] Run initial database migration & generate prisma client
  - [ ] Write Zod schema validation rules for `BuilderProfile`, `VoiceSession`, and AI outputs
  - [ ] Create DB seed script to populate a "golden path" developer profile fixture

- [ ] **Phase 3: Backend API Routes**
  - [ ] Implement `GET /api/profile` and `PATCH /api/profile` with Zod validation
  - [ ] Implement `POST /api/dumpflex` for text updates and `POST /api/dumpflex/[id]/approve` for merging items into the profile
  - [ ] Implement `POST /api/jd/analyze` for capability mapping
  - [ ] Implement `POST /api/github/inspect` to trigger Modal repository analysis
  - [ ] Implement `POST /api/voice/session` and `POST /api/voice/session/[id]/finish` session lifecycle endpoints
  - [ ] Implement `PATCH /api/voice/session/[id]` for turn-by-turn fallback transcript appending
  - [ ] Implement `GET /api/voice/session/[id]` for retrieving transcripts, scores, and feedback reports
  - [ ] Write Next.js middleware for simple passwordless email session authentication

- [ ] **Phase 4: Configurable Provider Router**
  - [ ] Create `src/lib/ai/router.ts` gateway logic
  - [ ] Implement `mock` provider task wrapper for UI development and demo safety
  - [ ] Implement `huggingface` serverless inference wrapper for async tasks
  - [ ] Implement `openai-compatible` adapter placeholder for future provider upgrades

- [ ] **Phase 5: Browser Voice Loop (Day-1 Priority)**
  - [ ] Implement `GET /api/voice/browser` voice-loop config endpoint
  - [ ] Build push-to-talk browser speech component with transcript capture
  - [ ] Implement text-input fallback for browsers without speech recognition
  - [ ] Connect captured transcript to HF/mock provider router for voice drill responses

- [ ] **Phase 6: Modal Sandbox Worker**
  - [ ] Set up Modal deployment parameters in `modal/workers.py`
  - [ ] Implement shallow-cloning repository scraper (`git clone --depth 1`)
  - [ ] Build static config dependency scanner (parsing files, routing trees, and READMEs)
  - [ ] Create Client wrapper in Next.js to trigger Modal analysis and check job status inside `profileData.system.jobs`

- [ ] **Phase 7: MVP UI Screens & Polish**
  - [ ] Build premium home Dashboard showing readiness stats & gaps
  - [ ] Build Profile Editor with manual override options
  - [ ] Build DumpFlex Review Inbox drawer
  - [ ] Build Voice Playground interface with live transcript scrolling & interruption displays
  - [ ] Polish layout and prepare cached data for the final 3-minute demo script

- [ ] **Phase 8: Final Verification & Rehearsal**
  - [ ] Run Prisma seed script check to confirm DB hydration
  - [ ] Validate raw mock model outputs against Zod schema fixtures
  - [ ] Perform a full browser voice/text fallback smoke test
  - [ ] Complete 5 successful runs of the golden-path demo script to confirm zero latency/network blockage
