import { Effect } from "effect";
import type { Indexer } from "../../../../../src/index.js";
import { getAirdropsSources } from "./airdrops.js";
import { getFlowSources } from "./flow.js";
import { getLockupSources } from "./lockup.js";
import { getStreamsSources } from "./streams.js";

export function createSources(protocol: Indexer.Protocol | "streams", chainId: number) {
  switch (protocol) {
    case "airdrops": {
      return getAirdropsSources(chainId);
    }
    case "flow": {
      return getFlowSources(chainId);
    }
    case "lockup": {
      return getLockupSources(chainId);
    }
    case "streams": {
      return getStreamsSources(chainId);
    }
    default: {
      return Effect.fail(new Error(`Unknown protocol: ${protocol}`));
    }
  }
}
