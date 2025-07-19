import type { Types } from "../../lib/types";
import { GRAPH_SPEC_VERSION } from "./constants";
import type { GraphManifest } from "./manifest-types";

export const topSections: Record<Types.Protocol, GraphManifest.TopSection> = {
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
      file: "../schema.graphql",
    },
    specVersion: GRAPH_SPEC_VERSION,
  };
}
