# System Patterns: Ultimate Voice Bridge (UVB)

## Architecture Overview

```
src/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout (Orbitron, Inter, JetBrains Mono)
│   ├── page.tsx                   # Main dashboard (renders all sections)
│   ├── globals.css                # Tailwind + UVB theme tokens + custom styles
│   ├── api/health/route.ts        # Health check endpoint
│   ├── chat/ChatInterface.tsx     # Chat UI component
│   ├── voice-analysis/            # Voice analysis page component
│   ├── media/                     # Media studio page component
│   ├── podcast/                   # Podcast studio page component
│   ├── memory/                    # Memory bank page component
│   └── settings/                  # Settings page component
├── components/
│   ├── animated/
│   │   ├── GalaxyBackground.tsx   # Canvas particle system
│   │   ├── UIEffects.tsx          # GlowOrb, ScanLine, FloatingDot
│   │   └── VoiceVisualizer.tsx    # Real-time audio bars
│   ├── layout/
│   │   ├── Sidebar.tsx            # Collapsible navigation
│   │   └── Header.tsx             # Top bar with status/search
│   └── ui/                        # (Reusable UI components)
├── stores/
│   └── appStore.ts                # Zustand global state
└── lib/                           # Utilities
```

## Key Design Patterns

### 1. Section-Based Rendering
The main `page.tsx` acts as a single-page application shell. The `activeSection` state in Zustand determines which component renders in the content area. All sections share the same sidebar and header.

### 2. Component-per-Section
Each major feature (Chat, Voice, Media, Podcast, Memory, Settings) is a self-contained component with its own local state, imported by the main page.

### 3. Zustand for Global State
Navigation state, chat threads, podcast seats, voice settings, and user profile are managed in a single Zustand store (`appStore.ts`).

### 4. CSS Custom Properties via Tailwind v4
The `@theme` block in `globals.css` defines all UVB color tokens. These are used throughout via Tailwind classes like `bg-uvb-deep-teal`, `text-uvb-neon-green`.

### 5. Server Components by Default
Layout and API routes are Server Components. All interactive sections use `"use client"`.

## Styling Conventions

- Tailwind v4 CSS-first configuration
- Custom utility classes: `.galaxy-bg`, `.glass-panel`, `.neon-text`, `.btn-primary`, `.btn-ghost`, `.input-field`, `.uvb-card`
- Animated keyframes: `pulse-glow`, `laser-sweep`, `spark`
- Framer Motion for all transitions and animations

## State Management

| State | Store | Type |
|-------|-------|------|
| Navigation | `appStore` | `sidebarOpen`, `activeSection` |
| Chat | `appStore` | `threads[]`, `activeThreadId`, `isRecording` |
| Voice | `appStore` | `isVoiceActive`, `voiceInputLevel` |
| Podcast | `appStore` | `podcastSeats[]` |
| User | `appStore` | `currentUser` |
| UI | `appStore` | `showCommandPalette` |
