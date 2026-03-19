import Dexie from 'dexie'

const db = new Dexie('PianoMasterDB')

db.version(1).stores({
  userProfiles: '++id, name, language',
  methodBooks: '++id, name, author, isPreset, createdAt',
  lessons: '++id, bookId, number',
  exercises: '++id, lessonId, type',
  practiceSessions: '++id, date, bookId, lessonId, completed',
  lessonProgress: '++id, bookId, lessonId',
  metronomeSettings: '++id',
  gameRecords: '++id, gameType, playedAt, difficulty',
  chatMessages: '++id, role, timestamp'
})

export const useLessons = () => {
  const lessons = ref([])
  const loading = ref(false)

  const fetchLessons = async (bookId) => {
    loading.value = true
    try {
      lessons.value = await db.lessons
        .where('bookId')
        .equals(Number(bookId))
        .sortBy('number')
    } catch (error) {
      console.error('Error fetching lessons:', error)
    } finally {
      loading.value = false
    }
  }

  const getLesson = async (id) => {
    return await db.lessons.get(Number(id))
  }

  const createLesson = async (lessonData) => {
    const id = await db.lessons.add(lessonData)
    await fetchLessons(lessonData.bookId)
    return id
  }

  const updateLesson = async (id, updates) => {
    await db.lessons.update(Number(id), updates)
  }

  const deleteLesson = async (id) => {
    const lesson = await db.lessons.get(Number(id))
    await db.lessons.delete(Number(id))
    await db.exercises.where('lessonId').equals(Number(id)).delete()
    if (lesson) {
      await fetchLessons(lesson.bookId)
    }
  }

  const getExercises = async (lessonId) => {
    return await db.exercises.where('lessonId').equals(Number(lessonId)).toArray()
  }

  const createExercise = async (exerciseData) => {
    const id = await db.exercises.add(exerciseData)
    return id
  }

  const updateExercise = async (id, updates) => {
    await db.exercises.update(Number(id), updates)
  }

  const deleteExercise = async (id) => {
    await db.exercises.delete(Number(id))
  }

  return {
    lessons: readonly(lessons),
    loading: readonly(loading),
    fetchLessons,
    getLesson,
    createLesson,
    updateLesson,
    deleteLesson,
    getExercises,
    createExercise,
    updateExercise,
    deleteExercise
  }
}
