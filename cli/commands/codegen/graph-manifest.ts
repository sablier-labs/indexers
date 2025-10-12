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
import type { Command } from "commander";
import * as fs from "fs-extra";
import _ from "lodash";
import paths from "../../../lib/paths";
import type { Indexer } from "../../../src";
import { graphChains } from "../../../src/indexers/graph";
import { PROTOCOLS } from "../../constants";
import * as helpers from "../../helpers";
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

  let filesGenerated = 0;
  for (const chainId of graphChains) {
    writeManifestToFile(indexer as Indexer.Protocol, chainId);
    filesGenerated++;
  }
  if (filesGenerated === 0) {
    throw new Error(`No manifests generated for indexer ${_.capitalize(indexer)}. This is a bug.`);
  }

  if (!suppressFinalLog) {
    console.log(`🎉 Generated ${filesGenerated} subgraph manifests for ${_.capitalize(indexer)} indexer`);
    console.log(`📁 Output directory: ${helpers.getRelative(manifestsDir)}`);
    console.log();
  }

  return filesGenerated;
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
