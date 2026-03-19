export const useMetronome = () => {
  const { initAudio, playClick, isInitialized } = useAudioEngine()

  const bpm = ref(80)
  const timeSignature = ref('4/4')
  const isPlaying = ref(false)
  const currentBeat = ref(0)

  let intervalId = null
  let tapTimes = []

  const getBeatsPerMeasure = () => {
    return parseInt(timeSignature.value.split('/')[0])
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

  const toggle = async () => {
    await initAudio()
    
    if (isPlaying.value) {
      stop()
    } else {
      start()
    }
  }

  const setBpm = (newBpm) => {
    bpm.value = newBpm
    if (isPlaying.value) {
      stop()
      start()
    }
  }

  const setTimeSignature = (sig) => {
    timeSignature.value = sig
    if (isPlaying.value) {
      stop()
      start()
    }
  }

  const tap = () => {
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
        setBpm(newBpm)
      }
    }
    
    return bpm.value
  }

  return {
    bpm: readonly(bpm),
    timeSignature: readonly(timeSignature),
    isPlaying: readonly(isPlaying),
    currentBeat: readonly(currentBeat),
    isInitialized,
    toggle,
    start,
    stop,
    setBpm,
    setTimeSignature,
    tap,
    getBeatsPerMeasure
  }
}
