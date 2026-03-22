## ADDED Requirements

### Requirement: Book-specific chat with context

The system SHALL display a chat interface that includes context about the selected book when accessed via a book-specific URL.

#### Scenario: User clicks play on a book card
- **WHEN** the user clicks the play button on a book card from the home page
- **THEN** the user is navigated to a chat page with context about that specific book
- **AND** the chat header displays the book name

#### Scenario: Chat receives book context
- **WHEN** the chat page is loaded with a bookId
- **THEN** the system retrieves book information (name, author)
- **AND** includes this information in the initial system prompt

### Requirement: System prompt includes book context

The system SHALL include book context in the AI system prompt when provided.

#### Scenario: Chat with book context
- **WHEN** the user sends a message in a book-specific chat
- **THEN** the system prompt includes context about the book
- **AND** the AI responds with advice relevant to that book
