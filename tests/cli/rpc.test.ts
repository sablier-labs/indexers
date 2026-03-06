import { sablier } from "sablier";
import { describe, expect, it } from "vitest";
import { ValidationError } from "../../cli/errors.js";
import { resolveCliRpcConfig } from "../../cli/rpc.js";

describe("CLI RPC config", () => {
  it("prefers RouteMesh ahead of public RPC defaults when an API key is provided", () => {
    const chain = sablier.chains.getOrThrow(1);
    const config = resolveCliRpcConfig(1, "route-mesh-key");

    expect(config.chain).toBe(chain);
    expect(config.rpcUrls).toEqual([
      "https://lb.routeme.sh/rpc/1/route-mesh-key",
      ...chain.rpc.defaults,
    ]);
  });

  it("falls back to public RPC defaults when the RouteMesh API key is missing or blank", () => {
    const defaults = sablier.chains.getOrThrow(1).rpc.defaults;
    const originalRouteMeshApiKey = process.env.ENVIO_ROUTEMESH_API_KEY;

    delete process.env.ENVIO_ROUTEMESH_API_KEY;

    try {
      expect(resolveCliRpcConfig(1).rpcUrls).toEqual(defaults);
      expect(resolveCliRpcConfig(1, "   ").rpcUrls).toEqual(defaults);
    } finally {
      if (originalRouteMeshApiKey === undefined) {
        delete process.env.ENVIO_ROUTEMESH_API_KEY;
      } else {
        process.env.ENVIO_ROUTEMESH_API_KEY = originalRouteMeshApiKey;
      }
    }
  });

  it("redacts RouteMesh API keys from display RPC URLs", () => {
    const config = resolveCliRpcConfig(1, "super-secret-key");

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
      const config = resolveCliRpcConfig(1, "route-mesh-key");

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
    expect(() => resolveCliRpcConfig(0, "route-mesh-key")).toThrow(ValidationError);
    expect(() => resolveCliRpcConfig(999_999_999, "route-mesh-key")).toThrow(ValidationError);
  });
});
