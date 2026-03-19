<template>
  <div class="home-page container">
    <div class="hero">
      <h1 class="page-title">PianoMaster</h1>
      <p class="subtitle text-secondary">Tu tutor personal de piano</p>
      
      <NuxtLink to="/practice" class="btn btn-primary btn-lg">
        Comenzar a practicar
      </NuxtLink>
    </div>

    <div class="stats-section" role="region" aria-label="Estadisticas de practica">
      <div class="stat-card card">
        <div class="stat-value" aria-label="Minutos de practica">{{ stats.totalMinutes }}</div>
        <div class="stat-label text-secondary">minutos de practica</div>
      </div>
      <div class="stat-card card">
        <div class="stat-value" aria-label="Lecciones completadas">{{ stats.lessonsCompleted }}</div>
        <div class="stat-label text-secondary">Lecciones completadas</div>
      </div>
      <div class="stat-card card">
        <div class="stat-value" aria-label="Dias de racha">{{ stats.streak }}</div>
        <div class="stat-label text-secondary">Dias de racha</div>
      </div>
    </div>

    <div class="quick-actions">
      <h2 id="actions-heading">Accesos rapidos</h2>
      <div class="actions-grid" role="list" aria-labelledby="actions-heading">
        <NuxtLink to="/metronome" class="action-card card" role="listitem">
          <FontAwesomeIcon icon="stopwatch" aria-hidden="true" class="action-icon" />
          <span>Metronomo</span>
        </NuxtLink>
        <NuxtLink to="/games" class="action-card card" role="listitem">
          <FontAwesomeIcon icon="gamepad" aria-hidden="true" class="action-icon" />
          <span>Juegos</span>
        </NuxtLink>
        <NuxtLink to="/progress" class="action-card card" role="listitem">
          <FontAwesomeIcon icon="chart-line" aria-hidden="true" class="action-icon" />
          <span>Progreso</span>
        </NuxtLink>
        <NuxtLink to="/chat" class="action-card card" role="listitem">
          <FontAwesomeIcon icon="comments" aria-hidden="true" class="action-icon" />
          <span>Chat</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePracticeSessions } from '~/composables/usePracticeSessions'

const { getSessionStats, getStreak } = usePracticeSessions()

const stats = ref({
  totalMinutes: 0,
  lessonsCompleted: 0,
  streak: 0
})

onMounted(async () => {
  const sessionStats = await getSessionStats()
  const streak = await getStreak()
  stats.value = {
    totalMinutes: sessionStats.totalMinutes,
    lessonsCompleted: sessionStats.lessonsCompleted,
    streak
  }
})
</script>

<style scoped>
.hero {
  text-align: center;
  padding: var(--spacing-2xl) 0;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-sm);
}

.subtitle {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-xl);
}

.btn-lg {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: 1.1rem;
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.stat-card {
  text-align: center;
  padding: var(--spacing-lg);
}

.stat-value {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: 0.85rem;
}

.quick-actions h2 {
  margin-bottom: var(--spacing-lg);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.action-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  transition: all var(--transition-normal);
}

.action-card:hover {
  transform: translateY(-2px);
}

.action-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent);
  color: white;
  border-radius: var(--radius-md);
}

@media (max-width: 600px) {
  .stats-section {
    grid-template-columns: 1fr;
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
  }
}
</style>
