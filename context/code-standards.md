# Code Standards: DastarKhwan

This document defines the code quality guidelines, type safety standards, design patterns, and programming rules that must be adhered to throughout the codebase.

## 1. Directory & File Conventions

- **File Naming**:
  - React Components: PascalCase (e.g. `ChefCard.tsx`, `StepperTracker.tsx`).
  - Hooks, Services, Utilities, and Styles: camelCase (e.g. `useRealtimeOrder.ts`, `supabaseClient.ts`).
- **Imports**: Group imports by standard React/libraries, components/hooks, and styles/types.
- **Complexity limits**: 
  - Keep files under **300 lines** and functions under **50 lines**.
  - Extract helper logic into utility functions if cyclomatic complexity exceeds 10.

## 2. TypeScript & Type Safety

- **No `any`**: Do not use the `any` type. If a type is unknown, use `unknown` and type guards, or define a concrete Interface or Type.
- **Schema Alignment**: All data types representing database structures must match the Supabase table schemas defined in `src/types/schema.ts`.
- **Prop Typing**: All React components must declare their properties using TypeScript `interface` or `type` declarations.
- **Null Safety**: Use optional chaining (`?.`) and nullish coalescing (`??`) for reading nested object fields.

## 3. Async Patterns & Error Handling

- **Async/Await Only**: Do not use raw nested callbacks. Use async/await for all asynchronous operations.
- **Robust Error Handling**: Wrap all async API calls (Supabase updates, Twilio calls, OpenRouter queries) in `try/catch` blocks.
- **Floating Promises**: Avoid floating promises. Always `await` or properly handle a promise using `.catch()` if it is run in the background.

```typescript
// RECOMMENDED async pattern
export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) throw error;
  } catch (error) {
    console.error('Failed to update order status:', error);
    // Propagate or dispatch user-facing notifications
    throw new Error('OrderStatusUpdateError');
  }
}
```

## 4. State Management (Zustand & Realtime)

- **Zustand Usage**: Keep global client UI states, session data, and cart states inside structured stores in `src/hooks/useCartStore.ts` or `src/hooks/useAuthStore.ts`.
- **Immutable Updates**: State stores must never directly mutate nested objects; use standard immutability spread patterns.
- **Realtime Cleanup**: When subscribing to Supabase Realtime in a `useEffect`, always return a cleanup function to unsubscribe and avoid memory leaks.

```typescript
// REALTIME SUBSCRIPTION PATTERN
useEffect(() => {
  const channel = supabase
    .channel(`order-status-${orderId}`)
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${orderId}` }, (payload) => {
      onStatusUpdate(payload.new.status);
    })
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [orderId]);
```

## 5. Styling & Responsiveness Standards

- **Utility Classes**: Use Tailwind CSS classes for spacing, flexbox/grid alignments, colors, and responsive layouts.
- **Design Tokens**: Do not use arbitrary color codes in styles. Use Tailwind configuration classes mapped to CSS variables (e.g. `bg-primary`, `text-secondary`, `border-border`).
- **Viewport Layout**: Deliver a mobile-first UI targeting `375px` devices, scaling gracefully up to desktop screen configurations. Ensure no horizontal scrolls occur on target devices.
- **Touch Targets**: Interactive controls must have a minimum touch area of `44px x 44px`.
- **Image References**: Use screenshot/image references strictly for layout and visual design inspiration. Do not implement additional features or UI elements depicted in the images that are not explicitly documented in the active build plan.

## 6. React Best Practices

- **List Keys**: Always use a unique, stable key (such as `id`) when mapping over lists; never use array indices as keys.
- **Clean Effects**: Always provide appropriate dependency arrays in `useEffect` and `useMemo` hooks.
- **Single Responsibility**: Each component should perform a single job. Split complex dashboard views into isolated components (e.g. `EarningChart`, `OrderList`, `OnboardingWizard`).
- **No Console Logs in Production**: Strip debugging console statements before committing code changes.
