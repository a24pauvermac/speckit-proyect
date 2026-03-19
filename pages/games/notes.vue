<template>
  <div class="game-page container">
    <NuxtLink to="/games" class="back-link">
      <FontAwesomeIcon icon="arrow-left" /> Volver a juegos
    </NuxtLink>
    
    <h1>Lectura de notas</h1>
    
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

      <div class="note-display card">
        <div class="staff">
          <div class="note">{{ currentCorrectAnswer }}</div>
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
import { useDatabase } from '~/composables/useDatabase'

const { createGameRecord } = useDatabase()

const difficulties = ['easy', 'medium', 'hard']
const notesEasy = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const notesMedium = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C#', 'Eb', 'F#', 'Ab', 'Bb']

const gameStarted = ref(false)
const selectedDifficulty = ref('easy')
const score = ref(0)
const currentQuestion = ref(0)
const totalQuestions = 10
const currentCorrectAnswer = ref('')
const currentOptions = ref([])
const gameOver = ref(false)

const generateQuestion = () => {
  const notes = selectedDifficulty.value === 'easy' ? notesEasy : notesMedium
  currentCorrectAnswer.value = notes[Math.floor(Math.random() * notes.length)]
  
  const options = [currentCorrectAnswer.value]
  while (options.length < 4) {
    const note = notes[Math.floor(Math.random() * notes.length)]
    if (!options.includes(note)) {
      options.push(note)
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
    await createGameRecord({
      gameType: 'notes',
      score: score.value,
      correct: score.value / (selectedDifficulty.value === 'easy' ? 10 : 20),
      total: totalQuestions,
      difficulty: selectedDifficulty.value,
      duration: 0
    })
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

.note-display {
  text-align: center;
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-lg);
}

.staff {
  font-size: 3rem;
  font-weight: 500;
}

.answer-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.answer-btn {
  padding: var(--spacing-lg);
  font-size: 1.25rem;
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
