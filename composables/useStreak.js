export const useStreak = () => {
  const { getPracticeSessions } = useDatabase()

  const currentStreak = ref(0)
  const longestStreak = ref(0)
  const lastPracticeDate = ref(null)

  const calculateStreak = async () => {
    const sessions = await getPracticeSessions(100)
    
    if (sessions.length === 0) {
      currentStreak.value = 0
      longestStreak.value = 0
      return 0
    }

    const practiceDates = [...new Set(
      sessions.map(s => {
        const date = new Date(s.date)
        return date.toISOString().split('T')[0]
      })
    )].sort().reverse()

    lastPracticeDate.value = practiceDates[0]

    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    let streak = 0
    let checkDate = practiceDates[0] === today || practiceDates[0] === yesterday 
      ? practiceDates[0] 
      : null

    if (checkDate) {
      for (const date of practiceDates) {
        if (date === checkDate) {
          streak++
          const prevDate = new Date(new Date(checkDate).getTime() - 24 * 60 * 60 * 1000)
          checkDate = prevDate.toISOString().split('T')[0]
        } else if (date < checkDate) {
          break
        }
      }
    }

    currentStreak.value = streak

    let maxStreak = 0
    let tempStreak = 1
    const sortedDates = [...practiceDates].sort()
    
    for (let i = 1; i < sortedDates.length; i++) {
      const prev = new Date(sortedDates[i - 1])
      const curr = new Date(sortedDates[i])
      const diffDays = (curr - prev) / (24 * 60 * 60 * 1000)
      
      if (diffDays === 1) {
        tempStreak++
      } else {
        maxStreak = Math.max(maxStreak, tempStreak)
        tempStreak = 1
      }
    }
    maxStreak = Math.max(maxStreak, tempStreak)
    longestStreak.value = Math.max(maxStreak, streak)

    return streak
  }

  const isPracticeToday = async () => {
    const today = new Date().toISOString().split('T')[0]
    const sessions = await getPracticeSessions(1)
    if (sessions.length === 0) return false
    
    const lastSession = new Date(sessions[0].date).toISOString().split('T')[0]
    return lastSession === today
  }

  return {
    currentStreak,
    longestStreak,
    lastPracticeDate,
    calculateStreak,
    isPracticeToday
  }
}
