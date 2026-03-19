<template>
  <div class="metronome-page container">
    <h1 class="page-title">Metronomo</h1>

    <div class="bpm-control">
      <button class="btn btn-secondary" @click="decreaseBpm" aria-label="Disminuir BPM">-</button>
      <div class="bpm-display" role="status" aria-live="polite">
        <span class="bpm-value">{{ bpm }}</span>
        <span class="bpm-label text-secondary">BPM</span>
      </div>
      <button class="btn btn-secondary" @click="increaseBpm" aria-label="Aumentar BPM">+</button>
    </div>

    <input 
      type="range" 
      v-model="bpm" 
      min="40" 
      max="240" 
      class="bpm-slider"
      aria-label="Control de BPM"
    />

    <div class="time-signature">
      <label id="timesig-label" class="text-secondary">Compas</label>
      <div class="time-options" role="group" aria-labelledby="timesig-label">
        <button
          v-for="sig in timeSignatures"
          :key="sig"
          class="btn"
          :class="timeSignature === sig ? 'btn-primary' : 'btn-secondary'"
          @click="timeSignature = sig"
          :aria-pressed="timeSignature === sig"
        >
          {{ sig }}
        </button>
      </div>
    </div>

    <div class="beat-visual" role="status" aria-live="polite" aria-label="Indicador de tiempo">
      <div 
        v-for="i in getBeatsPerMeasure()" 
        :key="i"
        class="beat-dot"
        :class="{ active: isPlaying && currentBeat === i, accent: i === 1 }"
        :aria-label="isPlaying && currentBeat === i ? 'Tiempo actual' : 'Tiempo ' + i"
      ></div>
    </div>

    <div class="controls">
      <button 
        class="btn btn-lg" 
        :class="isPlaying ? 'btn-secondary' : 'btn-primary'"
        @click="toggleMetronome"
        :aria-label="isPlaying ? 'Detener metronomo' : 'Iniciar metronomo'"
      >
        <FontAwesomeIcon :icon="isPlaying ? 'stop' : 'play'" />
        {{ isPlaying ? 'Detener' : 'Iniciar' }}
      </button>

      <button class="btn btn-secondary" @click="tapTempo" aria-label="Detectar tempo">
        <FontAwesomeIcon icon="microphone" />
        Tocar tempo
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAudioEngine } from '~/composables/useAudioEngine'
import { useDatabase } from '~/composables/useDatabase'

const { initAudio, playClick, isInitialized } = useAudioEngine()
const { getMetronomeSettings, saveMetronomeSettings } = useDatabase()

const bpm = ref(80)
const timeSignature = ref('4/4')
const isPlaying = ref(false)
const currentBeat = ref(0)
const timeSignatures = ['2/4', '3/4', '4/4', '6/8']

let intervalId = null
let tapTimes = []

const getBeatsPerMeasure = () => {
  return parseInt(timeSignature.value.split('/')[0])
}

const toggleMetronome = async () => {
  await initAudio()
  
  if (isPlaying.value) {
    stop()
  } else {
    start()
  }
}

const start = () => {
  isPlaying.value = true
  currentBeat.value = 0
  
  const intervalMs = (60 / bpm.value) * 1000
  
  playBeat()
  intervalId = setInterval(playBeat, intervalMs)
}

const stop = () => {
  isPlaying.value = false
  currentBeat.value = 0
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

const playBeat = () => {
  const beatsPerMeasure = getBeatsPerMeasure()
  currentBeat.value = (currentBeat.value % beatsPerMeasure) + 1
  
  playClick(currentBeat.value === 1)
}

const increaseBpm = () => {
  if (bpm.value < 240) {
    bpm.value++
    if (isPlaying.value) {
      stop()
      start()
    }
  }
}

const decreaseBpm = () => {
  if (bpm.value > 40) {
    bpm.value--
    if (isPlaying.value) {
      stop()
      start()
    }
  }
}

const tapTempo = () => {
  const now = Date.now()
  tapTimes.push(now)
  
  if (tapTimes.length > 4) {
    tapTimes.shift()
  }
  
  if (tapTimes.length >= 2) {
    const intervals = []
    for (let i = 1; i < tapTimes.length; i++) {
      intervals.push(tapTimes[i] - tapTimes[i - 1])
    }
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
    const newBpm = Math.round(60000 / avgInterval)
    
    if (newBpm >= 40 && newBpm <= 240) {
      bpm.value = newBpm
      if (isPlaying.value) {
        stop()
        start()
      }
    }
  }
}

watch([bpm, timeSignature], async () => {
  await saveMetronomeSettings({
    bpm: bpm.value,
    timeSignature: timeSignature.value,
    soundEnabled: true,
    vibrationEnabled: false
  })
})

onMounted(async () => {
  const settings = await getMetronomeSettings()
  if (settings) {
    bpm.value = settings.bpm || 80
    timeSignature.value = settings.timeSignature || '4/4'
  }
})

onUnmounted(() => {
  stop()
})
</script>

<style scoped>
.bpm-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.bpm-display {
  text-align: center;
  min-width: 100px;
}

.bpm-value {
  display: block;
  font-size: 3rem;
  font-weight: 500;
  line-height: 1;
}

.bpm-label {
  font-size: 0.85rem;
}

.bpm-slider {
  width: 100%;
  max-width: 400px;
  margin: 0 auto var(--spacing-xl);
  display: block;
  height: 8px;
  -webkit-appearance: none;
  background: var(--color-border);
  border-radius: 4px;
  outline: none;
}

.bpm-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  background: var(--color-accent);
  border-radius: 50%;
  cursor: pointer;
}

.time-signature {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.time-signature label {
  display: block;
  margin-bottom: var(--spacing-md);
}

.time-options {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
}

.beat-visual {
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

.controls {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

.btn-lg {
  padding: var(--spacing-md) var(--spacing-2xl);
  font-size: 1.25rem;
}
</style>
