<template>
  <div class="practice-page container">
    <h1 class="page-title">Practica</h1>

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

      <div v-else-if="books.length === 0" class="empty-state text-secondary">
        No hay libros. Crea uno para comenzar.
      </div>

      <div v-else class="books-grid">
        <PracticeMethodBookCard
          v-for="book in books"
          :key="book.id"
          :book="book"
          @select="selectBook"
        />
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

    <div v-if="showCreateModal" class="modal-overlay" @click.self="showCreateModal = false">
      <div class="modal card">
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
              <FontAwesomeIcon icon="save" />
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMethodBooks } from '~/composables/useMethodBooks'
import { useLessons } from '~/composables/useLessons'
import { useRoutineGenerator } from '~/composables/useRoutineGenerator'
import { usePracticeSessions } from '~/composables/usePracticeSessions'

const { books, loading, fetchBooks, createBook: createBookDb } = useMethodBooks()
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
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-md);
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  width: 90%;
  max-width: 480px;
}

.modal h3 {
  margin-bottom: var(--spacing-lg);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
}

.form-actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
  margin-top: var(--spacing-lg);
}

.loading, .empty-state {
  text-align: center;
  padding: var(--spacing-xl);
}
</style>
