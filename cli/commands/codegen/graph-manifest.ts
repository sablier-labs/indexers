/**
 * @file CLI for generating subgraph manifests
 *
 * @example
 * pnpm tsx cli codegen graph-manifest --indexer all --chain all
 * pnpm tsx cli codegen graph-manifest --indexer all --chain polygon
 * pnpm tsx cli codegen graph-manifest --indexer streams --chain polygon
 *
 * @param --indexer - Required: 'airdrops', 'streams', or 'all'
 * @param --chain - Required: The chain slug to generate manifests for.
 * Use 'all' to generate for all chains.
 */

import { Command, Options } from "@effect/cli";
import { FileSystem } from "@effect/platform";
import chalk from "chalk";
import { Console, Effect, Either } from "effect";
import _ from "lodash";
import { sablier } from "sablier";
import type { Indexer } from "../../../src/index.js";
import { graphChains } from "../../../src/indexers/graph.js";
import { GRAPH_TARGET_OPTIONS, GRAPH_TARGETS } from "../../constants.js";
import { colors, createTable, displayHeader } from "../../display.js";
import * as helpers from "../../helpers.js";
import paths from "../../paths.js";
import { createGraphManifest } from "./graph-manifest/index.js";
import { dumpYAML } from "./helpers.js";

/* -------------------------------------------------------------------------- */
/*                                   OPTIONS                                  */
/* -------------------------------------------------------------------------- */

const indexerOption = Options.choice("indexer", GRAPH_TARGET_OPTIONS).pipe(
  Options.withAlias("i"),
  Options.withDescription("Indexer to generate manifest for")
);

const chainOption = Options.text("chain").pipe(
  Options.withAlias("c"),
  Options.withDescription('Chain slug (use "all" for all chains)')
);

/* -------------------------------------------------------------------------- */
/*                                   COMMAND                                  */
/* -------------------------------------------------------------------------- */

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
    yield* fs.writeFileString(manifestPath, yaml);

    return yield* helpers.getRelative(manifestPath);
  });
}

function generateManifest(target: Indexer.GraphTarget, chainArg: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const chain = yield* helpers.getChain(chainArg);
    const manifestsDir = paths.graph.manifests(target);
    yield* fs.makeDirectory(manifestsDir, { recursive: true });

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
      yield* fs.remove(manifestsDir, { recursive: true });
    }
    yield* fs.makeDirectory(manifestsDir, { recursive: true });
    yield* fs.writeFileString(`${manifestsDir}/.gitkeep`, "");

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
      yield* Console.log(
        colors.dim(`📁 Output directory: ${yield* helpers.getRelative(manifestsDir)}`)
      );
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

const graphManifestLogic = (options: {
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

export const graphManifestCommand = Command.make(
  "graph-manifest",
  { chain: chainOption, indexer: indexerOption },
  graphManifestLogic
);
