<template>
  <div class="interval-display card">
    <div class="interval-visual">
      <button 
        class="btn btn-secondary play-btn" 
        @click="$emit('play')"
        :disabled="isPlaying"
        aria-label="Reproducir intervalo"
      >
        <FontAwesomeIcon :icon="isPlaying ? 'spinner' : 'play'" :spin="isPlaying" />
      </button>
    </div>
    <div class="interval-hint text-secondary">
      Escucha el intervalo
    </div>
  </div>
</template>

<script setup>
defineProps({
  isPlaying: {
    type: Boolean,
    default: false
  }
})

defineEmits(['play'])
</script>

<style scoped>
.interval-display {
  text-align: center;
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-lg);
}

.interval-visual {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
}

.play-btn {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  font-size: 1.5rem;
}

.interval-hint {
  font-size: 1rem;
}
</style>
