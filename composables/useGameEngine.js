export const useGameEngine = () => {
  const gameState = ref({
    isActive: false,
    score: 0,
    currentQuestion: 0,
    totalQuestions: 10,
    difficulty: 'easy',
    isGameOver: false,
    startTime: null,
    endTime: null
  })

  const startGame = (difficulty = 'easy', totalQuestions = 10) => {
    gameState.value = {
      isActive: true,
      score: 0,
      currentQuestion: 0,
      totalQuestions,
      difficulty,
      isGameOver: false,
      startTime: Date.now(),
      endTime: null
    }
  }

  const endGame = () => {
    gameState.value.isActive = false
    gameState.value.isGameOver = true
    gameState.value.endTime = Date.now()
  }

  const addScore = (points) => {
    gameState.value.score += points
  }

  const nextQuestion = () => {
    gameState.value.currentQuestion++
    if (gameState.value.currentQuestion >= gameState.value.totalQuestions) {
      endGame()
    }
  }

  const resetGame = () => {
    gameState.value = {
      isActive: false,
      score: 0,
      currentQuestion: 0,
      totalQuestions: 10,
      difficulty: 'easy',
      isGameOver: false,
      startTime: null,
      endTime: null
    }
  }

  const getDuration = () => {
    if (!gameState.value.startTime || !gameState.value.endTime) return 0
    return Math.round((gameState.value.endTime - gameState.value.startTime) / 1000)
  }

  return {
    gameState,
    startGame,
    endGame,
    addScore,
    nextQuestion,
    resetGame,
    getDuration
  }
}
