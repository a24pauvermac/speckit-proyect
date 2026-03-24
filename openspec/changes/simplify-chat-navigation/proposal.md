## Why

Currently the app has separate chat conversations for each book (chat/[bookId].vue), which creates unnecessary complexity. The user wants a simpler approach: a single chat button that always leads to the same AI chat, regardless of which book/practice session.

## What Changes

- Remove book-specific chat pages (`chat/[bookId].vue`)
- Remove book context from chat messages (remove bookId from messages)
- Keep the main chat page (`chat.vue`) as the single chat interface
- Modify play button in practice page to navigate to `/chat` instead of `/chat/{bookId}`
- Delete the dynamic route `chat/[bookId].vue`

## Capabilities

### New Capabilities
- None - simplifying existing functionality

### Modified Capabilities
- `chat`: Remove book-specific chat, use single global chat for all conversations

## Impact

- Delete `pages/chat/[bookId].vue`
- Modify `pages/practice/index.vue` - change play button link to `/chat`
- Simplify chat message storage (remove bookId field from messages)
