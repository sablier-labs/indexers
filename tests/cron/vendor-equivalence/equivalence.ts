import { type TypedDocumentNode } from "@graphql-typed-document-node/core";
import { type DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";
import _ from "lodash";
import { describe, expect, it } from "vitest";
import { type Indexer } from "../../../src/exports";
import type { Order_By, OrderDirection } from "../../../src/exports/types";
import { logger } from "../../../src/winston";

type Entities = Array<{ subgraphId: string }>;
type AirdropsResponse = {
  campaigns: Entities;
};

type FlowAndLockupResponse = {
  streams: Entities;
};
type QueryResponse = AirdropsResponse | FlowAndLockupResponse;

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
    envio: TypedDocumentNode<QueryResponse, EnvioQueryVariables>;
    graph: TypedDocumentNode<QueryResponse, GraphQueryVariables>;
  };
};

function getEntities(response: QueryResponse): Entities {
  return "campaigns" in response ? response.campaigns : response.streams;
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

export function createEquivalenceTest(config: TestConfig) {
  const { chainId, endpoints, queries } = config;

  // Tweak these values when debugging.
  const first = 1000;
  const timeout = 100_000;

  // Locking in a specific timestamp (10 minutes ago) to avoid false positives
  // when one indexer is lagging behind the other.
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

      while (!done) {
        const envioEntities = await fetchEntities("envio", endpoints.envio, queries.envio, envioVariables);
        const graphEntities = await fetchEntities("graph", endpoints.graph, queries.graph, graphVariables);
        if (!envioEntities || !graphEntities) {
          throw new Error("Failed to fetch data from one of the endpoints");
        }

        expect(envioEntities.length).toBe(graphEntities.length);
        for (let i = 0; i < envioEntities.length; i++) {
          // Debug by unsetting fields, e.g.
          // _.unset(envioEntities[i], "sender");
          // _.unset(graphEntities[i], "sender");
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

      logger.info(`Successfully compared ${totalCount} GraphQL entities.`);
      expect(totalCount).toBeGreaterThan(0);
    },
    timeout,
  );
}
