<template>
  <div class="games-page container">
    <div class="games-grid">
      <NuxtLink to="/games/notes" class="game-card card">
        <div class="game-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
        </div>
        <h3>Lectura de notas</h3>
        <p class="text-secondary">Identifica las notas en el pentagrama</p>
      </NuxtLink>

      <NuxtLink to="/games/rhythm" class="game-card card">
        <div class="game-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 2v4"/>
            <path d="M12 18v4"/>
            <path d="M4.93 4.93l2.83 2.83"/>
            <path d="M16.24 16.24l2.83 2.83"/>
            <path d="M2 12h4"/>
            <path d="M18 12h4"/>
            <path d="M4.93 19.07l2.83-2.83"/>
            <path d="M16.24 7.76l2.83-2.83"/>
          </svg>
        </div>
        <h3>Ritmo</h3>
        <p class="text-secondary">Reconoce patrones ritmicos</p>
      </NuxtLink>

      <NuxtLink to="/games/intervals" class="game-card card">
        <div class="game-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M2 12h6"/>
            <path d="M16 12h6"/>
            <path d="M6 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
            <path d="M18 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
          </svg>
        </div>
        <h3>Intervalos</h3>
        <p class="text-secondary">Identifica intervalos musicales</p>
      </NuxtLink>
    </div>

    <div class="high-scores card">
      <h2>Record</h2>
      <div v-if="highScores.length === 0" class="text-secondary empty-message">
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
.page-title {
  margin-bottom: var(--spacing-xl);
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.game-card {
  text-align: center;
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: all var(--transition-smooth);
}

.game-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-diffused);
}

.game-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-gray);
  margin-bottom: var(--spacing-lg);
  color: var(--color-black);
  transition: all var(--transition-smooth);
}

.game-card:hover .game-icon {
  background: var(--color-black);
  color: var(--color-white);
}

.game-card h3 {
  margin-bottom: var(--spacing-sm);
  font-size: 1.25rem;
}

.game-card p {
  font-size: 0.9rem;
  font-weight: 300;
}

.high-scores {
  padding: var(--spacing-xl);
}

.high-scores h2 {
  margin-bottom: var(--spacing-lg);
  font-size: 1.25rem;
}

.empty-message {
  text-align: center;
  padding: var(--spacing-lg);
  font-weight: 300;
}

.scores-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.score-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--color-gray);
  border-radius: var(--radius-organic);
}

.game-type {
  text-transform: capitalize;
  font-weight: 500;
}

.score-value {
  font-weight: 700;
}

@media (max-width: 600px) {
  .games-grid {
    grid-template-columns: 1fr;
  }
  
  .game-card {
    padding: var(--spacing-lg);
  }
  
  .game-icon {
    width: 64px;
    height: 64px;
  }
  
  .game-icon svg {
    width: 36px;
    height: 36px;
  }
}
</style>
