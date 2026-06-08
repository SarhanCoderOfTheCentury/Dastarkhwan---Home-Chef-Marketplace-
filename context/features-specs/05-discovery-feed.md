# Feature Spec 05: Customer Discovery Feed

We need to implement the hyper-local chef discovery feed (`/discovery`), integrate Leaflet.js maps displaying kitchen coordinates, build dietary tag sliders, and layout chef listing cards with ratings.

## Design

- **Search Bar**: A sticky header input allowing search by kitchen name, cuisine specialties, or specific streets.
- **Dietary Filter slider**: A scrollable horizontal bar showing pills for `Low-carb`, `Keto`, `Diabetic-friendly`, `High-protein`, `Vegetarian`, and `Daily Special`. Selecting a pill applies a colored border (`--color-secondary` for fresh ingredients) and filters the feed.
- **Chef Grid Card**:
  - Top: High-quality kitchen photo backdrop with rating average overlay (`⭐ 4.8`) and verified badge.
  - Middle: Kitchen name, neighborhood name, geo-distance (e.g. `1.2 km away` computed client-side), and starting weekly package price.
  - Bottom: Pill tags showing cuisine specialties and operating days.

## Implementation Instructions

1. **Leaflet.js Map Integration (`src/components/features/DiscoveryMap.tsx`)**:
   - Install `leaflet` and `react-leaflet` dependencies. Load OSM styles in `index.html`.
   - Render a static-like view showing a central marker representing the customer's coordinate center.
   - Display markers for all seeded home kitchens within a 3km radius. Tapping a kitchen marker zooms in and pops up a preview card linking to `/chef/:id`.

2. **Distance Calculation**:
   - Write a helper utility `calculateDistance(lat1, lon1, lat2, lon2)` using the Haversine formula.
   - For each chef in the feed, compute distance relative to the active customer location coordinates. Exclude chefs residing further than their operational `radius_limit`.

3. **Discovery Page (`src/app/customer/Discovery.tsx`)**:
   - Fetch chef listings from Supabase `chefs` table joining `profiles`.
   - Apply real-time client-side filter chains:
     - Search terms matching chef names, bios, or menus.
     - Active dietary tag filters matching array contents of `menus.dietary_tags`.
   - Render lists inside a grid layout adapting from 1 column (mobile) to 3 columns (desktop).

## Check When Done
- [ ] Leaflet map renders correctly without overlapping tiles or broken control assets.
- [ ] Distances compute accurately and hide chefs exceeding their delivery range.
- [ ] Dietary tag filters return only chefs who list corresponding menus.
- [ ] List targets are responsive and fit within typical smartphone boundaries without overflow.
