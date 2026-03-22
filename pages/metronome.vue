<template>
  <div class="metronome-page">
    <div class="metronome-card">
      <WavePattern 
        :pattern-size="60" 
        stroke-color="rgba(255, 255, 255, 0.1)" 
        :stroke-width="1"
      />
      
      <div class="metronome-content">
        <div class="bpm-control">
          <button class="btn btn-circle" @click="decreaseBpm" aria-label="Disminuir BPM">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14"/>
            </svg>
          </button>
          <div class="bpm-display" role="status" aria-live="polite">
            <span class="bpm-value">{{ bpm }}</span>
            <span class="bpm-label">BPM</span>
          </div>
          <button class="btn btn-circle" @click="increaseBpm" aria-label="Aumentar BPM">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </button>
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
          <div class="time-options" role="group" aria-label="Seleccionar compas">
            <button
              v-for="sig in timeSignatures"
              :key="sig"
              class="time-btn"
              :class="{ active: timeSignature === sig }"
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

        <button 
          class="play-btn" 
          :class="{ playing: isPlaying }"
          @click="toggleMetronome"
          :aria-label="isPlaying ? 'Detener metronomo' : 'Iniciar metronomo'"
        >
          <svg v-if="isPlaying" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="2"/>
          </svg>
          <svg v-else width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>
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
.metronome-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding: var(--spacing-md);
}

.metronome-card {
  position: relative;
  background-color: var(--color-black);
  border-radius: var(--radius-organic);
  padding: var(--spacing-2xl);
  overflow: hidden;
  width: 100%;
  max-width: 400px;
}

.metronome-card :deep(.wave-pattern) {
  opacity: 0.6;
}

.metronome-content {
  position: relative;
  z-index: 1;
}

.bpm-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.bpm-display {
  text-align: center;
  min-width: 140px;
}

.bpm-value {
  display: block;
  font-size: 4rem;
  font-weight: 700;
  line-height: 1;
  color: var(--color-white);
}

.bpm-label {
  font-size: 0.9rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.6);
}

.btn-circle {
  width: 56px;
  height: 56px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-white);
  color: var(--color-black);
  border: none;
  cursor: pointer;
  transition: all var(--transition-smooth);
}

.btn-circle:hover {
  transform: scale(1.05);
}

.btn-circle:active {
  transform: scale(0.95);
}

.bpm-slider {
  width: 100%;
  margin: 0 auto var(--spacing-xl);
  display: block;
  height: 8px;
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  outline: none;
}

.bpm-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 28px;
  height: 28px;
  background: var(--color-white);
  border-radius: 50%;
  cursor: pointer;
  transition: transform var(--transition-smooth);
}

.bpm-slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

.time-signature {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-xl);
}

.time-options {
  display: flex;
  gap: var(--spacing-sm);
}

.time-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-organic);
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-smooth);
}

.time-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.time-btn.active {
  background: var(--color-white);
  color: var(--color-black);
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
  background-color: rgba(255, 255, 255, 0.2);
  transition: all var(--transition-smooth);
}

.beat-dot.active {
  background-color: var(--color-white);
  transform: scale(1.2);
}

.play-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  margin: 0 auto;
  border-radius: 50%;
  background: var(--color-white);
  color: var(--color-black);
  border: none;
  cursor: pointer;
  transition: all var(--transition-smooth);
}

.play-btn:hover {
  transform: scale(1.05);
}

.play-btn:active {
  transform: scale(0.95);
}

.play-btn.playing {
  background: rgba(255, 255, 255, 0.2);
  color: var(--color-white);
}

@media (max-width: 600px) {
  .metronome-page {
    min-height: calc(100vh - 160px);
    padding: var(--spacing-sm);
  }
  
  .metronome-card {
    padding: var(--spacing-xl);
  }
  
  .bpm-value {
    font-size: 3rem;
  }
  
  .bpm-control {
    gap: var(--spacing-lg);
  }
  
  .btn-circle {
    width: 48px;
    height: 48px;
  }
  
  .btn-circle svg {
    width: 20px;
    height: 20px;
  }
  
  .play-btn {
    width: 64px;
    height: 64px;
  }
  
  .play-btn svg {
    width: 28px;
    height: 28px;
  }
}
</style>
