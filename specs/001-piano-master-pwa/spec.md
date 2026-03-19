# Feature Specification: PianoMaster PWA

**Feature Branch**: `001-piano-master-pwa`  
**Created**: 2026-03-11  
**Status**: Draft  
**Input**: User description: "Crea una aplicación PWA llamada PianoMaster, un ecosistema de estudio personal..."

## Clarifications

### Session 2026-03-11

- Q: Teacher Chat privacy model → A: Local-only storage with optional export (users can export their data but no cloud sync)
- Q: Target platform strategy → A: Mobile-first (iOS Safari + Android Chrome)
- Q: Method book scope → A: Users can add custom books/methods (not limited to predefined set)
- Q: Accessibility standards → A: WCAG 2.1 AA compliance
- Q: Supported languages → A: Spanish + English

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Daily Practice Routine Management (Priority: P1)

As a piano student, I want to create and follow a structured daily practice routine based on my piano method book (either preset or custom) so that I can practice with clear goals and time allocations.

**Why this priority**: This is the core value proposition - without structured practice routines, the app has no purpose. All other features support this primary workflow.

**Independent Test**: Can be tested by selecting a piano book, choosing a lesson, and receiving a complete daily practice plan with timed exercises. The user can complete the entire practice session without any other feature.

**Acceptance Scenarios**:

1. **Given** the user has added a custom method book with lessons, **When** they select a lesson, **Then** the system generates a daily routine with specific exercises, time allocations, and technical objectives.

2. **Given** the user is following a generated practice routine, **When** they complete an exercise, **Then** the system marks it as done and shows progress toward completing the daily session.

3. **Given** the user has completed all exercises in a lesson, **When** they request the next lesson, **Then** the system advances their progress and generates a new daily routine.

4. **Given** the user wants to add their own method book, **When** they create a new book with lessons and exercises, **Then** the book appears in their selection list for generating practice routines.

---

### User Story 2 - Professional Metronome (Priority: P1)

As a piano student, I want a professional metronome with customizable tempo and time signatures so that I can develop precise rhythmic accuracy during practice.

**Why this priority**: Rhythm precision is fundamental to piano education. The metronome must be immediately available during practice sessions.

**Independent Test**: Can be tested by setting tempo (BPM), choosing time signature, and verifying the metronome produces accurate beats. User can practice with metronome without any other feature.

**Acceptance Scenarios**:

1. **Given** the metronome is stopped, **When** the user sets BPM to 120 and taps "Start", **Then** the metronome plays at exactly 120 beats per minute with audible clicks.

2. **Given** the metronome is playing, **When** the user changes time signature from 4/4 to 3/4, **Then** the accent pattern changes to emphasize the first beat of each measure.

3. **Given** the metronome is playing, **When** the user taps "tap tempo", **Then** the system calculates and sets BPM based on the tapped rhythm.

---

### User Story 3 - Sight-Reading Games (Priority: P2)

As a piano student, I want to interact with games that help me read notes and rhythms faster so that I can improve my music literacy through engaging practice.

**Why this priority**: Sight-reading is a critical skill that benefits from frequent, short practice sessions. Games make this practice enjoyable and motivating.

**Independent Test**: Can be tested by playing any game (e.g., note identification, rhythm matching) and achieving a score. Games work independently of practice routines.

**Acceptance Scenarios**:

1. **Given** the user starts a "Note Reader" game, **When** a note is displayed on a musical staff, **Then** the user can tap the correct note name and receive immediate feedback.

2. **Given** the user completes a game session, **When** the game ends, **Then** their score is saved and compared to previous records.

3. **Given** the user wants to improve their score, **When** they replay a game, **Then** the difficulty adapts based on previous performance.

---

### User Story 4 - Progress Tracking (Priority: P2)

As a piano student, I want to track my practice progress and view history so that I can see how much I've improved over time.

**Why this priority**: Seeing progress motivates continued practice. Users need to understand their improvement journey.

**Independent Test**: Can be tested by viewing practice history and seeing progress metrics. Works without any other feature.

**Acceptance Scenarios**:

1. **Given** the user has practiced for several days, **When** they open the progress view, **Then** they see total practice time, lessons completed, and streak days.

2. **Given** the user wants to review past practice, **When** they access history, **Then** they can see daily practice sessions with exercises completed and time spent.

---

### User Story 5 - Offline-First Operation (Priority: P1)

As a piano student, I want the app to work without internet after the first load so that I can practice anywhere, anytime, without connectivity concerns.

**Why this priority**: Students practice in various locations (home, studio, travel). Offline access ensures uninterrupted practice.

**Independent Test**: Can be tested by loading the app online, disconnecting, and verifying all features continue working.

**Acceptance Scenarios**:

1. **Given** the app has been loaded once with internet, **When** the device is offline, **Then** all features work identically to online mode.

2. **Given** the user makes progress while offline, **When** internet is restored, **Then** all data remains safely stored on the device.

---

### User Story 6 - Teacher Chat (Priority: P3)

As a piano student, I want to have a local chat with my teacher so that I can keep notes and receive guidance that stays private on my device. All messages are stored locally with optional export capability.

**Why this priority**: Some students want to maintain a record of teacher communications for reference. Privacy is paramount.

**Independent Test**: Can be tested by sending and receiving messages. Works independently of other features.

**Acceptance Scenarios**:

1. **Given** the user opens the chat, **When** they type and send a message, **Then** the message is stored locally with timestamp.

2. **Given** the user returns to the app, **When** they open chat history, **Then** all previous messages are displayed in chronological order.

3. **Given** the user wants to backup their data, **When** they use the export function, **Then** all chat messages are included in the export file.

---

### Edge Cases

- What happens when the user selects a book but the lesson doesn't exist?
- How does the system handle metronome audio when the device is muted?
- What happens if the user closes the app mid-practice session?
- How does the app handle very slow or very fast tempo settings?
- What happens when storage is full and user tries to save data?
- How are game scores handled when played offline?
- How does the app handle users who rely on screen readers or voice controls?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to add custom piano method books with lessons and exercises
- **FR-002**: System MUST generate daily practice routines with time allocations for each exercise
- **FR-003**: System MUST track completed exercises and lesson progress
- **FR-004**: System MUST provide a metronome with adjustable BPM (40-240)
- **FR-005**: System MUST support common time signatures (2/4, 3/4, 4/4, 6/8)
- **FR-006**: System MUST include tap tempo functionality to determine BPM from user taps
- **FR-007**: System MUST provide at least 3 sight-reading games (note identification, rhythm matching, interval recognition)
- **FR-008**: System MUST track and display game high scores
- **FR-009**: System MUST save all progress locally on device storage
- **FR-010**: System MUST function fully offline after initial load
- **FR-011**: System MUST provide PWA install capability on supported browsers
- **FR-012**: System MUST display practice statistics (total time, streak, lessons completed)
- **FR-013**: System MUST allow sending and storing text messages in a local chat log
- **FR-014**: System MUST allow users to export all their data (practice history, game scores, chat messages) to a local file
- **FR-015**: System MUST be optimized for mobile browsers (iOS Safari, Android Chrome)
- **FR-016**: System MUST comply with WCAG 2.1 AA accessibility standards
- **FR-017**: System MUST support Spanish and English languages

### Key Entities

- **User Profile**: Stores student name, selected method book, current lesson, preferences
- **Method Book**: Contains lesson structure, exercises, and recommended practice times. Can be preset or user-created.
- **Practice Session**: Records date, duration, exercises completed, notes
- **Lesson Progress**: Tracks which lessons have been completed and performance notes
- **Metronome Settings**: Stores preferred BPM, time signature, sound preferences
- **Game Record**: Stores game type, score, date played, difficulty level
- **Chat Message**: Stores sender, timestamp, message content

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can generate a complete daily practice routine in under 30 seconds
- **SC-002**: Users complete their first practice session within 2 minutes of app launch
- **SC-003**: Metronome produces accurate beats with latency under 20 milliseconds
- **SC-004**: All games load and function within 3 seconds on standard mobile connections
- **SC-005**: App loads completely within 5 seconds on 3G connection (first visit)
- **SC-006**: All features remain functional for at least 30 minutes of offline use
- **SC-007**: Practice progress is retained after app restart or device restart
- **SC-008**: 90% of users successfully complete at least one game session on first try
