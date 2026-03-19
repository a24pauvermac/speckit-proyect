# API Contract: Metronome Service

## Overview
Internal service interface for metronome audio engine.

## Interface

### MetronomeEngine

```javascript
class MetronomeEngine {
  // State
  isPlaying;
  bpm;
  timeSignature;
  
  // Controls
  start();
  stop();
  setBpm(bpm);
  setTimeSignature(sig);
  
  // Tap tempo
  tap(); // returns calculated BPM
  
  // Events
  onBeat = (beat) => {};
}

const BeatInfo = {
  beat: Number,        // 1, 2, 3, 4...
  measure: Number,     // measure number
  isAccent: Boolean    // true for first beat of measure
};

const TimeSignature = ['2/4', '3/4', '4/4', '6/8'];
```

## Usage

```javascript
// Create engine
const engine = new MetronomeEngine();

// Set up beat callback
engine.onBeat = (beat) => {
  console.log(`Beat ${beat.beat}`, beat.isAccent ? ' (accent)' : '');
};

// Configure
engine.setBpm(120);
engine.setTimeSignature('4/4');

// Start
engine.start();

// Stop
engine.stop();

// Tap tempo - returns average BPM from last 4 taps
const bpm = engine.tap();
```

## Audio Requirements

- Latency: <20ms from scheduled time to audible click
- Sample rate: 44.1kHz
- Click sound: Short percussive sound (<50ms)
- Accent sound: Distinct from regular beat (higher pitch)
- Pre-loaded buffers to prevent first-beat latency
