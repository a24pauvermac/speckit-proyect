# Data Model: PianoMaster PWA

## Entities

### UserProfile

Represents the piano student's profile and preferences.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string (UUID) | Yes | Primary key |
| name | string | Yes | Student's name |
| createdAt | Date | Yes | Profile creation timestamp |
| updatedAt | Date | Yes | Last update timestamp |
| language | string | Yes | 'es' or 'en' |
| theme | string | No | Future: light/dark mode |
| defaultBpm | number | No | Default metronome tempo (default: 80) |
| defaultTimeSignature | string | No | Default time signature (default: '4/4') |

### MethodBook

A piano method book (preset or user-created).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string (UUID) | Yes | Primary key |
| name | string | Yes | Book title (e.g., "Beyer Op.101") |
| author | string | No | Book author |
| isPreset | boolean | Yes | True if built-in book |
| description | string | No | Book description |
| createdAt | Date | Yes | Creation timestamp |

### Lesson

A lesson within a method book.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string (UUID) | Yes | Primary key |
| bookId | string | Yes | Foreign key to MethodBook |
| number | number | Yes | Lesson number/order |
| title | string | Yes | Lesson title |
| description | string | No | Lesson description |
| exercises | Exercise[] | Yes | Array of exercises |
| recommendedMinutes | number | Yes | Suggested practice time |

### Exercise

A specific exercise within a lesson.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string (UUID) | Yes | Primary key |
| lessonId | string | Yes | Foreign key to Lesson |
| title | string | Yes | Exercise title |
| type | string | Yes | 'technique', 'etude', 'scale', 'piece' |
| bpm | number | No | Recommended tempo |
| duration | number | Yes | Duration in minutes |
| objectives | string[] | No | Technical goals |

### PracticeSession

A completed or in-progress practice session.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string (UUID) | Yes | Primary key |
| date | Date | Yes | Session start date |
| bookId | string | Yes | Method book practiced |
| lessonId | string | Yes | Lesson practiced |
| duration | number | Yes | Total minutes |
| completed | boolean | Yes | Whether session finished |
| exercises | SessionExercise[] | Yes | Completed exercises |
| notes | string | No | User notes |

### LessonProgress

Tracks progress through method books.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string (UUID) | Yes | Primary key |
| bookId | string | Yes | Method book |
| lessonId | string | Yes | Lesson |
| completedAt | Date | No | When lesson was completed |
| timesCompleted | number | Yes | Times practiced |
| bestSession | number | No | Best session duration |

### MetronomeSettings

User's metronome preferences.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string (UUID) | Yes | Primary key |
| bpm | number | Yes | Current tempo (40-240) |
| timeSignature | string | Yes | '2/4', '3/4', '4/4', '6/8' |
| soundEnabled | boolean | Yes | Audio on/off |
| vibrationEnabled | boolean | Yes | Haptic feedback |

### GameRecord

A completed game session with score.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string (UUID) | Yes | Primary key |
| gameType | string | Yes | 'notes', 'rhythm', 'intervals' |
| score | number | Yes | Points earned |
| correct | number | Yes | Correct answers |
| total | number | Yes | Total questions |
| difficulty | string | Yes | 'easy', 'medium', 'hard' |
| playedAt | Date | Yes | Game timestamp |
| duration | number | Yes | Game duration in seconds |

### ChatMessage

A message in the teacher chat.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string (UUID) | Yes | Primary key |
| role | string | Yes | 'user' or 'assistant' |
| content | string | Yes | Message text |
| timestamp | Date | Yes | Message time |

---

## Relationships

```
UserProfile (1) ─────< (N) MethodBook
MethodBook (1) ─────< (N) Lesson
Lesson (1) ─────< (N) Exercise
UserProfile (1) ─────< (N) PracticeSession
Lesson (1) ─────< (N) LessonProgress
UserProfile (1) ─────< (N) MetronomeSettings
UserProfile (1) ─────< (N) GameRecord
UserProfile (1) ─────< (N) ChatMessage
```

---

## State Transitions

### Practice Session States
1. **Created** → User starts practice
2. **In Progress** → User completing exercises
3. **Completed** → User finishes all exercises OR ends session
4. **Abandoned** → App closed mid-session (auto-saved)

### Game Difficulty States
- **Easy**: 5 questions, basic notes/rhythms
- **Medium**: 10 questions, harder content
- **Hard**: 15 questions, all content types

Difficulty auto-adjusts based on last 5 game scores:
- 80%+ correct → increase difficulty
- <50% correct → decrease difficulty

---

## Validation Rules

### UserProfile
- name: 1-100 characters
- language: must be 'es' or 'en'
- defaultBpm: 40-240

### Lesson
- number: positive integer
- recommendedMinutes: 1-120

### Exercise
- bpm: 40-240 (if provided)
- duration: 1-60 minutes
- type: enum value

### MetronomeSettings
- bpm: 40-240
- timeSignature: enum value

### GameRecord
- score: >= 0
- correct: >= 0, <= total
- total: > 0

---

## Indexes (Dexie.js)

```javascript
// MethodBook indexes
methodBooks.byPreset = 'isPreset';

// Lesson indexes  
lessons.byBook = 'bookId';

// PracticeSession indexes
practiceSessions.byDate = 'date';
practiceSessions.byBook = 'bookId';

// LessonProgress indexes
lessonProgress.byBookLesson = ['bookId', 'lessonId'];

// GameRecord indexes
gameRecords.byType = 'gameType';
gameRecords.byDate = 'playedAt';

// ChatMessage indexes
chatMessages.byDate = 'timestamp';
```
