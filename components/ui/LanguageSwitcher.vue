<template>
  <div class="language-switcher">
    <select
      v-model="currentLocale"
      @change="changeLocale"
      aria-label="Seleccionar idioma"
      class="language-select"
    >
      <option value="es">ES</option>
      <option value="en">EN</option>
    </select>
  </div>
</template>

<script setup>
const currentLocale = ref('es')

const changeLocale = () => {
  const localeCookie = useCookie('locale')
  localeCookie.value = currentLocale.value
}

onMounted(() => {
  const localeCookie = useCookie('locale')
  currentLocale.value = localeCookie.value || 'es'
})
</script>

<style scoped>
.language-switcher {
  display: inline-flex;
}

.language-select {
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-bg);
  color: var(--color-text);
  font-size: 0.85rem;
  cursor: pointer;
}

.language-select:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
</style>
