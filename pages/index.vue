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

    <div class="books-section">
      <h2 class="section-title">Libros recientes</h2>
      
      <div v-if="loading" class="loading text-secondary">
        Cargando...
      </div>

      <div v-else-if="books.length === 0" class="empty-state card">
        <p>No hay libros. Crea uno para comenzar.</p>
        <NuxtLink to="/practice" class="btn btn-primary">
          Ir a practica
        </NuxtLink>
      </div>

      <div v-else class="books-scroll">
        <NuxtLink 
          v-for="book in books.slice(0, 3)" 
          :key="book.id" 
          :to="`/chat/${book.id}`"
          class="book-item"
        >
          <div class="book-content">
            <h3 class="book-name">{{ book.name }}</h3>
            <p class="book-author">{{ book.author || 'Autor desconocido' }}</p>
          </div>
          <div class="play-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMethodBooks } from '~/composables/useMethodBooks'

const { books, loading, fetchBooks } = useMethodBooks()

onMounted(async () => {
  await fetchBooks()
})
</script>

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

.books-section {
  margin-top: var(--spacing-xl);
}

.section-title {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-lg);
}

.loading {
  text-align: center;
  padding: var(--spacing-2xl);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
}

.empty-state p {
  margin-bottom: var(--spacing-lg);
  font-weight: 300;
}

.books-scroll {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  max-height: 400px;
  overflow-y: auto;
  padding-right: var(--spacing-xs);
}

.books-scroll::-webkit-scrollbar {
  width: 4px;
}

.books-scroll::-webkit-scrollbar-track {
  background: var(--color-gray);
  border-radius: 2px;
}

.books-scroll::-webkit-scrollbar-thumb {
  background: var(--color-gray-medium);
  border-radius: 2px;
}

.book-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-white);
  border-radius: var(--radius-organic);
  padding: var(--spacing-lg) var(--spacing-xl);
  text-decoration: none;
  transition: all var(--transition-smooth);
  box-shadow: var(--shadow-soft);
}

.book-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-diffused);
}

.book-content {
  flex: 1;
}

.book-name {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: var(--spacing-xs);
  color: var(--color-black);
}

.book-author {
  font-size: 0.9rem;
  font-weight: 300;
  color: var(--color-gray-medium);
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
}

.play-button svg {
  margin-left: 3px;
}

.book-item:hover .play-button {
  transform: scale(1.05);
}

@media (max-width: 600px) {
  .book-item {
    padding: var(--spacing-md) var(--spacing-lg);
  }
  
  .book-name {
    font-size: 1rem;
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
