import { sepolia } from "sablier/dist/chains";
import { getExperimentalURL } from "../../../src/experimental";
import * as Envio from "../../../src/queries/flow/envio";
import * as Graph from "../../../src/queries/flow/graph";
import { createEquivalenceTest } from "./create-test";

createEquivalenceTest({
  chainId: sepolia.id,
  endpoints: {
    envio: getExperimentalURL({ protocol: "flow", vendor: "envio" }),
    graph: getExperimentalURL({ protocol: "flow", vendor: "graph" }),
  },
  protocol: "flow",
  queries: {
    envio: [Envio.getStreams, Envio.getActions],
    graph: [Graph.getStreams, Graph.getActions],
  },
});
