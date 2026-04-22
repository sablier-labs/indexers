import path from "node:path";
import { Effect, Either, Layer, Option } from "effect";
import { sablier } from "sablier";
import { describe, expect, it } from "vitest";
import { CliEnv } from "../../cli/services/env.js";
import { ValidationError } from "../../cli/utils/errors.js";
import { resolveCliRpcConfig } from "../../cli/utils/rpc.js";

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

function runResolveCliRpcConfig(chainId: number, routeMeshApiKey?: string) {
  return Effect.runSync(
    resolveCliRpcConfig(chainId, routeMeshApiKey).pipe(Effect.provide(makeCliEnvLayer()))
  );
}

describe("CLI RPC config", () => {
  it("prefers RouteMesh ahead of public RPC defaults when an API key is provided", () => {
    const chain = sablier.chains.getOrThrow(1);
    const config = runResolveCliRpcConfig(1, "route-mesh-key");

    expect(config.chain).toBe(chain);
    expect(config.rpcUrls).toEqual([
      "https://lb.routeme.sh/rpc/1/route-mesh-key",
      ...chain.rpc.defaults,
    ]);
  });

  it("falls back to public RPC defaults when the RouteMesh API key is missing or blank", () => {
    const defaults = sablier.chains.getOrThrow(1).rpc.defaults;

    expect(
      Effect.runSync(resolveCliRpcConfig(1).pipe(Effect.provide(makeCliEnvLayer()))).rpcUrls
    ).toEqual(defaults);
    expect(runResolveCliRpcConfig(1, "   ").rpcUrls).toEqual(defaults);
  });

  it("redacts RouteMesh API keys from display RPC URLs", () => {
    const config = runResolveCliRpcConfig(1, "super-secret-key");

    expect(config.displayRpcUrls[0]).toBe("https://lb.routeme.sh/rpc/1/[redacted]");
    expect(config.displayRpcUrls.join(" ")).not.toContain("super-secret-key");
  });

  it("deduplicates RPC URLs while preserving their original order", () => {
    const chain = sablier.chains.getOrThrow(1);
    const originalRouteMesh = chain.rpc.routemesh;
    const originalDefaults = [...chain.rpc.defaults];

    chain.rpc.routemesh = () => "https://rpc.example/primary";
    chain.rpc.defaults = [
      "https://rpc.example/primary",
      "https://rpc.example/secondary",
      "https://rpc.example/primary",
    ];

    try {
      const config = runResolveCliRpcConfig(1, "route-mesh-key");

      expect(config.rpcUrls).toEqual([
        "https://rpc.example/primary",
        "https://rpc.example/secondary",
      ]);
    } finally {
      chain.rpc.routemesh = originalRouteMesh;
      chain.rpc.defaults = originalDefaults;
    }
  });

  it("throws validation errors for invalid or unknown chain IDs", () => {
    const invalidChainId = Effect.runSync(
      Effect.either(
        resolveCliRpcConfig(0, "route-mesh-key").pipe(Effect.provide(makeCliEnvLayer()))
      )
    );

    const unknownChainId = Effect.runSync(
      Effect.either(
        resolveCliRpcConfig(999_999_999, "route-mesh-key").pipe(Effect.provide(makeCliEnvLayer()))
      )
    );

    if (Either.isRight(invalidChainId)) {
      throw new Error("Expected invalid chain ID to fail");
    }

    expect(invalidChainId.left).toBeInstanceOf(ValidationError);

    if (Either.isRight(unknownChainId)) {
      throw new Error("Expected unknown chain ID to fail");
    }

    expect(unknownChainId.left).toBeInstanceOf(ValidationError);
  });
});
