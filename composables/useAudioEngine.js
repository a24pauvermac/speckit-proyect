export const useAudioEngine = () => {
  let audioContext = null
  let clickBuffer = null
  let accentBuffer = null

  const isInitialized = ref(false)

  const initAudio = async () => {
    if (isInitialized.value) return

    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)()
      
      clickBuffer = await createClickBuffer(audioContext, 800, 0.05)
      accentBuffer = await createClickBuffer(audioContext, 1200, 0.08)
      
      isInitialized.value = true
    } catch (error) {
      console.error('Failed to initialize audio engine:', error)
    }
  }

  const createClickBuffer = async (context, frequency, duration) => {
    const sampleRate = context.sampleRate
    const length = sampleRate * duration
    const buffer = context.createBuffer(1, length, sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate
      const envelope = Math.exp(-t * 30)
      data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope
    }

    return buffer
  }

  const playClick = (isAccent = false) => {
    if (!audioContext || !clickBuffer) return

    if (audioContext.state === 'suspended') {
      audioContext.resume()
    }

    const source = audioContext.createBufferSource()
    source.buffer = isAccent ? accentBuffer : clickBuffer
    
    const gainNode = audioContext.createGain()
    gainNode.gain.value = 0.7

    source.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    source.start()
  }

  const resumeContext = async () => {
    if (audioContext && audioContext.state === 'suspended') {
      await audioContext.resume()
    }
  }

  const getContext = () => audioContext

  return {
    isInitialized: readonly(isInitialized),
    initAudio,
    playClick,
    resumeContext,
    getContext
  }
}
