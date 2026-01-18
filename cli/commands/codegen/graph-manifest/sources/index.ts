import type { Indexer } from "../../../../../src/index.js";
import type { GraphManifest } from "../manifest-types.js";
import { getAirdropsSources } from "./airdrops.js";
import { getFlowSources } from "./flow.js";
import { getLockupSources } from "./lockup.js";

export function createSources(protocol: Indexer.Protocol, chainId: number): GraphManifest.Source[] {
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
    default: {
      throw new Error(`Unknown protocol: ${protocol}`);
    }
  }
}
