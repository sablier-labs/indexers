import { chains } from "sablier";
import { describe } from "vitest";
import * as Envio from "../../src/exports/queries/flow/envio";
import * as Graph from "../../src/exports/queries/flow/graph";
import { getExperimentalEndpointURL } from "../../src/helpers";
import { createEquivalenceTest } from "./equivalence";

describe("GraphQL data equivalence between Flow indexers", () => {
  createEquivalenceTest({
    chainId: chains.sepolia.id,
    endpoints: {
      envio: getExperimentalEndpointURL({ protocol: "flow", vendor: "envio" }),
      graph: getExperimentalEndpointURL({ protocol: "flow", vendor: "graph" }),
    },
    queries: {
      envio: Envio.getStreamsWithActions,
      graph: Graph.getStreamsWithActions,
    },
  });
});
