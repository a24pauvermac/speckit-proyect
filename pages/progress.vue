<template>
  <div class="progress-page container">
    <div class="stats-grid">
      <div class="stat-card card">
        <div class="stat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
        </div>
        <div class="stat-value">{{ stats.totalMinutes }}</div>
        <div class="stat-label text-secondary">Minutos totales</div>
      </div>

      <div class="stat-card card">
        <div class="stat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
        </div>
        <div class="stat-value">{{ stats.lessonsCompleted }}</div>
        <div class="stat-label text-secondary">Lecciones completadas</div>
      </div>

      <div class="stat-card card">
        <div class="stat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </div>
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
            <span>{{ session.duration || 0 }} min</span>
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-gray);
  color: var(--color-black);
  margin-bottom: var(--spacing-md);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
  color: var(--color-black);
}

.stat-label {
  font-size: 0.85rem;
  font-weight: 300;
}

.history-section {
  padding: var(--spacing-xl);
}

.history-section h2 {
  margin-bottom: var(--spacing-lg);
  font-size: 1.25rem;
}

.empty-state {
  text-align: center;
  padding: var(--spacing-xl);
  font-weight: 300;
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
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--color-gray);
  border-radius: var(--radius-organic);
}

.session-date {
  font-weight: 500;
  min-width: 100px;
}

.session-details {
  flex: 1;
  display: flex;
  gap: var(--spacing-md);
  color: var(--color-gray-medium);
  font-size: 0.9rem;
  font-weight: 300;
}

.session-status {
  font-size: 0.85rem;
  font-weight: 500;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-organic);
  background-color: var(--color-white);
}

.session-status.completed {
  background-color: var(--color-black);
  color: var(--color-white);
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }
  
  .stat-card {
    padding: var(--spacing-md);
    flex-direction: row;
    text-align: left;
    gap: var(--spacing-md);
  }
  
  .stat-icon {
    margin-bottom: 0;
  }
  
  .stat-value {
    font-size: 2rem;
  }
  
  .session-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }
  
  .session-date {
    min-width: auto;
  }
}
</style>
