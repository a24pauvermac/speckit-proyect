export const useMetronomeSettings = () => {
  const { getMetronomeSettings, saveMetronomeSettings } = useDatabase()

  const settings = ref({
    bpm: 80,
    timeSignature: '4/4',
    soundEnabled: true,
    vibrationEnabled: false
  })

  const loadSettings = async () => {
    const stored = await getMetronomeSettings()
    if (stored) {
      settings.value = {
        bpm: stored.bpm || 80,
        timeSignature: stored.timeSignature || '4/4',
        soundEnabled: stored.soundEnabled ?? true,
        vibrationEnabled: stored.vibrationEnabled ?? false
      }
    }
    return settings.value
  }

  const updateBpm = async (newBpm) => {
    settings.value.bpm = newBpm
    await saveSettings()
  }

  const updateTimeSignature = async (sig) => {
    settings.value.timeSignature = sig
    await saveSettings()
  }

  const saveSettings = async () => {
    await saveMetronomeSettings({ ...settings.value })
  }

  return {
    settings,
    loadSettings,
    updateBpm,
    updateTimeSignature,
    saveSettings
  }
}
