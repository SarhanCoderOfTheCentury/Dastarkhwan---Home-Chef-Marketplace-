# Feature Spec 14: AI Meal Planner Chat

We need to implement the conversational planner page (`/planner`) where customers query meal preferences and receive real-time streaming recommendations referencing local chef storefronts.

## Design

- **Chat Container**: Scrollable area showing user speech bubbles (warm cream) and assistant speech bubbles (light Sand).
- **Assistant Header**: Displays `🤖 AI Meal Assistant (Powered by OpenRouter)`.
- **Chat Input**: Input field with a submit arrow button. Tapping locked inputs disables editing while responses stream.
- **Embedded Route Cards**: Action buttons generated inside the assistant text (e.g. `[ View Chef Sana's Kitchen ]`) that navigate directly to matching storefront profiles `/chef/:id`.

## Implementation Instructions

1. **Planner View (`src/app/customer/AIPlanner.tsx`)**:
   - Maintain a list of message objects in React component state.
   - Automatically scroll to the bottom of the container as content streams.

2. **System Prompt & Context Construction**:
   - Query all active chefs and their corresponding menus within the customer's neighborhood.
   - Before firing requests to the OpenRouter client:
     - Prepend a strict system instruction detailing:
       - The user's coordinates.
       - A structured JSON string representing the local chefs and menu names, prices, and dietary tags.
       - Instructing the model to only recommend dishes that actually exist in the provided local chefs JSON.
       - Instructing the model to output markdown link formats for navigation cards (e.g. `[View Sana's Kitchen](/chef/chef-id)`).

3. **Link Parser Widget**:
   - Parse markdown navigation link patterns in the text stream, rendering them as interactive primary button components instead of standard anchor links.

## Check When Done
- [ ] Chat assistant correctly recommendations local dishes from seeded cooks.
- [ ] Text content streams in chunk by chunk rather than appearing all at once.
- [ ] Clicking navigation buttons inside assistant text successfully opens target chef details page.
- [ ] Inputs unlock immediately once streams complete or fail.
