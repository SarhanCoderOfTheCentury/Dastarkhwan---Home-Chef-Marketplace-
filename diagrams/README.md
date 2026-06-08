# DastarKhwan System Diagrams

This directory contains clean, professional software engineering diagrams built using Mermaid. They provide a structured visualization of DastarKhwan's systems, ranging from high-level architecture down to database models, component relationships, and specific transactional user flows.

## Diagrams Directory

1. **[System Architecture](file:///d:/Projects/Dastarkhwaan/diagrams/system_architecture.md)**
   * *Type*: C4 Model Container Diagram (High-Level)
   * *Purpose*: Visualizes how clients, frontend layers, the Supabase backend services, and external integrations (Twilio, OpenRouter, Easypaisa) interact.
2. **[Database Schema](file:///d:/Projects/Dastarkhwaan/diagrams/database_schema.md)**
   * *Type*: Entity-Relationship Diagram (ERD) (Low-Level)
   * *Purpose*: Maps out all PostgreSQL tables, data types, relationships, primary keys, and foreign keys.
3. **[Core User Flows](file:///d:/Projects/Dastarkhwaan/diagrams/user_flows.md)**
   * *Type*: Sequence Diagrams (Transactional)
   * *Purpose*: Covers the order lifecycle (status-based tracking), subscription management workflow, and AI meal planner query execution.
4. **[Order State Machine](file:///d:/Projects/Dastarkhwaan/diagrams/order_lifecycle.md)**
   * *Type*: State Diagram (Behavioral)
   * *Purpose*: Explains the valid state transitions of an order, who triggers them, and what side effects (WhatsApp/UI Realtime) are fired.
5. **[Component Architecture](file:///d:/Projects/Dastarkhwaan/diagrams/component_architecture.md)**
   * *Type*: Component & State Flow Diagram (Frontend Structuring)
   * *Purpose*: Outlines folder boundaries, routing shells, pages, Zustand stores, custom hooks, and their communication paths.

---

*To edit these diagrams, modify the Mermaid code blocks in their respective files. Mermaid graphs will render automatically in standard markdown viewers supporting Mermaid syntax.*
