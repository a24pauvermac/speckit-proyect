<template>
  <div class="app-layout">
    <OfflineIndicator />
    <header class="app-header">
      <WavePattern 
        :pattern-size="60" 
        stroke-color="rgba(255, 255, 255, 0.08)" 
        :stroke-width="0.75"
      />
      <div class="header-content">
        <NuxtLink to="/" class="logo">
          <span class="logo-text">{{ pageTitle }}</span>
        </NuxtLink>
        <NuxtLink to="/" class="home-button" aria-label="Ir al inicio">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
        </NuxtLink>
      </div>
    </header>
    <main id="main-content" class="main-content" tabindex="-1">
      <slot />
    </main>
    <BottomNavigation />
  </div>
</template>

<script setup>
const route = useRoute()

const pageTitles = {
  '/': 'PianoMaster',
  '/practice': 'Practica',
  '/metronome': 'Metronomo',
  '/games': 'Juegos',
  '/progress': 'Progreso',
  '/chat': 'Chat',
  '/settings': 'Ajustes'
}

const pageTitle = computed(() => {
  return pageTitles[route.path] || 'PianoMaster'
})
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  position: relative;
  background-color: var(--color-black);
  color: var(--color-white);
  padding: var(--spacing-2xl) var(--spacing-lg);
  padding-top: calc(var(--spacing-2xl) + env(safe-area-inset-top, 0));
  border-radius: 0 0 var(--radius-organic) var(--radius-organic);
  overflow: hidden;
  min-height: 160px;
}

.header-content {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 80px;
}

.logo {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-decoration: none;
  color: var(--color-white);
}

.logo-text {
  font-size: 1.75rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  text-align: center;
  white-space: nowrap;
}

.home-button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-white);
  color: var(--color-black);
  text-decoration: none;
  transition: all var(--transition-smooth);
}

.home-button:hover {
  transform: translateY(-50%) scale(1.05);
}

.main-content {
  flex: 1;
  padding: var(--spacing-lg);
  padding-bottom: calc(var(--spacing-xl) + var(--nav-height));
}

@media (max-width: 600px) {
  .app-header {
    padding: var(--spacing-xl) var(--spacing-md);
    padding-top: calc(var(--spacing-xl) + env(safe-area-inset-top, 0));
    border-radius: 0 0 32px 32px;
    min-height: 120px;
  }
  
  .logo-text {
    font-size: 1.5rem;
  }
  
  .home-button {
    width: 40px;
    height: 40px;
  }
  
  .main-content {
    padding: var(--spacing-md);
  }
}
</style>
