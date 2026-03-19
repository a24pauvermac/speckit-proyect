<template>
  <div class="games-page container">
    <h1 class="page-title">Juegos</h1>

    <div class="games-grid">
      <div class="game-card card">
        <h3>Lectura de notas</h3>
        <p class="text-secondary">Identifica las notas en el pentagrama</p>
        <NuxtLink to="/games/notes" class="btn btn-primary">
          Iniciar juego
        </NuxtLink>
      </div>

      <div class="game-card card">
        <h3>Ritmo</h3>
        <p class="text-secondary">Reconoce patrones ritmicos</p>
        <NuxtLink to="/games/rhythm" class="btn btn-primary">
          Iniciar juego
        </NuxtLink>
      </div>

      <div class="game-card card">
        <h3>Intervalos</h3>
        <p class="text-secondary">Identifica intervalos musicales</p>
        <NuxtLink to="/games/intervals" class="btn btn-primary">
          Iniciar juego
        </NuxtLink>
      </div>
    </div>

    <div class="high-scores card">
      <h2>Record</h2>
      <div v-if="highScores.length === 0" class="text-secondary">
        No hay puntuaciones todavia
      </div>
      <div v-else class="scores-list">
        <div v-for="score in highScores" :key="score.id" class="score-item">
          <span class="game-type">{{ score.gameType }}</span>
          <span class="score-value">{{ score.score }} pts</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDatabase } from '~/composables/useDatabase'

const { getGameRecords } = useDatabase()

const highScores = ref([])

onMounted(async () => {
  const records = await getGameRecords(null, 10)
  highScores.value = records
})
</script>

<style scoped>
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.game-card {
  text-align: center;
  padding: var(--spacing-xl);
}

.game-card h3 {
  margin-bottom: var(--spacing-sm);
}

.game-card p {
  margin-bottom: var(--spacing-lg);
}

.high-scores {
  padding: var(--spacing-lg);
}

.high-scores h2 {
  margin-bottom: var(--spacing-md);
}

.scores-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.score-item {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
}

.game-type {
  text-transform: capitalize;
}
</style>
