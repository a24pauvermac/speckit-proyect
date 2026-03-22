<template>
  <div class="chat-page container">
    <div class="chat-container card">
      <div class="messages" ref="messagesContainer" role="log" aria-live="polite" aria-label="Historial de mensajes">
        <div
          v-for="message in messages"
          :key="message.id"
          class="message"
          :class="message.role"
          :role="message.role === 'user' ? 'presentation' : 'article'"
          :aria-label="message.role === 'user' ? 'Tu mensaje' : 'Mensaje del profesor'"
        >
          <div class="message-content">{{ message.content }}</div>
          <div class="message-time text-secondary">
            {{ formatTime(message.timestamp) }}
          </div>
        </div>

        <div v-if="isThinking" class="message assistant" role="status" aria-label="Pensando">
          <div class="message-content thinking">
            Pensando...
          </div>
        </div>
      </div>

      <form class="chat-input" @submit.prevent="sendMessage" role="form" aria-label="Enviar mensaje">
        <input
          v-model="inputMessage"
          type="text"
          class="input"
          placeholder="Escribe tu mensaje..."
          :disabled="isThinking"
          aria-label="Mensaje"
        />
        <button 
          type="submit" 
          class="btn btn-primary btn-circle"
          :disabled="isThinking || !inputMessage.trim()"
          aria-label="Enviar mensaje"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22,2 15,22 11,13 2,9"/>
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useDatabase } from '~/composables/useDatabase'

const { getChatMessages, createChatMessage } = useDatabase()

const messages = ref([])
const inputMessage = ref('')
const isThinking = ref(false)
const messagesContainer = ref(null)

const formatTime = (timestamp) => {
  if (!timestamp) return ''
  return new Date(timestamp).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const loadMessages = async () => {
  const stored = await getChatMessages(50)
  messages.value = stored.reverse()
}

const sendMessage = async () => {
  if (!inputMessage.value.trim() || isThinking.value) return

  const userMessage = inputMessage.value.trim()
  inputMessage.value = ''

  await createChatMessage({
    role: 'user',
    content: userMessage
  })
  await loadMessages()
  scrollToBottom()

  isThinking.value = true

  try {
    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: {
        message: userMessage,
        history: messages.value.slice(-10)
      }
    })

    if (response.content) {
      await createChatMessage({
        role: 'assistant',
        content: response.content
      })
      await loadMessages()
    }
  } catch (error) {
    console.error('Chat error:', error)
    await createChatMessage({
      role: 'assistant',
      content: 'Disculpa, hubo un error al procesar tu mensaje. Intenta de nuevo.'
    })
    await loadMessages()
  } finally {
    isThinking.value = false
    scrollToBottom()
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

onMounted(async () => {
  await loadMessages()
  scrollToBottom()
})
</script>

<style scoped>
.chat-page {
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  border-radius: var(--radius-organic);
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.message {
  max-width: 80%;
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-organic);
}

.message.user {
  align-self: flex-end;
  background-color: var(--color-black);
  color: var(--color-white);
}

.message.assistant {
  align-self: flex-start;
  background-color: var(--color-gray);
}

.message-content {
  word-wrap: break-word;
  line-height: 1.6;
}

.message-time {
  font-size: 0.75rem;
  margin-top: var(--spacing-xs);
  font-weight: 300;
}

.message.user .message-time {
  color: rgba(255, 255, 255, 0.6) !important;
}

.thinking {
  color: var(--color-gray-medium);
  font-weight: 300;
}

.chat-input {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  padding-bottom: calc(var(--spacing-md) + env(safe-area-inset-bottom, 0));
  border-top: 1px solid var(--color-gray);
}

.chat-input .input {
  flex: 1;
  border: 2px solid var(--color-gray);
  border-radius: var(--radius-organic);
}

.chat-input .input:focus {
  border-color: var(--color-black);
}

.btn-circle {
  width: 48px;
  height: 48px;
  min-width: 48px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
</style>
