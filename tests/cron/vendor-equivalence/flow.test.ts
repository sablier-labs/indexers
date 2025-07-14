import { chains } from "sablier";
import { getExperimentalURL } from "../../../src/experimental";
import * as Envio from "../../../src/exports/queries/flow/envio";
import * as Graph from "../../../src/exports/queries/flow/graph";
import { createEquivalenceTest } from "./equivalence";

createEquivalenceTest({
  chainId: chains.sepolia.id,
  endpoints: {
    envio: getExperimentalURL({ protocol: "flow", vendor: "envio" }),
    graph: getExperimentalURL({ protocol: "flow", vendor: "graph" }),
  },
  protocol: "flow",
  queries: {
    envio: Envio.getStreamsWithActions,
    graph: Graph.getStreamsWithActions,
  },
});
