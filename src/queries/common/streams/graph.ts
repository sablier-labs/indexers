/**
 * @file Notes:
 * - These queries are used for both Flow and Lockup streams.
 *
 * @see {@link file://./../../../gql/flow/graph/graphql.ts}
 * @see {@link file://./../../../gql/lockup/graph/graphql.ts}
 */

/* -------------------------------------------------------------------------- */
/*                               STREAM - SINGLE                              */
/* -------------------------------------------------------------------------- */

export const getStream = /* GraphQL */ `
  query getStream($streamId: ID!) {
    stream(id: $streamId) {
      ...StreamFragment
    }
  }
`;

export const getStreamWithActions = /* GraphQL */ `
  query getStreamWithActions($streamId: ID!) {
    stream(id: $streamId) {
      ...StreamFragment
      actions(first: 1000, orderBy: subgraphId, orderDirection: asc) {
        ...ActionFragment
      }
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                              STREAM - MULTIPLE                             */
/* -------------------------------------------------------------------------- */

export const getStreams = /* GraphQL */ `
  query getStreams($first: Int!, $orderDirection: OrderDirection!, $where: Stream_filter) {
    streams(
      first: $first
      orderBy: subgraphId
      orderDirection: $orderDirection
      where: $where
    ) {
      ...StreamFragment
    }
  }
`;

export const getStreamsWithActions = /* GraphQL */ `
  query getStreamsWithActions($first: Int!, $orderDirection: OrderDirection!, $where: Stream_filter) {
    streams(
      first: $first
      orderBy: subgraphId
      orderDirection: $orderDirection
      where: $where
    ) {
      ...StreamFragment
      actions(first: 1000, orderBy: subgraphId, orderDirection: asc) {
        ...ActionFragment
      }
    }
  }
`;
