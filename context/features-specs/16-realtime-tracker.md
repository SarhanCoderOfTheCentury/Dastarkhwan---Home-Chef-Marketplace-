# Feature Spec 16: Real-time Order Tracker

We need to implement the customer-facing tracker view (`/track/:order_id`) containing a status stepper synchronized with the database in real-time.

## Design

- **Order Header**: Displays chef kitchen details, order name (e.g. `Biryani & Roti`), time slot, and status summary text.
- **Rider Contact Panel**:
  - Displays assigned rider details (Name and Phone).
  - Tapping name or phone triggers call/WhatsApp actions.
  - This panel remains hidden until order status becomes `out_for_delivery` or `delivered`.
- **Status Stepper Steppes**:
  - **Node 1: Preparing** (icon: `ChefHat` or `CookingPot` / Status description: "Chef Sana is cooking your meal!")
  - **Node 2: Packed & Ready** (icon: `Package` / Status description: "Your lunch is packed and warm!")
  - **Node 3: Out for Delivery** (icon: `Motorcycle` / Status description: "Rider Bilal is on the way!")
  - **Node 4: Delivered** (icon: `CheckCircle2` / Status description: "Enjoy your food!")

## Implementation Instructions

1. **Tracker View (`src/app/customer/OrderTracker.tsx`)**:
   - Query target order details by `:order_id` on load.
   - Subscribe to the Supabase Realtime channel matching the target order ID:
     - Listen for `UPDATE` events on table `orders` filter `id = eq.[order_id]`.
     - On payload reception, update component states immediately.

2. **Micro-transitions**:
   - Add CSS transitions or Framer Motion properties to animate node color expansions, progress bar lengths, and rider details panel slides.

## Check When Done
- [ ] Stepper correctly reflects database status.
- [ ] Updating order status on the chef dashboard instantly propagates and animates the customer tracker UI.
- [ ] Rider panel reveals name and phone details dynamically only upon dispatch.
- [ ] Clickable links trigger mobile phone callers.
