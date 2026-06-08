# Feature Spec 06: Chef Profile Detail Page

We need to implement the detailed chef profile view (`/chef/:id`), showcase hygiene transparency video reels, list the daily menu catalog, display neighbor reviews, and wire up cart store operations.

## Design

- **Hero Backdrop**: Large verified kitchen photo with a return back button, favorite toggle, and gradient shadow.
- **Transparency Reels**: A prominent badge button displaying: `📺 Watch Prep Reel`. Clicking it opens a vertical modal displaying a mock loop-video reel (mimicking a TikTok/Insta Story showing the chef chopping, cooking, or sanitizing the kitchen).
- **Tabs Nav**: Switcher selecting:
  - **Menu**: Grid of food item cards with pricing, description, allergens, and an "+ Add to Plan" action button.
  - **Reviews**: Scrollable list of neighborhood comments with star breakdowns.
  - **Bio**: Detailed story, list of ingredients sourced, and kitchen address.

## Implementation Instructions

1. **Zustand Cart Store (`src/hooks/useCartStore.ts`)**:
   - Manage the checkout cart state: `chefId`, list of selected `items`, total price, and wizard details.
   - Restrict users from adding items from different chefs simultaneously. If a user adds an item from a new chef, display a confirmation dialog: *"Clear your cart to order from this chef instead?"*.

2. **Chef Detail View (`src/app/customer/ChefDetail.tsx`)**:
   - Fetch chef and related profiles by `:id` parameter.
   - Fetch all menu items linked to the chef.
   - Render a vertical backdrop layout.
   - **Reels Player**: Implement a simple `<video>` element inside a dialog wrapper playing sample short clips. Include playback controls and sound toggles.
   - **Sticky Cart Banner**: A sticky bottom footer banner displaying: `🛒 [Count] meals selected · PKR [Total] · [Customize Plan & Checkout]`. This banner only appears if the cart is not empty.

## Check When Done
- [ ] Cart prevents mixing items from two different chefs.
- [ ] Video reel modal triggers playback cleanly with support for mobile touch-cancelling.
- [ ] Tab switcher transitions sections without reloading pages or resetting scrolling positions.
- [ ] Sticky cart banner updates total price immediately as items are added/removed.
