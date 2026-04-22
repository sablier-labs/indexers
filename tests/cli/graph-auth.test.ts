import path from "node:path";
import { Effect, Either, Layer, Option } from "effect";
import { describe, expect, it } from "vitest";
import { CliEnv } from "../../cli/services/env.js";
import { ValidationError } from "../../cli/utils/errors.js";
import { getOptionalGraphHeaders, resolveGraphHeaders } from "../../cli/utils/graph-auth.js";

function makeCliEnvLayer(envVars: Record<string, string | undefined> = {}) {
  const cwd = process.cwd();

  return Layer.succeed(CliEnv, {
    argv: [],
    cwd,
    get: (key: string) => Effect.succeed(Option.fromNullable(envVars[key])),
    getString: (key: string) => Effect.succeed(envVars[key]),
    relativeToCwd: (target: string) => `./${path.relative(cwd, target)}`,
    resolveFromCwd: (target: string) => path.resolve(cwd, target),
  });
}

describe("graph auth helpers", () => {
  it("returns empty headers for non-gateway endpoints", () => {
    const headers = Effect.runSync(
      getOptionalGraphHeaders("https://example.com/subgraph").pipe(
        Effect.provide(makeCliEnvLayer())
      )
    );

    expect(headers).toEqual({});
  });

  it("requires GRAPH_QUERY_KEY for gateway endpoints", () => {
    const result = Effect.runSync(
      Effect.either(
        resolveGraphHeaders("https://gateway.thegraph.com/api/subgraphs/id/123").pipe(
          Effect.provide(makeCliEnvLayer())
        )
      )
    );

    if (Either.isRight(result)) {
      throw new Error("Expected GRAPH_QUERY_KEY validation to fail");
    }

    expect(result.left).toBeInstanceOf(ValidationError);
  });

  it("injects the bearer token for gateway endpoints when configured", () => {
    const headers = Effect.runSync(
      resolveGraphHeaders("https://gateway.thegraph.com/api/subgraphs/id/123").pipe(
        Effect.provide(makeCliEnvLayer({ GRAPH_QUERY_KEY: "secret-token" }))
      )
    );

    expect(headers).toEqual({ Authorization: "Bearer secret-token" });
  });
});
