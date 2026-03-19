<template>
  <button 
    class="btn btn-secondary tap-tempo-btn" 
    @click="tap"
    aria-label="Detectar tempo"
  >
    <FontAwesomeIcon icon="microphone" />
    Tocar tempo
  </button>
</template>

<script setup>
const emit = defineEmits(['tempoDetected'])

const tapTimes = ref([])

const tap = () => {
  const now = Date.now()
  tapTimes.value.push(now)
  
  if (tapTimes.value.length > 4) {
    tapTimes.value.shift()
  }
  
  if (tapTimes.value.length >= 2) {
    const intervals = []
    for (let i = 1; i < tapTimes.value.length; i++) {
      intervals.push(tapTimes.value[i] - tapTimes.value[i - 1])
    }
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
    const newBpm = Math.round(60000 / avgInterval)
    
    if (newBpm >= 40 && newBpm <= 240) {
      emit('tempoDetected', newBpm)
    }
  }
}
</script>

<style scoped>
.tap-tempo-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}
</style>
