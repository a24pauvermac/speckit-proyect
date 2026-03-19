# API Contract: Games Service

## Overview
Internal service interface for sight-reading games.

## Game Types

```javascript
const GameType = ['notes', 'rhythm', 'intervals'];

const GameConfig = {
  type: GameType,
  difficulty: ['easy', 'medium', 'hard'],
  questionCount: Number
};
```

## Note Identification Game

**Purpose**: Identify notes on treble/bass clef

**Difficulty Levels**:
- Easy: C4-C5, treble clef only, white keys
- Medium: C3-C5, treble + bass, white + black keys
- Hard: C2-C6, all clefs, all keys

**Question Format**:
```javascript
const NoteQuestion = {
  id: String,
  note: String,        // e.g., "A4", "F#3"
  clef: ['treble', 'bass'],
  display: String,    // rendered note
  options: Array      // 4 possible answers
};
```

---

## Rhythm Game

**Purpose**: Match rhythm patterns

**Difficulty Levels**:
- Easy: Quarter, half notes, 4/4
- Medium: Eighth notes, rests
- Hard: Dotted notes, triplets, all time signatures

**Question Format**:
```javascript
const RhythmQuestion = {
  id: String,
  pattern: RhythmPattern,
  display: String,    // rendered rhythm
  options: Array      // Array of RhythmPattern
};
```

---

## Interval Game

**Purpose**: Identify intervals between two notes

**Difficulty Levels**:
- Easy: Minor 2nd through Perfect 5th
- Medium: All intervals within octave
- Hard: Compound intervals

**Question Format**:
```javascript
const IntervalQuestion = {
  id: String,
  note1: String,
  note2: String,
  interval: String,   // e.g., "Perfect 4th"
  options: Array
};
```

## Score Calculation

```javascript
const GameScore = {
  score: Number,       // points earned
  correct: Number,     // correct answers
  total: Number,       // total questions
  timeSpent: Number,   // seconds
  difficulty: String
};
```

**Points per difficulty**:
- Easy: 10 points per correct
- Medium: 20 points per correct
- Hard: 30 points per correct

## Progression

```javascript
const GameProgression = {
  currentDifficulty: ['easy', 'medium', 'hard'],
  recentScores: Array, // last 5 scores (0-100%)
  
  // Auto-adjust difficulty
  adjustDifficulty();
};
```

Rules:
- Average > 80%: increase difficulty
- Average 50-80%: maintain difficulty
- Average < 50%: decrease difficulty
