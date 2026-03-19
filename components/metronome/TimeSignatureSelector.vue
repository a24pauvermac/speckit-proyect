<template>
  <div class="time-signature">
    <label id="timesig-label" class="text-secondary">Compas</label>
    <div class="time-options" role="group" aria-labelledby="timesig-label">
      <button
        v-for="sig in signatures"
        :key="sig"
        class="btn"
        :class="modelValue === sig ? 'btn-primary' : 'btn-secondary'"
        @click="selectSignature(sig)"
        :aria-pressed="modelValue === sig"
      >
        {{ sig }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '4/4'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const signatures = ['2/4', '3/4', '4/4', '6/8']

const selectSignature = (sig) => {
  emit('update:modelValue', sig)
  emit('change', sig)
}
</script>

<style scoped>
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
</style>
