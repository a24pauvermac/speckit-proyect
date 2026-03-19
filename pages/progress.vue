<template>
  <div class="progress-page container">
    <h1 class="page-title">Progreso</h1>

    <div class="stats-grid">
      <div class="stat-card card">
        <div class="stat-icon">T</div>
        <div class="stat-value">{{ stats.totalMinutes }}</div>
        <div class="stat-label text-secondary">Minutos totales</div>
      </div>

      <div class="stat-card card">
        <div class="stat-icon">L</div>
        <div class="stat-value">{{ stats.lessonsCompleted }}</div>
        <div class="stat-label text-secondary">Lecciones completadas</div>
      </div>

      <div class="stat-card card">
        <div class="stat-icon">R</div>
        <div class="stat-value">{{ stats.streak }}</div>
        <div class="stat-label text-secondary">Dias de racha</div>
      </div>
    </div>

    <div class="history-section card">
      <h2>Historial</h2>
      
      <div v-if="sessions.length === 0" class="empty-state text-secondary">
        Sin historial de practica
      </div>

      <div v-else class="sessions-list">
        <div v-for="session in sessions" :key="session.id" class="session-item">
          <div class="session-date">
            {{ formatDate(session.date) }}
          </div>
          <div class="session-details">
            <span>Leccion: {{ session.lessonId }}</span>
            <span>{{ session.duration }} min</span>
          </div>
          <div class="session-status" :class="{ completed: session.completed }">
            {{ session.completed ? 'Completado' : 'En progreso' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePracticeSessions } from '~/composables/usePracticeSessions'

const { sessions, fetchSessions, getSessionStats, getStreak } = usePracticeSessions()

const stats = ref({
  totalMinutes: 0,
  lessonsCompleted: 0,
  streak: 0
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(async () => {
  await fetchSessions(20)
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
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.stat-card {
  text-align: center;
  padding: var(--spacing-lg);
}

.stat-icon {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: var(--spacing-sm);
  width: 50px;
  height: 50px;
  line-height: 50px;
  background: var(--color-accent);
  color: white;
  border-radius: 50%;
  margin: 0 auto var(--spacing-sm);
}

.stat-value {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: 0.85rem;
}

.history-section {
  padding: var(--spacing-lg);
}

.history-section h2 {
  margin-bottom: var(--spacing-lg);
}

.sessions-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.session-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
}

.session-date {
  font-weight: 500;
  min-width: 100px;
}

.session-details {
  flex: 1;
  display: flex;
  gap: var(--spacing-md);
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.session-status {
  font-size: 0.85rem;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  background-color: var(--color-border);
}

.session-status.completed {
  background-color: #d4edda;
  color: #155724;
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .session-item {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
