# API Contract: Practice Service

## Overview
Internal service interface for practice routine management.

## Methods

### createPracticeSession(session: PracticeSessionInput): Promise<PracticeSession>

Creates a new practice session.

**Input**:
```javascript
// Input:
interface PracticeSessionInput {
  bookId: string;
  lessonId: string;
}
```

**Output**:
```javascript
interface PracticeSession {
  id: string;
  date: Date;
  bookId: string;
  lessonId: string;
  duration: number;
  completed: boolean;
  exercises: SessionExercise[];
  notes: string;
}
```

---

### completeExercise(sessionId, exerciseId)

Marks an exercise as completed in a session.

**Input**:
- sessionId: string
- exerciseId: string

---

### generateDailyRoutine(bookId, lessonId, availableMinutes)

Generates a practice routine for a lesson.

**Input**:
```javascript
interface RoutineInput {
  bookId: string;
  lessonId: string;
  availableMinutes: number; // default: 30
}
```

**Output**:
```javascript
interface PracticeRoutine {
  exercises: PlannedExercise[];
  totalMinutes: number;
  objectives: string[];
}

interface PlannedExercise {
  exerciseId: string;
  title: string;
  type: string;
  duration: number;
  bpm: number | null;
  order: number;
}
```

---

### getLessonProgress(bookId, lessonId)

Retrieves progress for a specific lesson.

Retrieves progress for a specific lesson.
