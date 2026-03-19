# Research: PianoMaster PWA

## Technology Decisions

### 1. Framework: Nuxt.js 3 with Vite

**Decision**: Nuxt.js 3.x using Vite as build tool

**Rationale**: 
- User explicitly requested Nuxt.js with Vite
- Nuxt 3 provides excellent PWA support via @vite-pwa/nuxt
- SSR capability (though we'll use SSG/client-side for offline-first)
- Great developer experience with hot module replacement

**Alternatives Considered**:
- Plain Vue 3 + Vite: Would work but Nuxt provides better PWA integration
- Next.js: Solid but user specified Nuxt

---

### 2. Database: Dexie.js (IndexedDB)

**Decision**: Dexie.js for local IndexedDB storage

**Rationale**:
- User explicitly requested Dexie.js
- Excellent JavaScript support with Dexie
- Simple, powerful query API
- Vue composables integration is straightforward

**Alternatives Considered**:
- raw IndexedDB: Too verbose, error-prone
- localForage: Simpler but less powerful queries
- RxDB: Overkill for single-user local storage

---

### 3. AI Integration: Google Gemini API

**Decision**: Gemini API via server-side proxy

**Rationale**:
- User explicitly requested Google Gemini
- Must use server API route to protect API key from client exposure
- Gemini is cost-effective for text-based chat

**Alternatives Considered**:
- OpenAI GPT: More expensive, user specified Gemini
- Local AI: Not viable for mobile devices

---

### 4. Audio: Web Audio API

**Decision**: Web Audio API with AudioWorklet for metronome

**Rationale**:
- User explicitly requested Web Audio API
- AudioWorklet provides lowest latency for metronome
- Essential for professional metronome quality (SC-003: <20ms latency)

**Alternatives Considered**:
- HTML5 Audio: Higher latency, not suitable for precise metronome
- Tone.js: Good library but Web Audio API directly gives more control

---

### 5. PWA Strategy

**Decision**: @vite-pwa/nuxt module with offline-first architecture

**Rationale**:
- User requirement: "funcionar sin conexión a internet tras la primera carga"
- PWA provides installability and offline caching
- IndexedDB for data, service worker for assets

---

### 6. Design System

**Decision**: Custom CSS with CSS variables, no UI framework

**Rationale**:
- User specified: minimalist, monochromatic, rounded borders, whitespace
- Custom design allows exact control over aesthetic
- Keep bundle size small (<200KB target)

**Alternatives Considered**:
- Tailwind CSS: Good but may add unwanted bulk
- Vuetify/Material: Too heavy, not minimalist enough

---

## Best Practices Applied

### Performance
- AudioWorklet for metronome (bypasses main thread)
- Lazy loading for route components
- Image optimization via Nuxt Image (if needed)
- Service worker precaching for instant load

### Accessibility
- WCAG 2.1 AA compliance per spec
- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader testing

### Privacy
- All data stored locally in IndexedDB
- No analytics or tracking
- API keys stored server-side only
- Export functionality for user data

### Offline-First
- Service worker caches all static assets
- IndexedDB stores all user data
- App fully functional without network
- Graceful degradation messaging

---

## Implementation Notes

1. **Metronome Audio**: Use pre-loaded AudioBuffer with 44.1kHz sample rate. Schedule beats using AudioContext.currentTime for precise timing.

2. **Gemini Proxy**: Create Nuxt server route `/api/chat` that forwards requests to Gemini API. Never expose API key to client.

3. **State Management**: Use Pinia for global state (user preferences, current practice session). Dexie for persistent storage.

4. **i18n**: Use @nuxtjs/i18n for Spanish/English support. JSON locale files for translations.

5. **No Emojis**: CSS-based icons or text-only labels. AI responses filtered to remove emoji characters.
