<template>
  <nav class="bottom-nav" role="navigation" aria-label="Navegacion principal">
    <NuxtLink to="/practice" class="nav-item" :class="{ active: isActive('/practice') }" aria-label="Practica">
      <span class="icon-wrapper">
        <svg v-if="isActive('/practice')" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M9 18V5l12-2v13" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="6" cy="18" r="3" fill="currentColor" stroke="none"/>
          <circle cx="18" cy="16" r="3" fill="currentColor" stroke="none"/>
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M9 18V5l12-2v13" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
      </span>
    </NuxtLink>
    
    <NuxtLink to="/metronome" class="nav-item" :class="{ active: isActive('/metronome') }" aria-label="Metronomo">
      <span class="icon-wrapper">
        <svg v-if="isActive('/metronome')" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="17" r="5" fill="currentColor" stroke="none"/>
          <path d="M12 2v10" stroke-linecap="round"/>
          <path d="M9 5l3 3 3-3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="17" r="5"/>
          <path d="M12 2v10" stroke-linecap="round"/>
          <path d="M9 5l3 3 3-3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </NuxtLink>
    
    <NuxtLink to="/games" class="nav-item" :class="{ active: isActive('/games') }" aria-label="Juegos">
      <span class="icon-wrapper">
        <svg v-if="isActive('/games')" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="2" y="6" width="20" height="12" rx="3" fill="currentColor" stroke="none"/>
          <path d="M12 15v-3" stroke-linecap="round"/>
          <circle cx="8" cy="12" r="1" fill="white"/>
          <circle cx="16" cy="12" r="1" fill="white"/>
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="2" y="6" width="20" height="12" rx="3"/>
          <path d="M12 15v-3" stroke-linecap="round"/>
          <circle cx="8" cy="12" r="1" fill="currentColor"/>
          <circle cx="16" cy="12" r="1" fill="currentColor"/>
        </svg>
      </span>
    </NuxtLink>
    
    <NuxtLink to="/progress" class="nav-item" :class="{ active: isActive('/progress') }" aria-label="Progreso">
      <span class="icon-wrapper">
        <svg v-if="isActive('/progress')" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M3 3v18h18" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 16l4-4 4 4 5-6" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" stroke-width="2"/>
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M3 3v18h18" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 16l4-4 4 4 5-6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </NuxtLink>
  </nav>
</template>

<script setup>
const route = useRoute()

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: var(--spacing-lg);
  left: var(--spacing-lg);
  right: var(--spacing-lg);
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: var(--color-white);
  border-radius: var(--radius-organic);
  padding: var(--spacing-sm) 0;
  padding-bottom: calc(var(--spacing-sm) + env(safe-area-inset-bottom, 0));
  z-index: 100;
  box-shadow: var(--shadow-diffused);
}

.nav-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 56px;
  min-height: 56px;
  color: var(--color-gray-medium);
  text-decoration: none;
  transition: all var(--transition-smooth);
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  transition: all var(--transition-smooth);
}

.nav-item.active .icon-wrapper {
  background: var(--color-black);
  color: var(--color-white);
}

.nav-item:not(.active):hover .icon-wrapper {
  background: var(--color-gray);
}

.nav-item:not(.active):hover {
  color: var(--color-black);
}
</style>

<style scoped>
@media (max-width: 600px) {
  .bottom-nav {
    left: var(--spacing-md);
    right: var(--spacing-md);
    bottom: var(--spacing-md);
    border-radius: 32px;
  }
}
</style>
