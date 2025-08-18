/**
 * @file Notes:
 * - These queries are used for both Flow and Lockup streams.
 * - The query arguments follow The Graph's syntax again to make it easier to use.
 * - The results are aliased (e.g. `streams`) to ensure the same response structure as The Graph.
 *
 * @see {@link file://./../../../gql/flow/envio/graphql.ts}
 * @see {@link file://./../../../gql/lockup/envio/graphql.ts}
 */

/* -------------------------------------------------------------------------- */
/*                               STREAM - SINGLE                              */
/* -------------------------------------------------------------------------- */

export const getStream = /* GraphQL */ `
  query getStream($streamId: String!) {
    stream: Stream_by_pk(id: $streamId) {
      ...StreamFragment
    }
  }
`;

export const getStreamWithActions = /* GraphQL */ `
  query getStreamWithActions($streamId: String!) {
    stream: Stream_by_pk(id: $streamId) {
      ...StreamFragment
      actions(limit: 1000, distinct_on: [subgraphId], order_by: { subgraphId: asc }) {
        ...ActionFragment
      }
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                              STREAM - MULTIPLE                             */
/* -------------------------------------------------------------------------- */

export const getStreams = /* GraphQL */ `
  query getStreams($first: Int!, $orderDirection: order_by!, $where: Stream_bool_exp) {
    streams: Stream(
      distinct_on: [subgraphId]
      limit: $first
      order_by: { subgraphId: $orderDirection }
      where: $where
    ) {
      ...StreamFragment
    }
  }
`;

export const getStreamsWithActions = /* GraphQL */ `
  query getStreamsWithActions($first: Int!, $orderDirection: order_by!, $where: Stream_bool_exp) {
    streams: Stream(
      distinct_on: [subgraphId]
      limit: $first
      order_by: { subgraphId: $orderDirection }
      where: $where
    ) {
      ...StreamFragment
      actions(limit: 1000, distinct_on: [subgraphId], order_by: { subgraphId: asc }) {
        ...ActionFragment
      }
    }
  }
`;
