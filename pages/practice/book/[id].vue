<template>
  <div class="book-editor-page container">
    <NuxtLink to="/practice" class="back-link">&larr; Volver a practica</NuxtLink>
    
    <h1>{{ book?.name || 'Libro' }}</h1>
    
    <div v-if="book" class="book-content">
      <div class="book-info card">
        <h2>Informacion del libro</h2>
        <p v-if="book.author" class="text-secondary">Autor: {{ book.author }}</p>
        <p v-if="book.description" class="text-secondary">{{ book.description }}</p>
      </div>

      <div class="lessons-section">
        <div class="section-header">
          <h2>Lecciones</h2>
          <button class="btn btn-primary" @click="showAddLesson = true">
            + Agregar leccion
          </button>
        </div>

        <div v-if="lessons.length === 0" class="empty-state text-secondary">
          No hay lecciones. Agrega una para comenzar.
        </div>

        <div v-else class="lessons-list">
          <div v-for="lesson in lessons" :key="lesson.id" class="lesson-item card">
            <div class="lesson-number">{{ lesson.number }}</div>
            <div class="lesson-info">
              <h3>{{ lesson.title }}</h3>
              <p class="text-secondary">{{ lesson.recommendedMinutes }} minutos</p>
            </div>
            <button class="btn btn-secondary btn-sm" @click="deleteLesson(lesson.id)">
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <div v-if="showAddLesson" class="modal-overlay" @click.self="showAddLesson = false">
        <div class="modal card">
          <h3>Agregar leccion</h3>
          <form @submit.prevent="addLesson">
            <div class="form-group">
              <label>Titulo</label>
              <input v-model="newLesson.title" type="text" class="input" required />
            </div>
            <div class="form-group">
              <label>Descripcion</label>
              <textarea v-model="newLesson.description" class="input" rows="2"></textarea>
            </div>
            <div class="form-group">
              <label>Minutos recomendados</label>
              <input v-model.number="newLesson.recommendedMinutes" type="number" class="input" min="1" max="120" />
            </div>
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" @click="showAddLesson = false">
                Cancelar
              </button>
              <button type="submit" class="btn btn-primary">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMethodBooks } from '~/composables/useMethodBooks'
import { useLessons } from '~/composables/useLessons'

const route = useRoute()
const { getBook } = useMethodBooks()
const { lessons, fetchLessons, createLesson, deleteLesson: deleteLessonDb } = useLessons()

const book = ref(null)
const showAddLesson = ref(false)
const newLesson = ref({
  title: '',
  description: '',
  recommendedMinutes: 15
})

onMounted(async () => {
  const bookId = route.params.id
  book.value = await getBook(bookId)
  await fetchLessons(bookId)
})

const addLesson = async () => {
  if (!book.value) return
  
  const lessonNumber = lessons.value.length + 1
  await createLesson({
    ...newLesson.value,
    bookId: book.value.id,
    number: lessonNumber,
    exercises: []
  })
  
  showAddLesson.value = false
  newLesson.value = { title: '', description: '', recommendedMinutes: 15 }
  await fetchLessons(book.value.id)
}

const deleteLesson = async (id) => {
  await deleteLessonDb(id)
  if (book.value) {
    await fetchLessons(book.value.id)
  }
}
</script>

<style scoped>
.back-link {
  display: inline-block;
  margin-bottom: var(--spacing-md);
  color: var(--color-text-secondary);
}

.book-info {
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-lg);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.lessons-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.lesson-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
}

.lesson-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-secondary);
  border-radius: 50%;
  font-weight: 500;
}

.lesson-info {
  flex: 1;
}

.lesson-info h3 {
  margin-bottom: var(--spacing-xs);
}

.btn-sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 0.85rem;
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
  padding: var(--spacing-lg);
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
</style>
