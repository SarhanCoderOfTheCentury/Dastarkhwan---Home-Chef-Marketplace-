# Screen Blueprints & UI Wireframes: DastarKhwan

This document details the interface layouts, form fields, action states, and data integrations for each screen in the DastarKhwan application. Layouts are designed mobile-first (375px targets) with adaptive grids for tablet/desktop configurations.

---

## 1. Register & Login Screen (OTP)

* **Route**: `/auth/login`
* **Access**: Public / Unauthenticated
* **Role**: Landing & Identification

### ASCII Wireframe
```
+---------------------------------------+
|              DASTARKHWAN              |
|          - Kitchen Economy -          |
|                                       |
|  Welcome! Enter phone number to get   |
|  started with authentic home meals.   |
|                                       |
|  Phone Number:                        |
|  [ +92 | 300 1234567               ]  |
|                                       |
|  [ Send OTP Code ]                    |
|                                       |
|  OTP Code: (Visible after Send click) |
|  [ * * * * * * ]                      |
|                                       |
|  [ Verify & Continue ]                |
+---------------------------------------+
```

### UI Elements & Behavior
- **Phone Input**: Prefixed with `+92` country code. Validates Pakistani mobile formats (e.g. `3xx xxxxxxx`).
- **Send OTP Button**: Triggers Supabase Auth `signInWithOtp()`. Displays a 60-second cooldown countdown helper.
- **OTP Input**: Enabled dynamically. Performs automatic submission once 6 digits are typed.
- **Error Banner**: Red alert block at bottom if code is invalid or rate-limited.

---

## 2. Onboarding & Role Selection Screen

* **Route**: `/onboarding/role`
* **Access**: Authenticated (Profiles with empty role)
* **Role**: Onboarding

### ASCII Wireframe
```
+---------------------------------------+
| < Back             Step 1 of 2        |
|                                       |
| Choose Your Role                      |
|                                       |
| +-----------------------------------+ |
| | ( ) I want to Order Food          | |
| |     Find local kitchens & subscribe| |
| +-----------------------------------+ |
|                                       |
| +-----------------------------------+ |
| | ( ) I want to Cook & Earn         | |
| |     Set up your kitchen storefront| |
| +-----------------------------------+ |
|                                       |
| [ Next ]                              |
+---------------------------------------+
```

### UI Elements & Behavior
- **Role Cards**: Clickable boxes. Selecting a card updates local component state and changes border style to `--color-primary`.
- **Next Button**:
  - If Customer selected: Submits `role = 'customer'` to profile and redirects to `/discovery`.
  - If Chef selected: Submits `role = 'chef'` to profile and redirects to `/onboarding/chef-wizard`.

---

## 3. Customer Discovery Screen (Feed)

* **Route**: `/discovery`
* **Access**: Customer Role
* **Role**: Core Search & Feed

### ASCII Wireframe
```
+---------------------------------------+
|  DASTARKHWAN              [Profile Icon]
|  Delivering to: DHA Phase 6  (Edit)   |
|                                       |
|  [ Search chefs, dishes, areas... (Q) ]|
|                                       |
|  Diet Filters:                        |
|  ( Low-Carb ) [ Keto ] ( Diab )       |
|                                       |
|  Nearby Kitchens (within 3km):        |
|  +---------------------------------+  |
|  | +-----------------------------+ |  |
|  | | [Kitchen Hero Photo]        | |  |
|  | +-----------------------------+ |  |
|  |   Chef Sana's Kitchen  ⭐ 4.8    |  |
|  |   DHA Ph 6 · 1.2 km · PKR 350   |  |
|  |   Signature: Biryani & Daal     |  |
|  +---------------------------------+  |
+---------------------------------------+
| [Discover] [Subscriptions] [AI Planner] |
+---------------------------------------+
```

### UI Elements & Behavior
- **Location Selector**: Toggles coordinate lookup via Leaflet geo-radius queries. Defaults to user's saved location.
- **Dietary Filter Bubbles**: Horizontal scrollable list. Tapping flags toggles active states (styled with sage green `--color-secondary`).
- **Chef Cards Grid**: Displays hero photo, title, proximity (calculated via coordinates), rating average, and starting price tag.
- **Bottom Navigation**: Tabs for Discover (Feed), My Subscriptions, and AI Planner.

---

## 4. Chef Profile Detail Page

* **Route**: `/chef/:id`
* **Access**: Customer Role
* **Role**: Menu Catalog & Reviews

### ASCII Wireframe
```
+---------------------------------------+
| < Back             [Share] [Fav]      |
|  +---------------------------------+  |
|  | [Kitchen Photo Backdrop]        |  |
|  +---------------------------------+  |
|  Chef Sana's Kitchen      [Verified Badge]
|  ⭐ 4.8 (120 reviews) · DHA Phase 6    |
|                                       |
|  [ transparency feed: Watch Prep (>]  |
|                                       |
|  Tabs: ( Menu )  [ Reviews ]  ( Bio ) |
|  +---------------------------------+  |
|  | Weekly Special Chicken Karahi    |  |
|  | PKR 450                         |  |
|  | [ + Add to Subscription ]       |  |
|  +---------------------------------+  |
|                                       |
|  [ Choose Plan & Checkout ]           |
+---------------------------------------+
```

### UI Elements & Behavior
- **Transparency Reel Button**: Plays a custom backdrop video element showcasing preparation clips.
- **Interactive Tabs**: Switches display content between items list, review comments, and bio cards.
- **Item Add Buttons**: Clicking adds items to local cart store (`useCartStore`) with animated count badges.
- **Checkout CTA**: Sticky button displaying active selection summary ("2 items · PKR 900"). Opens subscription wizard.

---

## 5. Subscription Checkout Wizard (Modal)

* **Route**: Overlays `/chef/:id`
* **Access**: Customer Role
* **Role**: Subscription Setup & Checkout

### ASCII Wireframe
```
+---------------------------------------+
| X Customize Your Plan                 |
|                                       |
| 1. Select Plan Type:                  |
|    ( ) 5-Days (Mon-Fri)               |
|    ( ) 7-Days (Mon-Sun)               |
|                                       |
| 2. Select Delivery Slot:              |
|    [ Lunch (12:30 PM - 2:00 PM)     v ]|
|                                       |
| 3. Delivery Address:                  |
|    [ Street 5, Phase 6, DHA...        ]|
|                                       |
| 4. Payment Method:                    |
|    ( ) Easypaisa Mobile Wallet        |
|    ( ) Cash on Delivery (Weekly Billing) |
|                                       |
| Total Weekly: PKR 2,250               |
| [ Confirm Subscription ]              |
+---------------------------------------+
```

### UI Elements & Behavior
- **Plan Selectors**: Configures `plan_type` field.
- **Delivery Address Field**: Autocompletes via Google Maps/Leaflet autocomplete.
- **Confirm Subscription**: Updates Supabase database tables (`subscriptions`, `orders`) and redirects to order status tracking.

---

## 6. Customer Active Subscriptions Dashboard

* **Route**: `/subscriptions`
* **Access**: Customer Role
* **Role**: Subscriptions Management

### ASCII Wireframe
```
+---------------------------------------+
|  My Subscriptions                     |
|                                       |
|  Active Plan: Chef Sana's Kitchen     |
|  Schedule: Mon - Fri · Lunch          |
|                                       |
|  Upcoming Deliveries (Next 7 days):   |
|  [Mon]   [Tue]  *[Wed]*  [Thu]   [Fri]  |
|  Active  Active  Paused  Active  Active |
|                                       |
|  Selected Day Details (Wednesday):    |
|  Status: Paused (No charge)           |
|  [ Resume Wednesday Delivery ]        |
|                                       |
|  [ Pause Entire Subscription ]        |
+---------------------------------------+
| [Discover] [Subscriptions] [AI Planner] |
+---------------------------------------+
```

### UI Elements & Behavior
- **Calendar Carousel**: Horizontal date selectors. Tapping a day displays that day's scheduled menu and status.
- **Skip/Pause Button**: Toggles single-day order state in `orders` (setting status to `'paused'`). Updates database in real time.
- **Pause Entire Subscription**: Toggles `subscriptions.status = 'paused'`, blocking daily order creations.

---

## 7. Customer Realtime Order Tracker

* **Route**: `/track/:order_id`
* **Access**: Customer Role
* **Role**: Handoff Tracking

### ASCII Wireframe
```
+---------------------------------------+
|  Daily Meal Tracking                  |
|  Chef Sana's Kitchen · Today's Lunch  |
|                                       |
|  Status: Out for Delivery 🛵          |
|  Updated at: 01:15 PM                 |
|                                       |
|  Rider Details:                       |
|  Name: Bilal                          |
|  Phone: +92 300 1234567               |
|                                       |
|  Status Stepper:                      |
|  (x) Preparing (09:30 AM)             |
|  (x) Packed & Ready (12:45 PM)        |
|  (=) Out for Delivery (01:15 PM)      |
|  ( ) Delivered (Pending)              |
|                                       |
|  Message:                             |
|  "Rider Bilal is on his way! Call or  |
|  WhatsApp him at +92 300 1234567."    |
+---------------------------------------+
| [Discover] [Subscriptions] [AI Planner] |
+---------------------------------------+
```

### UI Elements & Behavior
- **Rider Contact Box**: Displays the name and phone number of the external rider manually entered by the chef. Visible only when the order status is "Out for Delivery" or "Delivered".
- **WebSocket listener**: Listens on `orders.status`, `rider_name`, and `rider_phone` for `order_id`. Stepper nodes animate and contact info updates immediately as updates are made on the backend.
- **Dynamic Messaging box**: Text updates according to active node (e.g. Preparing: "Chef Sana is cooking your daal maash!", Out for Delivery: "Rider Bilal is on his way!", Delivered: "Enjoy your meal! Let us know how it tasted.").

---

## 8. Chef Orders Board (Dashboard)

* **Route**: `/chef/dashboard`
* **Access**: Chef Role
* **Role**: Operational Status Controller

### ASCII Wireframe
```
+---------------------------------------+
|  CHEF SANA'S PORTAL                   |
|  Status: Online [v]                   |
|                                       |
|  Active Deliveries Today (5):         |
|  +---------------------------------+  |
|  | Order #1084 - DHA Phase 6        |  |
|  | Lunch Slot · Chicken Biryani     |  |
|  | Status: Preparing                |  |
|  |                                 |  |
|  | [ Tap: Mark Packed & Ready ]    |  |
|  +---------------------------------+  |
|  +---------------------------------+  |
|  | Order #1083 - Gulshan            |  |
|  | Lunch Slot · Sabzi & Roti        |  |
|  | Status: Packed & Ready           |  |
|  |                                 |  |
|  | [ Tap: Dispatch & Assign Rider ]|  |
|  +---------------------------------+  |
|  +---------------------------------+  |
|  | Order #1082 - Clifton            |  |
|  | Lunch Slot · Daal Chawal         |  |
|  | Status: Out for Delivery         |  |
|  | Rider: Bilal (+92 300 1234567)   |  |
|  |                                 |  |
|  | [ Tap: Mark Delivered ]         |  |
|  +---------------------------------+  |
+---------------------------------------+
| [Orders]  [Store Setup]  [Earnings]   |
+---------------------------------------+

+---------------------------------------+
| Modal: Assign External Rider          |
| Enter details for Bykea/Yango/Private |
|                                       |
| Rider Name:                           |
| [ Bilal                            ]  |
|                                       |
| Rider Phone:                          |
| [ +92 | 300 1234567                ]  |
|                                       |
| [ Confirm Dispatch ]  [ Cancel ]      |
+---------------------------------------+
```

### UI Elements & Behavior
- **Status Toggle**: Toggles chef availability profile state.
- **Active Step Action Button**: Prominently displays target transition step.
  - Clicking "Mark Packed & Ready" transitions status to `ready`.
  - Clicking "Dispatch & Assign Rider" opens the **Assign External Rider Modal**.
  - Clicking "Mark Delivered" transitions status to `delivered`.
- **Assign External Rider Modal**: Form requesting Rider Name and Phone Number. Clicking "Confirm Dispatch" updates Supabase `orders.status` to `out_for_delivery`, sets `rider_name` and `rider_phone` values, and triggers the Twilio WhatsApp notification.
- **Manual Status Controller**: All order transitions are chef-facing and manually initiated since no platform driver app or driver network exists.

---

## 9. Chef Storefront Setup Wizard

* **Route**: `/onboarding/chef-wizard`
* **Access**: Chef Role (Uncompleted Profile)
* **Role**: Store onboarding

### ASCII Wireframe
```
+---------------------------------------+
| Store Setup        Step 3 of 4        |
|                                       |
| 1. Kitchen Info                       |
| 2. Upload Kitchen Photos              |
| 3. Menu Setup                         |
|                                       |
| Add Menu Item:                        |
| Name:  [ Chicken Karahi             ] |
| Price: [ PKR 450                    ] |
| Tags:  [x] Low-carb [ ] Keto          | |
|                                       |
| [ + Add Item to Catalog ]             |
|                                       |
| [ Complete Onboarding ]               |
+---------------------------------------+
```

### UI Elements & Behavior
- **Item Configurator**: Form fields to define name, description, pricing, and dietary tags.
- **Kitchen Photo Upload**: File dropzone uploading verified assets directly to Supabase storage.
- **Complete Onboarding**: Sets profile verification checklist state to true and forwards user to Chef Dashboard.

---

## 10. Chef Earnings & Analytics Screen

* **Route**: `/chef/earnings`
* **Access**: Chef Role
* **Role**: Financial Overview

### ASCII Wireframe
```
+---------------------------------------+
|  Earnings Overview                    |
|                                       |
|  This Week: PKR 14,800                |
|  Platform Commission (15%): PKR 2,220 |
|  Net Payout: PKR 12,580               |
|                                       |
|  Weekly Performance Chart:            |
|  +---------------------------------+  |
|  | [ Recharts Bar Graph:           |  |
|  |   Mon: 2.2k, Tue: 3k, Wed: 4.1k ]|  |
|  +---------------------------------+  |
|                                       |
|  [ Request Payout (Easypaisa) ]       |
+---------------------------------------+
| [Orders]  [Store Setup]  [Earnings]   |
+---------------------------------------+
```

### UI Elements & Behavior
- **Recharts Canvas**: Renders daily revenue performance.
- **Request Payout CTA**: Sends payout requests to administrative ledger for mock clearance.

---

## 11. AI Meal Planner Chat Assistant

* **Route**: `/planner`
* **Access**: Customer Role
* **Role**: Conversational Matchmaking

### ASCII Wireframe
```
+---------------------------------------+
|  AI MEAL ASSISTANT                    |
|  Powered by OpenRouter               |
|                                       |
|  Chat:                                |
|  [Planner]: Hello! Input your dietary |
|             goals and I'll find nearby|
|             home kitchens for you.    |
|                                       |
|  [User]: Looking for low-carb meals   |
|                                       |
|  [Planner]: Here are 2 recommended    |
|             kitchens matching:        |
|             1. Chef Sana's Daal Mash  |
|             [ View Chef Sana ]        |
|                                       |
|  Message Box:                         |
|  [ Type message here...          ] (>) |
+---------------------------------------+
| [Discover] [Subscriptions] [AI Planner] |
+---------------------------------------+
```

### UI Elements & Behavior
- **Message Send Button**: Appends query, locks prompt box, and starts streaming markdown output from the OpenRouter integration hook.
- **Embedded Route Cards**: Action buttons generated inside the stream that let users jump directly to matching Chef Profiles.
