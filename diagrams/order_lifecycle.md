# Order Lifecycle: DastarKhwan

The diagram below tracks the lifecycle states of a daily order. It models the manual updates made by the chef and the automated side effects (realtime database streams and Twilio notifications) fired at each boundary.

```mermaid
stateDiagram-v2
    [*] --> Preparing : "Scheduler generates order / payment logs"
    
    state Preparing {
        [*] --> Cooking
        Cooking --> Packing : "Food completed"
    }
    
    Preparing --> Ready : "Chef clicks 'Packed & Ready'"
    note right of Ready
        Side Effect:
        - DB saves updated_at
        - Realtime broadcasts change
        - UI step transition (Step 1 -> 2)
    end note
    
    Ready --> Out_For_Delivery : "Chef assigns Rider and marks 'Out for Delivery'"
    note right of Out_For_Delivery
        Side Effects:
        - UI step transition (Step 2 -> 3)
        - DB updates order record (rider_name, rider_phone)
        - Edge Function triggers Twilio
        - Customer gets WhatsApp alert with Rider details 🍱
    end note
    
    Out_For_Delivery --> Delivered : "Chef marks 'Delivered'"
    note right of Delivered
        Side Effects:
        - UI step transition (Step 3 -> 4)
        - Order marked complete
        - Review card appears in Customer UI
    end note
    
    Delivered --> [*] : "Review submitted / Archival"

    %% State Transitions Invariant Rules
    state Invariants {
        direction LR
        TransitionRule: "Status cannot go backward (e.g. Out for Delivery -> Ready is rejected by DB constraint)"
    }
```

## State Invariants & Rules

1. **Forward-Only Sequence**: The database enforces a check constraint on status updates, preventing any transitions that are not in sequential order:
   $$\text{Preparing} \rightarrow \text{Ready} \rightarrow \text{Out for Delivery} \rightarrow \text{Delivered}$$
2. **Access Control**: Only the chef linked to the order (`chef_id = auth.uid()`) can trigger status transitions. Customers and external entities do not have write access to order status records.
3. **Instant Synchronization**: Every change in status triggers an automatic row update hook, feeding the client's WebSocket channel immediately without page reloads.
