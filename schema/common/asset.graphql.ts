import { gql } from "graphql-tag";
import type { Indexer } from "../../src/types.js";

type SchemaIndexer = Indexer.Name | "bob";

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

const vaults = /* GraphQL */ `
"""
Vaults that rely on this asset.
"""
vaults: [Vault!]! @derivedFrom(field: "asset")
`;

export function getAssetDefs(indexer: SchemaIndexer) {
  let customField = streams;
  if (indexer === "airdrops") {
    customField = campaigns;
  } else if (indexer === "bob") {
    customField = vaults;
  }

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
