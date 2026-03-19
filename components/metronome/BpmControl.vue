<template>
  <div class="bpm-control">
    <button class="btn btn-secondary" @click="decreaseBpm" aria-label="Disminuir BPM">-</button>
    <div class="bpm-display" role="status" aria-live="polite">
      <span class="bpm-value">{{ modelValue }}</span>
      <span class="bpm-label text-secondary">BPM</span>
    </div>
    <button class="btn btn-secondary" @click="increaseBpm" aria-label="Aumentar BPM">+</button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 80
  },
  min: {
    type: Number,
    default: 40
  },
  max: {
    type: Number,
    default: 240
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const increaseBpm = () => {
  if (props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
    emit('change', props.modelValue + 1)
  }
}

const decreaseBpm = () => {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1)
    emit('change', props.modelValue - 1)
  }
}
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
</style>
