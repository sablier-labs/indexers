import type { DocumentNode } from "graphql";
import { parse } from "graphql";

function gql(source: string): DocumentNode {
  return parse(source);
}

/* -------------------------------------------------------------------------- */
/*                           GRAPH QUERIES (The Graph)                        */
/* -------------------------------------------------------------------------- */

export namespace GraphQueries {
  export const getPoolStates = gql(/* GraphQL */ `
    query getPoolStates($first: Int!, $skip: Int!) {
      poolStates(first: $first, skip: $skip, orderBy: id, orderDirection: asc) {
        id
        token
        oracle
        adapter
        shareToken
        targetPrice
        expiry
        createdBlock
        createdTxHash
        enterCount
        redeemCount
        syncCount
        unstakeCount
        depositedAmountTotal
        sharesMintedTotal
        redeemedAmountTotal
        sharesBurnedRedeemTotal
        redeemedFeeTotal
        latestOraclePrice
        lastOracleSyncAt
        lastUnstakedAmountStaked
        lastUnstakedAmountReceived
        lastActivityBlock
      }
    }
  `);

  export const getPoolUserStates = gql(/* GraphQL */ `
    query getPoolUserStates($first: Int!, $skip: Int!) {
      poolUserStates(
        first: $first
        skip: $skip
        orderBy: id
        orderDirection: asc
      ) {
        id
        poolId
        user
        enterCount
        redeemCount
        enteredAmountTotal
        sharesMintedTotal
        redeemedAmountTotal
        sharesBurnedRedeemTotal
        redeemedFeeTotal
        firstEnterBlock
        lastActivityBlock
      }
    }
  `);
}

/* -------------------------------------------------------------------------- */
/*                        RINDEXER QUERIES (Postgraphile)                     */
/* -------------------------------------------------------------------------- */

export namespace RindexerQueries {
  export const getPoolStates = gql(/* GraphQL */ `
    query getPoolStates($first: Int!, $offset: Int!) {
      allPoolStates(first: $first, offset: $offset, orderBy: POOL_ID_ASC) {
        nodes {
          poolId
          token
          oracle
          adapter
          shareToken
          targetPrice
          expiry
          createdBlock
          createdTxHash
          enterCount
          redeemCount
          syncCount
          unstakeCount
          depositedAmountTotal
          sharesMintedTotal
          redeemedAmountTotal
          sharesBurnedRedeemTotal
          redeemedFeeTotal
          latestOraclePrice
          lastOracleSyncAt
          lastUnstakedAmountStaked
          lastUnstakedAmountReceived
          lastActivityBlock
        }
      }
    }
  `);

  export const getPoolUserStates = gql(/* GraphQL */ `
    query getPoolUserStates($first: Int!, $offset: Int!) {
      allPoolUserStates(first: $first, offset: $offset, orderBy: [POOL_ID_ASC, USER_ASC]) {
        nodes {
          poolId
          user
          enterCount
          redeemCount
          enteredAmountTotal
          sharesMintedTotal
          redeemedAmountTotal
          sharesBurnedRedeemTotal
          redeemedFeeTotal
          firstEnterBlock
          lastActivityBlock
        }
      }
    }
  `);
}
