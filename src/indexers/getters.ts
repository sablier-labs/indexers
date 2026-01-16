import type { Indexer } from "../types";
import { indexers } from "./data";

type I = Indexer;
type P = Indexer.Protocol;
type V = Indexer.Vendor;

/**
 * Retrieves an indexer configuration by chain ID, protocol, and vendor.
 *
 * @param opts.chainId - The chain ID to look up
 * @param opts.protocol - The Sablier protocol (airdrops, flow, or lockup)
 * @param opts.vendor - The indexing vendor (envio or graph)
 * @returns The indexer configuration, or `undefined` if not found
 */
export function getIndexer(opts: { chainId: number; protocol: P; vendor: V }): I | undefined {
  const { chainId, protocol, vendor } = opts;
  if (vendor === "envio") {
    return indexers.envio[protocol].find((c) => c.chainId === chainId);
  }
  return indexers.graph[protocol].find((c) => c.chainId === chainId);
}
/**
 * Retrieves a Graph indexer for the specified chain and protocol.
 *
 * Each Graph subgraph is deployed independently per chain, so each has a unique
 * endpoint URL specific to that chain.
 *
 * @param opts.chainId - The chain ID to look up
 * @param opts.protocol - The Sablier protocol (airdrops, flow, or lockup)
 * @returns The Graph indexer configuration, or `undefined` if not found
 */
export function getIndexerGraph(opts: { chainId: number; protocol: P }): I | undefined {
  return getIndexer({ ...opts, vendor: "graph" });
}
/**
 * Retrieves an Envio indexer for the specified chain and protocol.
 *
 * Returns the same endpoint URL for any chain on which Envio is supported, since
 * Envio deployments are multi-chain with a single shared endpoint per protocol.
 * Returns `undefined` for chains where Envio is unsupported.
 *
 * @param opts.chainId - The chain ID to look up
 * @param opts.protocol - The Sablier protocol (airdrops, flow, or lockup)
 * @returns The Envio indexer configuration, or `undefined` if the chain is unsupported
 */
export function getIndexerEnvio(opts: { chainId: number; protocol: P }): I | undefined {
  return getIndexer({ ...opts, vendor: "envio" });
}
