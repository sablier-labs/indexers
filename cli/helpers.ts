import * as path from "node:path";
import { Command } from "commander";
import * as yaml from "js-yaml";
import type { Sablier } from "sablier";
import { sablier } from "sablier";
import stripAnsi from "strip-ansi";
import type { EnvioConfig } from "../codegen/envio-config/config-types";
import type { GraphManifest } from "../codegen/graph-manifest/manifest-types";
import { AUTOGEN_COMMENT, INDEXERS, VENDORS } from "./constants";
import type { ChainArg, IndexerArg, VendorArg } from "./types";

export function addChainOpt(command: Command): Command {
  return command.option("-c, --chain <string>", 'chain slug (use "all" for all chains)');
}

export function addIndexerOpt(command: Command): Command {
  return command.option("-i, --indexer <string>", `${INDEXERS.join(", ")}, or "all"`);
}

export function addVendorOpt(command: Command): Command {
  return command.option("-v, --vendor <string>", `${VENDORS.join(", ")}, or "all"`);
}

export function createBaseCmd(description: string): Command {
  return new Command()
    .description(description)
    .helpOption("-h, --help", "display help for command")
    .option("--verbose", "enable verbose logging");
}

export function parseChainOpt(chainValue: string | undefined): ChainArg {
  if (!chainValue) {
    throw new Error("--chain is required. Use 'all' to target all chains.");
  }

  if (chainValue === "all") {
    return "all";
  }

  getChain(chainValue);
  return chainValue as ChainArg;
}

export function parseIndexerOpt(indexerValue: string | undefined): IndexerArg {
  if (!indexerValue) {
    throw new Error("--indexer is required. Use 'all' to target all indexers.");
  }

  if (![...INDEXERS, "all"].includes(indexerValue)) {
    throw new Error(`--indexer must be either ${INDEXERS.join(", ")}, or "all"`);
  }

  return indexerValue as IndexerArg;
}
export function parseVendorOpt(vendorValue: string | undefined): VendorArg {
  if (!vendorValue) {
    throw new Error("--vendor is required. Use 'all' to target all vendors.");
  }

  if (![...VENDORS, "all"].includes(vendorValue)) {
    throw new Error(`--vendor must be either ${VENDORS.join(", ")}, or "all"`);
  }

  return vendorValue as VendorArg;
}

export function dumpYAML(input: GraphManifest.TopSection | EnvioConfig.TopSection): string {
  const yamlContent = yaml.dump(input, {
    forceQuotes: true, // Force quotes for all strings
    lineWidth: -1, // Prevent line wrapping
    quotingType: '"', // Use double quotes for strings
  });

  return `${AUTOGEN_COMMENT}${yamlContent}`;
}

export function getChain(chainArg: string): Sablier.Chain {
  const chain = sablier.chains.getBySlug(chainArg);
  if (!chain) {
    const availableChains = sablier.chains
      .getAll()
      .map((c) => c.slug)
      .join(", ");
    throw new Error(`Chain "${chainArg}" is not supported.\nAvailable chains: ${availableChains}`);
  }
  return chain;
}

export function getRelative(absolutePath: string): string {
  return `./${path.relative(process.cwd(), absolutePath)}`;
}

export function extractDeploymentId(stdout: string): string | undefined {
  const lines = stripAnsi(stdout).split("\n");

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("Build completed:")) {
      const deploymentId = trimmedLine.replace("Build completed:", "").trim();
      return deploymentId;
    }
  }

  return undefined;
}
