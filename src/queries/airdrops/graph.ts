import { gql } from "../../gql/airdrops/graph/gql";

/* -------------------------------------------------------------------------- */
/*                                   ACTIONS                                  */
/* -------------------------------------------------------------------------- */

export const getActions = gql(/* GraphQL */ `
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

/* -------------------------------------------------------------------------- */
/*                              CAMPAIGN - SINGLE                             */
/* -------------------------------------------------------------------------- */

export const getCampaign = gql(/* GraphQL */ `
  query getCampaign($campaignId: ID!) {
    campaign(id: $campaignId) {
      ...CampaignFragment
    }
  }
`);

export const getCampaignWithActions = gql(/* GraphQL */ `
  query getCampaignWithActions($campaignId: ID!) {
    campaign(id: $campaignId) {
      ...CampaignFragment
      actions(first: 1000, orderBy: subgraphId, orderDirection: asc) {
        ...ActionFragment
      }
    }
  }
`);

export const getCampaignMetadata = gql(/* GraphQL */ `
  query getCampaignMetadata(
    $campaignId: ID!
    $campaignId_string: String!
    $dayFrom: BigInt!
    $dayTo: BigInt!
  ) {
    campaign(id: $campaignId) {
      id
      actions(first: 5, orderBy: subgraphId, orderDirection: desc) {
        ...ActionFragment
      }
      activities(first: 7, where: { day_gte: $dayFrom, day_lte: $dayTo }) {
        ...ActivityFragment
      }
      asset {
        ...AssetFragment
      }
    }
    firsts: actions(
      first: 1
      orderBy: timestamp
      orderDirection: asc
      where: { campaign: $campaignId_string, category: Claim }
    ) {
      ...ActionFragment
    }
    actions(
      first: 10
      orderBy: subgraphId
      orderDirection: desc
      where: { campaign: $campaignId_string, category: Claim }
    ) {
      ...ActionFragment
    }
  }
`);

/* -------------------------------------------------------------------------- */
/*                              CAMPAIGN - MULTIPLE                            */
/* -------------------------------------------------------------------------- */

export const getCampaigns = gql(/* GraphQL */ `
  query getCampaigns($first: Int!, $orderDirection: OrderDirection!, $where: Campaign_filter) {
    campaigns(
      first: $first
      orderBy: subgraphId
      orderDirection: $orderDirection
      where: $where
    ) {
      ...CampaignFragment
    }
  }
`);

export const getCampaignsWithActions = gql(/* GraphQL */ `
  query getCampaignsWithActions($first: Int!, $orderDirection: OrderDirection!, $where: Campaign_filter) {
    campaigns(first: $first, orderBy: subgraphId, orderDirection: $orderDirection, where: $where) {
      ...CampaignFragment
      actions(first: 1000, orderBy: subgraphId, orderDirection: asc) {
        ...ActionFragment
      }
    }
  }
`);

export const getCampaignsWithActivities = gql(/* GraphQL */ `
  query getCampaignsWithActivities($first: Int!, $orderDirection: OrderDirection!, $where: Campaign_filter) {
    campaigns(first: $first, orderBy: subgraphId, orderDirection: $orderDirection, where: $where) {
      ...CampaignFragment
      activities(first: 1000, orderBy: timestamp, orderDirection: asc) {
        ...ActivityFragment
      }
    }
  }
`);

export const getCampaignsWithActionsAndActivities = gql(/* GraphQL */ `
  query getCampaignsWithActionsAndActivities($first: Int!, $orderDirection: OrderDirection!, $where: Campaign_filter) {
    campaigns(first: $first, orderBy: subgraphId, orderDirection: $orderDirection, where: $where) {
      ...CampaignFragment
      actions(first: 1000, orderBy: subgraphId, orderDirection: asc) {
        ...ActionFragment
      }
      activities(first: 1000, orderBy: timestamp, orderDirection: asc) {
        ...ActivityFragment
      }
    }
  }
`);

export const getCampaignsWithClaims = gql(/* GraphQL */ `
  query getCampaignsWithClaims(
    $first: Int!
    $claimer: Bytes!
    $orderDirection: OrderDirection!
    $where: Campaign_filter
  ) {
    campaigns(
      first: $first
      orderBy: subgraphId
      orderDirection: $orderDirection
      where: $where
    ) {
      ...CampaignFragment
      actions(where: { category: Claim, claimRecipient: $claimer }) {
        ...ActionFragment
      }
    }
  }
`);
