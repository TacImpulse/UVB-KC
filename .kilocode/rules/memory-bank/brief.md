# Project Brief: Ultimate Voice Bridge (UVB) — KnightBot AI Assistant

## Purpose

The Ultimate Voice Bridge is an AI-Human interface suite featuring the KnightBot AI Assistant. It provides a unified, modular web application for multi-modal AI interaction including text chat, voice analysis, media understanding, podcast creation, and persistent memory management.

## Target Users

- Developers and power users running local LLMs (LM Studio, Ollama)
- Content creators needing voice cloning and podcast production tools
- Researchers requiring vision analytics, audio assessment, and RAG-based memory
- Anyone wanting a cohesive AI assistant interface on their local machine

## Core Use Case

Users interact with KnightBot through a dark-mode-first, galaxy-themed UI to:
1. Chat with an AI assistant supporting text, voice, image, and video inputs
2. Analyze and process voice recordings with scientific metrics
3. Caption images and understand video content
4. Create multi-seat podcasts with voice cloning
5. Store and retrieve knowledge via a RAG-powered memory bank
6. Configure LLM, voice, and system settings

## Key Requirements

### Must Have
- Dark mode-first UI/UX with galaxy/neon aesthetic
- Multi-modal chat (text, voice, image, video)
- Voice analysis with real-time visualization
- Image captioning and video understanding
- Podcast creation with configurable seats and voice cloning
- RAG-based persistent memory bank
- Animated particle/galaxy background
- Responsive sidebar navigation
- Zustand state management
- Framer Motion animations

### Nice to Have
- Command palette (⌘K)
- User profiles with password protection
- Thread branching and auto-saving
- Barge-in voice support
- Browser-based STT/TTS integration

## Success Metrics

- Clean TypeScript compilation and passing lint checks
- Modular, extensible architecture
- Beautiful, flowing UI with galaxy gradients and neon accents
- All 6 main sections functional (Chat, Voice, Media, Podcast, Memory, Settings)

## Constraints

- Next.js 16 + React 19 + Tailwind CSS 4
- Package manager: Bun
- Frontend-only in this phase (backend AI services are external)
- Designed for high-end consumer PCs (i9 14900KF, 64GB RAM, RTX 5090)
