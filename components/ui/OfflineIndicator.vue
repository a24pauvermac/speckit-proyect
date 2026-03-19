<template>
  <div
    v-if="isOffline"
    class="offline-indicator"
    role="status"
    aria-live="polite"
  >
    <FontAwesomeIcon icon="wifi" />
    <span>Sin conexion - Modo offline</span>
  </div>
</template>

<script setup>
const isOffline = ref(false)

const updateOnlineStatus = () => {
  isOffline.value = !navigator.onLine
}

onMounted(() => {
  isOffline.value = !navigator.onLine
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
})
</script>

<style scoped>
.offline-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: #ffc107;
  color: #000;
  font-size: 0.85rem;
  font-weight: 500;
  text-align: center;
}

.offline-indicator svg {
  width: 16px;
  height: 16px;
}
</style>
