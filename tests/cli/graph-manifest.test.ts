import { FileSystem, Error as PlatformError } from "@effect/platform";
import { NodeFileSystem } from "@effect/platform-node";
import { Cause, Console, Effect, Exit, Layer } from "effect";
import { sablier } from "sablier";
import type { Version } from "sablier/evm";
import { chains, contracts, isLockupCompatible } from "sablier/evm";
import { describe, expect, it, vi } from "vitest";
import { createGraphManifest } from "../../cli/commands/codegen/graph-manifest/index.js";
import { handler } from "../../cli/commands/codegen/graph-manifest/run.js";
import { CliEnvLive } from "../../cli/services/env.js";
import { CliUiLive } from "../../cli/services/ui.js";
import { GRAPH_TARGETS } from "../../cli/utils/constants.js";
import paths from "../../cli/utils/paths.js";
import { graphChains } from "../../src/indexers/graph.js";

const ETHEREUM_WRITE_ERROR = /airdrops manifest for Ethereum \(1\).*mock disk is full/u;

describe("Graph Airdrops Lockup allowlists", () => {
  it.each(graphChains)(
    "preserves each factory's ordered allowlist on chain %s",
    async (chainId) => {
      const eligibleNames = new Set<string>([
        contracts.names.SABLIER_LOCKUP,
        contracts.names.SABLIER_V2_LOCKUP_LINEAR,
        contracts.names.SABLIER_V2_LOCKUP_TRANCHED,
      ]);
      const manifest = await Effect.runPromise(
        createGraphManifest("airdrops", chainId).pipe(Effect.provide(NodeFileSystem.layer))
      );
      const factories = manifest.dataSources.filter(({ name }) => name !== "IndexerInfo");
      expect(factories.length).toBeGreaterThan(0);
      for (const { context, name } of factories) {
        if (!context?.version) {
          throw new Error(`Missing version context for ${name}`);
        }
        const factoryVersion = context.version.data as Version.Airdrops;
        const addresses = sablier.releases
          .getAll({ protocol: "lockup" })
          .filter(({ version }) => isLockupCompatible(factoryVersion, version as Version.Lockup))
          .flatMap(({ deployments }) =>
            deployments.filter((deployment) => deployment.chainId === chainId)
          )
          .flatMap((deployment) => deployment.contracts)
          .filter((contract) => eligibleNames.has(contract.name))
          .map(({ address }) => ({ data: address.toLowerCase(), type: "String" }));
        expect(context.lockups, name).toEqual({ data: addresses, type: "List" });
      }
    }
  );

  it("reports missing Lockup deployments", async () => {
    const { getAll } = sablier.releases;
    const releases = vi
      .spyOn(sablier.releases, "getAll")
      .mockImplementation((options) => (options?.protocol === "lockup" ? [] : getAll(options)));
    try {
      const result = await Effect.runPromiseExit(
        createGraphManifest("airdrops", chains.sepolia.id).pipe(
          Effect.provide(NodeFileSystem.layer)
        )
      );
      expect(Exit.isFailure(result) && Cause.pretty(result.cause)).toContain(
        "No contracts found for lockup on Sepolia"
      );
    } finally {
      releases.mockRestore();
    }
  });
});

describe("Graph manifest batches", () => {
  it.each([
    { failAll: false, indexer: "airdrops" },
    { failAll: false, indexer: "all" },
    { failAll: true, indexer: "airdrops" },
    { failAll: true, indexer: "all" },
  ] as const)(
    "fails $indexer after attempting every manifest (failAll=$failAll)",
    async ({ failAll, indexer }) => {
      const targets = indexer === "all" ? GRAPH_TARGETS : [indexer];
      const manifestPaths = targets.flatMap((target) =>
        graphChains.map((chainId) => paths.graph.manifest(target, chainId))
      );
      const ethereumManifest = paths.graph.manifest("airdrops", 1);
      const writeFileString = vi.fn((path: string) => {
        if (path === ethereumManifest || (failAll && path.endsWith(".yaml"))) {
          return Effect.fail(
            new PlatformError.SystemError({
              description: "mock disk is full",
              method: "writeFileString",
              module: "FileSystem",
              pathOrDescriptor: path,
              reason: "Unknown",
            })
          );
        }
        return Effect.void;
      });
      const fs = Layer.effect(
        FileSystem.FileSystem,
        Effect.map(FileSystem.FileSystem, ({ readFileString }) =>
          FileSystem.makeNoop({ makeDirectory: () => Effect.void, readFileString, writeFileString })
        )
      ).pipe(Layer.provide(NodeFileSystem.layer));
      const errors: string[] = [];
      const result = await Effect.runPromiseExit(
        Console.consoleWith((console) =>
          handler({ chain: "all", indexer }).pipe(
            Console.withConsole({
              ...console,
              error: (message: string) => Effect.sync(() => void errors.push(message)),
              log: () => Effect.void,
            }),
            Effect.provide(fs),
            Effect.provide(CliEnvLive),
            Effect.provide(CliUiLive)
          )
        )
      );

      expect(
        writeFileString.mock.calls.map(([path]) => path).filter((path) => path.endsWith(".yaml"))
      ).toEqual(manifestPaths);
      const failure = Exit.isFailure(result) ? Cause.pretty(result.cause) : "";
      const airdropErrors = failAll ? graphChains.length : 1;
      expect(failure).toContain(`Failed to generate airdrops manifests (${airdropErrors} failed)`);
      expect(errors).toHaveLength(failAll ? manifestPaths.length : 1);
      expect(errors).toContainEqual(expect.stringMatching(ETHEREUM_WRITE_ERROR));
    }
  );
});
