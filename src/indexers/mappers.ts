import { Protocol } from "sablier/evm";
import type { Indexer } from "../types.js";

const INDEXER_KEY_BY_PROTOCOL = {
  airdrops: "airdrops",
  flow: "streams",
  lockup: "streams",
} as const satisfies Record<Indexer.Protocol, Indexer.IndexerKey>;

const PROTOCOL_BY_INDEXER_KEY = {
  airdrops: Protocol.Airdrops,
  streams: Protocol.Lockup,
} as const satisfies Record<Indexer.IndexerKey, Indexer.Protocol>;

/**
 * Returns the public indexer key that covers the given protocol.
 * Both `flow` and `lockup` collapse to `streams`.
 */
export function getIndexerKeyForProtocol(protocol: Indexer.Protocol): Indexer.IndexerKey {
  return INDEXER_KEY_BY_PROTOCOL[protocol];
}

/**
 * Returns the canonical underlying protocol for an indexer key.
 * `streams` resolves to Lockup because the shared subgraph / Envio deployment
 * is named after Lockup even though it also indexes Flow events.
 */
export function getProtocolForIndexerKey(indexer: Indexer.IndexerKey): Indexer.Protocol {
  return PROTOCOL_BY_INDEXER_KEY[indexer];
}
