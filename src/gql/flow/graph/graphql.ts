/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  /** 8 bytes signed integer */
  Int8: { input: any; output: any; }
  /** A string representation of microseconds UNIX timestamp (16 digits) */
  Timestamp: { input: any; output: any; }
};

/** A generic entity for tracking protocol actions. There may be multiple actions for a single tx. */
export type Action = {
  __typename?: 'Action';
  /** Address of 1st actor. Who this is depends upon the action type, e.g. for Create, it is the sender. */
  addressA?: Maybe<Scalars['Bytes']['output']>;
  /** Address of 2nd actor. Who this is depends upon the action type, e.g. for Transfer, it is the recipient. */
  addressB?: Maybe<Scalars['Bytes']['output']>;
  /** 1st amount. What this is depends upon the action type, e.g. for Deposit, it is the deposit amount. */
  amountA?: Maybe<Scalars['BigInt']['output']>;
  /** 2nd amount. What this is depends upon the action type, e.g. for Withdraw, it is the refund amount. */
  amountB?: Maybe<Scalars['BigInt']['output']>;
  /** Block number of the Ethereum transaction. */
  block: Scalars['BigInt']['output'];
  /** Category of action, e.g., Deposit. */
  category: ActionCategory;
  /** The chain ID where the action was created (e.g., 137 for Polygon). */
  chainId: Scalars['BigInt']['output'];
  /** Contract through which the action was triggered. */
  contract: Scalars['Bytes']['output'];
  /**
   * The Sablier fee paid in the native token of the chain (e.g., ETH for Mainnet).
   * See https://docs.sablier.com/concepts/fees
   */
  fee?: Maybe<Scalars['BigInt']['output']>;
  /** The tx.origin of the Ethereum transaction. */
  from: Scalars['Bytes']['output'];
  /** Hash of the Ethereum transaction. */
  hash: Scalars['Bytes']['output'];
  /** Unique identifier: `action-{chainId}-{txHash}-{logIndex}` */
  id: Scalars['String']['output'];
  /** Stream linked to this action, if any. */
  stream?: Maybe<Stream>;
  /** Unique global id as tracked by the `Watcher` entity. */
  subgraphId: Scalars['BigInt']['output'];
  /** Unix timestamp of the Ethereum transaction. */
  timestamp: Scalars['BigInt']['output'];
};

export enum ActionCategory {
  Adjust = 'Adjust',
  Approval = 'Approval',
  ApprovalForAll = 'ApprovalForAll',
  Create = 'Create',
  Deposit = 'Deposit',
  Pause = 'Pause',
  Refund = 'Refund',
  Restart = 'Restart',
  Transfer = 'Transfer',
  Void = 'Void',
  Withdraw = 'Withdraw'
}

export type Action_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  addressA?: InputMaybe<Scalars['Bytes']['input']>;
  addressA_contains?: InputMaybe<Scalars['Bytes']['input']>;
  addressA_gt?: InputMaybe<Scalars['Bytes']['input']>;
  addressA_gte?: InputMaybe<Scalars['Bytes']['input']>;
  addressA_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  addressA_lt?: InputMaybe<Scalars['Bytes']['input']>;
  addressA_lte?: InputMaybe<Scalars['Bytes']['input']>;
  addressA_not?: InputMaybe<Scalars['Bytes']['input']>;
  addressA_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  addressA_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  addressB?: InputMaybe<Scalars['Bytes']['input']>;
  addressB_contains?: InputMaybe<Scalars['Bytes']['input']>;
  addressB_gt?: InputMaybe<Scalars['Bytes']['input']>;
  addressB_gte?: InputMaybe<Scalars['Bytes']['input']>;
  addressB_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  addressB_lt?: InputMaybe<Scalars['Bytes']['input']>;
  addressB_lte?: InputMaybe<Scalars['Bytes']['input']>;
  addressB_not?: InputMaybe<Scalars['Bytes']['input']>;
  addressB_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  addressB_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  amountA?: InputMaybe<Scalars['BigInt']['input']>;
  amountA_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountA_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountA_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amountA_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountA_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountA_not?: InputMaybe<Scalars['BigInt']['input']>;
  amountA_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amountB?: InputMaybe<Scalars['BigInt']['input']>;
  amountB_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountB_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountB_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amountB_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountB_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountB_not?: InputMaybe<Scalars['BigInt']['input']>;
  amountB_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Action_Filter>>>;
  block?: InputMaybe<Scalars['BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['BigInt']['input']>;
  block_not?: InputMaybe<Scalars['BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  category?: InputMaybe<ActionCategory>;
  category_in?: InputMaybe<Array<ActionCategory>>;
  category_not?: InputMaybe<ActionCategory>;
  category_not_in?: InputMaybe<Array<ActionCategory>>;
  chainId?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  contract?: InputMaybe<Scalars['Bytes']['input']>;
  contract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  contract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  contract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  contract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  contract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  contract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  contract_not?: InputMaybe<Scalars['Bytes']['input']>;
  contract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  contract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  fee?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  from?: InputMaybe<Scalars['Bytes']['input']>;
  from_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from_gt?: InputMaybe<Scalars['Bytes']['input']>;
  from_gte?: InputMaybe<Scalars['Bytes']['input']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_lt?: InputMaybe<Scalars['Bytes']['input']>;
  from_lte?: InputMaybe<Scalars['Bytes']['input']>;
  from_not?: InputMaybe<Scalars['Bytes']['input']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  hash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  hash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  hash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  hash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  hash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  hash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Action_Filter>>>;
  stream?: InputMaybe<Scalars['String']['input']>;
  stream_?: InputMaybe<Stream_Filter>;
  stream_contains?: InputMaybe<Scalars['String']['input']>;
  stream_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  stream_ends_with?: InputMaybe<Scalars['String']['input']>;
  stream_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  stream_gt?: InputMaybe<Scalars['String']['input']>;
  stream_gte?: InputMaybe<Scalars['String']['input']>;
  stream_in?: InputMaybe<Array<Scalars['String']['input']>>;
  stream_lt?: InputMaybe<Scalars['String']['input']>;
  stream_lte?: InputMaybe<Scalars['String']['input']>;
  stream_not?: InputMaybe<Scalars['String']['input']>;
  stream_not_contains?: InputMaybe<Scalars['String']['input']>;
  stream_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  stream_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  stream_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  stream_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  stream_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  stream_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  stream_starts_with?: InputMaybe<Scalars['String']['input']>;
  stream_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  subgraphId?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  subgraphId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphId_not?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Action_OrderBy {
  AddressA = 'addressA',
  AddressB = 'addressB',
  AmountA = 'amountA',
  AmountB = 'amountB',
  Block = 'block',
  Category = 'category',
  ChainId = 'chainId',
  Contract = 'contract',
  Fee = 'fee',
  From = 'from',
  Hash = 'hash',
  Id = 'id',
  Stream = 'stream',
  StreamAlias = 'stream__alias',
  StreamAssetDecimalsValue = 'stream__assetDecimalsValue',
  StreamAvailableAmount = 'stream__availableAmount',
  StreamCategory = 'stream__category',
  StreamChainId = 'stream__chainId',
  StreamContract = 'stream__contract',
  StreamCreator = 'stream__creator',
  StreamDepletionTime = 'stream__depletionTime',
  StreamDepositedAmount = 'stream__depositedAmount',
  StreamForgivenDebt = 'stream__forgivenDebt',
  StreamHash = 'stream__hash',
  StreamId = 'stream__id',
  StreamLastAdjustmentTimestamp = 'stream__lastAdjustmentTimestamp',
  StreamPaused = 'stream__paused',
  StreamPausedTime = 'stream__pausedTime',
  StreamPosition = 'stream__position',
  StreamRatePerSecond = 'stream__ratePerSecond',
  StreamRecipient = 'stream__recipient',
  StreamRefundedAmount = 'stream__refundedAmount',
  StreamSender = 'stream__sender',
  StreamSnapshotAmount = 'stream__snapshotAmount',
  StreamStartTime = 'stream__startTime',
  StreamSubgraphId = 'stream__subgraphId',
  StreamTimestamp = 'stream__timestamp',
  StreamTokenId = 'stream__tokenId',
  StreamTransferable = 'stream__transferable',
  StreamVersion = 'stream__version',
  StreamVoided = 'stream__voided',
  StreamVoidedTime = 'stream__voidedTime',
  StreamWithdrawnAmount = 'stream__withdrawnAmount',
  SubgraphId = 'subgraphId',
  Timestamp = 'timestamp'
}

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour'
}

/** ERC-20 asset */
export type Asset = {
  __typename?: 'Asset';
  /** Address of the ERC-20 token. */
  address: Scalars['Bytes']['output'];
  /** The chain ID where the asset exists (e.g., 137 for Polygon). */
  chainId: Scalars['BigInt']['output'];
  /** Decimals of the ERC20 token. */
  decimals: Scalars['BigInt']['output'];
  /** Unique identifier: `asset-{chainId}-{address}` */
  id: Scalars['String']['output'];
  /** Name of the ERC20 token. */
  name: Scalars['String']['output'];
  /** Streams that rely on this token */
  streams: Array<Stream>;
  /** Symbol of the ERC20 token. */
  symbol: Scalars['String']['output'];
};


/** ERC-20 asset */
export type AssetStreamsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Stream_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Stream_Filter>;
};

export type Asset_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['Bytes']['input']>;
  address_not?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Asset_Filter>>>;
  chainId?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  decimals?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_gt?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_gte?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  decimals_lt?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_lte?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_not?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Asset_Filter>>>;
  streams_?: InputMaybe<Stream_Filter>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Asset_OrderBy {
  Address = 'address',
  ChainId = 'chainId',
  Decimals = 'decimals',
  Id = 'id',
  Name = 'name',
  Streams = 'streams',
  Symbol = 'symbol'
}

/**
 * Creating streams in bulk is possible using the SablierBatchLockup contract.
 * See https://github.com/sablier-labs/lockup/blob/v2.0/src/SablierBatchLockup.sol
 *
 * Note: the entity can be immutable because a batch is only updated in the same block.
 * See https://thegraph.com/docs/en/subgraphs/developing/creating/ql-schema/#defining-entities
 */
export type Batch = {
  __typename?: 'Batch';
  /** The sender address that created this batch. */
  batcher?: Maybe<Batcher>;
  /** Hash of the Ethereum transaction that created this batch. */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** Unique identifier: `batch-{chainId}-{txHash}-{batcher}` */
  id: Scalars['String']['output'];
  /** Index of the batch based on the `batchCounter` in the `Batcher` entity. */
  position?: Maybe<Scalars['BigInt']['output']>;
  /** Number of streams part of this batch. */
  size: Scalars['BigInt']['output'];
  /** Streams part of this batch. */
  streams: Array<Stream>;
  /** Timestamp of the transaction that created this batch. */
  timestamp?: Maybe<Scalars['BigInt']['output']>;
};


/**
 * Creating streams in bulk is possible using the SablierBatchLockup contract.
 * See https://github.com/sablier-labs/lockup/blob/v2.0/src/SablierBatchLockup.sol
 *
 * Note: the entity can be immutable because a batch is only updated in the same block.
 * See https://thegraph.com/docs/en/subgraphs/developing/creating/ql-schema/#defining-entities
 */
export type BatchStreamsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Stream_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Stream_Filter>;
};

export type Batch_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Batch_Filter>>>;
  batcher?: InputMaybe<Scalars['String']['input']>;
  batcher_?: InputMaybe<Batcher_Filter>;
  batcher_contains?: InputMaybe<Scalars['String']['input']>;
  batcher_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  batcher_ends_with?: InputMaybe<Scalars['String']['input']>;
  batcher_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  batcher_gt?: InputMaybe<Scalars['String']['input']>;
  batcher_gte?: InputMaybe<Scalars['String']['input']>;
  batcher_in?: InputMaybe<Array<Scalars['String']['input']>>;
  batcher_lt?: InputMaybe<Scalars['String']['input']>;
  batcher_lte?: InputMaybe<Scalars['String']['input']>;
  batcher_not?: InputMaybe<Scalars['String']['input']>;
  batcher_not_contains?: InputMaybe<Scalars['String']['input']>;
  batcher_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  batcher_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  batcher_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  batcher_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  batcher_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  batcher_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  batcher_starts_with?: InputMaybe<Scalars['String']['input']>;
  batcher_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  hash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  hash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  hash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  hash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  hash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  hash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Batch_Filter>>>;
  position?: InputMaybe<Scalars['BigInt']['input']>;
  position_gt?: InputMaybe<Scalars['BigInt']['input']>;
  position_gte?: InputMaybe<Scalars['BigInt']['input']>;
  position_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  position_lt?: InputMaybe<Scalars['BigInt']['input']>;
  position_lte?: InputMaybe<Scalars['BigInt']['input']>;
  position_not?: InputMaybe<Scalars['BigInt']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  size?: InputMaybe<Scalars['BigInt']['input']>;
  size_gt?: InputMaybe<Scalars['BigInt']['input']>;
  size_gte?: InputMaybe<Scalars['BigInt']['input']>;
  size_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  size_lt?: InputMaybe<Scalars['BigInt']['input']>;
  size_lte?: InputMaybe<Scalars['BigInt']['input']>;
  size_not?: InputMaybe<Scalars['BigInt']['input']>;
  size_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  streams_?: InputMaybe<Stream_Filter>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Batch_OrderBy {
  Batcher = 'batcher',
  BatcherBatchCounter = 'batcher__batchCounter',
  BatcherId = 'batcher__id',
  Hash = 'hash',
  Id = 'id',
  Position = 'position',
  Size = 'size',
  Streams = 'streams',
  Timestamp = 'timestamp'
}

/** Sender address that created batches. */
export type Batcher = {
  __typename?: 'Batcher';
  /** Total number of batches started by this sender. */
  batchCounter: Scalars['BigInt']['output'];
  /** Batches started by this sender. */
  batches: Array<Batch>;
  /** Unique identifier: `batcher-{chainId}-{sender}` */
  id: Scalars['String']['output'];
};


/** Sender address that created batches. */
export type BatcherBatchesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Batch_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Batch_Filter>;
};

export type Batcher_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Batcher_Filter>>>;
  batchCounter?: InputMaybe<Scalars['BigInt']['input']>;
  batchCounter_gt?: InputMaybe<Scalars['BigInt']['input']>;
  batchCounter_gte?: InputMaybe<Scalars['BigInt']['input']>;
  batchCounter_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  batchCounter_lt?: InputMaybe<Scalars['BigInt']['input']>;
  batchCounter_lte?: InputMaybe<Scalars['BigInt']['input']>;
  batchCounter_not?: InputMaybe<Scalars['BigInt']['input']>;
  batchCounter_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  batches_?: InputMaybe<Batch_Filter>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Batcher_Filter>>>;
};

export enum Batcher_OrderBy {
  BatchCounter = 'batchCounter',
  Batches = 'batches',
  Id = 'id'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

/** A Sablier protocol contract */
export type Contract = {
  __typename?: 'Contract';
  /** Contract address */
  address: Scalars['Bytes']['output'];
  /** Contract alias (e.g., "FL", "LK") */
  alias: Scalars['String']['output'];
  /** Contract category (e.g., "Flow", "Lockup") */
  category: Scalars['String']['output'];
  /** The chain ID where the contract exists */
  chainId: Scalars['BigInt']['output'];
  /** Unique identifier: contract-{chainId}-{address} */
  id: Scalars['String']['output'];
};

export type Contract_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['Bytes']['input']>;
  address_not?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  alias?: InputMaybe<Scalars['String']['input']>;
  alias_contains?: InputMaybe<Scalars['String']['input']>;
  alias_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  alias_ends_with?: InputMaybe<Scalars['String']['input']>;
  alias_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  alias_gt?: InputMaybe<Scalars['String']['input']>;
  alias_gte?: InputMaybe<Scalars['String']['input']>;
  alias_in?: InputMaybe<Array<Scalars['String']['input']>>;
  alias_lt?: InputMaybe<Scalars['String']['input']>;
  alias_lte?: InputMaybe<Scalars['String']['input']>;
  alias_not?: InputMaybe<Scalars['String']['input']>;
  alias_not_contains?: InputMaybe<Scalars['String']['input']>;
  alias_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  alias_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  alias_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  alias_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  alias_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  alias_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  alias_starts_with?: InputMaybe<Scalars['String']['input']>;
  alias_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<Contract_Filter>>>;
  category?: InputMaybe<Scalars['String']['input']>;
  category_contains?: InputMaybe<Scalars['String']['input']>;
  category_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  category_ends_with?: InputMaybe<Scalars['String']['input']>;
  category_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  category_gt?: InputMaybe<Scalars['String']['input']>;
  category_gte?: InputMaybe<Scalars['String']['input']>;
  category_in?: InputMaybe<Array<Scalars['String']['input']>>;
  category_lt?: InputMaybe<Scalars['String']['input']>;
  category_lte?: InputMaybe<Scalars['String']['input']>;
  category_not?: InputMaybe<Scalars['String']['input']>;
  category_not_contains?: InputMaybe<Scalars['String']['input']>;
  category_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  category_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  category_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  category_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  category_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  category_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  category_starts_with?: InputMaybe<Scalars['String']['input']>;
  category_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  chainId?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Contract_Filter>>>;
};

export enum Contract_OrderBy {
  Address = 'address',
  Alias = 'alias',
  Category = 'category',
  ChainId = 'chainId',
  Id = 'id'
}

/**
 * Older streams are no longer indexed.
 * See https://x.com/Sablier/status/1914326014995620114
 */
export type DeprecatedStream = {
  __typename?: 'DeprecatedStream';
  /** The chain ID where the stream was created (e.g., 137 for Polygon). */
  chainId: Scalars['BigInt']['output'];
  /** The address of the contract that created the stream. */
  contractAddress: Scalars['Bytes']['output'];
  /** Hash of the Ethereum transaction that created this stream. */
  hash: Scalars['Bytes']['output'];
  /** Unique identifier: \`{contractAddress}-{chainId}-{tokenId}\` */
  id: Scalars['String']['output'];
  /** Unix timestamp of the Ethereum transaction that created this stream. */
  timestamp: Scalars['BigInt']['output'];
  /** The id provided by the NFT contract. It's the ERC-721 tokenId. */
  tokenId: Scalars['BigInt']['output'];
};

export type DeprecatedStream_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DeprecatedStream_Filter>>>;
  chainId?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  contractAddress?: InputMaybe<Scalars['Bytes']['input']>;
  contractAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  contractAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  contractAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  contractAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  contractAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  contractAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  contractAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  contractAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  contractAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  hash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  hash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  hash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  hash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  hash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  hash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<DeprecatedStream_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum DeprecatedStream_OrderBy {
  ChainId = 'chainId',
  ContractAddress = 'contractAddress',
  Hash = 'hash',
  Id = 'id',
  Timestamp = 'timestamp',
  TokenId = 'tokenId'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  action?: Maybe<Action>;
  actions: Array<Action>;
  asset?: Maybe<Asset>;
  assets: Array<Asset>;
  batch?: Maybe<Batch>;
  batcher?: Maybe<Batcher>;
  batchers: Array<Batcher>;
  batches: Array<Batch>;
  contract?: Maybe<Contract>;
  contracts: Array<Contract>;
  deprecatedStream?: Maybe<DeprecatedStream>;
  deprecatedStreams: Array<DeprecatedStream>;
  stream?: Maybe<Stream>;
  streams: Array<Stream>;
  watcher?: Maybe<Watcher>;
  watchers: Array<Watcher>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryActionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryActionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Action_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Action_Filter>;
};


export type QueryAssetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAssetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Asset_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Asset_Filter>;
};


export type QueryBatchArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBatcherArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBatchersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Batcher_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Batcher_Filter>;
};


export type QueryBatchesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Batch_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Batch_Filter>;
};


export type QueryContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contract_Filter>;
};


export type QueryDeprecatedStreamArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDeprecatedStreamsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DeprecatedStream_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DeprecatedStream_Filter>;
};


export type QueryStreamArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryStreamsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Stream_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Stream_Filter>;
};


export type QueryWatcherArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWatchersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Watcher_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Watcher_Filter>;
};

export type Stream = {
  __typename?: 'Stream';
  /** Actions triggered by this stream. */
  actions: Array<Action>;
  /** Like the id: `{contractAlias}-{chainId}-{tokenId}` */
  alias: Scalars['String']['output'];
  /** ERC-20 token distributed via this stream. */
  asset: Asset;
  /**
   * ERC-20 token decimals. Stored here to avoid loading the asset entity on each stream.
   * Note: the "Value" suffix is added because of a bug in GraphQL Code Generator.
   */
  assetDecimalsValue: Scalars['BigInt']['output'];
  /** This is equivalent to the value returned by ERC20.balanceOf, and it changes after deposit and withdrawal. */
  availableAmount: Scalars['BigInt']['output'];
  /**
   * The batch the stream may be part of.
   * Note: this is available only when created within a batch create transaction.
   */
  batch: Batch;
  /** Category used for sorting. */
  category: StreamCategory;
  /** The chain ID where the stream was created (e.g., 137 for Polygon). */
  chainId: Scalars['BigInt']['output'];
  /** The address of the contract the stream originates from. */
  contract: Scalars['Bytes']['output'];
  /** The account that created the stream, which can be different from the sender. */
  creator: Scalars['Bytes']['output'];
  /** Unix timestamp indicating the time when the stream will become insolvent. */
  depletionTime: Scalars['BigInt']['output'];
  /** The sum of all deposits. */
  depositedAmount: Scalars['BigInt']['output'];
  /** The amount of debt forgiven by a void action. */
  forgivenDebt: Scalars['BigInt']['output'];
  /** Hash of the Ethereum transaction that created this stream. */
  hash: Scalars['Bytes']['output'];
  /** Unique identifier: `{contractAddress}-{chainId}-{tokenId}` */
  id: Scalars['String']['output'];
  /** Action in which the payment rate was adjusted. */
  lastAdjustmentAction?: Maybe<Action>;
  /** Unix timestamp for when the payment rate was adjusted. */
  lastAdjustmentTimestamp: Scalars['BigInt']['output'];
  /** Flag indicating if a stream is paused. */
  paused: Scalars['Boolean']['output'];
  /** Action in which the stream was paused. */
  pausedAction?: Maybe<Action>;
  /** Unix timestamp for when the stream was paused. */
  pausedTime?: Maybe<Scalars['BigInt']['output']>;
  /** Position in the batch, if available. */
  position: Scalars['BigInt']['output'];
  /** Current payment rate per second, denominated in 18 decimals. */
  ratePerSecond: Scalars['BigInt']['output'];
  /**
   * Current recipient of the stream, with permission to withdraw funds to any third-party address.
   * Note: the recipient can change on NFT transfer.
   */
  recipient: Scalars['Bytes']['output'];
  /** The sum of all refunds. */
  refundedAmount: Scalars['BigInt']['output'];
  /** Manager of the stream, with ability to cancel the stream. */
  sender: Scalars['Bytes']['output'];
  /** The amount streamed up until the time of the last adjustment, denominated in 18 decimals. */
  snapshotAmount: Scalars['BigInt']['output'];
  /** Unix timestamp for the start of the stream. */
  startTime: Scalars['BigInt']['output'];
  /**
   * Unique global id as tracked by the `Watcher` entity.
   * ኆ80 This may change if new data sources are added and the chronological order of streams changes.
   */
  subgraphId: Scalars['BigInt']['output'];
  /** Unix timestamp of the Ethereum transaction that created this stream. */
  timestamp: Scalars['BigInt']['output'];
  /** The id provided by the NFT contract. It's the ERC-721 tokenId. */
  tokenId: Scalars['BigInt']['output'];
  /**
   * Flag indicating the transferability of the stream. This is set when the stream is created, and cannot
   * be changed later.
   */
  transferable: Scalars['Boolean']['output'];
  /** Version of contract, e.g., v1.0. */
  version: Scalars['String']['output'];
  /** Flag indicating if a stream is voided. */
  voided: Scalars['Boolean']['output'];
  /** Action in which the stream was voided. */
  voidedAction?: Maybe<Action>;
  /** Unix timestamp for when the stream was voided. */
  voidedTime?: Maybe<Scalars['BigInt']['output']>;
  /** The sum of all withdrawn amounts. */
  withdrawnAmount: Scalars['BigInt']['output'];
};


export type StreamActionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Action_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Action_Filter>;
};

export enum StreamCategory {
  Flow = 'Flow'
}

export type Stream_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  actions_?: InputMaybe<Action_Filter>;
  alias?: InputMaybe<Scalars['String']['input']>;
  alias_contains?: InputMaybe<Scalars['String']['input']>;
  alias_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  alias_ends_with?: InputMaybe<Scalars['String']['input']>;
  alias_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  alias_gt?: InputMaybe<Scalars['String']['input']>;
  alias_gte?: InputMaybe<Scalars['String']['input']>;
  alias_in?: InputMaybe<Array<Scalars['String']['input']>>;
  alias_lt?: InputMaybe<Scalars['String']['input']>;
  alias_lte?: InputMaybe<Scalars['String']['input']>;
  alias_not?: InputMaybe<Scalars['String']['input']>;
  alias_not_contains?: InputMaybe<Scalars['String']['input']>;
  alias_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  alias_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  alias_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  alias_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  alias_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  alias_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  alias_starts_with?: InputMaybe<Scalars['String']['input']>;
  alias_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<Stream_Filter>>>;
  asset?: InputMaybe<Scalars['String']['input']>;
  assetDecimalsValue?: InputMaybe<Scalars['BigInt']['input']>;
  assetDecimalsValue_gt?: InputMaybe<Scalars['BigInt']['input']>;
  assetDecimalsValue_gte?: InputMaybe<Scalars['BigInt']['input']>;
  assetDecimalsValue_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assetDecimalsValue_lt?: InputMaybe<Scalars['BigInt']['input']>;
  assetDecimalsValue_lte?: InputMaybe<Scalars['BigInt']['input']>;
  assetDecimalsValue_not?: InputMaybe<Scalars['BigInt']['input']>;
  assetDecimalsValue_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  asset_?: InputMaybe<Asset_Filter>;
  asset_contains?: InputMaybe<Scalars['String']['input']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_gt?: InputMaybe<Scalars['String']['input']>;
  asset_gte?: InputMaybe<Scalars['String']['input']>;
  asset_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_lt?: InputMaybe<Scalars['String']['input']>;
  asset_lte?: InputMaybe<Scalars['String']['input']>;
  asset_not?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  availableAmount?: InputMaybe<Scalars['BigInt']['input']>;
  availableAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  availableAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  availableAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  availableAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  availableAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  availableAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  availableAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  batch?: InputMaybe<Scalars['String']['input']>;
  batch_?: InputMaybe<Batch_Filter>;
  batch_contains?: InputMaybe<Scalars['String']['input']>;
  batch_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  batch_ends_with?: InputMaybe<Scalars['String']['input']>;
  batch_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  batch_gt?: InputMaybe<Scalars['String']['input']>;
  batch_gte?: InputMaybe<Scalars['String']['input']>;
  batch_in?: InputMaybe<Array<Scalars['String']['input']>>;
  batch_lt?: InputMaybe<Scalars['String']['input']>;
  batch_lte?: InputMaybe<Scalars['String']['input']>;
  batch_not?: InputMaybe<Scalars['String']['input']>;
  batch_not_contains?: InputMaybe<Scalars['String']['input']>;
  batch_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  batch_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  batch_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  batch_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  batch_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  batch_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  batch_starts_with?: InputMaybe<Scalars['String']['input']>;
  batch_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<StreamCategory>;
  category_in?: InputMaybe<Array<StreamCategory>>;
  category_not?: InputMaybe<StreamCategory>;
  category_not_in?: InputMaybe<Array<StreamCategory>>;
  chainId?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  contract?: InputMaybe<Scalars['Bytes']['input']>;
  contract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  contract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  contract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  contract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  contract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  contract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  contract_not?: InputMaybe<Scalars['Bytes']['input']>;
  contract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  contract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  creator?: InputMaybe<Scalars['Bytes']['input']>;
  creator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  creator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  creator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  creator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  creator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  creator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  creator_not?: InputMaybe<Scalars['Bytes']['input']>;
  creator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  creator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  depletionTime?: InputMaybe<Scalars['BigInt']['input']>;
  depletionTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  depletionTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  depletionTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depletionTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  depletionTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  depletionTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  depletionTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositedAmount?: InputMaybe<Scalars['BigInt']['input']>;
  depositedAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  depositedAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  depositedAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositedAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  depositedAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  depositedAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  depositedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  forgivenDebt?: InputMaybe<Scalars['BigInt']['input']>;
  forgivenDebt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  forgivenDebt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  forgivenDebt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  forgivenDebt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  forgivenDebt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  forgivenDebt_not?: InputMaybe<Scalars['BigInt']['input']>;
  forgivenDebt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  hash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  hash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  hash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  hash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  hash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  hash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentAction?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentAction_?: InputMaybe<Action_Filter>;
  lastAdjustmentAction_contains?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentAction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentAction_ends_with?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentAction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentAction_gt?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentAction_gte?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentAction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  lastAdjustmentAction_lt?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentAction_lte?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentAction_not?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentAction_not_contains?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentAction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentAction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentAction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentAction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  lastAdjustmentAction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentAction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentAction_starts_with?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentAction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  lastAdjustmentTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastAdjustmentTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastAdjustmentTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastAdjustmentTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastAdjustmentTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastAdjustmentTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastAdjustmentTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Stream_Filter>>>;
  paused?: InputMaybe<Scalars['Boolean']['input']>;
  pausedAction?: InputMaybe<Scalars['String']['input']>;
  pausedAction_?: InputMaybe<Action_Filter>;
  pausedAction_contains?: InputMaybe<Scalars['String']['input']>;
  pausedAction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pausedAction_ends_with?: InputMaybe<Scalars['String']['input']>;
  pausedAction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pausedAction_gt?: InputMaybe<Scalars['String']['input']>;
  pausedAction_gte?: InputMaybe<Scalars['String']['input']>;
  pausedAction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pausedAction_lt?: InputMaybe<Scalars['String']['input']>;
  pausedAction_lte?: InputMaybe<Scalars['String']['input']>;
  pausedAction_not?: InputMaybe<Scalars['String']['input']>;
  pausedAction_not_contains?: InputMaybe<Scalars['String']['input']>;
  pausedAction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pausedAction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pausedAction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pausedAction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pausedAction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pausedAction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pausedAction_starts_with?: InputMaybe<Scalars['String']['input']>;
  pausedAction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pausedTime?: InputMaybe<Scalars['BigInt']['input']>;
  pausedTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  pausedTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  pausedTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pausedTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  pausedTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  pausedTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  pausedTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  paused_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  paused_not?: InputMaybe<Scalars['Boolean']['input']>;
  paused_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  position?: InputMaybe<Scalars['BigInt']['input']>;
  position_gt?: InputMaybe<Scalars['BigInt']['input']>;
  position_gte?: InputMaybe<Scalars['BigInt']['input']>;
  position_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  position_lt?: InputMaybe<Scalars['BigInt']['input']>;
  position_lte?: InputMaybe<Scalars['BigInt']['input']>;
  position_not?: InputMaybe<Scalars['BigInt']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ratePerSecond?: InputMaybe<Scalars['BigInt']['input']>;
  ratePerSecond_gt?: InputMaybe<Scalars['BigInt']['input']>;
  ratePerSecond_gte?: InputMaybe<Scalars['BigInt']['input']>;
  ratePerSecond_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ratePerSecond_lt?: InputMaybe<Scalars['BigInt']['input']>;
  ratePerSecond_lte?: InputMaybe<Scalars['BigInt']['input']>;
  ratePerSecond_not?: InputMaybe<Scalars['BigInt']['input']>;
  ratePerSecond_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  recipient?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_contains?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_gt?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_gte?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  recipient_lt?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_lte?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_not?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  refundedAmount?: InputMaybe<Scalars['BigInt']['input']>;
  refundedAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  refundedAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  refundedAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  refundedAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  refundedAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  refundedAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  refundedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sender?: InputMaybe<Scalars['Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  snapshotAmount?: InputMaybe<Scalars['BigInt']['input']>;
  snapshotAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  snapshotAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  snapshotAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  snapshotAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  snapshotAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  snapshotAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  snapshotAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startTime?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  subgraphId?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  subgraphId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphId_not?: InputMaybe<Scalars['BigInt']['input']>;
  subgraphId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferable?: InputMaybe<Scalars['Boolean']['input']>;
  transferable_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  transferable_not?: InputMaybe<Scalars['Boolean']['input']>;
  transferable_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  version?: InputMaybe<Scalars['String']['input']>;
  version_contains?: InputMaybe<Scalars['String']['input']>;
  version_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  version_ends_with?: InputMaybe<Scalars['String']['input']>;
  version_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  version_gt?: InputMaybe<Scalars['String']['input']>;
  version_gte?: InputMaybe<Scalars['String']['input']>;
  version_in?: InputMaybe<Array<Scalars['String']['input']>>;
  version_lt?: InputMaybe<Scalars['String']['input']>;
  version_lte?: InputMaybe<Scalars['String']['input']>;
  version_not?: InputMaybe<Scalars['String']['input']>;
  version_not_contains?: InputMaybe<Scalars['String']['input']>;
  version_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  version_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  version_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  version_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  version_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  version_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  version_starts_with?: InputMaybe<Scalars['String']['input']>;
  version_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  voided?: InputMaybe<Scalars['Boolean']['input']>;
  voidedAction?: InputMaybe<Scalars['String']['input']>;
  voidedAction_?: InputMaybe<Action_Filter>;
  voidedAction_contains?: InputMaybe<Scalars['String']['input']>;
  voidedAction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  voidedAction_ends_with?: InputMaybe<Scalars['String']['input']>;
  voidedAction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  voidedAction_gt?: InputMaybe<Scalars['String']['input']>;
  voidedAction_gte?: InputMaybe<Scalars['String']['input']>;
  voidedAction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  voidedAction_lt?: InputMaybe<Scalars['String']['input']>;
  voidedAction_lte?: InputMaybe<Scalars['String']['input']>;
  voidedAction_not?: InputMaybe<Scalars['String']['input']>;
  voidedAction_not_contains?: InputMaybe<Scalars['String']['input']>;
  voidedAction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  voidedAction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  voidedAction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  voidedAction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  voidedAction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  voidedAction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  voidedAction_starts_with?: InputMaybe<Scalars['String']['input']>;
  voidedAction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  voidedTime?: InputMaybe<Scalars['BigInt']['input']>;
  voidedTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  voidedTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  voidedTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  voidedTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  voidedTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  voidedTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  voidedTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  voided_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  voided_not?: InputMaybe<Scalars['Boolean']['input']>;
  voided_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  withdrawnAmount?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawnAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Stream_OrderBy {
  Actions = 'actions',
  Alias = 'alias',
  Asset = 'asset',
  AssetDecimalsValue = 'assetDecimalsValue',
  AssetAddress = 'asset__address',
  AssetChainId = 'asset__chainId',
  AssetDecimals = 'asset__decimals',
  AssetId = 'asset__id',
  AssetName = 'asset__name',
  AssetSymbol = 'asset__symbol',
  AvailableAmount = 'availableAmount',
  Batch = 'batch',
  BatchHash = 'batch__hash',
  BatchId = 'batch__id',
  BatchPosition = 'batch__position',
  BatchSize = 'batch__size',
  BatchTimestamp = 'batch__timestamp',
  Category = 'category',
  ChainId = 'chainId',
  Contract = 'contract',
  Creator = 'creator',
  DepletionTime = 'depletionTime',
  DepositedAmount = 'depositedAmount',
  ForgivenDebt = 'forgivenDebt',
  Hash = 'hash',
  Id = 'id',
  LastAdjustmentAction = 'lastAdjustmentAction',
  LastAdjustmentActionAddressA = 'lastAdjustmentAction__addressA',
  LastAdjustmentActionAddressB = 'lastAdjustmentAction__addressB',
  LastAdjustmentActionAmountA = 'lastAdjustmentAction__amountA',
  LastAdjustmentActionAmountB = 'lastAdjustmentAction__amountB',
  LastAdjustmentActionBlock = 'lastAdjustmentAction__block',
  LastAdjustmentActionCategory = 'lastAdjustmentAction__category',
  LastAdjustmentActionChainId = 'lastAdjustmentAction__chainId',
  LastAdjustmentActionContract = 'lastAdjustmentAction__contract',
  LastAdjustmentActionFee = 'lastAdjustmentAction__fee',
  LastAdjustmentActionFrom = 'lastAdjustmentAction__from',
  LastAdjustmentActionHash = 'lastAdjustmentAction__hash',
  LastAdjustmentActionId = 'lastAdjustmentAction__id',
  LastAdjustmentActionSubgraphId = 'lastAdjustmentAction__subgraphId',
  LastAdjustmentActionTimestamp = 'lastAdjustmentAction__timestamp',
  LastAdjustmentTimestamp = 'lastAdjustmentTimestamp',
  Paused = 'paused',
  PausedAction = 'pausedAction',
  PausedActionAddressA = 'pausedAction__addressA',
  PausedActionAddressB = 'pausedAction__addressB',
  PausedActionAmountA = 'pausedAction__amountA',
  PausedActionAmountB = 'pausedAction__amountB',
  PausedActionBlock = 'pausedAction__block',
  PausedActionCategory = 'pausedAction__category',
  PausedActionChainId = 'pausedAction__chainId',
  PausedActionContract = 'pausedAction__contract',
  PausedActionFee = 'pausedAction__fee',
  PausedActionFrom = 'pausedAction__from',
  PausedActionHash = 'pausedAction__hash',
  PausedActionId = 'pausedAction__id',
  PausedActionSubgraphId = 'pausedAction__subgraphId',
  PausedActionTimestamp = 'pausedAction__timestamp',
  PausedTime = 'pausedTime',
  Position = 'position',
  RatePerSecond = 'ratePerSecond',
  Recipient = 'recipient',
  RefundedAmount = 'refundedAmount',
  Sender = 'sender',
  SnapshotAmount = 'snapshotAmount',
  StartTime = 'startTime',
  SubgraphId = 'subgraphId',
  Timestamp = 'timestamp',
  TokenId = 'tokenId',
  Transferable = 'transferable',
  Version = 'version',
  Voided = 'voided',
  VoidedAction = 'voidedAction',
  VoidedActionAddressA = 'voidedAction__addressA',
  VoidedActionAddressB = 'voidedAction__addressB',
  VoidedActionAmountA = 'voidedAction__amountA',
  VoidedActionAmountB = 'voidedAction__amountB',
  VoidedActionBlock = 'voidedAction__block',
  VoidedActionCategory = 'voidedAction__category',
  VoidedActionChainId = 'voidedAction__chainId',
  VoidedActionContract = 'voidedAction__contract',
  VoidedActionFee = 'voidedAction__fee',
  VoidedActionFrom = 'voidedAction__from',
  VoidedActionHash = 'voidedAction__hash',
  VoidedActionId = 'voidedAction__id',
  VoidedActionSubgraphId = 'voidedAction__subgraphId',
  VoidedActionTimestamp = 'voidedAction__timestamp',
  VoidedTime = 'voidedTime',
  WithdrawnAmount = 'withdrawnAmount'
}

export type Watcher = {
  __typename?: 'Watcher';
  /** Global counter for actions. */
  actionCounter: Scalars['BigInt']['output'];
  /** Alias for id. */
  chainId: Scalars['BigInt']['output'];
  /** The chain ID. There is one watcher per subgraph. */
  id: Scalars['String']['output'];
  /** Global counter. */
  streamCounter: Scalars['BigInt']['output'];
};

export type Watcher_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  actionCounter?: InputMaybe<Scalars['BigInt']['input']>;
  actionCounter_gt?: InputMaybe<Scalars['BigInt']['input']>;
  actionCounter_gte?: InputMaybe<Scalars['BigInt']['input']>;
  actionCounter_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  actionCounter_lt?: InputMaybe<Scalars['BigInt']['input']>;
  actionCounter_lte?: InputMaybe<Scalars['BigInt']['input']>;
  actionCounter_not?: InputMaybe<Scalars['BigInt']['input']>;
  actionCounter_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Watcher_Filter>>>;
  chainId?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Watcher_Filter>>>;
  streamCounter?: InputMaybe<Scalars['BigInt']['input']>;
  streamCounter_gt?: InputMaybe<Scalars['BigInt']['input']>;
  streamCounter_gte?: InputMaybe<Scalars['BigInt']['input']>;
  streamCounter_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  streamCounter_lt?: InputMaybe<Scalars['BigInt']['input']>;
  streamCounter_lte?: InputMaybe<Scalars['BigInt']['input']>;
  streamCounter_not?: InputMaybe<Scalars['BigInt']['input']>;
  streamCounter_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Watcher_OrderBy {
  ActionCounter = 'actionCounter',
  ChainId = 'chainId',
  Id = 'id',
  StreamCounter = 'streamCounter'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type ActionFragmentFragment = { __typename?: 'Action', id: string, addressA?: any | null, addressB?: any | null, amountA?: any | null, amountB?: any | null, block: any, category: ActionCategory, chainId: any, contract: any, fee?: any | null, from: any, hash: any, subgraphId: any, timestamp: any, stream?: { __typename?: 'Stream', id: string } | null };

export type AssetFragmentFragment = { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string };

export type BatchFragmentFragment = { __typename?: 'Batch', id: string, hash?: any | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null };

export type StreamFragmentFragment = { __typename?: 'Stream', id: string, alias: string, availableAmount: any, category: StreamCategory, chainId: any, creator: any, contract: any, depletionTime: any, depositedAmount: any, forgivenDebt: any, hash: any, lastAdjustmentTimestamp: any, paused: boolean, pausedTime?: any | null, position: any, ratePerSecond: any, recipient: any, refundedAmount: any, sender: any, snapshotAmount: any, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, voided: boolean, voidedTime?: any | null, withdrawnAmount: any, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, batch: { __typename?: 'Batch', id: string, hash?: any | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null }, lastAdjustmentAction?: { __typename?: 'Action', id: string } | null, pausedAction?: { __typename?: 'Action', id: string } | null, voidedAction?: { __typename?: 'Action', id: string } | null };

export type GetActionsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderDirection: OrderDirection;
  where?: InputMaybe<Action_Filter>;
}>;


export type GetActionsQuery = { __typename?: 'Query', actions: Array<{ __typename?: 'Action', id: string, addressA?: any | null, addressB?: any | null, amountA?: any | null, amountB?: any | null, block: any, category: ActionCategory, chainId: any, contract: any, fee?: any | null, from: any, hash: any, subgraphId: any, timestamp: any, stream?: { __typename?: 'Stream', id: string, alias: string, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string } } | null }> };

export type GetStreamQueryVariables = Exact<{
  streamId: Scalars['ID']['input'];
}>;


export type GetStreamQuery = { __typename?: 'Query', stream?: { __typename?: 'Stream', id: string, alias: string, availableAmount: any, category: StreamCategory, chainId: any, creator: any, contract: any, depletionTime: any, depositedAmount: any, forgivenDebt: any, hash: any, lastAdjustmentTimestamp: any, paused: boolean, pausedTime?: any | null, position: any, ratePerSecond: any, recipient: any, refundedAmount: any, sender: any, snapshotAmount: any, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, voided: boolean, voidedTime?: any | null, withdrawnAmount: any, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, batch: { __typename?: 'Batch', id: string, hash?: any | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null }, lastAdjustmentAction?: { __typename?: 'Action', id: string } | null, pausedAction?: { __typename?: 'Action', id: string } | null, voidedAction?: { __typename?: 'Action', id: string } | null } | null };

export type GetStreamWithActionsQueryVariables = Exact<{
  streamId: Scalars['ID']['input'];
}>;


export type GetStreamWithActionsQuery = { __typename?: 'Query', stream?: { __typename?: 'Stream', id: string, alias: string, availableAmount: any, category: StreamCategory, chainId: any, creator: any, contract: any, depletionTime: any, depositedAmount: any, forgivenDebt: any, hash: any, lastAdjustmentTimestamp: any, paused: boolean, pausedTime?: any | null, position: any, ratePerSecond: any, recipient: any, refundedAmount: any, sender: any, snapshotAmount: any, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, voided: boolean, voidedTime?: any | null, withdrawnAmount: any, actions: Array<{ __typename?: 'Action', id: string, addressA?: any | null, addressB?: any | null, amountA?: any | null, amountB?: any | null, block: any, category: ActionCategory, chainId: any, contract: any, fee?: any | null, from: any, hash: any, subgraphId: any, timestamp: any, stream?: { __typename?: 'Stream', id: string } | null }>, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, batch: { __typename?: 'Batch', id: string, hash?: any | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null }, lastAdjustmentAction?: { __typename?: 'Action', id: string } | null, pausedAction?: { __typename?: 'Action', id: string } | null, voidedAction?: { __typename?: 'Action', id: string } | null } | null };

export type GetStreamsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderDirection: OrderDirection;
  where?: InputMaybe<Stream_Filter>;
}>;


export type GetStreamsQuery = { __typename?: 'Query', streams: Array<{ __typename?: 'Stream', id: string, alias: string, availableAmount: any, category: StreamCategory, chainId: any, creator: any, contract: any, depletionTime: any, depositedAmount: any, forgivenDebt: any, hash: any, lastAdjustmentTimestamp: any, paused: boolean, pausedTime?: any | null, position: any, ratePerSecond: any, recipient: any, refundedAmount: any, sender: any, snapshotAmount: any, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, voided: boolean, voidedTime?: any | null, withdrawnAmount: any, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, batch: { __typename?: 'Batch', id: string, hash?: any | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null }, lastAdjustmentAction?: { __typename?: 'Action', id: string } | null, pausedAction?: { __typename?: 'Action', id: string } | null, voidedAction?: { __typename?: 'Action', id: string } | null }> };

export type GetStreamsWithActionsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderDirection: OrderDirection;
  where?: InputMaybe<Stream_Filter>;
}>;


export type GetStreamsWithActionsQuery = { __typename?: 'Query', streams: Array<{ __typename?: 'Stream', id: string, alias: string, availableAmount: any, category: StreamCategory, chainId: any, creator: any, contract: any, depletionTime: any, depositedAmount: any, forgivenDebt: any, hash: any, lastAdjustmentTimestamp: any, paused: boolean, pausedTime?: any | null, position: any, ratePerSecond: any, recipient: any, refundedAmount: any, sender: any, snapshotAmount: any, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, voided: boolean, voidedTime?: any | null, withdrawnAmount: any, actions: Array<{ __typename?: 'Action', id: string, addressA?: any | null, addressB?: any | null, amountA?: any | null, amountB?: any | null, block: any, category: ActionCategory, chainId: any, contract: any, fee?: any | null, from: any, hash: any, subgraphId: any, timestamp: any, stream?: { __typename?: 'Stream', id: string } | null }>, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, batch: { __typename?: 'Batch', id: string, hash?: any | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null }, lastAdjustmentAction?: { __typename?: 'Action', id: string } | null, pausedAction?: { __typename?: 'Action', id: string } | null, voidedAction?: { __typename?: 'Action', id: string } | null }> };

export const ActionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addressA"}},{"kind":"Field","name":{"kind":"Name","value":"addressB"}},{"kind":"Field","name":{"kind":"Name","value":"amountA"}},{"kind":"Field","name":{"kind":"Name","value":"amountB"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"stream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ActionFragmentFragment, unknown>;
export const AssetFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]} as unknown as DocumentNode<AssetFragmentFragment, unknown>;
export const BatchFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<BatchFragmentFragment, unknown>;
export const StreamFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"availableAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depletionTime"}},{"kind":"Field","name":{"kind":"Name","value":"depositedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"forgivenDebt"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"pausedTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"refundedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"snapshotAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"voided"}},{"kind":"Field","name":{"kind":"Name","value":"voidedTime"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pausedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voidedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<StreamFragmentFragment, unknown>;
export const GetActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getActions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Action_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}},{"kind":"Field","name":{"kind":"Name","value":"stream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addressA"}},{"kind":"Field","name":{"kind":"Name","value":"addressB"}},{"kind":"Field","name":{"kind":"Name","value":"amountA"}},{"kind":"Field","name":{"kind":"Name","value":"amountB"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"stream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]} as unknown as DocumentNode<GetActionsQuery, GetActionsQueryVariables>;
export const GetStreamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStream"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"streamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stream"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"streamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"availableAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depletionTime"}},{"kind":"Field","name":{"kind":"Name","value":"depositedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"forgivenDebt"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"pausedTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"refundedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"snapshotAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"voided"}},{"kind":"Field","name":{"kind":"Name","value":"voidedTime"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pausedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voidedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetStreamQuery, GetStreamQueryVariables>;
export const GetStreamWithActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStreamWithActions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"streamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stream"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"streamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragment"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"availableAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depletionTime"}},{"kind":"Field","name":{"kind":"Name","value":"depositedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"forgivenDebt"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"pausedTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"refundedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"snapshotAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"voided"}},{"kind":"Field","name":{"kind":"Name","value":"voidedTime"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pausedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voidedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addressA"}},{"kind":"Field","name":{"kind":"Name","value":"addressB"}},{"kind":"Field","name":{"kind":"Name","value":"amountA"}},{"kind":"Field","name":{"kind":"Name","value":"amountB"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"stream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetStreamWithActionsQuery, GetStreamWithActionsQueryVariables>;
export const GetStreamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStreams"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Stream_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"streams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"availableAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depletionTime"}},{"kind":"Field","name":{"kind":"Name","value":"depositedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"forgivenDebt"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"pausedTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"refundedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"snapshotAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"voided"}},{"kind":"Field","name":{"kind":"Name","value":"voidedTime"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pausedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voidedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetStreamsQuery, GetStreamsQueryVariables>;
export const GetStreamsWithActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStreamsWithActions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Stream_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"streams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragment"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"availableAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depletionTime"}},{"kind":"Field","name":{"kind":"Name","value":"depositedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"forgivenDebt"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"pausedTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"refundedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"snapshotAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"voided"}},{"kind":"Field","name":{"kind":"Name","value":"voidedTime"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pausedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voidedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addressA"}},{"kind":"Field","name":{"kind":"Name","value":"addressB"}},{"kind":"Field","name":{"kind":"Name","value":"amountA"}},{"kind":"Field","name":{"kind":"Name","value":"amountB"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"stream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetStreamsWithActionsQuery, GetStreamsWithActionsQueryVariables>;