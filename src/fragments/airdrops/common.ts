import * as common from "../common";

export namespace Airdrops {
  export import AssetFragment = common.AssetFragment;

  export const ActionFragment = /* GraphQL */ `
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

  export const ActivityFragment = /* GraphQL */ `
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

  export const CampaignFragmentBase = /* GraphQL */ `
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

  export const FactoryFragment = /* GraphQL */ `
    fragment FactoryFragment on Factory {
      id
      address
      alias
    }
  `;

  export const TrancheFragment = /* GraphQL */ `
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
}
