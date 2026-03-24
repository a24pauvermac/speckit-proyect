## Context

Currently the app has a complex chat system where each book has its own chat conversation stored separately (chat/[bookId].vue). When users click the play button on a book in the practice page, they navigate to a book-specific chat. This is unnecessarily complex for the user's needs.

## Goals / Non-Goals

**Goals:**
- Simplify chat navigation to a single chat button that always goes to `/chat`
- Remove book-specific chat functionality
- Keep existing chat UI/UX intact
- Maintain backward compatibility with existing chat messages

**Non-Goals:**
- No changes to chat UI appearance
- No changes to practice session logic
- No changes to other app features

## Decisions

1. **Single chat route**: Keep only `/chat` as the chat route. Delete dynamic route `chat/[bookId].vue`.

2. **Play button change**: Modify play button in practice page to navigate to `/chat` instead of `/chat/{bookId}`.

3. **Message storage**: Continue storing messages without bookId. The current database schema doesn't have bookId indexed, so this is already the case.

4. **API simplification**: Remove bookContext from chat API calls since there's no book context needed.

## Risks / Trade-offs

- [Risk] Existing users with book-specific chat history - Mitigation: Old messages remain in IndexedDB but become orphaned (no impact on functionality)
- [Risk] Users expecting book context in chat - Mitigation: The AI can still answer general piano questions without book context

## Migration Plan

1. Delete `pages/chat/[bookId].vue`
2. Update `pages/practice/index.vue` - change `:to="\`/chat/${book.id}\`"` to `to="/chat"`
3. Simplify chat API to remove bookContext (optional - can keep for backward compat)
