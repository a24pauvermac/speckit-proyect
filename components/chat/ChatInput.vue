<template>
  <form class="chat-input" @submit.prevent="$emit('submit')" role="form" aria-label="Enviar mensaje">
    <input
      v-model="modelValue"
      type="text"
      class="input"
      placeholder="Escribe tu mensaje..."
      :disabled="disabled"
      aria-label="Mensaje"
    />
    <button 
      type="submit" 
      class="btn btn-primary"
      :disabled="disabled || !modelValue.trim()"
      aria-label="Enviar mensaje"
    >
      <FontAwesomeIcon icon="paper-plane" aria-hidden="true" />
    </button>
  </form>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue', 'submit'])
</script>

<style scoped>
.chat-input {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}

.chat-input .input {
  flex: 1;
}
</style>
