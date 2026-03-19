<template>
  <a href="#main-content" class="skip-link">Saltar al contenido principal</a>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-accent);
  color: white;
  padding: 8px 16px;
  z-index: 1000;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0;
}

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
</style>
