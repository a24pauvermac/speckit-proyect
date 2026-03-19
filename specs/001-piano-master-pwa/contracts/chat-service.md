# API Contract: Chat Service

## Overview
Internal service for AI-powered teacher chat using Google Gemini.

## Interface

### ChatService

```javascript
class ChatService {
  // Send message to AI tutor
  async sendMessage(content);
  
  // Get chat history
  async getHistory();
  
  // Clear history
  async clearHistory();
  
  // Stream response (optional)
  async *sendMessageStream(content);
}

const ChatMessage = {
  id: String,
  role: ['user', 'assistant'],
  content: String,
  timestamp: Date
};
```

## API Endpoint

**POST** `/api/chat`

Request:
```javascript
{
  message: String,
  history: Array  // last 10 messages for context
}
```

Response:
```javascript
{
  id: String,
  role: 'assistant',
  content: String,
  timestamp: Date
}
```

## System Prompt

The AI is configured with this persona:

```
You are a professional piano tutor at a prestigious music academy. 
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
- Provide technical advice about posture, hand position, dynamics
```

## API Endpoint

**POST** `/api/chat`

Request:
```typescript
{
  message: string;
  history: ChatMessage[]; // last 10 messages for context
}
```

Response:
```typescript
{
  id: string;
  role: 'assistant';
  content: string;
  timestamp: Date;
}
```

## Error Handling

| Error | Handling |
|-------|----------|
| API rate limit | Show "Please wait a moment" message |
| Network offline | Show "Chat requires internet" message |
| API error | Show generic error, log details |
| Invalid response | Retry once, then show error |

## Privacy

- Messages stored locally in IndexedDB
- History sent to Gemini API for context
- No messages stored on external servers
- Users can export/delete all chat data

## Message Formatting

AI responses should:
- Use plain text (no markdown rendering for simplicity)
- No emojis (filtered from response)
- Clear paragraph breaks
- Bullet points for exercises where appropriate
