# Feature Spec 12: Chef Earnings & Analytics

We need to implement the chef-facing financial overview page (`/chef/earnings`) displaying weekly revenue, commission breakdowns, historical payments, and interactive Recharts graphs.

## Design

- **Earning Summary Cards**:
  - **Gross Revenue**: Total price of all items prepared and delivered this week.
  - **Platform Commission**: 15% flat rate commission deducted (or 10% for Pro Tier).
  - **Net Earnings**: Actual chef payout.
- **Weekly Performance Chart**: A responsive Recharts bar graph displaying daily earnings (Mon through Sun) with tooltip highlights.
- **Payout Request CTA**: terracotta button `[ Request Payout (Easypaisa) ]`. Opens dialog confirming transfer credentials.

## Implementation Instructions

1. **Earnings Page (`src/app/chef/Earnings.tsx`)**:
   - Query all orders under status `'delivered'` belonging to the chef that were updated within the current calendar week.
   - Calculate gross values and platform commission splits client-side or via a SQL query helper.
   - Format currencies correctly as Pakistani Rupees (e.g. `PKR 14,800`).

2. **Recharts Integration (`src/components/features/EarningChart.tsx`)**:
   - Install `recharts`.
   - Build a responsive bar chart mapping daily revenue datasets. Customize colors to match the brand style guides (terracotta primary bars with sage green accents).

3. **Payout Requests**:
   - Create a table `payouts` storing status history (`'pending'`, `'cleared'`, `'declined'`).
   - Clicking "Request Payout" inserts a request row, and updates local state displaying a pending clearance banner.

## Check When Done
- [ ] Earnings math correctly computes 15% platform deductions.
- [ ] Recharts graph scales correctly on mobile dimensions without cropping labels.
- [ ] Payout requests log to the database with active timestamp and credentials.
- [ ] Tooltips render correct dollar/rupee figures on bar hovers.
