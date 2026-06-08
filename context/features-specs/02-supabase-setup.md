# Feature Spec 02: Supabase Setup & Seeding

We need to configure the database schema in Supabase (PostgreSQL), establish type-safe client initializations, and seed mock data for Karachi's home chef listings.

## Database Schema (PostgreSQL)

Set up the following tables with relations:

### 1. `profiles`
- `id`: uuid, primary key (references `auth.users.id` cascade)
- `role`: text (enum check: `'customer'`, `'chef'`, or null)
- `name`: text
- `phone`: text (nullable)
- `avatar_url`: text (nullable)
- `created_at`: timestamptz

### 2. `chefs`
- `id`: uuid, primary key (references `profiles.id` cascade)
- `kitchen_name`: text
- `bio`: text
- `is_verified`: boolean, default `false`
- `trust_score`: numeric, default `5.0`
- `latitude`: numeric (e.g. Clifton coordinates)
- `longitude`: numeric
- `radius_limit`: numeric, default `3.0` (in km)
- `operating_days`: text[] (e.g. `['Mon', 'Tue', 'Wed', 'Thu', 'Fri']`)
- `updated_at`: timestamptz

### 3. `menus`
- `id`: uuid, primary key, default `gen_random_uuid()`
- `chef_id`: uuid, foreign key (references `chefs.id` cascade)
- `name`: text
- `description`: text
- `price`: integer (in PKR)
- `dietary_tags`: text[] (e.g. `['low-carb', 'keto', 'diabetic-friendly']`)
- `image_url`: text (nullable)
- `created_at`: timestamptz

### 4. `subscriptions`
- `id`: uuid, primary key, default `gen_random_uuid()`
- `customer_id`: uuid, foreign key (references `profiles.id` cascade)
- `chef_id`: uuid, foreign key (references `chefs.id` cascade)
- `plan_type`: text (check: `'5-day'` or `'7-day'`)
- `time_slot`: text (check: `'lunch'` or `'dinner'`)
- `delivery_address`: text
- `status`: text, default `'active'` (check: `'active'`, `'paused'`, or `'cancelled'`)
- `created_at`: timestamptz

### 5. `orders`
- `id`: uuid, primary key, default `gen_random_uuid()`
- `customer_id`: uuid, foreign key (references `profiles.id` cascade)
- `chef_id`: uuid, foreign key (references `chefs.id` cascade)
- `subscription_id`: uuid, foreign key (references `subscriptions.id` cascade, nullable)
- `delivery_date`: date
- `status`: text, default `'preparing'` (check: `'preparing'`, `'ready'`, `'out_for_delivery'`, `'delivered'`, `'paused'`)
- `rider_name`: text (nullable)
- `rider_phone`: text (nullable)
- `delivery_notes`: text (nullable)
- `updated_at`: timestamptz

### 6. `reviews`
- `id`: uuid, primary key, default `gen_random_uuid()`
- `customer_id`: uuid, foreign key (references `profiles.id` cascade)
- `chef_id`: uuid, foreign key (references `chefs.id` cascade)
- `rating`: integer (check: 1 to 5)
- `comment`: text (nullable)
- `created_at`: timestamptz

## Row-Level Security (RLS) Rules
- **Profiles**: Anyone can read any profile. Owners can update their own profile.
- **Chefs/Menus**: Anyone can read chef details and menus. Verified chefs can write their own details.
- **Subscriptions/Orders**: Customers can read and create their own records. Chefs can read and update orders/subscriptions linked to their `chef_id`.
- **Reviews**: Anyone can read reviews. Customers can insert reviews for chefs they have subscribed to.

## Implementation Instructions

1. **Client Setup**:
   - Install `@supabase/supabase-js`.
   - Create `src/lib/supabaseClient.ts` as a singleton client wrapper.
   - Configure env load checks for `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

2. **Seeding Script**:
   - Create a seeding script `src/services/seedMockData.ts` (or database seed function) that populates 6 distinct cooks in Karachi hubs (DHA Phase 6, Clifton, Gulshan-e-Iqbal) with realistic traditional menus (Biryani, Karahi, Daal Maash, Roti, Sabzi) and reviews.
   - Chefs must be pre-loaded with geolocations (latitude/longitude) to test Leaflet.js hyper-local lookup calculations.

## Check When Done
- [ ] Supabase client correctly handles connection with fallback logs for missing env variables.
- [ ] Database structures are created in PostgreSQL with proper foreign key cascades.
- [ ] RLS policies restrict chefs from viewing other chefs' earnings and customers from altering order states.
- [ ] Karachi home chef mock database records successfully populate with diet tags.
