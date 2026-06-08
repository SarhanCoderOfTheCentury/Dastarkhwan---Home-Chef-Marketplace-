# Feature Spec 17: WhatsApp Notifications Simulation

We need to implement a simulated notification system mimicking WhatsApp delivery messages sent to customers, triggered during status transitions.

## Design

### Simulated WhatsApp Notification Banner
- Displays a slide-down banner at the top of the browser screen styled like a WhatsApp push notification:
  - Header: `WhatsApp · DastarKhwan`
  - Body: *"Your lunch order from Chef Sana is out for delivery with Rider Bilal (+92 300 1234567)! 🛵"*
- Includes a close action button and a tap action that deep links to the tracker `/track/:order_id`.

## Implementation Instructions

1. **Trigger Hooks (`src/hooks/useNotifications.ts`)**:
   - Create a global hook listening to orders changes or subscription notifications.
   - When an order transitions to `out_for_delivery` or `delivered` (or when a customer subscribes):
     - Trigger the notification dispatcher.
     - Play a soft push-notification chime audio indicator.
     - Slide down the custom notification banner. Dismiss after 8 seconds.

2. **Supabase Edge Function / Backend Mocking**:
   - Write a function `dispatchSimulatedWhatsApp` that performs a mock call.
   - For demo validation, print JSON payloads sent to developer terminal logs to verify delivery payload formats (e.g. Twilio API syntax).

## Check When Done
- [ ] Notifications banner triggers only on appropriate status flips.
- [ ] Chime audio plays without causing layout blocking.
- [ ] Notification message accurately incorporates database rider details and chef names.
- [ ] Tapping the alert successfully redirects users to target tracking screen.
