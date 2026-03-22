<template>
  <div class="seed-page container">
    <h1>Seed Database</h1>
    <button @click="seedBooks" class="btn btn-primary">
      Seed 5 Piano Books
    </button>
    <button @click="clearBooks" class="btn btn-secondary" style="margin-left: 10px;">
      Clear All Books
    </button>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { useDatabase } from '~/composables/useDatabase'

const { db } = useDatabase()
const message = ref('')

const seedBooks = async () => {
  try {
    await db.methodBooks.clear()
    
    const books = [
      { name: 'Mikrokosmos', author: 'Bela Bartok', description: 'Six volumes of progressive pieces', createdAt: new Date(), lastUsedAt: new Date() },
      { name: 'Czerny 599', author: 'Carl Czerny', description: 'Studies for the piano', createdAt: new Date(), lastUsedAt: new Date(Date.now() - 86400000) },
      { name: 'Hanon', author: 'Charles-Louis Hanon', description: 'The Virtuoso Pianist', createdAt: new Date(), lastUsedAt: new Date(Date.now() - 172800000) },
      { name: 'Burgmuller 25', author: 'Friedrich Burgmuller', description: 'Easy and progressive études', createdAt: new Date(), lastUsedAt: new Date(Date.now() - 259200000) },
      { name: 'Alfred Basic 1', author: ' Willard Palmer', description: 'Adult Piano Course', createdAt: new Date(), lastUsedAt: new Date(Date.now() - 345600000) }
    ]
    
    for (const book of books) {
      await db.methodBooks.add(book)
    }
    
    message.value = '5 piano books added successfully!'
  } catch (error) {
    message.value = 'Error: ' + error.message
  }
}

const clearBooks = async () => {
  try {
    await db.methodBooks.clear()
    message.value = 'All books cleared!'
  } catch (error) {
    message.value = 'Error: ' + error.message
  }
}
</script>

<style scoped>
.seed-page {
  text-align: center;
  padding: var(--spacing-2xl);
}

.message {
  margin-top: var(--spacing-lg);
  color: green;
}
</style>
