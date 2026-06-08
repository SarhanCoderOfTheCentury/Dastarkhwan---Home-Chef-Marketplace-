# Feature Spec 15: Rider Assignment & Dispatch

We need to implement the Rider Assignment modal that appears on the Chef dashboard when an order transitions to "Out for Delivery", capturing external delivery details.

## Design

### Assign External Rider Dialog
- Opens overlay when clicking `[ Dispatch & Assign Rider ]` on active orders.
- Title: "Assign External Rider"
- Description: "Enter details for Bykea, Yango, Indrive, or your private delivery rider."
- Form Fields:
  - **Rider Name**: Text input.
  - **Rider Phone**: Phone input with `+92` country prefix.
- CTA: terracotta button `[ Confirm Dispatch ]` and outline button `[ Cancel ]`.

## Implementation Instructions

1. **Rider Assignment Modal (`src/components/features/AssignRiderModal.tsx`)**:
   - Manage state variables for `riderName` and `riderPhone`.
   - Validate that name has at least 3 characters and phone matches Pakistani mobile layout specifications.

2. **State Dispatch Logic**:
   - Clicking "Confirm Dispatch":
     - Update the target row in the `orders` table:
       - Set `status = 'out_for_delivery'`.
       - Set `rider_name = riderName`.
       - Set `rider_phone = riderPhone`.
       - Set `updated_at = new Date().toISOString()`.
     - Trigger success notification toast.
     - Close modal.

## Check When Done
- [ ] Modal displays correctly on mobile screens and handles backdrop dismissals.
- [ ] Phone validation blocks dispatch if formatted incorrectly.
- [ ] Database updates correctly saving rider details.
- [ ] Active orders move to "Out for Delivery" category on dashboard.
