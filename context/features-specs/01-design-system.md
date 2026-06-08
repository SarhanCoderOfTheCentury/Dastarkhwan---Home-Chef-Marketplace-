# Feature Spec 01: Design System & UI Primitives

We need to establish the app-wide design system, base typography, Tailwind CSS configuration, custom color tokens, and primary UI elements.

## Design Guidelines

DastarKhwan uses warm, appetizing tones representing Karachi's culinary heritage. The interface should feel premium, responsive, and tactile.

### Custom CSS Variables (`src/styles/index.css`)
Configure the following colors and tokens as standard CSS custom properties:
- **Primary Accent**: `#e05a36` (Terracotta Spice) / Hover: `#c44522` / Light background: `#fdf1ed`
- **Secondary Accent**: `#4a7c59` (Sage Green) / Hover: `#3b6347`
- **Semantic States**: Success: `#2e7d32`, Info: `#0288d1`, Warning: `#ed6c02`, Danger: `#d32f2f`
- **Neutrals (Light Mode)**: Primary Background: `#fdfbf7` (Cream), Secondary Background: `#f4efe6` (Sand), Primary Text: `#1f1a17` (Charcoal), Border: `#e8dfd3`, Card Background: `#ffffff`
- **Neutrals (Dark Mode)**: Primary Background: `#120e0c`, Secondary Background: `#1c1613`, Primary Text: `#f6f3f0`, Border: `#332722`, Card Background: `#1c1613`

### Typography Setup
- **Titles & Headers**: `Outfit` or `Playfair Display` (Gourmet, authentic feel)
- **Body & Captions**: `Inter` or standard system sans-serif (mobile readability)

## Implementation Instructions

1. **Install UI Dependencies**:
   - Install `lucide-react` for standard UI iconography.
   - Install `clsx` and `tailwind-merge` to build a clean styling utility.

2. **Utility Class Helper**:
   - Create `src/lib/utils.ts` and export a `cn(...inputs)` function using `clsx` and `twMerge` to allow dynamic Tailwind class combination.

3. **Core Tailwind Configuration**:
   - Update `tailwind.config.js` to extend themes matching the color tokens using CSS variables.
   - Set up custom font family classes: `font-display` (Outfit/Playfair Display) and `font-sans` (Inter).

4. **UI Primitives**:
   Create the following reusable component wrapper files in `src/components/ui/`:
   - `Button.tsx`: Support variants (`primary`, `secondary`, `outline`, `ghost`, `danger`) and size shapes. Enforce a minimum target size of `44px x 44px` on interactive elements.
   - `Input.tsx`: Custom styled border, focus rings mapping to `--color-primary`, error states.
   - `Card.tsx`: Standard rounded layout (`--radius-lg`) with light shadows (`--shadow-sm`) matching the theme color tokens.
   - `Badge.tsx`: Small pill-shaped tags used for cuisine categories and trust score metrics.
   - `Modal.tsx`: An overlay layout wrapper using portals to display detail views (like checkout or rider details) with custom fade/slide transitions.

## Check When Done
- [ ] Tailwind CSS configuration correctly resolves custom `--color-primary` and theme colors.
- [ ] Fonts (`Outfit`, `Playfair Display`, `Inter`) load correctly in the browser.
- [ ] `cn()` helper correctly combines overlapping Tailwind classes.
- [ ] Base elements (Button, Input, Card, Badge, Modal) compile without TypeScript or lint errors.
- [ ] App correctly shifts colors based on light/dark mode attribute selectors.
