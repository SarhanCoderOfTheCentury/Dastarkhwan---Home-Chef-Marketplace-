# Transactional User Flows: DastarKhwan

The sequence diagrams below detail how DastarKhwan handles the main transaction flows between the clients, backend services, and external integrations.

---

## 1. Status-Based Delivery Tracking Flow

This flow highlights how manual status flips by the chef propagate instantly to the customer's UI via Supabase Realtime and trigger WhatsApp alerts via Twilio without continuous map polling.

```mermaid
sequenceDiagram
    autonumber
    actor Customer
    actor Chef
    participant SPA as Customer / Chef SPA
    participant DB as Supabase PostgreSQL
    participant RT as Supabase Realtime
    participant Edge as Supabase Edge Functions
    participant Twilio as Twilio API

    Customer->>SPA: Opens Order Track Screen
    SPA->>RT: Subscribes to orders.status channel (WebSocket)
    RT-->>SPA: Subscription Confirmed

    %% Status advancing
    Chef->>SPA: Assigns Rider details (Bilal, +92 300 1234567) & clicks "Out for Delivery"
    SPA->>DB: UPDATE orders SET status = 'out_for_delivery', rider_name = 'Bilal', rider_phone = '+92 300 1234567'
    DB-->>DB: Save status row change & update timestamp
    
    %% Realtime push
    DB-->>RT: Broadcast row change event
    RT-->>SPA: Push UPDATE event (status: out_for_delivery, rider_name, rider_phone)
    SPA->>Customer: Stepper transitions to "Out for Delivery" and displays Rider details

    %% Notification Trigger
    DB->>Edge: Trigger function on orders UPDATE status
    activate Edge
    Edge->>Edge: Check status is 'out_for_delivery'
    Edge->>Twilio: POST /Messages (WhatsApp payload with Rider details)
    Twilio-->>Customer: Deliver WhatsApp: "Your DastarKhwan order from Chef Sana is out with Rider Bilal (+92 300 1234567)! 🍱"
    Twilio-->>Edge: API 200 OK
    deactivate Edge
```

---

## 2. Weekly Subscription & Customization Flow

Illustrates a customer subscribing to a meal plan, configuring operating days, completing the mock payment flow, and scheduling future deliveries.

```mermaid
sequenceDiagram
    autonumber
    actor Customer
    participant SPA as Customer SPA
    participant Store as Zustand Store
    participant DB as Supabase PostgreSQL
    participant Edge as Supabase Edge Functions

    Customer->>SPA: Selects Chef & chooses 5-Day Plan
    Customer->>SPA: Selects Days (Mon-Fri) & Slot (Lunch)
    SPA->>Store: Add plan to local checkout state
    Customer->>SPA: Clicks "Subscribe Now"
    SPA->>Edge: POST /create-subscription-session
    activate Edge
    Edge->>Edge: Lock pricing & query active chef availability
    Edge-->>SPA: Return Sandbox Payment Session URL (Easypaisa Mock)
    deactivate Edge
    
    Customer->>SPA: Inputs wallet credentials on Mock Checkout Screen
    SPA->>DB: INSERT INTO subscriptions (customer_id, chef_id, plan_type, selected_days, status: 'active')
    DB-->>SPA: Return Subscription ID
    
    %% Order scheduling
    DB->>Edge: Daily Scheduler Trigger (Cron hook at midnight)
    activate Edge
    Edge->>DB: Query tomorrow's active subscriptions
    Edge->>DB: INSERT INTO orders (status: 'preparing', total_amount: 0) for tomorrow's deliveries
    Edge-->>DB: Orders generated
    deactivate Edge
    SPA->>Customer: Display "Subscription Active - First delivery scheduled!"
```

---

## 3. AI Meal Planner Recommendation Stream

This sequence maps how the user's dietary parameters match with local kitchen menus and stream responses from the OpenRouter API.

```mermaid
sequenceDiagram
    autonumber
    actor Customer
    participant SPA as Customer SPA
    participant Edge as Supabase Edge Functions
    participant DB as Supabase PostgreSQL
    participant OpenRouter as OpenRouter API

    Customer->>SPA: Inputs: "I want low-carb meals under PKR 500 near Clifton"
    SPA->>Edge: POST /ai-meal-planner (goals, lat/lng coordinates)
    activate Edge
    Edge->>DB: Query chefs within 3km radius having menu items with 'low-carb' tag
    DB-->>Edge: Return matching chefs, menu prices, and review scores
    
    Edge->>Edge: Construct contextual Prompt (User input + Database menu items catalog)
    Edge->>OpenRouter: POST /api/v1/chat/completions (Prompt, Stream: True)
    activate OpenRouter
    OpenRouter-->>Edge: Stream text chunk (Ranked recommendation + local explanations)
    Edge-->>SPA: Stream HTTP Chunked Transfer Response
    SPA->>Customer: Render recommendations text dynamically in chat box
    deactivate OpenRouter
    deactivate Edge
```
