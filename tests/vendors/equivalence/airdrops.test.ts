import { sepolia } from "sablier/evm/chains";
import { getIndexer } from "../../../src/indexers/getters.js";
import { createEquivalenceTest } from "./create-test.js";
import { AirdropsEnvio, AirdropsGraph } from "./queries.js";

createEquivalenceTest({
  chainId: sepolia.id,
  endpoints: {
    envio: getIndexer({ chainId: sepolia.id, protocol: "airdrops", vendor: "envio" })!.endpoint.url,
    graph: getIndexer({ chainId: sepolia.id, protocol: "airdrops", vendor: "graph" })!.endpoint.url,
  },
  protocol: "airdrops",
  queries: {
    envio: [AirdropsEnvio.getCampaignsWithActivities, AirdropsEnvio.getActions],
    graph: [AirdropsGraph.getCampaignsWithActivities, AirdropsGraph.getActions],
  },
});
