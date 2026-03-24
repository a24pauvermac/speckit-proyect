<template>
  <div class="game-page container">
    <NuxtLink to="/games" class="back-link">
      <FontAwesomeIcon icon="arrow-left" /> Volver a juegos
    </NuxtLink>
    
    <h1>Ritmo</h1>
    
    <div v-if="!gameStarted" class="start-screen card">
      <h2>Selecciona la dificultad</h2>
      
      <div class="difficulty-options">
        <button 
          v-for="diff in difficulties" 
          :key="diff"
          class="difficulty-btn"
          :class="selectedDifficulty === diff ? 'active' : ''"
          @click="selectedDifficulty = diff"
        >
          <span class="diff-label">{{ diff }}</span>
        </button>
      </div>
      
      <button class="btn btn-primary btn-lg" @click="startGame">
        Iniciar juego
      </button>
    </div>

    <div v-else class="game-screen">
      <div class="game-stats">
        <span>Puntuacion: {{ score }}</span>
        <span>Pregunta: {{ currentQuestion + 1 }}/{{ totalQuestions }}</span>
      </div>

      <div class="rhythm-display card">
        <div class="rhythm-pattern">{{ currentPattern }}</div>
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

const rhythmsEasy = ['quarter', 'half', 'whole']
const rhythmsMedium = ['quarter', 'half', 'eighth', 'rest']
const rhythmsHard = ['quarter', 'half', 'eighth', 'dotted', 'triplet', 'rest']

const rhythmNames = {
  'quarter': 'Negra',
  'half': 'Blanca',
  'whole': 'Redonda',
  'eighth': 'Corchea',
  'dotted': 'Puntillo',
  'triplet': 'Tresillo',
  'rest': 'Silencio'
}

const gameStarted = ref(false)
const selectedDifficulty = ref('easy')
const score = ref(0)
const currentQuestion = ref(0)
const totalQuestions = 10
const currentCorrectAnswer = ref('')
const currentOptions = ref([])
const currentPattern = ref('')
const gameOver = ref(false)

const generateQuestion = () => {
  let rhythms
  if (selectedDifficulty.value === 'easy') rhythms = rhythmsEasy
  else if (selectedDifficulty.value === 'medium') rhythms = rhythmsMedium
  else rhythms = rhythmsHard
  
  currentCorrectAnswer.value = rhythms[Math.floor(Math.random() * rhythms.length)]
  currentPattern.value = rhythmNames[currentCorrectAnswer.value] || currentCorrectAnswer.value
  
  const options = [currentCorrectAnswer.value]
  while (options.length < 4) {
    const rhythm = rhythms[Math.floor(Math.random() * rhythms.length)]
    if (!options.includes(rhythm)) {
      options.push(rhythm)
    }
  }
  currentOptions.value = options.map(r => rhythmNames[r] || r).sort(() => Math.random() - 0.5)
}

const startGame = () => {
  score.value = 0
  currentQuestion.value = 0
  gameOver.value = false
  gameStarted.value = true
  generateQuestion()
}

const submitAnswer = async (answer) => {
  const correct = currentPattern.value === answer
  
  if (correct) {
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
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  color: var(--color-black);
}

h1 {
  margin-bottom: var(--spacing-xl);
  font-size: 1.5rem;
}

.start-screen {
  text-align: center;
  padding: var(--spacing-2xl);
}

.start-screen h2 {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-xl);
}

.difficulty-options {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin: var(--spacing-xl) 0;
  flex-wrap: wrap;
}

.difficulty-btn {
  background: var(--color-white);
  border: 2px solid var(--color-gray);
  border-radius: var(--radius-organic);
  padding: var(--spacing-md) var(--spacing-xl);
  cursor: pointer;
  transition: all var(--transition-smooth);
  text-transform: capitalize;
  font-weight: 500;
  font-size: 1rem;
  min-width: 100px;
}

.difficulty-btn:hover {
  border-color: var(--color-black);
}

.difficulty-btn.active {
  background: var(--color-black);
  border-color: var(--color-black);
  color: var(--color-white);
}

.diff-label {
  text-transform: capitalize;
}

.btn-lg {
  padding: var(--spacing-md) var(--spacing-2xl);
  font-size: 1.1rem;
  font-weight: 500;
}

.game-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
  font-weight: 500;
}

.rhythm-display {
  text-align: center;
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-lg);
}

.rhythm-pattern {
  font-size: 2rem;
  font-weight: 500;
}

.answer-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.answer-btn {
  padding: var(--spacing-lg);
  font-size: 1.1rem;
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

@media (max-width: 600px) {
  .difficulty-options {
    flex-direction: column;
  }
  
  .difficulty-btn {
    width: 100%;
  }
  
  .answer-options {
    grid-template-columns: 1fr;
  }
}
</style>
