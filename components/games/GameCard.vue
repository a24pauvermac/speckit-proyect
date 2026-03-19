<template>
  <NuxtLink :to="to" class="game-card card">
    <h3>{{ title }}</h3>
    <p class="text-secondary">{{ description }}</p>
    <button class="btn btn-primary">
      Iniciar juego
    </button>
  </NuxtLink>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.game-card {
  text-align: center;
  padding: var(--spacing-xl);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.game-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.game-card h3 {
  margin-bottom: var(--spacing-sm);
}

.game-card p {
  margin-bottom: var(--spacing-lg);
}
</style>
