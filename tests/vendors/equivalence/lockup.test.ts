import { sepolia } from "sablier/evm/chains";
import { getIndexer } from "../../../src/indexers/getters.js";
import { createEquivalenceTest } from "./create-test.js";
import { LockupEnvio, LockupGraph } from "./queries.js";

createEquivalenceTest({
  chainId: sepolia.id,
  protocol: "lockup",
  endpoints: {
    envio: getIndexer({ chainId: sepolia.id, protocol: "lockup", vendor: "envio" })!.endpoint.url,
    graph: getIndexer({ chainId: sepolia.id, protocol: "lockup", vendor: "graph" })!.endpoint.url,
  },
  queries: {
    envio: [LockupEnvio.getStreams, LockupEnvio.getActions],
    graph: [LockupGraph.getStreams, LockupGraph.getActions],
  },
});
