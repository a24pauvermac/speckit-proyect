# Quickstart: PianoMaster PWA

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Google Gemini API key (for AI chat feature)

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd profe-piano

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

Configure `.env`:
```env
NUXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

## Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## Building for Production

```bash
# Generate static site
npm run generate

# Preview production build
npm run preview
```

## PWA Development

For full PWA testing (service worker, offline mode):

```bash
# Build and serve with PWA
npm run build
npm run preview
```

Use Chrome DevTools > Application > Service Workers to test offline behavior.

## Project Structure

```
piano-master/
├── assets/
│   ├── css/main.css          # Global styles
│   └── sounds/               # Audio files
├── components/               # Vue components
├── composables/             # Vue composables
├── layouts/                 # Page layouts
├── pages/                   # Route pages
├── plugins/                 # Nuxt plugins
├── public/                  # Static assets
├── server/
│   └── api/                  # Server routes
├── types/                   # JavaScript types
├── nuxt.config.js           # Nuxt configuration
└── vite.config.js           # Vite configuration
```

## Key Features

### Metronome
- Adjustable BPM (40-240)
- Time signatures: 2/4, 3/4, 4/4, 6/8
- Tap tempo
- Visual beat indicator
- Audio via Web Audio API

### Practice Routines
- Create custom method books
- Generate daily practice plans
- Track completion
- View progress history

### Games
- Note identification
- Rhythm matching
- Interval recognition
- Adaptive difficulty

### Chat
- AI tutor via Gemini API
- Local message history
- Privacy-focused

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run with coverage
npm run test:coverage
```

## Linting & Formatting

```bash
# Lint
npm run lint

# Format
npm run format
```

## Localization

The app supports Spanish (es) and English (en).

Switch language in Settings or via URL parameter: `?lang=es`

## Offline Usage

Once loaded, the app works offline:
- All practice features work without internet
- Games are fully offline
- Chat requires internet (AI feature)
- Progress saves to local IndexedDB
