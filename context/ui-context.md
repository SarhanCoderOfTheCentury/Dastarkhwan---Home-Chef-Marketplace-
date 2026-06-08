# UI Context: DastarKhwan

This document outlines the visual system, color tokens, typography, layout guidelines, and components representing the premium design guidelines for DastarKhwan.

## Color Token System

DastarKhwan uses warm, appetizing tones (spices, clay, fresh herbs) rather than default generic colors.

### Base Tokens

```css
:root {
  /* Brand Colors */
  --color-primary: #e05a36;           /* Terracotta Spice */
  --color-primary-hover: #c44522;
  --color-primary-light: #fdf1ed;
  --color-secondary: #4a7c59;         /* Sage Green (fresh ingredients) */
  --color-secondary-hover: #3b6347;
  
  /* Semantic Colors */
  --color-success: #2e7d32;           /* Delighted / Safe food */
  --color-info: #0288d1;              /* Informational alerts */
  --color-warning: #ed6c02;           /* In progress states */
  --color-danger: #d32f2f;            /* Cancelled / Error states */
  
  /* Neutrals (Light Mode) */
  --color-background-primary: #fdfbf7;   /* Off-white / Cream */
  --color-background-secondary: #f4efe6; /* Light Sand */
  --color-foreground-primary: #1f1a17;   /* Charcoal Warm */
  --color-foreground-secondary: #6e645e; /* Soft Muted Brown-Gray */
  --color-border: #e8dfd3;
  --color-card: #ffffff;
  
  /* Typography */
  --font-sans: 'Outfit', 'Inter', sans-serif;
  --font-serif: 'Playfair Display', serif;
  
  /* Spacing Scale */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(31, 26, 23, 0.05);
  --shadow-md: 0 6px 12px rgba(31, 26, 23, 0.08);
  --shadow-lg: 0 16px 32px rgba(31, 26, 23, 0.12);
}

[data-theme="dark"] {
  /* Brand Accent Adjustments */
  --color-primary-light: #2b1610;
  
  /* Neutrals (Dark Mode) */
  --color-background-primary: #120e0c;   /* Dark Charcoal */
  --color-background-secondary: #1c1613; /* Warm Dark Brown */
  --color-foreground-primary: #f6f3f0;
  --color-foreground-secondary: #a89c95;
  --color-border: #332722;
  --color-card: #1c1613;
}
```

## Typography

- **Headers & Display Titles**: Use `Outfit` or `Playfair Display` for a gourmet, home-cooked, authentic presentation.
- **Body & Controls**: Use `Inter` or `System Sans` for crisp readability on mobile screens.
- **Sizes**:
  - `h1`: 28px (2rem)
  - `h2`: 22px (1.5rem)
  - `h3`: 18px (1.125rem)
  - `body`: 14px (0.875rem)
  - `caption`: 12px (0.75rem)

## Key Layout Boundaries & Breakpoints

We adopt a mobile-first responsive architecture. The app dashboard changes dynamically to suit typical smartphone screens used by drivers and busy users.

- **Mobile Viewport Target**: `< 640px` (Main user workflow target; compact grids, bottom sheet menus, tap-friendly status controls).
- **Tablet/Medium Viewport**: `640px` to `1024px` (Two-column discovery layout).
- **Desktop Viewport**: `> 1024px` (Max layout container `1200px`, sticky sidebar layouts).

## Component Styling Rules

### 1. Delivery Tracker Stepper
- A horizontal timeline with four nodes representing the status-based tracking steps:
  1. **Preparing** (icon: `ti-tool-kitchen-2`)
  2. **Packed & Ready** (icon: `ti-box-seam`)
  3. **Out for Delivery** (icon: `ti-motorbike`)
  4. **Delivered** (icon: `ti-circle-check`)
- Active nodes use `--color-primary`, completed nodes use `--color-secondary` with a checkmark, and pending nodes are grayed out using `--color-foreground-secondary`.
- Seamless micro-transitions (scale and opacity tweaks) occur when a step status switches via realtime data.

### 2. Action Buttons (Chef Dashboard)
- Interactive buttons to advance the status chain:
  - Big, touch-friendly tap targets (minimum size `48px x 48px`).
  - Active steps display custom alerts: e.g. "Tap to mark Packed & Ready".
  - Includes a subtle pulsing ring animation around the active action button to guide the chef's eyes.

### 3. Trust Score & Badges
- Trust score indicator rendered as a badge containing a star and a calculated decimal (e.g., `4.8`).
- Uses green background (`--color-success`) for high ratings, amber (`--color-warning`) for mid, and neutral borders otherwise.
- Pro Chef indicator features a gradient styling: `linear-gradient(135deg, var(--color-primary), #ec4899)`.
