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
/*          (Standalone flow indexer — entities are unprefixed)                */
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
  `);

  export const getActions = gql(/* GraphQL */ `
    ${ActionFragment}
    query getActions($first: Int!, $orderDirection: order_by!, $where: Action_bool_exp) {
      actions: Action(
        distinct_on: [subgraphId]
        limit: $first
        order_by: { subgraphId: $orderDirection }
        where: $where
      ) {
        ...ActionFragment
      }
    }
  `);
}

/* -------------------------------------------------------------------------- */
/*                        DEPLOYED LOCKUP QUERIES                             */
/*          (Standalone lockup indexer — entities are unprefixed)              */
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
      segments(limit: 1000, order_by: { position: asc }) {
        ...SegmentFragment
      }
      tranches(limit: 1000, order_by: { position: asc }) {
        ...TrancheFragment
      }
    }
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
  `);

  export const getActions = gql(/* GraphQL */ `
    ${ActionFragment}
    query getActions($first: Int!, $orderDirection: order_by!, $where: Action_bool_exp) {
      actions: Action(
        distinct_on: [subgraphId]
        limit: $first
        order_by: { subgraphId: $orderDirection }
        where: $where
      ) {
        ...ActionFragment
      }
    }
  `);
}

/* -------------------------------------------------------------------------- */
/*                        LOCAL STREAMS — FLOW QUERIES                        */
/*          (Merged streams indexer — entities are prefixed)                   */
/* -------------------------------------------------------------------------- */

export namespace LocalFlow {
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
    query getStreams($first: Int!, $orderDirection: order_by!, $where: FlowStream_bool_exp) {
      streams: FlowStream(
        distinct_on: [subgraphId]
        limit: $first
        order_by: { subgraphId: $orderDirection }
        where: $where
      ) {
        ...FlowStreamFragment
      }
    }
  `);

  export const getActions = gql(/* GraphQL */ `
    ${ActionFragment}
    query getActions($first: Int!, $orderDirection: order_by!, $where: FlowAction_bool_exp) {
      actions: FlowAction(
        distinct_on: [subgraphId]
        limit: $first
        order_by: { subgraphId: $orderDirection }
        where: $where
      ) {
        ...FlowActionFragment
      }
    }
  `);
}

/* -------------------------------------------------------------------------- */
/*                       LOCAL STREAMS — LOCKUP QUERIES                       */
/*          (Merged streams indexer — entities are prefixed)                   */
/* -------------------------------------------------------------------------- */

export namespace LocalLockup {
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
      segments(limit: 1000, order_by: { position: asc }) {
        ...SegmentFragment
      }
      tranches(limit: 1000, order_by: { position: asc }) {
        ...TrancheFragment
      }
    }
    query getStreams($first: Int!, $orderDirection: order_by!, $where: LockupStream_bool_exp) {
      streams: LockupStream(
        distinct_on: [subgraphId]
        limit: $first
        order_by: { subgraphId: $orderDirection }
        where: $where
      ) {
        ...LockupStreamFragment
      }
    }
  `);

  export const getActions = gql(/* GraphQL */ `
    ${ActionFragment}
    query getActions($first: Int!, $orderDirection: order_by!, $where: LockupAction_bool_exp) {
      actions: LockupAction(
        distinct_on: [subgraphId]
        limit: $first
        order_by: { subgraphId: $orderDirection }
        where: $where
      ) {
        ...LockupActionFragment
      }
    }
  `);
}
