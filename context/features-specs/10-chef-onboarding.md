# Feature Spec 10: Chef Storefront Onboarding

We need to implement the onboarding dashboard wizard (`/onboarding/chef-wizard`) that allows new home chefs to build profiles, upload verified kitchen photos, set up menu items, and define operational delivery zones.

## Design

### Onboarding Wizard Steps
1. **Kitchen Profile Info**:
   - Kitchen Name, Culinary Bio, Operating Days checklist, and base Address with latitude/longitude marker picker.
2. **Verify Photos**:
   - Image upload area with dropzone. Uploads kitchen hygiene photos and daily preparation reels.
3. **Menu Catalog Builder**:
   - Add/Remove item dialog. Inputs: name, description, price (PKR), and dietary tags checkboxes (Keto, Diabetic-friendly, etc.).
4. **Onboarding Complete**:
   - Success screen summarizing storefront guidelines.

## Implementation Instructions

1. **Wizard Layout Component (`src/app/chef/OnboardingWizard.tsx`)**:
   - Implement the multi-step layout. Store input data locally until step 4 is completed.
   - Use standard button components with clear step indices (`1 of 4`).

2. **Supabase File Storage Integration**:
   - Configure uploads to the Supabase Storage bucket `kitchen-photos`.
   - Implement client-side image compression or size checks (`max 5MB`).
   - Save returned public URLs to the `chefs.kitchen_photos` database column array.

3. **Catalogue Saving Logic**:
   - On clicking "Complete Onboarding":
     - Update the `profiles` table setting `role = 'chef'`.
     - Insert a new record into `chefs` with kitchen details and location.
     - Insert menu records into `menus` for each added item.
     - Redirect the user to `/chef/dashboard`.

## Check When Done
- [ ] Uploaded photos save to the Supabase storage bucket and render back properly.
- [ ] Users cannot skip required profile fields or proceed with empty menu catalogues.
- [ ] Coordinate picker accurately updates location variables.
- [ ] Onboarding completion correctly redirects to the Chef Dashboard `/chef/dashboard`.
