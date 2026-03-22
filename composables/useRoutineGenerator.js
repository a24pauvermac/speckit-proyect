import { database as db } from './useDatabase.js'

export const useRoutineGenerator = () => {
  const generateRoutine = async (bookId, lessonId, availableMinutes = 30) => {
    const lesson = await db.lessons.get(Number(lessonId))
    if (!lesson) return null

    const exercises = await db.exercises.where('lessonId').equals(Number(lessonId)).toArray()
    
    if (exercises.length === 0) {
      return generateDefaultRoutine(availableMinutes)
    }

    const totalExerciseMinutes = exercises.reduce((sum, e) => sum + (e.duration || 5), 0)
    
    let scaledExercises = exercises
    if (totalExerciseMinutes > availableMinutes) {
      const scale = availableMinutes / totalExerciseMinutes
      scaledExercises = exercises.map(e => ({
        ...e,
        duration: Math.max(1, Math.round(e.duration * scale))
      }))
    }

    return {
      bookId: Number(bookId),
      lessonId: Number(lessonId),
      lessonTitle: lesson.title,
      exercises: scaledExercises.map((e, index) => ({
        ...e,
        order: index + 1,
        completed: false
      })),
      totalMinutes: scaledExercises.reduce((sum, e) => sum + e.duration, 0),
      objectives: lesson.description ? [lesson.description] : []
    }
  }

  const generateDefaultRoutine = (availableMinutes) => {
    const defaultExercises = [
      { title: 'Escamas', type: 'scale', duration: Math.round(availableMinutes * 0.25), objectives: ['Practicar digitacion', 'Mantener ritmo uniforme'] },
      { title: 'Ejercicios tecnicos', type: 'technique', duration: Math.round(availableMinutes * 0.25), objectives: ['Trabajar flexibilidad', 'Control de dedos'] },
      { title: 'Estudios', type: 'etude', duration: Math.round(availableMinutes * 0.35), objectives: ['Expresion musical', 'Dinamicas'] },
      { title: 'Obra libre', type: 'piece', duration: Math.round(availableMinutes * 0.15), objectives: ['Interpretacion personal'] }
    ]

    return {
      exercises: defaultExercises.map((e, index) => ({
        ...e,
        id: index + 1,
        order: index + 1,
        completed: false
      })),
      totalMinutes: availableMinutes,
      objectives: ['Desarrollo tecnico', 'Expresion musical', 'Interpretacion']
    }
  }

  return {
    generateRoutine,
    generateDefaultRoutine
  }
}
