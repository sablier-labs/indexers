import { gql } from "graphql-tag";
import type { Indexer } from "../../src/types.js";

const airdropsFields = /* GraphQL */ `
  """
  Address of the campaign contract that emitted the Sponsor event.
  """
  campaignAddress: Bytes!
  """
  ID of the campaign entity (format: \`{address}-{chainId}\`).
  """
  campaignId: String!
`;

export function getSponsorshipDefs(target: Indexer.Target) {
  const extraFields = target === "airdrops" ? airdropsFields : "";

  return gql`
    """
    A single USDC transfer to the Sablier treasury. Immutable — one per Transfer event.
    """
    type Sponsorship @entity(immutable: true) {
      """
      Unique identifier: \`{chainId}_{txHash}_{logIndex}\`
      """
      id: String!
      """
      Raw USDC amount.
      """
      amount: BigInt!
      """
      Human-readable USDC amount (e.g., "1719.12").
      """
      amountDisplay: String!
      """
      Block number of the transaction.
      """
      block: BigInt!
      ${extraFields}
      """
      The ID of the chain where the transfer occurred (e.g., 1 for Ethereum).
      """
      chainId: BigInt!
      """
      Log index of the Transfer event within the transaction.
      """
      logIndex: Int!
      """
      Address of the transaction signer (may differ from \`from\` for contract wallets).
      """
      sender: Bytes!
      """
      The sponsor who made this transfer.
      """
      sponsor: Sponsor!
      """
      Unix timestamp of the transaction.
      """
      timestamp: BigInt!
      """
      Hash of the transaction.
      """
      txHash: Bytes!
    }
  `;
}
