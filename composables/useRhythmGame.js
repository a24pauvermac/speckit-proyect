import { useGameEngine } from './useGameEngine'

export const useRhythmGame = () => {
  const { gameState, startGame, addScore, nextQuestion, resetGame, getDuration } = useGameEngine()
  const { createGameRecord } = useDatabase()

  const rhythms = [
    { name: 'quarter', display: 'Negra', beats: 1 },
    { name: 'half', display: 'Blanca', beats: 2 },
    { name: 'whole', display: 'Redonda', beats: 4 },
    { name: 'eighth', display: 'Corchea', beats: 0.5 },
    { name: 'dottedQuarter', display: 'Negra punct', beats: 1.5 },
    { name: 'dottedHalf', display: 'Blanca punct', beats: 3 }
  ]

  const rhythmsEasy = rhythms.slice(0, 3)
  const rhythmsMedium = rhythms.slice(0, 5)
  const rhythmsHard = rhythms

  const currentRhythm = ref(null)
  const options = ref([])

  const getRhythms = (difficulty) => {
    switch (difficulty) {
      case 'easy': return rhythmsEasy
      case 'medium': return rhythmsMedium
      case 'hard': return rhythmsHard
      default: return rhythmsEasy
    }
  }

  const getPoints = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 10
      case 'medium': return 20
      case 'hard': return 30
      default: return 10
    }
  }

  const generateQuestion = () => {
    const rhythmList = getRhythms(gameState.value.difficulty)
    currentRhythm.value = rhythmList[Math.floor(Math.random() * rhythmList.length)]
    
    const opts = [currentRhythm.value.name]
    while (opts.length < 4) {
      const rhythm = rhythmList[Math.floor(Math.random() * rhythmList.length)]
      if (!opts.includes(rhythm.name)) {
        opts.push(rhythm.name)
      }
    }
    options.value = opts.sort(() => Math.random() - 0.5).map(name => ({
      name,
      display: rhythms.find(r => r.name === name).display
    }))
  }

  const start = (difficulty = 'easy') => {
    startGame(difficulty)
    generateQuestion()
  }

  const submitAnswer = async (answer) => {
    if (answer === currentRhythm.value.name) {
      addScore(getPoints(gameState.value.difficulty))
    }
    
    nextQuestion()
    
    if (gameState.value.isGameOver) {
      await saveRecord()
    } else {
      generateQuestion()
    }
  }

  const saveRecord = async () => {
    const correct = Math.round(gameState.value.score / getPoints(gameState.value.difficulty))
    await createGameRecord({
      gameType: 'rhythm',
      score: gameState.value.score,
      correct,
      total: gameState.value.totalQuestions,
      difficulty: gameState.value.difficulty,
      duration: getDuration()
    })
  }

  return {
    gameState,
    currentRhythm,
    options,
    start,
    submitAnswer,
    resetGame
  }
}
