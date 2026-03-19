<template>
  <div class="method-book-card card" @click="$emit('select', book.id)">
    <h3 class="book-title">{{ book.name }}</h3>
    <p v-if="book.author" class="book-author text-secondary">{{ book.author }}</p>
    <p v-if="book.description" class="book-description text-secondary">{{ book.description }}</p>
    <div class="book-meta">
      <span v-if="book.isPreset" class="badge">Preset</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  book: {
    type: Object,
    required: true
  }
})

defineEmits(['select'])
</script>

<style scoped>
.method-book-card {
  cursor: pointer;
  transition: all var(--transition-normal);
}

.method-book-card:hover {
  transform: translateY(-2px);
}

.book-title {
  margin-bottom: var(--spacing-xs);
}

.book-author {
  font-size: 0.9rem;
  margin-bottom: var(--spacing-sm);
}

.book-description {
  font-size: 0.85rem;
  margin-bottom: var(--spacing-md);
}

.book-meta {
  display: flex;
  gap: var(--spacing-sm);
}

.badge {
  display: inline-block;
  padding: 2px 8px;
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}
</style>
