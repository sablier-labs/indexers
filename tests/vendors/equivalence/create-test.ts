import type { DocumentNode } from "graphql";
import type { Variables } from "graphql-request";
import { ClientError, GraphQLClient } from "graphql-request";
import { mainnet, sepolia } from "sablier/evm/chains";
import { expect, it } from "vitest";
import type { Indexer } from "../../../src/index.js";

type Asset = { address: string; name?: string | null; symbol?: string | null };
type Entity = {
  asset?: Asset | null;
  campaign?: { asset: Asset | null } | null;
  chainId: string;
  stream?: { asset: Asset | null } | null;
  subgraphId: string;
};
type QueryPair = {
  entity: "actions" | "campaigns" | "streams";
  envio: DocumentNode;
  graph: DocumentNode;
};

type TestConfig = {
  chainId: number;
  endpoints: {
    envio: string;
    graph: string;
  };
  protocol: Indexer.Protocol;
  queries: QueryPair[];
};

async function fetchEntities(
  client: GraphQLClient,
  query: QueryPair,
  vendor: Indexer.Vendor,
  variables: Variables,
  context: string
): Promise<Entity[]> {
  const response = await client
    .request<Partial<Record<QueryPair["entity"], Entity[]>>>(query[vendor], variables)
    .catch((error: unknown) => {
      // graphql-request errors include request and response details that may contain credentials.
      const status = error instanceof ClientError ? ` (HTTP ${error.response.status})` : "";
      const cause =
        error instanceof ClientError
          ? { graphqlErrors: error.response.errors?.length ?? 0 }
          : "Transport error or invalid GraphQL response";
      throw new Error(`${vendor} request failed for ${context}${status}`, { cause });
    });
  const entities = response[query.entity];
  if (!Array.isArray(entities)) {
    throw new Error(`${vendor} response did not contain ${query.entity} for ${context}`);
  }
  return entities;
}

// Envio reads asset metadata at the latest block. The Graph reads it at the transaction block.
const changedAssetMetadata: Partial<Record<number, string[]>> = {
  [mainnet.id]: [
    "0x12652c6d93fdb6f4f37d48a8687783c782bb0d10", // $NGL
    "0x3f2d4250e253c656bcf7750da03a94bff667ab46", // viraliquid
  ],
  324: [
    // zkSync Era scam tokens
    "0x006f916db2b2341581a0d12d139ebba1878c1793",
    "0xd58a0fea5bd63e0bb86afc5aa3025d2144b5029b",
  ],
  8453: [
    "0x39d00b9ca6dd9ceedaf7d04e9882b82248faaa51", // Base scam token
  ],
  43114: [
    // Avalanche scam tokens
    "0x714f020c54cc9d104b6f4f6998c63ce2a31d1888",
    "0x37502f8d4f395bbf17242a74b0c53a0929497f97",
  ],
  [sepolia.id]: [
    "0xbaca88a993d9a1452402dc511efeecda1b18c18f", // $FUEL changed metadata at block 7695199
    "0xa0194c01b45ba58482dc70446cb41af62dd21a47", // Scam token
  ],
};

function sanitizeEntity(entity: Entity) {
  const asset = entity.asset ?? entity.campaign?.asset ?? entity.stream?.asset;
  if (
    asset &&
    changedAssetMetadata[Number(entity.chainId)]?.includes(asset.address.toLowerCase())
  ) {
    delete asset.name;
    delete asset.symbol;
  }
}

export async function compareVendors(config: Omit<TestConfig, "queries">, query: QueryPair) {
  const { chainId, endpoints, protocol } = config;
  const { GRAPH_QUERY_KEY } = process.env;
  if (!GRAPH_QUERY_KEY) {
    throw new Error("GRAPH_QUERY_KEY is not set");
  }
  const envioClient = new GraphQLClient(endpoints.envio);
  const graphClient = new GraphQLClient(endpoints.graph, {
    headers: { Authorization: `Bearer ${GRAPH_QUERY_KEY}` },
  });
  const first = 1000;
  // Freeze the cutoff for both vendors and every page, allowing ten minutes for indexing lag.
  const cutoff = Math.floor(Date.now() / 1000) - 600;
  let totalCount = 0;

  let cursor = 0n;
  let pageSize: number;
  do {
    const pageCursor = cursor.toString();
    const context = `${protocol} ${query.entity} on chain ${chainId} after subgraphId ${pageCursor}`;
    const envioEntities = await fetchEntities(
      envioClient,
      query,
      "envio",
      {
        first,
        where: {
          chainId: { _eq: chainId },
          subgraphId: { _gt: pageCursor },
          timestamp: { _lt: cutoff },
        },
      },
      context
    );
    const graphEntities = await fetchEntities(
      graphClient,
      query,
      "graph",
      {
        first,
        where: { chainId, subgraphId_gt: pageCursor, timestamp_lt: cutoff },
      },
      context
    );

    pageSize = envioEntities.length;
    expect(pageSize, `Page length for ${context} (Graph expected, Envio received)`).toBe(
      graphEntities.length
    );
    for (const [index, envioEntity] of envioEntities.entries()) {
      const graphEntity = graphEntities[index];
      const nextId = BigInt(envioEntity.subgraphId);
      if (nextId <= cursor) {
        throw new Error(
          `Expected ascending subgraphId for ${context}, received ${nextId} after ${cursor}`
        );
      }
      cursor = nextId;

      sanitizeEntity(envioEntity);
      sanitizeEntity(graphEntity);
      expect(
        envioEntity,
        `Entity ${nextId} for ${context} (Graph expected, Envio received)`
      ).toEqual(graphEntity);
    }
    totalCount += pageSize;
  } while (pageSize === first);
  expect(totalCount, `No ${protocol} ${query.entity} found on chain ${chainId}`).toBeGreaterThan(0);
  return totalCount;
}

export function createEquivalenceTest(config: TestConfig) {
  it.each(config.queries)(
    `GraphQL equivalence for ${config.protocol} $entity`,
    async (query) => {
      const totalCount = await compareVendors(config, query);
      console.info(`Successfully compared ${totalCount} ${config.protocol} ${query.entity}.`);
    },
    500_000
  );
}
