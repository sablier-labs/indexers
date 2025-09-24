/**
 * @file See the Envio documentation for more details.
 * @see https://docs.envio.dev/docs/HyperIndex/block-handlers#preset-handler
 */

import { GraphQLClient } from "graphql-request";
import { lightlink } from "sablier/dist/chains";
import type { Envio } from "../../../common/bindings";
import type { HandlerContext } from "../../bindings";
import { onBlock } from "../../bindings/src/Handlers.gen";
import { Store } from "../../store";

// Define OrderDirection enum locally
enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

// Define Action interface locally
type Action = {
  id: string;
  addressA?: string | null;
  addressB?: string | null;
  amountA?: string | null;
  amountB?: string | null;
  block: string;
  category: string;
  chainId: string;
  contract: string;
  fee: string;
  from: string;
  hash: string;
  subgraphId: string;
  timestamp: string;
};

// Define Action_Filter interface locally
type Action_Filter = {
  subgraphId_gt?: number;
  // Additional filter fields can be added as needed
};

// Define the GraphQL query locally with embedded fragments
const getActions = /* GraphQL */ `
  query getActions($first: Int!, $orderDirection: OrderDirection!, $where: Action_filter) {
    actions(
      first: $first
      orderBy: subgraphId
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      addressA
      addressB
      amountA
      amountB
      block
      category
      chainId
      contract
      fee
      from
      hash
      subgraphId
      timestamp
    }
  }
`;

type ActionsResponse = {
  actions: Action[];
};

// Using Mainnet id but it doesn't really matter what chain we use here
onBlock(
  {
    chain: 1,
    endBlock: 17_613_133,
    name: "Preset",
    startBlock: 17_613_133,
  },
  async ({ context }) => {
    // Disable preload optimization to prevent double-run.
    if (context.isPreload) return;

    // Initialize Lightlink data
    await initializeLockupData(
      context,
      "https://graph.phoenix.lightlink.io/query/subgraphs/name/lightlink/sablier-lockup-lightlink",
      lightlink.id,
    );
  },
);

/**
 * Fetches actions from a GraphQL endpoint with pagination and processes them.
 * @param context - The handler context
 * @param graphqlEndpoint - The GraphQL endpoint URL
 * @param chainId - The chain ID for the actions
 */
async function initializeLockupData(context: HandlerContext, graphqlEndpoint: string, chainId: number) {
  const actions = await fetchAllActions(context, graphqlEndpoint);

  if (actions.length === 0) {
    context.log.info(`No actions found for chain ${chainId}`);
    return;
  }

  context.log.info(`Processing ${actions.length} actions for chain ${chainId}`);

  const results = await Promise.allSettled(
    actions.map(async (action) => {
      const event: Envio.Event = {
        block: {
          hash: "N/A", // doesn't matter, not used
          number: Number(action.block),
          timestamp: Number(action.timestamp),
        },
        chainId,
        logIndex: 0, // doesn't matter, not used
        params: {},
        srcAddress: action.contract,
        transaction: {
          from: action.from,
          hash: action.hash,
          to: "N/A", // doesn't matter, not used
          transactionIndex: 0, // doesn't matter, not used
          value: BigInt(action.fee),
        },
      };

      // Track revenue only if it's non-zero
      if (BigInt(action.fee) !== BigInt(0)) {
        return await Store.Revenue.createOrUpdate(context, event);
      }

      // Filter out null/undefined addresses before passing to createOrUpdate
      const addresses = [action.addressA, action.addressB, action.from].filter((addr): addr is string => addr != null);
      await Store.User.createOrUpdate(context, event, addresses);
    }),
  );

  // Log failures but don't crash
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      context.log.error(`Failed to process action ${actions[index].hash}:`, result.reason);
    }
  });
}

/**
 * Fetches all actions from the GraphQL endpoint with pagination.
 * @param context - The handler context for logging
 * @param endpoint - The GraphQL endpoint URL
 * @returns All actions from the endpoint
 */
async function fetchAllActions(context: HandlerContext, endpoint: string): Promise<Action[]> {
  const allActions: Action[] = [];
  let lastSubgraphId = 0;
  const batchSize = 1000;
  let hasMore = true;

  // Create GraphQL client
  const client = new GraphQLClient(endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  type QueryVariables = {
    first: number;
    orderDirection: OrderDirection;
    where: Action_Filter;
  };

  while (hasMore) {
    try {
      const variables: QueryVariables = {
        first: batchSize,
        orderDirection: OrderDirection.Asc,
        where: {
          subgraphId_gt: lastSubgraphId,
        },
      };

      const response = await client.request<ActionsResponse>(getActions, variables);

      if (!response.actions) {
        context.log.error("Invalid response structure from GraphQL endpoint");
        break;
      }

      const actions = response.actions;
      allActions.push(...actions);

      // Check if we got fewer results than the batch size (indicating we've reached the end)
      if (actions.length < batchSize) {
        hasMore = false;
      } else {
        // Use the last action's subgraphId for the next batch
        lastSubgraphId = Number(actions[actions.length - 1].subgraphId);
        context.log.debug(`Fetched ${allActions.length} actions so far...`);
      }
    } catch (error) {
      context.log.error(
        `Error fetching actions from GraphQL endpoint: ${error instanceof Error ? error.message : String(error)}`,
      );
      hasMore = false;
    }
  }

  context.log.info(`Fetched total of ${allActions.length} actions`);
  return allActions;
}
