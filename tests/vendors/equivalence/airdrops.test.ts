import { sepolia } from "sablier/evm/chains";
import { getIndexer } from "../../../src/indexers/getters";
import { createEquivalenceTest } from "./create-test";
import { AirdropsEnvio, AirdropsGraph } from "./queries";

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
