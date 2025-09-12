import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";
import _ from "lodash";
import { mainnet, sepolia } from "sablier/dist/chains";
import { expect, it } from "vitest";
import { logger } from "../../../lib/winston";
import type { Indexer } from "../../../src";
import type { Order_By, OrderDirection } from "../../../src/types";

type Entities = Array<{ subgraphId: string }>;
type ActionsResponse = {
  actions: Entities;
};
type CampaignsResponse = {
  campaigns: Entities;
};
type StreamsResponse = {
  streams: Entities;
};
type QueryResponse = CampaignsResponse | StreamsResponse | ActionsResponse;

type EnvioQueryVariables = {
  first: number;
  orderDirection: Order_By;
  where: {
    chainId: { _eq: number };
    subgraphId: { _gt: number };
    timestamp: { _lt: number };
  };
};
type GraphQueryVariables = {
  first: number;
  orderDirection: OrderDirection;
  where: {
    chainId: number;
    subgraphId_gt: number;
    timestamp_lt: number;
  };
};

type TestConfig = {
  chainId: number;
  endpoints: {
    envio: string;
    graph: string;
  };
  protocol: Indexer.Protocol;
  queries: {
    envio: Array<TypedDocumentNode<QueryResponse, EnvioQueryVariables>>;
    graph: Array<TypedDocumentNode<QueryResponse, GraphQueryVariables>>;
  };
};

function getEntities(response: QueryResponse): Entities {
  return "campaigns" in response ? response.campaigns : "streams" in response ? response.streams : response.actions;
}

async function fetchEntities(
  vendor: Indexer.Vendor,
  endpoint: string,
  document: DocumentNode,
  variables: EnvioQueryVariables | GraphQueryVariables,
): Promise<Entities | undefined> {
  let headers: Record<string, string> = {};
  if (vendor === "graph") {
    const GRAPH_QUERY_KEY = process.env.GRAPH_QUERY_KEY;
    if (!GRAPH_QUERY_KEY) {
      throw new Error("GRAPH_QUERY_KEY is not set");
    }
    headers = { Authorization: `Bearer ${GRAPH_QUERY_KEY}` };
  }

  try {
    // console.log({ endpoint, document, headers, variables, where: variables.where });
    const client = new GraphQLClient(endpoint, { headers });
    const response = await client.request<QueryResponse>(document, variables);
    return getEntities(response);
  } catch (error) {
    try {
      const stringifiedError = JSON.stringify(error, null, 2);
      logger.error(`Request failed: ${stringifiedError}`);
    } catch {
      logger.error("Request failed:", error);
    }
    return undefined;
  }
}

/**
 * Envio fetches the metadata using the latest block number, whereas The Graph fetches the metadata using the block
 * number of the transaction. This is why we need to sanitize some entities.
 */
function sanitizeEntity(entity: Entities[number], _vendor: Indexer.Vendor) {
  const chainId = _.toNumber(_.get(entity, "chainId"));
  const asset = _.toString(_.get(entity, "asset.address"))?.toLowerCase();

  const removeEditedAssetDetails = () => {
    _.unset(entity, "asset.name");
    _.unset(entity, "asset.symbol");
  };

  switch (chainId) {
    case mainnet.id: {
      switch (asset) {
        // $NGL updated its token metadata
        case "0x12652c6d93fdb6f4f37d48a8687783c782bb0d10":
        // viraliquid updated its token metadata
        case "0x3f2d4250e253c656bcf7750da03a94bff667ab46":
          removeEditedAssetDetails();
      }
      break;
    }
    case sepolia.id: {
      switch (asset) {
        // $FUEL updated its token metadata at block 7695199
        case "0xbaca88a993d9a1452402dc511efeecda1b18c18f":
          removeEditedAssetDetails();
      }

      break;
    }
  }
}

export function createEquivalenceTest(config: TestConfig) {
  const { chainId, endpoints, queries } = config;

  // Tweak these values when debugging.
  const first = 1000;
  const timeout = 500_000;

  // Locking in a timestamp (10 minutes ago) to avoid false positives when one indexer is lagging behind the other.
  const now = Math.floor(Date.now() / 1000) - 600;

  const envioVariables: EnvioQueryVariables = {
    first,
    orderDirection: "asc" as Order_By,
    where: {
      chainId: { _eq: chainId },
      subgraphId: { _gt: 0 },
      timestamp: { _lt: now },
    },
  };

  const graphVariables: GraphQueryVariables = {
    first,
    orderDirection: "asc" as OrderDirection,
    where: {
      chainId,
      subgraphId_gt: 0,
      timestamp_lt: now,
    },
  };

  it(
    `GraphQL equivalence between ${config.protocol} indexers`,
    async () => {
      let done = false;
      let totalCount = 0;

      for (let i = 0; i < queries.envio.length; i++) {
        while (!done) {
          const envioEntities = await fetchEntities("envio", endpoints.envio, queries.envio[i], envioVariables);
          const graphEntities = await fetchEntities("graph", endpoints.graph, queries.graph[i], graphVariables);
          if (!envioEntities || !graphEntities) {
            throw new Error("Failed to fetch data from one of the endpoints");
          }

          expect(envioEntities.length).toBe(graphEntities.length);
          for (let i = 0; i < envioEntities.length; i++) {
            // Debug by unsetting fields, e.g.

            sanitizeEntity(envioEntities[i], "envio");
            sanitizeEntity(graphEntities[i], "graph");

            expect(envioEntities[i], "Expected is Graph, Received is Envio").toEqual(graphEntities[i]);
          }

          totalCount += envioEntities.length;

          if (envioEntities.length > 0 && envioEntities.length === envioVariables.first) {
            const nextId = _.toNumber(envioEntities[envioEntities.length - 1].subgraphId);
            envioVariables.where.subgraphId = { _gt: nextId };
            graphVariables.where.subgraphId_gt = nextId;
            continue;
          }

          done = true;
        }
      }

      expect(totalCount).toBeGreaterThan(0);
      logger.info(`Successfully compared ${totalCount} GraphQL entities.`);
    },
    timeout,
  );
}
