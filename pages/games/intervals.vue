<template>
  <div class="game-page container">
    <NuxtLink to="/games" class="back-link">
      <FontAwesomeIcon icon="arrow-left" /> Volver a juegos
    </NuxtLink>
    
    <h1>Intervalos</h1>
    
    <div v-if="!gameStarted" class="start-screen card">
      <p>Selecciona la dificultad:</p>
      <div class="difficulty-options">
        <button 
          v-for="diff in difficulties" 
          :key="diff"
          class="btn"
          :class="selectedDifficulty === diff ? 'btn-primary' : 'btn-secondary'"
          @click="selectedDifficulty = diff"
        >
          {{ diff }}
        </button>
      </div>
      <button class="btn btn-primary btn-lg mt-lg" @click="startGame">
        Iniciar juego
      </button>
    </div>

    <div v-else class="game-screen">
      <div class="game-stats">
        <span>Puntuacion: {{ score }}</span>
        <span>Pregunta: {{ currentQuestion + 1 }}/{{ totalQuestions }}</span>
      </div>

      <div class="interval-display card">
        <div class="interval-notes">
          <span>{{ note1 }}</span>
          <span class="arrow">-></span>
          <span>{{ note2 }}</span>
        </div>
      </div>

      <div class="answer-options">
        <button
          v-for="option in currentOptions"
          :key="option"
          class="btn btn-secondary answer-btn"
          @click="submitAnswer(option)"
        >
          {{ option }}
        </button>
      </div>

      <div v-if="gameOver" class="game-over card">
        <h2>Juego terminado</h2>
        <p>Puntuacion final: {{ score }}</p>
        <button class="btn btn-primary" @click="startGame">
          Jugar de nuevo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const difficulties = ['easy', 'medium', 'hard']

const intervalsEasy = [
  { name: 'Segunda Mayor', semitones: 2 },
  { name: 'Tercera Mayor', semitones: 4 },
  { name: 'Cuarta Justa', semitones: 5 },
  { name: 'Quinta Justa', semitones: 7 }
]

const intervalsMedium = [
  { name: 'Segunda Menor', semitones: 1 },
  { name: 'Segunda Mayor', semitones: 2 },
  { name: 'Tercera Menor', semitones: 3 },
  { name: 'Tercera Mayor', semitones: 4 },
  { name: 'Cuarta Justa', semitones: 5 },
  { name: 'Tritono', semitones: 6 },
  { name: 'Quinta Justa', semitones: 7 }
]

const intervalsHard = [
  { name: 'Segunda Menor', semitones: 1 },
  { name: 'Segunda Mayor', semitones: 2 },
  { name: 'Tercera Menor', semitones: 3 },
  { name: 'Tercera Mayor', semitones: 4 },
  { name: 'Cuarta Justa', semitones: 5 },
  { name: 'Tritono', semitones: 6 },
  { name: 'Quinta Justa', semitones: 7 },
  { name: 'Sexta Menor', semitones: 8 },
  { name: 'Sexta Mayor', semitones: 9 },
  { name: 'Septima Menor', semitones: 10 },
  { name: 'Octava', semitones: 12 }
]

const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

const getIntervals = (difficulty) => {
  if (difficulty === 'easy') return intervalsEasy
  if (difficulty === 'medium') return intervalsMedium
  return intervalsHard
}

const getNoteName = (index) => {
  return noteNames[index % 7] + (Math.floor(index / 7) + 4)
}

const gameStarted = ref(false)
const selectedDifficulty = ref('easy')
const score = ref(0)
const currentQuestion = ref(0)
const totalQuestions = 10
const note1 = ref('')
const note2 = ref('')
const currentCorrectAnswer = ref('')
const currentOptions = ref([])
const gameOver = ref(false)

const generateQuestion = () => {
  const intervals = getIntervals(selectedDifficulty.value)
  const interval = intervals[Math.floor(Math.random() * intervals.length)]
  
  const note1Index = Math.floor(Math.random() * 12)
  const note2Index = note1Index + interval.semitones
  
  note1.value = getNoteName(note1Index)
  note2.value = getNoteName(note2Index)
  currentCorrectAnswer.value = interval.name
  
  const options = [interval.name]
  while (options.length < 4) {
    const opt = intervals[Math.floor(Math.random() * intervals.length)].name
    if (!options.includes(opt)) {
      options.push(opt)
    }
  }
  currentOptions.value = options.sort(() => Math.random() - 0.5)
}

const startGame = () => {
  score.value = 0
  currentQuestion.value = 0
  gameOver.value = false
  gameStarted.value = true
  generateQuestion()
}

const submitAnswer = async (answer) => {
  if (answer === currentCorrectAnswer.value) {
    const points = selectedDifficulty.value === 'easy' ? 10 : 
                   selectedDifficulty.value === 'medium' ? 20 : 30
    score.value += points
  }
  
  currentQuestion.value++
  
  if (currentQuestion.value >= totalQuestions) {
    gameOver.value = true
  } else {
    generateQuestion()
  }
}
</script>

<style scoped>
.back-link {
  display: inline-block;
  margin-bottom: var(--spacing-md);
  color: var(--color-text-secondary);
}

.start-screen {
  text-align: center;
  padding: var(--spacing-xl);
}

.difficulty-options {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
  margin: var(--spacing-lg) 0;
}

.game-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
  font-weight: 500;
}

.interval-display {
  text-align: center;
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-lg);
}

.interval-notes {
  font-size: 2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-lg);
}

.arrow {
  color: var(--color-text-secondary);
}

.answer-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.answer-btn {
  padding: var(--spacing-lg);
  font-size: 1rem;
}

.game-over {
  text-align: center;
  padding: var(--spacing-xl);
}

.game-over h2 {
  margin-bottom: var(--spacing-md);
}

.game-over p {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-lg);
}

.btn-lg {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: 1.1rem;
}
</style>
