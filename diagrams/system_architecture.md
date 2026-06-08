# System Architecture: DastarKhwan

The following Container Diagram (aligned with the C4 Model) illustrates the logical components of DastarKhwan, their dependencies, data storage boundaries, and integrations with external APIs.

```mermaid
graph TB
    %% Users
    Customer["Customer (Web User)"]
    Chef["Home Chef (Kitchen Operator)"]

    %% Frontend Container
    subgraph FrontendApp ["Client Application (SPA Container)"]
        SPA["React + Vite Responsive Web App"]
        Zustand["Zustand Client Store (Cart, Session)"]
        Leaflet["Leaflet.js (Hyper-Local Map Views)"]
        Recharts["Recharts (Earnings Graphs)"]
    end

    %% Backend Container (Supabase)
    subgraph Supabase ["Supabase Backend Container (BaaS)"]
        Auth["Supabase Auth (Phone/Email OTP)"]
        DB[(Supabase PostgreSQL Database)]
        Realtime["Realtime Engine (WebSockets Subscription)"]
        Storage["Storage Buckets (Kitchen/Food Pics & Clips)"]
        Edge["Edge Functions (Serverless API logic)"]
    end

    %% External Systems
    subgraph ExternalAPI ["External APIs & Services"]
        OpenRouter["OpenRouter API (AI Meal Recommendations)"]
        Twilio["Twilio WhatsApp API (Status Notifications)"]
        Easypaisa["Easypaisa API (Mobile Wallet Sandbox)"]
    end

    %% Connections - Users to Frontend
    Customer ==>|"Browses menus, places orders, plans meals"| SPA
    Chef ==>|"Builds profile, manages orders, views earnings"| SPA

    %% Connections - Frontend internally
    SPA --- Zustand
    SPA --- Leaflet
    SPA --- Recharts

    %% Connections - Frontend to Supabase
    SPA ==>|"Authenticates session"| Auth
    SPA ==>|"Queries data / Submits ratings (RLS Enforced)"| DB
    SPA ==>|"Listens for order status flips"| Realtime
    SPA ==>|"Uploads/downloads photo and video reels"| Storage
    SPA ==>|"Initiates custom actions (Easypaisa/OpenRouter plan)"| Edge

    %% Connections - Database internally
    DB -.->|"Status change event triggers"| Edge
    DB <.->|"Syncs state updates"| Realtime

    %% Connections - Supabase to External APIs
    Edge ===>|"Forwards user goals for streaming output"| OpenRouter
    Edge ===>|"Dispatches status update SMS/WhatsApp alerts"| Twilio
    Edge ===>|"Polls wallet payment status"| Easypaisa

    %% Connections - Realtime to Client
    Realtime ==>|"Pushes status update to Stepper UI"| SPA

    %% Styling
    style FrontendApp fill:#f4efe6,stroke:#e8dfd3,stroke-width:2px;
    style Supabase fill:#fdfbf7,stroke:#e8dfd3,stroke-width:2px;
    style ExternalAPI fill:#fdfbf7,stroke:#e8dfd3,stroke-width:2px;
    style Customer fill:#e05a36,stroke:#c44522,color:#fff;
    style Chef fill:#e05a36,stroke:#c44522,color:#fff;
    style DB fill:#4a7c59,stroke:#3b6347,color:#fff;
```
