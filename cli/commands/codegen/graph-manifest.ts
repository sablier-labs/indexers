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

import * as path from "node:path";
import chalk from "chalk";
import type { Command } from "commander";
import * as fs from "fs-extra";
import _ from "lodash";
import { sablier } from "sablier";
import paths from "../../../lib/paths";
import type { Indexer } from "../../../src";
import { graphChains } from "../../../src/indexers/graph";
import { PROTOCOLS } from "../../constants";
import * as helpers from "../../helpers";
import { colors, createTable, displayHeader } from "../../shared/display-utils";
import { createGraphManifest } from "./graph-manifest/index";

/* -------------------------------------------------------------------------- */
/*                                  COMMAND                                   */
/* -------------------------------------------------------------------------- */

function createGraphManifestCommand(): Command {
  const command = helpers.createBaseCmd("Generate subgraph manifests");
  helpers.addIndexerOpt(command);
  helpers.addChainOpt(command);

  command.action(async (options) => {
    const indexerArg = helpers.parseIndexerOpt(options.indexer);
    const chainArg = helpers.parseChainOpt(options.chain);

    if (indexerArg === "analytics") {
      return;
    }

    if (indexerArg === "all") {
      generateAllProtocolManifests(chainArg);
      return;
    }

    if (chainArg === "all") {
      generateAllChainManifests(indexerArg);
      return;
    }

    generateManifest(indexerArg, chainArg);
  });

  return command;
}

export const graphManifestCmd = createGraphManifestCommand();

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

function generateAllProtocolManifests(chainArg: string) {
  let totalCount = 0;

  for (const p of PROTOCOLS) {
    if (chainArg === "all") {
      const filesGenerated = generateAllChainManifests(p, true);
      totalCount += filesGenerated;
      console.log(`✅ Generated ${filesGenerated} manifests for ${_.capitalize(p)} protocol`);
      continue;
    }

    generateManifest(p, chainArg);
  }

  if (chainArg === "all") {
    console.log(`🎉 Generated ${totalCount} manifests in total`);
    console.log();
  }
}

function generateAllChainManifests(indexer: Indexer.Name, suppressFinalLog = false): number {
  const manifestsDir = paths.graph.manifests(indexer as Indexer.Protocol);

  if (fs.pathExistsSync(manifestsDir)) {
    fs.emptyDirSync(manifestsDir);
    fs.ensureFileSync(path.join(manifestsDir, ".gitkeep"));
  }

  type ManifestResult = {
    chainId: number;
    chainName: string;
    manifestPath: string;
    status: "generated" | "error";
  };

  const results: ManifestResult[] = [];

  for (const chainId of graphChains) {
    try {
      const manifestPath = writeManifestToFile(indexer as Indexer.Protocol, chainId);
      const chain = sablier.chains.get(chainId);
      results.push({ chainId, chainName: chain?.name || "Unknown", manifestPath, status: "generated" });
    } catch {
      const chain = sablier.chains.get(chainId);
      results.push({ chainId, chainName: chain?.name || "Unknown", manifestPath: "", status: "error" });
    }
  }

  if (results.length === 0) {
    throw new Error(`No manifests generated for indexer ${_.capitalize(indexer)}. This is a bug.`);
  }

  if (!suppressFinalLog) {
    displayHeader(`📋 GENERATING GRAPH MANIFESTS: ${_.capitalize(indexer).toUpperCase()}`, "cyan");

    console.log("");
    const table = createTable({
      colWidths: [25, 10, 50, 15],
      head: ["Chain Name", "Chain ID", "Manifest Path", "Status"],
      theme: "cyan",
    });

    for (const result of results) {
      const statusText = result.status === "generated" ? colors.success("✅ Generated") : colors.error("❌ Error");
      table.push([
        colors.value(result.chainName),
        colors.dim(result.chainId.toString()),
        colors.dim(result.manifestPath),
        statusText,
      ]);
    }

    console.log(table.toString());

    // Summary statistics
    const generated = results.filter((r) => r.status === "generated").length;
    const errors = results.filter((r) => r.status === "error").length;

    console.log("");
    const summaryTable = createTable({
      colWidths: [20, 10],
      head: ["Status", "Count"],
      theme: "cyan",
    });

    summaryTable.push(
      [colors.success("Generated"), colors.value(generated.toString())],
      [colors.error("Errors"), colors.value(errors.toString())],
      [chalk.white.bold("Total Manifests"), chalk.white.bold(results.length.toString())],
    );

    console.log(summaryTable.toString());

    console.log("");
    console.log(colors.success(`✅ Successfully generated ${generated} manifests`));
    console.log(colors.dim(`📁 Output directory: ${helpers.getRelative(manifestsDir)}`));
  }

  return results.filter((r) => r.status === "generated").length;
}

function generateManifest(indexer: Indexer.Name, chainArg: string): void {
  const chain = helpers.getChain(chainArg);
  const manifestsDir = paths.graph.manifests(indexer as Indexer.Protocol);
  fs.ensureDirSync(manifestsDir);

  const manifestPath = writeManifestToFile(indexer as Indexer.Protocol, chain.id);
  console.log(`✅ Generated subgraph manifest for ${chainArg}`);
  console.log(`📁 Manifest path: ${manifestPath}`);
  console.log();
}

/**
 * Writes the subgraph manifest to a file.
 * @returns The relative path to the manifest file.
 */
function writeManifestToFile(indexer: Indexer.Name, chainId: number): string {
  const manifest = createGraphManifest(indexer as Indexer.Protocol, chainId);
  const yaml = helpers.dumpYAML(manifest);
  const manifestPath = paths.graph.manifest(indexer as Indexer.Protocol, chainId);
  fs.writeFileSync(manifestPath, yaml);

  return helpers.getRelative(manifestPath);
}
