export const useProgress = () => {
  const { getPracticeSessions, getGameRecords, getLessonProgress } = useDatabase()

  const stats = ref({
    totalMinutes: 0,
    lessonsCompleted: 0,
    gamesPlayed: 0,
    averageSessionLength: 0,
    thisWeek: 0,
    thisMonth: 0
  })

  const weeklyData = ref([])
  const monthlyData = ref([])

  const loadStats = async (limit = 100) => {
    const sessions = await getPracticeSessions(limit)
    const games = await getGameRecords(null, limit)
    
    const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration || 0), 0)
    const completedLessons = sessions.filter(s => s.completed).length
    const gamesPlayed = games.length
    
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    
    const thisWeek = sessions
      .filter(s => new Date(s.date) >= weekAgo)
      .reduce((sum, s) => sum + (s.duration || 0), 0)
    
    const thisMonth = sessions
      .filter(s => new Date(s.date) >= monthAgo)
      .reduce((sum, s) => sum + (s.duration || 0), 0)

    stats.value = {
      totalMinutes,
      lessonsCompleted: completedLessons,
      gamesPlayed,
      averageSessionLength: sessions.length > 0 ? Math.round(totalMinutes / sessions.length) : 0,
      thisWeek,
      thisMonth
    }

    return stats.value
  }

  const loadWeeklyData = async () => {
    const sessions = await getPracticeSessions(30)
    const days = []
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      
      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)
      
      const dayMinutes = sessions
        .filter(s => {
          const sessionDate = new Date(s.date)
          return sessionDate >= date && sessionDate < nextDate
        })
        .reduce((sum, s) => sum + (s.duration || 0), 0)
      
      days.push({
        date: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('es-ES', { weekday: 'short' }),
        minutes: dayMinutes
      })
    }
    
    weeklyData.value = days
    return days
  }

  const loadMonthlyData = async () => {
    const sessions = await getPracticeSessions(60)
    const weeks = []
    
    for (let i = 3; i >= 0; i--) {
      const now = new Date()
      const weekEnd = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000)
      const weekStart = new Date(weekEnd.getTime() - 7 * 24 * 60 * 60 * 1000)
      
      const weekMinutes = sessions
        .filter(s => {
          const sessionDate = new Date(s.date)
          return sessionDate >= weekStart && sessionDate < weekEnd
        })
        .reduce((sum, s) => sum + (s.duration || 0), 0)
      
      weeks.push({
        week: `Semana ${4 - i}`,
        minutes: weekMinutes
      })
    }
    
    monthlyData.value = weeks
    return weeks
  }

  return {
    stats,
    weeklyData,
    monthlyData,
    loadStats,
    loadWeeklyData,
    loadMonthlyData
  }
}
