# Architecture: DastarKhwan

This document outlines the codebase organization, data storage, authentication structure, and the software constraints that must be preserved.

## Technology Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | Fast dev server, component-based Single Page App architecture. |
| **Styling** | Tailwind CSS | Utility-first responsive design suitable for mobile web. |
| **State Management** | Zustand | Lightweight client-side state management (cart, active session, UI state). |
| **Maps & Discovery** | Leaflet.js | Open-source mapping API to render static chef/kitchen locations. |
| **Charts** | Recharts | Renders weekly chef earnings and business analytics. |
| **Backend & DB** | Supabase | Postgres Database, Auth, Storage, Edge Functions, and Realtime sync. |
| **AI Integration** | OpenRouter API | Generates personalized streaming dietary recommendations (e.g., via Claude 3.5 Sonnet or other models). |
| **Comms API** | Twilio WhatsApp API | Sends simulated or real status-flip notifications to customer phones. |
| **Deployment** | Vercel | Production hosting and automated preview deployments. |

## System Boundaries & Directory Layout

The workspace follows the React/Vite standard structure:

```
src/
├── app/                  # Application Shell & Router definition
├── components/           # UI Elements
│   ├── ui/               # Base styled components (buttons, input, modal)
│   ├── features/         # Feature-specific blocks (discovery grid, tracker stepper)
│   └── layouts/          # Layout wrappers (Sidebar, MobileNav, ChefHeader)
├── lib/                  # Initialization (Supabase Client, OpenRouter API configs)
├── hooks/                # Reusable React hooks (useAuth, useRealtimeOrder)
├── services/             # API services and functions (Twilio notifications, AI stream)
├── types/                # TypeScript type definitions (schema.ts, ui.d.ts)
├── constants/            # Application constants and static options
├── contexts/             # React context providers
├── styles/               # Global styles, variables, index.css
public/                   # Static mock assets and images
docs/                     # Project build plans and design specs
context/                  # AI context files (including this guide)
```

## Storage & Database Schema

DastarKhwan relies on **Supabase** for database, file storage, and server-side state.

### 1. Database Tables (PostgreSQL)
- **`profiles`**: User metadata, names, phone numbers, and account roles (`'customer'` or `'chef'`).
- **`chefs`**: Stores kitchen details, verified badges, trust score metrics, geo-coordinates (latitude/longitude for hyper-local lookup), and radius limits.
- **`menus`**: Meal items linked to chefs, containing pricing, description, allergens, and dietary tags.
- **`subscriptions`**: Customer meal subscriptions detailing active plans (5-day or 7-day), selected delivery time-slots, and active/paused state.
- **`orders`**: Active daily deliveries. Key fields: `id`, `customer_id`, `chef_id`, `status` (enum: `'preparing'`, `'ready'`, `'out_for_delivery'`, `'delivered'`), `updated_at`, `delivery_notes`, `rider_name` (text, nullable), and `rider_phone` (text, nullable).
- **`reviews`**: Ratings and comments left by customers, used to compute the chef's trust score.

### 2. File Storage
- **`kitchen-photos`**: Verified images of the home chefs' kitchens.
- **`transparency-clips`**: Short 10-15 second daily videos posted by chefs detailing cooking hygiene.

### 3. Local Cache / State
- Cart items and session tokens reside in Zustand local state, persisted in localStorage where appropriate.

## Auth & Access Model

- **Authentication**: Handled via Supabase Auth (OTP preferred).
- **Row-Level Security (RLS)**: Enforced on all tables.
  - Customers can read all `chefs` and `menus`, but can only read/insert their own `subscriptions` and `orders`.
  - Chefs can read/write their own `chefs` and `menus` details, and can only read/update `orders` / `subscriptions` that are assigned to their `chef_id`.
  - Admin/System edge functions can bypass RLS for global operations.

## AI & Background Tasks

1. **AI Meal Planner**: Takes user query parameters and issues a streaming request to the OpenRouter API. Recommendations are matched against database chef menu tags and returned in real-time.
2. **WhatsApp Notification Engine**: Fired via a Postgres Trigger/Edge Function whenever an `orders.status` value is updated. Triggers Twilio API to notify the customer.

## Codebase Invariants (Strict Rules)

> [!IMPORTANT]
> The following architectural rules must never be broken:
> 
> 1. **No Geolocation Tracking**: The app must never run background geolocation queries or map-tracking code for riders. Delivery updates must remain strictly status-stepper manual triggers by the chef, utilizing manually entered external rider details (name and phone).
> 2. **Role Restrictions**: Do not allow operations on chef tools (earnings, menu edits) unless the active profile is verified as `role = 'chef'`.
> 3. **Incremental Status Transitions**: Orders must only move forward in the order chain: `preparing` -> `ready` -> `out_for_delivery` -> `delivered`. Direct jumping or regression (e.g. from `delivered` back to `ready`) is forbidden.
> 4. **Strict RLS Verification**: Any database insert/update must include customer/chef validation matching the authenticated user ID.
