import type { Indexer } from "../../../../../src/index.js";
import { getAirdropsSources } from "./airdrops.js";
import { getStreamsSources } from "./streams.js";

export function createSources(target: Indexer.GraphTarget, chainId: number) {
  switch (target) {
    case "airdrops": {
      return getAirdropsSources(chainId);
    }
    case "streams": {
      return getStreamsSources(chainId);
    }
  }
}
