import { sepolia } from "sablier/evm/chains";
import { getIndexer } from "../../../src/indexers/getters.js";
import { createEquivalenceTest } from "./create-test.js";
import { FlowEnvio, FlowGraph } from "./queries.js";

createEquivalenceTest({
  chainId: sepolia.id,
  endpoints: {
    envio: getIndexer({ chainId: sepolia.id, protocol: "flow", vendor: "envio" })!.endpoint.url,
    graph: getIndexer({ chainId: sepolia.id, protocol: "flow", vendor: "graph" })!.endpoint.url,
  },
  protocol: "flow",
  queries: {
    envio: [FlowEnvio.getStreams, FlowEnvio.getActions],
    graph: [FlowGraph.getStreams, FlowGraph.getActions],
  },
});
