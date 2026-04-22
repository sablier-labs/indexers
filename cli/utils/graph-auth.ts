import { Effect } from "effect";
import { CliEnv } from "../services/env.js";
import { ValidationError } from "./errors.js";

export function isGraphGatewayEndpoint(url: string): boolean {
  return url.includes("gateway.thegraph.com");
}

export function getOptionalGraphHeaders(
  endpoint: string
): Effect.Effect<Record<string, string>, never, CliEnv> {
  return Effect.gen(function* () {
    if (!isGraphGatewayEndpoint(endpoint)) {
      return {};
    }

    const env = yield* CliEnv;
    const graphQueryKey = (yield* env.getString("GRAPH_QUERY_KEY"))?.trim();
    if (!graphQueryKey) {
      return {};
    }

    const headers: Record<string, string> = {};
    headers.Authorization = `Bearer ${graphQueryKey}`;
    return headers;
  });
}

export function resolveGraphHeaders(
  endpoint: string
): Effect.Effect<Record<string, string>, ValidationError, CliEnv> {
  return Effect.gen(function* () {
    const headers = yield* getOptionalGraphHeaders(endpoint);

    if (isGraphGatewayEndpoint(endpoint) && !("Authorization" in headers)) {
      return yield* Effect.fail(
        new ValidationError({
          field: "graphQueryKey",
          message: "GRAPH_QUERY_KEY is required for The Graph gateway endpoints",
        })
      );
    }

    return headers;
  });
}
