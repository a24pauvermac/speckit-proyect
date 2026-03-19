import { useGameEngine } from './useGameEngine'

export const useIntervalGame = () => {
  const { gameState, startGame, addScore, nextQuestion, resetGame, getDuration } = useGameEngine()
  const { createGameRecord } = useDatabase()

  const intervals = [
    { name: 'unison', display: 'Unisono', semitones: 0 },
    { name: 'minor2', display: '2da menor', semitones: 1 },
    { name: 'major2', display: '2da mayor', semitones: 2 },
    { name: 'minor3', display: '3ra menor', semitones: 3 },
    { name: 'major3', display: '3ra mayor', semitones: 4 },
    { name: 'perfect4', display: '4ta justa', semitones: 5 },
    { name: 'tritone', display: 'Tritono', semitones: 6 },
    { name: 'perfect5', display: '5ta justa', semitones: 7 },
    { name: 'minor6', display: '6ta menor', semitones: 8 },
    { name: 'major6', display: '6ta mayor', semitones: 9 },
    { name: 'minor7', display: '7ma menor', semitones: 10 },
    { name: 'major7', display: '7ma mayor', semitones: 11 },
    { name: 'octave', display: 'Octava', semitones: 12 }
  ]

  const intervalsEasy = intervals.filter(i => [0, 3, 4, 7, 12].includes(i.semitones))
  const intervalsMedium = intervals.filter(i => i.semitones <= 7)
  const intervalsHard = intervals

  const currentInterval = ref(null)
  const options = ref([])
  const playTone = ref(false)
  const firstNote = ref(60)

  const getIntervals = (difficulty) => {
    switch (difficulty) {
      case 'easy': return intervalsEasy
      case 'medium': return intervalsMedium
      case 'hard': return intervalsHard
      default: return intervalsEasy
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
    const intervalList = getIntervals(gameState.value.difficulty)
    currentInterval.value = intervalList[Math.floor(Math.random() * intervalList.length)]
    firstNote.value = 60 + Math.floor(Math.random() * 12)
    
    const opts = [currentInterval.value.name]
    while (opts.length < 4) {
      const interval = intervalList[Math.floor(Math.random() * intervalList.length)]
      if (!opts.includes(interval.name)) {
        opts.push(interval.name)
      }
    }
    options.value = opts.sort(() => Math.random() - 0.5).map(name => ({
      name,
      display: intervals.find(i => i.name === name).display
    }))
  }

  const start = (difficulty = 'easy') => {
    startGame(difficulty)
    generateQuestion()
  }

  const playInterval = async () => {
    const { playNote } = useAudioEngine()
    playTone.value = true
    await playNote(firstNote.value, 500)
    await new Promise(r => setTimeout(r, 600))
    await playNote(firstNote.value + currentInterval.value.semitones, 500)
    playTone.value = false
  }

  const submitAnswer = async (answer) => {
    if (answer === currentInterval.value.name) {
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
      gameType: 'intervals',
      score: gameState.value.score,
      correct,
      total: gameState.value.totalQuestions,
      difficulty: gameState.value.difficulty,
      duration: getDuration()
    })
  }

  return {
    gameState,
    currentInterval,
    options,
    playTone,
    start,
    playInterval,
    submitAnswer,
    resetGame
  }
}
