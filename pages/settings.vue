<template>
  <div class="settings-page container">
    <h1 class="page-title">Ajustes</h1>

    <div class="settings-form card">
      <div class="form-group">
        <label for="settings-name">Nombre</label>
        <input id="settings-name" v-model="settings.name" type="text" class="input" />
      </div>

      <div class="form-group">
        <label for="settings-language">Idioma</label>
        <select id="settings-language" v-model="settings.language" class="input">
          <option value="es">Espanol</option>
          <option value="en">English</option>
        </select>
      </div>

      <div class="form-group">
        <label for="settings-bpm">BPM predeterminado</label>
        <input 
          id="settings-bpm"
          v-model.number="settings.defaultBpm" 
          type="number" 
          min="40" 
          max="240" 
          class="input" 
        />
      </div>

      <div class="form-group">
        <label for="settings-timesig">Compas predeterminado</label>
        <select id="settings-timesig" v-model="settings.defaultTimeSignature" class="input">
          <option value="2/4">2/4</option>
          <option value="3/4">3/4</option>
          <option value="4/4">4/4</option>
          <option value="6/8">6/8</option>
        </select>
      </div>

      <button class="btn btn-primary" @click="saveSettings">
        Guardar ajustes
      </button>
    </div>

    <div class="export-section card">
      <h2>Exportar datos</h2>
      <p class="text-secondary">Descarga todos tus datos: progreso, puntuaciones, mensajes</p>
      <button class="btn btn-secondary" @click="exportData">
        Exportar datos
      </button>
      <p v-if="exportSuccess" class="success-message text-secondary">
        Datos exportados exitosamente
      </p>
    </div>
  </div>
</template>

<script setup>
const { getUserProfile, createUserProfile, updateUserProfile, getAllData } = useDatabase()

const settings = ref({
  name: '',
  language: 'es',
  defaultBpm: 80,
  defaultTimeSignature: '4/4'
})

const exportSuccess = ref(false)

const loadSettings = async () => {
  const profiles = await getUserProfile()
  if (profiles.length > 0) {
    const profile = profiles[0]
    settings.value = {
      name: profile.name || '',
      language: profile.language || 'es',
      defaultBpm: profile.defaultBpm || 80,
      defaultTimeSignature: profile.defaultTimeSignature || '4/4'
    }
  }
}

const saveSettings = async () => {
  const profiles = await getUserProfile()
  
  if (profiles.length > 0) {
    await updateUserProfile(profiles[0].id, settings.value)
  } else {
    await createUserProfile(settings.value)
  }
  
  const localeCookie = useCookie('locale')
  localeCookie.value = settings.value.language
}

const exportData = async () => {
  try {
    const data = await getAllData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pianomaster-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    exportSuccess.value = true
    setTimeout(() => {
      exportSuccess.value = false
    }, 3000)
  } catch (error) {
    console.error('Export error:', error)
  }
}

onMounted(() => {
  loadSettings()
})
</script>

<style scoped>
.settings-form {
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
}

.export-section {
  padding: var(--spacing-lg);
}

.export-section h2 {
  margin-bottom: var(--spacing-sm);
}

.export-section p {
  margin-bottom: var(--spacing-md);
}

.success-message {
  margin-top: var(--spacing-md);
  color: #28a745 !important;
}
</style>
