import type { Indexer } from "../../src/types";
import { GRAPH_SPEC_VERSION } from "./constants";
import type { GraphManifest } from "./manifest-types";

export const topSections: Record<Indexer.Protocol, GraphManifest.TopSection> = {
  airdrops: get("Airdrops"),
  flow: get("Flow"),
  lockup: get("Lockup"),
};

function get(name: string): GraphManifest.TopSection {
  return {
    description: `The Graph indexer for Sablier ${name}`,
    repository: "https://github.com/sablier-labs/indexers",
    specVersion: GRAPH_SPEC_VERSION,
    schema: {
      file: "../schema.graphql",
    },
    dataSources: [],
  };
}
