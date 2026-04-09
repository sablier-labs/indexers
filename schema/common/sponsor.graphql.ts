import { gql } from "graphql-tag";
import type { Indexer } from "../../src/types.js";

export function getSponsorDefs(_target: Indexer.Target) {
  return gql`
    """
    An address that has sent USDC to the Sablier treasury for the billing process.
    """
    type Sponsor @entity(immutable: false) {
      """
      Unique identifier: \`{chainId}_{address}\`
      """
      id: String!
      """
      Address of the sponsor.
      """
      address: Bytes!
      """
      The chain ID where the sponsorship was made (sponsorships are chain-specific).
      """
      chainId: BigInt!
      """
      Number of sponsorships made by this sponsor.
      """
      sponsorshipCount: Int!
      """
      List of individual sponsorship transfers made by this sponsor.
      """
      sponsorships: [Sponsorship!]! @derivedFrom(field: "sponsor")
      """
      Cumulative raw USDC amount paid by the sponsor.
      """
      totalAmount: BigInt!
      """
      Human-readable cumulative USDC amount paid by the sponsor (e.g., "1729.12").
      """
      totalAmountDisplay: String!
    }
  `;
}
