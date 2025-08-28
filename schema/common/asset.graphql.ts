import { gql } from "graphql-tag";
import type { Indexer } from "../../src";

const streams = /* GraphQL */ `
"""
Streams that rely on this token
"""
streams: [Stream!]! @derivedFrom(field: "asset")
`;

const campaigns = /* GraphQL */ `
"""
Campaigns that rely on this asset.
"""
campaigns: [Campaign!]! @derivedFrom(field: "asset")
`;

export function getAssetDefs(indexer: Indexer.Name) {
  const customField = indexer !== "airdrops" ? streams : campaigns;

  return gql`
    """
    ERC-20 asset
    """
    type Asset @entity(immutable: false) {
      """
      Unique identifier: \`asset-{chainId}-{address}\`
      """
      id: String!
      """
      Address of the ERC-20 token.
      """
      address: Bytes!
      """
      The chain ID where the asset exists (e.g., 137 for Polygon).
      """
      chainId: BigInt!
      """
      Decimals of the ERC20 token.
      """
      decimals: BigInt!
      """
      Name of the ERC20 token.
      """
      name: String!
      """
      Symbol of the ERC20 token.
      """
      symbol: String!
      ${customField}
    }
  `;
}
