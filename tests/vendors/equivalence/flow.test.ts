import { sepolia } from "sablier/evm/chains";
import { getIndexer } from "../../../src/indexers/getters";
import { createEquivalenceTest } from "./create-test";
import { FlowEnvio, FlowGraph } from "./queries";

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
