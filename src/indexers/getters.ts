import type { Indexer } from "../types.js";
import { indexers } from "./data.js";

type I = Indexer;
type K = Indexer.IndexerKey;
type V = Indexer.Vendor;

/**
 * Retrieves an indexer configuration by chain ID, indexer, and vendor.
 *
 * @param opts.chainId - The chain ID to look up
 * @param opts.indexer - The indexer key (airdrops or streams)
 * @param opts.vendor - The indexing vendor (envio or graph)
 * @returns The indexer configuration, or `undefined` if not found
 */
export function getIndexer(opts: { chainId: number; indexer: K; vendor: V }): I | undefined {
  const { chainId, indexer, vendor } = opts;
  const registry = vendor === "envio" ? indexers.envio[indexer] : indexers.graph[indexer];
  return registry?.find((c) => c.chainId === chainId);
}
/**
 * Retrieves a Graph indexer for the specified chain and indexer.
 *
 * Each Graph subgraph is deployed independently per chain, so each has a unique
 * endpoint URL specific to that chain.
 *
 * @param opts.chainId - The chain ID to look up
 * @param opts.indexer - The indexer key (airdrops or streams)
 * @returns The Graph indexer configuration, or `undefined` if not found
 */
export function getIndexerGraph(opts: { chainId: number; indexer: K }): I | undefined {
  return getIndexer({ ...opts, vendor: "graph" });
}
/**
 * Retrieves an Envio indexer for the specified chain and indexer.
 *
 * Returns the same endpoint URL for any chain on which Envio is supported, since the
 * deployments are multi-chain with a single shared endpoint per indexer.
 * Returns `undefined` for chains where Envio is unsupported.
 *
 * @param opts.chainId - The chain ID to look up
 * @param opts.indexer - The indexer key (airdrops or streams)
 * @returns The Envio indexer configuration, or `undefined` if the chain is unsupported
 */
export function getIndexerEnvio(opts: { chainId: number; indexer: K }): I | undefined {
  return getIndexer({ ...opts, vendor: "envio" });
}
