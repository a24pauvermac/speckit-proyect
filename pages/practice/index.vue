<template>
  <div class="practice-page container">
    <div class="chat-section">
      <div class="section-header">
        <h2>Chat con tu profesor</h2>
      </div>
      
      <NuxtLink to="/chat" class="chat-button">
        <div class="chat-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <div class="chat-text">
          <h3>Hablar con el profesor</h3>
          <p>Tu asistente de piano IA</p>
        </div>
        <div class="play-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.practice-page.container {
  padding-top: var(--spacing-lg);
}

.chat-section .section-header {
  margin-bottom: var(--spacing-lg);
}

.chat-section .section-header h2 {
  font-size: 1.25rem;
}

.chat-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  background-color: var(--color-white);
  border-radius: var(--radius-organic);
  padding: var(--spacing-xl);
  cursor: pointer;
  transition: all var(--transition-smooth);
  box-shadow: var(--shadow-soft);
  text-decoration: none;
}

.chat-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-diffused);
}

.chat-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-black);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chat-text {
  flex: 1;
}

.chat-text h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
  color: var(--color-black);
}

.chat-text p {
  font-size: 0.9rem;
  font-weight: 300;
  color: var(--color-gray-medium);
  margin: 0;
}

.play-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-black);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-smooth);
  flex-shrink: 0;
}

.play-button svg {
  margin-left: 3px;
}

.chat-button:hover .play-button {
  transform: scale(1.05);
}

@media (max-width: 600px) {
  .chat-button {
    padding: var(--spacing-lg);
  }

  .chat-icon {
    width: 48px;
    height: 48px;
  }

  .chat-icon svg {
    width: 24px;
    height: 24px;
  }

  .chat-text h3 {
    font-size: 1.1rem;
  }

  .play-button {
    width: 36px;
    height: 36px;
  }

  .play-button svg {
    width: 16px;
    height: 16px;
  }
}
</style>
