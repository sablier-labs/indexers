import { chains } from "sablier";
import { describe } from "vitest";
import * as Envio from "../../src/exports/queries/airdrops/envio";
import * as Graph from "../../src/exports/queries/airdrops/graph";
import { getExperimentalEndpointURL } from "../../src/helpers";
import { createEquivalenceTest } from "./equivalence";

describe("GraphQL data equivalence between Airdrops indexers", () => {
  createEquivalenceTest({
    chainId: chains.sepolia.id,
    endpoints: {
      envio: getExperimentalEndpointURL({ protocol: "airdrops", vendor: "envio" }),
      graph: getExperimentalEndpointURL({ protocol: "airdrops", vendor: "graph" }),
    },
    queries: {
      envio: Envio.getCampaignsWithActionsAndActivities,
      graph: Graph.getCampaignsWithActionsAndActivities,
    },
  });
});
