<template>
  <div class="practice-routine card">
    <h3 class="routine-title">Rutina de hoy</h3>
    
    <div v-if="routine" class="routine-content" role="region" aria-label="Rutina de practica">
      <div class="routine-header">
        <span class="total-time text-secondary">
          Tiempo total: {{ routine.totalMinutes }} minutos
        </span>
      </div>

      <div class="exercises" role="list" aria-label="Ejercicios">
        <div
          v-for="(exercise, index) in routine.exercises"
          :key="index"
          class="exercise-item"
          :class="{ completed: exercise.completed }"
          role="listitem"
        >
          <div class="exercise-order" aria-hidden="true">{{ exercise.order }}</div>
          <div class="exercise-info">
            <span class="exercise-title">{{ exercise.title }}</span>
            <span class="exercise-type text-secondary">{{ exercise.type }}</span>
          </div>
          <div class="exercise-duration text-secondary">
            {{ exercise.duration }} min
          </div>
          <button 
            v-if="!exercise.completed"
            class="btn btn-secondary btn-sm"
            @click="$emit('complete', index)"
            :aria-label="'Marcar ' + exercise.title + ' como completado'"
          >
            Completar
          </button>
          <span v-else class="completed-badge" aria-label="Completado">✓</span>
        </div>
      </div>

      <div v-if="objectives.length > 0" class="objectives">
        <h4 id="objectives-heading">Objetivos</h4>
        <ul aria-labelledby="objectives-heading">
          <li v-for="(obj, i) in objectives" :key="i">{{ obj }}</li>
        </ul>
      </div>

      <div class="routine-actions">
        <button class="btn btn-primary" @click="$emit('start')">
          Iniciar sesion
        </button>
      </div>
    </div>

    <div v-else class="empty-state text-secondary" role="status">
      Genera una rutina para comenzar
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  routine: {
    type: Object,
    default: null
  }
})

defineEmits(['complete', 'start'])

const objectives = computed(() => props.routine?.objectives || [])
</script>

<style scoped>
.practice-routine {
  margin-top: var(--spacing-lg);
}

.routine-title {
  margin-bottom: var(--spacing-md);
}

.routine-header {
  margin-bottom: var(--spacing-md);
}

.exercises {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.exercise-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
}

.exercise-item.completed {
  opacity: 0.6;
}

.exercise-order {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg);
  border-radius: 50%;
  font-size: 0.85rem;
  font-weight: 500;
}

.exercise-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.exercise-type {
  font-size: 0.75rem;
  text-transform: capitalize;
}

.exercise-duration {
  font-size: 0.85rem;
}

.btn-sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 0.85rem;
}

.completed-badge {
  color: #28a745;
  font-size: 1.25rem;
}

.objectives {
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
}

.objectives h4 {
  margin-bottom: var(--spacing-sm);
  font-size: 0.9rem;
}

.objectives ul {
  margin: 0;
  padding-left: var(--spacing-lg);
  font-size: 0.85rem;
}

.objectives li {
  margin-bottom: var(--spacing-xs);
}

.routine-actions {
  text-align: center;
}

.empty-state {
  text-align: center;
  padding: var(--spacing-xl);
}
</style>
