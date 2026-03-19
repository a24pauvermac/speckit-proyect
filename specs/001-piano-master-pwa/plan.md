# Implementation Plan: PianoMaster PWA

**Branch**: `001-piano-master-pwa` | **Date**: 2026-03-11 | **Spec**: specs/001-piano-master-pwa/spec.md
**Input**: Feature specification from `/specs/001-piano-master-pwa/spec.md`

## Summary

PianoMaster is a progressive web application (PWA) built with Nuxt.js and Vite that serves as an autonomous music study environment. The application provides piano students with structured practice routines based on method books, a professional metronome, and interactive sight-reading games. All data is stored locally using IndexedDB via Dexie.js, with no backend required. The chatbot integrates with Google Gemini API for AI-assisted tutoring. The design follows an elegant, minimalist aesthetic with soft grays and whites, rounded borders, and calm ease-in-out animations.

## Technical Context

**Language/Version**: JavaScript (ES2022), Nuxt.js 3.x  
**Primary Dependencies**: Nuxt.js 3, Vite, Dexie.js (IndexedDB), @google/generative-ai, Web Audio API  
**Storage**: IndexedDB via Dexie.js (client-side only)  
**Testing**: Vitest for unit tests, Playwright for E2E  
**Target Platform**: Mobile browsers (iOS Safari, Android Chrome), PWA installable  
**Project Type**: Progressive Web Application (PWA) / Client-side SPA  
**Performance Goals**: Metronome latency <20ms, bundle size <200KB, FCP <1.5s  
**Constraints**: Offline-first, no emojis in UI or AI responses, WCAG 2.1 AA compliance  
**Scale/Scope**: Single-user local storage, ~50 screens estimated

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Code Quality Standards | PASS | Linting/formatting via Nuxt/Vite ecosystem |
| II. Testing Standards | PASS | TDD approach, Vitest available |
| III. UX Consistency | PASS | Single design system, consistent patterns |
| IV. Performance Requirements | PASS | Offline-first, lazy loading, optimized builds |
| V. Observability | DEFER | Client-only app; minimal logging needed |

No violations detected. Proceeding to research phase.

## Project Structure

### Documentation (this feature)

```text
specs/001-piano-master-pwa/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (via /speckit.tasks)
```

### Source Code (repository root)

```text
# Nuxt.js PWA structure
.pwa/                    # PWA assets (manifest, icons)

# Nuxt default structure
assets/
├── css/
│   └── main.css        # Global styles, CSS variables
└── sounds/             # Metronome click sounds

components/
├── metronome/          # Metronome UI components
├── games/              # Sight-reading game components
├── practice/           # Practice routine components
├── chat/               # Teacher chat components
└── ui/                 # Shared UI components (buttons, cards)

composables/
├── useAudioEngine.js   # Web Audio API wrapper
├── useDatabase.js      # Dexie.js database hooks
├── useMetronome.js     # Metronome logic
├── useGames.js         # Game logic
└── useChat.js          # Gemini API integration

plugins/
├── db.client.js        # Dexie.js initialization
└── i18n.client.js     # Internationalization

public/
├── icons/              # PWA icons
└── fonts/              # Custom fonts (if needed)

server/
└── api/
    └── chat.post.js   # Proxy for Gemini API (avoids CORS)

types/
└── index.js            # JavaScript interfaces

nuxt.config.js          # Nuxt configuration
vite.config.js          # Vite configuration
pwa.config.js           # PWA module config
```

**Structure Decision**: Single Nuxt.js application with client-side only architecture. Uses standard Nuxt directory structure optimized for PWA deployment.

## Phase 0: Research

### Research Tasks

- [x] Nuxt.js 3 PWA best practices
- [x] Dexie.js integration patterns with Vue/Nuxt
- [x] Web Audio API metronome latency optimization
- [x] Google Gemini API integration from client
- [x] Offline-first PWA strategies
- [x] Accessibility patterns for music apps

### Key Findings

**Nuxt.js PWA**: Use @vite-pwa/nuxt module for service worker and manifest generation.

**Dexie.js**: Use Vue composables pattern for reactive database queries. Dexie Cloud not needed - local-only storage.

**Web Audio API**: Use AudioWorklet for lowest latency metronome clicks. Preload audio buffers on app init.

**Gemini API**: Must use server API route to avoid exposing API key client-side. Send system prompt defining tutor persona.

**Offline-first**: PWA service worker caches all assets. IndexedDB handles data persistence.

---

## Phase 1: Design & Contracts

### Data Model

*See data-model.md for detailed entity definitions*

### Interface Contracts

- **User Profile API**: CRUD for user settings, preferences
- **Method Book API**: CRUD for custom books, lessons, exercises
- **Practice Session API**: Create/complete practice sessions
- **Metronome API**: Audio engine control interface
- **Game API**: Score tracking, difficulty progression
- **Chat API**: Message storage, Gemini API proxy

### Quick Start

*See quickstart.md for development setup instructions*

---

## Complexity Tracking

No complexity violations requiring justification.
