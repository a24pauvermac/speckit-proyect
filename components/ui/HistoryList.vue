<template>
  <div class="history-list card">
    <h3>{{ title }}</h3>
    
    <div v-if="items.length === 0" class="empty-state text-secondary">
      {{ emptyMessage }}
    </div>

    <div v-else class="items-list">
      <div 
        v-for="(item, index) in items" 
        :key="item.id || index"
        class="history-item"
      >
        <slot :item="item" :index="index">
          <div class="item-content">
            <div class="item-title">{{ item.title || item.name || item.date }}</div>
            <div class="item-subtitle text-secondary">{{ item.subtitle || '' }}</div>
          </div>
          <div class="item-value">{{ item.value || '' }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    default: () => []
  },
  emptyMessage: {
    type: String,
    default: 'No hay elementos'
  }
})
</script>

<style scoped>
.history-list {
  padding: var(--spacing-lg);
}

.history-list h3 {
  margin-bottom: var(--spacing-lg);
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.history-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
}

.item-content {
  flex: 1;
}

.item-title {
  font-weight: 500;
}

.item-subtitle {
  font-size: 0.85rem;
}

.item-value {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-accent);
}
</style>
