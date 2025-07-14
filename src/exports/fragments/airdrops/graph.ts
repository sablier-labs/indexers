import { gql } from "../../gql/airdrops/graph/gql";
import { Airdrops } from "./common";

export const ActionFragment = gql(Airdrops.ActionFragment);
export const ActivityFragment = gql(Airdrops.ActivityFragment);
export const AssetFragment = gql(Airdrops.AssetFragment);
export const FactoryFragment = gql(Airdrops.FactoryFragment);
export const TrancheFragment = gql(Airdrops.TrancheFragment);

export const CampaignFragment = gql(/* GraphQL */ `
  fragment CampaignFragment on Campaign {
    ...CampaignFragmentBase
    streamTranches(first: 1000) {
      ...TrancheFragment
    }
  }
`);
