# Feature Spec 18: Landing Page & Polish

We need to implement the marketing landing page (`/`), review mobile responsiveness across key viewports, and construct a floating demo script console to facilitate fast hackathon review.

## Design

### Landing Page Layout
- **Hero Section**: High-resolution dish visuals, appetizing terracotta overlay headers, search bar, and primary call-to-actions: `[ Find Neighborhood Kitchens ]` and `[ Become a Home Chef ]`.
- **Value Props Grid**: Displays cards detailing:
  - Hygiene video clips.
  - Neighborhood trust metrics.
  - Subscriptions savings vs commercial apps.
- **Karachi Live Stats**: Displays live counters (e.g. `120+ Active Kitchens`, `5,400+ Meals Served`, `4.9/5 Avg Rating`).

### Demo Console Controller
- A floating pill button `[ 🛠️ Open Demo Tools ]` visible in development environments. Clicking reveals quick action buttons:
  - `[ Log in as Customer Sana ]`
  - `[ Log in as Chef Ayesha ]`
  - `[ Simulate Order Status Flip ]`
  - `[ Trigger WhatsApp Push ]`

## Implementation Instructions

1. **Landing View (`src/app/Landing.tsx`)**:
   - Construct page layouts using responsive Tailwind flex grids.
   - Integrate stats counting animations or visual transition triggers.

2. **Demo Console (`src/components/ui/DemoConsole.tsx`)**:
   - Render fixed floating components using portal overlays.
   - Implement handlers that bypass auth screens to quickly populate specific customer/chef session contexts in Zustand stores to speed up evaluations.

3. **Viewport Audits**:
   - Set up layout assertions checking that input heights do not break below `44px` on `375px` viewports, and verify zero horizontal scrolling occurs.

## Check When Done
- [ ] Landing page scales cleanly across mobile, tablet, and desktop viewports.
- [ ] Demo controller logs sessions immediately without manual input requirements.
- [ ] Stats components load with clean opacity transitions.
- [ ] Zero horizontal scrolls occur across all routing options.
