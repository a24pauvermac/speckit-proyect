---

description: "Task list for PianoMaster PWA implementation"
---

# Tasks: PianoMaster PWA

**Input**: Design documents from `/specs/001-piano-master-pwa/`
**Prerequisites**: plan.md (required), spec.md (required), data-model.md, research.md, contracts/

**Tests**: Not explicitly requested in feature specification - skip test generation

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Nuxt project: root directory
- Components: `components/`
- Composables: `composables/`
- Pages: `pages/`
- Types: `types/`

---

## Phase 1: Setup

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize Nuxt.js 3 project with Vite
- [X] T002 Install dependencies: dexie, @google/generative-ai, @vite-pwa/nuxt, @nuxtjs/i18n
- [X] T003 Configure nuxt.config.js with PWA, i18n, and compatibility date
- [X] T004 Create vite.config.js with PWA configuration
- [X] T005 Configure package.json scripts (dev, build, generate, preview)
- [X] T006 Create .env.example with NUXT_PUBLIC_GEMINI_API_KEY placeholder

---

## Phase 2: Foundational

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 [P] Create JavaScript interfaces in types/index.js (UserProfile, MethodBook, Lesson, Exercise, PracticeSession, LessonProgress, MetronomeSettings, GameRecord, ChatMessage)
- [X] T008 [P] Initialize Dexie.js database in plugins/db.client.js with all tables and indexes
- [X] T009 [P] Create global CSS in assets/css/main.css with CSS variables (colors, spacing, animations)
- [X] T010 [P] Create default layout in layouts/default.vue with navigation
- [X] T011 Create composable useDatabase.js for database operations
- [X] T012 Create composable useAudioEngine.js for Web Audio API initialization
- [X] T013 Configure i18n with Spanish and English locale files in locales/
- [X] T014 Create app.vue entry point with language detection

---

## Phase 3: User Story 1 - Daily Practice Routine Management (Priority: P1)

**Goal**: Allow users to create custom method books and generate structured daily practice routines

**Independent Test**: User can create a method book with lessons, select a lesson, and generate a practice routine with time allocations

### Implementation for User Story 1

- [X] T015 [P] [US1] Create method book CRUD composable in composables/useMethodBooks.js
- [X] T016 [P] [US1] Create lesson CRUD composable in composables/useLessons.js
- [X] T017 [P] [US1] Create practice session composable in composables/usePracticeSessions.js
- [X] T018 [US1] Create MethodBookCard component in components/practice/MethodBookCard.vue
- [X] T019 [US1] Create LessonList component in components/practice/LessonList.vue
- [X] T020 [US1] Create PracticeRoutine component in components/practice/PracticeRoutine.vue
- [X] T021 [US1] Create practice dashboard page in pages/practice/index.vue
- [X] T022 [US1] Create method book editor page in pages/practice/book/[id].vue
- [X] T023 [US1] Implement routine generator logic in composables/useRoutineGenerator.js

---

## Phase 4: User Story 2 - Professional Metronome (Priority: P1)

**Goal**: Provide a professional metronome with adjustable BPM, time signatures, and tap tempo

**Independent Test**: User can set BPM to 120, select 4/4 time signature, start metronome, and hear accurate beats at exactly 120 BPM

### Implementation for User Story 2

- [X] T024 [P] [US2] Create MetronomeEngine class in composables/useMetronome.js
- [X] T025 [US2] Create metronome visual component in components/metronome/MetronomeVisual.vue
- [X] T026 [US2] Create BPM control component in components/metronome/BpmControl.vue
- [X] T027 [US2] Create time signature selector in components/metronome/TimeSignatureSelector.vue
- [X] T028 [US2] Create tap tempo component in components/metronome/TapTempo.vue
- [X] T029 [US2] Create metronome settings persistence in composables/useMetronomeSettings.js
- [X] T030 [US2] Create metronome page in pages/metronome.vue

---

## Phase 5: User Story 3 - Sight-Reading Games (Priority: P2)

**Goal**: Provide interactive games for note identification, rhythm matching, and interval recognition

**Independent Test**: User can start a note identification game, identify displayed notes, and receive immediate feedback

### Implementation for User Story 3

- [X] T031 [P] [US3] Create game engine base in composables/useGameEngine.js
- [X] T032 [P] [US3] Create note identification game logic in composables/useNoteGame.js
- [X] T033 [P] [US3] Create rhythm game logic in composables/useRhythmGame.js
- [X] T034 [P] [US3] Create interval game logic in composables/useIntervalGame.js
- [X] T035 [P] [US3] Create game score composable in composables/useGameScores.js
- [X] T036 [US3] Create game card component in components/games/GameCard.vue
- [X] T037 [US3] Create note display component in components/games/NoteDisplay.vue
- [X] T038 [US3] Create rhythm display component in components/games/RhythmDisplay.vue
- [X] T039 [US3] Create interval display component in components/games/IntervalDisplay.vue
- [X] T040 [US3] Create games hub page in pages/games/index.vue
- [X] T041 [US3] Create note game page in pages/games/notes.vue
- [X] T042 [US3] Create rhythm game page in pages/games/rhythm.vue
- [X] T043 [US3] Create interval game page in pages/games/intervals.vue

---

## Phase 6: User Story 4 - Progress Tracking (Priority: P2)

**Goal**: Track practice progress and display statistics

**Independent Test**: User can view total practice time, lessons completed, and streak days

### Implementation for User Story 4

- [X] T044 [P] [US4] Create progress statistics composable in composables/useProgress.js
- [X] T045 [P] [US4] Create streak calculation logic in composables/useStreak.js
- [X] T046 [US4] Create statistics card component in components/ui/StatisticsCard.vue
- [X] T047 [US4] Create progress chart component in components/ui/ProgressChart.vue
- [X] T048 [US4] Create history list component in components/ui/HistoryList.vue
- [X] T049 [US4] Create progress page in pages/progress.vue

---

## Phase 7: User Story 5 - Offline-First Operation (Priority: P1)

**Goal**: Ensure all features work offline after initial load

**Independent Test**: App works identically offline vs online after first visit

### Implementation for User Story 5

- [X] T050 [P] [US5] Configure PWA manifest in pwa.config.js
- [X] T051 [P] [US5] Add PWA icons to public/icons/
- [X] T052 [US5] Configure service worker in nuxt.config.js
- [X] T053 [US5] Add offline detection component in components/ui/OfflineIndicator.vue
- [X] T054 [US5] Test offline functionality

---

## Phase 8: User Story 6 - Teacher Chat (Priority: P3)

**Goal**: Provide AI-powered chat with tutor persona, local storage, and data export

**Independent Test**: User can send a message, receive AI response, and export chat history

### Implementation for User Story 6

- [X] T055 [P] [US6] Create chat composable in composables/useChat.js
- [X] T056 [P] [US6] Create server API route for Gemini proxy in server/api/chat.post.js
- [X] T057 [US6] Create message component in components/chat/ChatMessage.vue
- [X] T058 [US6] Create chat input component in components/chat/ChatInput.vue
- [X] T059 [US6] Create chat page in pages/chat.vue
- [X] T060 [US6] Create data export composable in composables/useDataExport.js
- [X] T061 [US6] Add export functionality to settings page

---

## Phase 9: Settings & Polish

**Purpose**: User preferences, settings, and final polish

- [X] T062 [P] Create settings composable in composables/useSettings.js
- [X] T063 [P] Create language switcher component in components/ui/LanguageSwitcher.vue
- [X] T064 Create settings page in pages/settings.vue
- [X] T065 Create home/dashboard page in pages/index.vue
- [X] T066 Add accessibility attributes throughout app (ARIA labels, keyboard navigation)
- [X] T067 Test all WCAG 2.1 AA requirements

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3-8)**: All depend on Foundational phase completion
  - US1, US2, US5 can proceed in parallel (all P1/P1/P1)
  - US3, US4 can start after Foundational
  - US6 can start after Foundational
- **Polish (Phase 9)**: Depends on all user stories being complete

### Within Each User Story

- Composables before components
- Components before pages
- Core implementation before integration

### Parallel Opportunities

- T007-T010 can run in parallel (foundational setup)
- T015-T017 can run in parallel (US1 composables)
- T031-T035 can run in parallel (US3 game logic)
- T044-T047 can run in parallel (US4 components)
- T050-T051 can run in parallel (PWA setup)
- T055-T056 can run in parallel (US6 chat)

---

## Implementation Strategy

### MVP First (User Story 1 - Practice Routine)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test practice routine independently

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (Practice Routine) → Test → Deploy/Demo (MVP!)
3. Add US2 (Metronome) → Test → Deploy/Demo
4. Add US5 (Offline-First) → Test → Deploy/Demo
5. Add US3 (Games) → Test → Deploy/Demo
6. Add US4 (Progress) → Test → Deploy/Demo
7. Add US6 (Chat) → Test → Deploy/Demo
8. Polish phase → Final release

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: US1 (Practice Routine)
   - Developer B: US2 (Metronome)
   - Developer C: US5 (Offline-First)
3. Then:
   - Developer A: US3 (Games)
   - Developer B: US4 (Progress)
   - Developer C: US6 (Chat)
4. Polish together

---

## Notes

- [P] tasks = different files, no dependencies
- [US#] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Verify metronome latency <20ms (SC-003)
- Verify offline functionality works (SC-006)
