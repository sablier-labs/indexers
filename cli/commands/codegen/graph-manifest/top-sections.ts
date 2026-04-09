import { GRAPH_SPEC_VERSION } from "./constants.js";
import type { GraphManifest } from "./manifest-types.js";

export const topSections: Record<string, GraphManifest.TopSection> = {
  airdrops: get("Airdrops"),
  streams: get("Streams"),
};

function get(name: string): GraphManifest.TopSection {
  return {
    description: `The Graph indexer for Sablier ${name}`,
    repository: "https://github.com/sablier-labs/indexers",
    specVersion: GRAPH_SPEC_VERSION,
    schema: {
      file: `../${name.toLowerCase()}.graphql`,
    },
    dataSources: [],
  };
}
