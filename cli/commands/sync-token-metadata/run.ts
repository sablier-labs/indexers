import type { Option } from "effect";
import type { Indexer } from "../../../src/types.js";
import { handler as refreshCaches } from "../refresh-caches/run.js";

export const handler = (options: {
  readonly chainId: Option.Option<number>;
  readonly dryRun: boolean;
  readonly indexer: Indexer.IndexerKey;
}) =>
  refreshCaches({
    cacheTypes: ["tokenMetadata"],
    chainId: options.chainId,
    dryRun: options.dryRun,
    indexer: options.indexer,
  });
