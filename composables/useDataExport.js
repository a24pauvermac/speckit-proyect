export const useDataExport = () => {
  const { getAllData, clearChatMessages } = useDatabase()

  const exportToJson = async () => {
    const data = await getAllData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    downloadBlob(blob, 'pianomaster-backup.json')
  }

  const exportToCsv = async () => {
    const data = await getAllData()
    let csv = ''

    if (data.practiceSessions.length > 0) {
      csv += 'Practice Sessions\n'
      csv += 'Date,Duration (min),Lesson ID,Completed\n'
      data.practiceSessions.forEach(s => {
        csv += `${new Date(s.date).toISOString()},${s.duration || 0},${s.lessonId || ''},${s.completed || false}\n`
      })
      csv += '\n'
    }

    if (data.gameRecords.length > 0) {
      csv += 'Game Records\n'
      csv += 'Game Type,Score,Correct,Total,Difficulty,Played At\n'
      data.gameRecords.forEach(g => {
        csv += `${g.gameType},${g.score},${g.correct || 0},${g.total || 0},${g.difficulty || ''},${new Date(g.playedAt).toISOString()}\n`
      })
      csv += '\n'
    }

    if (data.chatMessages.length > 0) {
      csv += 'Chat Messages\n'
      csv += 'Role,Content,Timestamp\n'
      data.chatMessages.forEach(m => {
        const escapedContent = m.content.replace(/"/g, '""')
        csv += `${m.role},"${escapedContent}",${new Date(m.timestamp).toISOString()}\n`
      })
    }

    const blob = new Blob([csv], { type: 'text/csv' })
    downloadBlob(blob, 'pianomaster-export.csv')
  }

  const exportToText = async () => {
    const data = await getAllData()
    let text = 'PianoMaster Export\n================\n\n'

    text += `Export Date: ${new Date().toLocaleString()}\n\n`

    if (data.methodBooks.length > 0) {
      text += 'Method Books\n'
      text += '------------\n'
      data.methodBooks.forEach(b => {
        text += `- ${b.name} by ${b.author || 'Unknown'}\n`
      })
      text += '\n'
    }

    if (data.practiceSessions.length > 0) {
      text += 'Practice Sessions\n'
      text += '-----------------\n'
      data.practiceSessions.forEach(s => {
        text += `- ${new Date(s.date).toLocaleDateString()}: ${s.duration || 0} min\n`
      })
      text += '\n'
    }

    if (data.gameRecords.length > 0) {
      text += 'Game Records\n'
      text += '------------\n'
      data.gameRecords.forEach(g => {
        text += `- ${g.gameType}: ${g.score} pts (${g.difficulty})\n`
      })
      text += '\n'
    }

    if (data.chatMessages.length > 0) {
      text += 'Chat History\n'
      text += '------------\n'
      data.chatMessages.forEach(m => {
        text += `[${m.role}] ${new Date(m.timestamp).toLocaleTimeString()}: ${m.content}\n`
      })
    }

    const blob = new Blob([text], { type: 'text/plain' })
    downloadBlob(blob, 'pianomaster-export.txt')
  }

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearAllChat = async () => {
    await clearChatMessages()
  }

  return {
    exportToJson,
    exportToCsv,
    exportToText,
    clearAllChat
  }
}
