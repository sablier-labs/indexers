import { FileSystem } from "@effect/platform";
import chalk from "chalk";
import { Console, Effect, Either } from "effect";
import * as _ from "lodash-es";
import { sablier } from "sablier";
import type { Indexer } from "../../../../src/index.js";
import { graphChains } from "../../../../src/indexers/graph.js";
import { getChain } from "../../../utils/args.js";
import { GRAPH_TARGETS } from "../../../utils/constants.js";
import { colors, createTable, displayHeader } from "../../../utils/display.js";
import { toFileOperationError } from "../../../utils/errors.js";
import paths, { getRelative } from "../../../utils/paths.js";
import { dumpYAML } from "../helpers.js";
import { createGraphManifest } from "./index.js";

type ManifestResult = {
  chainId: number;
  chainName: string;
  manifestPath: string;
  status: "generated" | "error";
};

/**
 * Writes the subgraph manifest to a file.
 * @returns The relative path to the manifest file.
 */
function writeManifestToFile(target: Indexer.GraphTarget, chainId: number) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const manifest = yield* createGraphManifest(target, chainId);
    const yaml = dumpYAML(manifest);
    const manifestPath = paths.graph.manifest(target, chainId);
    yield* fs
      .writeFileString(manifestPath, yaml)
      .pipe(Effect.mapError(toFileOperationError(manifestPath, "write")));

    return yield* getRelative(manifestPath);
  });
}

function generateManifest(target: Indexer.GraphTarget, chainArg: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const chain = yield* getChain(chainArg);
    const manifestsDir = paths.graph.manifests(target);
    yield* fs
      .makeDirectory(manifestsDir, { recursive: true })
      .pipe(Effect.mapError(toFileOperationError(manifestsDir, "write")));

    const manifestPath = yield* writeManifestToFile(target, chain.id);
    yield* Console.log(`✅ Generated subgraph manifest for ${chainArg}`);
    yield* Console.log(`📁 Manifest path: ${manifestPath}`);
    yield* Console.log();
  });
}

function generateAllChainManifests(target: Indexer.GraphTarget, suppressFinalLog = false) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const manifestsDir = paths.graph.manifests(target);

    if (yield* fs.exists(manifestsDir)) {
      yield* fs
        .remove(manifestsDir, { recursive: true })
        .pipe(Effect.mapError(toFileOperationError(manifestsDir, "delete")));
    }
    yield* fs
      .makeDirectory(manifestsDir, { recursive: true })
      .pipe(Effect.mapError(toFileOperationError(manifestsDir, "write")));
    yield* fs
      .writeFileString(`${manifestsDir}/.gitkeep`, "")
      .pipe(Effect.mapError(toFileOperationError(`${manifestsDir}/.gitkeep`, "write")));

    const results: ManifestResult[] = [];

    for (const chainId of graphChains) {
      const chain = sablier.chains.get(chainId);
      const manifestPath = yield* Effect.either(writeManifestToFile(target, chainId));

      if (Either.isRight(manifestPath)) {
        results.push({
          chainId,
          chainName: chain?.name || "Unknown",
          manifestPath: manifestPath.right,
          status: "generated",
        });
      } else {
        results.push({
          chainId,
          chainName: chain?.name || "Unknown",
          manifestPath: "",
          status: "error",
        });
      }
    }

    if (results.length === 0) {
      return yield* Effect.fail(
        new Error(`No manifests generated for target ${_.capitalize(target)}. This is a bug.`)
      );
    }

    if (!suppressFinalLog) {
      yield* displayHeader(
        `📋 GENERATING GRAPH MANIFESTS: ${_.capitalize(target).toUpperCase()}`,
        "cyan"
      );

      yield* Console.log("");
      const table = createTable({
        colWidths: [25, 10, 50, 15],
        head: ["Chain Name", "Chain ID", "Manifest Path", "Status"],
        theme: "cyan",
      });

      for (const result of results) {
        const statusText =
          result.status === "generated" ? colors.success("✅ Generated") : colors.error("❌ Error");
        table.push([
          colors.value(result.chainName),
          colors.dim(result.chainId.toString()),
          colors.dim(result.manifestPath),
          statusText,
        ]);
      }

      yield* Console.log(table.toString());

      // Summary statistics
      const generated = results.filter((r) => r.status === "generated").length;
      const errors = results.filter((r) => r.status === "error").length;

      yield* Console.log("");
      const summaryTable = createTable({
        colWidths: [20, 10],
        head: ["Status", "Count"],
        theme: "cyan",
      });

      summaryTable.push(
        [colors.success("Generated"), colors.value(generated.toString())],
        [colors.error("Errors"), colors.value(errors.toString())],
        [chalk.white.bold("Total Manifests"), chalk.white.bold(results.length.toString())]
      );

      yield* Console.log(summaryTable.toString());

      yield* Console.log("");
      yield* Console.log(colors.success(`✅ Successfully generated ${generated} manifests`));
      yield* Console.log(colors.dim(`📁 Output directory: ${yield* getRelative(manifestsDir)}`));
    }

    return results.filter((r) => r.status === "generated").length;
  });
}

function generateAllIndexerManifests(chainArg: string) {
  return Effect.gen(function* () {
    let totalCount = 0;
    const targets = GRAPH_TARGETS;

    for (const target of targets) {
      if (chainArg === "all") {
        const filesGenerated = yield* generateAllChainManifests(target, true);
        totalCount += filesGenerated;
        yield* Console.log(
          `✅ Generated ${filesGenerated} manifests for ${_.capitalize(target)} target`
        );
        continue;
      }

      yield* generateManifest(target, chainArg);
    }

    if (chainArg === "all") {
      yield* Console.log(`🎉 Generated ${totalCount} manifests in total`);
      yield* Console.log();
    }
  });
}

export const handler = (options: {
  readonly indexer: "airdrops" | "streams" | "all";
  readonly chain: string;
}) =>
  Effect.gen(function* () {
    const targetArg = options.indexer;
    const chainArg = options.chain;

    if (targetArg === "all") {
      return yield* generateAllIndexerManifests(chainArg);
    }

    if (chainArg === "all") {
      yield* generateAllChainManifests(targetArg);
      return;
    }

    return yield* generateManifest(targetArg, chainArg);
  });
