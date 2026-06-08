# DastarKhwan Pitch Deck: Slide Structure (10 Slides)

This document outlines the slide-by-slide structure for the DastarKhwan startup pitch deck, structured for a team of three presenters (Person 1: Startup Intro, Person 2: Technical Deep Dive, Person 3: Business & Future Scope).

---

## 🎙️ Person 1: Startup Intro (Slides 1 - 4)
*Focus: Problem definition, our solution, value proposition, and competitive differentiation.*

### Slide 1: Title & Hook — "Empowering the Kitchen Economy"
*   **Visuals**: High-resolution image of a modern home kitchen with traditional Pakistani spices; clean logo of DastarKhwan.
*   **Content**:
    *   **Main Title**: DastarKhwan
    *   **Subtitle**: The Hyper-local Home Chef Subscription Marketplace.
    *   **Tagline**: Bringing healthy, authentic, and affordable home-cooked meals to Karachi's busy households.
    *   **Presenter**: Person 1 (Startup Intro).
*   **Narrative Hook**: "Over 60% of young professionals and students in Karachi struggle to access clean, healthy, and affordable food daily. They are forced to choose between expensive commercial restaurants or unhygienic local options. DastarKhwan bridges this gap by turning household kitchens into micro-entrepreneurial storefronts."

### Slide 2: The Problem — "Karachi's Food Dilemma"
*   **Visuals**: Graphics illustrating rising food inflation, unhygienic restaurant conditions (news clips), and busy office workers.
*   **Content**:
    *   **Daily Food Inflation**: Meal budgets are stretched, making restaurant ordering unsustainable.
    *   **The Trust & Hygiene Deficit**: Consumers are skeptical of industrial kitchen sanitation and oil quality.
    *   **Decision & Cooking Fatigue**: Preparing fresh food daily is time-consuming for working professionals and nuclear families.
    *   **Untapped Talent**: Millions of skilled home cooks (predominantly women) have no accessible path to digitize their skills and earn an income.

### Slide 3: The Solution — "DastarKhwan's Neighborhood Kitchens"
*   **Visuals**: UI mockups of the Discovery Feed and Chef Profiles, highlighting clean kitchen badges and rating metrics.
*   **Content**:
    *   **Hyper-Local Micro-Storefronts**: Easily find verified home cooks operating within a 3km radius.
    *   **Weekly Subscription Model**: Flexible 5-day (workweek) or 7-day plans that automate meal scheduling.
    *   **Unprecedented Transparency**: Video prep feeds showing cooking hygiene, verified kitchen photos, and community trust scores.
    *   **Low Cost/High Value**: Wholesome meals starting at a fraction of restaurant prices.

### Slide 4: Competitive Landscape — "How We Differ from Foodpanda"
*   **Visuals**: Clean comparative grid chart comparing Foodpanda vs. DastarKhwan.
*   **Content**:

| Feature | Foodpanda / Commercial Apps | DastarKhwan |
| :--- | :--- | :--- |
| **Food Source** | Commercial restaurants & cloud kitchens | Authenticated home kitchens |
| **Order Model** | On-demand (transactional, high delivery fee) | Weekly subscriptions (scheduled delivery) |
| **Trust/Hygiene** | Closed-door kitchens, anonymous reviews | Daily video prep reels, neighbor reviews |
| **Platform Commission** | High (25% - 35% squeezed from restaurants) | Low (15% flat commission for chefs) |
| **Logistics** | Proprietary driver network (expensive) | Decoupled delivery (chef assigns Bykea/Yango) |

*   **Key Takeaway**: "We are not a fast-food delivery service. We are a subscription-based kitchen economy that fosters trust, health, and low-overhead micro-entrepreneurship."

---

## 💻 Person 2: Technical Deep Dive (Slides 5 - 7)
*Focus: System architecture, user flows, and key screen demonstrations.*

### Slide 5: System Architecture — "How It Works Under the Hood"
*   **Visuals**: Simple, clear architectural flowchart showing customer/chef interaction via Supabase and AI engines.
*   **Content**:
    *   **Frontend**: Next.js App Router providing a mobile-first, responsive interface.
    *   **Backend & Sync**: Supabase Database with Postgres triggers, Row-Level Security (RLS), and Realtime status subscriptions.
    *   **AI Engine**: OpenRouter API analyzing dietary requests and suggesting localized chef menus.
    *   **Decoupled Delivery**: Decoupled logistics pipeline using Postgres realtime channels instead of complex GPS tracking.
*   **Architecture Flow Diagram**:
    ```
    [Customer Client] ──(Zustand State & Auth)──> [Next.js App Router]
           │                                             │
      (Realtime Status)                         (AI & Meal Queries)
           ▼                                             ▼
    [Supabase Database] <──(RLS & Status Updates)── [OpenRouter AI Planner]
           ▲
           │ (Order Transitions & Rider Assignment)
    [Chef Dashboard]
    ```

### Slide 6: Key Screens — "The User Experience Showcase"
*   **Visuals**: Screen carousel containing:
    1.  *Customer Discovery & Profile*: Filtering by Keto/Low-Carb, reading trust scores, playing video prep reels.
    2.  *Subscription Manager Calendar*: The calendar carousel where customers pause/skip single-day meals.
    3.  *Customer Real-time Tracker*: The status stepper displaying active updates and rider contact info.
*   **Content**:
    *   **Mobile-First Design**: Native-feeling web app layout optimized for typical 375px screens.
    *   **Zero-refresh Tracking**: Realtime subscriptions ensure the stepper animates immediately as the chef prepares and dispatches food.
    *   **One-click Calendar Adjustments**: Visual calendar dots to skip days, updating the database and pausing charges instantly.

### Slide 7: Technical Invariants — "Built for Local Realities"
*   **Visuals**: Stepper graphic changing state with mock WhatsApp notification message popup.
*   **Content**:
    *   **Decoupled Delivery Coordination**: No proprietary driver tracking. Chefs arrange local delivery (Bykea, Yango, or private riders) and type the rider details into the dashboard.
    *   **Realtime Stepper & Simulated WhatsApp**: When the chef clicks "Dispatch", the customer tracker updates immediately, and a WhatsApp message is simulated using the Twilio API to share the rider's name/phone.
    *   **Strict RLS Policies**: Customer and chef profiles are partitioned cleanly; users can only read or update their authorized records, preventing data leaks.

---

## 📈 Person 3: Business & Future Scope (Slides 8 - 10)
*Focus: Revenue generation, market sizing, launch strategy, and future roadmap.*

### Slide 8: Business & Financial Model — "The Economics of Home Cooking"
*   **Visuals**: Visual chart depicting transaction splits (Chef payout vs. Commission) and LTV projections.
*   **Content**:
    *   **15% Flat Commission**: Applied on subscriptions, keeping food prices competitive while funding operations.
    *   **Premium Visibility Tier**: Optional flat monthly subscription for chefs to highlight their transparency reels.
    *   **Predictable Revenue**: Weekly subscription billing stabilizes cash flow and reduces customer acquisition costs compared to on-demand apps.
    *   **Low Operational Overhead**: Zero driver payroll or warehouse/restaurant maintenance costs.

### Slide 9: Market Analysis & Launch Strategy — "Karachi Hub Launch"
*   **Visuals**: Map of Karachi showing target deployment zones (DHA, Clifton, Gulshan-e-Iqbal).
*   **Content**:
    *   **Target Demographics**: Double-income households, university students living away from home, and diabetic/health-conscious seniors.
    *   **Hyper-local Radius Limit (3km)**: Focus on small, high-density hubs to keep delivery times under 30 minutes.
    *   **Community Ambassador Program**: Onboarding chefs through local community groups and women-support associations.
    *   **AI Planner Lead Magnet**: Free health meal planner chat that converts dietary goals directly into paid subscriptions.

### Slide 10: Future Roadmap — "Scaling the Kitchen Economy"
*   **Visuals**: Timeline graphic showing next development milestones.
*   **Content**:
    *   **Phase 1 (Karachi Core)**: Seed launch in DHA/Clifton with 50 verified chefs, refining order flows and mock notification pipelines.
    *   **Phase 2 (Batch Pooling)**: Enable "Group Order Pooling" to let neighbors consolidate deliveries, reducing delivery fees by 50%.
    *   **Phase 3 (Bulk Ingredient Procurement)**: Leverage chef network volume to negotiate discounted wholesale kitchen staples (oil, flour, spices), raising chef margins.
    *   **Phase 4 (National Expansion)**: Expand verified kitchen networks to Lahore and Islamabad.
