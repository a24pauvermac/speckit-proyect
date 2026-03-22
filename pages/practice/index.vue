<template>
  <div class="practice-page container">
    <div class="books-section">
      <div class="section-header">
        <h2>Mis libros</h2>
        <button class="btn btn-primary" @click="showCreateModal = true">
          Crear libro
        </button>
      </div>

      <div v-if="loading" class="loading text-secondary">
        Cargando...
      </div>

      <div v-else-if="books.length === 0" class="empty-state card">
        <p>No hay libros. Crea uno para comenzar.</p>
      </div>

      <div v-else class="books-list">
        <NuxtLink
          v-for="book in books"
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

    <div v-if="selectedBook" class="lessons-section">
      <PracticeLessonList
        :lessons="lessons"
        :selectedLessonId="selectedLessonId"
        @select="selectLesson"
      />

      <PracticeRoutine
        v-if="currentRoutine"
        :routine="currentRoutine"
        @complete="completeExercise"
        @start="startSession"
      />
    </div>

    <Transition name="modal-overlay">
      <div v-if="showCreateModal" class="modal-overlay" @click.self="showCreateModal = false">
        <Transition name="modal-content">
          <div class="create-modal card">
            <h3>Crear libro</h3>
            <form @submit.prevent="createBook">
              <div class="form-group">
                <label>Nombre del libro</label>
                <input v-model="newBook.name" type="text" class="input" required />
              </div>
              <div class="form-group">
                <label>Autor</label>
                <input v-model="newBook.author" type="text" class="input" />
              </div>
              <div class="form-group">
                <label>Descripcion</label>
                <textarea v-model="newBook.description" class="input" rows="3"></textarea>
              </div>
              <div class="form-actions">
                <button type="button" class="btn btn-secondary" @click="showCreateModal = false">
                  Cancelar
                </button>
                <button type="submit" class="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { useMethodBooks } from '~/composables/useMethodBooks'
import { useLessons } from '~/composables/useLessons'
import { useRoutineGenerator } from '~/composables/useRoutineGenerator'
import { usePracticeSessions } from '~/composables/usePracticeSessions'

const { books, loading, fetchBooks, createBook: createBookDb, updateLastUsed } = useMethodBooks()
const { lessons, fetchLessons } = useLessons()
const { generateRoutine } = useRoutineGenerator()
const { createSession, addExerciseToSession } = usePracticeSessions()

const showCreateModal = ref(false)
const selectedBook = ref(null)
const selectedLessonId = ref(null)
const currentRoutine = ref(null)
const currentSessionId = ref(null)

const newBook = ref({
  name: '',
  author: '',
  description: '',
  isPreset: false
})

onMounted(async () => {
  await fetchBooks()
})

const selectBook = async (bookId) => {
  await updateLastUsed(bookId)
  selectedBook.value = await getMethodBook(bookId)
  await fetchLessons(bookId)
  selectedLessonId.value = null
  currentRoutine.value = null
}

const selectLesson = async (lesson) => {
  selectedLessonId.value = lesson.id
  if (selectedBook.value) {
    currentRoutine.value = await generateRoutine(selectedBook.value.id, lesson.id)
  }
}

const createBook = async () => {
  await createBookDb({ ...newBook.value })
  showCreateModal.value = false
  newBook.value = { name: '', author: '', description: '', isPreset: false }
}

const completeExercise = async (index) => {
  if (currentRoutine.value && currentRoutine.value.exercises[index]) {
    currentRoutine.value.exercises[index].completed = true
    
    if (currentSessionId.value) {
      await addExerciseToSession(currentSessionId.value, currentRoutine.value.exercises[index])
    }
  }
}

const startSession = async () => {
  if (selectedBook.value && selectedLessonId.value) {
    currentSessionId.value = await createSession(selectedBook.value.id, selectedLessonId.value)
  }
}

const getMethodBook = async (id) => {
  const { getBook } = useMethodBooks()
  return await getBook(id)
}
</script>

<style scoped>
.page-title {
  margin-bottom: var(--spacing-xl);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.section-header h2 {
  font-size: 1.25rem;
}

.books-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.book-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-white);
  border-radius: var(--radius-organic);
  padding: var(--spacing-lg) var(--spacing-xl);
  cursor: pointer;
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
  flex-shrink: 0;
}

.play-button svg {
  margin-left: 3px;
}

.book-item:hover .play-button {
  transform: scale(1.05);
}

.lessons-section {
  margin-top: var(--spacing-xl);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-md);
}

.create-modal {
  width: 100%;
  max-width: 480px;
  border-radius: var(--radius-organic);
}

.create-modal h3 {
  margin-bottom: var(--spacing-lg);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
  font-size: 0.9rem;
}

.form-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  margin-top: var(--spacing-xl);
}

.loading, .empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
  border-radius: var(--radius-organic);
}

.empty-state p {
  color: var(--color-gray-medium);
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
