export const UserProfile = {
  id: null,
  name: '',
  createdAt: null,
  updatedAt: null,
  language: 'es',
  defaultBpm: 80,
  defaultTimeSignature: '4/4'
}

export const MethodBook = {
  id: null,
  name: '',
  author: '',
  isPreset: false,
  description: '',
  createdAt: null
}

export const Lesson = {
  id: null,
  bookId: null,
  number: 1,
  title: '',
  description: '',
  exercises: [],
  recommendedMinutes: 15
}

export const Exercise = {
  id: null,
  lessonId: null,
  title: '',
  type: 'technique',
  bpm: null,
  duration: 5,
  objectives: []
}

export const PracticeSession = {
  id: null,
  date: null,
  bookId: null,
  lessonId: null,
  duration: 0,
  completed: false,
  exercises: [],
  notes: ''
}

export const LessonProgress = {
  id: null,
  bookId: null,
  lessonId: null,
  completedAt: null,
  timesCompleted: 0,
  bestSession: null
}

export const MetronomeSettings = {
  id: null,
  bpm: 80,
  timeSignature: '4/4',
  soundEnabled: true,
  vibrationEnabled: false
}

export const GameRecord = {
  id: null,
  gameType: 'notes',
  score: 0,
  correct: 0,
  total: 0,
  difficulty: 'easy',
  playedAt: null,
  duration: 0
}

export const ChatMessage = {
  id: null,
  role: 'user',
  content: '',
  timestamp: null
}

export const TimeSignatures = ['2/4', '3/4', '4/4', '6/8']
export const ExerciseTypes = ['technique', 'etude', 'scale', 'piece']
export const GameTypes = ['notes', 'rhythm', 'intervals']
export const Difficulties = ['easy', 'medium', 'hard']
