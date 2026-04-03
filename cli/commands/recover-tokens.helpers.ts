import { Array as Arr, Order } from "effect";
import { isAddress } from "viem";
import type { Indexer } from "../../src/types.js";
import type { IndexedAssetFile } from "./query/assets.file.js";
import { getQueryAssetsFilePath, QUERY_ASSET_INDEXERS } from "./query/assets.file.js";

export type RecoverTokensProtocol = "flow" | "lockup";

export type RecoverTokensContractName = "SablierFlow" | "SablierLockup";

export type RecoverTokenDeltaRow = IndexedAssetFile["assets"][number] & {
  aggregateAmount: bigint;
  balance: bigint;
  delta: bigint;
};

const RECOVER_TOKENS_CONTRACT_NAMES: Record<RecoverTokensProtocol, RecoverTokensContractName> = {
  flow: "SablierFlow",
  lockup: "SablierLockup",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isQueryAssetIndexer(value: string): value is Indexer.IndexerKey {
  return QUERY_ASSET_INDEXERS.includes(value as Indexer.IndexerKey);
}

function parseInteger(value: unknown, field: string, options?: { minimum?: number }): number {
  const parsed = typeof value === "string" ? Number(value) : value;

  if (typeof parsed !== "number" || !Number.isInteger(parsed) || !Number.isSafeInteger(parsed)) {
    throw new Error(`Invalid ${field}`);
  }

  if (options?.minimum !== undefined && parsed < options.minimum) {
    throw new Error(`Invalid ${field}`);
  }

  return parsed;
}

function parseString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Invalid ${field}`);
  }

  return value;
}

function parseAssetMetadataString(value: unknown, field: string): string {
  if (typeof value !== "string") {
    throw new Error(`Invalid ${field}`);
  }

  return value;
}

function absBigInt(value: bigint): bigint {
  return value < 0n ? -value : value;
}

const RECOVER_TOKEN_ROW_DELTA_ORDER = Order.reverse(
  Order.mapInput(Order.bigint, (row: RecoverTokenDeltaRow) => absBigInt(row.delta))
);

const RECOVER_TOKEN_ROW_ADDRESS_ORDER = Order.mapInput(
  Order.string,
  (row: RecoverTokenDeltaRow) => row.address
);

export function getRecoverTokensContractName(
  protocol: RecoverTokensProtocol
): RecoverTokensContractName {
  return RECOVER_TOKENS_CONTRACT_NAMES[protocol];
}

export function getRecoverTokensAssetFileIndexer(
  _protocol: RecoverTokensProtocol
): Extract<Indexer.IndexerKey, "streams"> {
  return "streams";
}

export function getRecoverTokensDefaultFilePath(
  protocol: RecoverTokensProtocol,
  chainId: number,
  dateSegment: string
): string {
  return getQueryAssetsFilePath(getRecoverTokensAssetFileIndexer(protocol), chainId, dateSegment);
}

/**
 * Validates the JSON contract produced by `query-assets` before any RPC work starts.
 *
 * Parsing failures stay localized to the input file instead of surfacing later as harder-to-debug
 * multicall errors.
 */
export function parseIndexedAssetFile(content: string): IndexedAssetFile {
  const parsed = JSON.parse(content) as unknown;
  if (!isRecord(parsed)) {
    throw new Error("Invalid asset file");
  }

  const assetsValue = parsed.assets;
  if (!Array.isArray(assetsValue)) {
    throw new Error("Invalid assets");
  }

  const indexer = parseString(parsed.indexer, "indexer");
  if (!isQueryAssetIndexer(indexer)) {
    throw new Error("Invalid indexer");
  }

  const vendor = parseString(parsed.vendor, "vendor");
  if (vendor !== "envio") {
    throw new Error("Invalid vendor");
  }

  const assets = assetsValue.map((value) => {
    if (!isRecord(value)) {
      throw new Error("Invalid asset");
    }

    const address = parseString(value.address, "asset address");
    if (!isAddress(address)) {
      throw new Error(`Invalid asset address: ${address}`);
    }

    return {
      address,
      decimals: parseInteger(value.decimals, "asset decimals", { minimum: 0 }),
      name: parseAssetMetadataString(value.name, "asset name"),
      symbol: parseAssetMetadataString(value.symbol, "asset symbol"),
    };
  });

  return {
    assets,
    chainId: parseInteger(parsed.chainId, "chainId", { minimum: 1 }),
    chainName: parseString(parsed.chainName, "chainName"),
    chainSlug: parseString(parsed.chainSlug, "chainSlug"),
    generatedAt: parseString(parsed.generatedAt, "generatedAt"),
    indexer,
    vendor,
  };
}

/**
 * Joins `balanceOf` and `aggregateAmount` results by asset index and keeps only non-zero deltas.
 *
 * Failed RPC calls are counted as skipped rows, and the final list is ordered by absolute delta so
 * the largest discrepancies are shown first in the CLI output.
 */
export function computeRecoverTokenRows(opts: {
  aggregateAmountResults: readonly (bigint | null)[];
  assets: IndexedAssetFile["assets"];
  balanceResults: readonly (bigint | null)[];
}): {
  nonZeroCount: number;
  rows: RecoverTokenDeltaRow[];
  scannedCount: number;
  skippedCount: number;
} {
  const { aggregateAmountResults, assets, balanceResults } = opts;

  if (assets.length !== balanceResults.length || assets.length !== aggregateAmountResults.length) {
    throw new Error("Mismatched recover token result lengths");
  }

  const rows: RecoverTokenDeltaRow[] = [];
  let skippedCount = 0;

  for (let index = 0; index < assets.length; index += 1) {
    const asset = assets[index];
    const balance = balanceResults[index];
    const aggregateAmount = aggregateAmountResults[index];

    if (balance === null || aggregateAmount === null) {
      skippedCount += 1;
      continue;
    }

    const delta = balance - aggregateAmount;
    if (delta === 0n) {
      continue;
    }

    rows.push({
      ...asset,
      aggregateAmount,
      balance,
      delta,
    });
  }

  return {
    nonZeroCount: rows.length,
    rows: Arr.sortBy(RECOVER_TOKEN_ROW_DELTA_ORDER, RECOVER_TOKEN_ROW_ADDRESS_ORDER)(rows),
    scannedCount: assets.length,
    skippedCount,
  };
}
