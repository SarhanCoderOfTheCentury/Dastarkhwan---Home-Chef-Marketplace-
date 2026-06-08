# Progress Tracker: DastarKhwan

Update this file after every meaningful implementation change.

## Current Phase

- **Phase 1: Foundation** (Auth, DB schema, base UI, and seed data)

## Current Goal

- Scaffold project foundation, configure PostgreSQL schemas with RLS in Supabase, set up email/OTP authentication, and seed Karachi chef listings.

## Completed

- **Project Scaffolding**: Setup context files (`project-overview.md`, `architecture.md`, `ui-context.md`, `code-standards.md`, `ai-workflow-rules.md`, `progress-tracker.md`) and root `CLAUDE.md`.
- **Build Plan Refinement**: Replaced mock GPS/Leaflet tracking maps with status-based tracking and updated the pitch guidelines.

## In Progress

- Initial environment structure setup.

## Next Up

### Phase 1: Foundation (0–6 hrs)
- [ ] Initialize Vite + React + Tailwind CSS project structure.
- [ ] Set up Supabase DB schemas (`profiles`, `chefs`, `menus`, `subscriptions`, `orders`, `reviews`) with RLS.
- [ ] Configure phone/email OTP signup/login client handlers.
- [ ] Seed Karachi home cooks data (Clifton, DHA, Gulshan) with custom menu records.

### Phase 2: Customer Core (6–16 hrs)
- [ ] Build Hyper-local Discovery Screen (chef card listings with area search and rating metrics).
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
