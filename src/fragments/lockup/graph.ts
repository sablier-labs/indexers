import { gql } from "../../gql/lockup/graph/gql";
import { Lockup } from "./common";

export const ActionFragment = gql(Lockup.ActionFragment);
export const AssetFragment = gql(Lockup.AssetFragment);
export const BatchFragment = gql(Lockup.BatchFragment);

export const StreamFragment = gql(/* GraphQL */ `
  fragment StreamFragment on Stream {
    ...StreamFragmentBase
    segments(first: 1000, orderBy: position, orderDirection: asc) {
      ...SegmentFragment
    }
    tranches(first: 1000, orderBy: position, orderDirection: asc) {
      ...TrancheFragment
    }
  }
`);
