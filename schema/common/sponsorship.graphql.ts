import { gql } from "graphql-tag";
import type { Indexer } from "../../src/types.js";

const airdropsFields = /* GraphQL */ `
  """
  Address of the campaign contract that emitted the Sponsor event.
  """
  campaignAddress: String!
  """
  ID of the campaign entity (format: \`{address}-{chainId}\`).
  """
  campaignId: String!
`;

const airdropsTrailingFields = /* GraphQL */ `
  """
  Address of the USDC token used for payment.
  """
  token: String!
`;

export function getSponsorshipDefs(target: Indexer.Target) {
  const extraFields = target === "airdrops" ? airdropsFields : "";
  const extraTrailingFields = target === "airdrops" ? airdropsTrailingFields : "";

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
      block: Int!
      ${extraFields}
      """
      The ID of the chain where the transfer occurred (e.g., 1 for Ethereum).
      """
      chainId: Int!
      """
      Log index of the Transfer event within the transaction.
      """
      logIndex: Int!
      """
      Address of the transaction signer (may differ from \`from\` for contract wallets).
      """
      sender: String!
      """
      The sponsor who made this transfer.
      """
      sponsor: Sponsor!
      """
      Unix timestamp of the transaction.
      """
      timestamp: Int!
      ${extraTrailingFields}
      """
      Hash of the transaction.
      """
      txHash: String!
    }
  `;
}
