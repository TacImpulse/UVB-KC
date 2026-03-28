# Technical Context: Ultimate Voice Bridge (UVB)

## Technology Stack

| Technology       | Version | Purpose                               |
| ---------------- | ------- | ------------------------------------- |
| Next.js          | 16.x    | React framework with App Router       |
| React            | 19.x    | UI library                            |
| TypeScript       | 5.9.x   | Type-safe JavaScript                  |
| Tailwind CSS     | 4.x     | Utility-first CSS with CSS-first config |
| Zustand          | 5.x     | Client state management               |
| Framer Motion    | 12.x    | Animations and transitions            |
| Heroicons        | 2.x     | Primary icon set                      |
| Lucide React     | 1.x     | Secondary icon set                    |
| Headless UI      | 2.x     | Accessible UI primitives              |
| Bun              | Latest  | Package manager & runtime             |

## Development Environment

### Commands

```bash
bun install        # Install dependencies
bun build          # Production build
bun start          # Start production server
bun lint           # Run ESLint
bun typecheck      # Run TypeScript type checking
```

### Fonts
- **Orbitron** - Display/heading font (futuristic, 3D feel)
- **Inter** - Body text (clean, readable)
- **JetBrains Mono** - Monospace (code, metrics)

## Project Configuration

### Tailwind CSS 4 (`globals.css`)
- `@theme` block defines all UVB color tokens
- Custom utility classes for glass panels, neon effects, buttons
- CSS keyframe animations for glow, laser sweep, sparks

### TypeScript (`tsconfig.json`)
- Strict mode enabled
- Path alias: `@/*` → `src/*`

## Design System

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `uvb-neon-green` | `#39ff14` | Primary accent, active states |
| `uvb-steel-blue` | `#4a6fa5` | Secondary accent, gradients |
| `uvb-deep-teal` | `#0d4f4f` | Panels, backgrounds |
| `uvb-royal-purple` | `#4a0e78` | Gradients, highlights |
| `uvb-matte-black` | `#0a0a0a` | Background |
| `uvb-dark-gray` | `#141418` | Cards, surfaces |
| `uvb-text-primary` | `#e8e8f0` | Main text |
| `uvb-text-secondary` | `#8888a0` | Secondary text |

### Component Classes
- `.galaxy-bg` - Multi-layer gradient background
- `.glass-panel` / `.glass-panel-glow` - Frosted glass with border
- `.btn-primary` / `.btn-ghost` - Button variants
- `.input-field` - Styled text input
- `.uvb-card` - Content card with hover glow
- `.status-pulse` - Animated status indicator
