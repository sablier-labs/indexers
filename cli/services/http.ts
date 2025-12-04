import { NodeHttpClient } from "@effect/platform-node";

/**
 * HttpClient layer from @effect/platform-node
 *
 * Provides HTTP client capabilities for making requests.
 * Retry logic is handled at the call site using Effect.retry().
 */
export const HttpClientLive = NodeHttpClient.layerUndici;
