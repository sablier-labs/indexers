import { GRAPH_SPEC_VERSION } from "./constants.js";
import type { GraphManifest } from "./manifest-types.js";
import type { GraphManifestProtocol } from "./protocol.js";

export const topSections: Record<GraphManifestProtocol, GraphManifest.TopSection> = {
  airdrops: get("Airdrops"),
  bob: get("Bob"),
  flow: get("Flow"),
  lockup: get("Lockup"),
};

function get(name: string): GraphManifest.TopSection {
  return {
    dataSources: [],
    description: `The Graph indexer for Sablier ${name}`,
    repository: "https://github.com/sablier-labs/indexers",
    schema: {
      file: `../${name.toLowerCase()}.graphql`,
    },
    specVersion: GRAPH_SPEC_VERSION,
  };
}
