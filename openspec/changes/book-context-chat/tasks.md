## 1. Data Layer

- [x] 1.1 Add `lastUsedAt` to schema if not exists (already added)
- [x] 1.2 Create composable useBookChat to handle book-specific chat context

## 2. API Changes

- [x] 2.1 Modify `/api/chat.post.js` to accept book context parameter
- [x] 2.2 Include book context in system prompt when provided

## 3. UI Changes

- [x] 3.1 Create `/chat/[bookId].vue` page with book context
- [x] 3.2 Update pages/index.vue play button to link to `/chat/[bookId]`
- [x] 3.3 Update pages/practice/index.vue play button to link to `/chat/[bookId]`
- [x] 3.4 Add header with book name in book chat page
