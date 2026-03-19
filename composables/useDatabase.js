import Dexie from 'dexie'

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

export const useDatabase = () => {
  const getUserProfile = async () => {
    return await db.userProfiles.toArray()
  }

  const createUserProfile = async (profile) => {
    return await db.userProfiles.add({
      ...profile,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  const updateUserProfile = async (id, updates) => {
    return await db.userProfiles.update(id, {
      ...updates,
      updatedAt: new Date()
    })
  }

  const getMethodBooks = async () => {
    return await db.methodBooks.orderBy('createdAt').reverse().toArray()
  }

  const getMethodBook = async (id) => {
    return await db.methodBooks.get(id)
  }

  const createMethodBook = async (book) => {
    return await db.methodBooks.add({
      ...book,
      createdAt: new Date()
    })
  }

  const updateMethodBook = async (id, updates) => {
    return await db.methodBooks.update(id, updates)
  }

  const deleteMethodBook = async (id) => {
    return await db.methodBooks.delete(id)
  }

  const getLessons = async (bookId) => {
    return await db.lessons.where('bookId').equals(bookId).sortBy('number')
  }

  const getLesson = async (id) => {
    return await db.lessons.get(id)
  }

  const createLesson = async (lesson) => {
    return await db.lessons.add(lesson)
  }

  const updateLesson = async (id, updates) => {
    return await db.lessons.update(id, updates)
  }

  const getPracticeSessions = async (limit = 10) => {
    return await db.practiceSessions.orderBy('date').reverse().limit(limit).toArray()
  }

  const createPracticeSession = async (session) => {
    return await db.practiceSessions.add({
      ...session,
      date: new Date()
    })
  }

  const updatePracticeSession = async (id, updates) => {
    return await db.practiceSessions.update(id, updates)
  }

  const getLessonProgress = async (bookId, lessonId) => {
    return await db.lessonProgress
      .where({ bookId: bookId, lessonId: lessonId })
      .first()
  }

  const createOrUpdateLessonProgress = async (bookId, lessonId, updates) => {
    const existing = await getLessonProgress(bookId, lessonId)
    if (existing) {
      return await db.lessonProgress.update(existing.id, updates)
    }
    return await db.lessonProgress.add({
      bookId,
      lessonId,
      ...updates,
      timesCompleted: 0
    })
  }

  const getMetronomeSettings = async () => {
    const settings = await db.metronomeSettings.toArray()
    return settings[0] || null
  }

  const saveMetronomeSettings = async (settings) => {
    const existing = await getMetronomeSettings()
    if (existing) {
      return await db.metronomeSettings.update(existing.id, settings)
    }
    return await db.metronomeSettings.add(settings)
  }

  const getGameRecords = async (gameType = null, limit = 10) => {
    let query = db.gameRecords.orderBy('playedAt').reverse()
    if (gameType) {
      query = db.gameRecords.where('gameType').equals(gameType).reverse()
    }
    return await query.limit(limit).toArray()
  }

  const createGameRecord = async (record) => {
    return await db.gameRecords.add({
      ...record,
      playedAt: new Date()
    })
  }

  const getChatMessages = async (limit = 50) => {
    return await db.chatMessages.orderBy('timestamp').reverse().limit(limit).toArray()
  }

  const createChatMessage = async (message) => {
    return await db.chatMessages.add({
      ...message,
      timestamp: new Date()
    })
  }

  const clearChatMessages = async () => {
    return await db.chatMessages.clear()
  }

  const getAllData = async () => {
    const [userProfiles, methodBooks, lessons, practiceSessions, lessonProgress, metronomeSettings, gameRecords, chatMessages] = await Promise.all([
      db.userProfiles.toArray(),
      db.methodBooks.toArray(),
      db.lessons.toArray(),
      db.practiceSessions.toArray(),
      db.lessonProgress.toArray(),
      db.metronomeSettings.toArray(),
      db.gameRecords.toArray(),
      db.chatMessages.toArray()
    ])

    return {
      userProfiles,
      methodBooks,
      lessons,
      practiceSessions,
      lessonProgress,
      metronomeSettings,
      gameRecords,
      chatMessages
    }
  }

  return {
    getUserProfile,
    createUserProfile,
    updateUserProfile,
    getMethodBooks,
    getMethodBook,
    createMethodBook,
    updateMethodBook,
    deleteMethodBook,
    getLessons,
    getLesson,
    createLesson,
    updateLesson,
    getPracticeSessions,
    createPracticeSession,
    updatePracticeSession,
    getLessonProgress,
    createOrUpdateLessonProgress,
    getMetronomeSettings,
    saveMetronomeSettings,
    getGameRecords,
    createGameRecord,
    getChatMessages,
    createChatMessage,
    clearChatMessages,
    getAllData
  }
}
