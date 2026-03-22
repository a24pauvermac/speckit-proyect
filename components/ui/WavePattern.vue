<template>
  <svg class="wave-pattern" :width="width" :height="height" :viewBox="viewBox" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="concentric-waves" :width="patternSize" :height="patternSize" patternUnits="userSpaceOnUse">
        <circle v-for="ring in rings" :key="ring" :cx="patternSize / 2" :cy="patternSize / 2" :r="ring" fill="none" :stroke="strokeColor" :stroke-width="strokeWidth" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#concentric-waves)" />
  </svg>
</template>

<script setup>
const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  },
  patternSize: {
    type: Number,
    default: 80
  },
  strokeColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0.05)'
  },
  strokeWidth: {
    type: Number,
    default: 0.5
  }
})

const viewBox = computed(() => `0 0 ${props.patternSize} ${props.patternSize}`)

const rings = computed(() => {
  const result = []
  const spacing = props.patternSize / 4
  for (let i = 1; i <= 3; i++) {
    result.push(spacing * i)
  }
  return result
})
</script>

<style scoped>
.wave-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
</style>
