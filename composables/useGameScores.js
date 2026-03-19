export const useGameScores = () => {
  const { getGameRecords, createGameRecord } = useDatabase()

  const highScores = ref([])
  const recentGames = ref([])

  const loadHighScores = async (gameType = null, limit = 10) => {
    const records = await getGameRecords(gameType, limit)
    highScores.value = records
    return records
  }

  const loadRecentGames = async (limit = 20) => {
    const records = await getGameRecords(null, limit)
    recentGames.value = records
    return records
  }

  const getBestScore = async (gameType) => {
    const records = await getGameRecords(gameType, 100)
    if (records.length === 0) return 0
    return Math.max(...records.map(r => r.score))
  }

  const getTotalGamesPlayed = async (gameType = null) => {
    const records = await getGameRecords(gameType, 1000)
    return records.length
  }

  const getAverageScore = async (gameType) => {
    const records = await getGameRecords(gameType, 100)
    if (records.length === 0) return 0
    const total = records.reduce((sum, r) => sum + r.score, 0)
    return Math.round(total / records.length)
  }

  const getGamesByDifficulty = async (gameType, difficulty) => {
    const records = await getGameRecords(gameType, 100)
    return records.filter(r => r.difficulty === difficulty)
  }

  return {
    highScores,
    recentGames,
    loadHighScores,
    loadRecentGames,
    getBestScore,
    getTotalGamesPlayed,
    getAverageScore,
    getGamesByDifficulty
  }
}
