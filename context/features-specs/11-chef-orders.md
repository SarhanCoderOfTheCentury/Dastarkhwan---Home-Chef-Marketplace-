# Feature Spec 11: Chef Orders Board

We need to implement the operational chef control center dashboard (`/chef/dashboard`) that lists today's active delivery roster, displays subscription slots, and hosts status-advancing trigger controls.

## Design

- **Status Headers**: Displays today's order metrics grouped in cards: `Preparing`, `Ready`, `Dispatched`, and `Delivered`.
- **Order Cards List**:
  - Each card represents an active order containing: Customer Name, Delivery Address, Time Slot (Lunch/Dinner), selected Menu Items, and special delivery notes.
  - **Action Button**: Touch-friendly button (minimum `48px x 48px`) indicating the next state transition, surrounded by a subtle pulsing animation:
    - If status is `preparing`: Button reads `[ Mark Packed & Ready ]` (advances to `ready`).
    - If status is `ready`: Button reads `[ Dispatch & Assign Rider ]` (opens the Rider assignment dialog).
    - If status is `out_for_delivery`: Button reads `[ Mark Delivered ]` (advances to `delivered`).

## Implementation Instructions

1. **Dashboard Page (`src/app/chef/Dashboard.tsx`)**:
   - Query all orders scheduled for today where `chef_id` matches the active session.
   - Set up standard polling or a Supabase Realtime channel to capture incoming orders instantly.

2. **Status Transition Logic**:
   - Clicking transition buttons fires update requests to the `orders` table.
   - Enforce incremental status transitions: `preparing` -> `ready` -> `out_for_delivery` -> `delivered`. Prevent regression or skipping steps.
   - Update `updated_at` timestamps on each change to track dispatch durations.

## Check When Done
- [ ] Active order counts update immediately on status changes.
- [ ] Action buttons correctly change labels based on current order states.
- [ ] Direct database mutations violating order state constraints are blocked.
- [ ] Mobile drawer menu toggles dashboard views cleanly.
