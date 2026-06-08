# Feature Spec 09: Catering Requests

We need to implement the catering request dialog form that allows customers to book home chefs for small parties, dawats, or corporate lunches.

## Design

### Catering Dialog
- Triggered by a primary button `[ Book Chef for Event ]` on the Chef Details page.
- Fields:
  - **Guest Count**: Numerical input or selector slider (range: 10 to 100 people).
  - **Event Date & Time**: Date picker checking 48 hours minimum advance notice.
  - **Menu Selections**: Checklist of chef menu items.
  - **Special Requests**: Text area (e.g., "spicy", "no peanuts", "need buffet warming dishes").
- **Pricing Estimate Widget**: Computes dynamic subtotal estimates based on: `(Base Menu Price * Guest Count)`.

## Implementation Instructions

1. **Database Schema Addition**:
   - Create a table `catering_requests` if it does not exist, or map requests to a specialized category within the `orders` structure:
     - `id`: uuid, primary key
     - `customer_id`: uuid (references profiles)
     - `chef_id`: uuid (references chefs)
     - `event_date`: timestamptz
     - `guest_count`: integer
     - `menu_items`: jsonb (list of selected item IDs and quantities)
     - `special_notes`: text
     - `estimated_price`: integer
     - `status`: text, default `'pending_quote'` (check: `'pending_quote'`, `'quoted'`, `'confirmed'`, `'declined'`)

2. **Booking Wizard Component (`src/components/features/CateringRequestModal.tsx`)**:
   - Build form inputs. Add clients-side checks ensuring all required fields are filled.
   - On submission:
     - Write the booking row to `catering_requests`.
     - Trigger an in-app toast notifying the user that the chef has been pinged.
     - Close modal and redirect to a dashboard tracker view.

## Check When Done
- [ ] Advance notice validation prevents scheduling events for the same day.
- [ ] Estimated price widget changes totals as guests or menu selections modify.
- [ ] Submissions register correctly in the database and display in the Chef's catering dashboard inbox.
- [ ] User receives an alert notification upon successful transmittal.
