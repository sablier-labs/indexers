import * as path from "node:path";
import { Effect } from "effect";
import * as yaml from "js-yaml";
import type { Sablier } from "sablier";
import { sablier } from "sablier";
import stripAnsi from "strip-ansi";
import type { EnvioConfig } from "./commands/codegen/envio-config/config-types.js";
import type { GraphManifest } from "./commands/codegen/graph-manifest/manifest-types.js";
import { AUTOGEN_COMMENT, INDEXERS, VENDORS } from "./constants.js";
import { ChainNotFoundError, ValidationError } from "./errors.js";
import type { ChainArg, IndexerArg, VendorArg } from "./types.js";

export function parseChainOpt(
  chainValue: string | undefined
): Effect.Effect<ChainArg, ValidationError | ChainNotFoundError> {
  if (!chainValue) {
    return Effect.fail(
      new ValidationError({
        field: "chain",
        message: "--chain is required. Use 'all' to target all chains.",
      })
    );
  }

  if (chainValue === "all") {
    return Effect.succeed("all");
  }

  return getChain(chainValue).pipe(Effect.map(() => chainValue as ChainArg));
}

export function parseIndexerOpt(
  indexerValue: string | undefined
): Effect.Effect<IndexerArg, ValidationError> {
  if (!indexerValue) {
    return Effect.fail(
      new ValidationError({
        field: "indexer",
        message: "--indexer is required. Use 'all' to target all indexers.",
      })
    );
  }

  if (![...INDEXERS, "all"].includes(indexerValue)) {
    return Effect.fail(
      new ValidationError({
        field: "indexer",
        message: `--indexer must be either ${INDEXERS.join(", ")}, or "all"`,
      })
    );
  }

  return Effect.succeed(indexerValue as IndexerArg);
}

export function parseVendorOpt(
  vendorValue: string | undefined
): Effect.Effect<VendorArg, ValidationError> {
  if (!vendorValue) {
    return Effect.fail(
      new ValidationError({
        field: "vendor",
        message: "--vendor is required. Use 'all' to target all vendors.",
      })
    );
  }

  if (![...VENDORS, "all"].includes(vendorValue)) {
    return Effect.fail(
      new ValidationError({
        field: "vendor",
        message: `--vendor must be either ${VENDORS.join(", ")}, or "all"`,
      })
    );
  }

  return Effect.succeed(vendorValue as VendorArg);
}

export function dumpYAML(input: GraphManifest.TopSection | EnvioConfig.TopSection): string {
  const yamlContent = yaml.dump(input, {
    forceQuotes: true, // Force quotes for all strings
    lineWidth: -1, // Prevent line wrapping
    quotingType: '"', // Use double quotes for strings
  });

  return `${AUTOGEN_COMMENT}${yamlContent}`;
}

export function getChain(chainArg: string): Effect.Effect<Sablier.Chain, ChainNotFoundError> {
  const chain = sablier.chains.getBySlug(chainArg);
  if (!chain) {
    return Effect.fail(new ChainNotFoundError({ chainSlug: chainArg }));
  }
  return Effect.succeed(chain);
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
