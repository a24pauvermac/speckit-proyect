import Dexie from 'dexie'

const db = new Dexie('PianoMasterDB')

db.version(1).stores({
  userProfiles: '++id, name, language',
  methodBooks: '++id, name, author, isPreset',
  lessons: '++id, bookId, number',
  exercises: '++id, lessonId, type',
  practiceSessions: '++id, date, bookId, lessonId, completed',
  lessonProgress: '++id, bookId, lessonId',
  metronomeSettings: '++id',
  gameRecords: '++id, gameType, playedAt, difficulty',
  chatMessages: '++id, role, timestamp'
})

export const useMethodBooks = () => {
  const books = ref([])
  const loading = ref(false)

  const fetchBooks = async () => {
    loading.value = true
    try {
      books.value = await db.methodBooks.toArray()
      books.value.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      loading.value = false
    }
  }

  const getBook = async (id) => {
    return await db.methodBooks.get(Number(id))
  }

  const createBook = async (bookData) => {
    const newBook = {
      ...bookData,
      createdAt: new Date().toISOString()
    }
    try {
      const id = await db.methodBooks.add(newBook)
      await fetchBooks()
      return id
    } catch (error) {
      console.error('Error creating book:', error)
      throw error
    }
  }

  const updateBook = async (id, updates) => {
    await db.methodBooks.update(Number(id), updates)
    await fetchBooks()
  }

  const deleteBook = async (id) => {
    await db.methodBooks.delete(Number(id))
    await db.lessons.where('bookId').equals(Number(id)).delete()
    await fetchBooks()
  }

  return {
    books: readonly(books),
    loading: readonly(loading),
    fetchBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
  }
}
