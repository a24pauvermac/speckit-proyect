import { useGameEngine } from './useGameEngine'

export const useNoteGame = () => {
  const { gameState, startGame, addScore, nextQuestion, resetGame, getDuration } = useGameEngine()
  const { createGameRecord } = useDatabase()

  const notesEasy = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  const notesMedium = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C#', 'Eb', 'F#', 'Ab', 'Bb']
  const notesHard = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C#', 'D#', 'F#', 'G#', 'A#', 'Bb', 'Db', 'Eb', 'Gb', 'Ab', 'Bb']

  const currentNote = ref('')
  const options = ref([])

  const getNotes = (difficulty) => {
    switch (difficulty) {
      case 'easy': return notesEasy
      case 'medium': return notesMedium
      case 'hard': return notesHard
      default: return notesEasy
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
    const notes = getNotes(gameState.value.difficulty)
    currentNote.value = notes[Math.floor(Math.random() * notes.length)]
    
    const opts = [currentNote.value]
    while (opts.length < 4) {
      const note = notes[Math.floor(Math.random() * notes.length)]
      if (!opts.includes(note)) {
        opts.push(note)
      }
    }
    options.value = opts.sort(() => Math.random() - 0.5)
  }

  const start = (difficulty = 'easy') => {
    startGame(difficulty)
    generateQuestion()
  }

  const submitAnswer = async (answer) => {
    if (answer === currentNote.value) {
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
      gameType: 'notes',
      score: gameState.value.score,
      correct,
      total: gameState.value.totalQuestions,
      difficulty: gameState.value.difficulty,
      duration: getDuration()
    })
  }

  return {
    gameState,
    currentNote,
    options,
    start,
    submitAnswer,
    resetGame
  }
}
