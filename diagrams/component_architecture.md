# Component Architecture: DastarKhwan

The diagram below details the structural layout of the Vite + React SPA, demonstrating how layout wrappers, routing modules, feature widgets, global stores, and custom services fit together.

```mermaid
graph TD
    %% Entry & Shell
    Main["main.tsx (Root Mount)"]
    App["App.tsx (App Shell)"]
    Router["AppRouter.tsx (React Router Router)"]
    
    subgraph Layouts ["src/components/layouts/"]
        CustomerLayout["CustomerLayout (Navbar, Footer)"]
        ChefLayout["ChefLayout (Sidebar, ChefHeader)"]
    end

    %% State Management
    subgraph Stores ["src/hooks/ (Zustand Stores)"]
        AuthStore["useAuthStore (User Session, Profile)"]
        CartStore["useCartStore (Meal Selections)"]
    end

    %% Pages
    subgraph Pages ["src/app/ (Pages)"]
        LandingPage["LandingPage"]
        DiscoveryPage["DiscoveryPage"]
        ChefDetailPage["ChefDetailPage"]
        CustomerTrackerPage["CustomerTrackerPage"]
        ChefDashboardPage["ChefDashboardPage"]
        AIPlannerPage["AIPlannerPage"]
    end

    %% Custom Hooks / Services
    subgraph Services ["src/hooks/ & src/services/"]
        RealtimeHook["useRealtimeOrder (Supabase Realtime)"]
        SearchHook["useChefSearch (Leaflet.js Coordinates)"]
        AIPlannerHook["useAIPlanner (OpenRouter Streaming)"]
        NotifyHook["useNotifications (Simulated Alerts)"]
    end

    %% UI Primitives & Feature Components
    subgraph FeatureComponents ["src/components/features/"]
        ChefCard["ChefCard"]
        DiscoveryGrid["DiscoveryGrid"]
        TrackingStepper["TrackingStepper"]
        OnboardingWizard["OnboardingWizard"]
        KitchenReel["KitchenReel"]
        EarningChart["EarningChart"]
    end

    subgraph UIPrimitives ["src/components/ui/"]
        UIButton["Button"]
        UIInput["Input"]
        UIModal["Modal"]
        UIBadge["Badge"]
    end

    %% Routing Flow
    Main --> App
    App --> Router
    App --> AuthStore
    
    Router --> CustomerLayout
    Router --> ChefLayout
    
    CustomerLayout --> LandingPage
    CustomerLayout --> DiscoveryPage
    CustomerLayout --> ChefDetailPage
    CustomerLayout --> CustomerTrackerPage
    CustomerLayout --> AIPlannerPage
    
    ChefLayout --> ChefDashboardPage

    %% Page Dependencies on Features
    DiscoveryPage --> DiscoveryGrid
    DiscoveryGrid --> ChefCard
    ChefDetailPage --> KitchenReel
    CustomerTrackerPage --> TrackingStepper
    ChefDashboardPage --> OnboardingWizard
    ChefDashboardPage --> EarningChart
    AIPlannerPage --> UIModal

    %% Feature dependency on UI
    FeatureComponents --> UIPrimitives

    %% Custom Hooks Integration
    CustomerTrackerPage --> RealtimeHook
    DiscoveryPage --> SearchHook
    AIPlannerPage --> AIPlannerHook
    ChefDashboardPage --> NotifyHook

    %% Zustand binding
    Pages --> AuthStore
    Pages --> CartStore
    FeatureComponents --> CartStore

    %% Styling Theme
    style Layouts fill:#fdfbf7,stroke:#e8dfd3;
    style Stores fill:#f4efe6,stroke:#e8dfd3;
    style Pages fill:#fdfbf7,stroke:#e8dfd3;
    style Services fill:#f4efe6,stroke:#e8dfd3;
    style FeatureComponents fill:#fdfbf7,stroke:#e8dfd3;
```
