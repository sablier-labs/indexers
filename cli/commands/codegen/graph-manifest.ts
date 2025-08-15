/**
 * @file CLI for generating subgraph manifests
 *
 * @example
 * pnpm tsx cli codegen graph-manifest --protocol all --chain all
 * pnpm tsx cli codegen graph-manifest --protocol all --chain polygon
 * pnpm tsx cli codegen graph-manifest --protocol flow --chain polygon
 *
 * @param --protocol - Required: 'airdrops', 'flow', 'lockup', or 'all'
 * @param --chain - Required: The chain slug to generate manifests for.
 * Use 'all' to generate for all chains.
 */

import * as path from "node:path";
import type { Command } from "commander";
import * as fs from "fs-extra";
import _ from "lodash";
import { createGraphManifest } from "../../../codegen/graph-manifest";
import paths from "../../../lib/paths";
import type { Types } from "../../../lib/types";
import { graphChains } from "../../../src/indexers/graph";
import { PROTOCOLS } from "../../constants";
import * as helpers from "../../helpers";

/* -------------------------------------------------------------------------- */
/*                                  COMMAND                                   */
/* -------------------------------------------------------------------------- */

export function createGraphManifestCommand(): Command {
  const command = helpers.createBaseCmd("Generate subgraph manifests");
  helpers.addProtocolOpt(command);
  helpers.addChainOpt(command);

  command.action(async (options) => {
    const protocolArg = helpers.parseProtocolOpt(options.protocol);
    const chainArg = helpers.parseChainOpt(options.chain);

    if (protocolArg === "all") {
      generateAllProtocolManifests(chainArg);
      return;
    }

    if (chainArg === "all") {
      generateAllChainManifests(protocolArg);
      return;
    }

    generateManifest(protocolArg, chainArg);
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

function generateAllChainManifests(protocol: Types.Protocol, suppressFinalLog = false): number {
  const manifestsDir = paths.graph.manifests(protocol);

  if (fs.pathExistsSync(manifestsDir)) {
    fs.emptyDirSync(manifestsDir);
    fs.ensureFileSync(path.join(manifestsDir, ".gitkeep"));
  }

  let filesGenerated = 0;
  for (const chainId of graphChains) {
    writeManifestToFile(protocol, chainId);
    filesGenerated++;
  }
  if (filesGenerated === 0) {
    throw new Error(`No manifests generated for protocol ${_.capitalize(protocol)}. This is a bug.`);
  }

  if (!suppressFinalLog) {
    console.log(`🎉 Generated ${filesGenerated} subgraph manifests for ${_.capitalize(protocol)} protocol`);
    console.log(`📁 Output directory: ${helpers.getRelative(manifestsDir)}`);
    console.log();
  }

  return filesGenerated;
}

function generateManifest(protocol: Types.Protocol, chainArg: string): void {
  const chain = helpers.getChain(chainArg);
  const manifestsDir = paths.graph.manifests(protocol);
  fs.ensureDirSync(manifestsDir);

  const manifestPath = writeManifestToFile(protocol, chain.id);
  console.log(`✅ Generated subgraph manifest for ${chainArg}`);
  console.log(`📁 Manifest path: ${manifestPath}`);
  console.log();
}

/**
 * Writes the subgraph manifest to a file.
 * @returns The relative path to the manifest file.
 */
function writeManifestToFile(protocol: Types.Protocol, chainId: number): string {
  const manifest = createGraphManifest(protocol, chainId);
  const yaml = helpers.dumpYAML(manifest);
  const manifestPath = paths.graph.manifest(protocol, chainId);
  fs.writeFileSync(manifestPath, yaml);

  return helpers.getRelative(manifestPath);
}
