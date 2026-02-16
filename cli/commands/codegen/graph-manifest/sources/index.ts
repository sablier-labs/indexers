import type { GraphManifest } from "../manifest-types.js";
import type { GraphManifestProtocol } from "../protocol.js";
import { getAirdropsSources } from "./airdrops.js";
import { getBobSources } from "./bob.js";
import { getFlowSources } from "./flow.js";
import { getLockupSources } from "./lockup.js";

export function createSources(
  protocol: GraphManifestProtocol,
  chainId: number
): GraphManifest.Source[] {
  switch (protocol) {
    case "airdrops": {
      return getAirdropsSources(chainId);
    }
    case "bob": {
      return getBobSources(chainId);
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
