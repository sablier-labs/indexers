import { sepolia } from "sablier/evm/chains";
import { getIndexer } from "../../../src/indexers/getters";
import { createEquivalenceTest } from "./create-test";
import { LockupEnvio, LockupGraph } from "./queries";

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
    envio: [LockupEnvio.getStreams, LockupEnvio.getActions],
    graph: [LockupGraph.getStreams, LockupGraph.getActions],
  },
});
