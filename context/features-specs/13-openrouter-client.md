# Feature Spec 13: OpenRouter API Client

We need to implement a dedicated OpenRouter API client wrapper to manage server connections, formulate prompts, stream content chunks, and fallback to mock interfaces.

## Implementation Instructions

1. **Environment Variables**:
   - Store configurations in `.env`:
     - `VITE_OPENROUTER_API_KEY`: API access token.
     - `VITE_OPENROUTER_MODEL`: Model ID (defaults to `anthropic/claude-3.5-sonnet:beta`).

2. **Client Singleton (`src/lib/openrouterClient.ts`)**:
   - Build a helper class managing request headers (including `HTTP-Referer` and `X-Title` required by OpenRouter).
   - Write a fetch utility `streamChatCompletion(messages, onChunk)` querying the endpoint: `https://openrouter.ai/api/v1/chat/completions`.
   - Set request parameter `stream: true`. Parse incoming server-sent events (`data: { choices: [...] }`) chunks and execute `onChunk(text)`.

3. **Fallback Interface (Local Evaluation Mode)**:
   - If the API key is missing or calls fail, fallback to a local mockup generator:
     - Simulate chunk streaming delays using a loop.
     - Return standard mock chef recommendation markdown matching low-carb, keto, or budget prompts.

## Check When Done
- [ ] Client correct sends headers (`Authorization`, `HTTP-Referer`, `X-Title`).
- [ ] Chunk parsing successfully handles SSE format changes without breaking midway.
- [ ] Fallback generator handles missing network connections gracefully during offline demos.
- [ ] Secret tokens remain strictly excluded from build outputs or public code repositories.
