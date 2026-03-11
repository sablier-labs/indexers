import { gql } from "graphql-tag";

/**
 * Generates prefixed Batch and Batcher entities for a given protocol.
 */
function batchDefs(prefix: string, streamType: string): string {
  return `
    """
    Creating streams in bulk is possible using the Sablier batch contracts.
    """
    type ${prefix}Batch @entity(immutable: true) {
      """
      Unique identifier: \`batch-{chainId}-{txHash}-{batcher}\`
      """
      id: String!

      # -------------------------------- Transaction ------------------------------- #
      """
      Hash of the Ethereum transaction that created this batch.
      """
      hash: Bytes

      """
      Timestamp of the transaction that created this batch.
      """
      timestamp: BigInt

      # ------------------------------- Batch Fields ------------------------------- #
      """
      The sender address that created this batch.
      """
      batcher: ${prefix}Batcher

      """
      Index of the batch based on the \`batchCounter\` in the \`Batcher\` entity.
      """
      position: BigInt

      """
      Number of streams part of this batch.
      """
      size: BigInt!

      """
      Streams part of this batch.
      """
      streams: [${streamType}!]! @derivedFrom(field: "batch")
    }

    """
    Sender address that created batches.
    """
    type ${prefix}Batcher @entity(immutable: false) {
      """
      Unique identifier: \`batcher-{chainId}-{sender}\`
      """
      id: String!

      """
      Total number of batches started by this sender.
      """
      batchCounter: BigInt!

      """
      Batches started by this sender.
      """
      batches: [${prefix}Batch!]! @derivedFrom(field: "batcher")
    }
  `;
}

export const streamsBatchDefs = gql`
  ${batchDefs("Flow", "FlowStream")}
  ${batchDefs("Lockup", "LockupStream")}
`;
