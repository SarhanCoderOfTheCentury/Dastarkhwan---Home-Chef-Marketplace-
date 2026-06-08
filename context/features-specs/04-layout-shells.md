# Feature Spec 04: Routing & Layout Shells

We need to set up the SPA router, define layout shells for customers and chefs, configure route protection, and implement the light/dark theme switcher.

## Design

### Customer Layout Shell (`CustomerLayout.tsx`)
- **Header**: Contains the app logo, current hub delivery location picker, and user profile thumbnail.
- **Mobile Bottom Navigation**: A sticky bar positioned at the bottom of the screen (visible only on viewports `< 640px`) containing icon tabs:
  - **Discover** (icon: `Compass`)
  - **Subscriptions** (icon: `Calendar`)
  - **AI Planner** (icon: `BrainCircuit`)
- **Desktop Navigation**: Standard horizontal top-bar layout shifting navigation links next to the logo.

### Chef Layout Shell (`ChefLayout.tsx`)
- **Desktop Sidebar**: A permanent left-hand sidebar displaying storefront status indicators, navigation tabs (Orders, Store Setup, Earnings), and logout controls.
- **Mobile Top Bar**: Includes a slide-out drawer (burger menu) matching the navigation tabs.

## Implementation Instructions

1. **Routing System (`src/app/AppRouter.tsx`)**:
   - Install `react-router-dom` (or standard router).
   - Set up the main routing switch:
     - Public: `/auth/login`, `/` (landing page)
     - Protected Customer Roles: `/discovery`, `/chef/:id`, `/subscriptions`, `/track/:order_id`, `/planner`
     - Protected Chef Roles: `/chef/dashboard`, `/onboarding/chef-wizard`, `/chef/earnings`
   - Include route guards checking user role and redirecting unauthorized visitors.

2. **Hub Location Picker**:
   - In `CustomerLayout.tsx`, implement a top picker displaying the user's active neighborhood.
   - Clicking it opens a modal allowing users to pick mock Karachi areas (DHA, Clifton, Gulshan) which sets coords in Zustand (`useCartStore` / `useSearchStore`).

3. **Theme Toggler (`src/components/ThemeToggle.tsx`)**:
   - Manage light/dark states by writing a `data-theme` attribute to the document element (`<html>`).
   - Use CSS variables throughout styling declarations to automate theme color switching.

## Check When Done
- [ ] Direct routing to `/chef/dashboard` redirects unauthenticated visitors or customers back to login.
- [ ] Bottom navigation displays correctly on mobile dimensions and is hidden on desktop viewports.
- [ ] Location selector modifies coordinate variables used for proximity listings.
- [ ] Theme toggler correctly toggles background and borders without visual layout shift.
