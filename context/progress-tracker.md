# Progress Tracker: DastarKhwan

Update this file after every meaningful implementation change.

## Current Phase

- **Phase 1: Foundation** (Auth, DB schema, base UI, and seed data)

## Current Goal

- Scaffold project foundation, configure PostgreSQL schemas with RLS in Supabase, set up email/OTP authentication, and seed Karachi chef listings.

## Completed

- **Project Scaffolding**: Setup context files (`project-overview.md`, `architecture.md`, `ui-context.md`, `code-standards.md`, `ai-workflow-rules.md`, `progress-tracker.md`) and root `CLAUDE.md`.
- **Build Plan Refinement**: Replaced mock GPS/Leaflet tracking maps with status-based tracking and updated the pitch guidelines.
- **Initialize Vite + React + Tailwind CSS project structure**: Successfully initialized the Vite project in the workspace.
- **Design System & UI Primitives (Feature Spec 01)**: Created the core custom stylesheet, Tailwind CSS configuration, and standard UI components (Button, Input, Card, Badge, Modal).
- **Design Inspiration Screen References**: Mapped the design assets in `screens/` to their corresponding screens in `screens.md` and added rules to treat them strictly as visual inspiration to prevent feature scope creep.
- **Supabase Setup & Seeding (Feature Spec 02)**: Setup PostgreSQL tables (`profiles`, `chefs`, `menus`, `subscriptions`, `orders`, `reviews`), RLS policies, singleton client helper, and seeded 6 Karachi cooks under DHA, Clifton, and Gulshan-e-Iqbal.
- **Authentication Flow & Onboarding (Feature Spec 03)**: Implemented Zustand state management (`useAuthStore`), lightweight router (`Router`), OTP split-screen login with Pakistani formatting + developer code bypass (`123456`), and the role selection onboarding wizard.

- **Routing & Layout Shells (Feature Spec 04)**: Configured react-router-dom, route guards, layout shells for customer and chef, hub location picker, and theme switching.
- **Customer Discovery Feed (Feature Spec 05)**: Implemented hyper-local chef discovery feed (`/discovery`), integrated Leaflet.js interactive maps with custom marker DivIcons, built dietary preference filters, and optimized chef listing cards.

## In Progress

- *None*

## Next Up

### Phase 2: Customer Core (6–16 hrs)
- [x] Build Hyper-local Discovery Screen (chef card listings with area search and rating metrics).
- [ ] Develop Chef Profile View (menu tabs, kitchen images, review sections).
- [ ] Implement Subscription Wizard (5-day or 7-day selection, slot booking, checkout modals).
- [ ] Construct My Subscriptions Dashboard (skip/pause days, subscription states).
- [ ] Create Catering Request Dialog.

### Phase 3: Chef Dashboard & AI Features (16–30 hrs)
- [ ] Create Chef onboarding walkthrough (wizard form to upload items, photos, details).
- [ ] Build Chef Orders List (today's deliveries, subscription roster, catering quotes).
- [ ] Implement Chef Earnings Board (Recharts weekly graphs, payout summaries).
- [ ] Integrate OpenRouter API streaming client hook for the personalized AI meal planner.

### Phase 4: Delivery Status Tracking & Polish (30–48 hrs)
- [ ] Create Chef status update UI (tap-buttons to flip active orders from Preparing through Delivered, with manual Rider Name/Phone input modal when transitioning to Out for Delivery).
- [ ] Build Customer Stepper UI (instantly synced with order status via Supabase Realtime subscriptions, displaying the assigned rider's contact details).
- [ ] Integrate mock WhatsApp notify alerts for order handoffs (sending rider details on dispatch).
- [ ] Optimize mobile viewport elements.
- [ ] Implement landing page header and demo script assets.

## Open Questions

- *None at this stage.*

## Architecture Decisions

- **Status-based tracking**: Swapped complex GPS rider map integrations with a manual, status-stepper interface using Supabase Realtime for instant customer notifications, which aligns closer with Pakistani local-delivery realities.
- **Manual Rider Assignment**: Removed platform rider network and dedicated driver apps. Chefs arrange their own external delivery services (Bykea, Yango, Indrive, private riders) and manually key in the rider's name and phone number in the dashboard. These details are shared via Supabase Realtime to the customer tracker screen.
