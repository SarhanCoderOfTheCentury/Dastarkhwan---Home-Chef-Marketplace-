# Feature Spec 03: Auth Flow & Role Selection

We need to implement the authentication screens, connect the phone OTP login mechanism via Supabase, set up the onboarding role-selection interface, and store active sessions.

## Design

### Login Page (`/auth/login`)
- **Visuals**: Left panel containing a premium background layout featuring traditional cuisine photography. Right panel is a clean, centered box containing the mobile number field and code validator.
- **OTP Field**: Hidden by default. Slides open with a smooth height transition once a valid phone number is inputted and "Send Code" is pressed.
- **Cooldown Helper**: A visual countdown timer (60 seconds) prevents multiple sequential code generation queries.

### Onboarding Selection (`/onboarding/role`)
- **Layout**: Simple wizard step layout. Displays two interactive cards:
  - **Customer Option**: "I want to Order Food (Find local kitchens & subscribe)"
  - **Chef Option**: "I want to Cook & Earn (Set up your kitchen storefront)"
- **Active Card**: Marked by `--color-primary` borders with a subtle green check indicator.

## Implementation Instructions

1. **State Store (`src/hooks/useAuthStore.ts`)**:
   - Build a Zustand store managing active user `session`, target `profile`, and authentication loading state.
   - Persist session details across reloads where appropriate.

2. **Login View (`src/app/auth/Login.tsx`)**:
   - Construct forms using custom inputs. Phone field uses a country prefix selector defaulting to `+92` (Pakistan format).
   - Validation ensures numbers match local networks (e.g. `3xx xxxxxxx`).
   - Integrate Supabase `signInWithOtp({ phone })` hooks. Since OTP endpoints are mocked or sandbox-based, include a fallback development toggle to sign in with a test verification code (`123456`).

3. **Role Selection Onboarding (`src/app/onboarding/RoleSelection.tsx`)**:
   - Restrict access to authenticated users whose `profiles.role` column is null.
   - On selecting a card and clicking "Next":
     - Update the database `profiles` table setting `role` to `'customer'` or `'chef'`.
     - Redirect customers to `/discovery`.
     - Redirect chefs to `/onboarding/chef-wizard`.

## Check When Done
- [ ] Users cannot bypass the role selection step if their role is null.
- [ ] Login screen accepts standard Pakistani phone formatting and handles client-side errors.
- [ ] Zustand `useAuthStore` updates session state immediately on OTP validation.
- [ ] Development toggle lets developers bypass SMS requirements during local evaluation.
