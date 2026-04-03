import { sepolia } from "sablier/evm/chains";
import { getIndexer } from "../../../src/indexers/getters.js";
import { createEquivalenceTest } from "./create-test.js";
import { AirdropsEnvio, AirdropsGraph } from "./queries.js";

createEquivalenceTest({
  chainId: sepolia.id,
  protocol: "airdrops",
  endpoints: {
    envio: getIndexer({ chainId: sepolia.id, indexer: "airdrops", vendor: "envio" })!.endpoint.url,
    graph: getIndexer({ chainId: sepolia.id, indexer: "airdrops", vendor: "graph" })!.endpoint.url,
  },
  queries: {
    envio: [AirdropsEnvio.getCampaignsWithActivities, AirdropsEnvio.getActions],
    graph: [AirdropsGraph.getCampaignsWithActivities, AirdropsGraph.getActions],
  },
});
