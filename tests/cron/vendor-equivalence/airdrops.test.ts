import { sepolia } from "sablier/dist/chains";
import { getExperimentalURL } from "../../../src/experimental";
import * as Envio from "../../../src/queries/airdrops/envio";
import * as Graph from "../../../src/queries/airdrops/graph";
import { createEquivalenceTest } from "./equivalence";

createEquivalenceTest({
  chainId: sepolia.id,
  endpoints: {
    envio: getExperimentalURL({ protocol: "airdrops", vendor: "envio" }),
    graph: getExperimentalURL({ protocol: "airdrops", vendor: "graph" }),
  },
  protocol: "airdrops",
  queries: {
    envio: [Envio.getCampaignsWithActivities, Envio.getActions],
    graph: [Graph.getCampaignsWithActivities, Graph.getActions],
  },
});
