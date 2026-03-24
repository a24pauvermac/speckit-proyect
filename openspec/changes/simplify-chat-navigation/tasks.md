## 1. Remove book-specific chat route

- [x] 1.1 Delete `pages/chat/[bookId].vue` file

## 2. Update practice page navigation

- [x] 2.1 Modify play button in `pages/practice/index.vue` to link to `/chat` instead of `/chat/{bookId}`
- [x] 2.2 Remove or hide the "Crear libro" button if not needed (user wants simple chat button)
- [x] 2.3 Clean up unused imports related to chat navigation in practice page

## 3. Simplify chat page (optional cleanup)

- [x] 3.1 Verify `pages/chat.vue` works correctly as single chat
- [x] 3.2 Remove unused code if any

## 4. Verify

- [x] 4.1 Run lint check
- [x] 4.2 Test navigation works correctly
