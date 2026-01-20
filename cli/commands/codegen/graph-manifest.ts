/**
 * @file CLI for generating subgraph manifests
 *
 * @example
 * pnpm tsx cli codegen graph-manifest --indexer all --chain all
 * pnpm tsx cli codegen graph-manifest --indexer all --chain polygon
 * pnpm tsx cli codegen graph-manifest --indexer flow --chain polygon
 *
 * @param --indexer - Required: 'airdrops', 'flow', 'lockup', or 'all'
 * @param --chain - Required: The chain slug to generate manifests for.
 * Use 'all' to generate for all chains.
 */

import * as fs from "node:fs";
import { writeFileSync } from "node:fs";
import * as path from "node:path";
import { Command, Options } from "@effect/cli";
import chalk from "chalk";
import { Console, Effect } from "effect";
import _ from "lodash";
import { sablier } from "sablier";
import paths from "../../../lib/paths.js";
import type { Indexer } from "../../../src/index.js";
import { graphChains } from "../../../src/indexers/graph.js";
import { PROTOCOLS } from "../../constants.js";
import { colors, createTable, displayHeader } from "../../display-utils.js";
import * as helpers from "../../helpers.js";
import { createGraphManifest } from "./graph-manifest/index.js";

/* -------------------------------------------------------------------------- */
/*                                   OPTIONS                                  */
/* -------------------------------------------------------------------------- */

const indexerOption = Options.choice("indexer", [
  "airdrops",
  "flow",
  "lockup",
  "all",
] as const).pipe(
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
function writeManifestToFile(indexer: Indexer.Name, chainId: number): string {
  const manifest = createGraphManifest(indexer as Indexer.Protocol, chainId);
  const yaml = helpers.dumpYAML(manifest);
  const manifestPath = paths.graph.manifest(indexer as Indexer.Protocol, chainId);
  writeFileSync(manifestPath, yaml);

  return helpers.getRelative(manifestPath);
}

function generateManifest(
  indexer: Indexer.Name,
  chainArg: string
): Effect.Effect<void, Error, never> {
  return Effect.gen(function* () {
    const chain = yield* helpers.getChain(chainArg);
    const manifestsDir = paths.graph.manifests(indexer as Indexer.Protocol);
    fs.mkdirSync(manifestsDir, { recursive: true });

    const manifestPath = writeManifestToFile(indexer as Indexer.Protocol, chain.id);
    yield* Console.log(`✅ Generated subgraph manifest for ${chainArg}`);
    yield* Console.log(`📁 Manifest path: ${manifestPath}`);
    yield* Console.log();
  });
}

function generateAllChainManifests(
  indexer: Indexer.Name,
  suppressFinalLog = false
): Effect.Effect<number, Error, never> {
  return Effect.gen(function* () {
    const manifestsDir = paths.graph.manifests(indexer as Indexer.Protocol);

    if (fs.existsSync(manifestsDir)) {
      fs.rmSync(manifestsDir, { force: true, recursive: true });
    }
    fs.mkdirSync(manifestsDir, { recursive: true });
    fs.writeFileSync(path.join(manifestsDir, ".gitkeep"), "");

    const results: ManifestResult[] = [];

    for (const chainId of graphChains) {
      try {
        const manifestPath = writeManifestToFile(indexer as Indexer.Protocol, chainId);
        const chain = sablier.chains.get(chainId);
        results.push({
          chainId,
          chainName: chain?.name || "Unknown",
          manifestPath,
          status: "generated",
        });
      } catch {
        const chain = sablier.chains.get(chainId);
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
        new Error(`No manifests generated for indexer ${_.capitalize(indexer)}. This is a bug.`)
      );
    }

    if (!suppressFinalLog) {
      displayHeader(
        `📋 GENERATING GRAPH MANIFESTS: ${_.capitalize(indexer).toUpperCase()}`,
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
      yield* Console.log(colors.dim(`📁 Output directory: ${helpers.getRelative(manifestsDir)}`));
    }

    return results.filter((r) => r.status === "generated").length;
  });
}

function generateAllProtocolManifests(chainArg: string): Effect.Effect<void, Error, never> {
  return Effect.gen(function* () {
    let totalCount = 0;

    for (const p of PROTOCOLS) {
      if (chainArg === "all") {
        const filesGenerated = yield* generateAllChainManifests(p, true);
        totalCount += filesGenerated;
        yield* Console.log(
          `✅ Generated ${filesGenerated} manifests for ${_.capitalize(p)} protocol`
        );
        continue;
      }

      yield* generateManifest(p, chainArg);
    }

    if (chainArg === "all") {
      yield* Console.log(`🎉 Generated ${totalCount} manifests in total`);
      yield* Console.log();
    }
  });
}

const graphManifestLogic = (options: {
  readonly indexer: "airdrops" | "flow" | "lockup" | "all";
  readonly chain: string;
}) =>
  Effect.gen(function* () {
    const indexerArg = options.indexer;
    const chainArg = options.chain;

    if (indexerArg === "all") {
      return yield* generateAllProtocolManifests(chainArg);
    }

    if (chainArg === "all") {
      yield* generateAllChainManifests(indexerArg);
      return;
    }

    return yield* generateManifest(indexerArg, chainArg);
  });

export const graphManifestCommand = Command.make(
  "graph-manifest",
  { chain: chainOption, indexer: indexerOption },
  graphManifestLogic
);
