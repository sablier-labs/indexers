import { gql } from "graphql-request";

export const ActionFragment_Envio = gql/* GraphQL */ `
  fragment ActionFragment on Action {
    
    chainId
    subgraphId
    campaign {
      id
    }
    category
    hash
    block
    timestamp
    from

    claimStreamId
    claimTokenId
    claimAmount
    claimIndex
    # claimRecipient

    clawbackAmount
    # clawbackFrom
    # clawbackTo
  }
`;

export const FactoryFragment_Envio = gql/* GraphQL */ `
  fragment FactoryFragment on Factory {
    address
  }
`;

export const AssetFragment_Envio = gql/* GraphQL */ `
  fragment AssetFragment on Asset {
    
    address
    chainId
    # this is needed because of the campaign created with the NFT
    # decimals
    # name
    # symbol
  }
`;

export const ActivityFragment_Envio = gql/* GraphQL */ `
  fragment ActivityFragment on Activity {
    id
    timestamp
    day
    amount
    claims
    campaign {
      id
    }
  }
`;

export const TrancheFragment_Envio = gql/* GraphQL */ `
  fragment TrancheFragment on Tranche {
    position
    percentage
    duration
    startPercentage
    endPercentage
    endDuration
    startDuration
  }
`;

export const CampaignFragment_Envio = gql/* GraphQL */ `
  fragment CampaignFragment on Campaign {
    id
    subgraphId
    # address
    chainId
    category
    hash
    timestamp
    # admin
    # lockup
    root
    expires
    expiration
    ipfsCID
    aggregateAmount
    totalRecipients
    clawbackTime
    # streamCliff
    # streamCliffDuration
    # streamTotalDuration
    # streamCancelable
    # streamTransferable
    claimedAmount
    claimedCount
    asset {
      ...AssetFragment
    }
    factory {
      ...FactoryFragment
    }
    actions(order_by: { subgraphId: asc }, limit: 1000) {
      ...ActionFragment
    }
    activities(order_by: { timestamp: desc }, limit: 1000) {
      ...ActivityFragment
    }
    streamTranches(order_by: { position: desc }, limit: 100) {
      ...TrancheFragment
    }
  }
`;

export const ActionFragment_TheGraph = gql/* GraphQL */ `
  fragment ActionFragment on Action {
    chainId
    subgraphId
    campaign {
      id
    }
    category
    hash
    block
    timestamp
    from

    claimStreamId
    claimTokenId
    claimAmount
    claimIndex
    claimRecipient

    clawbackAmount
    clawbackFrom
    clawbackTo
  }
`;

export const FactoryFragment_TheGraph = gql/* GraphQL */ `
  fragment FactoryFragment on Factory {
    id
    alias
    address
  }
`;

export const AssetFragment_TheGraph = gql/* GraphQL */ `
  fragment AssetFragment on Asset {
    address
    chainId
    decimals
    name
    symbol
  }
`;

export const ActivityFragment_TheGraph = /* GraphQL */ `
  fragment ActivityFragment on Activity {
    timestamp
    day
    amount
    claims
    campaign {
      id
    }
  }
`;

export const TrancheFragment_TheGraph = gql/* GraphQL */ `
  fragment TrancheFragment on Tranche {
    id
    position
    percentage
    duration
    startPercentage
    endPercentage
    endDuration
    startDuration
  }
`;

export const CampaignFragment_TheGraph = /* GraphQL */ `
  fragment CampaignFragment on Campaign {
    id
    subgraphId
    address
    chainId
    category
    hash
    timestamp
    admin
    lockup
    root
    expires
    expiration
    ipfsCID
    aggregateAmount
    totalRecipients
    clawbackTime
    streamCliff
    streamCliffDuration
    streamTotalDuration
    streamCancelable
    streamTransferable
    claimedAmount
    claimedCount
    version
    asset {
      ...AssetFragment
    }
    factory {
      ...FactoryFragment
    }
    actions(orderBy: subgraphId, orderDirection: asc, first: 1000) {
      ...ActionFragment
    }
    activities(orderBy: timestamp, orderDirection: desc, first: 1000) {
      ...ActivityFragment
    }
    streamTranches(orderBy: position, orderDirection: desc, first: 1000) {
      ...TrancheFragment
    }
  }
`;
