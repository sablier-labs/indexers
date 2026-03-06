import path from "node:path";
import { Array as Arr, Order } from "effect";
import { sablier } from "sablier";
import type { Indexer } from "../../../src/types.js";
import paths from "../../paths.js";

export type QueryIndexerAssetsProtocol = Extract<Indexer.Protocol, "flow" | "lockup">;

export type IndexedAsset = {
  address: string;
  chainId: number;
  decimals: number;
  id: string;
  name: string;
  symbol: string;
};

export type IndexedAssetFileAsset = {
  address: string;
  decimals: number;
  name: string;
  symbol: string;
};

export type IndexedAssetFile = {
  assets: IndexedAssetFileAsset[];
  chainId: number;
  chainName: string;
  chainSlug: string;
  generatedAt: string;
  indexer: QueryIndexerAssetsProtocol;
  vendor: "envio";
};

const CHAIN_ENTRY_ORDER = Order.mapInput(
  Order.number,
  (entry: readonly [number, Map<string, IndexedAssetFileAsset>]) => entry[0]
);

const INDEXED_ASSET_FILE_ASSET_ORDER = Order.mapInput(
  Order.string,
  (asset: IndexedAssetFileAsset) => asset.address
);

/**
 * Groups the flat Envio asset stream into one deterministic JSON payload per chain.
 *
 * Addresses are keyed case-insensitively so mixed-case duplicates collapse into a
 * single entry before the final file is sorted and written.
 */
export function buildIndexerAssetFiles(
  indexer: QueryIndexerAssetsProtocol,
  assets: readonly IndexedAsset[],
  generatedAt = new Date().toISOString()
): IndexedAssetFile[] {
  const assetsByChain = new Map<number, Map<string, IndexedAssetFileAsset>>();

  for (const asset of assets) {
    const chainAssets =
      assetsByChain.get(asset.chainId) ?? new Map<string, IndexedAssetFileAsset>();
    chainAssets.set(asset.address.toLowerCase(), {
      address: asset.address,
      decimals: asset.decimals,
      name: asset.name,
      symbol: asset.symbol,
    });
    assetsByChain.set(asset.chainId, chainAssets);
  }

  return Arr.map(
    Arr.sort(CHAIN_ENTRY_ORDER)(Arr.fromIterable(assetsByChain.entries())),
    ([chainId, chainAssets]) => {
      const chain = sablier.chains.getOrThrow(chainId);

      return {
        assets: Arr.sort(INDEXED_ASSET_FILE_ASSET_ORDER)(Arr.fromIterable(chainAssets.values())),
        chainId,
        chainName: chain.name,
        chainSlug: chain.slug,
        generatedAt,
        indexer,
        vendor: "envio",
      } satisfies IndexedAssetFile;
    }
  );
}

export function getQueryIndexerAssetsFilePath(
  indexer: QueryIndexerAssetsProtocol,
  chainId: number
): string {
  const chain = sablier.chains.getOrThrow(chainId);
  return paths.generated.queryAssets.file(indexer, chain.slug);
}

/**
 * Finds previously generated per-chain JSON files that are absent from the latest export.
 *
 * `query-indexer-assets` removes these files so downstream commands do not keep using
 * stale snapshots for chains that Envio no longer returns.
 */
export function getStaleQueryIndexerAssetFilePaths(
  indexer: QueryIndexerAssetsProtocol,
  existingEntries: readonly string[],
  files: readonly Pick<IndexedAssetFile, "chainId">[]
): string[] {
  const expectedOutputPaths = new Set(
    Arr.map(files, (file) => getQueryIndexerAssetsFilePath(indexer, file.chainId))
  );

  return existingEntries
    .filter((entry) => entry.endsWith(".json"))
    .map((entry) => path.join(paths.generated.queryAssets.indexerDir(indexer), entry))
    .filter((outputPath) => !expectedOutputPaths.has(outputPath))
    .sort((pathA, pathB) => pathA.localeCompare(pathB));
}
