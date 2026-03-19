<template>
  <div class="rhythm-display card">
    <div class="rhythm-visual">
      <span class="rhythm-note" :class="rhythmClass"></span>
    </div>
    <div class="rhythm-name">{{ displayName }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  rhythmName: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  }
})

const rhythmClass = computed(() => {
  return `note-${props.rhythmName}`
})
</script>

<style scoped>
.rhythm-display {
  text-align: center;
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-lg);
}

.rhythm-visual {
  font-size: 4rem;
  margin-bottom: var(--spacing-md);
}

.rhythm-name {
  font-size: 1.5rem;
  font-weight: 500;
}

.note-whole::before { content: '𝅝'; }
.note-half::before { content: '𝅗𝅥'; }
.note-quarter::before { content: '♩'; }
.note-eighth::before { content: '♪'; }
.note-dottedQuarter::before { content: '♩.'; }
.note-dottedHalf::before { content: '𝅗𝅥.'; }
</style>
