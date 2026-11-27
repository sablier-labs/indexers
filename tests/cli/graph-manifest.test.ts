import { FileSystem, Error as PlatformError } from "@effect/platform";
import { NodeFileSystem } from "@effect/platform-node";
import { Cause, Console, Effect, Exit, Layer } from "effect";
import { describe, expect, it, vi } from "vitest";
import { handler } from "../../cli/commands/codegen/graph-manifest/run.js";
import { CliEnvLive } from "../../cli/services/env.js";
import { CliUiLive } from "../../cli/services/ui.js";
import { GRAPH_TARGETS } from "../../cli/utils/constants.js";
import paths from "../../cli/utils/paths.js";
import { graphChains } from "../../src/indexers/graph.js";

const ETHEREUM_WRITE_ERROR = /airdrops manifest for Ethereum \(1\).*mock disk is full/u;

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
