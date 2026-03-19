import en from '~/locales/en.json'
import es from '~/locales/es.json'

export default defineNuxtPlugin(() => {
  const messages = { en, es }
  
  const getLocale = () => {
    if (typeof navigator !== 'undefined') {
      const cookie = useCookie('locale')
      return cookie.value || 'es'
    }
    return 'es'
  }

  const t = (key) => {
    const locale = getLocale()
    const keys = key.split('.')
    let value = messages[locale]
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key
      }
    }
    
    return value || key
  }

  return {
    provide: {
      t
    }
  }
})
