<template>
  <div 
    class="chat-message" 
    :class="role"
    :role="role === 'user' ? 'presentation' : 'article'"
    :aria-label="role === 'user' ? 'Tu mensaje' : 'Mensaje del profesor'"
  >
    <div class="message-content">{{ content }}</div>
    <div class="message-time text-secondary">
      {{ formatTime(timestamp) }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  content: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    validator: (value) => ['user', 'assistant'].includes(value)
  },
  timestamp: {
    type: [Date, String, Number],
    default: null
  }
})

const formatTime = (timestamp) => {
  if (!timestamp) return ''
  return new Date(timestamp).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.chat-message {
  max-width: 80%;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}

.chat-message.user {
  align-self: flex-end;
  background-color: var(--color-accent);
  color: var(--color-bg);
}

.chat-message.assistant {
  align-self: flex-start;
  background-color: var(--color-bg-secondary);
}

.message-content {
  word-wrap: break-word;
}

.message-time {
  font-size: 0.75rem;
  margin-top: var(--spacing-xs);
}

.chat-message.user .message-time {
  color: rgba(255, 255, 255, 0.7) !important;
}
</style>
