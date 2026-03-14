import type { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";
import _ from "lodash";
import { sepolia } from "sablier/evm/chains";
import { expect, it } from "vitest";
import type { Order_By } from "../vendors/equivalence/types.js";

type Entities = Array<{ subgraphId: string }>;

type QueryResponse = {
  streams?: Entities;
  actions?: Entities;
};

type QueryVariables = {
  first: number;
  orderDirection: Order_By;
  where: {
    chainId: { _eq: number };
    subgraphId: { _gt: number };
    timestamp: { _lt: number };
  };
};

type StreamsTestConfig = {
  label: string;
  deployed: {
    endpoint: string;
    query: DocumentNode;
  };
  local: {
    endpoint: string;
    query: DocumentNode;
  };
};

function getEntities(response: QueryResponse): Entities {
  return response.streams ?? response.actions ?? [];
}

async function fetchEntities(
  endpoint: string,
  document: DocumentNode,
  variables: QueryVariables
): Promise<Entities | undefined> {
  try {
    const client = new GraphQLClient(endpoint);
    const response = await client.request<QueryResponse>(document, variables);
    return getEntities(response);
  } catch (error) {
    try {
      const stringifiedError = JSON.stringify(error, null, 2);
      console.error(`Request failed: ${stringifiedError}`);
    } catch {
      console.error(`Request failed: ${error}`);
    }
    return undefined;
  }
}

/**
 * Sanitize known asset metadata discrepancies on Sepolia.
 */
function sanitizeEntity(entity: Entities[number]) {
  const chainId = _.toNumber(_.get(entity, "chainId"));
  const asset = _.toString(_.get(entity, "asset.address"))?.toLowerCase();

  if (chainId === sepolia.id) {
    switch (asset) {
      // $FUEL updated its token metadata at block 7695199
      case "0xbaca88a993d9a1452402dc511efeecda1b18c18f":
      // Scam token
      case "0xa0194c01b45ba58482dc70446cb41af62dd21a47":
        _.unset(entity, "asset.name");
        _.unset(entity, "asset.symbol");
    }
  }
}

export function createStreamsTest(config: StreamsTestConfig) {
  const first = 1000;
  const timeout = 500_000;

  // Lock timestamp 10 minutes ago to avoid lag differences.
  const now = Math.floor(Date.now() / 1000) - 600;

  const deployedVars: QueryVariables = {
    first,
    orderDirection: "asc" as Order_By,
    where: {
      chainId: { _eq: sepolia.id },
      subgraphId: { _gt: 0 },
      timestamp: { _lt: now },
    },
  };

  const localVars: QueryVariables = {
    first,
    orderDirection: "asc" as Order_By,
    where: {
      chainId: { _eq: sepolia.id },
      subgraphId: { _gt: 0 },
      timestamp: { _lt: now },
    },
  };

  it(
    config.label,
    async () => {
      let done = false;
      let totalCount = 0;

      while (!done) {
        const deployedEntities = await fetchEntities(
          config.deployed.endpoint,
          config.deployed.query,
          deployedVars
        );
        const localEntities = await fetchEntities(
          config.local.endpoint,
          config.local.query,
          localVars
        );

        if (!(deployedEntities && localEntities)) {
          throw new Error("Failed to fetch data from one of the endpoints");
        }

        expect(
          localEntities.length,
          `Entity count mismatch at subgraphId cursor ${deployedVars.where.subgraphId._gt}`
        ).toBe(deployedEntities.length);

        for (let i = 0; i < deployedEntities.length; i++) {
          sanitizeEntity(deployedEntities[i]);
          sanitizeEntity(localEntities[i]);

          expect(localEntities[i], "Expected is deployed, Received is local streams").toEqual(
            deployedEntities[i]
          );
        }

        totalCount += deployedEntities.length;

        if (deployedEntities.length > 0 && deployedEntities.length === first) {
          const nextId = _.toNumber(deployedEntities.at(-1)?.subgraphId);
          deployedVars.where.subgraphId = { _gt: nextId };
          localVars.where.subgraphId = { _gt: nextId };
          continue;
        }

        done = true;
      }

      expect(totalCount).toBeGreaterThan(0);
      console.info(`[${config.label}] Successfully compared ${totalCount} entities.`);
    },
    timeout
  );
}
