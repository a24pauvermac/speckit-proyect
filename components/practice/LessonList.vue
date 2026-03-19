<template>
  <div class="lesson-list">
    <h3 class="list-title">Leccion actual</h3>
    <div v-if="lessons.length === 0" class="empty-state text-secondary">
      No hay lecciones disponibles
    </div>
    <div v-else class="lessons">
      <div
        v-for="lesson in lessons"
        :key="lesson.id"
        class="lesson-item"
        :class="{ active: selectedLessonId === lesson.id }"
        @click="$emit('select', lesson)"
      >
        <span class="lesson-number">{{ lesson.number }}</span>
        <span class="lesson-title">{{ lesson.title }}</span>
        <span class="lesson-duration text-secondary">{{ lesson.recommendedMinutes }} min</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  lessons: {
    type: Array,
    default: () => []
  },
  selectedLessonId: {
    type: Number,
    default: null
  }
})

defineEmits(['select'])
</script>

<style scoped>
.lesson-list {
  margin-top: var(--spacing-lg);
}

.list-title {
  margin-bottom: var(--spacing-md);
}

.empty-state {
  padding: var(--spacing-lg);
  text-align: center;
}

.lessons {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.lesson-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.lesson-item:hover {
  background-color: var(--color-border);
}

.lesson-item.active {
  background-color: var(--color-accent);
  color: var(--color-bg);
}

.lesson-item.active .lesson-duration,
.lesson-item.active .text-secondary {
  color: rgba(255, 255, 255, 0.7) !important;
}

.lesson-number {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg);
  border-radius: 50%;
  font-weight: 500;
}

.lesson-item.active .lesson-number {
  background-color: rgba(255, 255, 255, 0.2);
}

.lesson-title {
  flex: 1;
}

.lesson-duration {
  font-size: 0.85rem;
}
</style>
