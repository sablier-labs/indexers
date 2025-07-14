import { chains } from "sablier";
import { describe } from "vitest";
import { Indexer } from "../../src/exports";
import * as Envio from "../../src/exports/queries/lockup/envio";
import * as Graph from "../../src/exports/queries/lockup/graph";
import { getExperimentalEndpointURL } from "../../src/helpers";
import { createEquivalenceTest } from "./equivalence";

describe("GraphQL data equivalence between Lockup indexers", () => {
  createEquivalenceTest({
    chainId: chains.sepolia.id,
    endpoints: {
      envio: getExperimentalEndpointURL({ protocol: "lockup", vendor: "envio" }),
      graph: getExperimentalEndpointURL({ protocol: "lockup", vendor: "graph" }),
    },
    queries: {
      envio: Envio.getStreamsWithActions,
      graph: Graph.getStreamsWithActions,
    },
  });
});
