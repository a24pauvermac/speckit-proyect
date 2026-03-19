<template>
  <div class="metronome-visual" role="status" aria-live="polite" aria-label="Indicador de tiempo">
    <div 
      v-for="i in beatsPerMeasure" 
      :key="i"
      class="beat-dot"
      :class="{ active: isPlaying && currentBeat === i, accent: i === 1 }"
      :aria-label="isPlaying && currentBeat === i ? 'Tiempo actual' : 'Tiempo ' + i"
    ></div>
  </div>
</template>

<script setup>
const props = defineProps({
  isPlaying: {
    type: Boolean,
    default: false
  },
  currentBeat: {
    type: Number,
    default: 0
  },
  timeSignature: {
    type: String,
    default: '4/4'
  }
})

const beatsPerMeasure = computed(() => {
  return parseInt(props.timeSignature.split('/')[0])
})
</script>

<style scoped>
.metronome-visual {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-bottom: var(--spacing-xl);
}

.beat-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--color-border);
  transition: all var(--transition-fast);
}

.beat-dot.active {
  background-color: var(--color-accent);
  transform: scale(1.3);
}

.beat-dot.accent.active {
  background-color: var(--color-text);
}
</style>
