import type { Indexer } from "../types";
import { indexers } from "./data";

type I = Indexer;
type P = Indexer.Protocol;
type V = Indexer.Vendor;

export function getIndexer(opts: { chainId: number; protocol: P; vendor: V }): I | undefined {
  const { chainId, protocol, vendor } = opts;
  if (vendor === "envio") {
    return indexers.envio[protocol].find((c) => c.chainId === chainId);
  }
  return indexers.graph[protocol].find((c) => c.chainId === chainId);
}
export const getIndexerGraph = (opts: { chainId: number; protocol: P }): I | undefined =>
  getIndexer({ ...opts, vendor: "graph" });
export const getIndexerEnvio = (opts: { chainId: number; protocol: P }): I | undefined =>
  getIndexer({ ...opts, vendor: "envio" });
