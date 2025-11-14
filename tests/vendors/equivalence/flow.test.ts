import { sepolia } from "sablier/evm/chains";
import { getIndexer } from "../../../src/indexers/getters";
import * as Envio from "../../../src/queries/flow/envio";
import * as Graph from "../../../src/queries/flow/graph";
import { createEquivalenceTest } from "./create-test";

createEquivalenceTest({
  chainId: sepolia.id,
  endpoints: {
    envio: getIndexer({ chainId: sepolia.id, protocol: "flow", vendor: "envio" })!.endpoint.url,
    graph: getIndexer({ chainId: sepolia.id, protocol: "flow", vendor: "graph" })!.endpoint.url,
  },
  protocol: "flow",
  queries: {
    envio: [Envio.getStreams, Envio.getActions],
    graph: [Graph.getStreams, Graph.getActions],
  },
});
