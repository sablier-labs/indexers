export const streamDefs = /* GraphQL */ `
  # ------------------------------------ IDs ----------------------------------- #
  """
  Unique identifier: \`{contractAddress}-{chainId}-{tokenId}\`
  """
  id: String!

  """
  Like the id: \`{contractAlias}-{chainId}-{tokenId}\`
  """
  alias: String!

  """
  The chain ID where the stream was created (e.g., 137 for Polygon).
  """
  chainId: BigInt!

  """
  Unique global id as tracked by the \`Watcher\` entity.
  🚨 This may change if new data sources are added and the chronological order of streams changes.
  """
  subgraphId: BigInt!

  """
  The id provided by the NFT contract. It's the ERC-721 tokenId.
  """
  tokenId: BigInt!

  # ------------------------------- TRANSACTION ------------------------------ #
  """
  Hash of the Ethereum transaction that created this stream.
  """
  hash: Bytes!

  """
  Unix timestamp of the Ethereum transaction that created this stream.
  """
  timestamp: BigInt!

  # --------------------------------- ACTIONS -------------------------------- #
  """
  Actions triggered by this stream.
  """
  actions: [Action!]! @derivedFrom(field: "stream")

  # --------------------------------- COMMON --------------------------------- #
  """
  ERC-20 token distributed via this stream.
  """
  asset: Asset!

  """
  ERC-20 token decimals. Stored here to avoid loading the asset entity on each stream.
  Note: the "Value" suffix is added because of a bug in GraphQL Code Generator.
  """
  assetDecimalsValue: BigInt!

  """
  The batch the stream may be part of.
  Note: this is available only when created within a batch create transaction.
  """
  batch: Batch!

  """
  Category used for sorting.
  """
  category: StreamCategory!

  """
  The address of the contract the stream originates from.
  """
  contract: Bytes!

  """
  Position in the batch, if available.
  """
  position: BigInt!

  """
  Current recipient of the stream, with permission to withdraw funds to any third-party address.
  Note: the recipient can change on NFT transfer.
  """
  recipient: Bytes!

  """
  Manager of the stream, with ability to cancel the stream.
  """
  sender: Bytes!

  """
  Unix timestamp for the start of the stream.
  """
  startTime: BigInt!

  """
  Flag indicating the transferability of the stream. This is set when the stream is created, and cannot
  be changed later.
  """
  transferable: Boolean!

  """
  Version of contract, e.g., v1.0.
  """
  version: String!

  """
  The sum of all withdrawn amounts.
  """
  withdrawnAmount: BigInt!
`;
