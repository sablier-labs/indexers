import { Effect } from "effect";
import type { Sablier } from "sablier";
import { sablier } from "sablier";
import { TARGETS, VENDORS } from "./constants.js";
import { ChainNotFoundError, ValidationError } from "./errors.js";
import type { TargetArg, VendorArg } from "./types.js";

export function parseTargetOpt(
  indexerValue: string | undefined
): Effect.Effect<TargetArg, ValidationError> {
  if (!indexerValue) {
    return Effect.fail(
      new ValidationError({
        field: "indexer",
        message: "--indexer is required. Use 'all' to target all indexers.",
      })
    );
  }

  if (![...TARGETS, "all"].includes(indexerValue)) {
    return Effect.fail(
      new ValidationError({
        field: "indexer",
        message: `--indexer must be either ${TARGETS.join(", ")}, or "all"`,
      })
    );
  }

  return Effect.succeed(indexerValue as TargetArg);
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
