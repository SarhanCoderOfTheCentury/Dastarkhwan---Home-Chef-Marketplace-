# Database Schema: DastarKhwan

This Entity-Relationship Diagram (ERD) models the PostgreSQL database structure configured in Supabase. Row-Level Security (RLS) is applied across these tables based on the relationship paths relative to the authenticated user's ID.

```mermaid
erDiagram
    PROFILES {
        uuid id PK "auth.users FK"
        text full_name
        text phone_number "Unique"
        text email "Unique"
        text role "customer | chef | admin"
        timestamp created_at
    }

    CHEFS {
        uuid id PK "profiles FK"
        text kitchen_name
        text bio
        text address
        float latitude
        float longitude
        float delivery_radius "in km"
        float trust_score "Calculated rating average"
        boolean is_verified "Hygiene check verified"
        text kitchen_photos "Comma-separated or JSON list"
        timestamp created_at
    }

    MENUS {
        uuid id PK
        uuid chef_id FK "chefs FK"
        text item_name
        text description
        numeric price
        text allergens "Allergen warnings"
        text[] dietary_tags "low-carb | diabetic | keto | high-protein"
        boolean is_available
        timestamp created_at
    }

    SUBSCRIPTIONS {
        uuid id PK
        uuid customer_id FK "profiles FK"
        uuid chef_id FK "chefs FK"
        text plan_type "5-day | 7-day"
        text status "active | paused | cancelled"
        text[] selected_days "Mon, Tue, etc."
        text delivery_slot "Lunch (12-2 PM) | Dinner (7-9 PM)"
        date start_date
        timestamp created_at
    }

    ORDERS {
        uuid id PK
        uuid customer_id FK "profiles FK"
        uuid chef_id FK "chefs FK"
        uuid subscription_id FK "subscriptions FK (nullable)"
        text status "preparing | ready | out_for_delivery | delivered"
        numeric total_amount
        text delivery_notes
        text rider_name "Nullable - manual input by Chef"
        text rider_phone "Nullable - manual input by Chef"
        timestamp created_at
        timestamp updated_at
    }

    REVIEWS {
        uuid id PK
        uuid customer_id FK "profiles FK"
        uuid chef_id FK "chefs FK"
        uuid order_id FK "orders FK"
        integer rating "1 to 5"
        text comment
        timestamp created_at
    }

    %% Relationships
    PROFILES ||--o| CHEFS : "extends (if chef role)"
    CHEFS ||--o{ MENUS : "defines menu catalog"
    
    PROFILES ||--o{ SUBSCRIPTIONS : "subscribes to plans"
    CHEFS ||--o{ SUBSCRIPTIONS : "fufills plans"
    
    PROFILES ||--o{ ORDERS : "places orders"
    CHEFS ||--o{ ORDERS : "fulfills orders"
    SUBSCRIPTIONS ||--o{ ORDERS : "generates schedule deliveries"

    PROFILES ||--o{ REVIEWS : "writes reviews"
    CHEFS ||--o{ REVIEWS : "receives reviews"
    ORDERS ||--o| REVIEWS : "reviewed in"
```
