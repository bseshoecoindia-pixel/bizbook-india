# BizBook India — Design Brief

## Purpose & Tone
Business billing & accounting app for Indian SMBs. Modern, professional, approachable, business-focused aesthetic. Clean, minimal, refined—no decoration unless it serves clarity.

## Visual Direction
**Refined minimalism** — light, airy interface with deliberate surface hierarchy. Teal accent used sparingly. Editorial composition with clean whitespace. Premium business technology aesthetic.

## Color Palette

| Token | Light Mode | Dark Mode | Purpose |
|-------|-----------|-----------|---------|
| Primary | `0.55 0.12 185` (Teal) | `0.65 0.12 185` | CTAs, active states, brand |
| Secondary | `0.25 0.08 250` (Navy) | `0.72 0.08 250` | Text, headings, hierarchy |
| Accent | `0.55 0.12 185` (Teal) | `0.65 0.12 185` | Highlights, focus states |
| Background | `0.98 0.01 240` | `0.11 0.01 240` | Page base |
| Card | `1.0 0 0` (Pure white) | `0.15 0.01 240` | Lifted surfaces |
| Muted | `0.92 0.01 240` | `0.18 0.01 240` | Backgrounds, tertiary |
| Destructive | `0.55 0.22 25` | `0.65 0.19 22` | Error, delete, warnings |

## Typography
- **Display**: Bricolage Grotesque (headlines, app branding, emphasis)
- **Body**: DM Sans (content, labels, UI text—clean, business-appropriate)
- **Mono**: System monospace (code, SKU, invoice numbers)
- **Scale**: Large touch targets (buttons 44px+), 16px body baseline, clear hierarchy via size & weight

## Shape Language
- **Border radius**: 12px (consistent, friendly but professional)
- **Buttons**: Full-width on mobile, 12px radius, 44px min-height
- **Cards**: 12px radius with soft shadows (not elevated on hover—maintain calm)
- **Icons**: 24px stroke-based UI icons, 20px for inline

## Elevation & Depth
- **Background**: Neutral light blue-grey base
- **Cards**: Pure white with subtle shadow (`shadow-card`)
- **Modals/Popovers**: Elevated shadow (`shadow-elevated`)
- **No decorative gradients or glassmorphism**—direct, structured

## Structural Zones

| Zone | Treatment | Purpose |
|------|-----------|---------|
| Header | `bg-card` border-b, sticky | Business name, notifications, search |
| Content | `bg-background` grid/flex | KPI cards, graphs, forms |
| Cards | `bg-card` rounded-lg shadow-card | Data containers, metrics |
| Navigation | `bg-card` border-t (mobile nav) | Dashboard, Bills, Inventory, Customers, Reports |
| Sidebar | `bg-sidebar` (if desktop) | Extended navigation, collapsible |

## Component Patterns
- **KPI Card**: Stacked label/value with accent underline, shadow-card
- **Invoice Item Row**: Condensed table row, grey dividers
- **Action Button**: Full-width or justified grid on mobile, teal on light/lighter teal on dark
- **Input**: Light border, 8px padding, subtle focus ring
- **Drawer**: Bottom sheet on mobile, full-width or centered on desktop

## Motion & Micro-interactions
- **Transition**: All interactive elements use `transition-smooth` (300ms cubic-bezier)
- **Button press**: Active state color shift, no bounce
- **Page transitions**: Fade in 200ms (no slide animations—maintains professionalism)
- **Loading**: Subtle spinner or skeleton placeholders (no shimmer)

## Spacing & Rhythm
- **Gutters**: 16px mobile, 24px tablet, 32px desktop
- **Card stacks**: 12px gap (grid auto-rows)
- **Typography**: 1.5x line-height for body, 1.2x for headings
- **Density**: Balanced—information-rich but not cramped

## Constraints
- **Max width**: 1280px desktop (container-lg)
- **Mobile first**: All layouts responsive from 320px+
- **No rounded corners < 8px** (too sharp for business-friendly)
- **Always use tokens**—no hex, rgb, or arbitrary Tailwind colors
- **Contrast**: AA+ on all text/controls (light: L diff ≥ 0.7, dark: L diff ≥ 0.6)

## Signature Detail
**Teal accent restraint**: Primary action buttons use teal; secondary/tertiary use grey or navy. Dashboard KPI cards have thin teal left border (4px) to tie visual identity without overdecoration. Creates "premium app" impression through intentional color economy.

## Exports & Customization
- `index.css`: OKLCH palette + @font-face + shadow utilities
- `tailwind.config.js`: Custom box-shadow entries (no color overrides)
- Fonts: DM Sans (body), Bricolage Grotesque (display)

