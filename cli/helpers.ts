import * as path from "node:path";
import { Effect } from "effect";
import type { Sablier } from "sablier";
import { sablier } from "sablier";
import stripAnsi from "strip-ansi";
import { INDEXERS, VENDORS } from "./constants.js";
import { ChainNotFoundError, ValidationError } from "./errors.js";
import type { IndexerArg, VendorArg } from "./types.js";

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

/**
 * Wrap long tokens like URLs so cli-table3 doesn't split ANSI escape sequences.
 */
export function wrapText(value: string, maxWidth: number): string {
  if (maxWidth <= 0 || value.length <= maxWidth) {
    return value;
  }

  const breakChars = ["/", "?", "&", "#", "=", "-", "_", "."];
  const chunks: string[] = [];
  let start = 0;

  while (start < value.length) {
    const end = Math.min(start + maxWidth, value.length);
    if (end === value.length) {
      chunks.push(value.slice(start));
      break;
    }

    const slice = value.slice(start, end);
    let breakIndex = -1;
    for (const char of breakChars) {
      const index = slice.lastIndexOf(char);
      if (index > breakIndex) {
        breakIndex = index;
      }
    }

    if (breakIndex <= 0) {
      chunks.push(slice);
      start = end;
      continue;
    }

    const splitAt = start + breakIndex + 1;
    chunks.push(value.slice(start, splitAt));
    start = splitAt;
  }

  return chunks.join("\n");
}
