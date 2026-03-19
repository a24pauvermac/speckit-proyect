export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { message, history } = body

  if (!message) {
    throw createError({
      statusCode: 400,
      message: 'Message is required'
    })
  }

  const config = useRuntimeConfig()
  const apiKey = config.openrouterApiKey || process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      message: 'OpenRouter API key not configured'
    })
  }

  const systemMessage = {
    role: 'system',
    content: `You are a professional piano tutor at a prestigious music academy. 
You provide structured, pedagogical guidance for piano practice.

Guidelines:
- Give clear, actionable feedback
- Explain musical concepts clearly
- Break down complex pieces into manageable sections
- Suggest specific exercises from method books (Beyer, Hanon, Thompson, Czerny)
- Maintain a warm but professional tone
- Never use emojis in responses
- Always respond in the same language as the user
- Encourage consistent daily practice
- Provide technical advice about posture, hand position, dynamics`
  }

  const messages = [systemMessage]
  
  if (history && history.length > 0) {
    history.slice(-10).forEach(msg => {
      messages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })
    })
  }
  
  messages.push({ role: 'user', content: message })

  try {
    const response = await $fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://piano-master.app',
        'X-Title': 'PianoMaster PWA'
      },
      body: {
        model: 'meta-llama/llama-3.1-8b-instruct',
        messages,
        temperature: 0.7,
        max_tokens: 1000
      }
    })

    const reply = response.choices[0].message.content
    const cleanedReply = reply.replace(/[\u{1F300}-\u{1F9FF}]/gu, '')

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: cleanedReply,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('OpenRouter API error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to generate response: ' + (error.message || error.data?.error?.message || 'Unknown error')
    })
  }
})
