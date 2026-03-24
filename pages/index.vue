<template>
  <div class="home-page container">
    <div class="hero">
      <div class="hero-icon">
        <img src="/icono piano.png" alt="Piano" class="piano-logo" />
      </div>
      <p class="subtitle text-light">Tu tutor personal de piano</p>
      
      <NuxtLink to="/practice" class="btn btn-primary btn-lg">
        Comenzar a practicar
      </NuxtLink>
    </div>

    <div class="chat-section">
      <h2 class="section-title">Chatea con tu profesor</h2>
      
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
.home-page {
  animation: fadeSlideIn var(--transition-smooth) ease-out;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero {
  text-align: center;
  padding: var(--spacing-xl) 0 var(--spacing-2xl);
}

.hero-icon {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
}

.piano-logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.subtitle {
  font-size: 1.1rem;
  margin-bottom: var(--spacing-xl);
  color: var(--color-gray-medium);
}

.btn-lg {
  padding: var(--spacing-md) var(--spacing-2xl);
  font-size: 1rem;
  font-weight: 500;
}

.chat-section {
  margin-top: var(--spacing-xl);
}

.section-title {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-lg);
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
