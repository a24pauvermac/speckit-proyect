<template>
  <div class="app-layout">
    <OfflineIndicator />
    <nav class="nav" role="navigation" aria-label="Navegacion principal">
      <NuxtLink to="/" class="nav-link" :class="{ active: route.path === '/' }" :aria-current="route.path === '/' ? 'page' : false">
        <FontAwesomeIcon icon="home" aria-hidden="true" />
        <span>Inicio</span>
      </NuxtLink>
      <NuxtLink to="/practice" class="nav-link" :class="{ active: route.path.startsWith('/practice') }" :aria-current="route.path.startsWith('/practice') ? 'page' : false">
        <FontAwesomeIcon icon="music" aria-hidden="true" />
        <span>Practica</span>
      </NuxtLink>
      <NuxtLink to="/metronome" class="nav-link" :class="{ active: route.path === '/metronome' }" :aria-current="route.path === '/metronome' ? 'page' : false">
        <FontAwesomeIcon icon="stopwatch" aria-hidden="true" />
        <span>Metronomo</span>
      </NuxtLink>
      <NuxtLink to="/games" class="nav-link" :class="{ active: route.path.startsWith('/games') }" :aria-current="route.path.startsWith('/games') ? 'page' : false">
        <FontAwesomeIcon icon="gamepad" aria-hidden="true" />
        <span>Juegos</span>
      </NuxtLink>
      <NuxtLink to="/progress" class="nav-link" :class="{ active: route.path === '/progress' }" :aria-current="route.path === '/progress' ? 'page' : false">
        <FontAwesomeIcon icon="chart-line" aria-hidden="true" />
        <span>Progreso</span>
      </NuxtLink>
      <NuxtLink to="/chat" class="nav-link" :class="{ active: route.path === '/chat' }" :aria-current="route.path === '/chat' ? 'page' : false">
        <FontAwesomeIcon icon="comments" aria-hidden="true" />
        <span>Chat</span>
      </NuxtLink>
      <NuxtLink to="/settings" class="nav-link" :class="{ active: route.path === '/settings' }" :aria-current="route.path === '/settings' ? 'page' : false">
        <FontAwesomeIcon icon="cog" aria-hidden="true" />
        <span>Ajustes</span>
      </NuxtLink>
    </nav>
    <main id="main-content" class="main-content" tabindex="-1">
      <slot />
    </main>
  </div>
</template>

<script setup>
const route = useRoute()
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: var(--spacing-lg);
}

.nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
  background: var(--color-bg-secondary);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
}

.nav-link:hover {
  background: var(--color-border);
  color: var(--color-text);
}

.nav-link.active {
  background: var(--color-accent);
  color: white;
}

.nav-link :deep(svg) {
  width: 18px;
  height: 18px;
}

@media (max-width: 600px) {
  .nav-link span {
    display: none;
  }
  
  .nav-link {
    padding: var(--spacing-sm);
  }
}
</style>
