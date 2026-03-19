<template>
  <div class="statistics-card card" :class="{ featured: featured }">
    <div class="stat-icon">{{ icon }}</div>
    <div class="stat-value">{{ value }}</div>
    <div class="stat-label text-secondary">{{ label }}</div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: '📊'
  },
  value: {
    type: [Number, String],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.statistics-card {
  text-align: center;
  padding: var(--spacing-lg);
}

.statistics-card.featured {
  background-color: var(--color-accent);
  color: white;
}

.statistics-card.featured .stat-icon,
.statistics-card.featured .stat-value {
  color: white;
}

.statistics-card.featured .stat-label {
  color: rgba(255, 255, 255, 0.8) !important;
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
</style>
