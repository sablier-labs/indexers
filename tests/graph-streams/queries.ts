import type { DocumentNode } from "graphql";
import { parse } from "graphql";

function gql(source: string): DocumentNode {
  return parse(source);
}

/* -------------------------------------------------------------------------- */
/*                              COMMON FRAGMENTS                              */
/* -------------------------------------------------------------------------- */

const AssetFragment = /* GraphQL */ `
  fragment AssetFragment on Asset {
    id
    address
    chainId
    decimals
    name
    symbol
  }
`;

/* -------------------------------------------------------------------------- */
/*                        DEPLOYED FLOW QUERIES                               */
/*    (Standalone flow subgraph — Graph syntax, unprefixed entities)          */
/* -------------------------------------------------------------------------- */

export namespace DeployedFlow {
  const BatchFragment = /* GraphQL */ `
    fragment BatchFragment on Batch {
      id
      hash
      timestamp
      size
      batcher {
        id
      }
    }
  `;

  const StreamFragment = /* GraphQL */ `
    fragment StreamFragment on Stream {
      id
      alias
      availableAmount
      category
      chainId
      creator
      contract
      depletionTime
      depositedAmount
      forgivenDebt
      hash
      lastAdjustmentTimestamp
      paused
      pausedTime
      position
      ratePerSecond
      recipient
      refundedAmount
      sender
      snapshotAmount
      startTime
      subgraphId
      timestamp
      tokenId
      transferable
      version
      voided
      voidedTime
      withdrawnAmount
      asset {
        ...AssetFragment
      }
      batch {
        ...BatchFragment
      }
      lastAdjustmentAction {
        id
      }
      pausedAction {
        id
      }
      voidedAction {
        id
      }
    }
  `;

  const ActionFragment = /* GraphQL */ `
    fragment ActionFragment on Action {
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
      stream {
        id
      }
    }
  `;

  export const getStreams = gql(/* GraphQL */ `
    ${AssetFragment}
    ${BatchFragment}
    ${StreamFragment}
    query getStreams($first: Int!, $orderDirection: OrderDirection!, $where: Stream_filter) {
      streams(first: $first, orderBy: subgraphId, orderDirection: $orderDirection, where: $where) {
        ...StreamFragment
      }
    }
  `);

  export const getActions = gql(/* GraphQL */ `
    ${ActionFragment}
    query getActions($first: Int!, $orderDirection: OrderDirection!, $where: Action_filter) {
      actions(first: $first, orderBy: subgraphId, orderDirection: $orderDirection, where: $where) {
        ...ActionFragment
      }
    }
  `);
}

/* -------------------------------------------------------------------------- */
/*                        DEPLOYED LOCKUP QUERIES                             */
/*    (Standalone lockup subgraph — Graph syntax, unprefixed entities)        */
/* -------------------------------------------------------------------------- */

export namespace DeployedLockup {
  const BatchFragment = /* GraphQL */ `
    fragment BatchFragment on Batch {
      id
      hash
      timestamp
      size
      batcher {
        id
      }
    }
  `;

  const SegmentFragment = /* GraphQL */ `
    fragment SegmentFragment on Segment {
      id
      amount
      endAmount
      endTime
      exponent
      position
      startAmount
      startTime
    }
  `;

  const TrancheFragment = /* GraphQL */ `
    fragment TrancheFragment on Tranche {
      id
      amount
      endAmount
      endTime
      position
      startAmount
      startTime
    }
  `;

  const StreamFragmentBase = /* GraphQL */ `
    fragment StreamFragmentBase on Stream {
      id
      alias
      cancelable
      canceled
      canceledTime
      category
      chainId
      cliff
      cliffAmount
      cliffTime
      contract
      depositAmount
      duration
      endTime
      funder
      hash
      initial
      initialAmount
      intactAmount
      position
      proxender
      proxied
      recipient
      renounceTime
      sender
      shape
      startTime
      subgraphId
      timestamp
      tokenId
      transferable
      version
      withdrawnAmount
      asset {
        ...AssetFragment
      }
      batch {
        ...BatchFragment
      }
    }
  `;

  const ActionFragment = /* GraphQL */ `
    fragment ActionFragment on Action {
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
      stream {
        id
      }
    }
  `;

  export const getStreams = gql(/* GraphQL */ `
    ${AssetFragment}
    ${BatchFragment}
    ${SegmentFragment}
    ${TrancheFragment}
    ${StreamFragmentBase}
    fragment StreamFragment on Stream {
      ...StreamFragmentBase
      segments(first: 1000, orderBy: position, orderDirection: asc) {
        ...SegmentFragment
      }
      tranches(first: 1000, orderBy: position, orderDirection: asc) {
        ...TrancheFragment
      }
    }
    query getStreams($first: Int!, $orderDirection: OrderDirection!, $where: Stream_filter) {
      streams(first: $first, orderBy: subgraphId, orderDirection: $orderDirection, where: $where) {
        ...StreamFragment
      }
    }
  `);

  export const getActions = gql(/* GraphQL */ `
    ${ActionFragment}
    query getActions($first: Int!, $orderDirection: OrderDirection!, $where: Action_filter) {
      actions(first: $first, orderBy: subgraphId, orderDirection: $orderDirection, where: $where) {
        ...ActionFragment
      }
    }
  `);
}

/* -------------------------------------------------------------------------- */
/*                     STREAMS — FLOW QUERIES                                 */
/*    (Merged streams subgraph — Graph syntax, prefixed entities)             */
/* -------------------------------------------------------------------------- */

export namespace StreamsFlow {
  const BatchFragment = /* GraphQL */ `
    fragment FlowBatchFragment on FlowBatch {
      id
      hash
      timestamp
      size
      batcher {
        id
      }
    }
  `;

  const StreamFragment = /* GraphQL */ `
    fragment FlowStreamFragment on FlowStream {
      id
      alias
      availableAmount
      category
      chainId
      creator
      contract
      depletionTime
      depositedAmount
      forgivenDebt
      hash
      lastAdjustmentTimestamp
      paused
      pausedTime
      position
      ratePerSecond
      recipient
      refundedAmount
      sender
      snapshotAmount
      startTime
      subgraphId
      timestamp
      tokenId
      transferable
      version
      voided
      voidedTime
      withdrawnAmount
      asset {
        ...AssetFragment
      }
      batch {
        ...FlowBatchFragment
      }
      lastAdjustmentAction {
        id
      }
      pausedAction {
        id
      }
      voidedAction {
        id
      }
    }
  `;

  const ActionFragment = /* GraphQL */ `
    fragment FlowActionFragment on FlowAction {
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
      stream {
        id
      }
    }
  `;

  export const getStreams = gql(/* GraphQL */ `
    ${AssetFragment}
    ${BatchFragment}
    ${StreamFragment}
    query getStreams($first: Int!, $orderDirection: OrderDirection!, $where: FlowStream_filter) {
      streams: flowStreams(
        first: $first
        orderBy: subgraphId
        orderDirection: $orderDirection
        where: $where
      ) {
        ...FlowStreamFragment
      }
    }
  `);

  export const getActions = gql(/* GraphQL */ `
    ${ActionFragment}
    query getActions($first: Int!, $orderDirection: OrderDirection!, $where: FlowAction_filter) {
      actions: flowActions(
        first: $first
        orderBy: subgraphId
        orderDirection: $orderDirection
        where: $where
      ) {
        ...FlowActionFragment
      }
    }
  `);
}

/* -------------------------------------------------------------------------- */
/*                     STREAMS — LOCKUP QUERIES                               */
/*    (Merged streams subgraph — Graph syntax, prefixed entities)             */
/* -------------------------------------------------------------------------- */

export namespace StreamsLockup {
  const BatchFragment = /* GraphQL */ `
    fragment LockupBatchFragment on LockupBatch {
      id
      hash
      timestamp
      size
      batcher {
        id
      }
    }
  `;

  const SegmentFragment = /* GraphQL */ `
    fragment SegmentFragment on Segment {
      id
      amount
      endAmount
      endTime
      exponent
      position
      startAmount
      startTime
    }
  `;

  const TrancheFragment = /* GraphQL */ `
    fragment TrancheFragment on Tranche {
      id
      amount
      endAmount
      endTime
      position
      startAmount
      startTime
    }
  `;

  const StreamFragmentBase = /* GraphQL */ `
    fragment LockupStreamFragmentBase on LockupStream {
      id
      alias
      cancelable
      canceled
      canceledTime
      category
      chainId
      cliff
      cliffAmount
      cliffTime
      contract
      depositAmount
      duration
      endTime
      funder
      hash
      initial
      initialAmount
      intactAmount
      position
      proxender
      proxied
      recipient
      renounceTime
      sender
      shape
      startTime
      subgraphId
      timestamp
      tokenId
      transferable
      version
      withdrawnAmount
      asset {
        ...AssetFragment
      }
      batch {
        ...LockupBatchFragment
      }
    }
  `;

  const ActionFragment = /* GraphQL */ `
    fragment LockupActionFragment on LockupAction {
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
      stream {
        id
      }
    }
  `;

  export const getStreams = gql(/* GraphQL */ `
    ${AssetFragment}
    ${BatchFragment}
    ${SegmentFragment}
    ${TrancheFragment}
    ${StreamFragmentBase}
    fragment LockupStreamFragment on LockupStream {
      ...LockupStreamFragmentBase
      segments(first: 1000, orderBy: position, orderDirection: asc) {
        ...SegmentFragment
      }
      tranches(first: 1000, orderBy: position, orderDirection: asc) {
        ...TrancheFragment
      }
    }
    query getStreams($first: Int!, $orderDirection: OrderDirection!, $where: LockupStream_filter) {
      streams: lockupStreams(
        first: $first
        orderBy: subgraphId
        orderDirection: $orderDirection
        where: $where
      ) {
        ...LockupStreamFragment
      }
    }
  `);

  export const getActions = gql(/* GraphQL */ `
    ${ActionFragment}
    query getActions($first: Int!, $orderDirection: OrderDirection!, $where: LockupAction_filter) {
      actions: lockupActions(
        first: $first
        orderBy: subgraphId
        orderDirection: $orderDirection
        where: $where
      ) {
        ...LockupActionFragment
      }
    }
  `);
}
