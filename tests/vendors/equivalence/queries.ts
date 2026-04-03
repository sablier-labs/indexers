import type { DocumentNode } from "graphql";
import { parse } from "graphql";

function gql(source: string): DocumentNode {
  return parse(source);
}

/* -------------------------------------------------------------------------- */
/*                           COMMON FRAGMENTS                                 */
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

const LockupBatchFragment = /* GraphQL */ `
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

/* -------------------------------------------------------------------------- */
/*                         LOCKUP ACTION FRAGMENT                             */
/* -------------------------------------------------------------------------- */

const LockupActionFragment = /* GraphQL */ `
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

/* -------------------------------------------------------------------------- */
/*                              LOCKUP FRAGMENTS                              */
/* -------------------------------------------------------------------------- */

const LockupSegmentFragment = /* GraphQL */ `
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

const LockupTrancheFragment = /* GraphQL */ `
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

const LockupStreamFragmentBase = /* GraphQL */ `
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

/* -------------------------------------------------------------------------- */
/*                             AIRDROPS FRAGMENTS                             */
/* -------------------------------------------------------------------------- */

const AirdropsActionFragment = /* GraphQL */ `
  fragment ActionFragment on Action {
    id
    block
    category
    chainId
    claimAmount
    claimIndex
    claimRecipient
    claimStreamId
    claimTokenId
    clawbackAmount
    clawbackFrom
    clawbackTo
    fee
    from
    hash
    subgraphId
    timestamp
    campaign {
      id
      name
      nickname
    }
  }
`;

const AirdropsActivityFragment = /* GraphQL */ `
  fragment ActivityFragment on Activity {
    id
    amount
    claims
    day
    timestamp
    campaign {
      id
    }
  }
`;

const AirdropsFactoryFragment = /* GraphQL */ `
  fragment FactoryFragment on Factory {
    id
    address
    alias
  }
`;

const AirdropsTrancheFragment = /* GraphQL */ `
  fragment TrancheFragment on Tranche {
    id
    duration
    endDuration
    endPercentage
    percentage
    position
    startDuration
    startPercentage
  }
`;

const AirdropsCampaignFragmentBase = /* GraphQL */ `
  fragment CampaignFragmentBase on Campaign {
    id
    address
    admin
    aggregateAmount
    category
    chainId
    claimedAmount
    claimedCount
    clawbackTime
    expiration
    expires
    fee
    hash
    ipfsCID
    lockup
    name
    nickname
    root
    streamCancelable
    streamCliff
    streamCliffDuration
    streamCliffPercentage
    streamInitial
    streamInitialPercentage
    streamShape
    streamStart
    streamStartTime
    streamTotalDuration
    streamTransferable
    subgraphId
    timestamp
    totalRecipients
    version
    asset {
      ...AssetFragment
    }
    factory {
      ...FactoryFragment
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                           LOCKUP ENVIO QUERIES                             */
/* -------------------------------------------------------------------------- */

export namespace LockupEnvio {
  export const getStreams = gql(/* GraphQL */ `
    ${AssetFragment}
    ${LockupBatchFragment}
    ${LockupSegmentFragment}
    ${LockupTrancheFragment}
    ${LockupStreamFragmentBase}
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
    ${AssetFragment}
    ${LockupActionFragment}
    query getActions($first: Int!, $orderDirection: order_by!, $where: LockupAction_bool_exp) {
      actions: LockupAction(
        distinct_on: [subgraphId]
        limit: $first
        order_by: { subgraphId: $orderDirection }
        where: $where
      ) {
        ...LockupActionFragment
        stream {
          id
          alias
          asset {
            ...AssetFragment
          }
        }
      }
    }
  `);
}

/* -------------------------------------------------------------------------- */
/*                           LOCKUP GRAPH QUERIES                             */
/* -------------------------------------------------------------------------- */

export namespace LockupGraph {
  export const getStreams = gql(/* GraphQL */ `
    ${AssetFragment}
    ${LockupBatchFragment}
    ${LockupSegmentFragment}
    ${LockupTrancheFragment}
    ${LockupStreamFragmentBase}
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
    ${AssetFragment}
    ${LockupActionFragment}
    query getActions($first: Int!, $orderDirection: OrderDirection!, $where: LockupAction_filter) {
      actions: lockupActions(
        first: $first
        orderBy: subgraphId
        orderDirection: $orderDirection
        where: $where
      ) {
        ...LockupActionFragment
        stream {
          id
          alias
          asset {
            ...AssetFragment
          }
        }
      }
    }
  `);
}

/* -------------------------------------------------------------------------- */
/*                          AIRDROPS ENVIO QUERIES                            */
/* -------------------------------------------------------------------------- */

export namespace AirdropsEnvio {
  export const getCampaignsWithActivities = gql(/* GraphQL */ `
    ${AssetFragment}
    ${AirdropsFactoryFragment}
    ${AirdropsTrancheFragment}
    ${AirdropsCampaignFragmentBase}
    fragment CampaignFragment on Campaign {
      ...CampaignFragmentBase
      streamTranches(limit: 1000, order_by: { position: asc }) {
        ...TrancheFragment
      }
    }
    ${AirdropsActivityFragment}
    query getCampaignsWithActivities($first: Int!, $orderDirection: order_by!, $where: Campaign_bool_exp) {
      campaigns: Campaign(
        distinct_on: [subgraphId]
        limit: $first
        order_by: { subgraphId: $orderDirection }
        where: $where
      ) {
        ...CampaignFragment
        activities(limit: 1000, order_by: { timestamp: asc }) {
          ...ActivityFragment
        }
      }
    }
  `);

  export const getActions = gql(/* GraphQL */ `
    ${AssetFragment}
    ${AirdropsActionFragment}
    query getActions($first: Int!, $orderDirection: order_by!, $where: Action_bool_exp) {
      actions: Action(
        distinct_on: [subgraphId]
        limit: $first
        order_by: { subgraphId: $orderDirection }
        where: $where
      ) {
        ...ActionFragment
        campaign {
          id
          category
          name
          nickname
          asset {
            ...AssetFragment
          }
        }
      }
    }
  `);
}

/* -------------------------------------------------------------------------- */
/*                          AIRDROPS GRAPH QUERIES                            */
/* -------------------------------------------------------------------------- */

export namespace AirdropsGraph {
  export const getCampaignsWithActivities = gql(/* GraphQL */ `
    ${AssetFragment}
    ${AirdropsFactoryFragment}
    ${AirdropsTrancheFragment}
    ${AirdropsCampaignFragmentBase}
    fragment CampaignFragment on Campaign {
      ...CampaignFragmentBase
      streamTranches(first: 1000, orderBy: position, orderDirection: asc) {
        ...TrancheFragment
      }
    }
    ${AirdropsActivityFragment}
    query getCampaignsWithActivities($first: Int!, $orderDirection: OrderDirection!, $where: Campaign_filter) {
      campaigns(first: $first, orderBy: subgraphId, orderDirection: $orderDirection, where: $where) {
        ...CampaignFragment
        activities(first: 1000, orderBy: timestamp, orderDirection: asc) {
          ...ActivityFragment
        }
      }
    }
  `);

  export const getActions = gql(/* GraphQL */ `
    ${AssetFragment}
    ${AirdropsActionFragment}
    query getActions($first: Int!, $where: Action_filter) {
      actions(
        first: $first
        orderBy: subgraphId
        orderDirection: desc
        where: $where
      ) {
        ...ActionFragment
        campaign {
          id
          category
          name
          nickname
          asset {
            ...AssetFragment
          }
        }
      }
    }
  `);
}
