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
  /** Transaction details: block number */
  block: Scalars['BigInt']['output'];
  /** Contract through which the stream actions has been triggered */
  campaign: Campaign;
  /** Category of action, e.g., Create. */
  category: ActionCategory;
  /** The chain ID where the action was created (e.g., 137 for Polygon). */
  chainId: Scalars['BigInt']['output'];
  /** Claim action data: amount. */
  claimAmount?: Maybe<Scalars['BigInt']['output']>;
  /** Claim action data: index. */
  claimIndex?: Maybe<Scalars['BigInt']['output']>;
  /** Claim action data: original recipient address of the airdrop, which is part of the Merkle tree. */
  claimRecipient?: Maybe<Scalars['Bytes']['output']>;
  /** Claim action data: stream ID as provided by the Lockup subgraph: {contractAddress}-{chainId}-{tokenId}. */
  claimStreamId?: Maybe<Scalars['String']['output']>;
  /**
   * Claim action data: the actual address that will receive the airdrop, which can be different from the `claimRecipient`.
   * This field is available in v2.0 and later.
   */
  claimTo?: Maybe<Scalars['Bytes']['output']>;
  /** Claim action data: ERC-721 token id as provided by the Lockup contract. */
  claimTokenId?: Maybe<Scalars['BigInt']['output']>;
  /** Clawback action data: amount */
  clawbackAmount?: Maybe<Scalars['BigInt']['output']>;
  /** Clawback action data: from */
  clawbackFrom?: Maybe<Scalars['Bytes']['output']>;
  /** Clawback action data: to */
  clawbackTo?: Maybe<Scalars['Bytes']['output']>;
  /**
   * The Sablier fee paid in the native token of the chain (e.g., ETH for Mainnet).
   * See https://docs.sablier.com/concepts/fees
   */
  fee?: Maybe<Scalars['BigInt']['output']>;
  /** The tx.origin of the Ethereum transaction. */
  from: Scalars['Bytes']['output'];
  /** Transaction details: hash */
  hash: Scalars['Bytes']['output'];
  /** Unique identifier: `action-{chainId}-{txHash}-{logIndex}` */
  id: Scalars['String']['output'];
  /** Unique global id as tracked by the `Watcher` entity. */
  subgraphId: Scalars['BigInt']['output'];
  /** Transaction details: timestamp */
  timestamp: Scalars['BigInt']['output'];
};

export enum ActionCategory {
  Claim = 'Claim',
  Clawback = 'Clawback',
  Create = 'Create',
  LowerMinFeeUsd = 'LowerMinFeeUSD',
  TransferAdmin = 'TransferAdmin'
}

export type Action_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Action_Filter>>>;
  block?: InputMaybe<Scalars['BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['BigInt']['input']>;
  block_not?: InputMaybe<Scalars['BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  campaign?: InputMaybe<Scalars['String']['input']>;
  campaign_?: InputMaybe<Campaign_Filter>;
  campaign_contains?: InputMaybe<Scalars['String']['input']>;
  campaign_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  campaign_ends_with?: InputMaybe<Scalars['String']['input']>;
  campaign_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  campaign_gt?: InputMaybe<Scalars['String']['input']>;
  campaign_gte?: InputMaybe<Scalars['String']['input']>;
  campaign_in?: InputMaybe<Array<Scalars['String']['input']>>;
  campaign_lt?: InputMaybe<Scalars['String']['input']>;
  campaign_lte?: InputMaybe<Scalars['String']['input']>;
  campaign_not?: InputMaybe<Scalars['String']['input']>;
  campaign_not_contains?: InputMaybe<Scalars['String']['input']>;
  campaign_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  campaign_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  campaign_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  campaign_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  campaign_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  campaign_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  campaign_starts_with?: InputMaybe<Scalars['String']['input']>;
  campaign_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
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
  claimAmount?: InputMaybe<Scalars['BigInt']['input']>;
  claimAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  claimAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  claimAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  claimAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  claimAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  claimAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimIndex?: InputMaybe<Scalars['BigInt']['input']>;
  claimIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  claimIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  claimIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  claimIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  claimIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  claimIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimRecipient?: InputMaybe<Scalars['Bytes']['input']>;
  claimRecipient_contains?: InputMaybe<Scalars['Bytes']['input']>;
  claimRecipient_gt?: InputMaybe<Scalars['Bytes']['input']>;
  claimRecipient_gte?: InputMaybe<Scalars['Bytes']['input']>;
  claimRecipient_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  claimRecipient_lt?: InputMaybe<Scalars['Bytes']['input']>;
  claimRecipient_lte?: InputMaybe<Scalars['Bytes']['input']>;
  claimRecipient_not?: InputMaybe<Scalars['Bytes']['input']>;
  claimRecipient_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  claimRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  claimStreamId?: InputMaybe<Scalars['String']['input']>;
  claimStreamId_contains?: InputMaybe<Scalars['String']['input']>;
  claimStreamId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  claimStreamId_ends_with?: InputMaybe<Scalars['String']['input']>;
  claimStreamId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  claimStreamId_gt?: InputMaybe<Scalars['String']['input']>;
  claimStreamId_gte?: InputMaybe<Scalars['String']['input']>;
  claimStreamId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  claimStreamId_lt?: InputMaybe<Scalars['String']['input']>;
  claimStreamId_lte?: InputMaybe<Scalars['String']['input']>;
  claimStreamId_not?: InputMaybe<Scalars['String']['input']>;
  claimStreamId_not_contains?: InputMaybe<Scalars['String']['input']>;
  claimStreamId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  claimStreamId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  claimStreamId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  claimStreamId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  claimStreamId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  claimStreamId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  claimStreamId_starts_with?: InputMaybe<Scalars['String']['input']>;
  claimStreamId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  claimTo?: InputMaybe<Scalars['Bytes']['input']>;
  claimTo_contains?: InputMaybe<Scalars['Bytes']['input']>;
  claimTo_gt?: InputMaybe<Scalars['Bytes']['input']>;
  claimTo_gte?: InputMaybe<Scalars['Bytes']['input']>;
  claimTo_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  claimTo_lt?: InputMaybe<Scalars['Bytes']['input']>;
  claimTo_lte?: InputMaybe<Scalars['Bytes']['input']>;
  claimTo_not?: InputMaybe<Scalars['Bytes']['input']>;
  claimTo_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  claimTo_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  claimTokenId?: InputMaybe<Scalars['BigInt']['input']>;
  claimTokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  claimTokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  claimTokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimTokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  claimTokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  claimTokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  claimTokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  clawbackAmount?: InputMaybe<Scalars['BigInt']['input']>;
  clawbackAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  clawbackAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  clawbackAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  clawbackAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  clawbackAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  clawbackAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  clawbackAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  clawbackFrom?: InputMaybe<Scalars['Bytes']['input']>;
  clawbackFrom_contains?: InputMaybe<Scalars['Bytes']['input']>;
  clawbackFrom_gt?: InputMaybe<Scalars['Bytes']['input']>;
  clawbackFrom_gte?: InputMaybe<Scalars['Bytes']['input']>;
  clawbackFrom_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  clawbackFrom_lt?: InputMaybe<Scalars['Bytes']['input']>;
  clawbackFrom_lte?: InputMaybe<Scalars['Bytes']['input']>;
  clawbackFrom_not?: InputMaybe<Scalars['Bytes']['input']>;
  clawbackFrom_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  clawbackFrom_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  clawbackTo?: InputMaybe<Scalars['Bytes']['input']>;
  clawbackTo_contains?: InputMaybe<Scalars['Bytes']['input']>;
  clawbackTo_gt?: InputMaybe<Scalars['Bytes']['input']>;
  clawbackTo_gte?: InputMaybe<Scalars['Bytes']['input']>;
  clawbackTo_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  clawbackTo_lt?: InputMaybe<Scalars['Bytes']['input']>;
  clawbackTo_lte?: InputMaybe<Scalars['Bytes']['input']>;
  clawbackTo_not?: InputMaybe<Scalars['Bytes']['input']>;
  clawbackTo_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  clawbackTo_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
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
  Block = 'block',
  Campaign = 'campaign',
  CampaignAddress = 'campaign__address',
  CampaignAdmin = 'campaign__admin',
  CampaignAggregateAmount = 'campaign__aggregateAmount',
  CampaignCampaignStartTime = 'campaign__campaignStartTime',
  CampaignCategory = 'campaign__category',
  CampaignChainId = 'campaign__chainId',
  CampaignClaimedAmount = 'campaign__claimedAmount',
  CampaignClaimedCount = 'campaign__claimedCount',
  CampaignClawbackTime = 'campaign__clawbackTime',
  CampaignExpiration = 'campaign__expiration',
  CampaignExpires = 'campaign__expires',
  CampaignFee = 'campaign__fee',
  CampaignHash = 'campaign__hash',
  CampaignId = 'campaign__id',
  CampaignIpfsCid = 'campaign__ipfsCID',
  CampaignLockup = 'campaign__lockup',
  CampaignName = 'campaign__name',
  CampaignNickname = 'campaign__nickname',
  CampaignPosition = 'campaign__position',
  CampaignRoot = 'campaign__root',
  CampaignStreamCancelable = 'campaign__streamCancelable',
  CampaignStreamCliff = 'campaign__streamCliff',
  CampaignStreamCliffDuration = 'campaign__streamCliffDuration',
  CampaignStreamCliffPercentage = 'campaign__streamCliffPercentage',
  CampaignStreamInitial = 'campaign__streamInitial',
  CampaignStreamInitialPercentage = 'campaign__streamInitialPercentage',
  CampaignStreamShape = 'campaign__streamShape',
  CampaignStreamStart = 'campaign__streamStart',
  CampaignStreamStartTime = 'campaign__streamStartTime',
  CampaignStreamTotalDuration = 'campaign__streamTotalDuration',
  CampaignStreamTransferable = 'campaign__streamTransferable',
  CampaignSubgraphId = 'campaign__subgraphId',
  CampaignTimestamp = 'campaign__timestamp',
  CampaignTotalRecipients = 'campaign__totalRecipients',
  CampaignVersion = 'campaign__version',
  Category = 'category',
  ChainId = 'chainId',
  ClaimAmount = 'claimAmount',
  ClaimIndex = 'claimIndex',
  ClaimRecipient = 'claimRecipient',
  ClaimStreamId = 'claimStreamId',
  ClaimTo = 'claimTo',
  ClaimTokenId = 'claimTokenId',
  ClawbackAmount = 'clawbackAmount',
  ClawbackFrom = 'clawbackFrom',
  ClawbackTo = 'clawbackTo',
  Fee = 'fee',
  From = 'from',
  Hash = 'hash',
  Id = 'id',
  SubgraphId = 'subgraphId',
  Timestamp = 'timestamp'
}

/** User activity grouped by day. */
export type Activity = {
  __typename?: 'Activity';
  /** Total amount claimed during the day. */
  amount: Scalars['BigInt']['output'];
  /** Campaign the activity is linked to. */
  campaign: Campaign;
  /** Number of claims completed during the day. */
  claims: Scalars['BigInt']['output'];
  /** Day index: Unix timestamp / 24 * 60 * 60. */
  day: Scalars['BigInt']['output'];
  /** Unique identifier: `activity-{campaignId}-{dayOfSnapshot}` */
  id: Scalars['String']['output'];
  /** Timestamp of the start of the day. */
  timestamp: Scalars['BigInt']['output'];
};

export type Activity_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<Activity_Filter>>>;
  campaign?: InputMaybe<Scalars['String']['input']>;
  campaign_?: InputMaybe<Campaign_Filter>;
  campaign_contains?: InputMaybe<Scalars['String']['input']>;
  campaign_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  campaign_ends_with?: InputMaybe<Scalars['String']['input']>;
  campaign_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  campaign_gt?: InputMaybe<Scalars['String']['input']>;
  campaign_gte?: InputMaybe<Scalars['String']['input']>;
  campaign_in?: InputMaybe<Array<Scalars['String']['input']>>;
  campaign_lt?: InputMaybe<Scalars['String']['input']>;
  campaign_lte?: InputMaybe<Scalars['String']['input']>;
  campaign_not?: InputMaybe<Scalars['String']['input']>;
  campaign_not_contains?: InputMaybe<Scalars['String']['input']>;
  campaign_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  campaign_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  campaign_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  campaign_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  campaign_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  campaign_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  campaign_starts_with?: InputMaybe<Scalars['String']['input']>;
  campaign_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  claims?: InputMaybe<Scalars['BigInt']['input']>;
  claims_gt?: InputMaybe<Scalars['BigInt']['input']>;
  claims_gte?: InputMaybe<Scalars['BigInt']['input']>;
  claims_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claims_lt?: InputMaybe<Scalars['BigInt']['input']>;
  claims_lte?: InputMaybe<Scalars['BigInt']['input']>;
  claims_not?: InputMaybe<Scalars['BigInt']['input']>;
  claims_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  day?: InputMaybe<Scalars['BigInt']['input']>;
  day_gt?: InputMaybe<Scalars['BigInt']['input']>;
  day_gte?: InputMaybe<Scalars['BigInt']['input']>;
  day_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  day_lt?: InputMaybe<Scalars['BigInt']['input']>;
  day_lte?: InputMaybe<Scalars['BigInt']['input']>;
  day_not?: InputMaybe<Scalars['BigInt']['input']>;
  day_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  or?: InputMaybe<Array<InputMaybe<Activity_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Activity_OrderBy {
  Amount = 'amount',
  Campaign = 'campaign',
  CampaignAddress = 'campaign__address',
  CampaignAdmin = 'campaign__admin',
  CampaignAggregateAmount = 'campaign__aggregateAmount',
  CampaignCampaignStartTime = 'campaign__campaignStartTime',
  CampaignCategory = 'campaign__category',
  CampaignChainId = 'campaign__chainId',
  CampaignClaimedAmount = 'campaign__claimedAmount',
  CampaignClaimedCount = 'campaign__claimedCount',
  CampaignClawbackTime = 'campaign__clawbackTime',
  CampaignExpiration = 'campaign__expiration',
  CampaignExpires = 'campaign__expires',
  CampaignFee = 'campaign__fee',
  CampaignHash = 'campaign__hash',
  CampaignId = 'campaign__id',
  CampaignIpfsCid = 'campaign__ipfsCID',
  CampaignLockup = 'campaign__lockup',
  CampaignName = 'campaign__name',
  CampaignNickname = 'campaign__nickname',
  CampaignPosition = 'campaign__position',
  CampaignRoot = 'campaign__root',
  CampaignStreamCancelable = 'campaign__streamCancelable',
  CampaignStreamCliff = 'campaign__streamCliff',
  CampaignStreamCliffDuration = 'campaign__streamCliffDuration',
  CampaignStreamCliffPercentage = 'campaign__streamCliffPercentage',
  CampaignStreamInitial = 'campaign__streamInitial',
  CampaignStreamInitialPercentage = 'campaign__streamInitialPercentage',
  CampaignStreamShape = 'campaign__streamShape',
  CampaignStreamStart = 'campaign__streamStart',
  CampaignStreamStartTime = 'campaign__streamStartTime',
  CampaignStreamTotalDuration = 'campaign__streamTotalDuration',
  CampaignStreamTransferable = 'campaign__streamTransferable',
  CampaignSubgraphId = 'campaign__subgraphId',
  CampaignTimestamp = 'campaign__timestamp',
  CampaignTotalRecipients = 'campaign__totalRecipients',
  CampaignVersion = 'campaign__version',
  Claims = 'claims',
  Day = 'day',
  Id = 'id',
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
  /** Campaigns that rely on this asset. */
  campaigns: Array<Campaign>;
  /** The chain ID where the asset exists (e.g., 137 for Polygon). */
  chainId: Scalars['BigInt']['output'];
  /** Decimals of the ERC20 token. */
  decimals: Scalars['BigInt']['output'];
  /** Unique identifier: `asset-{chainId}-{address}` */
  id: Scalars['String']['output'];
  /** Name of the ERC20 token. */
  name: Scalars['String']['output'];
  /** Symbol of the ERC20 token. */
  symbol: Scalars['String']['output'];
};


/** ERC-20 asset */
export type AssetCampaignsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Campaign_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Campaign_Filter>;
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
  campaigns_?: InputMaybe<Campaign_Filter>;
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
  Campaigns = 'campaigns',
  ChainId = 'chainId',
  Decimals = 'decimals',
  Id = 'id',
  Name = 'name',
  Symbol = 'symbol'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

/** Entity for Merkle campaigns. */
export type Campaign = {
  __typename?: 'Campaign';
  /** Actions triggered by this campaign. */
  actions: Array<Action>;
  /** List of daily activity snapshots for days in which at least one action was triggered. */
  activities: Array<Activity>;
  /** Address of the campaign contract. */
  address: Scalars['Bytes']['output'];
  /** Address of the campaign admin, with permission to clawback. */
  admin: Scalars['Bytes']['output'];
  /** Total airdrop amount. */
  aggregateAmount: Scalars['BigInt']['output'];
  /** Underlying ERC-20 token distributed via the campaign. */
  asset: Asset;
  /** Unix timestamp when the campaign starts and claiming becomes available. */
  campaignStartTime: Scalars['BigInt']['output'];
  /** Type of campaign, e.g. Instant. */
  category: CampaignCategory;
  /** The chain ID where the campaign was created (e.g., 137 for Polygon). */
  chainId: Scalars['BigInt']['output'];
  /** Total amount claimed so far. */
  claimedAmount: Scalars['BigInt']['output'];
  /** Number of claims made so far. */
  claimedCount: Scalars['BigInt']['output'];
  /** Action in which the admin clawed back funds from the campaign. */
  clawbackAction?: Maybe<Action>;
  /** Unix timestamp when the campaign underwent a clawback. */
  clawbackTime?: Maybe<Scalars['BigInt']['output']>;
  /** Unix timestamp when the campaign expires and clawback becomes available (if `expires` is true). */
  expiration?: Maybe<Scalars['BigInt']['output']>;
  /** Flag indicating if the campaign expires or is claimable indefinitely. */
  expires: Scalars['Boolean']['output'];
  /** The factory contract that deployed this campaign. */
  factory: Factory;
  /**
   * Minimum fee charged by this campaign, denominated in the native token of the chain (e.g., ETH for Mainnet).
   * Only available in v1.3 and later
   * See https://docs.sablier.com/concepts/fees
   */
  fee?: Maybe<Scalars['BigInt']['output']>;
  /** Hash of the Ethereum transaction that created this campaign. */
  hash: Scalars['Bytes']['output'];
  /** Unique identifier: `{contractAddress}-{chainId}` */
  id: Scalars['String']['output'];
  /** IPFS content identifier for the list of recipients and other static details. */
  ipfsCID: Scalars['String']['output'];
  /** Address of the Lockup contract through which streams are created. */
  lockup?: Maybe<Scalars['Bytes']['output']>;
  /** User-provided name for the campaign, which is null in Airdrops v1.1. */
  name?: Maybe<Scalars['String']['output']>;
  /** Internal name generated by us, derived from `name` or generated from scratch in older versions. */
  nickname: Scalars['String']['output'];
  /** Index of the campaign based on the `campaignCounter` in the `Factory` entity. */
  position: Scalars['BigInt']['output'];
  /** Merkle root. */
  root: Scalars['Bytes']['output'];
  /** Flag indicating whether the claimed streams will be cancelable initially. */
  streamCancelable?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Flag indicating whether the claimed streams will have a cliff.
   * Only available for Linear streams.
   */
  streamCliff?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The duration of the cliff that the stream will have, in seconds.
   * Only available for Linear streams.
   */
  streamCliffDuration?: Maybe<Scalars['BigInt']['output']>;
  /**
   * The amount that will unlock at the cliff of the claimed stream, expressed as a percentage of the total amount.
   * Only available for Linear streams.
   */
  streamCliffPercentage?: Maybe<Scalars['BigInt']['output']>;
  /**
   * Flag indicating whether the claimed stream will have an initial unlock.
   * Only available for Linear streams.
   */
  streamInitial?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The initial unlock amount of the claimed stream, expressed as a percentage of the total.
   * Only available for Linear streams.
   */
  streamInitialPercentage?: Maybe<Scalars['BigInt']['output']>;
  /** The shape of the distribution. */
  streamShape?: Maybe<Scalars['String']['output']>;
  /** Flag indicating if the claimed stream will have a preset start time or it will use the claim time as the start time. */
  streamStart?: Maybe<Scalars['Boolean']['output']>;
  /** Unix timestamp for the start time. */
  streamStartTime?: Maybe<Scalars['BigInt']['output']>;
  /** Snapshot of the duration in seconds for produced streams. */
  streamTotalDuration?: Maybe<Scalars['BigInt']['output']>;
  /** Tranches of the claimed stream. */
  streamTranches: Array<Tranche>;
  /** Flag indicating whether the claimed streams will be transferable. */
  streamTransferable?: Maybe<Scalars['Boolean']['output']>;
  /** Unique global id as tracked by the subgraph watcher. */
  subgraphId: Scalars['BigInt']['output'];
  /** Unix timestamp of the Ethereum transaction that created this campaign. */
  timestamp: Scalars['BigInt']['output'];
  /** Total number of recipients. */
  totalRecipients: Scalars['BigInt']['output'];
  /** Version of the campaign contract, e.g., v1.3. */
  version: Scalars['String']['output'];
};


/** Entity for Merkle campaigns. */
export type CampaignActionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Action_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Action_Filter>;
};


/** Entity for Merkle campaigns. */
export type CampaignActivitiesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Activity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Activity_Filter>;
};


/** Entity for Merkle campaigns. */
export type CampaignStreamTranchesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Tranche_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Tranche_Filter>;
};

export enum CampaignCategory {
  Instant = 'Instant',
  LockupLinear = 'LockupLinear',
  LockupTranched = 'LockupTranched'
}

export type Campaign_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  actions_?: InputMaybe<Action_Filter>;
  activities_?: InputMaybe<Activity_Filter>;
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
  admin?: InputMaybe<Scalars['Bytes']['input']>;
  admin_contains?: InputMaybe<Scalars['Bytes']['input']>;
  admin_gt?: InputMaybe<Scalars['Bytes']['input']>;
  admin_gte?: InputMaybe<Scalars['Bytes']['input']>;
  admin_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  admin_lt?: InputMaybe<Scalars['Bytes']['input']>;
  admin_lte?: InputMaybe<Scalars['Bytes']['input']>;
  admin_not?: InputMaybe<Scalars['Bytes']['input']>;
  admin_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  admin_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  aggregateAmount?: InputMaybe<Scalars['BigInt']['input']>;
  aggregateAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  aggregateAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  aggregateAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  aggregateAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  aggregateAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  aggregateAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  aggregateAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Campaign_Filter>>>;
  asset?: InputMaybe<Scalars['String']['input']>;
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
  campaignStartTime?: InputMaybe<Scalars['BigInt']['input']>;
  campaignStartTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  campaignStartTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  campaignStartTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  campaignStartTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  campaignStartTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  campaignStartTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  campaignStartTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  category?: InputMaybe<CampaignCategory>;
  category_in?: InputMaybe<Array<CampaignCategory>>;
  category_not?: InputMaybe<CampaignCategory>;
  category_not_in?: InputMaybe<Array<CampaignCategory>>;
  chainId?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimedAmount?: InputMaybe<Scalars['BigInt']['input']>;
  claimedAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  claimedAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  claimedAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimedAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  claimedAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  claimedAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  claimedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimedCount?: InputMaybe<Scalars['BigInt']['input']>;
  claimedCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  claimedCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  claimedCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimedCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  claimedCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  claimedCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  claimedCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  clawbackAction?: InputMaybe<Scalars['String']['input']>;
  clawbackAction_?: InputMaybe<Action_Filter>;
  clawbackAction_contains?: InputMaybe<Scalars['String']['input']>;
  clawbackAction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  clawbackAction_ends_with?: InputMaybe<Scalars['String']['input']>;
  clawbackAction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  clawbackAction_gt?: InputMaybe<Scalars['String']['input']>;
  clawbackAction_gte?: InputMaybe<Scalars['String']['input']>;
  clawbackAction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  clawbackAction_lt?: InputMaybe<Scalars['String']['input']>;
  clawbackAction_lte?: InputMaybe<Scalars['String']['input']>;
  clawbackAction_not?: InputMaybe<Scalars['String']['input']>;
  clawbackAction_not_contains?: InputMaybe<Scalars['String']['input']>;
  clawbackAction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  clawbackAction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  clawbackAction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  clawbackAction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  clawbackAction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  clawbackAction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  clawbackAction_starts_with?: InputMaybe<Scalars['String']['input']>;
  clawbackAction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  clawbackTime?: InputMaybe<Scalars['BigInt']['input']>;
  clawbackTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  clawbackTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  clawbackTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  clawbackTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  clawbackTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  clawbackTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  clawbackTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  expiration?: InputMaybe<Scalars['BigInt']['input']>;
  expiration_gt?: InputMaybe<Scalars['BigInt']['input']>;
  expiration_gte?: InputMaybe<Scalars['BigInt']['input']>;
  expiration_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  expiration_lt?: InputMaybe<Scalars['BigInt']['input']>;
  expiration_lte?: InputMaybe<Scalars['BigInt']['input']>;
  expiration_not?: InputMaybe<Scalars['BigInt']['input']>;
  expiration_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  expires?: InputMaybe<Scalars['Boolean']['input']>;
  expires_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  expires_not?: InputMaybe<Scalars['Boolean']['input']>;
  expires_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  factory?: InputMaybe<Scalars['String']['input']>;
  factory_?: InputMaybe<Factory_Filter>;
  factory_contains?: InputMaybe<Scalars['String']['input']>;
  factory_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  factory_ends_with?: InputMaybe<Scalars['String']['input']>;
  factory_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  factory_gt?: InputMaybe<Scalars['String']['input']>;
  factory_gte?: InputMaybe<Scalars['String']['input']>;
  factory_in?: InputMaybe<Array<Scalars['String']['input']>>;
  factory_lt?: InputMaybe<Scalars['String']['input']>;
  factory_lte?: InputMaybe<Scalars['String']['input']>;
  factory_not?: InputMaybe<Scalars['String']['input']>;
  factory_not_contains?: InputMaybe<Scalars['String']['input']>;
  factory_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  factory_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  factory_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  factory_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  factory_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  factory_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  factory_starts_with?: InputMaybe<Scalars['String']['input']>;
  factory_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fee?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  ipfsCID?: InputMaybe<Scalars['String']['input']>;
  ipfsCID_contains?: InputMaybe<Scalars['String']['input']>;
  ipfsCID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsCID_ends_with?: InputMaybe<Scalars['String']['input']>;
  ipfsCID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsCID_gt?: InputMaybe<Scalars['String']['input']>;
  ipfsCID_gte?: InputMaybe<Scalars['String']['input']>;
  ipfsCID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ipfsCID_lt?: InputMaybe<Scalars['String']['input']>;
  ipfsCID_lte?: InputMaybe<Scalars['String']['input']>;
  ipfsCID_not?: InputMaybe<Scalars['String']['input']>;
  ipfsCID_not_contains?: InputMaybe<Scalars['String']['input']>;
  ipfsCID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsCID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  ipfsCID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsCID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ipfsCID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  ipfsCID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsCID_starts_with?: InputMaybe<Scalars['String']['input']>;
  ipfsCID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  lockup?: InputMaybe<Scalars['Bytes']['input']>;
  lockup_contains?: InputMaybe<Scalars['Bytes']['input']>;
  lockup_gt?: InputMaybe<Scalars['Bytes']['input']>;
  lockup_gte?: InputMaybe<Scalars['Bytes']['input']>;
  lockup_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  lockup_lt?: InputMaybe<Scalars['Bytes']['input']>;
  lockup_lte?: InputMaybe<Scalars['Bytes']['input']>;
  lockup_not?: InputMaybe<Scalars['Bytes']['input']>;
  lockup_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  lockup_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
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
  nickname?: InputMaybe<Scalars['String']['input']>;
  nickname_contains?: InputMaybe<Scalars['String']['input']>;
  nickname_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nickname_ends_with?: InputMaybe<Scalars['String']['input']>;
  nickname_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nickname_gt?: InputMaybe<Scalars['String']['input']>;
  nickname_gte?: InputMaybe<Scalars['String']['input']>;
  nickname_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nickname_lt?: InputMaybe<Scalars['String']['input']>;
  nickname_lte?: InputMaybe<Scalars['String']['input']>;
  nickname_not?: InputMaybe<Scalars['String']['input']>;
  nickname_not_contains?: InputMaybe<Scalars['String']['input']>;
  nickname_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nickname_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  nickname_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nickname_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nickname_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  nickname_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nickname_starts_with?: InputMaybe<Scalars['String']['input']>;
  nickname_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Campaign_Filter>>>;
  position?: InputMaybe<Scalars['BigInt']['input']>;
  position_gt?: InputMaybe<Scalars['BigInt']['input']>;
  position_gte?: InputMaybe<Scalars['BigInt']['input']>;
  position_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  position_lt?: InputMaybe<Scalars['BigInt']['input']>;
  position_lte?: InputMaybe<Scalars['BigInt']['input']>;
  position_not?: InputMaybe<Scalars['BigInt']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  root?: InputMaybe<Scalars['Bytes']['input']>;
  root_contains?: InputMaybe<Scalars['Bytes']['input']>;
  root_gt?: InputMaybe<Scalars['Bytes']['input']>;
  root_gte?: InputMaybe<Scalars['Bytes']['input']>;
  root_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  root_lt?: InputMaybe<Scalars['Bytes']['input']>;
  root_lte?: InputMaybe<Scalars['Bytes']['input']>;
  root_not?: InputMaybe<Scalars['Bytes']['input']>;
  root_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  root_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  streamCancelable?: InputMaybe<Scalars['Boolean']['input']>;
  streamCancelable_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  streamCancelable_not?: InputMaybe<Scalars['Boolean']['input']>;
  streamCancelable_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  streamCliff?: InputMaybe<Scalars['Boolean']['input']>;
  streamCliffDuration?: InputMaybe<Scalars['BigInt']['input']>;
  streamCliffDuration_gt?: InputMaybe<Scalars['BigInt']['input']>;
  streamCliffDuration_gte?: InputMaybe<Scalars['BigInt']['input']>;
  streamCliffDuration_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  streamCliffDuration_lt?: InputMaybe<Scalars['BigInt']['input']>;
  streamCliffDuration_lte?: InputMaybe<Scalars['BigInt']['input']>;
  streamCliffDuration_not?: InputMaybe<Scalars['BigInt']['input']>;
  streamCliffDuration_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  streamCliffPercentage?: InputMaybe<Scalars['BigInt']['input']>;
  streamCliffPercentage_gt?: InputMaybe<Scalars['BigInt']['input']>;
  streamCliffPercentage_gte?: InputMaybe<Scalars['BigInt']['input']>;
  streamCliffPercentage_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  streamCliffPercentage_lt?: InputMaybe<Scalars['BigInt']['input']>;
  streamCliffPercentage_lte?: InputMaybe<Scalars['BigInt']['input']>;
  streamCliffPercentage_not?: InputMaybe<Scalars['BigInt']['input']>;
  streamCliffPercentage_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  streamCliff_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  streamCliff_not?: InputMaybe<Scalars['Boolean']['input']>;
  streamCliff_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  streamInitial?: InputMaybe<Scalars['Boolean']['input']>;
  streamInitialPercentage?: InputMaybe<Scalars['BigInt']['input']>;
  streamInitialPercentage_gt?: InputMaybe<Scalars['BigInt']['input']>;
  streamInitialPercentage_gte?: InputMaybe<Scalars['BigInt']['input']>;
  streamInitialPercentage_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  streamInitialPercentage_lt?: InputMaybe<Scalars['BigInt']['input']>;
  streamInitialPercentage_lte?: InputMaybe<Scalars['BigInt']['input']>;
  streamInitialPercentage_not?: InputMaybe<Scalars['BigInt']['input']>;
  streamInitialPercentage_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  streamInitial_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  streamInitial_not?: InputMaybe<Scalars['Boolean']['input']>;
  streamInitial_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  streamShape?: InputMaybe<Scalars['String']['input']>;
  streamShape_contains?: InputMaybe<Scalars['String']['input']>;
  streamShape_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  streamShape_ends_with?: InputMaybe<Scalars['String']['input']>;
  streamShape_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  streamShape_gt?: InputMaybe<Scalars['String']['input']>;
  streamShape_gte?: InputMaybe<Scalars['String']['input']>;
  streamShape_in?: InputMaybe<Array<Scalars['String']['input']>>;
  streamShape_lt?: InputMaybe<Scalars['String']['input']>;
  streamShape_lte?: InputMaybe<Scalars['String']['input']>;
  streamShape_not?: InputMaybe<Scalars['String']['input']>;
  streamShape_not_contains?: InputMaybe<Scalars['String']['input']>;
  streamShape_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  streamShape_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  streamShape_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  streamShape_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  streamShape_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  streamShape_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  streamShape_starts_with?: InputMaybe<Scalars['String']['input']>;
  streamShape_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  streamStart?: InputMaybe<Scalars['Boolean']['input']>;
  streamStartTime?: InputMaybe<Scalars['BigInt']['input']>;
  streamStartTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  streamStartTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  streamStartTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  streamStartTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  streamStartTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  streamStartTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  streamStartTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  streamStart_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  streamStart_not?: InputMaybe<Scalars['Boolean']['input']>;
  streamStart_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  streamTotalDuration?: InputMaybe<Scalars['BigInt']['input']>;
  streamTotalDuration_gt?: InputMaybe<Scalars['BigInt']['input']>;
  streamTotalDuration_gte?: InputMaybe<Scalars['BigInt']['input']>;
  streamTotalDuration_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  streamTotalDuration_lt?: InputMaybe<Scalars['BigInt']['input']>;
  streamTotalDuration_lte?: InputMaybe<Scalars['BigInt']['input']>;
  streamTotalDuration_not?: InputMaybe<Scalars['BigInt']['input']>;
  streamTotalDuration_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  streamTranches_?: InputMaybe<Tranche_Filter>;
  streamTransferable?: InputMaybe<Scalars['Boolean']['input']>;
  streamTransferable_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  streamTransferable_not?: InputMaybe<Scalars['Boolean']['input']>;
  streamTransferable_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
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
  totalRecipients?: InputMaybe<Scalars['BigInt']['input']>;
  totalRecipients_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRecipients_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRecipients_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalRecipients_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRecipients_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRecipients_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalRecipients_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
};

export enum Campaign_OrderBy {
  Actions = 'actions',
  Activities = 'activities',
  Address = 'address',
  Admin = 'admin',
  AggregateAmount = 'aggregateAmount',
  Asset = 'asset',
  AssetAddress = 'asset__address',
  AssetChainId = 'asset__chainId',
  AssetDecimals = 'asset__decimals',
  AssetId = 'asset__id',
  AssetName = 'asset__name',
  AssetSymbol = 'asset__symbol',
  CampaignStartTime = 'campaignStartTime',
  Category = 'category',
  ChainId = 'chainId',
  ClaimedAmount = 'claimedAmount',
  ClaimedCount = 'claimedCount',
  ClawbackAction = 'clawbackAction',
  ClawbackActionBlock = 'clawbackAction__block',
  ClawbackActionCategory = 'clawbackAction__category',
  ClawbackActionChainId = 'clawbackAction__chainId',
  ClawbackActionClaimAmount = 'clawbackAction__claimAmount',
  ClawbackActionClaimIndex = 'clawbackAction__claimIndex',
  ClawbackActionClaimRecipient = 'clawbackAction__claimRecipient',
  ClawbackActionClaimStreamId = 'clawbackAction__claimStreamId',
  ClawbackActionClaimTo = 'clawbackAction__claimTo',
  ClawbackActionClaimTokenId = 'clawbackAction__claimTokenId',
  ClawbackActionClawbackAmount = 'clawbackAction__clawbackAmount',
  ClawbackActionClawbackFrom = 'clawbackAction__clawbackFrom',
  ClawbackActionClawbackTo = 'clawbackAction__clawbackTo',
  ClawbackActionFee = 'clawbackAction__fee',
  ClawbackActionFrom = 'clawbackAction__from',
  ClawbackActionHash = 'clawbackAction__hash',
  ClawbackActionId = 'clawbackAction__id',
  ClawbackActionSubgraphId = 'clawbackAction__subgraphId',
  ClawbackActionTimestamp = 'clawbackAction__timestamp',
  ClawbackTime = 'clawbackTime',
  Expiration = 'expiration',
  Expires = 'expires',
  Factory = 'factory',
  FactoryAddress = 'factory__address',
  FactoryAlias = 'factory__alias',
  FactoryCampaignCounter = 'factory__campaignCounter',
  FactoryChainId = 'factory__chainId',
  FactoryId = 'factory__id',
  Fee = 'fee',
  Hash = 'hash',
  Id = 'id',
  IpfsCid = 'ipfsCID',
  Lockup = 'lockup',
  Name = 'name',
  Nickname = 'nickname',
  Position = 'position',
  Root = 'root',
  StreamCancelable = 'streamCancelable',
  StreamCliff = 'streamCliff',
  StreamCliffDuration = 'streamCliffDuration',
  StreamCliffPercentage = 'streamCliffPercentage',
  StreamInitial = 'streamInitial',
  StreamInitialPercentage = 'streamInitialPercentage',
  StreamShape = 'streamShape',
  StreamStart = 'streamStart',
  StreamStartTime = 'streamStartTime',
  StreamTotalDuration = 'streamTotalDuration',
  StreamTranches = 'streamTranches',
  StreamTransferable = 'streamTransferable',
  SubgraphId = 'subgraphId',
  Timestamp = 'timestamp',
  TotalRecipients = 'totalRecipients',
  Version = 'version'
}

/** Entity for Merkle factories, which deploy campaigns. */
export type Factory = {
  __typename?: 'Factory';
  /** The address of the factory contract. */
  address: Scalars['Bytes']['output'];
  /**
   * Factory alias, e.g., `MSF2`. For historical reasons, the alias comes from the
   * the name of the `MerkleStreamFactory` contract.
   */
  alias: Scalars['String']['output'];
  /** Factory index for campaigns */
  campaignCounter: Scalars['BigInt']['output'];
  /** Campaigns deployed by this factory. */
  campaigns: Array<Campaign>;
  /** The chain ID where the factory was created (e.g., 137 for Polygon). */
  chainId: Scalars['BigInt']['output'];
  /** Unique identifier: `factory-{chainId}-{address}` */
  id: Scalars['String']['output'];
};


/** Entity for Merkle factories, which deploy campaigns. */
export type FactoryCampaignsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Campaign_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Campaign_Filter>;
};

export type Factory_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<Factory_Filter>>>;
  campaignCounter?: InputMaybe<Scalars['BigInt']['input']>;
  campaignCounter_gt?: InputMaybe<Scalars['BigInt']['input']>;
  campaignCounter_gte?: InputMaybe<Scalars['BigInt']['input']>;
  campaignCounter_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  campaignCounter_lt?: InputMaybe<Scalars['BigInt']['input']>;
  campaignCounter_lte?: InputMaybe<Scalars['BigInt']['input']>;
  campaignCounter_not?: InputMaybe<Scalars['BigInt']['input']>;
  campaignCounter_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  campaigns_?: InputMaybe<Campaign_Filter>;
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
  or?: InputMaybe<Array<InputMaybe<Factory_Filter>>>;
};

export enum Factory_OrderBy {
  Address = 'address',
  Alias = 'alias',
  CampaignCounter = 'campaignCounter',
  Campaigns = 'campaigns',
  ChainId = 'chainId',
  Id = 'id'
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
  activities: Array<Activity>;
  activity?: Maybe<Activity>;
  asset?: Maybe<Asset>;
  assets: Array<Asset>;
  campaign?: Maybe<Campaign>;
  campaigns: Array<Campaign>;
  factories: Array<Factory>;
  factory?: Maybe<Factory>;
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


export type QueryActivitiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Activity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Activity_Filter>;
};


export type QueryActivityArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
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


export type QueryCampaignArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCampaignsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Campaign_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Campaign_Filter>;
};


export type QueryFactoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Factory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Factory_Filter>;
};


export type QueryFactoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
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

/** Used in Merkle Lockup campaigns for the vesting schedule. */
export type Tranche = {
  __typename?: 'Tranche';
  /** The campaign in which this tranche was created. */
  campaign: Campaign;
  /** Duration of the tranche, in seconds. */
  duration: Scalars['BigInt']['output'];
  /** Total duration accrued at the end of the tranche. This is the sum of this tranche's duration and all previous tranches' durations. */
  endDuration: Scalars['BigInt']['output'];
  /** Total percentage unlocked at the end of the tranche. This is the sum of this tranche's percentage and all previous tranches' percentages. */
  endPercentage: Scalars['BigInt']['output'];
  /** Unique identifier: `tranche-{campaignId}-{position}` */
  id: Scalars['String']['output'];
  /** Percentage of the total amount unlocked by this tranche. */
  percentage: Scalars['BigInt']['output'];
  /** Position of the tranche inside the array. */
  position: Scalars['BigInt']['output'];
  /** Total duration accrued at the start of the tranche. This is the sum of all previous tranches' durations. */
  startDuration: Scalars['BigInt']['output'];
  /** Total percentage unlocked at the start of the tranche. This is the sum of all previous tranches' percentages. */
  startPercentage: Scalars['BigInt']['output'];
};

export type Tranche_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Tranche_Filter>>>;
  campaign?: InputMaybe<Scalars['String']['input']>;
  campaign_?: InputMaybe<Campaign_Filter>;
  campaign_contains?: InputMaybe<Scalars['String']['input']>;
  campaign_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  campaign_ends_with?: InputMaybe<Scalars['String']['input']>;
  campaign_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  campaign_gt?: InputMaybe<Scalars['String']['input']>;
  campaign_gte?: InputMaybe<Scalars['String']['input']>;
  campaign_in?: InputMaybe<Array<Scalars['String']['input']>>;
  campaign_lt?: InputMaybe<Scalars['String']['input']>;
  campaign_lte?: InputMaybe<Scalars['String']['input']>;
  campaign_not?: InputMaybe<Scalars['String']['input']>;
  campaign_not_contains?: InputMaybe<Scalars['String']['input']>;
  campaign_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  campaign_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  campaign_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  campaign_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  campaign_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  campaign_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  campaign_starts_with?: InputMaybe<Scalars['String']['input']>;
  campaign_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['BigInt']['input']>;
  duration_gt?: InputMaybe<Scalars['BigInt']['input']>;
  duration_gte?: InputMaybe<Scalars['BigInt']['input']>;
  duration_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  duration_lt?: InputMaybe<Scalars['BigInt']['input']>;
  duration_lte?: InputMaybe<Scalars['BigInt']['input']>;
  duration_not?: InputMaybe<Scalars['BigInt']['input']>;
  duration_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endDuration?: InputMaybe<Scalars['BigInt']['input']>;
  endDuration_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endDuration_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endDuration_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endDuration_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endDuration_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endDuration_not?: InputMaybe<Scalars['BigInt']['input']>;
  endDuration_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endPercentage?: InputMaybe<Scalars['BigInt']['input']>;
  endPercentage_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endPercentage_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endPercentage_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endPercentage_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endPercentage_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endPercentage_not?: InputMaybe<Scalars['BigInt']['input']>;
  endPercentage_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  percentage?: InputMaybe<Scalars['BigInt']['input']>;
  percentage_gt?: InputMaybe<Scalars['BigInt']['input']>;
  percentage_gte?: InputMaybe<Scalars['BigInt']['input']>;
  percentage_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  percentage_lt?: InputMaybe<Scalars['BigInt']['input']>;
  percentage_lte?: InputMaybe<Scalars['BigInt']['input']>;
  percentage_not?: InputMaybe<Scalars['BigInt']['input']>;
  percentage_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  position?: InputMaybe<Scalars['BigInt']['input']>;
  position_gt?: InputMaybe<Scalars['BigInt']['input']>;
  position_gte?: InputMaybe<Scalars['BigInt']['input']>;
  position_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  position_lt?: InputMaybe<Scalars['BigInt']['input']>;
  position_lte?: InputMaybe<Scalars['BigInt']['input']>;
  position_not?: InputMaybe<Scalars['BigInt']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startDuration?: InputMaybe<Scalars['BigInt']['input']>;
  startDuration_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startDuration_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startDuration_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startDuration_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startDuration_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startDuration_not?: InputMaybe<Scalars['BigInt']['input']>;
  startDuration_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startPercentage?: InputMaybe<Scalars['BigInt']['input']>;
  startPercentage_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startPercentage_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startPercentage_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startPercentage_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startPercentage_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startPercentage_not?: InputMaybe<Scalars['BigInt']['input']>;
  startPercentage_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Tranche_OrderBy {
  Campaign = 'campaign',
  CampaignAddress = 'campaign__address',
  CampaignAdmin = 'campaign__admin',
  CampaignAggregateAmount = 'campaign__aggregateAmount',
  CampaignCampaignStartTime = 'campaign__campaignStartTime',
  CampaignCategory = 'campaign__category',
  CampaignChainId = 'campaign__chainId',
  CampaignClaimedAmount = 'campaign__claimedAmount',
  CampaignClaimedCount = 'campaign__claimedCount',
  CampaignClawbackTime = 'campaign__clawbackTime',
  CampaignExpiration = 'campaign__expiration',
  CampaignExpires = 'campaign__expires',
  CampaignFee = 'campaign__fee',
  CampaignHash = 'campaign__hash',
  CampaignId = 'campaign__id',
  CampaignIpfsCid = 'campaign__ipfsCID',
  CampaignLockup = 'campaign__lockup',
  CampaignName = 'campaign__name',
  CampaignNickname = 'campaign__nickname',
  CampaignPosition = 'campaign__position',
  CampaignRoot = 'campaign__root',
  CampaignStreamCancelable = 'campaign__streamCancelable',
  CampaignStreamCliff = 'campaign__streamCliff',
  CampaignStreamCliffDuration = 'campaign__streamCliffDuration',
  CampaignStreamCliffPercentage = 'campaign__streamCliffPercentage',
  CampaignStreamInitial = 'campaign__streamInitial',
  CampaignStreamInitialPercentage = 'campaign__streamInitialPercentage',
  CampaignStreamShape = 'campaign__streamShape',
  CampaignStreamStart = 'campaign__streamStart',
  CampaignStreamStartTime = 'campaign__streamStartTime',
  CampaignStreamTotalDuration = 'campaign__streamTotalDuration',
  CampaignStreamTransferable = 'campaign__streamTransferable',
  CampaignSubgraphId = 'campaign__subgraphId',
  CampaignTimestamp = 'campaign__timestamp',
  CampaignTotalRecipients = 'campaign__totalRecipients',
  CampaignVersion = 'campaign__version',
  Duration = 'duration',
  EndDuration = 'endDuration',
  EndPercentage = 'endPercentage',
  Id = 'id',
  Percentage = 'percentage',
  Position = 'position',
  StartDuration = 'startDuration',
  StartPercentage = 'startPercentage'
}

export type Watcher = {
  __typename?: 'Watcher';
  /** Global counter for actions. */
  actionCounter: Scalars['BigInt']['output'];
  /** Global counter. */
  campaignCounter: Scalars['BigInt']['output'];
  /** Alias for id. */
  chainId: Scalars['BigInt']['output'];
  /** The chain ID. There is one watcher per subgraph. */
  id: Scalars['String']['output'];
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
  campaignCounter?: InputMaybe<Scalars['BigInt']['input']>;
  campaignCounter_gt?: InputMaybe<Scalars['BigInt']['input']>;
  campaignCounter_gte?: InputMaybe<Scalars['BigInt']['input']>;
  campaignCounter_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  campaignCounter_lt?: InputMaybe<Scalars['BigInt']['input']>;
  campaignCounter_lte?: InputMaybe<Scalars['BigInt']['input']>;
  campaignCounter_not?: InputMaybe<Scalars['BigInt']['input']>;
  campaignCounter_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
};

export enum Watcher_OrderBy {
  ActionCounter = 'actionCounter',
  CampaignCounter = 'campaignCounter',
  ChainId = 'chainId',
  Id = 'id'
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

export type ActionFragmentFragment = { __typename?: 'Action', id: string, block: any, category: ActionCategory, chainId: any, claimAmount?: any | null, claimIndex?: any | null, claimRecipient?: any | null, claimStreamId?: string | null, claimTokenId?: any | null, clawbackAmount?: any | null, clawbackFrom?: any | null, clawbackTo?: any | null, fee?: any | null, from: any, hash: any, subgraphId: any, timestamp: any, campaign: { __typename?: 'Campaign', id: string, name?: string | null, nickname: string } };

export type ActivityFragmentFragment = { __typename?: 'Activity', id: string, amount: any, claims: any, day: any, timestamp: any, campaign: { __typename?: 'Campaign', id: string } };

export type CampaignFragmentBaseFragment = { __typename?: 'Campaign', id: string, address: any, admin: any, aggregateAmount: any, category: CampaignCategory, chainId: any, claimedAmount: any, claimedCount: any, clawbackTime?: any | null, expiration?: any | null, expires: boolean, fee?: any | null, hash: any, ipfsCID: string, lockup?: any | null, name?: string | null, nickname: string, root: any, streamCancelable?: boolean | null, streamCliff?: boolean | null, streamCliffDuration?: any | null, streamCliffPercentage?: any | null, streamInitial?: boolean | null, streamInitialPercentage?: any | null, streamShape?: string | null, streamStart?: boolean | null, streamStartTime?: any | null, streamTotalDuration?: any | null, streamTransferable?: boolean | null, subgraphId: any, timestamp: any, totalRecipients: any, version: string, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, factory: { __typename?: 'Factory', id: string, address: any, alias: string } };

export type FactoryFragmentFragment = { __typename?: 'Factory', id: string, address: any, alias: string };

export type TrancheFragmentFragment = { __typename?: 'Tranche', id: string, duration: any, endDuration: any, endPercentage: any, percentage: any, position: any, startDuration: any, startPercentage: any };

export type CampaignFragmentFragment = { __typename?: 'Campaign', id: string, address: any, admin: any, aggregateAmount: any, category: CampaignCategory, chainId: any, claimedAmount: any, claimedCount: any, clawbackTime?: any | null, expiration?: any | null, expires: boolean, fee?: any | null, hash: any, ipfsCID: string, lockup?: any | null, name?: string | null, nickname: string, root: any, streamCancelable?: boolean | null, streamCliff?: boolean | null, streamCliffDuration?: any | null, streamCliffPercentage?: any | null, streamInitial?: boolean | null, streamInitialPercentage?: any | null, streamShape?: string | null, streamStart?: boolean | null, streamStartTime?: any | null, streamTotalDuration?: any | null, streamTransferable?: boolean | null, subgraphId: any, timestamp: any, totalRecipients: any, version: string, streamTranches: Array<{ __typename?: 'Tranche', id: string, duration: any, endDuration: any, endPercentage: any, percentage: any, position: any, startDuration: any, startPercentage: any }>, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, factory: { __typename?: 'Factory', id: string, address: any, alias: string } };

export type AssetFragmentFragment = { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string };

export type GetActionsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  where?: InputMaybe<Action_Filter>;
}>;


export type GetActionsQuery = { __typename?: 'Query', actions: Array<{ __typename?: 'Action', id: string, block: any, category: ActionCategory, chainId: any, claimAmount?: any | null, claimIndex?: any | null, claimRecipient?: any | null, claimStreamId?: string | null, claimTokenId?: any | null, clawbackAmount?: any | null, clawbackFrom?: any | null, clawbackTo?: any | null, fee?: any | null, from: any, hash: any, subgraphId: any, timestamp: any, campaign: { __typename?: 'Campaign', id: string, category: CampaignCategory, name?: string | null, nickname: string, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string } } }> };

export type GetCampaignQueryVariables = Exact<{
  campaignId: Scalars['ID']['input'];
}>;


export type GetCampaignQuery = { __typename?: 'Query', campaign?: { __typename?: 'Campaign', id: string, address: any, admin: any, aggregateAmount: any, category: CampaignCategory, chainId: any, claimedAmount: any, claimedCount: any, clawbackTime?: any | null, expiration?: any | null, expires: boolean, fee?: any | null, hash: any, ipfsCID: string, lockup?: any | null, name?: string | null, nickname: string, root: any, streamCancelable?: boolean | null, streamCliff?: boolean | null, streamCliffDuration?: any | null, streamCliffPercentage?: any | null, streamInitial?: boolean | null, streamInitialPercentage?: any | null, streamShape?: string | null, streamStart?: boolean | null, streamStartTime?: any | null, streamTotalDuration?: any | null, streamTransferable?: boolean | null, subgraphId: any, timestamp: any, totalRecipients: any, version: string, streamTranches: Array<{ __typename?: 'Tranche', id: string, duration: any, endDuration: any, endPercentage: any, percentage: any, position: any, startDuration: any, startPercentage: any }>, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, factory: { __typename?: 'Factory', id: string, address: any, alias: string } } | null };

export type GetCampaignWithActionsQueryVariables = Exact<{
  campaignId: Scalars['ID']['input'];
}>;


export type GetCampaignWithActionsQuery = { __typename?: 'Query', campaign?: { __typename?: 'Campaign', id: string, address: any, admin: any, aggregateAmount: any, category: CampaignCategory, chainId: any, claimedAmount: any, claimedCount: any, clawbackTime?: any | null, expiration?: any | null, expires: boolean, fee?: any | null, hash: any, ipfsCID: string, lockup?: any | null, name?: string | null, nickname: string, root: any, streamCancelable?: boolean | null, streamCliff?: boolean | null, streamCliffDuration?: any | null, streamCliffPercentage?: any | null, streamInitial?: boolean | null, streamInitialPercentage?: any | null, streamShape?: string | null, streamStart?: boolean | null, streamStartTime?: any | null, streamTotalDuration?: any | null, streamTransferable?: boolean | null, subgraphId: any, timestamp: any, totalRecipients: any, version: string, actions: Array<{ __typename?: 'Action', id: string, block: any, category: ActionCategory, chainId: any, claimAmount?: any | null, claimIndex?: any | null, claimRecipient?: any | null, claimStreamId?: string | null, claimTokenId?: any | null, clawbackAmount?: any | null, clawbackFrom?: any | null, clawbackTo?: any | null, fee?: any | null, from: any, hash: any, subgraphId: any, timestamp: any, campaign: { __typename?: 'Campaign', id: string, name?: string | null, nickname: string } }>, streamTranches: Array<{ __typename?: 'Tranche', id: string, duration: any, endDuration: any, endPercentage: any, percentage: any, position: any, startDuration: any, startPercentage: any }>, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, factory: { __typename?: 'Factory', id: string, address: any, alias: string } } | null };

export type GetCampaignMetadataQueryVariables = Exact<{
  campaignId: Scalars['ID']['input'];
  campaignId_string: Scalars['String']['input'];
  dayFrom: Scalars['BigInt']['input'];
  dayTo: Scalars['BigInt']['input'];
}>;


export type GetCampaignMetadataQuery = { __typename?: 'Query', campaign?: { __typename?: 'Campaign', id: string, actions: Array<{ __typename?: 'Action', id: string, block: any, category: ActionCategory, chainId: any, claimAmount?: any | null, claimIndex?: any | null, claimRecipient?: any | null, claimStreamId?: string | null, claimTokenId?: any | null, clawbackAmount?: any | null, clawbackFrom?: any | null, clawbackTo?: any | null, fee?: any | null, from: any, hash: any, subgraphId: any, timestamp: any, campaign: { __typename?: 'Campaign', id: string, name?: string | null, nickname: string } }>, activities: Array<{ __typename?: 'Activity', id: string, amount: any, claims: any, day: any, timestamp: any, campaign: { __typename?: 'Campaign', id: string } }>, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string } } | null, firsts: Array<{ __typename?: 'Action', id: string, block: any, category: ActionCategory, chainId: any, claimAmount?: any | null, claimIndex?: any | null, claimRecipient?: any | null, claimStreamId?: string | null, claimTokenId?: any | null, clawbackAmount?: any | null, clawbackFrom?: any | null, clawbackTo?: any | null, fee?: any | null, from: any, hash: any, subgraphId: any, timestamp: any, campaign: { __typename?: 'Campaign', id: string, name?: string | null, nickname: string } }>, actions: Array<{ __typename?: 'Action', id: string, block: any, category: ActionCategory, chainId: any, claimAmount?: any | null, claimIndex?: any | null, claimRecipient?: any | null, claimStreamId?: string | null, claimTokenId?: any | null, clawbackAmount?: any | null, clawbackFrom?: any | null, clawbackTo?: any | null, fee?: any | null, from: any, hash: any, subgraphId: any, timestamp: any, campaign: { __typename?: 'Campaign', id: string, name?: string | null, nickname: string } }> };

export type GetCampaignsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderDirection: OrderDirection;
  where?: InputMaybe<Campaign_Filter>;
}>;


export type GetCampaignsQuery = { __typename?: 'Query', campaigns: Array<{ __typename?: 'Campaign', id: string, address: any, admin: any, aggregateAmount: any, category: CampaignCategory, chainId: any, claimedAmount: any, claimedCount: any, clawbackTime?: any | null, expiration?: any | null, expires: boolean, fee?: any | null, hash: any, ipfsCID: string, lockup?: any | null, name?: string | null, nickname: string, root: any, streamCancelable?: boolean | null, streamCliff?: boolean | null, streamCliffDuration?: any | null, streamCliffPercentage?: any | null, streamInitial?: boolean | null, streamInitialPercentage?: any | null, streamShape?: string | null, streamStart?: boolean | null, streamStartTime?: any | null, streamTotalDuration?: any | null, streamTransferable?: boolean | null, subgraphId: any, timestamp: any, totalRecipients: any, version: string, streamTranches: Array<{ __typename?: 'Tranche', id: string, duration: any, endDuration: any, endPercentage: any, percentage: any, position: any, startDuration: any, startPercentage: any }>, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, factory: { __typename?: 'Factory', id: string, address: any, alias: string } }> };

export type GetCampaignsWithActionsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderDirection: OrderDirection;
  where?: InputMaybe<Campaign_Filter>;
}>;


export type GetCampaignsWithActionsQuery = { __typename?: 'Query', campaigns: Array<{ __typename?: 'Campaign', id: string, address: any, admin: any, aggregateAmount: any, category: CampaignCategory, chainId: any, claimedAmount: any, claimedCount: any, clawbackTime?: any | null, expiration?: any | null, expires: boolean, fee?: any | null, hash: any, ipfsCID: string, lockup?: any | null, name?: string | null, nickname: string, root: any, streamCancelable?: boolean | null, streamCliff?: boolean | null, streamCliffDuration?: any | null, streamCliffPercentage?: any | null, streamInitial?: boolean | null, streamInitialPercentage?: any | null, streamShape?: string | null, streamStart?: boolean | null, streamStartTime?: any | null, streamTotalDuration?: any | null, streamTransferable?: boolean | null, subgraphId: any, timestamp: any, totalRecipients: any, version: string, actions: Array<{ __typename?: 'Action', id: string, block: any, category: ActionCategory, chainId: any, claimAmount?: any | null, claimIndex?: any | null, claimRecipient?: any | null, claimStreamId?: string | null, claimTokenId?: any | null, clawbackAmount?: any | null, clawbackFrom?: any | null, clawbackTo?: any | null, fee?: any | null, from: any, hash: any, subgraphId: any, timestamp: any, campaign: { __typename?: 'Campaign', id: string, name?: string | null, nickname: string } }>, streamTranches: Array<{ __typename?: 'Tranche', id: string, duration: any, endDuration: any, endPercentage: any, percentage: any, position: any, startDuration: any, startPercentage: any }>, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, factory: { __typename?: 'Factory', id: string, address: any, alias: string } }> };

export type GetCampaignsWithActivitiesQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderDirection: OrderDirection;
  where?: InputMaybe<Campaign_Filter>;
}>;


export type GetCampaignsWithActivitiesQuery = { __typename?: 'Query', campaigns: Array<{ __typename?: 'Campaign', id: string, address: any, admin: any, aggregateAmount: any, category: CampaignCategory, chainId: any, claimedAmount: any, claimedCount: any, clawbackTime?: any | null, expiration?: any | null, expires: boolean, fee?: any | null, hash: any, ipfsCID: string, lockup?: any | null, name?: string | null, nickname: string, root: any, streamCancelable?: boolean | null, streamCliff?: boolean | null, streamCliffDuration?: any | null, streamCliffPercentage?: any | null, streamInitial?: boolean | null, streamInitialPercentage?: any | null, streamShape?: string | null, streamStart?: boolean | null, streamStartTime?: any | null, streamTotalDuration?: any | null, streamTransferable?: boolean | null, subgraphId: any, timestamp: any, totalRecipients: any, version: string, activities: Array<{ __typename?: 'Activity', id: string, amount: any, claims: any, day: any, timestamp: any, campaign: { __typename?: 'Campaign', id: string } }>, streamTranches: Array<{ __typename?: 'Tranche', id: string, duration: any, endDuration: any, endPercentage: any, percentage: any, position: any, startDuration: any, startPercentage: any }>, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, factory: { __typename?: 'Factory', id: string, address: any, alias: string } }> };

export type GetCampaignsWithActionsAndActivitiesQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderDirection: OrderDirection;
  where?: InputMaybe<Campaign_Filter>;
}>;


export type GetCampaignsWithActionsAndActivitiesQuery = { __typename?: 'Query', campaigns: Array<{ __typename?: 'Campaign', id: string, address: any, admin: any, aggregateAmount: any, category: CampaignCategory, chainId: any, claimedAmount: any, claimedCount: any, clawbackTime?: any | null, expiration?: any | null, expires: boolean, fee?: any | null, hash: any, ipfsCID: string, lockup?: any | null, name?: string | null, nickname: string, root: any, streamCancelable?: boolean | null, streamCliff?: boolean | null, streamCliffDuration?: any | null, streamCliffPercentage?: any | null, streamInitial?: boolean | null, streamInitialPercentage?: any | null, streamShape?: string | null, streamStart?: boolean | null, streamStartTime?: any | null, streamTotalDuration?: any | null, streamTransferable?: boolean | null, subgraphId: any, timestamp: any, totalRecipients: any, version: string, actions: Array<{ __typename?: 'Action', id: string, block: any, category: ActionCategory, chainId: any, claimAmount?: any | null, claimIndex?: any | null, claimRecipient?: any | null, claimStreamId?: string | null, claimTokenId?: any | null, clawbackAmount?: any | null, clawbackFrom?: any | null, clawbackTo?: any | null, fee?: any | null, from: any, hash: any, subgraphId: any, timestamp: any, campaign: { __typename?: 'Campaign', id: string, name?: string | null, nickname: string } }>, activities: Array<{ __typename?: 'Activity', id: string, amount: any, claims: any, day: any, timestamp: any, campaign: { __typename?: 'Campaign', id: string } }>, streamTranches: Array<{ __typename?: 'Tranche', id: string, duration: any, endDuration: any, endPercentage: any, percentage: any, position: any, startDuration: any, startPercentage: any }>, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, factory: { __typename?: 'Factory', id: string, address: any, alias: string } }> };

export type GetCampaignsWithClaimsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  claimer: Scalars['Bytes']['input'];
  orderDirection: OrderDirection;
  where?: InputMaybe<Campaign_Filter>;
}>;


export type GetCampaignsWithClaimsQuery = { __typename?: 'Query', campaigns: Array<{ __typename?: 'Campaign', id: string, address: any, admin: any, aggregateAmount: any, category: CampaignCategory, chainId: any, claimedAmount: any, claimedCount: any, clawbackTime?: any | null, expiration?: any | null, expires: boolean, fee?: any | null, hash: any, ipfsCID: string, lockup?: any | null, name?: string | null, nickname: string, root: any, streamCancelable?: boolean | null, streamCliff?: boolean | null, streamCliffDuration?: any | null, streamCliffPercentage?: any | null, streamInitial?: boolean | null, streamInitialPercentage?: any | null, streamShape?: string | null, streamStart?: boolean | null, streamStartTime?: any | null, streamTotalDuration?: any | null, streamTransferable?: boolean | null, subgraphId: any, timestamp: any, totalRecipients: any, version: string, actions: Array<{ __typename?: 'Action', id: string, block: any, category: ActionCategory, chainId: any, claimAmount?: any | null, claimIndex?: any | null, claimRecipient?: any | null, claimStreamId?: string | null, claimTokenId?: any | null, clawbackAmount?: any | null, clawbackFrom?: any | null, clawbackTo?: any | null, fee?: any | null, from: any, hash: any, subgraphId: any, timestamp: any, campaign: { __typename?: 'Campaign', id: string, name?: string | null, nickname: string } }>, streamTranches: Array<{ __typename?: 'Tranche', id: string, duration: any, endDuration: any, endPercentage: any, percentage: any, position: any, startDuration: any, startPercentage: any }>, asset: { __typename?: 'Asset', id: string, address: any, chainId: any, decimals: any, name: string, symbol: string }, factory: { __typename?: 'Factory', id: string, address: any, alias: string } }> };

export const ActionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimIndex"}},{"kind":"Field","name":{"kind":"Name","value":"claimRecipient"}},{"kind":"Field","name":{"kind":"Name","value":"claimStreamId"}},{"kind":"Field","name":{"kind":"Name","value":"claimTokenId"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackFrom"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTo"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}}]} as unknown as DocumentNode<ActionFragmentFragment, unknown>;
export const ActivityFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActivityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Activity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"claims"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ActivityFragmentFragment, unknown>;
export const AssetFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]} as unknown as DocumentNode<AssetFragmentFragment, unknown>;
export const FactoryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}}]} as unknown as DocumentNode<FactoryFragmentFragment, unknown>;
export const CampaignFragmentBaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}}]} as unknown as DocumentNode<CampaignFragmentBaseFragment, unknown>;
export const TrancheFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}}]} as unknown as DocumentNode<TrancheFragmentFragment, unknown>;
export const CampaignFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"streamTranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"position"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}}]} as unknown as DocumentNode<CampaignFragmentFragment, unknown>;
export const GetActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getActions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Action_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimIndex"}},{"kind":"Field","name":{"kind":"Name","value":"claimRecipient"}},{"kind":"Field","name":{"kind":"Name","value":"claimStreamId"}},{"kind":"Field","name":{"kind":"Name","value":"claimTokenId"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackFrom"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTo"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]} as unknown as DocumentNode<GetActionsQuery, GetActionsQueryVariables>;
export const GetCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"streamTranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"position"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}}]} as unknown as DocumentNode<GetCampaignQuery, GetCampaignQueryVariables>;
export const GetCampaignWithActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCampaignWithActions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragment"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"streamTranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"position"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimIndex"}},{"kind":"Field","name":{"kind":"Name","value":"claimRecipient"}},{"kind":"Field","name":{"kind":"Name","value":"claimStreamId"}},{"kind":"Field","name":{"kind":"Name","value":"claimTokenId"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackFrom"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTo"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}}]} as unknown as DocumentNode<GetCampaignWithActionsQuery, GetCampaignWithActionsQueryVariables>;
export const GetCampaignMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCampaignMetadata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignId_string"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dayFrom"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dayTo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"5"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"7"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"day_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dayFrom"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"day_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dayTo"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActivityFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"firsts"},"name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"campaign"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignId_string"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"category"},"value":{"kind":"EnumValue","value":"Claim"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"campaign"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignId_string"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"category"},"value":{"kind":"EnumValue","value":"Claim"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimIndex"}},{"kind":"Field","name":{"kind":"Name","value":"claimRecipient"}},{"kind":"Field","name":{"kind":"Name","value":"claimStreamId"}},{"kind":"Field","name":{"kind":"Name","value":"claimTokenId"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackFrom"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTo"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActivityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Activity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"claims"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]} as unknown as DocumentNode<GetCampaignMetadataQuery, GetCampaignMetadataQueryVariables>;
export const GetCampaignsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCampaigns"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"streamTranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"position"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}}]} as unknown as DocumentNode<GetCampaignsQuery, GetCampaignsQueryVariables>;
export const GetCampaignsWithActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCampaignsWithActions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragment"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"streamTranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"position"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimIndex"}},{"kind":"Field","name":{"kind":"Name","value":"claimRecipient"}},{"kind":"Field","name":{"kind":"Name","value":"claimStreamId"}},{"kind":"Field","name":{"kind":"Name","value":"claimTokenId"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackFrom"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTo"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}}]} as unknown as DocumentNode<GetCampaignsWithActionsQuery, GetCampaignsWithActionsQueryVariables>;
export const GetCampaignsWithActivitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCampaignsWithActivities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragment"}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActivityFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"streamTranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"position"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActivityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Activity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"claims"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetCampaignsWithActivitiesQuery, GetCampaignsWithActivitiesQueryVariables>;
export const GetCampaignsWithActionsAndActivitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCampaignsWithActionsAndActivities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragment"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActivityFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"streamTranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"position"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimIndex"}},{"kind":"Field","name":{"kind":"Name","value":"claimRecipient"}},{"kind":"Field","name":{"kind":"Name","value":"claimStreamId"}},{"kind":"Field","name":{"kind":"Name","value":"claimTokenId"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackFrom"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTo"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActivityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Activity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"claims"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetCampaignsWithActionsAndActivitiesQuery, GetCampaignsWithActionsAndActivitiesQueryVariables>;
export const GetCampaignsWithClaimsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCampaignsWithClaims"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"claimer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Bytes"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"subgraphId"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragment"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"category"},"value":{"kind":"EnumValue","value":"Claim"}},{"kind":"ObjectField","name":{"kind":"Name","value":"claimRecipient"},"value":{"kind":"Variable","name":{"kind":"Name","value":"claimer"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"streamTranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"position"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimIndex"}},{"kind":"Field","name":{"kind":"Name","value":"claimRecipient"}},{"kind":"Field","name":{"kind":"Name","value":"claimStreamId"}},{"kind":"Field","name":{"kind":"Name","value":"claimTokenId"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackFrom"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTo"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}}]} as unknown as DocumentNode<GetCampaignsWithClaimsQuery, GetCampaignsWithClaimsQueryVariables>;