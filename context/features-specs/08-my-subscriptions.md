# Feature Spec 08: Customer Subscriptions Dashboard

We need to implement the customer-facing subscriptions manager page (`/subscriptions`), featuring active plan details, a weekly calendar scheduler, and pause/skip toggles.

## Design

- **Active Plans List**: Displays current subscriptions showing chef name, kitchen icon, plan schedule (e.g. `Mon-Fri Lunch`), and status badge.
- **Calendar Carousel**:
  - Displays a horizontal slider of the next 7 days (e.g. `[Mon] [Tue] [Wed] [Thu] [Fri] [Sat] [Sun]`).
  - Below each day icon, shows status flags: `Active`, `Paused`, or `Delivered`.
  - Tapping a day switches detail panels below it.
- **Day Controls**:
  - Displays scheduled food item descriptions for that day.
  - Includes a primary toggle button: `[ Pause Delivery / Resume Delivery ]`.

## Implementation Instructions

1. **Dashboard View (`src/app/customer/Subscriptions.tsx`)**:
   - Query all subscriptions linked to the authenticated customer from the `subscriptions` table.
   - For the selected subscription, query generated rows from the `orders` table corresponding to the active week.
   - If no orders are found for a scheduled active day, auto-generate placeholder rows to display.

2. **Pause/Skip Logic**:
   - When a customer clicks "Pause Delivery" for a specific date:
     - Update that day's row in the `orders` table setting `status = 'paused'`.
     - Display a success toast: *"Wednesday delivery skipped successfully. You will not be charged."*
   - When "Pause Entire Subscription" is clicked:
     - Update the `subscriptions` table row setting `status = 'paused'`.
     - Update all future orders associated with this subscription that are currently under status `'preparing'` to `'paused'`.

## Check When Done
- [ ] List accurately represents database subscription records.
- [ ] Toggling single-day statuses updates the PostgreSQL `orders` table in real-time.
- [ ] Paused days are visually greyed out on the calendar carousel.
- [ ] Resume action shifts status back to `preparing` and displays active meal details.
