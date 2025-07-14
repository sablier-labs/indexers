import { gql } from "../../gql/lockup/envio/gql";
import { Lockup } from "./common";

export const ActionFragment = gql(Lockup.ActionFragment);
export const AssetFragment = gql(Lockup.AssetFragment);
export const BatchFragment = gql(Lockup.BatchFragment);

export const StreamFragment = gql(/* GraphQL */ `
  fragment StreamFragment on Stream {
    ...StreamFragmentBase
    segments(limit: 1000, order_by: { position: asc }) {
      ...SegmentFragment
    }
    tranches(limit: 1000, order_by: { position: asc }) {
      ...TrancheFragment
    }
  }
`);
