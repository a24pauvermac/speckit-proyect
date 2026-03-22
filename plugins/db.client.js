import { database } from '../composables/useDatabase.js'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      db: database
    }
  }
})
