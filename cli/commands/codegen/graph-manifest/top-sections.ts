import type { Indexer } from "../../../../src/types.js";
import { GRAPH_SPEC_VERSION } from "./constants.js";
import type { GraphManifest } from "./manifest-types.js";

export const topSections: Record<Indexer.Protocol, GraphManifest.TopSection> = {
  airdrops: get("Airdrops"),
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
