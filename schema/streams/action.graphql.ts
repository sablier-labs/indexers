import { gql } from "graphql-tag";

/**
 * Common action field definitions shared between FlowAction and LockupAction.
 * Parameterized by stream entity type and action category enum.
 */
function actionFieldDefs(streamType: string, categoryEnum: string): string {
  return `
    """
    Unique identifier: \`action-{chainId}-{txHash}-{logIndex}\`
    """
    id: String!

    """
    Unique global id as tracked by the \`Watcher\` entity.
    """
    subgraphId: BigInt!

    # -------------------------------- Transaction ------------------------------- #
    """
    Block number of the Ethereum transaction.
    """
    block: BigInt!

    """
    The chain ID where the action was created (e.g., 137 for Polygon).
    """
    chainId: BigInt!

    """
    The tx.origin of the Ethereum transaction.
    """
    from: Bytes!

    """
    Hash of the Ethereum transaction.
    """
    hash: Bytes!

    """
    Unix timestamp of the Ethereum transaction.
    """
    timestamp: BigInt!

    # --------------------------------- Metadata --------------------------------- #
    """
    Category of action, e.g., Deposit.
    """
    category: ${categoryEnum}!

    """
    Contract through which the action was triggered.
    """
    contract: Bytes!

    """
    The Sablier fee paid in the native token of the chain (e.g., ETH for Mainnet).
    See https://docs.sablier.com/concepts/fees
    """
    fee: BigInt

    """
    Stream linked to this action, if any.
    """
    stream: ${streamType}

    # --------------------------------- Addresses -------------------------------- #
    """
    Address of 1st actor. Who this is depends upon the action type, e.g. for Create, it is the sender.
    """
    addressA: Bytes

    """
    Address of 2nd actor. Who this is depends upon the action type, e.g. for Transfer, it is the recipient.
    """
    addressB: Bytes

    # ---------------------------------- Amounts --------------------------------- #
    """
    1st amount. What this is depends upon the action type, e.g. for Deposit, it is the deposit amount.
    """
    amountA: BigInt

    """
    2nd amount. What this is depends upon the action type, e.g. for Withdraw, it is the refund amount.
    """
    amountB: BigInt
  `;
}

export const streamsActionDefs = gql`
  """
  A generic entity for tracking Flow protocol actions.
  """
  type FlowAction @entity(immutable: true) {
    ${actionFieldDefs("FlowStream", "FlowActionCategory")}
  }

  """
  A generic entity for tracking Lockup protocol actions.
  """
  type LockupAction @entity(immutable: true) {
    ${actionFieldDefs("LockupStream", "LockupActionCategory")}
  }
`;
