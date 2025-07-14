import { gql } from "../../gql/airdrops/envio/gql";

/* -------------------------------------------------------------------------- */
/*                                   ACTIONS                                  */
/* -------------------------------------------------------------------------- */

export const getActions = gql(/* GraphQL */ `
  query getActions($first: Int!, $orderDirection: order_by!, $where: Action_bool_exp) {
    actions: Action(
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

/* -------------------------------------------------------------------------- */
/*                              CAMPAIGN - SINGLE                             */
/* -------------------------------------------------------------------------- */

export const getCampaign = gql(/* GraphQL */ `
  query getCampaign($campaignId: String!) {
    campaign: Campaign_by_pk(id: $campaignId) {
      ...CampaignFragment
    }
  }
`);

export const getCampaignMetadata = gql(/* GraphQL */ `
  query getCampaignMetadata(
    $campaignId: String!
    $campaignId_string: String!
    $dayFrom: numeric!
    $dayTo: numeric!
  ) {
    campaign: Campaign_by_pk(id: $campaignId) {
      id
      actions(
        limit: 5
        order_by: { subgraphId: desc }
      ) {
        ...ActionFragment
      }
      activities(
        limit: 7
        distinct_on: [day]
        order_by: { day: asc }
        where: {
          day: { _gte: $dayFrom, _lte: $dayTo },
          campaign_id: { _eq: $campaignId }
        }
      ) {
        ...ActivityFragment
      }
      asset {
        ...AssetFragment
      }
    }
    firsts: Action(
      limit: 1
      order_by: { subgraphId: asc, timestamp: asc }
      where: {
        campaign_id: { _eq: $campaignId_string }
        category: { _eq: "Claim" }
      }
    ) {
      ...ActionFragment
    }
    actions: Action(
      limit: 10
      order_by: { subgraphId: desc }
      where: {
        campaign_id: { _eq: $campaignId_string }
        category: { _eq: "Claim" }
      }
    ) {
      ...ActionFragment
    }
  }
`);

export const getCampaignWithActions = gql(/* GraphQL */ `
  query getCampaignWithActions($campaignId: String!) {
    campaign: Campaign_by_pk(id: $campaignId) {
      ...CampaignFragment
      actions(limit: 1000, order_by: { subgraphId: asc }) {
        ...ActionFragment
      }
    }
  }
`);

/* -------------------------------------------------------------------------- */
/*                              CAMPAIGN - MULTIPLE                            */
/* -------------------------------------------------------------------------- */

export const getCampaigns = gql(/* GraphQL */ `
  query getCampaigns($first: Int!, $orderDirection: order_by!, $where: Campaign_bool_exp) {
    campaigns: Campaign(
      limit: $first
      order_by: { subgraphId: $orderDirection }
      where: $where
    ) {
      ...CampaignFragment
    }
  }
`);

export const getCampaignsWithActions = gql(/* GraphQL */ `
  query getCampaignsWithActions($first: Int!, $orderDirection: order_by!, $where: Campaign_bool_exp) {
    campaigns: Campaign(
      limit: $first
      order_by: { subgraphId: $orderDirection }
      where: $where
    ) {
      ...CampaignFragment
      actions(limit: 1000, order_by: { subgraphId: asc }) {
        ...ActionFragment
      }
    }
  }
`);

export const getCampaignsWithActivities = gql(/* GraphQL */ `
  query getCampaignsWithActivities($first: Int!, $orderDirection: order_by!, $where: Campaign_bool_exp) {
    campaigns: Campaign(
      limit: $first
      order_by: { subgraphId: $orderDirection }
      where: $where
    ) {
      ...CampaignFragment
      activities(limit: 1000, order_by: { timestamp: desc }) {
        ...ActivityFragment
      }
    }
  }
`);

export const getCampaignsWithActionsAndActivities = gql(/* GraphQL */ `
  query getCampaignsWithActionsAndActivities($first: Int!, $orderDirection: order_by!, $where: Campaign_bool_exp) {
    campaigns: Campaign(
      limit: $first
      order_by: { subgraphId: $orderDirection }
      where: $where
    ) {
      ...CampaignFragment
      actions(limit: 1000, order_by: { subgraphId: asc }) {
        ...ActionFragment
      }
      activities(limit: 1000, order_by: { timestamp: asc }) {
        ...ActivityFragment
      }
    }
  }
`);

export const getCampaignsWithClaims = gql(/* GraphQL */ `
  query getCampaignsWithClaims(
    $claimer: String!
    $first: Int!
    $orderDirection: order_by!
    $where: Campaign_bool_exp
  ) {
    campaigns: Campaign(
      limit: $first
      order_by: { subgraphId: $orderDirection }
      where: $where
    ) {
      ...CampaignFragment
      actions(
        where: {
          claimRecipient: { _eq: $claimer }
          category: { _eq: "Claim" }
        }
      ) {
        ...ActionFragment
      }
    }
  }
`);
