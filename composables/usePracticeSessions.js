import { database as db } from './useDatabase.js'

export const usePracticeSessions = () => {
  const sessions = ref([])
  const currentSession = ref(null)
  const loading = ref(false)

  const fetchSessions = async (limit = 20) => {
    loading.value = true
    try {
      sessions.value = await db.practiceSessions
        .orderBy('date')
        .reverse()
        .limit(limit)
        .toArray()
    } catch (error) {
      console.error('Error fetching sessions:', error)
    } finally {
      loading.value = false
    }
  }

  const createSession = async (bookId, lessonId) => {
    const session = {
      bookId: Number(bookId),
      lessonId: Number(lessonId),
      duration: 0,
      completed: false,
      exercises: [],
      notes: '',
      date: new Date()
    }
    const id = await db.practiceSessions.add(session)
    currentSession.value = { ...session, id }
    return id
  }

  const updateSession = async (id, updates) => {
    await db.practiceSessions.update(id, updates)
    if (currentSession.value && currentSession.value.id === id) {
      currentSession.value = { ...currentSession.value, ...updates }
    }
  }

  const completeSession = async (id) => {
    await updateSession(id, { completed: true })
  }

  const addExerciseToSession = async (sessionId, exercise) => {
    const session = await db.practiceSessions.get(sessionId)
    if (session) {
      const exercises = [...session.exercises, { ...exercise, completedAt: new Date() }]
      await updateSession(sessionId, { exercises })
    }
  }

  const getSessionStats = async () => {
    const allSessions = await db.practiceSessions
      .where('completed')
      .equals(1)
      .toArray()

    const totalMinutes = allSessions.reduce((sum, s) => sum + (s.duration || 0), 0)
    const totalSessions = allSessions.length

    const uniqueLessons = new Set(
      allSessions.map(s => `${s.bookId}-${s.lessonId}`)
    ).size

    return {
      totalMinutes,
      totalSessions,
      lessonsCompleted: uniqueLessons
    }
  }

  const getStreak = async () => {
    const sessions = await db.practiceSessions
      .where('completed')
      .equals(1)
      .toArray()

    if (sessions.length === 0) return 0

    const dates = [...new Set(
      sessions.map(s => new Date(s.date).toDateString())
    )].sort((a, b) => new Date(b) - new Date(a))

    let streak = 0
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    for (const dateStr of dates) {
      const sessionDate = new Date(dateStr)
      sessionDate.setHours(0, 0, 0, 0)

      const diffDays = Math.floor((currentDate - sessionDate) / (1000 * 60 * 60 * 24))

      if (diffDays <= 1) {
        streak++
        currentDate = sessionDate
      } else {
        break
      }
    }

    return streak
  }

  return {
    sessions: readonly(sessions),
    currentSession: readonly(currentSession),
    loading: readonly(loading),
    fetchSessions,
    createSession,
    updateSession,
    completeSession,
    addExerciseToSession,
    getSessionStats,
    getStreak
  }
}
