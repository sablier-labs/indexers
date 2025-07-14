import { chains } from "sablier";
import { getExperimentalURL } from "../../../src/experimental";
import * as Envio from "../../../src/exports/queries/airdrops/envio";
import * as Graph from "../../../src/exports/queries/airdrops/graph";
import { createEquivalenceTest } from "./equivalence";

createEquivalenceTest({
  chainId: chains.sepolia.id,
  endpoints: {
    envio: getExperimentalURL({ protocol: "airdrops", vendor: "envio" }),
    graph: getExperimentalURL({ protocol: "airdrops", vendor: "graph" }),
  },
  protocol: "airdrops",
  queries: {
    envio: Envio.getCampaignsWithActionsAndActivities,
    graph: Graph.getCampaignsWithActionsAndActivities,
  },
});
