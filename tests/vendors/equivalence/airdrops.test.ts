import { sepolia } from "sablier/evm/chains";
import { getIndexer } from "../../../src/indexers/getters";
import * as Envio from "../../../src/queries/airdrops/envio";
import * as Graph from "../../../src/queries/airdrops/graph";
import { createEquivalenceTest } from "./create-test";

createEquivalenceTest({
  chainId: sepolia.id,
  endpoints: {
    envio: getIndexer({ chainId: sepolia.id, protocol: "airdrops", vendor: "envio" })!.endpoint.url,
    graph: getIndexer({ chainId: sepolia.id, protocol: "airdrops", vendor: "graph" })!.endpoint.url,
  },
  protocol: "airdrops",
  queries: {
    envio: [Envio.getCampaignsWithActivities, Envio.getActions],
    graph: [Graph.getCampaignsWithActivities, Graph.getActions],
  },
});
