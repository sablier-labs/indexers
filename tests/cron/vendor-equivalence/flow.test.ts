import { sepolia } from "sablier/dist/chains";
import { getExperimentalURL } from "../../../src/exports/experimental";
import * as Envio from "../../../src/exports/queries/flow/envio";
import * as Graph from "../../../src/exports/queries/flow/graph";
import { createEquivalenceTest } from "./equivalence";

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
