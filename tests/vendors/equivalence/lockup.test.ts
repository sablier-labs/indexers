import { sepolia } from "sablier/dist/chains";
import { getExperimentalURL } from "../../../src/experimental";
import * as Envio from "../../../src/queries/lockup/envio";
import * as Graph from "../../../src/queries/lockup/graph";
import { createEquivalenceTest } from "./create-test";

createEquivalenceTest({
  chainId: sepolia.id,
  endpoints: {
    envio: getExperimentalURL({ protocol: "lockup", vendor: "envio" }),
    graph: getExperimentalURL({ protocol: "lockup", vendor: "graph" }),
  },
  protocol: "lockup",
  queries: {
    envio: [Envio.getStreams, Envio.getActions],
    graph: [Graph.getStreams, Graph.getActions],
  },
});
