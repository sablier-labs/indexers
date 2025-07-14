import { sepolia } from "sablier/dist/chains";
import { getExperimentalURL } from "../../../src/experimental";
import * as Envio from "../../../src/exports/queries/lockup/envio";
import * as Graph from "../../../src/exports/queries/lockup/graph";
import { createEquivalenceTest } from "./equivalence";

createEquivalenceTest({
  chainId: sepolia.id,
  endpoints: {
    envio: getExperimentalURL({ protocol: "lockup", vendor: "envio" }),
    graph: getExperimentalURL({ protocol: "lockup", vendor: "graph" }),
  },
  protocol: "lockup",
  queries: {
    envio: Envio.getStreamsWithActions,
    graph: Graph.getStreamsWithActions,
  },
});
