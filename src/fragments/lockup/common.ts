import * as common from "../common";

export namespace Lockup {
  export import ActionFragment = common.ActionFragment;
  export import AssetFragment = common.AssetFragment;
  export import BatchFragment = common.BatchFragment;

  export const SegmentFragment = /* GraphQL */ `
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

  export const StreamFragmentBase = /* GraphQL */ `
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

  export const TrancheFragment = /* GraphQL */ `
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
}
