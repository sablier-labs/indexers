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
  actioncategory: { input: any; output: any; }
  campaigncategory: { input: any; output: any; }
  contract_type: { input: any; output: any; }
  float8: { input: any; output: any; }
  jsonb: { input: any; output: any; }
  numeric: { input: any; output: any; }
  timestamp: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
};

/** columns and relationships of "Action" */
export type Action = {
  __typename?: 'Action';
  block: Scalars['numeric']['output'];
  /** An object relationship */
  campaign?: Maybe<Campaign>;
  campaign_id: Scalars['String']['output'];
  category: Scalars['actioncategory']['output'];
  chainId: Scalars['numeric']['output'];
  claimAmount?: Maybe<Scalars['numeric']['output']>;
  claimIndex?: Maybe<Scalars['numeric']['output']>;
  claimRecipient?: Maybe<Scalars['String']['output']>;
  claimStreamId?: Maybe<Scalars['String']['output']>;
  claimTokenId?: Maybe<Scalars['numeric']['output']>;
  clawbackAmount?: Maybe<Scalars['numeric']['output']>;
  clawbackFrom?: Maybe<Scalars['String']['output']>;
  clawbackTo?: Maybe<Scalars['String']['output']>;
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  from: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  subgraphId: Scalars['numeric']['output'];
  timestamp: Scalars['numeric']['output'];
};

/** order by aggregate values of table "Action" */
export type Action_Aggregate_Order_By = {
  avg?: InputMaybe<Action_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Action_Max_Order_By>;
  min?: InputMaybe<Action_Min_Order_By>;
  stddev?: InputMaybe<Action_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Action_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Action_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Action_Sum_Order_By>;
  var_pop?: InputMaybe<Action_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Action_Var_Samp_Order_By>;
  variance?: InputMaybe<Action_Variance_Order_By>;
};

/** order by avg() on columns of table "Action" */
export type Action_Avg_Order_By = {
  block?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimAmount?: InputMaybe<Order_By>;
  claimIndex?: InputMaybe<Order_By>;
  claimTokenId?: InputMaybe<Order_By>;
  clawbackAmount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Action". All fields are combined with a logical 'AND'. */
export type Action_Bool_Exp = {
  _and?: InputMaybe<Array<Action_Bool_Exp>>;
  _not?: InputMaybe<Action_Bool_Exp>;
  _or?: InputMaybe<Array<Action_Bool_Exp>>;
  block?: InputMaybe<Numeric_Comparison_Exp>;
  campaign?: InputMaybe<Campaign_Bool_Exp>;
  campaign_id?: InputMaybe<String_Comparison_Exp>;
  category?: InputMaybe<Actioncategory_Comparison_Exp>;
  chainId?: InputMaybe<Numeric_Comparison_Exp>;
  claimAmount?: InputMaybe<Numeric_Comparison_Exp>;
  claimIndex?: InputMaybe<Numeric_Comparison_Exp>;
  claimRecipient?: InputMaybe<String_Comparison_Exp>;
  claimStreamId?: InputMaybe<String_Comparison_Exp>;
  claimTokenId?: InputMaybe<Numeric_Comparison_Exp>;
  clawbackAmount?: InputMaybe<Numeric_Comparison_Exp>;
  clawbackFrom?: InputMaybe<String_Comparison_Exp>;
  clawbackTo?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  fee?: InputMaybe<Numeric_Comparison_Exp>;
  from?: InputMaybe<String_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  subgraphId?: InputMaybe<Numeric_Comparison_Exp>;
  timestamp?: InputMaybe<Numeric_Comparison_Exp>;
};

/** order by max() on columns of table "Action" */
export type Action_Max_Order_By = {
  block?: InputMaybe<Order_By>;
  campaign_id?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimAmount?: InputMaybe<Order_By>;
  claimIndex?: InputMaybe<Order_By>;
  claimRecipient?: InputMaybe<Order_By>;
  claimStreamId?: InputMaybe<Order_By>;
  claimTokenId?: InputMaybe<Order_By>;
  clawbackAmount?: InputMaybe<Order_By>;
  clawbackFrom?: InputMaybe<Order_By>;
  clawbackTo?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "Action" */
export type Action_Min_Order_By = {
  block?: InputMaybe<Order_By>;
  campaign_id?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimAmount?: InputMaybe<Order_By>;
  claimIndex?: InputMaybe<Order_By>;
  claimRecipient?: InputMaybe<Order_By>;
  claimStreamId?: InputMaybe<Order_By>;
  claimTokenId?: InputMaybe<Order_By>;
  clawbackAmount?: InputMaybe<Order_By>;
  clawbackFrom?: InputMaybe<Order_By>;
  clawbackTo?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "Action". */
export type Action_Order_By = {
  block?: InputMaybe<Order_By>;
  campaign?: InputMaybe<Campaign_Order_By>;
  campaign_id?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimAmount?: InputMaybe<Order_By>;
  claimIndex?: InputMaybe<Order_By>;
  claimRecipient?: InputMaybe<Order_By>;
  claimStreamId?: InputMaybe<Order_By>;
  claimTokenId?: InputMaybe<Order_By>;
  clawbackAmount?: InputMaybe<Order_By>;
  clawbackFrom?: InputMaybe<Order_By>;
  clawbackTo?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "Action" */
export enum Action_Select_Column {
  /** column name */
  Block = 'block',
  /** column name */
  CampaignId = 'campaign_id',
  /** column name */
  Category = 'category',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  ClaimAmount = 'claimAmount',
  /** column name */
  ClaimIndex = 'claimIndex',
  /** column name */
  ClaimRecipient = 'claimRecipient',
  /** column name */
  ClaimStreamId = 'claimStreamId',
  /** column name */
  ClaimTokenId = 'claimTokenId',
  /** column name */
  ClawbackAmount = 'clawbackAmount',
  /** column name */
  ClawbackFrom = 'clawbackFrom',
  /** column name */
  ClawbackTo = 'clawbackTo',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Fee = 'fee',
  /** column name */
  From = 'from',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  SubgraphId = 'subgraphId',
  /** column name */
  Timestamp = 'timestamp'
}

/** order by stddev() on columns of table "Action" */
export type Action_Stddev_Order_By = {
  block?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimAmount?: InputMaybe<Order_By>;
  claimIndex?: InputMaybe<Order_By>;
  claimTokenId?: InputMaybe<Order_By>;
  clawbackAmount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "Action" */
export type Action_Stddev_Pop_Order_By = {
  block?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimAmount?: InputMaybe<Order_By>;
  claimIndex?: InputMaybe<Order_By>;
  claimTokenId?: InputMaybe<Order_By>;
  clawbackAmount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "Action" */
export type Action_Stddev_Samp_Order_By = {
  block?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimAmount?: InputMaybe<Order_By>;
  claimIndex?: InputMaybe<Order_By>;
  claimTokenId?: InputMaybe<Order_By>;
  clawbackAmount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "Action" */
export type Action_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Action_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Action_Stream_Cursor_Value_Input = {
  block?: InputMaybe<Scalars['numeric']['input']>;
  campaign_id?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['actioncategory']['input']>;
  chainId?: InputMaybe<Scalars['numeric']['input']>;
  claimAmount?: InputMaybe<Scalars['numeric']['input']>;
  claimIndex?: InputMaybe<Scalars['numeric']['input']>;
  claimRecipient?: InputMaybe<Scalars['String']['input']>;
  claimStreamId?: InputMaybe<Scalars['String']['input']>;
  claimTokenId?: InputMaybe<Scalars['numeric']['input']>;
  clawbackAmount?: InputMaybe<Scalars['numeric']['input']>;
  clawbackFrom?: InputMaybe<Scalars['String']['input']>;
  clawbackTo?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  fee?: InputMaybe<Scalars['numeric']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  subgraphId?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
};

/** order by sum() on columns of table "Action" */
export type Action_Sum_Order_By = {
  block?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimAmount?: InputMaybe<Order_By>;
  claimIndex?: InputMaybe<Order_By>;
  claimTokenId?: InputMaybe<Order_By>;
  clawbackAmount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "Action" */
export type Action_Var_Pop_Order_By = {
  block?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimAmount?: InputMaybe<Order_By>;
  claimIndex?: InputMaybe<Order_By>;
  claimTokenId?: InputMaybe<Order_By>;
  clawbackAmount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "Action" */
export type Action_Var_Samp_Order_By = {
  block?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimAmount?: InputMaybe<Order_By>;
  claimIndex?: InputMaybe<Order_By>;
  claimTokenId?: InputMaybe<Order_By>;
  clawbackAmount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "Action" */
export type Action_Variance_Order_By = {
  block?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimAmount?: InputMaybe<Order_By>;
  claimIndex?: InputMaybe<Order_By>;
  claimTokenId?: InputMaybe<Order_By>;
  clawbackAmount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** columns and relationships of "Activity" */
export type Activity = {
  __typename?: 'Activity';
  amount: Scalars['numeric']['output'];
  /** An object relationship */
  campaign?: Maybe<Campaign>;
  campaign_id: Scalars['String']['output'];
  claims: Scalars['numeric']['output'];
  day: Scalars['numeric']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
  timestamp: Scalars['numeric']['output'];
};

/** order by aggregate values of table "Activity" */
export type Activity_Aggregate_Order_By = {
  avg?: InputMaybe<Activity_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Activity_Max_Order_By>;
  min?: InputMaybe<Activity_Min_Order_By>;
  stddev?: InputMaybe<Activity_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Activity_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Activity_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Activity_Sum_Order_By>;
  var_pop?: InputMaybe<Activity_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Activity_Var_Samp_Order_By>;
  variance?: InputMaybe<Activity_Variance_Order_By>;
};

/** order by avg() on columns of table "Activity" */
export type Activity_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  claims?: InputMaybe<Order_By>;
  day?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Activity". All fields are combined with a logical 'AND'. */
export type Activity_Bool_Exp = {
  _and?: InputMaybe<Array<Activity_Bool_Exp>>;
  _not?: InputMaybe<Activity_Bool_Exp>;
  _or?: InputMaybe<Array<Activity_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  campaign?: InputMaybe<Campaign_Bool_Exp>;
  campaign_id?: InputMaybe<String_Comparison_Exp>;
  claims?: InputMaybe<Numeric_Comparison_Exp>;
  day?: InputMaybe<Numeric_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Numeric_Comparison_Exp>;
};

/** order by max() on columns of table "Activity" */
export type Activity_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  campaign_id?: InputMaybe<Order_By>;
  claims?: InputMaybe<Order_By>;
  day?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "Activity" */
export type Activity_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  campaign_id?: InputMaybe<Order_By>;
  claims?: InputMaybe<Order_By>;
  day?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "Activity". */
export type Activity_Order_By = {
  amount?: InputMaybe<Order_By>;
  campaign?: InputMaybe<Campaign_Order_By>;
  campaign_id?: InputMaybe<Order_By>;
  claims?: InputMaybe<Order_By>;
  day?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "Activity" */
export enum Activity_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CampaignId = 'campaign_id',
  /** column name */
  Claims = 'claims',
  /** column name */
  Day = 'day',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id',
  /** column name */
  Timestamp = 'timestamp'
}

/** order by stddev() on columns of table "Activity" */
export type Activity_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  claims?: InputMaybe<Order_By>;
  day?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "Activity" */
export type Activity_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  claims?: InputMaybe<Order_By>;
  day?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "Activity" */
export type Activity_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  claims?: InputMaybe<Order_By>;
  day?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "Activity" */
export type Activity_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Activity_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Activity_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  campaign_id?: InputMaybe<Scalars['String']['input']>;
  claims?: InputMaybe<Scalars['numeric']['input']>;
  day?: InputMaybe<Scalars['numeric']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
};

/** order by sum() on columns of table "Activity" */
export type Activity_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  claims?: InputMaybe<Order_By>;
  day?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "Activity" */
export type Activity_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  claims?: InputMaybe<Order_By>;
  day?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "Activity" */
export type Activity_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  claims?: InputMaybe<Order_By>;
  day?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "Activity" */
export type Activity_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  claims?: InputMaybe<Order_By>;
  day?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** columns and relationships of "Asset" */
export type Asset = {
  __typename?: 'Asset';
  address: Scalars['String']['output'];
  /** An array relationship */
  campaigns: Array<Campaign>;
  chainId: Scalars['numeric']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  decimals: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};


/** columns and relationships of "Asset" */
export type AssetCampaignsArgs = {
  distinct_on?: InputMaybe<Array<Campaign_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Campaign_Order_By>>;
  where?: InputMaybe<Campaign_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "Asset". All fields are combined with a logical 'AND'. */
export type Asset_Bool_Exp = {
  _and?: InputMaybe<Array<Asset_Bool_Exp>>;
  _not?: InputMaybe<Asset_Bool_Exp>;
  _or?: InputMaybe<Array<Asset_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  campaigns?: InputMaybe<Campaign_Bool_Exp>;
  chainId?: InputMaybe<Numeric_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  decimals?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  symbol?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Asset". */
export type Asset_Order_By = {
  address?: InputMaybe<Order_By>;
  campaigns_aggregate?: InputMaybe<Campaign_Aggregate_Order_By>;
  chainId?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  decimals?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  symbol?: InputMaybe<Order_By>;
};

/** select columns of table "Asset" */
export enum Asset_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Decimals = 'decimals',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Symbol = 'symbol'
}

/** Streaming cursor of the table "Asset" */
export type Asset_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Asset_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Asset_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  chainId?: InputMaybe<Scalars['numeric']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  decimals?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** columns and relationships of "Campaign" */
export type Campaign = {
  __typename?: 'Campaign';
  /** An array relationship */
  actions: Array<Action>;
  /** An array relationship */
  activities: Array<Activity>;
  address: Scalars['String']['output'];
  admin: Scalars['String']['output'];
  aggregateAmount: Scalars['numeric']['output'];
  /** An object relationship */
  asset?: Maybe<Asset>;
  asset_id: Scalars['String']['output'];
  category: Scalars['campaigncategory']['output'];
  chainId: Scalars['numeric']['output'];
  claimedAmount: Scalars['numeric']['output'];
  claimedCount: Scalars['numeric']['output'];
  /** An object relationship */
  clawbackAction?: Maybe<Action>;
  clawbackAction_id?: Maybe<Scalars['String']['output']>;
  clawbackTime?: Maybe<Scalars['numeric']['output']>;
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  expiration?: Maybe<Scalars['numeric']['output']>;
  expires: Scalars['Boolean']['output'];
  /** An object relationship */
  factory?: Maybe<Factory>;
  factory_id: Scalars['String']['output'];
  fee?: Maybe<Scalars['numeric']['output']>;
  hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  ipfsCID: Scalars['String']['output'];
  lockup?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nickname: Scalars['String']['output'];
  position: Scalars['numeric']['output'];
  root: Scalars['String']['output'];
  streamCancelable?: Maybe<Scalars['Boolean']['output']>;
  streamCliff?: Maybe<Scalars['Boolean']['output']>;
  streamCliffDuration?: Maybe<Scalars['numeric']['output']>;
  streamCliffPercentage?: Maybe<Scalars['numeric']['output']>;
  streamInitial?: Maybe<Scalars['Boolean']['output']>;
  streamInitialPercentage?: Maybe<Scalars['numeric']['output']>;
  streamShape?: Maybe<Scalars['String']['output']>;
  streamStart?: Maybe<Scalars['Boolean']['output']>;
  streamStartTime?: Maybe<Scalars['numeric']['output']>;
  streamTotalDuration?: Maybe<Scalars['numeric']['output']>;
  /** An array relationship */
  streamTranches: Array<Tranche>;
  streamTransferable?: Maybe<Scalars['Boolean']['output']>;
  subgraphId: Scalars['numeric']['output'];
  timestamp: Scalars['numeric']['output'];
  totalRecipients: Scalars['numeric']['output'];
  version: Scalars['String']['output'];
};


/** columns and relationships of "Campaign" */
export type CampaignActionsArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


/** columns and relationships of "Campaign" */
export type CampaignActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Activity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Activity_Order_By>>;
  where?: InputMaybe<Activity_Bool_Exp>;
};


/** columns and relationships of "Campaign" */
export type CampaignStreamTranchesArgs = {
  distinct_on?: InputMaybe<Array<Tranche_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tranche_Order_By>>;
  where?: InputMaybe<Tranche_Bool_Exp>;
};

/** order by aggregate values of table "Campaign" */
export type Campaign_Aggregate_Order_By = {
  avg?: InputMaybe<Campaign_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Campaign_Max_Order_By>;
  min?: InputMaybe<Campaign_Min_Order_By>;
  stddev?: InputMaybe<Campaign_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Campaign_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Campaign_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Campaign_Sum_Order_By>;
  var_pop?: InputMaybe<Campaign_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Campaign_Var_Samp_Order_By>;
  variance?: InputMaybe<Campaign_Variance_Order_By>;
};

/** order by avg() on columns of table "Campaign" */
export type Campaign_Avg_Order_By = {
  aggregateAmount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimedAmount?: InputMaybe<Order_By>;
  claimedCount?: InputMaybe<Order_By>;
  clawbackTime?: InputMaybe<Order_By>;
  expiration?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  streamCliffDuration?: InputMaybe<Order_By>;
  streamCliffPercentage?: InputMaybe<Order_By>;
  streamInitialPercentage?: InputMaybe<Order_By>;
  streamStartTime?: InputMaybe<Order_By>;
  streamTotalDuration?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  totalRecipients?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Campaign". All fields are combined with a logical 'AND'. */
export type Campaign_Bool_Exp = {
  _and?: InputMaybe<Array<Campaign_Bool_Exp>>;
  _not?: InputMaybe<Campaign_Bool_Exp>;
  _or?: InputMaybe<Array<Campaign_Bool_Exp>>;
  actions?: InputMaybe<Action_Bool_Exp>;
  activities?: InputMaybe<Activity_Bool_Exp>;
  address?: InputMaybe<String_Comparison_Exp>;
  admin?: InputMaybe<String_Comparison_Exp>;
  aggregateAmount?: InputMaybe<Numeric_Comparison_Exp>;
  asset?: InputMaybe<Asset_Bool_Exp>;
  asset_id?: InputMaybe<String_Comparison_Exp>;
  category?: InputMaybe<Campaigncategory_Comparison_Exp>;
  chainId?: InputMaybe<Numeric_Comparison_Exp>;
  claimedAmount?: InputMaybe<Numeric_Comparison_Exp>;
  claimedCount?: InputMaybe<Numeric_Comparison_Exp>;
  clawbackAction?: InputMaybe<Action_Bool_Exp>;
  clawbackAction_id?: InputMaybe<String_Comparison_Exp>;
  clawbackTime?: InputMaybe<Numeric_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  expiration?: InputMaybe<Numeric_Comparison_Exp>;
  expires?: InputMaybe<Boolean_Comparison_Exp>;
  factory?: InputMaybe<Factory_Bool_Exp>;
  factory_id?: InputMaybe<String_Comparison_Exp>;
  fee?: InputMaybe<Numeric_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  ipfsCID?: InputMaybe<String_Comparison_Exp>;
  lockup?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  nickname?: InputMaybe<String_Comparison_Exp>;
  position?: InputMaybe<Numeric_Comparison_Exp>;
  root?: InputMaybe<String_Comparison_Exp>;
  streamCancelable?: InputMaybe<Boolean_Comparison_Exp>;
  streamCliff?: InputMaybe<Boolean_Comparison_Exp>;
  streamCliffDuration?: InputMaybe<Numeric_Comparison_Exp>;
  streamCliffPercentage?: InputMaybe<Numeric_Comparison_Exp>;
  streamInitial?: InputMaybe<Boolean_Comparison_Exp>;
  streamInitialPercentage?: InputMaybe<Numeric_Comparison_Exp>;
  streamShape?: InputMaybe<String_Comparison_Exp>;
  streamStart?: InputMaybe<Boolean_Comparison_Exp>;
  streamStartTime?: InputMaybe<Numeric_Comparison_Exp>;
  streamTotalDuration?: InputMaybe<Numeric_Comparison_Exp>;
  streamTranches?: InputMaybe<Tranche_Bool_Exp>;
  streamTransferable?: InputMaybe<Boolean_Comparison_Exp>;
  subgraphId?: InputMaybe<Numeric_Comparison_Exp>;
  timestamp?: InputMaybe<Numeric_Comparison_Exp>;
  totalRecipients?: InputMaybe<Numeric_Comparison_Exp>;
  version?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "Campaign" */
export type Campaign_Max_Order_By = {
  address?: InputMaybe<Order_By>;
  admin?: InputMaybe<Order_By>;
  aggregateAmount?: InputMaybe<Order_By>;
  asset_id?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimedAmount?: InputMaybe<Order_By>;
  claimedCount?: InputMaybe<Order_By>;
  clawbackAction_id?: InputMaybe<Order_By>;
  clawbackTime?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  expiration?: InputMaybe<Order_By>;
  factory_id?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ipfsCID?: InputMaybe<Order_By>;
  lockup?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nickname?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  root?: InputMaybe<Order_By>;
  streamCliffDuration?: InputMaybe<Order_By>;
  streamCliffPercentage?: InputMaybe<Order_By>;
  streamInitialPercentage?: InputMaybe<Order_By>;
  streamShape?: InputMaybe<Order_By>;
  streamStartTime?: InputMaybe<Order_By>;
  streamTotalDuration?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  totalRecipients?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "Campaign" */
export type Campaign_Min_Order_By = {
  address?: InputMaybe<Order_By>;
  admin?: InputMaybe<Order_By>;
  aggregateAmount?: InputMaybe<Order_By>;
  asset_id?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimedAmount?: InputMaybe<Order_By>;
  claimedCount?: InputMaybe<Order_By>;
  clawbackAction_id?: InputMaybe<Order_By>;
  clawbackTime?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  expiration?: InputMaybe<Order_By>;
  factory_id?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ipfsCID?: InputMaybe<Order_By>;
  lockup?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nickname?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  root?: InputMaybe<Order_By>;
  streamCliffDuration?: InputMaybe<Order_By>;
  streamCliffPercentage?: InputMaybe<Order_By>;
  streamInitialPercentage?: InputMaybe<Order_By>;
  streamShape?: InputMaybe<Order_By>;
  streamStartTime?: InputMaybe<Order_By>;
  streamTotalDuration?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  totalRecipients?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "Campaign". */
export type Campaign_Order_By = {
  actions_aggregate?: InputMaybe<Action_Aggregate_Order_By>;
  activities_aggregate?: InputMaybe<Activity_Aggregate_Order_By>;
  address?: InputMaybe<Order_By>;
  admin?: InputMaybe<Order_By>;
  aggregateAmount?: InputMaybe<Order_By>;
  asset?: InputMaybe<Asset_Order_By>;
  asset_id?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimedAmount?: InputMaybe<Order_By>;
  claimedCount?: InputMaybe<Order_By>;
  clawbackAction?: InputMaybe<Action_Order_By>;
  clawbackAction_id?: InputMaybe<Order_By>;
  clawbackTime?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  expiration?: InputMaybe<Order_By>;
  expires?: InputMaybe<Order_By>;
  factory?: InputMaybe<Factory_Order_By>;
  factory_id?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ipfsCID?: InputMaybe<Order_By>;
  lockup?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nickname?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  root?: InputMaybe<Order_By>;
  streamCancelable?: InputMaybe<Order_By>;
  streamCliff?: InputMaybe<Order_By>;
  streamCliffDuration?: InputMaybe<Order_By>;
  streamCliffPercentage?: InputMaybe<Order_By>;
  streamInitial?: InputMaybe<Order_By>;
  streamInitialPercentage?: InputMaybe<Order_By>;
  streamShape?: InputMaybe<Order_By>;
  streamStart?: InputMaybe<Order_By>;
  streamStartTime?: InputMaybe<Order_By>;
  streamTotalDuration?: InputMaybe<Order_By>;
  streamTranches_aggregate?: InputMaybe<Tranche_Aggregate_Order_By>;
  streamTransferable?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  totalRecipients?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** select columns of table "Campaign" */
export enum Campaign_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Admin = 'admin',
  /** column name */
  AggregateAmount = 'aggregateAmount',
  /** column name */
  AssetId = 'asset_id',
  /** column name */
  Category = 'category',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  ClaimedAmount = 'claimedAmount',
  /** column name */
  ClaimedCount = 'claimedCount',
  /** column name */
  ClawbackActionId = 'clawbackAction_id',
  /** column name */
  ClawbackTime = 'clawbackTime',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Expiration = 'expiration',
  /** column name */
  Expires = 'expires',
  /** column name */
  FactoryId = 'factory_id',
  /** column name */
  Fee = 'fee',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  IpfsCid = 'ipfsCID',
  /** column name */
  Lockup = 'lockup',
  /** column name */
  Name = 'name',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  Position = 'position',
  /** column name */
  Root = 'root',
  /** column name */
  StreamCancelable = 'streamCancelable',
  /** column name */
  StreamCliff = 'streamCliff',
  /** column name */
  StreamCliffDuration = 'streamCliffDuration',
  /** column name */
  StreamCliffPercentage = 'streamCliffPercentage',
  /** column name */
  StreamInitial = 'streamInitial',
  /** column name */
  StreamInitialPercentage = 'streamInitialPercentage',
  /** column name */
  StreamShape = 'streamShape',
  /** column name */
  StreamStart = 'streamStart',
  /** column name */
  StreamStartTime = 'streamStartTime',
  /** column name */
  StreamTotalDuration = 'streamTotalDuration',
  /** column name */
  StreamTransferable = 'streamTransferable',
  /** column name */
  SubgraphId = 'subgraphId',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TotalRecipients = 'totalRecipients',
  /** column name */
  Version = 'version'
}

/** order by stddev() on columns of table "Campaign" */
export type Campaign_Stddev_Order_By = {
  aggregateAmount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimedAmount?: InputMaybe<Order_By>;
  claimedCount?: InputMaybe<Order_By>;
  clawbackTime?: InputMaybe<Order_By>;
  expiration?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  streamCliffDuration?: InputMaybe<Order_By>;
  streamCliffPercentage?: InputMaybe<Order_By>;
  streamInitialPercentage?: InputMaybe<Order_By>;
  streamStartTime?: InputMaybe<Order_By>;
  streamTotalDuration?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  totalRecipients?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "Campaign" */
export type Campaign_Stddev_Pop_Order_By = {
  aggregateAmount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimedAmount?: InputMaybe<Order_By>;
  claimedCount?: InputMaybe<Order_By>;
  clawbackTime?: InputMaybe<Order_By>;
  expiration?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  streamCliffDuration?: InputMaybe<Order_By>;
  streamCliffPercentage?: InputMaybe<Order_By>;
  streamInitialPercentage?: InputMaybe<Order_By>;
  streamStartTime?: InputMaybe<Order_By>;
  streamTotalDuration?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  totalRecipients?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "Campaign" */
export type Campaign_Stddev_Samp_Order_By = {
  aggregateAmount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimedAmount?: InputMaybe<Order_By>;
  claimedCount?: InputMaybe<Order_By>;
  clawbackTime?: InputMaybe<Order_By>;
  expiration?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  streamCliffDuration?: InputMaybe<Order_By>;
  streamCliffPercentage?: InputMaybe<Order_By>;
  streamInitialPercentage?: InputMaybe<Order_By>;
  streamStartTime?: InputMaybe<Order_By>;
  streamTotalDuration?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  totalRecipients?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "Campaign" */
export type Campaign_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Campaign_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Campaign_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  admin?: InputMaybe<Scalars['String']['input']>;
  aggregateAmount?: InputMaybe<Scalars['numeric']['input']>;
  asset_id?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['campaigncategory']['input']>;
  chainId?: InputMaybe<Scalars['numeric']['input']>;
  claimedAmount?: InputMaybe<Scalars['numeric']['input']>;
  claimedCount?: InputMaybe<Scalars['numeric']['input']>;
  clawbackAction_id?: InputMaybe<Scalars['String']['input']>;
  clawbackTime?: InputMaybe<Scalars['numeric']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  expiration?: InputMaybe<Scalars['numeric']['input']>;
  expires?: InputMaybe<Scalars['Boolean']['input']>;
  factory_id?: InputMaybe<Scalars['String']['input']>;
  fee?: InputMaybe<Scalars['numeric']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  ipfsCID?: InputMaybe<Scalars['String']['input']>;
  lockup?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['numeric']['input']>;
  root?: InputMaybe<Scalars['String']['input']>;
  streamCancelable?: InputMaybe<Scalars['Boolean']['input']>;
  streamCliff?: InputMaybe<Scalars['Boolean']['input']>;
  streamCliffDuration?: InputMaybe<Scalars['numeric']['input']>;
  streamCliffPercentage?: InputMaybe<Scalars['numeric']['input']>;
  streamInitial?: InputMaybe<Scalars['Boolean']['input']>;
  streamInitialPercentage?: InputMaybe<Scalars['numeric']['input']>;
  streamShape?: InputMaybe<Scalars['String']['input']>;
  streamStart?: InputMaybe<Scalars['Boolean']['input']>;
  streamStartTime?: InputMaybe<Scalars['numeric']['input']>;
  streamTotalDuration?: InputMaybe<Scalars['numeric']['input']>;
  streamTransferable?: InputMaybe<Scalars['Boolean']['input']>;
  subgraphId?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
  totalRecipients?: InputMaybe<Scalars['numeric']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "Campaign" */
export type Campaign_Sum_Order_By = {
  aggregateAmount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimedAmount?: InputMaybe<Order_By>;
  claimedCount?: InputMaybe<Order_By>;
  clawbackTime?: InputMaybe<Order_By>;
  expiration?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  streamCliffDuration?: InputMaybe<Order_By>;
  streamCliffPercentage?: InputMaybe<Order_By>;
  streamInitialPercentage?: InputMaybe<Order_By>;
  streamStartTime?: InputMaybe<Order_By>;
  streamTotalDuration?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  totalRecipients?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "Campaign" */
export type Campaign_Var_Pop_Order_By = {
  aggregateAmount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimedAmount?: InputMaybe<Order_By>;
  claimedCount?: InputMaybe<Order_By>;
  clawbackTime?: InputMaybe<Order_By>;
  expiration?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  streamCliffDuration?: InputMaybe<Order_By>;
  streamCliffPercentage?: InputMaybe<Order_By>;
  streamInitialPercentage?: InputMaybe<Order_By>;
  streamStartTime?: InputMaybe<Order_By>;
  streamTotalDuration?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  totalRecipients?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "Campaign" */
export type Campaign_Var_Samp_Order_By = {
  aggregateAmount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimedAmount?: InputMaybe<Order_By>;
  claimedCount?: InputMaybe<Order_By>;
  clawbackTime?: InputMaybe<Order_By>;
  expiration?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  streamCliffDuration?: InputMaybe<Order_By>;
  streamCliffPercentage?: InputMaybe<Order_By>;
  streamInitialPercentage?: InputMaybe<Order_By>;
  streamStartTime?: InputMaybe<Order_By>;
  streamTotalDuration?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  totalRecipients?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "Campaign" */
export type Campaign_Variance_Order_By = {
  aggregateAmount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  claimedAmount?: InputMaybe<Order_By>;
  claimedCount?: InputMaybe<Order_By>;
  clawbackTime?: InputMaybe<Order_By>;
  expiration?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  streamCliffDuration?: InputMaybe<Order_By>;
  streamCliffPercentage?: InputMaybe<Order_By>;
  streamInitialPercentage?: InputMaybe<Order_By>;
  streamStartTime?: InputMaybe<Order_By>;
  streamTotalDuration?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  totalRecipients?: InputMaybe<Order_By>;
};

/** columns and relationships of "Factory" */
export type Factory = {
  __typename?: 'Factory';
  address: Scalars['String']['output'];
  alias: Scalars['String']['output'];
  campaignCounter: Scalars['numeric']['output'];
  /** An array relationship */
  campaigns: Array<Campaign>;
  chainId: Scalars['numeric']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
};


/** columns and relationships of "Factory" */
export type FactoryCampaignsArgs = {
  distinct_on?: InputMaybe<Array<Campaign_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Campaign_Order_By>>;
  where?: InputMaybe<Campaign_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "Factory". All fields are combined with a logical 'AND'. */
export type Factory_Bool_Exp = {
  _and?: InputMaybe<Array<Factory_Bool_Exp>>;
  _not?: InputMaybe<Factory_Bool_Exp>;
  _or?: InputMaybe<Array<Factory_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  alias?: InputMaybe<String_Comparison_Exp>;
  campaignCounter?: InputMaybe<Numeric_Comparison_Exp>;
  campaigns?: InputMaybe<Campaign_Bool_Exp>;
  chainId?: InputMaybe<Numeric_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Factory". */
export type Factory_Order_By = {
  address?: InputMaybe<Order_By>;
  alias?: InputMaybe<Order_By>;
  campaignCounter?: InputMaybe<Order_By>;
  campaigns_aggregate?: InputMaybe<Campaign_Aggregate_Order_By>;
  chainId?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** select columns of table "Factory" */
export enum Factory_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Alias = 'alias',
  /** column name */
  CampaignCounter = 'campaignCounter',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id'
}

/** Streaming cursor of the table "Factory" */
export type Factory_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Factory_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Factory_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  alias?: InputMaybe<Scalars['String']['input']>;
  campaignCounter?: InputMaybe<Scalars['numeric']['input']>;
  chainId?: InputMaybe<Scalars['numeric']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** columns and relationships of "Revenue" */
export type Revenue = {
  __typename?: 'Revenue';
  amount: Scalars['float8']['output'];
  chainId: Scalars['numeric']['output'];
  currency: Scalars['String']['output'];
  date: Scalars['String']['output'];
  dateTimestamp: Scalars['timestamptz']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
  /** An array relationship */
  transactions: Array<RevenueTransaction>;
};


/** columns and relationships of "Revenue" */
export type RevenueTransactionsArgs = {
  distinct_on?: InputMaybe<Array<RevenueTransaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RevenueTransaction_Order_By>>;
  where?: InputMaybe<RevenueTransaction_Bool_Exp>;
};

/** columns and relationships of "RevenueTransaction" */
export type RevenueTransaction = {
  __typename?: 'RevenueTransaction';
  amount: Scalars['float8']['output'];
  block: Scalars['numeric']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  /** An object relationship */
  revenue?: Maybe<Revenue>;
  revenue_id: Scalars['String']['output'];
  timestamp: Scalars['numeric']['output'];
};

/** order by aggregate values of table "RevenueTransaction" */
export type RevenueTransaction_Aggregate_Order_By = {
  avg?: InputMaybe<RevenueTransaction_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<RevenueTransaction_Max_Order_By>;
  min?: InputMaybe<RevenueTransaction_Min_Order_By>;
  stddev?: InputMaybe<RevenueTransaction_Stddev_Order_By>;
  stddev_pop?: InputMaybe<RevenueTransaction_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<RevenueTransaction_Stddev_Samp_Order_By>;
  sum?: InputMaybe<RevenueTransaction_Sum_Order_By>;
  var_pop?: InputMaybe<RevenueTransaction_Var_Pop_Order_By>;
  var_samp?: InputMaybe<RevenueTransaction_Var_Samp_Order_By>;
  variance?: InputMaybe<RevenueTransaction_Variance_Order_By>;
};

/** order by avg() on columns of table "RevenueTransaction" */
export type RevenueTransaction_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "RevenueTransaction". All fields are combined with a logical 'AND'. */
export type RevenueTransaction_Bool_Exp = {
  _and?: InputMaybe<Array<RevenueTransaction_Bool_Exp>>;
  _not?: InputMaybe<RevenueTransaction_Bool_Exp>;
  _or?: InputMaybe<Array<RevenueTransaction_Bool_Exp>>;
  amount?: InputMaybe<Float8_Comparison_Exp>;
  block?: InputMaybe<Numeric_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  revenue?: InputMaybe<Revenue_Bool_Exp>;
  revenue_id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Numeric_Comparison_Exp>;
};

/** order by max() on columns of table "RevenueTransaction" */
export type RevenueTransaction_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  revenue_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "RevenueTransaction" */
export type RevenueTransaction_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  revenue_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "RevenueTransaction". */
export type RevenueTransaction_Order_By = {
  amount?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  revenue?: InputMaybe<Revenue_Order_By>;
  revenue_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "RevenueTransaction" */
export enum RevenueTransaction_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  Block = 'block',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  RevenueId = 'revenue_id',
  /** column name */
  Timestamp = 'timestamp'
}

/** order by stddev() on columns of table "RevenueTransaction" */
export type RevenueTransaction_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "RevenueTransaction" */
export type RevenueTransaction_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "RevenueTransaction" */
export type RevenueTransaction_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "RevenueTransaction" */
export type RevenueTransaction_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: RevenueTransaction_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type RevenueTransaction_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['float8']['input']>;
  block?: InputMaybe<Scalars['numeric']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  revenue_id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
};

/** order by sum() on columns of table "RevenueTransaction" */
export type RevenueTransaction_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "RevenueTransaction" */
export type RevenueTransaction_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "RevenueTransaction" */
export type RevenueTransaction_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "RevenueTransaction" */
export type RevenueTransaction_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Revenue". All fields are combined with a logical 'AND'. */
export type Revenue_Bool_Exp = {
  _and?: InputMaybe<Array<Revenue_Bool_Exp>>;
  _not?: InputMaybe<Revenue_Bool_Exp>;
  _or?: InputMaybe<Array<Revenue_Bool_Exp>>;
  amount?: InputMaybe<Float8_Comparison_Exp>;
  chainId?: InputMaybe<Numeric_Comparison_Exp>;
  currency?: InputMaybe<String_Comparison_Exp>;
  date?: InputMaybe<String_Comparison_Exp>;
  dateTimestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  transactions?: InputMaybe<RevenueTransaction_Bool_Exp>;
};

/** Ordering options when selecting data from "Revenue". */
export type Revenue_Order_By = {
  amount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  currency?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  dateTimestamp?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  transactions_aggregate?: InputMaybe<RevenueTransaction_Aggregate_Order_By>;
};

/** select columns of table "Revenue" */
export enum Revenue_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  Currency = 'currency',
  /** column name */
  Date = 'date',
  /** column name */
  DateTimestamp = 'dateTimestamp',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id'
}

/** Streaming cursor of the table "Revenue" */
export type Revenue_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Revenue_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Revenue_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['float8']['input']>;
  chainId?: InputMaybe<Scalars['numeric']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  dateTimestamp?: InputMaybe<Scalars['timestamptz']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "Tranche" */
export type Tranche = {
  __typename?: 'Tranche';
  /** An object relationship */
  campaign?: Maybe<Campaign>;
  campaign_id: Scalars['String']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  duration: Scalars['numeric']['output'];
  endDuration: Scalars['numeric']['output'];
  endPercentage: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  percentage: Scalars['numeric']['output'];
  position: Scalars['numeric']['output'];
  startDuration: Scalars['numeric']['output'];
  startPercentage: Scalars['numeric']['output'];
};

/** order by aggregate values of table "Tranche" */
export type Tranche_Aggregate_Order_By = {
  avg?: InputMaybe<Tranche_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Tranche_Max_Order_By>;
  min?: InputMaybe<Tranche_Min_Order_By>;
  stddev?: InputMaybe<Tranche_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Tranche_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Tranche_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Tranche_Sum_Order_By>;
  var_pop?: InputMaybe<Tranche_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Tranche_Var_Samp_Order_By>;
  variance?: InputMaybe<Tranche_Variance_Order_By>;
};

/** order by avg() on columns of table "Tranche" */
export type Tranche_Avg_Order_By = {
  duration?: InputMaybe<Order_By>;
  endDuration?: InputMaybe<Order_By>;
  endPercentage?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startDuration?: InputMaybe<Order_By>;
  startPercentage?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Tranche". All fields are combined with a logical 'AND'. */
export type Tranche_Bool_Exp = {
  _and?: InputMaybe<Array<Tranche_Bool_Exp>>;
  _not?: InputMaybe<Tranche_Bool_Exp>;
  _or?: InputMaybe<Array<Tranche_Bool_Exp>>;
  campaign?: InputMaybe<Campaign_Bool_Exp>;
  campaign_id?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  duration?: InputMaybe<Numeric_Comparison_Exp>;
  endDuration?: InputMaybe<Numeric_Comparison_Exp>;
  endPercentage?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  percentage?: InputMaybe<Numeric_Comparison_Exp>;
  position?: InputMaybe<Numeric_Comparison_Exp>;
  startDuration?: InputMaybe<Numeric_Comparison_Exp>;
  startPercentage?: InputMaybe<Numeric_Comparison_Exp>;
};

/** order by max() on columns of table "Tranche" */
export type Tranche_Max_Order_By = {
  campaign_id?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  endDuration?: InputMaybe<Order_By>;
  endPercentage?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startDuration?: InputMaybe<Order_By>;
  startPercentage?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "Tranche" */
export type Tranche_Min_Order_By = {
  campaign_id?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  endDuration?: InputMaybe<Order_By>;
  endPercentage?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startDuration?: InputMaybe<Order_By>;
  startPercentage?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "Tranche". */
export type Tranche_Order_By = {
  campaign?: InputMaybe<Campaign_Order_By>;
  campaign_id?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  endDuration?: InputMaybe<Order_By>;
  endPercentage?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startDuration?: InputMaybe<Order_By>;
  startPercentage?: InputMaybe<Order_By>;
};

/** select columns of table "Tranche" */
export enum Tranche_Select_Column {
  /** column name */
  CampaignId = 'campaign_id',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Duration = 'duration',
  /** column name */
  EndDuration = 'endDuration',
  /** column name */
  EndPercentage = 'endPercentage',
  /** column name */
  Id = 'id',
  /** column name */
  Percentage = 'percentage',
  /** column name */
  Position = 'position',
  /** column name */
  StartDuration = 'startDuration',
  /** column name */
  StartPercentage = 'startPercentage'
}

/** order by stddev() on columns of table "Tranche" */
export type Tranche_Stddev_Order_By = {
  duration?: InputMaybe<Order_By>;
  endDuration?: InputMaybe<Order_By>;
  endPercentage?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startDuration?: InputMaybe<Order_By>;
  startPercentage?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "Tranche" */
export type Tranche_Stddev_Pop_Order_By = {
  duration?: InputMaybe<Order_By>;
  endDuration?: InputMaybe<Order_By>;
  endPercentage?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startDuration?: InputMaybe<Order_By>;
  startPercentage?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "Tranche" */
export type Tranche_Stddev_Samp_Order_By = {
  duration?: InputMaybe<Order_By>;
  endDuration?: InputMaybe<Order_By>;
  endPercentage?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startDuration?: InputMaybe<Order_By>;
  startPercentage?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "Tranche" */
export type Tranche_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tranche_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Tranche_Stream_Cursor_Value_Input = {
  campaign_id?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  duration?: InputMaybe<Scalars['numeric']['input']>;
  endDuration?: InputMaybe<Scalars['numeric']['input']>;
  endPercentage?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  percentage?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['numeric']['input']>;
  startDuration?: InputMaybe<Scalars['numeric']['input']>;
  startPercentage?: InputMaybe<Scalars['numeric']['input']>;
};

/** order by sum() on columns of table "Tranche" */
export type Tranche_Sum_Order_By = {
  duration?: InputMaybe<Order_By>;
  endDuration?: InputMaybe<Order_By>;
  endPercentage?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startDuration?: InputMaybe<Order_By>;
  startPercentage?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "Tranche" */
export type Tranche_Var_Pop_Order_By = {
  duration?: InputMaybe<Order_By>;
  endDuration?: InputMaybe<Order_By>;
  endPercentage?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startDuration?: InputMaybe<Order_By>;
  startPercentage?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "Tranche" */
export type Tranche_Var_Samp_Order_By = {
  duration?: InputMaybe<Order_By>;
  endDuration?: InputMaybe<Order_By>;
  endPercentage?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startDuration?: InputMaybe<Order_By>;
  startPercentage?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "Tranche" */
export type Tranche_Variance_Order_By = {
  duration?: InputMaybe<Order_By>;
  endDuration?: InputMaybe<Order_By>;
  endPercentage?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startDuration?: InputMaybe<Order_By>;
  startPercentage?: InputMaybe<Order_By>;
};

/** columns and relationships of "User" */
export type User = {
  __typename?: 'User';
  address: Scalars['String']['output'];
  chainId: Scalars['numeric']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
  isOnlyAirdropClaimer: Scalars['Boolean']['output'];
  /** An array relationship */
  transactions: Array<UserTransaction>;
};


/** columns and relationships of "User" */
export type UserTransactionsArgs = {
  distinct_on?: InputMaybe<Array<UserTransaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UserTransaction_Order_By>>;
  where?: InputMaybe<UserTransaction_Bool_Exp>;
};

/** columns and relationships of "UserTransaction" */
export type UserTransaction = {
  __typename?: 'UserTransaction';
  block: Scalars['numeric']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  fee: Scalars['float8']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isAirdropClaim: Scalars['Boolean']['output'];
  timestamp: Scalars['numeric']['output'];
  /** An object relationship */
  user?: Maybe<User>;
  user_id: Scalars['String']['output'];
};

/** order by aggregate values of table "UserTransaction" */
export type UserTransaction_Aggregate_Order_By = {
  avg?: InputMaybe<UserTransaction_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<UserTransaction_Max_Order_By>;
  min?: InputMaybe<UserTransaction_Min_Order_By>;
  stddev?: InputMaybe<UserTransaction_Stddev_Order_By>;
  stddev_pop?: InputMaybe<UserTransaction_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<UserTransaction_Stddev_Samp_Order_By>;
  sum?: InputMaybe<UserTransaction_Sum_Order_By>;
  var_pop?: InputMaybe<UserTransaction_Var_Pop_Order_By>;
  var_samp?: InputMaybe<UserTransaction_Var_Samp_Order_By>;
  variance?: InputMaybe<UserTransaction_Variance_Order_By>;
};

/** order by avg() on columns of table "UserTransaction" */
export type UserTransaction_Avg_Order_By = {
  block?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "UserTransaction". All fields are combined with a logical 'AND'. */
export type UserTransaction_Bool_Exp = {
  _and?: InputMaybe<Array<UserTransaction_Bool_Exp>>;
  _not?: InputMaybe<UserTransaction_Bool_Exp>;
  _or?: InputMaybe<Array<UserTransaction_Bool_Exp>>;
  block?: InputMaybe<Numeric_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  fee?: InputMaybe<Float8_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  isAirdropClaim?: InputMaybe<Boolean_Comparison_Exp>;
  timestamp?: InputMaybe<Numeric_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "UserTransaction" */
export type UserTransaction_Max_Order_By = {
  block?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "UserTransaction" */
export type UserTransaction_Min_Order_By = {
  block?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "UserTransaction". */
export type UserTransaction_Order_By = {
  block?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isAirdropClaim?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** select columns of table "UserTransaction" */
export enum UserTransaction_Select_Column {
  /** column name */
  Block = 'block',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Fee = 'fee',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  IsAirdropClaim = 'isAirdropClaim',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  UserId = 'user_id'
}

/** order by stddev() on columns of table "UserTransaction" */
export type UserTransaction_Stddev_Order_By = {
  block?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "UserTransaction" */
export type UserTransaction_Stddev_Pop_Order_By = {
  block?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "UserTransaction" */
export type UserTransaction_Stddev_Samp_Order_By = {
  block?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "UserTransaction" */
export type UserTransaction_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: UserTransaction_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type UserTransaction_Stream_Cursor_Value_Input = {
  block?: InputMaybe<Scalars['numeric']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  fee?: InputMaybe<Scalars['float8']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isAirdropClaim?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "UserTransaction" */
export type UserTransaction_Sum_Order_By = {
  block?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "UserTransaction" */
export type UserTransaction_Var_Pop_Order_By = {
  block?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "UserTransaction" */
export type UserTransaction_Var_Samp_Order_By = {
  block?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "UserTransaction" */
export type UserTransaction_Variance_Order_By = {
  block?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregated selection of "User" */
export type User_Aggregate = {
  __typename?: 'User_aggregate';
  aggregate?: Maybe<User_Aggregate_Fields>;
  nodes: Array<User>;
};

/** aggregate fields of "User" */
export type User_Aggregate_Fields = {
  __typename?: 'User_aggregate_fields';
  avg?: Maybe<User_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
  stddev?: Maybe<User_Stddev_Fields>;
  stddev_pop?: Maybe<User_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Stddev_Samp_Fields>;
  sum?: Maybe<User_Sum_Fields>;
  var_pop?: Maybe<User_Var_Pop_Fields>;
  var_samp?: Maybe<User_Var_Samp_Fields>;
  variance?: Maybe<User_Variance_Fields>;
};


/** aggregate fields of "User" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type User_Avg_Fields = {
  __typename?: 'User_avg_fields';
  chainId?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "User". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: InputMaybe<Array<User_Bool_Exp>>;
  _not?: InputMaybe<User_Bool_Exp>;
  _or?: InputMaybe<Array<User_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  chainId?: InputMaybe<Numeric_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  isOnlyAirdropClaimer?: InputMaybe<Boolean_Comparison_Exp>;
  transactions?: InputMaybe<UserTransaction_Bool_Exp>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'User_max_fields';
  address?: Maybe<Scalars['String']['output']>;
  chainId?: Maybe<Scalars['numeric']['output']>;
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'User_min_fields';
  address?: Maybe<Scalars['String']['output']>;
  chainId?: Maybe<Scalars['numeric']['output']>;
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "User". */
export type User_Order_By = {
  address?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isOnlyAirdropClaimer?: InputMaybe<Order_By>;
  transactions_aggregate?: InputMaybe<UserTransaction_Aggregate_Order_By>;
};

/** select columns of table "User" */
export enum User_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id',
  /** column name */
  IsOnlyAirdropClaimer = 'isOnlyAirdropClaimer'
}

/** aggregate stddev on columns */
export type User_Stddev_Fields = {
  __typename?: 'User_stddev_fields';
  chainId?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type User_Stddev_Pop_Fields = {
  __typename?: 'User_stddev_pop_fields';
  chainId?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type User_Stddev_Samp_Fields = {
  __typename?: 'User_stddev_samp_fields';
  chainId?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "User" */
export type User_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  chainId?: InputMaybe<Scalars['numeric']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isOnlyAirdropClaimer?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate sum on columns */
export type User_Sum_Fields = {
  __typename?: 'User_sum_fields';
  chainId?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type User_Var_Pop_Fields = {
  __typename?: 'User_var_pop_fields';
  chainId?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type User_Var_Samp_Fields = {
  __typename?: 'User_var_samp_fields';
  chainId?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type User_Variance_Fields = {
  __typename?: 'User_variance_fields';
  chainId?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "Watcher" */
export type Watcher = {
  __typename?: 'Watcher';
  actionCounter: Scalars['numeric']['output'];
  campaignCounter: Scalars['numeric']['output'];
  chainId: Scalars['numeric']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "Watcher". All fields are combined with a logical 'AND'. */
export type Watcher_Bool_Exp = {
  _and?: InputMaybe<Array<Watcher_Bool_Exp>>;
  _not?: InputMaybe<Watcher_Bool_Exp>;
  _or?: InputMaybe<Array<Watcher_Bool_Exp>>;
  actionCounter?: InputMaybe<Numeric_Comparison_Exp>;
  campaignCounter?: InputMaybe<Numeric_Comparison_Exp>;
  chainId?: InputMaybe<Numeric_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Watcher". */
export type Watcher_Order_By = {
  actionCounter?: InputMaybe<Order_By>;
  campaignCounter?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** select columns of table "Watcher" */
export enum Watcher_Select_Column {
  /** column name */
  ActionCounter = 'actionCounter',
  /** column name */
  CampaignCounter = 'campaignCounter',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id'
}

/** Streaming cursor of the table "Watcher" */
export type Watcher_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Watcher_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Watcher_Stream_Cursor_Value_Input = {
  actionCounter?: InputMaybe<Scalars['numeric']['input']>;
  campaignCounter?: InputMaybe<Scalars['numeric']['input']>;
  chainId?: InputMaybe<Scalars['numeric']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "actioncategory". All fields are combined with logical 'AND'. */
export type Actioncategory_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['actioncategory']['input']>;
  _gt?: InputMaybe<Scalars['actioncategory']['input']>;
  _gte?: InputMaybe<Scalars['actioncategory']['input']>;
  _in?: InputMaybe<Array<Scalars['actioncategory']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['actioncategory']['input']>;
  _lte?: InputMaybe<Scalars['actioncategory']['input']>;
  _neq?: InputMaybe<Scalars['actioncategory']['input']>;
  _nin?: InputMaybe<Array<Scalars['actioncategory']['input']>>;
};

/** Boolean expression to compare columns of type "campaigncategory". All fields are combined with logical 'AND'. */
export type Campaigncategory_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['campaigncategory']['input']>;
  _gt?: InputMaybe<Scalars['campaigncategory']['input']>;
  _gte?: InputMaybe<Scalars['campaigncategory']['input']>;
  _in?: InputMaybe<Array<Scalars['campaigncategory']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['campaigncategory']['input']>;
  _lte?: InputMaybe<Scalars['campaigncategory']['input']>;
  _neq?: InputMaybe<Scalars['campaigncategory']['input']>;
  _nin?: InputMaybe<Array<Scalars['campaigncategory']['input']>>;
};

/** columns and relationships of "chain_metadata" */
export type Chain_Metadata = {
  __typename?: 'chain_metadata';
  block_height: Scalars['Int']['output'];
  chain_id: Scalars['Int']['output'];
  end_block?: Maybe<Scalars['Int']['output']>;
  first_event_block_number?: Maybe<Scalars['Int']['output']>;
  is_hyper_sync: Scalars['Boolean']['output'];
  latest_fetched_block_number: Scalars['Int']['output'];
  latest_processed_block?: Maybe<Scalars['Int']['output']>;
  num_batches_fetched: Scalars['Int']['output'];
  num_events_processed?: Maybe<Scalars['Int']['output']>;
  start_block: Scalars['Int']['output'];
  timestamp_caught_up_to_head_or_endblock?: Maybe<Scalars['timestamptz']['output']>;
};

/** Boolean expression to filter rows from the table "chain_metadata". All fields are combined with a logical 'AND'. */
export type Chain_Metadata_Bool_Exp = {
  _and?: InputMaybe<Array<Chain_Metadata_Bool_Exp>>;
  _not?: InputMaybe<Chain_Metadata_Bool_Exp>;
  _or?: InputMaybe<Array<Chain_Metadata_Bool_Exp>>;
  block_height?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  end_block?: InputMaybe<Int_Comparison_Exp>;
  first_event_block_number?: InputMaybe<Int_Comparison_Exp>;
  is_hyper_sync?: InputMaybe<Boolean_Comparison_Exp>;
  latest_fetched_block_number?: InputMaybe<Int_Comparison_Exp>;
  latest_processed_block?: InputMaybe<Int_Comparison_Exp>;
  num_batches_fetched?: InputMaybe<Int_Comparison_Exp>;
  num_events_processed?: InputMaybe<Int_Comparison_Exp>;
  start_block?: InputMaybe<Int_Comparison_Exp>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** Ordering options when selecting data from "chain_metadata". */
export type Chain_Metadata_Order_By = {
  block_height?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  end_block?: InputMaybe<Order_By>;
  first_event_block_number?: InputMaybe<Order_By>;
  is_hyper_sync?: InputMaybe<Order_By>;
  latest_fetched_block_number?: InputMaybe<Order_By>;
  latest_processed_block?: InputMaybe<Order_By>;
  num_batches_fetched?: InputMaybe<Order_By>;
  num_events_processed?: InputMaybe<Order_By>;
  start_block?: InputMaybe<Order_By>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<Order_By>;
};

/** select columns of table "chain_metadata" */
export enum Chain_Metadata_Select_Column {
  /** column name */
  BlockHeight = 'block_height',
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  EndBlock = 'end_block',
  /** column name */
  FirstEventBlockNumber = 'first_event_block_number',
  /** column name */
  IsHyperSync = 'is_hyper_sync',
  /** column name */
  LatestFetchedBlockNumber = 'latest_fetched_block_number',
  /** column name */
  LatestProcessedBlock = 'latest_processed_block',
  /** column name */
  NumBatchesFetched = 'num_batches_fetched',
  /** column name */
  NumEventsProcessed = 'num_events_processed',
  /** column name */
  StartBlock = 'start_block',
  /** column name */
  TimestampCaughtUpToHeadOrEndblock = 'timestamp_caught_up_to_head_or_endblock'
}

/** Streaming cursor of the table "chain_metadata" */
export type Chain_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Chain_Metadata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Chain_Metadata_Stream_Cursor_Value_Input = {
  block_height?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  end_block?: InputMaybe<Scalars['Int']['input']>;
  first_event_block_number?: InputMaybe<Scalars['Int']['input']>;
  is_hyper_sync?: InputMaybe<Scalars['Boolean']['input']>;
  latest_fetched_block_number?: InputMaybe<Scalars['Int']['input']>;
  latest_processed_block?: InputMaybe<Scalars['Int']['input']>;
  num_batches_fetched?: InputMaybe<Scalars['Int']['input']>;
  num_events_processed?: InputMaybe<Scalars['Int']['input']>;
  start_block?: InputMaybe<Scalars['Int']['input']>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Boolean expression to compare columns of type "contract_type". All fields are combined with logical 'AND'. */
export type Contract_Type_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['contract_type']['input']>;
  _gt?: InputMaybe<Scalars['contract_type']['input']>;
  _gte?: InputMaybe<Scalars['contract_type']['input']>;
  _in?: InputMaybe<Array<Scalars['contract_type']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['contract_type']['input']>;
  _lte?: InputMaybe<Scalars['contract_type']['input']>;
  _neq?: InputMaybe<Scalars['contract_type']['input']>;
  _nin?: InputMaybe<Array<Scalars['contract_type']['input']>>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "dynamic_contract_registry" */
export type Dynamic_Contract_Registry = {
  __typename?: 'dynamic_contract_registry';
  chain_id: Scalars['Int']['output'];
  contract_address: Scalars['String']['output'];
  contract_type: Scalars['contract_type']['output'];
  id: Scalars['String']['output'];
  registering_event_block_number: Scalars['Int']['output'];
  registering_event_block_timestamp: Scalars['Int']['output'];
  registering_event_contract_name: Scalars['String']['output'];
  registering_event_log_index: Scalars['Int']['output'];
  registering_event_name: Scalars['String']['output'];
  registering_event_src_address: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "dynamic_contract_registry". All fields are combined with a logical 'AND'. */
export type Dynamic_Contract_Registry_Bool_Exp = {
  _and?: InputMaybe<Array<Dynamic_Contract_Registry_Bool_Exp>>;
  _not?: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
  _or?: InputMaybe<Array<Dynamic_Contract_Registry_Bool_Exp>>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  contract_address?: InputMaybe<String_Comparison_Exp>;
  contract_type?: InputMaybe<Contract_Type_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  registering_event_block_number?: InputMaybe<Int_Comparison_Exp>;
  registering_event_block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  registering_event_contract_name?: InputMaybe<String_Comparison_Exp>;
  registering_event_log_index?: InputMaybe<Int_Comparison_Exp>;
  registering_event_name?: InputMaybe<String_Comparison_Exp>;
  registering_event_src_address?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "dynamic_contract_registry". */
export type Dynamic_Contract_Registry_Order_By = {
  chain_id?: InputMaybe<Order_By>;
  contract_address?: InputMaybe<Order_By>;
  contract_type?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  registering_event_block_number?: InputMaybe<Order_By>;
  registering_event_block_timestamp?: InputMaybe<Order_By>;
  registering_event_contract_name?: InputMaybe<Order_By>;
  registering_event_log_index?: InputMaybe<Order_By>;
  registering_event_name?: InputMaybe<Order_By>;
  registering_event_src_address?: InputMaybe<Order_By>;
};

/** select columns of table "dynamic_contract_registry" */
export enum Dynamic_Contract_Registry_Select_Column {
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  ContractAddress = 'contract_address',
  /** column name */
  ContractType = 'contract_type',
  /** column name */
  Id = 'id',
  /** column name */
  RegisteringEventBlockNumber = 'registering_event_block_number',
  /** column name */
  RegisteringEventBlockTimestamp = 'registering_event_block_timestamp',
  /** column name */
  RegisteringEventContractName = 'registering_event_contract_name',
  /** column name */
  RegisteringEventLogIndex = 'registering_event_log_index',
  /** column name */
  RegisteringEventName = 'registering_event_name',
  /** column name */
  RegisteringEventSrcAddress = 'registering_event_src_address'
}

/** Streaming cursor of the table "dynamic_contract_registry" */
export type Dynamic_Contract_Registry_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dynamic_Contract_Registry_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Dynamic_Contract_Registry_Stream_Cursor_Value_Input = {
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  contract_address?: InputMaybe<Scalars['String']['input']>;
  contract_type?: InputMaybe<Scalars['contract_type']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  registering_event_block_number?: InputMaybe<Scalars['Int']['input']>;
  registering_event_block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  registering_event_contract_name?: InputMaybe<Scalars['String']['input']>;
  registering_event_log_index?: InputMaybe<Scalars['Int']['input']>;
  registering_event_name?: InputMaybe<Scalars['String']['input']>;
  registering_event_src_address?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "end_of_block_range_scanned_data" */
export type End_Of_Block_Range_Scanned_Data = {
  __typename?: 'end_of_block_range_scanned_data';
  block_hash: Scalars['String']['output'];
  block_number: Scalars['Int']['output'];
  chain_id: Scalars['Int']['output'];
};

/** Boolean expression to filter rows from the table "end_of_block_range_scanned_data". All fields are combined with a logical 'AND'. */
export type End_Of_Block_Range_Scanned_Data_Bool_Exp = {
  _and?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Bool_Exp>>;
  _not?: InputMaybe<End_Of_Block_Range_Scanned_Data_Bool_Exp>;
  _or?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Bool_Exp>>;
  block_hash?: InputMaybe<String_Comparison_Exp>;
  block_number?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "end_of_block_range_scanned_data". */
export type End_Of_Block_Range_Scanned_Data_Order_By = {
  block_hash?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
};

/** select columns of table "end_of_block_range_scanned_data" */
export enum End_Of_Block_Range_Scanned_Data_Select_Column {
  /** column name */
  BlockHash = 'block_hash',
  /** column name */
  BlockNumber = 'block_number',
  /** column name */
  ChainId = 'chain_id'
}

/** Streaming cursor of the table "end_of_block_range_scanned_data" */
export type End_Of_Block_Range_Scanned_Data_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: End_Of_Block_Range_Scanned_Data_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type End_Of_Block_Range_Scanned_Data_Stream_Cursor_Value_Input = {
  block_hash?: InputMaybe<Scalars['String']['input']>;
  block_number?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
};

/** columns and relationships of "event_sync_state" */
export type Event_Sync_State = {
  __typename?: 'event_sync_state';
  block_number: Scalars['Int']['output'];
  block_timestamp: Scalars['Int']['output'];
  chain_id: Scalars['Int']['output'];
  is_pre_registering_dynamic_contracts?: Maybe<Scalars['Boolean']['output']>;
  log_index: Scalars['Int']['output'];
};

/** Boolean expression to filter rows from the table "event_sync_state". All fields are combined with a logical 'AND'. */
export type Event_Sync_State_Bool_Exp = {
  _and?: InputMaybe<Array<Event_Sync_State_Bool_Exp>>;
  _not?: InputMaybe<Event_Sync_State_Bool_Exp>;
  _or?: InputMaybe<Array<Event_Sync_State_Bool_Exp>>;
  block_number?: InputMaybe<Int_Comparison_Exp>;
  block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  is_pre_registering_dynamic_contracts?: InputMaybe<Boolean_Comparison_Exp>;
  log_index?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "event_sync_state". */
export type Event_Sync_State_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  is_pre_registering_dynamic_contracts?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
};

/** select columns of table "event_sync_state" */
export enum Event_Sync_State_Select_Column {
  /** column name */
  BlockNumber = 'block_number',
  /** column name */
  BlockTimestamp = 'block_timestamp',
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  IsPreRegisteringDynamicContracts = 'is_pre_registering_dynamic_contracts',
  /** column name */
  LogIndex = 'log_index'
}

/** Streaming cursor of the table "event_sync_state" */
export type Event_Sync_State_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Event_Sync_State_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Event_Sync_State_Stream_Cursor_Value_Input = {
  block_number?: InputMaybe<Scalars['Int']['input']>;
  block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  is_pre_registering_dynamic_contracts?: InputMaybe<Scalars['Boolean']['input']>;
  log_index?: InputMaybe<Scalars['Int']['input']>;
};

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['float8']['input']>;
  _gt?: InputMaybe<Scalars['float8']['input']>;
  _gte?: InputMaybe<Scalars['float8']['input']>;
  _in?: InputMaybe<Array<Scalars['float8']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['float8']['input']>;
  _lte?: InputMaybe<Scalars['float8']['input']>;
  _neq?: InputMaybe<Scalars['float8']['input']>;
  _nin?: InputMaybe<Array<Scalars['float8']['input']>>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "persisted_state" */
export type Persisted_State = {
  __typename?: 'persisted_state';
  abi_files_hash: Scalars['String']['output'];
  config_hash: Scalars['String']['output'];
  envio_version: Scalars['String']['output'];
  handler_files_hash: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  schema_hash: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "persisted_state". All fields are combined with a logical 'AND'. */
export type Persisted_State_Bool_Exp = {
  _and?: InputMaybe<Array<Persisted_State_Bool_Exp>>;
  _not?: InputMaybe<Persisted_State_Bool_Exp>;
  _or?: InputMaybe<Array<Persisted_State_Bool_Exp>>;
  abi_files_hash?: InputMaybe<String_Comparison_Exp>;
  config_hash?: InputMaybe<String_Comparison_Exp>;
  envio_version?: InputMaybe<String_Comparison_Exp>;
  handler_files_hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  schema_hash?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "persisted_state". */
export type Persisted_State_Order_By = {
  abi_files_hash?: InputMaybe<Order_By>;
  config_hash?: InputMaybe<Order_By>;
  envio_version?: InputMaybe<Order_By>;
  handler_files_hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  schema_hash?: InputMaybe<Order_By>;
};

/** select columns of table "persisted_state" */
export enum Persisted_State_Select_Column {
  /** column name */
  AbiFilesHash = 'abi_files_hash',
  /** column name */
  ConfigHash = 'config_hash',
  /** column name */
  EnvioVersion = 'envio_version',
  /** column name */
  HandlerFilesHash = 'handler_files_hash',
  /** column name */
  Id = 'id',
  /** column name */
  SchemaHash = 'schema_hash'
}

/** Streaming cursor of the table "persisted_state" */
export type Persisted_State_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Persisted_State_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Persisted_State_Stream_Cursor_Value_Input = {
  abi_files_hash?: InputMaybe<Scalars['String']['input']>;
  config_hash?: InputMaybe<Scalars['String']['input']>;
  envio_version?: InputMaybe<Scalars['String']['input']>;
  handler_files_hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  schema_hash?: InputMaybe<Scalars['String']['input']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "Action" */
  Action: Array<Action>;
  /** fetch data from the table: "Action" using primary key columns */
  Action_by_pk?: Maybe<Action>;
  /** fetch data from the table: "Activity" */
  Activity: Array<Activity>;
  /** fetch data from the table: "Activity" using primary key columns */
  Activity_by_pk?: Maybe<Activity>;
  /** fetch data from the table: "Asset" */
  Asset: Array<Asset>;
  /** fetch data from the table: "Asset" using primary key columns */
  Asset_by_pk?: Maybe<Asset>;
  /** fetch data from the table: "Campaign" */
  Campaign: Array<Campaign>;
  /** fetch data from the table: "Campaign" using primary key columns */
  Campaign_by_pk?: Maybe<Campaign>;
  /** fetch data from the table: "Factory" */
  Factory: Array<Factory>;
  /** fetch data from the table: "Factory" using primary key columns */
  Factory_by_pk?: Maybe<Factory>;
  /** fetch data from the table: "Revenue" */
  Revenue: Array<Revenue>;
  /** fetch data from the table: "RevenueTransaction" */
  RevenueTransaction: Array<RevenueTransaction>;
  /** fetch data from the table: "RevenueTransaction" using primary key columns */
  RevenueTransaction_by_pk?: Maybe<RevenueTransaction>;
  /** fetch data from the table: "Revenue" using primary key columns */
  Revenue_by_pk?: Maybe<Revenue>;
  /** fetch data from the table: "Tranche" */
  Tranche: Array<Tranche>;
  /** fetch data from the table: "Tranche" using primary key columns */
  Tranche_by_pk?: Maybe<Tranche>;
  /** fetch data from the table: "User" */
  User: Array<User>;
  /** fetch data from the table: "UserTransaction" */
  UserTransaction: Array<UserTransaction>;
  /** fetch data from the table: "UserTransaction" using primary key columns */
  UserTransaction_by_pk?: Maybe<UserTransaction>;
  /** fetch aggregated fields from the table: "User" */
  User_aggregate: User_Aggregate;
  /** fetch data from the table: "User" using primary key columns */
  User_by_pk?: Maybe<User>;
  /** fetch data from the table: "Watcher" */
  Watcher: Array<Watcher>;
  /** fetch data from the table: "Watcher" using primary key columns */
  Watcher_by_pk?: Maybe<Watcher>;
  /** fetch data from the table: "chain_metadata" */
  chain_metadata: Array<Chain_Metadata>;
  /** fetch data from the table: "chain_metadata" using primary key columns */
  chain_metadata_by_pk?: Maybe<Chain_Metadata>;
  /** fetch data from the table: "dynamic_contract_registry" */
  dynamic_contract_registry: Array<Dynamic_Contract_Registry>;
  /** fetch data from the table: "dynamic_contract_registry" using primary key columns */
  dynamic_contract_registry_by_pk?: Maybe<Dynamic_Contract_Registry>;
  /** fetch data from the table: "end_of_block_range_scanned_data" */
  end_of_block_range_scanned_data: Array<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table: "end_of_block_range_scanned_data" using primary key columns */
  end_of_block_range_scanned_data_by_pk?: Maybe<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table: "event_sync_state" */
  event_sync_state: Array<Event_Sync_State>;
  /** fetch data from the table: "event_sync_state" using primary key columns */
  event_sync_state_by_pk?: Maybe<Event_Sync_State>;
  /** fetch data from the table: "persisted_state" */
  persisted_state: Array<Persisted_State>;
  /** fetch data from the table: "persisted_state" using primary key columns */
  persisted_state_by_pk?: Maybe<Persisted_State>;
  /** fetch data from the table: "raw_events" */
  raw_events: Array<Raw_Events>;
  /** fetch data from the table: "raw_events" using primary key columns */
  raw_events_by_pk?: Maybe<Raw_Events>;
};


export type Query_RootActionArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


export type Query_RootAction_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootActivityArgs = {
  distinct_on?: InputMaybe<Array<Activity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Activity_Order_By>>;
  where?: InputMaybe<Activity_Bool_Exp>;
};


export type Query_RootActivity_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootAssetArgs = {
  distinct_on?: InputMaybe<Array<Asset_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Asset_Order_By>>;
  where?: InputMaybe<Asset_Bool_Exp>;
};


export type Query_RootAsset_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootCampaignArgs = {
  distinct_on?: InputMaybe<Array<Campaign_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Campaign_Order_By>>;
  where?: InputMaybe<Campaign_Bool_Exp>;
};


export type Query_RootCampaign_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootFactoryArgs = {
  distinct_on?: InputMaybe<Array<Factory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Factory_Order_By>>;
  where?: InputMaybe<Factory_Bool_Exp>;
};


export type Query_RootFactory_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootRevenueArgs = {
  distinct_on?: InputMaybe<Array<Revenue_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Revenue_Order_By>>;
  where?: InputMaybe<Revenue_Bool_Exp>;
};


export type Query_RootRevenueTransactionArgs = {
  distinct_on?: InputMaybe<Array<RevenueTransaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RevenueTransaction_Order_By>>;
  where?: InputMaybe<RevenueTransaction_Bool_Exp>;
};


export type Query_RootRevenueTransaction_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootRevenue_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootTrancheArgs = {
  distinct_on?: InputMaybe<Array<Tranche_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tranche_Order_By>>;
  where?: InputMaybe<Tranche_Bool_Exp>;
};


export type Query_RootTranche_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUserTransactionArgs = {
  distinct_on?: InputMaybe<Array<UserTransaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UserTransaction_Order_By>>;
  where?: InputMaybe<UserTransaction_Bool_Exp>;
};


export type Query_RootUserTransaction_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootWatcherArgs = {
  distinct_on?: InputMaybe<Array<Watcher_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Watcher_Order_By>>;
  where?: InputMaybe<Watcher_Bool_Exp>;
};


export type Query_RootWatcher_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootChain_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Chain_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chain_Metadata_Order_By>>;
  where?: InputMaybe<Chain_Metadata_Bool_Exp>;
};


export type Query_RootChain_Metadata_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Query_RootDynamic_Contract_RegistryArgs = {
  distinct_on?: InputMaybe<Array<Dynamic_Contract_Registry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Dynamic_Contract_Registry_Order_By>>;
  where?: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
};


export type Query_RootDynamic_Contract_Registry_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootEnd_Of_Block_Range_Scanned_DataArgs = {
  distinct_on?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Order_By>>;
  where?: InputMaybe<End_Of_Block_Range_Scanned_Data_Bool_Exp>;
};


export type Query_RootEnd_Of_Block_Range_Scanned_Data_By_PkArgs = {
  block_number: Scalars['Int']['input'];
  chain_id: Scalars['Int']['input'];
};


export type Query_RootEvent_Sync_StateArgs = {
  distinct_on?: InputMaybe<Array<Event_Sync_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Sync_State_Order_By>>;
  where?: InputMaybe<Event_Sync_State_Bool_Exp>;
};


export type Query_RootEvent_Sync_State_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Query_RootPersisted_StateArgs = {
  distinct_on?: InputMaybe<Array<Persisted_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Persisted_State_Order_By>>;
  where?: InputMaybe<Persisted_State_Bool_Exp>;
};


export type Query_RootPersisted_State_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootRaw_EventsArgs = {
  distinct_on?: InputMaybe<Array<Raw_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Raw_Events_Order_By>>;
  where?: InputMaybe<Raw_Events_Bool_Exp>;
};


export type Query_RootRaw_Events_By_PkArgs = {
  serial: Scalars['Int']['input'];
};

/** columns and relationships of "raw_events" */
export type Raw_Events = {
  __typename?: 'raw_events';
  block_fields: Scalars['jsonb']['output'];
  block_hash: Scalars['String']['output'];
  block_number: Scalars['Int']['output'];
  block_timestamp: Scalars['Int']['output'];
  chain_id: Scalars['Int']['output'];
  contract_name: Scalars['String']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  event_id: Scalars['numeric']['output'];
  event_name: Scalars['String']['output'];
  log_index: Scalars['Int']['output'];
  params: Scalars['jsonb']['output'];
  serial: Scalars['Int']['output'];
  src_address: Scalars['String']['output'];
  transaction_fields: Scalars['jsonb']['output'];
};


/** columns and relationships of "raw_events" */
export type Raw_EventsBlock_FieldsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "raw_events" */
export type Raw_EventsParamsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "raw_events" */
export type Raw_EventsTransaction_FieldsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "raw_events". All fields are combined with a logical 'AND'. */
export type Raw_Events_Bool_Exp = {
  _and?: InputMaybe<Array<Raw_Events_Bool_Exp>>;
  _not?: InputMaybe<Raw_Events_Bool_Exp>;
  _or?: InputMaybe<Array<Raw_Events_Bool_Exp>>;
  block_fields?: InputMaybe<Jsonb_Comparison_Exp>;
  block_hash?: InputMaybe<String_Comparison_Exp>;
  block_number?: InputMaybe<Int_Comparison_Exp>;
  block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  contract_name?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  event_id?: InputMaybe<Numeric_Comparison_Exp>;
  event_name?: InputMaybe<String_Comparison_Exp>;
  log_index?: InputMaybe<Int_Comparison_Exp>;
  params?: InputMaybe<Jsonb_Comparison_Exp>;
  serial?: InputMaybe<Int_Comparison_Exp>;
  src_address?: InputMaybe<String_Comparison_Exp>;
  transaction_fields?: InputMaybe<Jsonb_Comparison_Exp>;
};

/** Ordering options when selecting data from "raw_events". */
export type Raw_Events_Order_By = {
  block_fields?: InputMaybe<Order_By>;
  block_hash?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  contract_name?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  event_name?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
  params?: InputMaybe<Order_By>;
  serial?: InputMaybe<Order_By>;
  src_address?: InputMaybe<Order_By>;
  transaction_fields?: InputMaybe<Order_By>;
};

/** select columns of table "raw_events" */
export enum Raw_Events_Select_Column {
  /** column name */
  BlockFields = 'block_fields',
  /** column name */
  BlockHash = 'block_hash',
  /** column name */
  BlockNumber = 'block_number',
  /** column name */
  BlockTimestamp = 'block_timestamp',
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  ContractName = 'contract_name',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  EventId = 'event_id',
  /** column name */
  EventName = 'event_name',
  /** column name */
  LogIndex = 'log_index',
  /** column name */
  Params = 'params',
  /** column name */
  Serial = 'serial',
  /** column name */
  SrcAddress = 'src_address',
  /** column name */
  TransactionFields = 'transaction_fields'
}

/** Streaming cursor of the table "raw_events" */
export type Raw_Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Raw_Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Raw_Events_Stream_Cursor_Value_Input = {
  block_fields?: InputMaybe<Scalars['jsonb']['input']>;
  block_hash?: InputMaybe<Scalars['String']['input']>;
  block_number?: InputMaybe<Scalars['Int']['input']>;
  block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  contract_name?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  event_id?: InputMaybe<Scalars['numeric']['input']>;
  event_name?: InputMaybe<Scalars['String']['input']>;
  log_index?: InputMaybe<Scalars['Int']['input']>;
  params?: InputMaybe<Scalars['jsonb']['input']>;
  serial?: InputMaybe<Scalars['Int']['input']>;
  src_address?: InputMaybe<Scalars['String']['input']>;
  transaction_fields?: InputMaybe<Scalars['jsonb']['input']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "Action" */
  Action: Array<Action>;
  /** fetch data from the table: "Action" using primary key columns */
  Action_by_pk?: Maybe<Action>;
  /** fetch data from the table in a streaming manner: "Action" */
  Action_stream: Array<Action>;
  /** fetch data from the table: "Activity" */
  Activity: Array<Activity>;
  /** fetch data from the table: "Activity" using primary key columns */
  Activity_by_pk?: Maybe<Activity>;
  /** fetch data from the table in a streaming manner: "Activity" */
  Activity_stream: Array<Activity>;
  /** fetch data from the table: "Asset" */
  Asset: Array<Asset>;
  /** fetch data from the table: "Asset" using primary key columns */
  Asset_by_pk?: Maybe<Asset>;
  /** fetch data from the table in a streaming manner: "Asset" */
  Asset_stream: Array<Asset>;
  /** fetch data from the table: "Campaign" */
  Campaign: Array<Campaign>;
  /** fetch data from the table: "Campaign" using primary key columns */
  Campaign_by_pk?: Maybe<Campaign>;
  /** fetch data from the table in a streaming manner: "Campaign" */
  Campaign_stream: Array<Campaign>;
  /** fetch data from the table: "Factory" */
  Factory: Array<Factory>;
  /** fetch data from the table: "Factory" using primary key columns */
  Factory_by_pk?: Maybe<Factory>;
  /** fetch data from the table in a streaming manner: "Factory" */
  Factory_stream: Array<Factory>;
  /** fetch data from the table: "Revenue" */
  Revenue: Array<Revenue>;
  /** fetch data from the table: "RevenueTransaction" */
  RevenueTransaction: Array<RevenueTransaction>;
  /** fetch data from the table: "RevenueTransaction" using primary key columns */
  RevenueTransaction_by_pk?: Maybe<RevenueTransaction>;
  /** fetch data from the table in a streaming manner: "RevenueTransaction" */
  RevenueTransaction_stream: Array<RevenueTransaction>;
  /** fetch data from the table: "Revenue" using primary key columns */
  Revenue_by_pk?: Maybe<Revenue>;
  /** fetch data from the table in a streaming manner: "Revenue" */
  Revenue_stream: Array<Revenue>;
  /** fetch data from the table: "Tranche" */
  Tranche: Array<Tranche>;
  /** fetch data from the table: "Tranche" using primary key columns */
  Tranche_by_pk?: Maybe<Tranche>;
  /** fetch data from the table in a streaming manner: "Tranche" */
  Tranche_stream: Array<Tranche>;
  /** fetch data from the table: "User" */
  User: Array<User>;
  /** fetch data from the table: "UserTransaction" */
  UserTransaction: Array<UserTransaction>;
  /** fetch data from the table: "UserTransaction" using primary key columns */
  UserTransaction_by_pk?: Maybe<UserTransaction>;
  /** fetch data from the table in a streaming manner: "UserTransaction" */
  UserTransaction_stream: Array<UserTransaction>;
  /** fetch aggregated fields from the table: "User" */
  User_aggregate: User_Aggregate;
  /** fetch data from the table: "User" using primary key columns */
  User_by_pk?: Maybe<User>;
  /** fetch data from the table in a streaming manner: "User" */
  User_stream: Array<User>;
  /** fetch data from the table: "Watcher" */
  Watcher: Array<Watcher>;
  /** fetch data from the table: "Watcher" using primary key columns */
  Watcher_by_pk?: Maybe<Watcher>;
  /** fetch data from the table in a streaming manner: "Watcher" */
  Watcher_stream: Array<Watcher>;
  /** fetch data from the table: "chain_metadata" */
  chain_metadata: Array<Chain_Metadata>;
  /** fetch data from the table: "chain_metadata" using primary key columns */
  chain_metadata_by_pk?: Maybe<Chain_Metadata>;
  /** fetch data from the table in a streaming manner: "chain_metadata" */
  chain_metadata_stream: Array<Chain_Metadata>;
  /** fetch data from the table: "dynamic_contract_registry" */
  dynamic_contract_registry: Array<Dynamic_Contract_Registry>;
  /** fetch data from the table: "dynamic_contract_registry" using primary key columns */
  dynamic_contract_registry_by_pk?: Maybe<Dynamic_Contract_Registry>;
  /** fetch data from the table in a streaming manner: "dynamic_contract_registry" */
  dynamic_contract_registry_stream: Array<Dynamic_Contract_Registry>;
  /** fetch data from the table: "end_of_block_range_scanned_data" */
  end_of_block_range_scanned_data: Array<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table: "end_of_block_range_scanned_data" using primary key columns */
  end_of_block_range_scanned_data_by_pk?: Maybe<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table in a streaming manner: "end_of_block_range_scanned_data" */
  end_of_block_range_scanned_data_stream: Array<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table: "event_sync_state" */
  event_sync_state: Array<Event_Sync_State>;
  /** fetch data from the table: "event_sync_state" using primary key columns */
  event_sync_state_by_pk?: Maybe<Event_Sync_State>;
  /** fetch data from the table in a streaming manner: "event_sync_state" */
  event_sync_state_stream: Array<Event_Sync_State>;
  /** fetch data from the table: "persisted_state" */
  persisted_state: Array<Persisted_State>;
  /** fetch data from the table: "persisted_state" using primary key columns */
  persisted_state_by_pk?: Maybe<Persisted_State>;
  /** fetch data from the table in a streaming manner: "persisted_state" */
  persisted_state_stream: Array<Persisted_State>;
  /** fetch data from the table: "raw_events" */
  raw_events: Array<Raw_Events>;
  /** fetch data from the table: "raw_events" using primary key columns */
  raw_events_by_pk?: Maybe<Raw_Events>;
  /** fetch data from the table in a streaming manner: "raw_events" */
  raw_events_stream: Array<Raw_Events>;
};


export type Subscription_RootActionArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


export type Subscription_RootAction_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAction_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Action_Stream_Cursor_Input>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


export type Subscription_RootActivityArgs = {
  distinct_on?: InputMaybe<Array<Activity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Activity_Order_By>>;
  where?: InputMaybe<Activity_Bool_Exp>;
};


export type Subscription_RootActivity_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootActivity_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Activity_Stream_Cursor_Input>>;
  where?: InputMaybe<Activity_Bool_Exp>;
};


export type Subscription_RootAssetArgs = {
  distinct_on?: InputMaybe<Array<Asset_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Asset_Order_By>>;
  where?: InputMaybe<Asset_Bool_Exp>;
};


export type Subscription_RootAsset_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAsset_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Asset_Stream_Cursor_Input>>;
  where?: InputMaybe<Asset_Bool_Exp>;
};


export type Subscription_RootCampaignArgs = {
  distinct_on?: InputMaybe<Array<Campaign_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Campaign_Order_By>>;
  where?: InputMaybe<Campaign_Bool_Exp>;
};


export type Subscription_RootCampaign_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootCampaign_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Campaign_Stream_Cursor_Input>>;
  where?: InputMaybe<Campaign_Bool_Exp>;
};


export type Subscription_RootFactoryArgs = {
  distinct_on?: InputMaybe<Array<Factory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Factory_Order_By>>;
  where?: InputMaybe<Factory_Bool_Exp>;
};


export type Subscription_RootFactory_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootFactory_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Factory_Stream_Cursor_Input>>;
  where?: InputMaybe<Factory_Bool_Exp>;
};


export type Subscription_RootRevenueArgs = {
  distinct_on?: InputMaybe<Array<Revenue_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Revenue_Order_By>>;
  where?: InputMaybe<Revenue_Bool_Exp>;
};


export type Subscription_RootRevenueTransactionArgs = {
  distinct_on?: InputMaybe<Array<RevenueTransaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RevenueTransaction_Order_By>>;
  where?: InputMaybe<RevenueTransaction_Bool_Exp>;
};


export type Subscription_RootRevenueTransaction_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootRevenueTransaction_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<RevenueTransaction_Stream_Cursor_Input>>;
  where?: InputMaybe<RevenueTransaction_Bool_Exp>;
};


export type Subscription_RootRevenue_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootRevenue_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Revenue_Stream_Cursor_Input>>;
  where?: InputMaybe<Revenue_Bool_Exp>;
};


export type Subscription_RootTrancheArgs = {
  distinct_on?: InputMaybe<Array<Tranche_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tranche_Order_By>>;
  where?: InputMaybe<Tranche_Bool_Exp>;
};


export type Subscription_RootTranche_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootTranche_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Tranche_Stream_Cursor_Input>>;
  where?: InputMaybe<Tranche_Bool_Exp>;
};


export type Subscription_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUserTransactionArgs = {
  distinct_on?: InputMaybe<Array<UserTransaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UserTransaction_Order_By>>;
  where?: InputMaybe<UserTransaction_Bool_Exp>;
};


export type Subscription_RootUserTransaction_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootUserTransaction_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<UserTransaction_Stream_Cursor_Input>>;
  where?: InputMaybe<UserTransaction_Bool_Exp>;
};


export type Subscription_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootUser_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootWatcherArgs = {
  distinct_on?: InputMaybe<Array<Watcher_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Watcher_Order_By>>;
  where?: InputMaybe<Watcher_Bool_Exp>;
};


export type Subscription_RootWatcher_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootWatcher_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Watcher_Stream_Cursor_Input>>;
  where?: InputMaybe<Watcher_Bool_Exp>;
};


export type Subscription_RootChain_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Chain_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chain_Metadata_Order_By>>;
  where?: InputMaybe<Chain_Metadata_Bool_Exp>;
};


export type Subscription_RootChain_Metadata_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Subscription_RootChain_Metadata_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Chain_Metadata_Stream_Cursor_Input>>;
  where?: InputMaybe<Chain_Metadata_Bool_Exp>;
};


export type Subscription_RootDynamic_Contract_RegistryArgs = {
  distinct_on?: InputMaybe<Array<Dynamic_Contract_Registry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Dynamic_Contract_Registry_Order_By>>;
  where?: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
};


export type Subscription_RootDynamic_Contract_Registry_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootDynamic_Contract_Registry_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Dynamic_Contract_Registry_Stream_Cursor_Input>>;
  where?: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
};


export type Subscription_RootEnd_Of_Block_Range_Scanned_DataArgs = {
  distinct_on?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Order_By>>;
  where?: InputMaybe<End_Of_Block_Range_Scanned_Data_Bool_Exp>;
};


export type Subscription_RootEnd_Of_Block_Range_Scanned_Data_By_PkArgs = {
  block_number: Scalars['Int']['input'];
  chain_id: Scalars['Int']['input'];
};


export type Subscription_RootEnd_Of_Block_Range_Scanned_Data_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<End_Of_Block_Range_Scanned_Data_Stream_Cursor_Input>>;
  where?: InputMaybe<End_Of_Block_Range_Scanned_Data_Bool_Exp>;
};


export type Subscription_RootEvent_Sync_StateArgs = {
  distinct_on?: InputMaybe<Array<Event_Sync_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Sync_State_Order_By>>;
  where?: InputMaybe<Event_Sync_State_Bool_Exp>;
};


export type Subscription_RootEvent_Sync_State_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Subscription_RootEvent_Sync_State_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Event_Sync_State_Stream_Cursor_Input>>;
  where?: InputMaybe<Event_Sync_State_Bool_Exp>;
};


export type Subscription_RootPersisted_StateArgs = {
  distinct_on?: InputMaybe<Array<Persisted_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Persisted_State_Order_By>>;
  where?: InputMaybe<Persisted_State_Bool_Exp>;
};


export type Subscription_RootPersisted_State_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootPersisted_State_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Persisted_State_Stream_Cursor_Input>>;
  where?: InputMaybe<Persisted_State_Bool_Exp>;
};


export type Subscription_RootRaw_EventsArgs = {
  distinct_on?: InputMaybe<Array<Raw_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Raw_Events_Order_By>>;
  where?: InputMaybe<Raw_Events_Bool_Exp>;
};


export type Subscription_RootRaw_Events_By_PkArgs = {
  serial: Scalars['Int']['input'];
};


export type Subscription_RootRaw_Events_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Raw_Events_Stream_Cursor_Input>>;
  where?: InputMaybe<Raw_Events_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

export type ActionFragmentFragment = { __typename?: 'Action', id: string, block: any, category: any, chainId: any, claimAmount?: any | null, claimIndex?: any | null, claimRecipient?: string | null, claimStreamId?: string | null, claimTokenId?: any | null, clawbackAmount?: any | null, clawbackFrom?: string | null, clawbackTo?: string | null, fee?: any | null, from: string, hash: string, subgraphId: any, timestamp: any, campaign?: { __typename?: 'Campaign', id: string, name?: string | null, nickname: string } | null };

export type ActivityFragmentFragment = { __typename?: 'Activity', id: string, amount: any, claims: any, day: any, timestamp: any, campaign?: { __typename?: 'Campaign', id: string } | null };

export type CampaignFragmentBaseFragment = { __typename?: 'Campaign', id: string, address: string, admin: string, aggregateAmount: any, category: any, chainId: any, claimedAmount: any, claimedCount: any, clawbackTime?: any | null, expiration?: any | null, expires: boolean, fee?: any | null, hash: string, ipfsCID: string, lockup?: string | null, name?: string | null, nickname: string, root: string, streamCancelable?: boolean | null, streamCliff?: boolean | null, streamCliffDuration?: any | null, streamCliffPercentage?: any | null, streamInitial?: boolean | null, streamInitialPercentage?: any | null, streamShape?: string | null, streamStart?: boolean | null, streamStartTime?: any | null, streamTotalDuration?: any | null, streamTransferable?: boolean | null, subgraphId: any, timestamp: any, totalRecipients: any, version: string, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, factory?: { __typename?: 'Factory', id: string, address: string, alias: string } | null };

export type FactoryFragmentFragment = { __typename?: 'Factory', id: string, address: string, alias: string };

export type TrancheFragmentFragment = { __typename?: 'Tranche', id: string, duration: any, endDuration: any, endPercentage: any, percentage: any, position: any, startDuration: any, startPercentage: any };

export type CampaignFragmentFragment = { __typename?: 'Campaign', id: string, address: string, admin: string, aggregateAmount: any, category: any, chainId: any, claimedAmount: any, claimedCount: any, clawbackTime?: any | null, expiration?: any | null, expires: boolean, fee?: any | null, hash: string, ipfsCID: string, lockup?: string | null, name?: string | null, nickname: string, root: string, streamCancelable?: boolean | null, streamCliff?: boolean | null, streamCliffDuration?: any | null, streamCliffPercentage?: any | null, streamInitial?: boolean | null, streamInitialPercentage?: any | null, streamShape?: string | null, streamStart?: boolean | null, streamStartTime?: any | null, streamTotalDuration?: any | null, streamTransferable?: boolean | null, subgraphId: any, timestamp: any, totalRecipients: any, version: string, streamTranches: Array<{ __typename?: 'Tranche', id: string, duration: any, endDuration: any, endPercentage: any, percentage: any, position: any, startDuration: any, startPercentage: any }>, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, factory?: { __typename?: 'Factory', id: string, address: string, alias: string } | null };

export type AssetFragmentFragment = { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string };

export type GetActionsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderDirection: Order_By;
  where?: InputMaybe<Action_Bool_Exp>;
}>;


export type GetActionsQuery = { __typename?: 'query_root', actions: Array<{ __typename?: 'Action', id: string, block: any, category: any, chainId: any, claimAmount?: any | null, claimIndex?: any | null, claimRecipient?: string | null, claimStreamId?: string | null, claimTokenId?: any | null, clawbackAmount?: any | null, clawbackFrom?: string | null, clawbackTo?: string | null, fee?: any | null, from: string, hash: string, subgraphId: any, timestamp: any, campaign?: { __typename?: 'Campaign', id: string, category: any, name?: string | null, nickname: string, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null } | null }> };

export type GetCampaignQueryVariables = Exact<{
  campaignId: Scalars['String']['input'];
}>;


export type GetCampaignQuery = { __typename?: 'query_root', campaign?: { __typename?: 'Campaign', id: string, address: string, admin: string, aggregateAmount: any, category: any, chainId: any, claimedAmount: any, claimedCount: any, clawbackTime?: any | null, expiration?: any | null, expires: boolean, fee?: any | null, hash: string, ipfsCID: string, lockup?: string | null, name?: string | null, nickname: string, root: string, streamCancelable?: boolean | null, streamCliff?: boolean | null, streamCliffDuration?: any | null, streamCliffPercentage?: any | null, streamInitial?: boolean | null, streamInitialPercentage?: any | null, streamShape?: string | null, streamStart?: boolean | null, streamStartTime?: any | null, streamTotalDuration?: any | null, streamTransferable?: boolean | null, subgraphId: any, timestamp: any, totalRecipients: any, version: string, streamTranches: Array<{ __typename?: 'Tranche', id: string, duration: any, endDuration: any, endPercentage: any, percentage: any, position: any, startDuration: any, startPercentage: any }>, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, factory?: { __typename?: 'Factory', id: string, address: string, alias: string } | null } | null };

export type GetCampaignMetadataQueryVariables = Exact<{
  campaignId: Scalars['String']['input'];
  campaignId_string: Scalars['String']['input'];
  dayFrom: Scalars['numeric']['input'];
  dayTo: Scalars['numeric']['input'];
}>;


export type GetCampaignMetadataQuery = { __typename?: 'query_root', campaign?: { __typename?: 'Campaign', id: string, actions: Array<{ __typename?: 'Action', id: string, block: any, category: any, chainId: any, claimAmount?: any | null, claimIndex?: any | null, claimRecipient?: string | null, claimStreamId?: string | null, claimTokenId?: any | null, clawbackAmount?: any | null, clawbackFrom?: string | null, clawbackTo?: string | null, fee?: any | null, from: string, hash: string, subgraphId: any, timestamp: any, campaign?: { __typename?: 'Campaign', id: string, name?: string | null, nickname: string } | null }>, activities: Array<{ __typename?: 'Activity', id: string, amount: any, claims: any, day: any, timestamp: any, campaign?: { __typename?: 'Campaign', id: string } | null }>, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null } | null, firsts: Array<{ __typename?: 'Action', id: string, block: any, category: any, chainId: any, claimAmount?: any | null, claimIndex?: any | null, claimRecipient?: string | null, claimStreamId?: string | null, claimTokenId?: any | null, clawbackAmount?: any | null, clawbackFrom?: string | null, clawbackTo?: string | null, fee?: any | null, from: string, hash: string, subgraphId: any, timestamp: any, campaign?: { __typename?: 'Campaign', id: string, name?: string | null, nickname: string } | null }>, actions: Array<{ __typename?: 'Action', id: string, block: any, category: any, chainId: any, claimAmount?: any | null, claimIndex?: any | null, claimRecipient?: string | null, claimStreamId?: string | null, claimTokenId?: any | null, clawbackAmount?: any | null, clawbackFrom?: string | null, clawbackTo?: string | null, fee?: any | null, from: string, hash: string, subgraphId: any, timestamp: any, campaign?: { __typename?: 'Campaign', id: string, name?: string | null, nickname: string } | null }> };

export type GetCampaignWithActionsQueryVariables = Exact<{
  campaignId: Scalars['String']['input'];
}>;


export type GetCampaignWithActionsQuery = { __typename?: 'query_root', campaign?: { __typename?: 'Campaign', id: string, address: string, admin: string, aggregateAmount: any, category: any, chainId: any, claimedAmount: any, claimedCount: any, clawbackTime?: any | null, expiration?: any | null, expires: boolean, fee?: any | null, hash: string, ipfsCID: string, lockup?: string | null, name?: string | null, nickname: string, root: string, streamCancelable?: boolean | null, streamCliff?: boolean | null, streamCliffDuration?: any | null, streamCliffPercentage?: any | null, streamInitial?: boolean | null, streamInitialPercentage?: any | null, streamShape?: string | null, streamStart?: boolean | null, streamStartTime?: any | null, streamTotalDuration?: any | null, streamTransferable?: boolean | null, subgraphId: any, timestamp: any, totalRecipients: any, version: string, actions: Array<{ __typename?: 'Action', id: string, block: any, category: any, chainId: any, claimAmount?: any | null, claimIndex?: any | null, claimRecipient?: string | null, claimStreamId?: string | null, claimTokenId?: any | null, clawbackAmount?: any | null, clawbackFrom?: string | null, clawbackTo?: string | null, fee?: any | null, from: string, hash: string, subgraphId: any, timestamp: any, campaign?: { __typename?: 'Campaign', id: string, name?: string | null, nickname: string } | null }>, streamTranches: Array<{ __typename?: 'Tranche', id: string, duration: any, endDuration: any, endPercentage: any, percentage: any, position: any, startDuration: any, startPercentage: any }>, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, factory?: { __typename?: 'Factory', id: string, address: string, alias: string } | null } | null };

export type GetCampaignsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderDirection: Order_By;
  where?: InputMaybe<Campaign_Bool_Exp>;
}>;


export type GetCampaignsQuery = { __typename?: 'query_root', campaigns: Array<{ __typename?: 'Campaign', id: string, address: string, admin: string, aggregateAmount: any, category: any, chainId: any, claimedAmount: any, claimedCount: any, clawbackTime?: any | null, expiration?: any | null, expires: boolean, fee?: any | null, hash: string, ipfsCID: string, lockup?: string | null, name?: string | null, nickname: string, root: string, streamCancelable?: boolean | null, streamCliff?: boolean | null, streamCliffDuration?: any | null, streamCliffPercentage?: any | null, streamInitial?: boolean | null, streamInitialPercentage?: any | null, streamShape?: string | null, streamStart?: boolean | null, streamStartTime?: any | null, streamTotalDuration?: any | null, streamTransferable?: boolean | null, subgraphId: any, timestamp: any, totalRecipients: any, version: string, streamTranches: Array<{ __typename?: 'Tranche', id: string, duration: any, endDuration: any, endPercentage: any, percentage: any, position: any, startDuration: any, startPercentage: any }>, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, factory?: { __typename?: 'Factory', id: string, address: string, alias: string } | null }> };

export type GetCampaignsWithActionsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderDirection: Order_By;
  where?: InputMaybe<Campaign_Bool_Exp>;
}>;


export type GetCampaignsWithActionsQuery = { __typename?: 'query_root', campaigns: Array<{ __typename?: 'Campaign', id: string, address: string, admin: string, aggregateAmount: any, category: any, chainId: any, claimedAmount: any, claimedCount: any, clawbackTime?: any | null, expiration?: any | null, expires: boolean, fee?: any | null, hash: string, ipfsCID: string, lockup?: string | null, name?: string | null, nickname: string, root: string, streamCancelable?: boolean | null, streamCliff?: boolean | null, streamCliffDuration?: any | null, streamCliffPercentage?: any | null, streamInitial?: boolean | null, streamInitialPercentage?: any | null, streamShape?: string | null, streamStart?: boolean | null, streamStartTime?: any | null, streamTotalDuration?: any | null, streamTransferable?: boolean | null, subgraphId: any, timestamp: any, totalRecipients: any, version: string, actions: Array<{ __typename?: 'Action', id: string, block: any, category: any, chainId: any, claimAmount?: any | null, claimIndex?: any | null, claimRecipient?: string | null, claimStreamId?: string | null, claimTokenId?: any | null, clawbackAmount?: any | null, clawbackFrom?: string | null, clawbackTo?: string | null, fee?: any | null, from: string, hash: string, subgraphId: any, timestamp: any, campaign?: { __typename?: 'Campaign', id: string, name?: string | null, nickname: string } | null }>, streamTranches: Array<{ __typename?: 'Tranche', id: string, duration: any, endDuration: any, endPercentage: any, percentage: any, position: any, startDuration: any, startPercentage: any }>, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, factory?: { __typename?: 'Factory', id: string, address: string, alias: string } | null }> };

export type GetCampaignsWithActivitiesQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderDirection: Order_By;
  where?: InputMaybe<Campaign_Bool_Exp>;
}>;


export type GetCampaignsWithActivitiesQuery = { __typename?: 'query_root', campaigns: Array<{ __typename?: 'Campaign', id: string, address: string, admin: string, aggregateAmount: any, category: any, chainId: any, claimedAmount: any, claimedCount: any, clawbackTime?: any | null, expiration?: any | null, expires: boolean, fee?: any | null, hash: string, ipfsCID: string, lockup?: string | null, name?: string | null, nickname: string, root: string, streamCancelable?: boolean | null, streamCliff?: boolean | null, streamCliffDuration?: any | null, streamCliffPercentage?: any | null, streamInitial?: boolean | null, streamInitialPercentage?: any | null, streamShape?: string | null, streamStart?: boolean | null, streamStartTime?: any | null, streamTotalDuration?: any | null, streamTransferable?: boolean | null, subgraphId: any, timestamp: any, totalRecipients: any, version: string, activities: Array<{ __typename?: 'Activity', id: string, amount: any, claims: any, day: any, timestamp: any, campaign?: { __typename?: 'Campaign', id: string } | null }>, streamTranches: Array<{ __typename?: 'Tranche', id: string, duration: any, endDuration: any, endPercentage: any, percentage: any, position: any, startDuration: any, startPercentage: any }>, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, factory?: { __typename?: 'Factory', id: string, address: string, alias: string } | null }> };

export type GetCampaignsWithActionsAndActivitiesQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderDirection: Order_By;
  where?: InputMaybe<Campaign_Bool_Exp>;
}>;


export type GetCampaignsWithActionsAndActivitiesQuery = { __typename?: 'query_root', campaigns: Array<{ __typename?: 'Campaign', id: string, address: string, admin: string, aggregateAmount: any, category: any, chainId: any, claimedAmount: any, claimedCount: any, clawbackTime?: any | null, expiration?: any | null, expires: boolean, fee?: any | null, hash: string, ipfsCID: string, lockup?: string | null, name?: string | null, nickname: string, root: string, streamCancelable?: boolean | null, streamCliff?: boolean | null, streamCliffDuration?: any | null, streamCliffPercentage?: any | null, streamInitial?: boolean | null, streamInitialPercentage?: any | null, streamShape?: string | null, streamStart?: boolean | null, streamStartTime?: any | null, streamTotalDuration?: any | null, streamTransferable?: boolean | null, subgraphId: any, timestamp: any, totalRecipients: any, version: string, actions: Array<{ __typename?: 'Action', id: string, block: any, category: any, chainId: any, claimAmount?: any | null, claimIndex?: any | null, claimRecipient?: string | null, claimStreamId?: string | null, claimTokenId?: any | null, clawbackAmount?: any | null, clawbackFrom?: string | null, clawbackTo?: string | null, fee?: any | null, from: string, hash: string, subgraphId: any, timestamp: any, campaign?: { __typename?: 'Campaign', id: string, name?: string | null, nickname: string } | null }>, activities: Array<{ __typename?: 'Activity', id: string, amount: any, claims: any, day: any, timestamp: any, campaign?: { __typename?: 'Campaign', id: string } | null }>, streamTranches: Array<{ __typename?: 'Tranche', id: string, duration: any, endDuration: any, endPercentage: any, percentage: any, position: any, startDuration: any, startPercentage: any }>, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, factory?: { __typename?: 'Factory', id: string, address: string, alias: string } | null }> };

export type GetCampaignsWithClaimsQueryVariables = Exact<{
  claimer: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  orderDirection: Order_By;
  where?: InputMaybe<Campaign_Bool_Exp>;
}>;


export type GetCampaignsWithClaimsQuery = { __typename?: 'query_root', campaigns: Array<{ __typename?: 'Campaign', id: string, address: string, admin: string, aggregateAmount: any, category: any, chainId: any, claimedAmount: any, claimedCount: any, clawbackTime?: any | null, expiration?: any | null, expires: boolean, fee?: any | null, hash: string, ipfsCID: string, lockup?: string | null, name?: string | null, nickname: string, root: string, streamCancelable?: boolean | null, streamCliff?: boolean | null, streamCliffDuration?: any | null, streamCliffPercentage?: any | null, streamInitial?: boolean | null, streamInitialPercentage?: any | null, streamShape?: string | null, streamStart?: boolean | null, streamStartTime?: any | null, streamTotalDuration?: any | null, streamTransferable?: boolean | null, subgraphId: any, timestamp: any, totalRecipients: any, version: string, actions: Array<{ __typename?: 'Action', id: string, block: any, category: any, chainId: any, claimAmount?: any | null, claimIndex?: any | null, claimRecipient?: string | null, claimStreamId?: string | null, claimTokenId?: any | null, clawbackAmount?: any | null, clawbackFrom?: string | null, clawbackTo?: string | null, fee?: any | null, from: string, hash: string, subgraphId: any, timestamp: any, campaign?: { __typename?: 'Campaign', id: string, name?: string | null, nickname: string } | null }>, streamTranches: Array<{ __typename?: 'Tranche', id: string, duration: any, endDuration: any, endPercentage: any, percentage: any, position: any, startDuration: any, startPercentage: any }>, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, factory?: { __typename?: 'Factory', id: string, address: string, alias: string } | null }> };

export const ActionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimIndex"}},{"kind":"Field","name":{"kind":"Name","value":"claimRecipient"}},{"kind":"Field","name":{"kind":"Name","value":"claimStreamId"}},{"kind":"Field","name":{"kind":"Name","value":"claimTokenId"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackFrom"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTo"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}}]} as unknown as DocumentNode<ActionFragmentFragment, unknown>;
export const ActivityFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActivityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Activity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"claims"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ActivityFragmentFragment, unknown>;
export const AssetFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]} as unknown as DocumentNode<AssetFragmentFragment, unknown>;
export const FactoryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}}]} as unknown as DocumentNode<FactoryFragmentFragment, unknown>;
export const CampaignFragmentBaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}}]} as unknown as DocumentNode<CampaignFragmentBaseFragment, unknown>;
export const TrancheFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}}]} as unknown as DocumentNode<TrancheFragmentFragment, unknown>;
export const CampaignFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"streamTranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}}]} as unknown as DocumentNode<CampaignFragmentFragment, unknown>;
export const GetActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getActions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"order_by"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Action_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"actions"},"name":{"kind":"Name","value":"Action"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"distinct_on"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"subgraphId"}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimIndex"}},{"kind":"Field","name":{"kind":"Name","value":"claimRecipient"}},{"kind":"Field","name":{"kind":"Name","value":"claimStreamId"}},{"kind":"Field","name":{"kind":"Name","value":"claimTokenId"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackFrom"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTo"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]} as unknown as DocumentNode<GetActionsQuery, GetActionsQueryVariables>;
export const GetCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"campaign"},"name":{"kind":"Name","value":"Campaign_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"streamTranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}}]} as unknown as DocumentNode<GetCampaignQuery, GetCampaignQueryVariables>;
export const GetCampaignMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCampaignMetadata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignId_string"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dayFrom"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dayTo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"campaign"},"name":{"kind":"Name","value":"Campaign_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"EnumValue","value":"desc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"7"}},{"kind":"Argument","name":{"kind":"Name","value":"distinct_on"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"day"}]}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"day"},"value":{"kind":"EnumValue","value":"asc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"day"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dayFrom"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dayTo"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"campaign_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActivityFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"firsts"},"name":{"kind":"Name","value":"Action"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"EnumValue","value":"asc"}},{"kind":"ObjectField","name":{"kind":"Name","value":"timestamp"},"value":{"kind":"EnumValue","value":"asc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"campaign_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignId_string"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"category"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"StringValue","value":"Claim","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"actions"},"name":{"kind":"Name","value":"Action"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"EnumValue","value":"desc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"campaign_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignId_string"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"category"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"StringValue","value":"Claim","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimIndex"}},{"kind":"Field","name":{"kind":"Name","value":"claimRecipient"}},{"kind":"Field","name":{"kind":"Name","value":"claimStreamId"}},{"kind":"Field","name":{"kind":"Name","value":"claimTokenId"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackFrom"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTo"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActivityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Activity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"claims"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]} as unknown as DocumentNode<GetCampaignMetadataQuery, GetCampaignMetadataQueryVariables>;
export const GetCampaignWithActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCampaignWithActions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"campaign"},"name":{"kind":"Name","value":"Campaign_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragment"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"streamTranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimIndex"}},{"kind":"Field","name":{"kind":"Name","value":"claimRecipient"}},{"kind":"Field","name":{"kind":"Name","value":"claimStreamId"}},{"kind":"Field","name":{"kind":"Name","value":"claimTokenId"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackFrom"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTo"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}}]} as unknown as DocumentNode<GetCampaignWithActionsQuery, GetCampaignWithActionsQueryVariables>;
export const GetCampaignsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCampaigns"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"order_by"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"campaigns"},"name":{"kind":"Name","value":"Campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"distinct_on"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"subgraphId"}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"streamTranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}}]} as unknown as DocumentNode<GetCampaignsQuery, GetCampaignsQueryVariables>;
export const GetCampaignsWithActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCampaignsWithActions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"order_by"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"campaigns"},"name":{"kind":"Name","value":"Campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"distinct_on"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"subgraphId"}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragment"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"streamTranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimIndex"}},{"kind":"Field","name":{"kind":"Name","value":"claimRecipient"}},{"kind":"Field","name":{"kind":"Name","value":"claimStreamId"}},{"kind":"Field","name":{"kind":"Name","value":"claimTokenId"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackFrom"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTo"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}}]} as unknown as DocumentNode<GetCampaignsWithActionsQuery, GetCampaignsWithActionsQueryVariables>;
export const GetCampaignsWithActivitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCampaignsWithActivities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"order_by"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"campaigns"},"name":{"kind":"Name","value":"Campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"distinct_on"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"subgraphId"}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragment"}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"timestamp"},"value":{"kind":"EnumValue","value":"desc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActivityFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"streamTranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActivityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Activity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"claims"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetCampaignsWithActivitiesQuery, GetCampaignsWithActivitiesQueryVariables>;
export const GetCampaignsWithActionsAndActivitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCampaignsWithActionsAndActivities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"order_by"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"campaigns"},"name":{"kind":"Name","value":"Campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"distinct_on"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"subgraphId"}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragment"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"timestamp"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActivityFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"streamTranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimIndex"}},{"kind":"Field","name":{"kind":"Name","value":"claimRecipient"}},{"kind":"Field","name":{"kind":"Name","value":"claimStreamId"}},{"kind":"Field","name":{"kind":"Name","value":"claimTokenId"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackFrom"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTo"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActivityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Activity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"claims"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetCampaignsWithActionsAndActivitiesQuery, GetCampaignsWithActionsAndActivitiesQueryVariables>;
export const GetCampaignsWithClaimsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCampaignsWithClaims"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"claimer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"order_by"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"campaigns"},"name":{"kind":"Name","value":"Campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragment"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"claimRecipient"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"claimer"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"category"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"StringValue","value":"Claim","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"streamTranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimIndex"}},{"kind":"Field","name":{"kind":"Name","value":"claimRecipient"}},{"kind":"Field","name":{"kind":"Name","value":"claimStreamId"}},{"kind":"Field","name":{"kind":"Name","value":"claimTokenId"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackFrom"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTo"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}}]} as unknown as DocumentNode<GetCampaignsWithClaimsQuery, GetCampaignsWithClaimsQueryVariables>;