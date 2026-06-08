# Feature Spec 07: Subscription Checkout Wizard

We need to implement the overlay subscription wizard that configures plan durations, selects delivery slots, handles mock payment credentials, and writes active plans to the database.

## Design

### Checkout Modal Shell
The wizard walks through steps inside a slide-up bottom sheet (on mobile) or centered modal (on desktop):
1. **Configure Plan**:
   - Selector buttons for Plan Type: `5-Day Plan (Mon-Fri)` or `7-Day Plan (Mon-Sun)`.
   - Dropdown selection for Time Slot: `Lunch (12:30 PM - 2:00 PM)` or `Dinner (7:30 PM - 9:00 PM)`.
2. **Delivery Address**:
   - Visual input field for address details with a mini map thumbnail locator.
3. **Payment Option**:
   - Radio selectors for mobile wallets popular in Pakistan: `Easypaisa Wallet`, `JazzCash Wallet`, or `Cash on Delivery (Weekly Billing)`.
4. **Summary & Submit**:
   - Lists weekly pricing aggregates, service commissions, and a big terracotta `[ Confirm & Start Subscription ]` CTA.

## Implementation Instructions

1. **Wizard Controller (`src/components/features/CheckoutWizard.tsx`)**:
   - Manage wizard steps in local component state.
   - Address input must support static fallback strings or coordinates lookup.

2. **Database Transaction Flow**:
   - On clicking "Confirm & Start":
     - Insert a record into the `subscriptions` table containing `customer_id`, `chef_id`, `plan_type`, `time_slot`, `delivery_address`, and status `'active'`.
     - Generate tomorrow's active delivery order row in the `orders` table under status `'preparing'`.
     - Clear the local `useCartStore` cart state.
     - Redirect the customer to `/subscriptions`.

3. **Easypaisa Payment Mocking**:
   - Clicking "Easypaisa" opens a mock wallet entry frame asking for a 10-digit mobile number and PIN. Simulate validation delay and show payment confirmation toast.

## Check When Done
- [ ] Wallet input fields validate format checks (e.g. `03xx xxxxxxx`).
- [ ] Database correctly creates rows in both `subscriptions` and `orders` tables on completion.
- [ ] Cart store resets upon checkout completion.
- [ ] Users receive visual feedback (Confetti / Success dialog) before redirect triggers.
