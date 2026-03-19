import Dexie from 'dexie'

export default defineNuxtPlugin(() => {
  const db = new Dexie('PianoMasterDB')

  db.version(1).stores({
    userProfiles: '++id, name, language',
    methodBooks: '++id, name, author, isPreset, createdAt',
    lessons: '++id, bookId, number',
    exercises: '++id, lessonId, type',
    practiceSessions: '++id, date, bookId, lessonId, completed',
    lessonProgress: '++id, bookId, lessonId',
    metronomeSettings: '++id',
    gameRecords: '++id, gameType, playedAt, difficulty',
    chatMessages: '++id, role, timestamp'
  })

  return {
    provide: {
      db
    }
  }
})
