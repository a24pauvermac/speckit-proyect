<template>
  <div class="note-display card">
    <div class="staff">
      <div class="note">{{ note }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  note: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.note-display {
  text-align: center;
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-lg);
}

.staff {
  font-size: 3rem;
  font-weight: 500;
}
</style>
