/**
 * @file Reusable helpers for preset data initialization across multiple chains.
 */

import { GraphQLClient } from "graphql-request";
import type { Sablier } from "sablier";
import { parseEther } from "viem";
import type { Envio } from "../../../common/bindings";
import type { HandlerContext } from "../../bindings";
import { Store } from "../../store";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export type Action = {
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

export type FeeCollectionPreset = {
  caller: string;
  admin: string;
  block: number;
  timestamp: number;
  hash: string;
  amount: string;
  logIndex: number;
  contractAddress: string;
  airdropCampaign: string | null;
};

type Action_Filter = {
  subgraphId_gt?: number;
};

type ActionsResponse = {
  actions: Action[];
};

export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

/* -------------------------------------------------------------------------- */
/*                                  GRAPHQL                                   */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                 FUNCTIONS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Fetches all actions from a GraphQL endpoint with pagination.
 * @param context - The handler context for logging
 * @param endpoint - The GraphQL endpoint URL
 * @returns All actions from the endpoint
 */
export async function fetchAllActions(context: HandlerContext, endpoint: string): Promise<Action[]> {
  const allActions: Action[] = [];
  let lastSubgraphId = 0;
  const batchSize = 1000;
  let hasMore = true;

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

      if (actions.length < batchSize) {
        hasMore = false;
      } else {
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

/**
 * Processes actions to create fee and user entities.
 * @param context - The handler context
 * @param chainId - The chain ID for the actions
 * @param actions - The actions to process
 */
export async function processActions(context: HandlerContext, chainId: number, actions: Action[]): Promise<void> {
  if (actions.length === 0) {
    context.log.info(`No actions found for chain ${chainId}`);
    return;
  }

  context.log.info(`Processing ${actions.length} actions for chain ${chainId}`);

  const results = await Promise.allSettled(
    actions.map(async (action) => {
      const event: Envio.Event = {
        block: {
          hash: "N/A",
          number: Number(action.block),
          timestamp: Number(action.timestamp),
        },
        chainId,
        logIndex: 0,
        params: {},
        srcAddress: action.contract,
        transaction: {
          from: action.from,
          hash: action.hash,
          to: "N/A",
          transactionIndex: 0,
          value: BigInt(action.fee),
        },
      };

      const promises = [];

      // Track fees only if non-zero
      if (BigInt(action.fee) !== BigInt(0)) {
        promises.push(Store.Fees.createOrUpdate(context, event));
      }

      // Filter out null/undefined addresses
      const addresses = [action.addressA, action.addressB, action.from].filter((addr): addr is string => addr != null);
      promises.push(Store.User.createOrUpdate(context, event, addresses));

      await Promise.all(promises);
    }),
  );

  // Log failures
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      context.log.error(`Failed to process action ${actions[index].hash}:`, result.reason);
    }
  });
}

/**
 * Processes hardcoded fee collection events.
 * @param context - The handler context
 * @param chainId - The chain ID for the fee collections
 * @param feeCollections - The fee collection data to process
 * @param protocol - The protocol name (e.g., "lockup", "flow", "airdrops")
 */
export async function processFeeCollections(
  context: HandlerContext,
  chainId: number,
  feeCollections: FeeCollectionPreset[],
  protocol: Sablier.Protocol,
): Promise<void> {
  if (feeCollections.length === 0) {
    return;
  }

  context.log.info(`Processing ${feeCollections.length} hardcoded fee collections for chain ${chainId}`);

  const results = await Promise.allSettled(
    feeCollections.map(async (fc) => {
      const event: Envio.Event = {
        block: {
          hash: fc.hash,
          number: fc.block,
          timestamp: fc.timestamp,
        },
        chainId,
        logIndex: fc.logIndex,
        params: {},
        srcAddress: fc.contractAddress,
        transaction: {
          from: fc.caller,
          hash: fc.hash,
          to: fc.contractAddress,
          transactionIndex: 0,
          value: 0n,
        },
      };

      await Store.FeeCollection.create(context, event, {
        admin: fc.admin,
        airdropCampaign: fc.airdropCampaign ?? undefined,
        amount: parseEther(fc.amount),
        protocol,
      });
    }),
  );

  // Log failures
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      context.log.error(`Failed to process fee collection ${index}:`, result.reason);
    }
  });
}
