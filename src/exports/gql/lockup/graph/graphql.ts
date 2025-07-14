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
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any; }
  /**
   * A string representation of microseconds UNIX timestamp (16 digits)
   *
   */
  Timestamp: { input: any; output: any; }
};

/**
 * A generic entity for tracking protocol actions. There may be multiple actions for a single tx.
 *
 */
export type Action = {
  __typename?: 'Action';
  /**
   * Address of 1st actor. Who this is depends upon the action type, e.g. for Create, it is the sender.
   *
   */
  addressA?: Maybe<Scalars['Bytes']['output']>;
  /**
   * Address of 2nd actor. Who this is depends upon the action type, e.g. for Transfer, it is the recipient.
   *
   */
  addressB?: Maybe<Scalars['Bytes']['output']>;
  /**
   * 1st amount. What this is depends upon the action type, e.g. for Deposit, it is the deposit amount.
   *
   */
  amountA?: Maybe<Scalars['BigInt']['output']>;
  /**
   * 2nd amount. What this is depends upon the action type, e.g. for Withdraw, it is the refund amount.
   *
   */
  amountB?: Maybe<Scalars['BigInt']['output']>;
  /**
   * Block number of the Ethereum transaction.
   *
   */
  block: Scalars['BigInt']['output'];
  /**
   * Category of action, e.g., Deposit.
   *
   */
  category: ActionCategory;
  /**
   * The id of the chain, e.g. 137 for Polygon.
   *
   */
  chainId: Scalars['BigInt']['output'];
  /**
   * Contract through which the action was triggered.
   *
   */
  contract: Scalars['Bytes']['output'];
  /**
   * The Sablier fee paid in the native token of the chain, e.g., ETH for Ethereum Mainnet.
   * See https://docs.sablier.com/concepts/fees
   *
   */
  fee?: Maybe<Scalars['BigInt']['output']>;
  /**
   * The msg.sender of the Ethereum transaction.
   *
   */
  from: Scalars['Bytes']['output'];
  /**
   * Hash of the Ethereum transaction.
   *
   */
  hash: Scalars['Bytes']['output'];
  /**
   * Unique identifier: `{txHash}-{blockLogIndex}`
   *
   */
  id: Scalars['String']['output'];
  /**
   * Stream linked to this action, if any.
   *
   */
  stream?: Maybe<Stream>;
  /**
   * Unique global id as tracked by the `Watcher` entity.
   *
   */
  subgraphId: Scalars['BigInt']['output'];
  /**
   * Unix timestamp of the Ethereum transaction.
   *
   */
  timestamp: Scalars['BigInt']['output'];
};

export enum ActionCategory {
  Approval = 'Approval',
  ApprovalForAll = 'ApprovalForAll',
  Cancel = 'Cancel',
  Create = 'Create',
  Renounce = 'Renounce',
  Transfer = 'Transfer',
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
  StreamCancelable = 'stream__cancelable',
  StreamCanceled = 'stream__canceled',
  StreamCanceledTime = 'stream__canceledTime',
  StreamCategory = 'stream__category',
  StreamChainId = 'stream__chainId',
  StreamCliff = 'stream__cliff',
  StreamCliffAmount = 'stream__cliffAmount',
  StreamCliffTime = 'stream__cliffTime',
  StreamContract = 'stream__contract',
  StreamDepositAmount = 'stream__depositAmount',
  StreamDuration = 'stream__duration',
  StreamEndTime = 'stream__endTime',
  StreamFunder = 'stream__funder',
  StreamHash = 'stream__hash',
  StreamId = 'stream__id',
  StreamInitial = 'stream__initial',
  StreamInitialAmount = 'stream__initialAmount',
  StreamIntactAmount = 'stream__intactAmount',
  StreamPosition = 'stream__position',
  StreamProxender = 'stream__proxender',
  StreamProxied = 'stream__proxied',
  StreamRecipient = 'stream__recipient',
  StreamRenounceTime = 'stream__renounceTime',
  StreamSender = 'stream__sender',
  StreamShape = 'stream__shape',
  StreamStartTime = 'stream__startTime',
  StreamSubgraphId = 'stream__subgraphId',
  StreamTimestamp = 'stream__timestamp',
  StreamTokenId = 'stream__tokenId',
  StreamTransferable = 'stream__transferable',
  StreamVersion = 'stream__version',
  StreamWithdrawnAmount = 'stream__withdrawnAmount',
  SubgraphId = 'subgraphId',
  Timestamp = 'timestamp'
}

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour'
}

/**
 * ERC-20 asset
 *
 */
export type Asset = {
  __typename?: 'Asset';
  /**
   * Address of the ERC-20 token.
   *
   */
  address: Scalars['Bytes']['output'];
  /**
   * The id of the chain, e.g. 137 for Polygon.
   *
   */
  chainId: Scalars['BigInt']['output'];
  /**
   * Decimals of the ERC20 token.
   *
   */
  decimals: Scalars['BigInt']['output'];
  /**
   * Unique identifier: `{chainId}-{address}`
   *
   */
  id: Scalars['String']['output'];
  /**
   * Name of the ERC20 token.
   *
   */
  name: Scalars['String']['output'];
  /**
   * Streams that rely on this token
   *
   */
  streams: Array<Stream>;
  /**
   * Symbol of the ERC20 token.
   *
   */
  symbol: Scalars['String']['output'];
};


/**
 * ERC-20 asset
 *
 */
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
 *
 */
export type Batch = {
  __typename?: 'Batch';
  /**
   * The sender address that created this batch.
   *
   */
  batcher?: Maybe<Batcher>;
  /**
   * Hash of the Ethereum transaction that created this batch.
   *
   */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /**
   * Unique identifier: `{chainId}-{txHash}-{batcher}`
   *
   */
  id: Scalars['String']['output'];
  /**
   * Index of the batch based on the `batchCounter` in the `Batcher` entity.
   *
   */
  position?: Maybe<Scalars['BigInt']['output']>;
  /**
   * Number of streams part of this batch.
   *
   */
  size: Scalars['BigInt']['output'];
  /**
   * Streams part of this batch.
   *
   */
  streams: Array<Stream>;
  /**
   * Timestamp of the transaction that created this batch.
   *
   */
  timestamp?: Maybe<Scalars['BigInt']['output']>;
};


/**
 * Creating streams in bulk is possible using the SablierBatchLockup contract.
 * See https://github.com/sablier-labs/lockup/blob/v2.0/src/SablierBatchLockup.sol
 *
 * Note: the entity can be immutable because a batch is only updated in the same block.
 * See https://thegraph.com/docs/en/subgraphs/developing/creating/ql-schema/#defining-entities
 *
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

/**
 * Sender address that created batches.
 *
 */
export type Batcher = {
  __typename?: 'Batcher';
  /**
   * Total number of batches started by this sender.
   *
   */
  batchCounter: Scalars['BigInt']['output'];
  /**
   * Batches started by this sender.
   *
   */
  batches: Array<Batch>;
  /**
   * Unique identifier: `{chainId}-{sender}`
   *
   */
  id: Scalars['String']['output'];
};


/**
 * Sender address that created batches.
 *
 */
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
  segment?: Maybe<Segment>;
  segments: Array<Segment>;
  stream?: Maybe<Stream>;
  streams: Array<Stream>;
  tranche?: Maybe<Tranche>;
  tranches: Array<Tranche>;
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


export type QuerySegmentArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySegmentsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Segment_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Segment_Filter>;
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


export type QueryTrancheArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTranchesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Tranche_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Tranche_Filter>;
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

/**
 * See https://docs.sablier.com/concepts/lockup/segments
 *
 */
export type Segment = {
  __typename?: 'Segment';
  /**
   * Amount distributed by this segment.
   *
   */
  amount: Scalars['BigInt']['output'];
  /**
   * Total amount distributed at `endTime`. This is the sum of this segment's amount and all previous segments' amounts.
   *
   */
  endAmount: Scalars['BigInt']['output'];
  /**
   * Unix timestamp indicating the end of the segment.
   *
   */
  endTime: Scalars['BigInt']['output'];
  /**
   * Exponent used for the streamed amount calculations.
   * See https://github.com/sablier-labs/lockup/blob/v2.0/src/types/DataTypes.sol#L279-L288
   *
   */
  exponent: Scalars['BigInt']['output'];
  /**
   * Unique identifier: `{streamId}-{position}`
   *
   */
  id: Scalars['String']['output'];
  /**
   * Position of the segment inside the array.
   *
   */
  position: Scalars['BigInt']['output'];
  /**
   * Total amount distributed by the stream at `startTime`. This is the sum of all previous segments' amounts.
   *
   */
  startAmount: Scalars['BigInt']['output'];
  /**
   * Unix timestamp indicating the start of the segment.
   * This is also the end time of the previous segment or, if this is the first segment, it is the start time of the stream.
   *
   */
  startTime: Scalars['BigInt']['output'];
  /**
   * The stream in which this segment was created.
   *
   */
  stream: Stream;
};

export type Segment_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Segment_Filter>>>;
  endAmount?: InputMaybe<Scalars['BigInt']['input']>;
  endAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  endAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endTime?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  exponent?: InputMaybe<Scalars['BigInt']['input']>;
  exponent_gt?: InputMaybe<Scalars['BigInt']['input']>;
  exponent_gte?: InputMaybe<Scalars['BigInt']['input']>;
  exponent_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  exponent_lt?: InputMaybe<Scalars['BigInt']['input']>;
  exponent_lte?: InputMaybe<Scalars['BigInt']['input']>;
  exponent_not?: InputMaybe<Scalars['BigInt']['input']>;
  exponent_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  or?: InputMaybe<Array<InputMaybe<Segment_Filter>>>;
  position?: InputMaybe<Scalars['BigInt']['input']>;
  position_gt?: InputMaybe<Scalars['BigInt']['input']>;
  position_gte?: InputMaybe<Scalars['BigInt']['input']>;
  position_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  position_lt?: InputMaybe<Scalars['BigInt']['input']>;
  position_lte?: InputMaybe<Scalars['BigInt']['input']>;
  position_not?: InputMaybe<Scalars['BigInt']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startAmount?: InputMaybe<Scalars['BigInt']['input']>;
  startAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  startAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startTime?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
};

export enum Segment_OrderBy {
  Amount = 'amount',
  EndAmount = 'endAmount',
  EndTime = 'endTime',
  Exponent = 'exponent',
  Id = 'id',
  Position = 'position',
  StartAmount = 'startAmount',
  StartTime = 'startTime',
  Stream = 'stream',
  StreamAlias = 'stream__alias',
  StreamAssetDecimalsValue = 'stream__assetDecimalsValue',
  StreamCancelable = 'stream__cancelable',
  StreamCanceled = 'stream__canceled',
  StreamCanceledTime = 'stream__canceledTime',
  StreamCategory = 'stream__category',
  StreamChainId = 'stream__chainId',
  StreamCliff = 'stream__cliff',
  StreamCliffAmount = 'stream__cliffAmount',
  StreamCliffTime = 'stream__cliffTime',
  StreamContract = 'stream__contract',
  StreamDepositAmount = 'stream__depositAmount',
  StreamDuration = 'stream__duration',
  StreamEndTime = 'stream__endTime',
  StreamFunder = 'stream__funder',
  StreamHash = 'stream__hash',
  StreamId = 'stream__id',
  StreamInitial = 'stream__initial',
  StreamInitialAmount = 'stream__initialAmount',
  StreamIntactAmount = 'stream__intactAmount',
  StreamPosition = 'stream__position',
  StreamProxender = 'stream__proxender',
  StreamProxied = 'stream__proxied',
  StreamRecipient = 'stream__recipient',
  StreamRenounceTime = 'stream__renounceTime',
  StreamSender = 'stream__sender',
  StreamShape = 'stream__shape',
  StreamStartTime = 'stream__startTime',
  StreamSubgraphId = 'stream__subgraphId',
  StreamTimestamp = 'stream__timestamp',
  StreamTokenId = 'stream__tokenId',
  StreamTransferable = 'stream__transferable',
  StreamVersion = 'stream__version',
  StreamWithdrawnAmount = 'stream__withdrawnAmount'
}

export type Stream = {
  __typename?: 'Stream';
  /**
   * Actions triggered by this stream.
   *
   */
  actions: Array<Action>;
  /**
   * Like the id: `{contractAlias}-{chainId}-{tokenId}`
   *
   */
  alias: Scalars['String']['output'];
  /**
   * ERC-20 token distributed via this stream.
   *
   */
  asset: Asset;
  /**
   * ERC-20 token decimals. Stored here to avoid loading the asset entity on each stream.
   * Note: the "Value" suffix is added because of a bug in GraphQL Code Generator.
   *
   */
  assetDecimalsValue: Scalars['BigInt']['output'];
  /**
   * The batch the stream may be part of.
   * Note: this is available only when created within a batch create transaction.
   *
   */
  batch: Batch;
  /**
   * Flag indicating the cancelability of the stream.
   *
   */
  cancelable: Scalars['Boolean']['output'];
  /**
   * Flag indicating if the stream was canceled.
   *
   */
  canceled: Scalars['Boolean']['output'];
  /**
   * Action in which the stream was canceled.
   *
   */
  canceledAction?: Maybe<Action>;
  /**
   * Unix timestamp for the when the stream was canceled.
   *
   */
  canceledTime?: Maybe<Scalars['BigInt']['output']>;
  /**
   * Category used for sorting.
   *
   */
  category: StreamCategory;
  /**
   * The id of the chain, e.g., 137 for Polygon.
   *
   */
  chainId: Scalars['BigInt']['output'];
  /**
   * Flag for Linear streams with a cliff.
   *
   */
  cliff?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The amount that will unlock at the cliff time.
   *
   */
  cliffAmount?: Maybe<Scalars['BigInt']['output']>;
  /**
   * Unix timestamp for the start of the cliff.
   *
   */
  cliffTime?: Maybe<Scalars['BigInt']['output']>;
  /**
   * The contract the stream originates from.
   *
   */
  contract: Scalars['Bytes']['output'];
  /**
   * The amount deposited when the stream was created.
   *
   */
  depositAmount: Scalars['BigInt']['output'];
  /**
   * Snapshot of the duration in seconds (the difference between end and start time).
   *
   */
  duration: Scalars['BigInt']['output'];
  /**
   * Unix timestamp for the end of the stream.
   *
   */
  endTime: Scalars['BigInt']['output'];
  /**
   * The account that funded the stream, which can be different from the sender.
   *
   */
  funder: Scalars['Bytes']['output'];
  /**
   * Hash of the Ethereum transaction that created this stream.
   *
   */
  hash: Scalars['Bytes']['output'];
  /**
   * Unique identifier: `{contractAddress}-{chainId}-{tokenId}`
   *
   */
  id: Scalars['String']['output'];
  /**
   * Flag for Linear stream with an initial unlock.
   * Available since Lockup v2.0.
   *
   */
  initial?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The initial unlock amount of a Linear stream.
   * Available since Lockup v2.0.
   *
   */
  initialAmount?: Maybe<Scalars['BigInt']['output']>;
  /**
   * The amount that is still held by the stream regardless of whether if was fully vested or not.
   * This is the difference between the deposit amount and all withdrawn amounts.
   *
   */
  intactAmount: Scalars['BigInt']['output'];
  /**
   * Position in the batch, if available.
   *
   */
  position: Scalars['BigInt']['output'];
  /**
   * Owner of the proxy when the stream is created through a PRBProxy (https://github.com/PaulRBerg/prb-proxy)
   * Note that proxy = stream sender, and proxender = owner of proxy
   *
   */
  proxender?: Maybe<Scalars['Bytes']['output']>;
  /**
   * Flag for streams created through a PRBProxy.
   *
   */
  proxied: Scalars['Boolean']['output'];
  /**
   * Current recipient of the stream, with permission to withdraw funds to any third-party address.
   * Note: the recipient can change on NFT transfer.
   *
   */
  recipient: Scalars['Bytes']['output'];
  /**
   * Action in which the stream was made non-cancelable.
   * Note: if the stream was made non-cancelable from the get-go, this is the same as the Create action.
   *
   */
  renounceAction?: Maybe<Action>;
  /**
   * Unix timestamp for when the stream was made non-cancelable. This can coincide with the create time.
   *
   */
  renounceTime?: Maybe<Scalars['BigInt']['output']>;
  /**
   * Segments of a Dynamic stream.
   *
   */
  segments: Array<Segment>;
  /**
   * Manager of the stream, with ability to cancel the stream.
   *
   */
  sender: Scalars['Bytes']['output'];
  /**
   * An optional parameter to specify the shape of the distribution.
   * Available since Lockup v2.0.
   *
   */
  shape?: Maybe<Scalars['String']['output']>;
  /**
   * Unix timestamp for the start of the stream.
   *
   */
  startTime: Scalars['BigInt']['output'];
  /**
   * Unique global id as tracked by the `Watcher` entity.
   * ኆ80 This may change if new data sources are added and the chronological order of streams changes.
   *
   */
  subgraphId: Scalars['BigInt']['output'];
  /**
   * Unix timestamp of the Ethereum transaction that created this stream.
   *
   */
  timestamp: Scalars['BigInt']['output'];
  /**
   * The id provided by the Lockup contract. This is the ERC-721 tokenId.
   *
   */
  tokenId: Scalars['BigInt']['output'];
  /**
   * Segments of a Tranched stream.
   *
   */
  tranches: Array<Tranche>;
  /**
   * Flag indicating the transferability of the stream. This is set when the stream is created, and cannot
   * be changed later.
   *
   */
  transferable: Scalars['Boolean']['output'];
  /**
   * Version of contract, e.g., v1.0.
   *
   */
  version: Scalars['String']['output'];
  /**
   * The sum of all withdrawn amounts.
   *
   */
  withdrawnAmount: Scalars['BigInt']['output'];
};


export type StreamActionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Action_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Action_Filter>;
};


export type StreamSegmentsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Segment_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Segment_Filter>;
};


export type StreamTranchesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Tranche_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Tranche_Filter>;
};

export enum StreamCategory {
  LockupDynamic = 'LockupDynamic',
  LockupLinear = 'LockupLinear',
  LockupTranched = 'LockupTranched'
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
  cancelable?: InputMaybe<Scalars['Boolean']['input']>;
  cancelable_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  cancelable_not?: InputMaybe<Scalars['Boolean']['input']>;
  cancelable_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  canceled?: InputMaybe<Scalars['Boolean']['input']>;
  canceledAction?: InputMaybe<Scalars['String']['input']>;
  canceledAction_?: InputMaybe<Action_Filter>;
  canceledAction_contains?: InputMaybe<Scalars['String']['input']>;
  canceledAction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  canceledAction_ends_with?: InputMaybe<Scalars['String']['input']>;
  canceledAction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  canceledAction_gt?: InputMaybe<Scalars['String']['input']>;
  canceledAction_gte?: InputMaybe<Scalars['String']['input']>;
  canceledAction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  canceledAction_lt?: InputMaybe<Scalars['String']['input']>;
  canceledAction_lte?: InputMaybe<Scalars['String']['input']>;
  canceledAction_not?: InputMaybe<Scalars['String']['input']>;
  canceledAction_not_contains?: InputMaybe<Scalars['String']['input']>;
  canceledAction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  canceledAction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  canceledAction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  canceledAction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  canceledAction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  canceledAction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  canceledAction_starts_with?: InputMaybe<Scalars['String']['input']>;
  canceledAction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  canceledTime?: InputMaybe<Scalars['BigInt']['input']>;
  canceledTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  canceledTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  canceledTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  canceledTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  canceledTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  canceledTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  canceledTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  canceled_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  canceled_not?: InputMaybe<Scalars['Boolean']['input']>;
  canceled_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
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
  cliff?: InputMaybe<Scalars['Boolean']['input']>;
  cliffAmount?: InputMaybe<Scalars['BigInt']['input']>;
  cliffAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  cliffAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  cliffAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  cliffAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  cliffAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  cliffAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  cliffAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  cliffTime?: InputMaybe<Scalars['BigInt']['input']>;
  cliffTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  cliffTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  cliffTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  cliffTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  cliffTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  cliffTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  cliffTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  cliff_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  cliff_not?: InputMaybe<Scalars['Boolean']['input']>;
  cliff_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
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
  depositAmount?: InputMaybe<Scalars['BigInt']['input']>;
  depositAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  depositAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  depositAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  depositAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  depositAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  depositAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  duration?: InputMaybe<Scalars['BigInt']['input']>;
  duration_gt?: InputMaybe<Scalars['BigInt']['input']>;
  duration_gte?: InputMaybe<Scalars['BigInt']['input']>;
  duration_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  duration_lt?: InputMaybe<Scalars['BigInt']['input']>;
  duration_lte?: InputMaybe<Scalars['BigInt']['input']>;
  duration_not?: InputMaybe<Scalars['BigInt']['input']>;
  duration_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endTime?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  funder?: InputMaybe<Scalars['Bytes']['input']>;
  funder_contains?: InputMaybe<Scalars['Bytes']['input']>;
  funder_gt?: InputMaybe<Scalars['Bytes']['input']>;
  funder_gte?: InputMaybe<Scalars['Bytes']['input']>;
  funder_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  funder_lt?: InputMaybe<Scalars['Bytes']['input']>;
  funder_lte?: InputMaybe<Scalars['Bytes']['input']>;
  funder_not?: InputMaybe<Scalars['Bytes']['input']>;
  funder_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  funder_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
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
  initial?: InputMaybe<Scalars['Boolean']['input']>;
  initialAmount?: InputMaybe<Scalars['BigInt']['input']>;
  initialAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  initialAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  initialAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  initialAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  initialAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  initialAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  initialAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  initial_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  initial_not?: InputMaybe<Scalars['Boolean']['input']>;
  initial_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  intactAmount?: InputMaybe<Scalars['BigInt']['input']>;
  intactAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  intactAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  intactAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  intactAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  intactAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  intactAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  intactAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Stream_Filter>>>;
  position?: InputMaybe<Scalars['BigInt']['input']>;
  position_gt?: InputMaybe<Scalars['BigInt']['input']>;
  position_gte?: InputMaybe<Scalars['BigInt']['input']>;
  position_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  position_lt?: InputMaybe<Scalars['BigInt']['input']>;
  position_lte?: InputMaybe<Scalars['BigInt']['input']>;
  position_not?: InputMaybe<Scalars['BigInt']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proxender?: InputMaybe<Scalars['Bytes']['input']>;
  proxender_contains?: InputMaybe<Scalars['Bytes']['input']>;
  proxender_gt?: InputMaybe<Scalars['Bytes']['input']>;
  proxender_gte?: InputMaybe<Scalars['Bytes']['input']>;
  proxender_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  proxender_lt?: InputMaybe<Scalars['Bytes']['input']>;
  proxender_lte?: InputMaybe<Scalars['Bytes']['input']>;
  proxender_not?: InputMaybe<Scalars['Bytes']['input']>;
  proxender_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  proxender_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  proxied?: InputMaybe<Scalars['Boolean']['input']>;
  proxied_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  proxied_not?: InputMaybe<Scalars['Boolean']['input']>;
  proxied_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
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
  renounceAction?: InputMaybe<Scalars['String']['input']>;
  renounceAction_?: InputMaybe<Action_Filter>;
  renounceAction_contains?: InputMaybe<Scalars['String']['input']>;
  renounceAction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  renounceAction_ends_with?: InputMaybe<Scalars['String']['input']>;
  renounceAction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  renounceAction_gt?: InputMaybe<Scalars['String']['input']>;
  renounceAction_gte?: InputMaybe<Scalars['String']['input']>;
  renounceAction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  renounceAction_lt?: InputMaybe<Scalars['String']['input']>;
  renounceAction_lte?: InputMaybe<Scalars['String']['input']>;
  renounceAction_not?: InputMaybe<Scalars['String']['input']>;
  renounceAction_not_contains?: InputMaybe<Scalars['String']['input']>;
  renounceAction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  renounceAction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  renounceAction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  renounceAction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  renounceAction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  renounceAction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  renounceAction_starts_with?: InputMaybe<Scalars['String']['input']>;
  renounceAction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  renounceTime?: InputMaybe<Scalars['BigInt']['input']>;
  renounceTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  renounceTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  renounceTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  renounceTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  renounceTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  renounceTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  renounceTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  segments_?: InputMaybe<Segment_Filter>;
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
  shape?: InputMaybe<Scalars['String']['input']>;
  shape_contains?: InputMaybe<Scalars['String']['input']>;
  shape_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  shape_ends_with?: InputMaybe<Scalars['String']['input']>;
  shape_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  shape_gt?: InputMaybe<Scalars['String']['input']>;
  shape_gte?: InputMaybe<Scalars['String']['input']>;
  shape_in?: InputMaybe<Array<Scalars['String']['input']>>;
  shape_lt?: InputMaybe<Scalars['String']['input']>;
  shape_lte?: InputMaybe<Scalars['String']['input']>;
  shape_not?: InputMaybe<Scalars['String']['input']>;
  shape_not_contains?: InputMaybe<Scalars['String']['input']>;
  shape_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  shape_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  shape_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  shape_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  shape_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  shape_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  shape_starts_with?: InputMaybe<Scalars['String']['input']>;
  shape_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
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
  tranches_?: InputMaybe<Tranche_Filter>;
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
  Batch = 'batch',
  BatchHash = 'batch__hash',
  BatchId = 'batch__id',
  BatchPosition = 'batch__position',
  BatchSize = 'batch__size',
  BatchTimestamp = 'batch__timestamp',
  Cancelable = 'cancelable',
  Canceled = 'canceled',
  CanceledAction = 'canceledAction',
  CanceledActionAddressA = 'canceledAction__addressA',
  CanceledActionAddressB = 'canceledAction__addressB',
  CanceledActionAmountA = 'canceledAction__amountA',
  CanceledActionAmountB = 'canceledAction__amountB',
  CanceledActionBlock = 'canceledAction__block',
  CanceledActionCategory = 'canceledAction__category',
  CanceledActionChainId = 'canceledAction__chainId',
  CanceledActionContract = 'canceledAction__contract',
  CanceledActionFee = 'canceledAction__fee',
  CanceledActionFrom = 'canceledAction__from',
  CanceledActionHash = 'canceledAction__hash',
  CanceledActionId = 'canceledAction__id',
  CanceledActionSubgraphId = 'canceledAction__subgraphId',
  CanceledActionTimestamp = 'canceledAction__timestamp',
  CanceledTime = 'canceledTime',
  Category = 'category',
  ChainId = 'chainId',
  Cliff = 'cliff',
  CliffAmount = 'cliffAmount',
  CliffTime = 'cliffTime',
  Contract = 'contract',
  DepositAmount = 'depositAmount',
  Duration = 'duration',
  EndTime = 'endTime',
  Funder = 'funder',
  Hash = 'hash',
  Id = 'id',
  Initial = 'initial',
  InitialAmount = 'initialAmount',
  IntactAmount = 'intactAmount',
  Position = 'position',
  Proxender = 'proxender',
  Proxied = 'proxied',
  Recipient = 'recipient',
  RenounceAction = 'renounceAction',
  RenounceActionAddressA = 'renounceAction__addressA',
  RenounceActionAddressB = 'renounceAction__addressB',
  RenounceActionAmountA = 'renounceAction__amountA',
  RenounceActionAmountB = 'renounceAction__amountB',
  RenounceActionBlock = 'renounceAction__block',
  RenounceActionCategory = 'renounceAction__category',
  RenounceActionChainId = 'renounceAction__chainId',
  RenounceActionContract = 'renounceAction__contract',
  RenounceActionFee = 'renounceAction__fee',
  RenounceActionFrom = 'renounceAction__from',
  RenounceActionHash = 'renounceAction__hash',
  RenounceActionId = 'renounceAction__id',
  RenounceActionSubgraphId = 'renounceAction__subgraphId',
  RenounceActionTimestamp = 'renounceAction__timestamp',
  RenounceTime = 'renounceTime',
  Segments = 'segments',
  Sender = 'sender',
  Shape = 'shape',
  StartTime = 'startTime',
  SubgraphId = 'subgraphId',
  Timestamp = 'timestamp',
  TokenId = 'tokenId',
  Tranches = 'tranches',
  Transferable = 'transferable',
  Version = 'version',
  WithdrawnAmount = 'withdrawnAmount'
}

/**
 * See https://docs.sablier.com/concepts/lockup/tranches
 *
 */
export type Tranche = {
  __typename?: 'Tranche';
  /**
   * Amount distributed by this tranche.
   *
   */
  amount: Scalars['BigInt']['output'];
  /**
   * Total amount distributed at `endTime`. This is the sum of this tranche's amount and all previous tranches' amounts.
   *
   */
  endAmount: Scalars['BigInt']['output'];
  /**
   * Unix timestamp indicating the end of the tranche.
   *
   */
  endTime: Scalars['BigInt']['output'];
  /**
   * Unique identifier: `{streamId}-{position}`
   *
   */
  id: Scalars['String']['output'];
  /**
   * Position of the tranche inside the array.
   *
   */
  position: Scalars['BigInt']['output'];
  /**
   * Total amount distributed by the stream at `startTime`. This is the sum of all previous tranches' amounts.
   *
   */
  startAmount: Scalars['BigInt']['output'];
  /**
   * Unix timestamp indicating the start of the tranche.
   * This is also the end time of the previous tranche or, if this is the first tranche, it is the start time of the stream.
   *
   */
  startTime: Scalars['BigInt']['output'];
  /**
   * The stream in which this tranche was created.
   *
   */
  stream: Stream;
};

export type Tranche_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Tranche_Filter>>>;
  endAmount?: InputMaybe<Scalars['BigInt']['input']>;
  endAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  endAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endTime?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  or?: InputMaybe<Array<InputMaybe<Tranche_Filter>>>;
  position?: InputMaybe<Scalars['BigInt']['input']>;
  position_gt?: InputMaybe<Scalars['BigInt']['input']>;
  position_gte?: InputMaybe<Scalars['BigInt']['input']>;
  position_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  position_lt?: InputMaybe<Scalars['BigInt']['input']>;
  position_lte?: InputMaybe<Scalars['BigInt']['input']>;
  position_not?: InputMaybe<Scalars['BigInt']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startAmount?: InputMaybe<Scalars['BigInt']['input']>;
  startAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  startAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startTime?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
};

export enum Tranche_OrderBy {
  Amount = 'amount',
  EndAmount = 'endAmount',
  EndTime = 'endTime',
  Id = 'id',
  Position = 'position',
  StartAmount = 'startAmount',
  StartTime = 'startTime',
  Stream = 'stream',
  StreamAlias = 'stream__alias',
  StreamAssetDecimalsValue = 'stream__assetDecimalsValue',
  StreamCancelable = 'stream__cancelable',
  StreamCanceled = 'stream__canceled',
  StreamCanceledTime = 'stream__canceledTime',
  StreamCategory = 'stream__category',
  StreamChainId = 'stream__chainId',
  StreamCliff = 'stream__cliff',
  StreamCliffAmount = 'stream__cliffAmount',
  StreamCliffTime = 'stream__cliffTime',
  StreamContract = 'stream__contract',
  StreamDepositAmount = 'stream__depositAmount',
  StreamDuration = 'stream__duration',
  StreamEndTime = 'stream__endTime',
  StreamFunder = 'stream__funder',
  StreamHash = 'stream__hash',
  StreamId = 'stream__id',
  StreamInitial = 'stream__initial',
  StreamInitialAmount = 'stream__initialAmount',
  StreamIntactAmount = 'stream__intactAmount',
  StreamPosition = 'stream__position',
  StreamProxender = 'stream__proxender',
  StreamProxied = 'stream__proxied',
  StreamRecipient = 'stream__recipient',
  StreamRenounceTime = 'stream__renounceTime',
  StreamSender = 'stream__sender',
  StreamShape = 'stream__shape',
  StreamStartTime = 'stream__startTime',
  StreamSubgraphId = 'stream__subgraphId',
  StreamTimestamp = 'stream__timestamp',
  StreamTokenId = 'stream__tokenId',
  StreamTransferable = 'stream__transferable',
  StreamVersion = 'stream__version',
  StreamWithdrawnAmount = 'stream__withdrawnAmount'
}

export type Watcher = {
  __typename?: 'Watcher';
  /**
   * Global counter for actions.
   *
   */
  actionCounter: Scalars['BigInt']['output'];
  /**
   * Alias for id.
   *
   */
  chainId: Scalars['BigInt']['output'];
  /**
   * The chain ID. There is one watcher per subgraph.
   *
   */
  id: Scalars['String']['output'];
  /**
   * Used for debugging purposes. They are normally empty.
   *
   */
  logs?: Maybe<Array<Scalars['String']['output']>>;
  /**
   * Global counter.
   *
   */
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
  logs?: InputMaybe<Array<Scalars['String']['input']>>;
  logs_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  logs_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  logs_not?: InputMaybe<Array<Scalars['String']['input']>>;
  logs_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  logs_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
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
  Logs = 'logs',
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
   *
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

export type SegmentFragmentFragment = { __typename?: 'Segment', id: string, amount: any, endAmount: any, endTime: any, exponent: any, position: any, startAmount: any, startTime: any };

export type StreamFragmentBaseFragment = { __typename?: 'Stream', id: string, alias: string, assetDecimalsValue: any, cancelable: boolean, canceled: boolean, canceledTime?: any | null, category: StreamCategory, chainId: any, cliff?: boolean | null, cliffAmount?: any | null, cliffTime?: any | null, contract: any, depositAmount: any, duration: any, endTime: any, funder: any, hash: any, initial?: boolean | null, initialAmount?: any | null, intactAmount: any, position: any, proxender?: any | null, proxied: boolean, recipient: any, renounceTime?: any | null, sender: any, shape?: string | null, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, withdrawnAmount: any, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, batch: { __typename?: 'Batch', id: string, hash?: any | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null } };

export type TrancheFragmentFragment = { __typename?: 'Tranche', id: string, amount: any, endAmount: any, endTime: any, position: any, startAmount: any, startTime: any };

export type StreamFragmentFragment = { __typename?: 'Stream', id: string, alias: string, assetDecimalsValue: any, cancelable: boolean, canceled: boolean, canceledTime?: any | null, category: StreamCategory, chainId: any, cliff?: boolean | null, cliffAmount?: any | null, cliffTime?: any | null, contract: any, depositAmount: any, duration: any, endTime: any, funder: any, hash: any, initial?: boolean | null, initialAmount?: any | null, intactAmount: any, position: any, proxender?: any | null, proxied: boolean, recipient: any, renounceTime?: any | null, sender: any, shape?: string | null, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, withdrawnAmount: any, segments: Array<{ __typename?: 'Segment', id: string, amount: any, endAmount: any, endTime: any, exponent: any, position: any, startAmount: any, startTime: any }>, tranches: Array<{ __typename?: 'Tranche', id: string, amount: any, endAmount: any, endTime: any, position: any, startAmount: any, startTime: any }>, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, batch: { __typename?: 'Batch', id: string, hash?: any | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null } };

export type GetStreamQueryVariables = Exact<{
  streamId: Scalars['ID']['input'];
}>;


export type GetStreamQuery = { __typename?: 'Query', stream?: { __typename?: 'Stream', id: string, alias: string, assetDecimalsValue: any, cancelable: boolean, canceled: boolean, canceledTime?: any | null, category: StreamCategory, chainId: any, cliff?: boolean | null, cliffAmount?: any | null, cliffTime?: any | null, contract: any, depositAmount: any, duration: any, endTime: any, funder: any, hash: any, initial?: boolean | null, initialAmount?: any | null, intactAmount: any, position: any, proxender?: any | null, proxied: boolean, recipient: any, renounceTime?: any | null, sender: any, shape?: string | null, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, withdrawnAmount: any, segments: Array<{ __typename?: 'Segment', id: string, amount: any, endAmount: any, endTime: any, exponent: any, position: any, startAmount: any, startTime: any }>, tranches: Array<{ __typename?: 'Tranche', id: string, amount: any, endAmount: any, endTime: any, position: any, startAmount: any, startTime: any }>, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, batch: { __typename?: 'Batch', id: string, hash?: any | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null } } | null };

export type GetStreamWithActionsQueryVariables = Exact<{
  streamId: Scalars['ID']['input'];
}>;


export type GetStreamWithActionsQuery = { __typename?: 'Query', stream?: { __typename?: 'Stream', id: string, alias: string, assetDecimalsValue: any, cancelable: boolean, canceled: boolean, canceledTime?: any | null, category: StreamCategory, chainId: any, cliff?: boolean | null, cliffAmount?: any | null, cliffTime?: any | null, contract: any, depositAmount: any, duration: any, endTime: any, funder: any, hash: any, initial?: boolean | null, initialAmount?: any | null, intactAmount: any, position: any, proxender?: any | null, proxied: boolean, recipient: any, renounceTime?: any | null, sender: any, shape?: string | null, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, withdrawnAmount: any, actions: Array<{ __typename?: 'Action', id: string, addressA?: any | null, addressB?: any | null, amountA?: any | null, amountB?: any | null, block: any, category: ActionCategory, chainId: any, contract: any, fee?: any | null, from: any, hash: any, subgraphId: any, timestamp: any, stream?: { __typename?: 'Stream', id: string } | null }>, segments: Array<{ __typename?: 'Segment', id: string, amount: any, endAmount: any, endTime: any, exponent: any, position: any, startAmount: any, startTime: any }>, tranches: Array<{ __typename?: 'Tranche', id: string, amount: any, endAmount: any, endTime: any, position: any, startAmount: any, startTime: any }>, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, batch: { __typename?: 'Batch', id: string, hash?: any | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null } } | null };

export type GetStreamsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderDirection: OrderDirection;
  where?: InputMaybe<Stream_Filter>;
}>;


export type GetStreamsQuery = { __typename?: 'Query', streams: Array<{ __typename?: 'Stream', id: string, alias: string, assetDecimalsValue: any, cancelable: boolean, canceled: boolean, canceledTime?: any | null, category: StreamCategory, chainId: any, cliff?: boolean | null, cliffAmount?: any | null, cliffTime?: any | null, contract: any, depositAmount: any, duration: any, endTime: any, funder: any, hash: any, initial?: boolean | null, initialAmount?: any | null, intactAmount: any, position: any, proxender?: any | null, proxied: boolean, recipient: any, renounceTime?: any | null, sender: any, shape?: string | null, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, withdrawnAmount: any, segments: Array<{ __typename?: 'Segment', id: string, amount: any, endAmount: any, endTime: any, exponent: any, position: any, startAmount: any, startTime: any }>, tranches: Array<{ __typename?: 'Tranche', id: string, amount: any, endAmount: any, endTime: any, position: any, startAmount: any, startTime: any }>, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, batch: { __typename?: 'Batch', id: string, hash?: any | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null } }> };

export type GetStreamsWithActionsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderDirection: OrderDirection;
  where?: InputMaybe<Stream_Filter>;
}>;


export type GetStreamsWithActionsQuery = { __typename?: 'Query', streams: Array<{ __typename?: 'Stream', id: string, alias: string, assetDecimalsValue: any, cancelable: boolean, canceled: boolean, canceledTime?: any | null, category: StreamCategory, chainId: any, cliff?: boolean | null, cliffAmount?: any | null, cliffTime?: any | null, contract: any, depositAmount: any, duration: any, endTime: any, funder: any, hash: any, initial?: boolean | null, initialAmount?: any | null, intactAmount: any, position: any, proxender?: any | null, proxied: boolean, recipient: any, renounceTime?: any | null, sender: any, shape?: string | null, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, withdrawnAmount: any, actions: Array<{ __typename?: 'Action', id: string, addressA?: any | null, addressB?: any | null, amountA?: any | null, amountB?: any | null, block: any, category: ActionCategory, chainId: any, contract: any, fee?: any | null, from: any, hash: any, subgraphId: any, timestamp: any, stream?: { __typename?: 'Stream', id: string } | null }>, segments: Array<{ __typename?: 'Segment', id: string, amount: any, endAmount: any, endTime: any, exponent: any, position: any, startAmount: any, startTime: any }>, tranches: Array<{ __typename?: 'Tranche', id: string, amount: any, endAmount: any, endTime: any, position: any, startAmount: any, startTime: any }>, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, batch: { __typename?: 'Batch', id: string, hash?: any | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null } }> };

export const ActionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addressA"}},{"kind":"Field","name":{"kind":"Name","value":"addressB"}},{"kind":"Field","name":{"kind":"Name","value":"amountA"}},{"kind":"Field","name":{"kind":"Name","value":"amountB"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"stream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ActionFragmentFragment, unknown>;
export const AssetFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]} as unknown as DocumentNode<AssetFragmentFragment, unknown>;
export const BatchFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<BatchFragmentFragment, unknown>;
export const StreamFragmentBaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"assetDecimalsValue"}},{"kind":"Field","name":{"kind":"Name","value":"cancelable"}},{"kind":"Field","name":{"kind":"Name","value":"canceled"}},{"kind":"Field","name":{"kind":"Name","value":"canceledTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"cliff"}},{"kind":"Field","name":{"kind":"Name","value":"cliffAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cliffTime"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depositAmount"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"funder"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"initial"}},{"kind":"Field","name":{"kind":"Name","value":"initialAmount"}},{"kind":"Field","name":{"kind":"Name","value":"intactAmount"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"proxender"}},{"kind":"Field","name":{"kind":"Name","value":"proxied"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"renounceTime"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"shape"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<StreamFragmentBaseFragment, unknown>;
export const SegmentFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SegmentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Segment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"exponent"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}}]} as unknown as DocumentNode<SegmentFragmentFragment, unknown>;
export const TrancheFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}}]} as unknown as DocumentNode<TrancheFragmentFragment, unknown>;
export const StreamFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SegmentFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"assetDecimalsValue"}},{"kind":"Field","name":{"kind":"Name","value":"cancelable"}},{"kind":"Field","name":{"kind":"Name","value":"canceled"}},{"kind":"Field","name":{"kind":"Name","value":"canceledTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"cliff"}},{"kind":"Field","name":{"kind":"Name","value":"cliffAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cliffTime"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depositAmount"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"funder"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"initial"}},{"kind":"Field","name":{"kind":"Name","value":"initialAmount"}},{"kind":"Field","name":{"kind":"Name","value":"intactAmount"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"proxender"}},{"kind":"Field","name":{"kind":"Name","value":"proxied"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"renounceTime"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"shape"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SegmentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Segment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"exponent"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}}]} as unknown as DocumentNode<StreamFragmentFragment, unknown>;
export const GetStreamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStream"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"streamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stream"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"streamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"assetDecimalsValue"}},{"kind":"Field","name":{"kind":"Name","value":"cancelable"}},{"kind":"Field","name":{"kind":"Name","value":"canceled"}},{"kind":"Field","name":{"kind":"Name","value":"canceledTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"cliff"}},{"kind":"Field","name":{"kind":"Name","value":"cliffAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cliffTime"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depositAmount"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"funder"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"initial"}},{"kind":"Field","name":{"kind":"Name","value":"initialAmount"}},{"kind":"Field","name":{"kind":"Name","value":"intactAmount"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"proxender"}},{"kind":"Field","name":{"kind":"Name","value":"proxied"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"renounceTime"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"shape"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SegmentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Segment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"exponent"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SegmentFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}}]} as unknown as DocumentNode<GetStreamQuery, GetStreamQueryVariables>;
export const GetStreamWithActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStreamWithActions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"streamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stream"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"streamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragment"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"assetDecimalsValue"}},{"kind":"Field","name":{"kind":"Name","value":"cancelable"}},{"kind":"Field","name":{"kind":"Name","value":"canceled"}},{"kind":"Field","name":{"kind":"Name","value":"canceledTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"cliff"}},{"kind":"Field","name":{"kind":"Name","value":"cliffAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cliffTime"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depositAmount"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"funder"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"initial"}},{"kind":"Field","name":{"kind":"Name","value":"initialAmount"}},{"kind":"Field","name":{"kind":"Name","value":"intactAmount"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"proxender"}},{"kind":"Field","name":{"kind":"Name","value":"proxied"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"renounceTime"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"shape"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SegmentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Segment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"exponent"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SegmentFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addressA"}},{"kind":"Field","name":{"kind":"Name","value":"addressB"}},{"kind":"Field","name":{"kind":"Name","value":"amountA"}},{"kind":"Field","name":{"kind":"Name","value":"amountB"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"stream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetStreamWithActionsQuery, GetStreamWithActionsQueryVariables>;
export const GetStreamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStreams"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Stream_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"streams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"assetDecimalsValue"}},{"kind":"Field","name":{"kind":"Name","value":"cancelable"}},{"kind":"Field","name":{"kind":"Name","value":"canceled"}},{"kind":"Field","name":{"kind":"Name","value":"canceledTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"cliff"}},{"kind":"Field","name":{"kind":"Name","value":"cliffAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cliffTime"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depositAmount"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"funder"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"initial"}},{"kind":"Field","name":{"kind":"Name","value":"initialAmount"}},{"kind":"Field","name":{"kind":"Name","value":"intactAmount"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"proxender"}},{"kind":"Field","name":{"kind":"Name","value":"proxied"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"renounceTime"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"shape"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SegmentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Segment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"exponent"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SegmentFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}}]} as unknown as DocumentNode<GetStreamsQuery, GetStreamsQueryVariables>;
export const GetStreamsWithActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStreamsWithActions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Stream_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"streams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragment"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"assetDecimalsValue"}},{"kind":"Field","name":{"kind":"Name","value":"cancelable"}},{"kind":"Field","name":{"kind":"Name","value":"canceled"}},{"kind":"Field","name":{"kind":"Name","value":"canceledTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"cliff"}},{"kind":"Field","name":{"kind":"Name","value":"cliffAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cliffTime"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depositAmount"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"funder"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"initial"}},{"kind":"Field","name":{"kind":"Name","value":"initialAmount"}},{"kind":"Field","name":{"kind":"Name","value":"intactAmount"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"proxender"}},{"kind":"Field","name":{"kind":"Name","value":"proxied"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"renounceTime"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"shape"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SegmentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Segment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"exponent"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SegmentFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addressA"}},{"kind":"Field","name":{"kind":"Name","value":"addressB"}},{"kind":"Field","name":{"kind":"Name","value":"amountA"}},{"kind":"Field","name":{"kind":"Name","value":"amountB"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"stream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetStreamsWithActionsQuery, GetStreamsWithActionsQueryVariables>;