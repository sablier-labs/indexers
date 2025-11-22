import { sepolia } from "sablier/evm/chains";
import { getIndexer } from "../../../src/indexers/getters";
import * as Envio from "../../../src/queries/lockup/envio";
import * as Graph from "../../../src/queries/lockup/graph";
import { createEquivalenceTest } from "./create-test";

/**
 * Use "https://api.studio.thegraph.com/query/82/sablier-lockup-experimental-2/version/latest" for mainnet tests
 */

createEquivalenceTest({
  chainId: sepolia.id,
  endpoints: {
    envio: getIndexer({ chainId: sepolia.id, protocol: "lockup", vendor: "envio" })!.endpoint.url,
    graph: getIndexer({ chainId: sepolia.id, protocol: "lockup", vendor: "graph" })!.endpoint.url,
  },
  protocol: "lockup",
  queries: {
    envio: [Envio.getStreams, Envio.getActions],
    graph: [Graph.getStreams, Graph.getActions],
  },
});
