import { database as db } from './useDatabase.js'

export const useMethodBooks = () => {
  const books = ref([])
  const loading = ref(false)

  const fetchBooks = async () => {
    loading.value = true
    try {
      books.value = await db.methodBooks.toArray()
      books.value.sort((a, b) => {
        const dateA = a.lastUsedAt ? new Date(a.lastUsedAt) : new Date(a.createdAt || 0)
        const dateB = b.lastUsedAt ? new Date(b.lastUsedAt) : new Date(b.createdAt || 0)
        return dateB - dateA
      })
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
      createdAt: new Date(),
      lastUsedAt: new Date()
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

  const updateLastUsed = async (id) => {
    await db.methodBooks.update(Number(id), { lastUsedAt: new Date() })
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
    updateLastUsed,
    deleteBook
  }
}
