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
  jsonb: { input: any; output: any; }
  numeric: { input: any; output: any; }
  streamcategory: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
};

/** columns and relationships of "Action" */
export type Action = {
  __typename?: 'Action';
  addressA?: Maybe<Scalars['String']['output']>;
  addressB?: Maybe<Scalars['String']['output']>;
  amountA?: Maybe<Scalars['numeric']['output']>;
  amountB?: Maybe<Scalars['numeric']['output']>;
  block: Scalars['numeric']['output'];
  category: Scalars['actioncategory']['output'];
  chainId: Scalars['numeric']['output'];
  contract: Scalars['String']['output'];
  fee?: Maybe<Scalars['numeric']['output']>;
  from: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  /** An object relationship */
  stream?: Maybe<Stream>;
  stream_id?: Maybe<Scalars['String']['output']>;
  subgraphId: Scalars['numeric']['output'];
  timestamp: Scalars['numeric']['output'];
};

/** aggregated selection of "Action" */
export type Action_Aggregate = {
  __typename?: 'Action_aggregate';
  aggregate?: Maybe<Action_Aggregate_Fields>;
  nodes: Array<Action>;
};

export type Action_Aggregate_Bool_Exp = {
  count?: InputMaybe<Action_Aggregate_Bool_Exp_Count>;
};

export type Action_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Action_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Action_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "Action" */
export type Action_Aggregate_Fields = {
  __typename?: 'Action_aggregate_fields';
  avg?: Maybe<Action_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Action_Max_Fields>;
  min?: Maybe<Action_Min_Fields>;
  stddev?: Maybe<Action_Stddev_Fields>;
  stddev_pop?: Maybe<Action_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Action_Stddev_Samp_Fields>;
  sum?: Maybe<Action_Sum_Fields>;
  var_pop?: Maybe<Action_Var_Pop_Fields>;
  var_samp?: Maybe<Action_Var_Samp_Fields>;
  variance?: Maybe<Action_Variance_Fields>;
};


/** aggregate fields of "Action" */
export type Action_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Action_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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

/** aggregate avg on columns */
export type Action_Avg_Fields = {
  __typename?: 'Action_avg_fields';
  amountA?: Maybe<Scalars['Float']['output']>;
  amountB?: Maybe<Scalars['Float']['output']>;
  block?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "Action" */
export type Action_Avg_Order_By = {
  amountA?: InputMaybe<Order_By>;
  amountB?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Action". All fields are combined with a logical 'AND'. */
export type Action_Bool_Exp = {
  _and?: InputMaybe<Array<Action_Bool_Exp>>;
  _not?: InputMaybe<Action_Bool_Exp>;
  _or?: InputMaybe<Array<Action_Bool_Exp>>;
  addressA?: InputMaybe<String_Comparison_Exp>;
  addressB?: InputMaybe<String_Comparison_Exp>;
  amountA?: InputMaybe<Numeric_Comparison_Exp>;
  amountB?: InputMaybe<Numeric_Comparison_Exp>;
  block?: InputMaybe<Numeric_Comparison_Exp>;
  category?: InputMaybe<Actioncategory_Comparison_Exp>;
  chainId?: InputMaybe<Numeric_Comparison_Exp>;
  contract?: InputMaybe<String_Comparison_Exp>;
  fee?: InputMaybe<Numeric_Comparison_Exp>;
  from?: InputMaybe<String_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  stream?: InputMaybe<Stream_Bool_Exp>;
  stream_id?: InputMaybe<String_Comparison_Exp>;
  subgraphId?: InputMaybe<Numeric_Comparison_Exp>;
  timestamp?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Action_Max_Fields = {
  __typename?: 'Action_max_fields';
  addressA?: Maybe<Scalars['String']['output']>;
  addressB?: Maybe<Scalars['String']['output']>;
  amountA?: Maybe<Scalars['numeric']['output']>;
  amountB?: Maybe<Scalars['numeric']['output']>;
  block?: Maybe<Scalars['numeric']['output']>;
  category?: Maybe<Scalars['actioncategory']['output']>;
  chainId?: Maybe<Scalars['numeric']['output']>;
  contract?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  stream_id?: Maybe<Scalars['String']['output']>;
  subgraphId?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "Action" */
export type Action_Max_Order_By = {
  addressA?: InputMaybe<Order_By>;
  addressB?: InputMaybe<Order_By>;
  amountA?: InputMaybe<Order_By>;
  amountB?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  contract?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  stream_id?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Action_Min_Fields = {
  __typename?: 'Action_min_fields';
  addressA?: Maybe<Scalars['String']['output']>;
  addressB?: Maybe<Scalars['String']['output']>;
  amountA?: Maybe<Scalars['numeric']['output']>;
  amountB?: Maybe<Scalars['numeric']['output']>;
  block?: Maybe<Scalars['numeric']['output']>;
  category?: Maybe<Scalars['actioncategory']['output']>;
  chainId?: Maybe<Scalars['numeric']['output']>;
  contract?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  stream_id?: Maybe<Scalars['String']['output']>;
  subgraphId?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "Action" */
export type Action_Min_Order_By = {
  addressA?: InputMaybe<Order_By>;
  addressB?: InputMaybe<Order_By>;
  amountA?: InputMaybe<Order_By>;
  amountB?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  contract?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  stream_id?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "Action". */
export type Action_Order_By = {
  addressA?: InputMaybe<Order_By>;
  addressB?: InputMaybe<Order_By>;
  amountA?: InputMaybe<Order_By>;
  amountB?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  contract?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  stream?: InputMaybe<Stream_Order_By>;
  stream_id?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "Action" */
export enum Action_Select_Column {
  /** column name */
  AddressA = 'addressA',
  /** column name */
  AddressB = 'addressB',
  /** column name */
  AmountA = 'amountA',
  /** column name */
  AmountB = 'amountB',
  /** column name */
  Block = 'block',
  /** column name */
  Category = 'category',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  Contract = 'contract',
  /** column name */
  Fee = 'fee',
  /** column name */
  From = 'from',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  StreamId = 'stream_id',
  /** column name */
  SubgraphId = 'subgraphId',
  /** column name */
  Timestamp = 'timestamp'
}

/** aggregate stddev on columns */
export type Action_Stddev_Fields = {
  __typename?: 'Action_stddev_fields';
  amountA?: Maybe<Scalars['Float']['output']>;
  amountB?: Maybe<Scalars['Float']['output']>;
  block?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "Action" */
export type Action_Stddev_Order_By = {
  amountA?: InputMaybe<Order_By>;
  amountB?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Action_Stddev_Pop_Fields = {
  __typename?: 'Action_stddev_pop_fields';
  amountA?: Maybe<Scalars['Float']['output']>;
  amountB?: Maybe<Scalars['Float']['output']>;
  block?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "Action" */
export type Action_Stddev_Pop_Order_By = {
  amountA?: InputMaybe<Order_By>;
  amountB?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Action_Stddev_Samp_Fields = {
  __typename?: 'Action_stddev_samp_fields';
  amountA?: Maybe<Scalars['Float']['output']>;
  amountB?: Maybe<Scalars['Float']['output']>;
  block?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "Action" */
export type Action_Stddev_Samp_Order_By = {
  amountA?: InputMaybe<Order_By>;
  amountB?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
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
  addressA?: InputMaybe<Scalars['String']['input']>;
  addressB?: InputMaybe<Scalars['String']['input']>;
  amountA?: InputMaybe<Scalars['numeric']['input']>;
  amountB?: InputMaybe<Scalars['numeric']['input']>;
  block?: InputMaybe<Scalars['numeric']['input']>;
  category?: InputMaybe<Scalars['actioncategory']['input']>;
  chainId?: InputMaybe<Scalars['numeric']['input']>;
  contract?: InputMaybe<Scalars['String']['input']>;
  fee?: InputMaybe<Scalars['numeric']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  stream_id?: InputMaybe<Scalars['String']['input']>;
  subgraphId?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Action_Sum_Fields = {
  __typename?: 'Action_sum_fields';
  amountA?: Maybe<Scalars['numeric']['output']>;
  amountB?: Maybe<Scalars['numeric']['output']>;
  block?: Maybe<Scalars['numeric']['output']>;
  chainId?: Maybe<Scalars['numeric']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  subgraphId?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "Action" */
export type Action_Sum_Order_By = {
  amountA?: InputMaybe<Order_By>;
  amountB?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Action_Var_Pop_Fields = {
  __typename?: 'Action_var_pop_fields';
  amountA?: Maybe<Scalars['Float']['output']>;
  amountB?: Maybe<Scalars['Float']['output']>;
  block?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "Action" */
export type Action_Var_Pop_Order_By = {
  amountA?: InputMaybe<Order_By>;
  amountB?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Action_Var_Samp_Fields = {
  __typename?: 'Action_var_samp_fields';
  amountA?: Maybe<Scalars['Float']['output']>;
  amountB?: Maybe<Scalars['Float']['output']>;
  block?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "Action" */
export type Action_Var_Samp_Order_By = {
  amountA?: InputMaybe<Order_By>;
  amountB?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Action_Variance_Fields = {
  __typename?: 'Action_variance_fields';
  amountA?: Maybe<Scalars['Float']['output']>;
  amountB?: Maybe<Scalars['Float']['output']>;
  block?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "Action" */
export type Action_Variance_Order_By = {
  amountA?: InputMaybe<Order_By>;
  amountB?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** columns and relationships of "Asset" */
export type Asset = {
  __typename?: 'Asset';
  address: Scalars['String']['output'];
  chainId: Scalars['numeric']['output'];
  decimals: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** An array relationship */
  streams: Array<Stream>;
  /** An aggregate relationship */
  streams_aggregate: Stream_Aggregate;
  symbol: Scalars['String']['output'];
};


/** columns and relationships of "Asset" */
export type AssetStreamsArgs = {
  distinct_on?: InputMaybe<Array<Stream_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stream_Order_By>>;
  where?: InputMaybe<Stream_Bool_Exp>;
};


/** columns and relationships of "Asset" */
export type AssetStreams_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Stream_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stream_Order_By>>;
  where?: InputMaybe<Stream_Bool_Exp>;
};

/** aggregated selection of "Asset" */
export type Asset_Aggregate = {
  __typename?: 'Asset_aggregate';
  aggregate?: Maybe<Asset_Aggregate_Fields>;
  nodes: Array<Asset>;
};

/** aggregate fields of "Asset" */
export type Asset_Aggregate_Fields = {
  __typename?: 'Asset_aggregate_fields';
  avg?: Maybe<Asset_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Asset_Max_Fields>;
  min?: Maybe<Asset_Min_Fields>;
  stddev?: Maybe<Asset_Stddev_Fields>;
  stddev_pop?: Maybe<Asset_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Asset_Stddev_Samp_Fields>;
  sum?: Maybe<Asset_Sum_Fields>;
  var_pop?: Maybe<Asset_Var_Pop_Fields>;
  var_samp?: Maybe<Asset_Var_Samp_Fields>;
  variance?: Maybe<Asset_Variance_Fields>;
};


/** aggregate fields of "Asset" */
export type Asset_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Asset_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Asset_Avg_Fields = {
  __typename?: 'Asset_avg_fields';
  chainId?: Maybe<Scalars['Float']['output']>;
  decimals?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "Asset". All fields are combined with a logical 'AND'. */
export type Asset_Bool_Exp = {
  _and?: InputMaybe<Array<Asset_Bool_Exp>>;
  _not?: InputMaybe<Asset_Bool_Exp>;
  _or?: InputMaybe<Array<Asset_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  chainId?: InputMaybe<Numeric_Comparison_Exp>;
  decimals?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  streams?: InputMaybe<Stream_Bool_Exp>;
  streams_aggregate?: InputMaybe<Stream_Aggregate_Bool_Exp>;
  symbol?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Asset_Max_Fields = {
  __typename?: 'Asset_max_fields';
  address?: Maybe<Scalars['String']['output']>;
  chainId?: Maybe<Scalars['numeric']['output']>;
  decimals?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Asset_Min_Fields = {
  __typename?: 'Asset_min_fields';
  address?: Maybe<Scalars['String']['output']>;
  chainId?: Maybe<Scalars['numeric']['output']>;
  decimals?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "Asset". */
export type Asset_Order_By = {
  address?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  decimals?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  streams_aggregate?: InputMaybe<Stream_Aggregate_Order_By>;
  symbol?: InputMaybe<Order_By>;
};

/** select columns of table "Asset" */
export enum Asset_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  Decimals = 'decimals',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Symbol = 'symbol'
}

/** aggregate stddev on columns */
export type Asset_Stddev_Fields = {
  __typename?: 'Asset_stddev_fields';
  chainId?: Maybe<Scalars['Float']['output']>;
  decimals?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Asset_Stddev_Pop_Fields = {
  __typename?: 'Asset_stddev_pop_fields';
  chainId?: Maybe<Scalars['Float']['output']>;
  decimals?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Asset_Stddev_Samp_Fields = {
  __typename?: 'Asset_stddev_samp_fields';
  chainId?: Maybe<Scalars['Float']['output']>;
  decimals?: Maybe<Scalars['Float']['output']>;
};

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
  decimals?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Asset_Sum_Fields = {
  __typename?: 'Asset_sum_fields';
  chainId?: Maybe<Scalars['numeric']['output']>;
  decimals?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Asset_Var_Pop_Fields = {
  __typename?: 'Asset_var_pop_fields';
  chainId?: Maybe<Scalars['Float']['output']>;
  decimals?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Asset_Var_Samp_Fields = {
  __typename?: 'Asset_var_samp_fields';
  chainId?: Maybe<Scalars['Float']['output']>;
  decimals?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Asset_Variance_Fields = {
  __typename?: 'Asset_variance_fields';
  chainId?: Maybe<Scalars['Float']['output']>;
  decimals?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "Batch" */
export type Batch = {
  __typename?: 'Batch';
  /** An object relationship */
  batcher?: Maybe<Batcher>;
  batcher_id?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  position?: Maybe<Scalars['numeric']['output']>;
  size: Scalars['numeric']['output'];
  /** An array relationship */
  streams: Array<Stream>;
  /** An aggregate relationship */
  streams_aggregate: Stream_Aggregate;
  timestamp?: Maybe<Scalars['numeric']['output']>;
};


/** columns and relationships of "Batch" */
export type BatchStreamsArgs = {
  distinct_on?: InputMaybe<Array<Stream_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stream_Order_By>>;
  where?: InputMaybe<Stream_Bool_Exp>;
};


/** columns and relationships of "Batch" */
export type BatchStreams_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Stream_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stream_Order_By>>;
  where?: InputMaybe<Stream_Bool_Exp>;
};

/** aggregated selection of "Batch" */
export type Batch_Aggregate = {
  __typename?: 'Batch_aggregate';
  aggregate?: Maybe<Batch_Aggregate_Fields>;
  nodes: Array<Batch>;
};

export type Batch_Aggregate_Bool_Exp = {
  count?: InputMaybe<Batch_Aggregate_Bool_Exp_Count>;
};

export type Batch_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Batch_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Batch_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "Batch" */
export type Batch_Aggregate_Fields = {
  __typename?: 'Batch_aggregate_fields';
  avg?: Maybe<Batch_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Batch_Max_Fields>;
  min?: Maybe<Batch_Min_Fields>;
  stddev?: Maybe<Batch_Stddev_Fields>;
  stddev_pop?: Maybe<Batch_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Batch_Stddev_Samp_Fields>;
  sum?: Maybe<Batch_Sum_Fields>;
  var_pop?: Maybe<Batch_Var_Pop_Fields>;
  var_samp?: Maybe<Batch_Var_Samp_Fields>;
  variance?: Maybe<Batch_Variance_Fields>;
};


/** aggregate fields of "Batch" */
export type Batch_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Batch_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "Batch" */
export type Batch_Aggregate_Order_By = {
  avg?: InputMaybe<Batch_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Batch_Max_Order_By>;
  min?: InputMaybe<Batch_Min_Order_By>;
  stddev?: InputMaybe<Batch_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Batch_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Batch_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Batch_Sum_Order_By>;
  var_pop?: InputMaybe<Batch_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Batch_Var_Samp_Order_By>;
  variance?: InputMaybe<Batch_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Batch_Avg_Fields = {
  __typename?: 'Batch_avg_fields';
  position?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "Batch" */
export type Batch_Avg_Order_By = {
  position?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Batch". All fields are combined with a logical 'AND'. */
export type Batch_Bool_Exp = {
  _and?: InputMaybe<Array<Batch_Bool_Exp>>;
  _not?: InputMaybe<Batch_Bool_Exp>;
  _or?: InputMaybe<Array<Batch_Bool_Exp>>;
  batcher?: InputMaybe<Batcher_Bool_Exp>;
  batcher_id?: InputMaybe<String_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  position?: InputMaybe<Numeric_Comparison_Exp>;
  size?: InputMaybe<Numeric_Comparison_Exp>;
  streams?: InputMaybe<Stream_Bool_Exp>;
  streams_aggregate?: InputMaybe<Stream_Aggregate_Bool_Exp>;
  timestamp?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Batch_Max_Fields = {
  __typename?: 'Batch_max_fields';
  batcher_id?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['numeric']['output']>;
  size?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "Batch" */
export type Batch_Max_Order_By = {
  batcher_id?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Batch_Min_Fields = {
  __typename?: 'Batch_min_fields';
  batcher_id?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['numeric']['output']>;
  size?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "Batch" */
export type Batch_Min_Order_By = {
  batcher_id?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "Batch". */
export type Batch_Order_By = {
  batcher?: InputMaybe<Batcher_Order_By>;
  batcher_id?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  streams_aggregate?: InputMaybe<Stream_Aggregate_Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "Batch" */
export enum Batch_Select_Column {
  /** column name */
  BatcherId = 'batcher_id',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  Position = 'position',
  /** column name */
  Size = 'size',
  /** column name */
  Timestamp = 'timestamp'
}

/** aggregate stddev on columns */
export type Batch_Stddev_Fields = {
  __typename?: 'Batch_stddev_fields';
  position?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "Batch" */
export type Batch_Stddev_Order_By = {
  position?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Batch_Stddev_Pop_Fields = {
  __typename?: 'Batch_stddev_pop_fields';
  position?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "Batch" */
export type Batch_Stddev_Pop_Order_By = {
  position?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Batch_Stddev_Samp_Fields = {
  __typename?: 'Batch_stddev_samp_fields';
  position?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "Batch" */
export type Batch_Stddev_Samp_Order_By = {
  position?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "Batch" */
export type Batch_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Batch_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Batch_Stream_Cursor_Value_Input = {
  batcher_id?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['numeric']['input']>;
  size?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Batch_Sum_Fields = {
  __typename?: 'Batch_sum_fields';
  position?: Maybe<Scalars['numeric']['output']>;
  size?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "Batch" */
export type Batch_Sum_Order_By = {
  position?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Batch_Var_Pop_Fields = {
  __typename?: 'Batch_var_pop_fields';
  position?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "Batch" */
export type Batch_Var_Pop_Order_By = {
  position?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Batch_Var_Samp_Fields = {
  __typename?: 'Batch_var_samp_fields';
  position?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "Batch" */
export type Batch_Var_Samp_Order_By = {
  position?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Batch_Variance_Fields = {
  __typename?: 'Batch_variance_fields';
  position?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "Batch" */
export type Batch_Variance_Order_By = {
  position?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** columns and relationships of "Batcher" */
export type Batcher = {
  __typename?: 'Batcher';
  batchCounter: Scalars['numeric']['output'];
  /** An array relationship */
  batches: Array<Batch>;
  /** An aggregate relationship */
  batches_aggregate: Batch_Aggregate;
  id: Scalars['String']['output'];
};


/** columns and relationships of "Batcher" */
export type BatcherBatchesArgs = {
  distinct_on?: InputMaybe<Array<Batch_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Batch_Order_By>>;
  where?: InputMaybe<Batch_Bool_Exp>;
};


/** columns and relationships of "Batcher" */
export type BatcherBatches_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Batch_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Batch_Order_By>>;
  where?: InputMaybe<Batch_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "Batcher". All fields are combined with a logical 'AND'. */
export type Batcher_Bool_Exp = {
  _and?: InputMaybe<Array<Batcher_Bool_Exp>>;
  _not?: InputMaybe<Batcher_Bool_Exp>;
  _or?: InputMaybe<Array<Batcher_Bool_Exp>>;
  batchCounter?: InputMaybe<Numeric_Comparison_Exp>;
  batches?: InputMaybe<Batch_Bool_Exp>;
  batches_aggregate?: InputMaybe<Batch_Aggregate_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Batcher". */
export type Batcher_Order_By = {
  batchCounter?: InputMaybe<Order_By>;
  batches_aggregate?: InputMaybe<Batch_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
};

/** select columns of table "Batcher" */
export enum Batcher_Select_Column {
  /** column name */
  BatchCounter = 'batchCounter',
  /** column name */
  Id = 'id'
}

/** Streaming cursor of the table "Batcher" */
export type Batcher_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Batcher_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Batcher_Stream_Cursor_Value_Input = {
  batchCounter?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
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

/** columns and relationships of "Contract" */
export type Contract = {
  __typename?: 'Contract';
  address: Scalars['String']['output'];
  alias: Scalars['String']['output'];
  category: Scalars['String']['output'];
  chainId: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "Contract". All fields are combined with a logical 'AND'. */
export type Contract_Bool_Exp = {
  _and?: InputMaybe<Array<Contract_Bool_Exp>>;
  _not?: InputMaybe<Contract_Bool_Exp>;
  _or?: InputMaybe<Array<Contract_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  alias?: InputMaybe<String_Comparison_Exp>;
  category?: InputMaybe<String_Comparison_Exp>;
  chainId?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Contract". */
export type Contract_Order_By = {
  address?: InputMaybe<Order_By>;
  alias?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** select columns of table "Contract" */
export enum Contract_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Alias = 'alias',
  /** column name */
  Category = 'category',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  Id = 'id'
}

/** Streaming cursor of the table "Contract" */
export type Contract_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Contract_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Contract_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  alias?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  chainId?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "DeprecatedStream" */
export type DeprecatedStream = {
  __typename?: 'DeprecatedStream';
  chainId: Scalars['numeric']['output'];
  contractAddress: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['numeric']['output'];
  tokenId: Scalars['numeric']['output'];
};

/** Boolean expression to filter rows from the table "DeprecatedStream". All fields are combined with a logical 'AND'. */
export type DeprecatedStream_Bool_Exp = {
  _and?: InputMaybe<Array<DeprecatedStream_Bool_Exp>>;
  _not?: InputMaybe<DeprecatedStream_Bool_Exp>;
  _or?: InputMaybe<Array<DeprecatedStream_Bool_Exp>>;
  chainId?: InputMaybe<Numeric_Comparison_Exp>;
  contractAddress?: InputMaybe<String_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Numeric_Comparison_Exp>;
  tokenId?: InputMaybe<Numeric_Comparison_Exp>;
};

/** Ordering options when selecting data from "DeprecatedStream". */
export type DeprecatedStream_Order_By = {
  chainId?: InputMaybe<Order_By>;
  contractAddress?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
};

/** select columns of table "DeprecatedStream" */
export enum DeprecatedStream_Select_Column {
  /** column name */
  ChainId = 'chainId',
  /** column name */
  ContractAddress = 'contractAddress',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TokenId = 'tokenId'
}

/** Streaming cursor of the table "DeprecatedStream" */
export type DeprecatedStream_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: DeprecatedStream_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type DeprecatedStream_Stream_Cursor_Value_Input = {
  chainId?: InputMaybe<Scalars['numeric']['input']>;
  contractAddress?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
  tokenId?: InputMaybe<Scalars['numeric']['input']>;
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

/** columns and relationships of "Stream" */
export type Stream = {
  __typename?: 'Stream';
  /** An array relationship */
  actions: Array<Action>;
  /** An aggregate relationship */
  actions_aggregate: Action_Aggregate;
  alias: Scalars['String']['output'];
  /** An object relationship */
  asset?: Maybe<Asset>;
  assetDecimalsValue: Scalars['numeric']['output'];
  asset_id: Scalars['String']['output'];
  availableAmount: Scalars['numeric']['output'];
  /** An object relationship */
  batch?: Maybe<Batch>;
  batch_id: Scalars['String']['output'];
  category: Scalars['streamcategory']['output'];
  chainId: Scalars['numeric']['output'];
  contract: Scalars['String']['output'];
  creator: Scalars['String']['output'];
  depletionTime: Scalars['numeric']['output'];
  depositedAmount: Scalars['numeric']['output'];
  forgivenDebt: Scalars['numeric']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  /** An object relationship */
  lastAdjustmentAction?: Maybe<Action>;
  lastAdjustmentAction_id?: Maybe<Scalars['String']['output']>;
  lastAdjustmentTimestamp: Scalars['numeric']['output'];
  paused: Scalars['Boolean']['output'];
  /** An object relationship */
  pausedAction?: Maybe<Action>;
  pausedAction_id?: Maybe<Scalars['String']['output']>;
  pausedTime?: Maybe<Scalars['numeric']['output']>;
  position: Scalars['numeric']['output'];
  ratePerSecond: Scalars['numeric']['output'];
  recipient: Scalars['String']['output'];
  refundedAmount: Scalars['numeric']['output'];
  sender: Scalars['String']['output'];
  snapshotAmount: Scalars['numeric']['output'];
  startTime: Scalars['numeric']['output'];
  subgraphId: Scalars['numeric']['output'];
  timestamp: Scalars['numeric']['output'];
  tokenId: Scalars['numeric']['output'];
  transferable: Scalars['Boolean']['output'];
  version: Scalars['String']['output'];
  voided: Scalars['Boolean']['output'];
  /** An object relationship */
  voidedAction?: Maybe<Action>;
  voidedAction_id?: Maybe<Scalars['String']['output']>;
  voidedTime?: Maybe<Scalars['numeric']['output']>;
  withdrawnAmount: Scalars['numeric']['output'];
};


/** columns and relationships of "Stream" */
export type StreamActionsArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


/** columns and relationships of "Stream" */
export type StreamActions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};

/** aggregated selection of "Stream" */
export type Stream_Aggregate = {
  __typename?: 'Stream_aggregate';
  aggregate?: Maybe<Stream_Aggregate_Fields>;
  nodes: Array<Stream>;
};

export type Stream_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Stream_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Stream_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Stream_Aggregate_Bool_Exp_Count>;
};

export type Stream_Aggregate_Bool_Exp_Bool_And = {
  arguments: Stream_Select_Column_Stream_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Stream_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Stream_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Stream_Select_Column_Stream_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Stream_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Stream_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Stream_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Stream_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "Stream" */
export type Stream_Aggregate_Fields = {
  __typename?: 'Stream_aggregate_fields';
  avg?: Maybe<Stream_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Stream_Max_Fields>;
  min?: Maybe<Stream_Min_Fields>;
  stddev?: Maybe<Stream_Stddev_Fields>;
  stddev_pop?: Maybe<Stream_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Stream_Stddev_Samp_Fields>;
  sum?: Maybe<Stream_Sum_Fields>;
  var_pop?: Maybe<Stream_Var_Pop_Fields>;
  var_samp?: Maybe<Stream_Var_Samp_Fields>;
  variance?: Maybe<Stream_Variance_Fields>;
};


/** aggregate fields of "Stream" */
export type Stream_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Stream_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "Stream" */
export type Stream_Aggregate_Order_By = {
  avg?: InputMaybe<Stream_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Stream_Max_Order_By>;
  min?: InputMaybe<Stream_Min_Order_By>;
  stddev?: InputMaybe<Stream_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Stream_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Stream_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Stream_Sum_Order_By>;
  var_pop?: InputMaybe<Stream_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Stream_Var_Samp_Order_By>;
  variance?: InputMaybe<Stream_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Stream_Avg_Fields = {
  __typename?: 'Stream_avg_fields';
  assetDecimalsValue?: Maybe<Scalars['Float']['output']>;
  availableAmount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  depletionTime?: Maybe<Scalars['Float']['output']>;
  depositedAmount?: Maybe<Scalars['Float']['output']>;
  forgivenDebt?: Maybe<Scalars['Float']['output']>;
  lastAdjustmentTimestamp?: Maybe<Scalars['Float']['output']>;
  pausedTime?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  ratePerSecond?: Maybe<Scalars['Float']['output']>;
  refundedAmount?: Maybe<Scalars['Float']['output']>;
  snapshotAmount?: Maybe<Scalars['Float']['output']>;
  startTime?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  tokenId?: Maybe<Scalars['Float']['output']>;
  voidedTime?: Maybe<Scalars['Float']['output']>;
  withdrawnAmount?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "Stream" */
export type Stream_Avg_Order_By = {
  assetDecimalsValue?: InputMaybe<Order_By>;
  availableAmount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  depletionTime?: InputMaybe<Order_By>;
  depositedAmount?: InputMaybe<Order_By>;
  forgivenDebt?: InputMaybe<Order_By>;
  lastAdjustmentTimestamp?: InputMaybe<Order_By>;
  pausedTime?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  ratePerSecond?: InputMaybe<Order_By>;
  refundedAmount?: InputMaybe<Order_By>;
  snapshotAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  voidedTime?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Stream". All fields are combined with a logical 'AND'. */
export type Stream_Bool_Exp = {
  _and?: InputMaybe<Array<Stream_Bool_Exp>>;
  _not?: InputMaybe<Stream_Bool_Exp>;
  _or?: InputMaybe<Array<Stream_Bool_Exp>>;
  actions?: InputMaybe<Action_Bool_Exp>;
  actions_aggregate?: InputMaybe<Action_Aggregate_Bool_Exp>;
  alias?: InputMaybe<String_Comparison_Exp>;
  asset?: InputMaybe<Asset_Bool_Exp>;
  assetDecimalsValue?: InputMaybe<Numeric_Comparison_Exp>;
  asset_id?: InputMaybe<String_Comparison_Exp>;
  availableAmount?: InputMaybe<Numeric_Comparison_Exp>;
  batch?: InputMaybe<Batch_Bool_Exp>;
  batch_id?: InputMaybe<String_Comparison_Exp>;
  category?: InputMaybe<Streamcategory_Comparison_Exp>;
  chainId?: InputMaybe<Numeric_Comparison_Exp>;
  contract?: InputMaybe<String_Comparison_Exp>;
  creator?: InputMaybe<String_Comparison_Exp>;
  depletionTime?: InputMaybe<Numeric_Comparison_Exp>;
  depositedAmount?: InputMaybe<Numeric_Comparison_Exp>;
  forgivenDebt?: InputMaybe<Numeric_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  lastAdjustmentAction?: InputMaybe<Action_Bool_Exp>;
  lastAdjustmentAction_id?: InputMaybe<String_Comparison_Exp>;
  lastAdjustmentTimestamp?: InputMaybe<Numeric_Comparison_Exp>;
  paused?: InputMaybe<Boolean_Comparison_Exp>;
  pausedAction?: InputMaybe<Action_Bool_Exp>;
  pausedAction_id?: InputMaybe<String_Comparison_Exp>;
  pausedTime?: InputMaybe<Numeric_Comparison_Exp>;
  position?: InputMaybe<Numeric_Comparison_Exp>;
  ratePerSecond?: InputMaybe<Numeric_Comparison_Exp>;
  recipient?: InputMaybe<String_Comparison_Exp>;
  refundedAmount?: InputMaybe<Numeric_Comparison_Exp>;
  sender?: InputMaybe<String_Comparison_Exp>;
  snapshotAmount?: InputMaybe<Numeric_Comparison_Exp>;
  startTime?: InputMaybe<Numeric_Comparison_Exp>;
  subgraphId?: InputMaybe<Numeric_Comparison_Exp>;
  timestamp?: InputMaybe<Numeric_Comparison_Exp>;
  tokenId?: InputMaybe<Numeric_Comparison_Exp>;
  transferable?: InputMaybe<Boolean_Comparison_Exp>;
  version?: InputMaybe<String_Comparison_Exp>;
  voided?: InputMaybe<Boolean_Comparison_Exp>;
  voidedAction?: InputMaybe<Action_Bool_Exp>;
  voidedAction_id?: InputMaybe<String_Comparison_Exp>;
  voidedTime?: InputMaybe<Numeric_Comparison_Exp>;
  withdrawnAmount?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Stream_Max_Fields = {
  __typename?: 'Stream_max_fields';
  alias?: Maybe<Scalars['String']['output']>;
  assetDecimalsValue?: Maybe<Scalars['numeric']['output']>;
  asset_id?: Maybe<Scalars['String']['output']>;
  availableAmount?: Maybe<Scalars['numeric']['output']>;
  batch_id?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['streamcategory']['output']>;
  chainId?: Maybe<Scalars['numeric']['output']>;
  contract?: Maybe<Scalars['String']['output']>;
  creator?: Maybe<Scalars['String']['output']>;
  depletionTime?: Maybe<Scalars['numeric']['output']>;
  depositedAmount?: Maybe<Scalars['numeric']['output']>;
  forgivenDebt?: Maybe<Scalars['numeric']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lastAdjustmentAction_id?: Maybe<Scalars['String']['output']>;
  lastAdjustmentTimestamp?: Maybe<Scalars['numeric']['output']>;
  pausedAction_id?: Maybe<Scalars['String']['output']>;
  pausedTime?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['numeric']['output']>;
  ratePerSecond?: Maybe<Scalars['numeric']['output']>;
  recipient?: Maybe<Scalars['String']['output']>;
  refundedAmount?: Maybe<Scalars['numeric']['output']>;
  sender?: Maybe<Scalars['String']['output']>;
  snapshotAmount?: Maybe<Scalars['numeric']['output']>;
  startTime?: Maybe<Scalars['numeric']['output']>;
  subgraphId?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
  tokenId?: Maybe<Scalars['numeric']['output']>;
  version?: Maybe<Scalars['String']['output']>;
  voidedAction_id?: Maybe<Scalars['String']['output']>;
  voidedTime?: Maybe<Scalars['numeric']['output']>;
  withdrawnAmount?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "Stream" */
export type Stream_Max_Order_By = {
  alias?: InputMaybe<Order_By>;
  assetDecimalsValue?: InputMaybe<Order_By>;
  asset_id?: InputMaybe<Order_By>;
  availableAmount?: InputMaybe<Order_By>;
  batch_id?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  contract?: InputMaybe<Order_By>;
  creator?: InputMaybe<Order_By>;
  depletionTime?: InputMaybe<Order_By>;
  depositedAmount?: InputMaybe<Order_By>;
  forgivenDebt?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastAdjustmentAction_id?: InputMaybe<Order_By>;
  lastAdjustmentTimestamp?: InputMaybe<Order_By>;
  pausedAction_id?: InputMaybe<Order_By>;
  pausedTime?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  ratePerSecond?: InputMaybe<Order_By>;
  recipient?: InputMaybe<Order_By>;
  refundedAmount?: InputMaybe<Order_By>;
  sender?: InputMaybe<Order_By>;
  snapshotAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
  voidedAction_id?: InputMaybe<Order_By>;
  voidedTime?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Stream_Min_Fields = {
  __typename?: 'Stream_min_fields';
  alias?: Maybe<Scalars['String']['output']>;
  assetDecimalsValue?: Maybe<Scalars['numeric']['output']>;
  asset_id?: Maybe<Scalars['String']['output']>;
  availableAmount?: Maybe<Scalars['numeric']['output']>;
  batch_id?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['streamcategory']['output']>;
  chainId?: Maybe<Scalars['numeric']['output']>;
  contract?: Maybe<Scalars['String']['output']>;
  creator?: Maybe<Scalars['String']['output']>;
  depletionTime?: Maybe<Scalars['numeric']['output']>;
  depositedAmount?: Maybe<Scalars['numeric']['output']>;
  forgivenDebt?: Maybe<Scalars['numeric']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lastAdjustmentAction_id?: Maybe<Scalars['String']['output']>;
  lastAdjustmentTimestamp?: Maybe<Scalars['numeric']['output']>;
  pausedAction_id?: Maybe<Scalars['String']['output']>;
  pausedTime?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['numeric']['output']>;
  ratePerSecond?: Maybe<Scalars['numeric']['output']>;
  recipient?: Maybe<Scalars['String']['output']>;
  refundedAmount?: Maybe<Scalars['numeric']['output']>;
  sender?: Maybe<Scalars['String']['output']>;
  snapshotAmount?: Maybe<Scalars['numeric']['output']>;
  startTime?: Maybe<Scalars['numeric']['output']>;
  subgraphId?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
  tokenId?: Maybe<Scalars['numeric']['output']>;
  version?: Maybe<Scalars['String']['output']>;
  voidedAction_id?: Maybe<Scalars['String']['output']>;
  voidedTime?: Maybe<Scalars['numeric']['output']>;
  withdrawnAmount?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "Stream" */
export type Stream_Min_Order_By = {
  alias?: InputMaybe<Order_By>;
  assetDecimalsValue?: InputMaybe<Order_By>;
  asset_id?: InputMaybe<Order_By>;
  availableAmount?: InputMaybe<Order_By>;
  batch_id?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  contract?: InputMaybe<Order_By>;
  creator?: InputMaybe<Order_By>;
  depletionTime?: InputMaybe<Order_By>;
  depositedAmount?: InputMaybe<Order_By>;
  forgivenDebt?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastAdjustmentAction_id?: InputMaybe<Order_By>;
  lastAdjustmentTimestamp?: InputMaybe<Order_By>;
  pausedAction_id?: InputMaybe<Order_By>;
  pausedTime?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  ratePerSecond?: InputMaybe<Order_By>;
  recipient?: InputMaybe<Order_By>;
  refundedAmount?: InputMaybe<Order_By>;
  sender?: InputMaybe<Order_By>;
  snapshotAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
  voidedAction_id?: InputMaybe<Order_By>;
  voidedTime?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "Stream". */
export type Stream_Order_By = {
  actions_aggregate?: InputMaybe<Action_Aggregate_Order_By>;
  alias?: InputMaybe<Order_By>;
  asset?: InputMaybe<Asset_Order_By>;
  assetDecimalsValue?: InputMaybe<Order_By>;
  asset_id?: InputMaybe<Order_By>;
  availableAmount?: InputMaybe<Order_By>;
  batch?: InputMaybe<Batch_Order_By>;
  batch_id?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  contract?: InputMaybe<Order_By>;
  creator?: InputMaybe<Order_By>;
  depletionTime?: InputMaybe<Order_By>;
  depositedAmount?: InputMaybe<Order_By>;
  forgivenDebt?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastAdjustmentAction?: InputMaybe<Action_Order_By>;
  lastAdjustmentAction_id?: InputMaybe<Order_By>;
  lastAdjustmentTimestamp?: InputMaybe<Order_By>;
  paused?: InputMaybe<Order_By>;
  pausedAction?: InputMaybe<Action_Order_By>;
  pausedAction_id?: InputMaybe<Order_By>;
  pausedTime?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  ratePerSecond?: InputMaybe<Order_By>;
  recipient?: InputMaybe<Order_By>;
  refundedAmount?: InputMaybe<Order_By>;
  sender?: InputMaybe<Order_By>;
  snapshotAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  transferable?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
  voided?: InputMaybe<Order_By>;
  voidedAction?: InputMaybe<Action_Order_By>;
  voidedAction_id?: InputMaybe<Order_By>;
  voidedTime?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
};

/** select columns of table "Stream" */
export enum Stream_Select_Column {
  /** column name */
  Alias = 'alias',
  /** column name */
  AssetDecimalsValue = 'assetDecimalsValue',
  /** column name */
  AssetId = 'asset_id',
  /** column name */
  AvailableAmount = 'availableAmount',
  /** column name */
  BatchId = 'batch_id',
  /** column name */
  Category = 'category',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  Contract = 'contract',
  /** column name */
  Creator = 'creator',
  /** column name */
  DepletionTime = 'depletionTime',
  /** column name */
  DepositedAmount = 'depositedAmount',
  /** column name */
  ForgivenDebt = 'forgivenDebt',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  LastAdjustmentActionId = 'lastAdjustmentAction_id',
  /** column name */
  LastAdjustmentTimestamp = 'lastAdjustmentTimestamp',
  /** column name */
  Paused = 'paused',
  /** column name */
  PausedActionId = 'pausedAction_id',
  /** column name */
  PausedTime = 'pausedTime',
  /** column name */
  Position = 'position',
  /** column name */
  RatePerSecond = 'ratePerSecond',
  /** column name */
  Recipient = 'recipient',
  /** column name */
  RefundedAmount = 'refundedAmount',
  /** column name */
  Sender = 'sender',
  /** column name */
  SnapshotAmount = 'snapshotAmount',
  /** column name */
  StartTime = 'startTime',
  /** column name */
  SubgraphId = 'subgraphId',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TokenId = 'tokenId',
  /** column name */
  Transferable = 'transferable',
  /** column name */
  Version = 'version',
  /** column name */
  Voided = 'voided',
  /** column name */
  VoidedActionId = 'voidedAction_id',
  /** column name */
  VoidedTime = 'voidedTime',
  /** column name */
  WithdrawnAmount = 'withdrawnAmount'
}

/** select "Stream_aggregate_bool_exp_bool_and_arguments_columns" columns of table "Stream" */
export enum Stream_Select_Column_Stream_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Paused = 'paused',
  /** column name */
  Transferable = 'transferable',
  /** column name */
  Voided = 'voided'
}

/** select "Stream_aggregate_bool_exp_bool_or_arguments_columns" columns of table "Stream" */
export enum Stream_Select_Column_Stream_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Paused = 'paused',
  /** column name */
  Transferable = 'transferable',
  /** column name */
  Voided = 'voided'
}

/** aggregate stddev on columns */
export type Stream_Stddev_Fields = {
  __typename?: 'Stream_stddev_fields';
  assetDecimalsValue?: Maybe<Scalars['Float']['output']>;
  availableAmount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  depletionTime?: Maybe<Scalars['Float']['output']>;
  depositedAmount?: Maybe<Scalars['Float']['output']>;
  forgivenDebt?: Maybe<Scalars['Float']['output']>;
  lastAdjustmentTimestamp?: Maybe<Scalars['Float']['output']>;
  pausedTime?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  ratePerSecond?: Maybe<Scalars['Float']['output']>;
  refundedAmount?: Maybe<Scalars['Float']['output']>;
  snapshotAmount?: Maybe<Scalars['Float']['output']>;
  startTime?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  tokenId?: Maybe<Scalars['Float']['output']>;
  voidedTime?: Maybe<Scalars['Float']['output']>;
  withdrawnAmount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "Stream" */
export type Stream_Stddev_Order_By = {
  assetDecimalsValue?: InputMaybe<Order_By>;
  availableAmount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  depletionTime?: InputMaybe<Order_By>;
  depositedAmount?: InputMaybe<Order_By>;
  forgivenDebt?: InputMaybe<Order_By>;
  lastAdjustmentTimestamp?: InputMaybe<Order_By>;
  pausedTime?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  ratePerSecond?: InputMaybe<Order_By>;
  refundedAmount?: InputMaybe<Order_By>;
  snapshotAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  voidedTime?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Stream_Stddev_Pop_Fields = {
  __typename?: 'Stream_stddev_pop_fields';
  assetDecimalsValue?: Maybe<Scalars['Float']['output']>;
  availableAmount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  depletionTime?: Maybe<Scalars['Float']['output']>;
  depositedAmount?: Maybe<Scalars['Float']['output']>;
  forgivenDebt?: Maybe<Scalars['Float']['output']>;
  lastAdjustmentTimestamp?: Maybe<Scalars['Float']['output']>;
  pausedTime?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  ratePerSecond?: Maybe<Scalars['Float']['output']>;
  refundedAmount?: Maybe<Scalars['Float']['output']>;
  snapshotAmount?: Maybe<Scalars['Float']['output']>;
  startTime?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  tokenId?: Maybe<Scalars['Float']['output']>;
  voidedTime?: Maybe<Scalars['Float']['output']>;
  withdrawnAmount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "Stream" */
export type Stream_Stddev_Pop_Order_By = {
  assetDecimalsValue?: InputMaybe<Order_By>;
  availableAmount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  depletionTime?: InputMaybe<Order_By>;
  depositedAmount?: InputMaybe<Order_By>;
  forgivenDebt?: InputMaybe<Order_By>;
  lastAdjustmentTimestamp?: InputMaybe<Order_By>;
  pausedTime?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  ratePerSecond?: InputMaybe<Order_By>;
  refundedAmount?: InputMaybe<Order_By>;
  snapshotAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  voidedTime?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Stream_Stddev_Samp_Fields = {
  __typename?: 'Stream_stddev_samp_fields';
  assetDecimalsValue?: Maybe<Scalars['Float']['output']>;
  availableAmount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  depletionTime?: Maybe<Scalars['Float']['output']>;
  depositedAmount?: Maybe<Scalars['Float']['output']>;
  forgivenDebt?: Maybe<Scalars['Float']['output']>;
  lastAdjustmentTimestamp?: Maybe<Scalars['Float']['output']>;
  pausedTime?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  ratePerSecond?: Maybe<Scalars['Float']['output']>;
  refundedAmount?: Maybe<Scalars['Float']['output']>;
  snapshotAmount?: Maybe<Scalars['Float']['output']>;
  startTime?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  tokenId?: Maybe<Scalars['Float']['output']>;
  voidedTime?: Maybe<Scalars['Float']['output']>;
  withdrawnAmount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "Stream" */
export type Stream_Stddev_Samp_Order_By = {
  assetDecimalsValue?: InputMaybe<Order_By>;
  availableAmount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  depletionTime?: InputMaybe<Order_By>;
  depositedAmount?: InputMaybe<Order_By>;
  forgivenDebt?: InputMaybe<Order_By>;
  lastAdjustmentTimestamp?: InputMaybe<Order_By>;
  pausedTime?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  ratePerSecond?: InputMaybe<Order_By>;
  refundedAmount?: InputMaybe<Order_By>;
  snapshotAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  voidedTime?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "Stream" */
export type Stream_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Stream_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Stream_Stream_Cursor_Value_Input = {
  alias?: InputMaybe<Scalars['String']['input']>;
  assetDecimalsValue?: InputMaybe<Scalars['numeric']['input']>;
  asset_id?: InputMaybe<Scalars['String']['input']>;
  availableAmount?: InputMaybe<Scalars['numeric']['input']>;
  batch_id?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['streamcategory']['input']>;
  chainId?: InputMaybe<Scalars['numeric']['input']>;
  contract?: InputMaybe<Scalars['String']['input']>;
  creator?: InputMaybe<Scalars['String']['input']>;
  depletionTime?: InputMaybe<Scalars['numeric']['input']>;
  depositedAmount?: InputMaybe<Scalars['numeric']['input']>;
  forgivenDebt?: InputMaybe<Scalars['numeric']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentAction_id?: InputMaybe<Scalars['String']['input']>;
  lastAdjustmentTimestamp?: InputMaybe<Scalars['numeric']['input']>;
  paused?: InputMaybe<Scalars['Boolean']['input']>;
  pausedAction_id?: InputMaybe<Scalars['String']['input']>;
  pausedTime?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['numeric']['input']>;
  ratePerSecond?: InputMaybe<Scalars['numeric']['input']>;
  recipient?: InputMaybe<Scalars['String']['input']>;
  refundedAmount?: InputMaybe<Scalars['numeric']['input']>;
  sender?: InputMaybe<Scalars['String']['input']>;
  snapshotAmount?: InputMaybe<Scalars['numeric']['input']>;
  startTime?: InputMaybe<Scalars['numeric']['input']>;
  subgraphId?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
  tokenId?: InputMaybe<Scalars['numeric']['input']>;
  transferable?: InputMaybe<Scalars['Boolean']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
  voided?: InputMaybe<Scalars['Boolean']['input']>;
  voidedAction_id?: InputMaybe<Scalars['String']['input']>;
  voidedTime?: InputMaybe<Scalars['numeric']['input']>;
  withdrawnAmount?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Stream_Sum_Fields = {
  __typename?: 'Stream_sum_fields';
  assetDecimalsValue?: Maybe<Scalars['numeric']['output']>;
  availableAmount?: Maybe<Scalars['numeric']['output']>;
  chainId?: Maybe<Scalars['numeric']['output']>;
  depletionTime?: Maybe<Scalars['numeric']['output']>;
  depositedAmount?: Maybe<Scalars['numeric']['output']>;
  forgivenDebt?: Maybe<Scalars['numeric']['output']>;
  lastAdjustmentTimestamp?: Maybe<Scalars['numeric']['output']>;
  pausedTime?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['numeric']['output']>;
  ratePerSecond?: Maybe<Scalars['numeric']['output']>;
  refundedAmount?: Maybe<Scalars['numeric']['output']>;
  snapshotAmount?: Maybe<Scalars['numeric']['output']>;
  startTime?: Maybe<Scalars['numeric']['output']>;
  subgraphId?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
  tokenId?: Maybe<Scalars['numeric']['output']>;
  voidedTime?: Maybe<Scalars['numeric']['output']>;
  withdrawnAmount?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "Stream" */
export type Stream_Sum_Order_By = {
  assetDecimalsValue?: InputMaybe<Order_By>;
  availableAmount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  depletionTime?: InputMaybe<Order_By>;
  depositedAmount?: InputMaybe<Order_By>;
  forgivenDebt?: InputMaybe<Order_By>;
  lastAdjustmentTimestamp?: InputMaybe<Order_By>;
  pausedTime?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  ratePerSecond?: InputMaybe<Order_By>;
  refundedAmount?: InputMaybe<Order_By>;
  snapshotAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  voidedTime?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Stream_Var_Pop_Fields = {
  __typename?: 'Stream_var_pop_fields';
  assetDecimalsValue?: Maybe<Scalars['Float']['output']>;
  availableAmount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  depletionTime?: Maybe<Scalars['Float']['output']>;
  depositedAmount?: Maybe<Scalars['Float']['output']>;
  forgivenDebt?: Maybe<Scalars['Float']['output']>;
  lastAdjustmentTimestamp?: Maybe<Scalars['Float']['output']>;
  pausedTime?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  ratePerSecond?: Maybe<Scalars['Float']['output']>;
  refundedAmount?: Maybe<Scalars['Float']['output']>;
  snapshotAmount?: Maybe<Scalars['Float']['output']>;
  startTime?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  tokenId?: Maybe<Scalars['Float']['output']>;
  voidedTime?: Maybe<Scalars['Float']['output']>;
  withdrawnAmount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "Stream" */
export type Stream_Var_Pop_Order_By = {
  assetDecimalsValue?: InputMaybe<Order_By>;
  availableAmount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  depletionTime?: InputMaybe<Order_By>;
  depositedAmount?: InputMaybe<Order_By>;
  forgivenDebt?: InputMaybe<Order_By>;
  lastAdjustmentTimestamp?: InputMaybe<Order_By>;
  pausedTime?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  ratePerSecond?: InputMaybe<Order_By>;
  refundedAmount?: InputMaybe<Order_By>;
  snapshotAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  voidedTime?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Stream_Var_Samp_Fields = {
  __typename?: 'Stream_var_samp_fields';
  assetDecimalsValue?: Maybe<Scalars['Float']['output']>;
  availableAmount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  depletionTime?: Maybe<Scalars['Float']['output']>;
  depositedAmount?: Maybe<Scalars['Float']['output']>;
  forgivenDebt?: Maybe<Scalars['Float']['output']>;
  lastAdjustmentTimestamp?: Maybe<Scalars['Float']['output']>;
  pausedTime?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  ratePerSecond?: Maybe<Scalars['Float']['output']>;
  refundedAmount?: Maybe<Scalars['Float']['output']>;
  snapshotAmount?: Maybe<Scalars['Float']['output']>;
  startTime?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  tokenId?: Maybe<Scalars['Float']['output']>;
  voidedTime?: Maybe<Scalars['Float']['output']>;
  withdrawnAmount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "Stream" */
export type Stream_Var_Samp_Order_By = {
  assetDecimalsValue?: InputMaybe<Order_By>;
  availableAmount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  depletionTime?: InputMaybe<Order_By>;
  depositedAmount?: InputMaybe<Order_By>;
  forgivenDebt?: InputMaybe<Order_By>;
  lastAdjustmentTimestamp?: InputMaybe<Order_By>;
  pausedTime?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  ratePerSecond?: InputMaybe<Order_By>;
  refundedAmount?: InputMaybe<Order_By>;
  snapshotAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  voidedTime?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Stream_Variance_Fields = {
  __typename?: 'Stream_variance_fields';
  assetDecimalsValue?: Maybe<Scalars['Float']['output']>;
  availableAmount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  depletionTime?: Maybe<Scalars['Float']['output']>;
  depositedAmount?: Maybe<Scalars['Float']['output']>;
  forgivenDebt?: Maybe<Scalars['Float']['output']>;
  lastAdjustmentTimestamp?: Maybe<Scalars['Float']['output']>;
  pausedTime?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  ratePerSecond?: Maybe<Scalars['Float']['output']>;
  refundedAmount?: Maybe<Scalars['Float']['output']>;
  snapshotAmount?: Maybe<Scalars['Float']['output']>;
  startTime?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  tokenId?: Maybe<Scalars['Float']['output']>;
  voidedTime?: Maybe<Scalars['Float']['output']>;
  withdrawnAmount?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "Stream" */
export type Stream_Variance_Order_By = {
  assetDecimalsValue?: InputMaybe<Order_By>;
  availableAmount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  depletionTime?: InputMaybe<Order_By>;
  depositedAmount?: InputMaybe<Order_By>;
  forgivenDebt?: InputMaybe<Order_By>;
  lastAdjustmentTimestamp?: InputMaybe<Order_By>;
  pausedTime?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  ratePerSecond?: InputMaybe<Order_By>;
  refundedAmount?: InputMaybe<Order_By>;
  snapshotAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  voidedTime?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
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

/** columns and relationships of "Watcher" */
export type Watcher = {
  __typename?: 'Watcher';
  actionCounter: Scalars['numeric']['output'];
  chainId: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  streamCounter: Scalars['numeric']['output'];
};

/** Boolean expression to filter rows from the table "Watcher". All fields are combined with a logical 'AND'. */
export type Watcher_Bool_Exp = {
  _and?: InputMaybe<Array<Watcher_Bool_Exp>>;
  _not?: InputMaybe<Watcher_Bool_Exp>;
  _or?: InputMaybe<Array<Watcher_Bool_Exp>>;
  actionCounter?: InputMaybe<Numeric_Comparison_Exp>;
  chainId?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  streamCounter?: InputMaybe<Numeric_Comparison_Exp>;
};

/** Ordering options when selecting data from "Watcher". */
export type Watcher_Order_By = {
  actionCounter?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  streamCounter?: InputMaybe<Order_By>;
};

/** select columns of table "Watcher" */
export enum Watcher_Select_Column {
  /** column name */
  ActionCounter = 'actionCounter',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  Id = 'id',
  /** column name */
  StreamCounter = 'streamCounter'
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
  chainId?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  streamCounter?: InputMaybe<Scalars['numeric']['input']>;
};

/** columns and relationships of "_meta" */
export type _Meta = {
  __typename?: '_meta';
  bufferBlock?: Maybe<Scalars['Int']['output']>;
  chainId?: Maybe<Scalars['Int']['output']>;
  endBlock?: Maybe<Scalars['Int']['output']>;
  eventsProcessed?: Maybe<Scalars['Int']['output']>;
  firstEventBlock?: Maybe<Scalars['Int']['output']>;
  isReady?: Maybe<Scalars['Boolean']['output']>;
  progressBlock?: Maybe<Scalars['Int']['output']>;
  readyAt?: Maybe<Scalars['timestamptz']['output']>;
  sourceBlock?: Maybe<Scalars['Int']['output']>;
  startBlock?: Maybe<Scalars['Int']['output']>;
};

/** Boolean expression to filter rows from the table "_meta". All fields are combined with a logical 'AND'. */
export type _Meta_Bool_Exp = {
  _and?: InputMaybe<Array<_Meta_Bool_Exp>>;
  _not?: InputMaybe<_Meta_Bool_Exp>;
  _or?: InputMaybe<Array<_Meta_Bool_Exp>>;
  bufferBlock?: InputMaybe<Int_Comparison_Exp>;
  chainId?: InputMaybe<Int_Comparison_Exp>;
  endBlock?: InputMaybe<Int_Comparison_Exp>;
  eventsProcessed?: InputMaybe<Int_Comparison_Exp>;
  firstEventBlock?: InputMaybe<Int_Comparison_Exp>;
  isReady?: InputMaybe<Boolean_Comparison_Exp>;
  progressBlock?: InputMaybe<Int_Comparison_Exp>;
  readyAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  sourceBlock?: InputMaybe<Int_Comparison_Exp>;
  startBlock?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "_meta". */
export type _Meta_Order_By = {
  bufferBlock?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  endBlock?: InputMaybe<Order_By>;
  eventsProcessed?: InputMaybe<Order_By>;
  firstEventBlock?: InputMaybe<Order_By>;
  isReady?: InputMaybe<Order_By>;
  progressBlock?: InputMaybe<Order_By>;
  readyAt?: InputMaybe<Order_By>;
  sourceBlock?: InputMaybe<Order_By>;
  startBlock?: InputMaybe<Order_By>;
};

/** select columns of table "_meta" */
export enum _Meta_Select_Column {
  /** column name */
  BufferBlock = 'bufferBlock',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  EndBlock = 'endBlock',
  /** column name */
  EventsProcessed = 'eventsProcessed',
  /** column name */
  FirstEventBlock = 'firstEventBlock',
  /** column name */
  IsReady = 'isReady',
  /** column name */
  ProgressBlock = 'progressBlock',
  /** column name */
  ReadyAt = 'readyAt',
  /** column name */
  SourceBlock = 'sourceBlock',
  /** column name */
  StartBlock = 'startBlock'
}

/** Streaming cursor of the table "_meta" */
export type _Meta_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: _Meta_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type _Meta_Stream_Cursor_Value_Input = {
  bufferBlock?: InputMaybe<Scalars['Int']['input']>;
  chainId?: InputMaybe<Scalars['Int']['input']>;
  endBlock?: InputMaybe<Scalars['Int']['input']>;
  eventsProcessed?: InputMaybe<Scalars['Int']['input']>;
  firstEventBlock?: InputMaybe<Scalars['Int']['input']>;
  isReady?: InputMaybe<Scalars['Boolean']['input']>;
  progressBlock?: InputMaybe<Scalars['Int']['input']>;
  readyAt?: InputMaybe<Scalars['timestamptz']['input']>;
  sourceBlock?: InputMaybe<Scalars['Int']['input']>;
  startBlock?: InputMaybe<Scalars['Int']['input']>;
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

/** columns and relationships of "chain_metadata" */
export type Chain_Metadata = {
  __typename?: 'chain_metadata';
  block_height?: Maybe<Scalars['Int']['output']>;
  chain_id?: Maybe<Scalars['Int']['output']>;
  end_block?: Maybe<Scalars['Int']['output']>;
  first_event_block_number?: Maybe<Scalars['Int']['output']>;
  is_hyper_sync?: Maybe<Scalars['Boolean']['output']>;
  latest_fetched_block_number?: Maybe<Scalars['Int']['output']>;
  latest_processed_block?: Maybe<Scalars['Int']['output']>;
  num_batches_fetched?: Maybe<Scalars['Int']['output']>;
  num_events_processed?: Maybe<Scalars['Int']['output']>;
  start_block?: Maybe<Scalars['Int']['output']>;
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

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

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

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "Action" */
  Action: Array<Action>;
  /** fetch aggregated fields from the table: "Action" */
  Action_aggregate: Action_Aggregate;
  /** fetch data from the table: "Action" using primary key columns */
  Action_by_pk?: Maybe<Action>;
  /** fetch data from the table: "Asset" */
  Asset: Array<Asset>;
  /** fetch aggregated fields from the table: "Asset" */
  Asset_aggregate: Asset_Aggregate;
  /** fetch data from the table: "Asset" using primary key columns */
  Asset_by_pk?: Maybe<Asset>;
  /** fetch data from the table: "Batch" */
  Batch: Array<Batch>;
  /** fetch aggregated fields from the table: "Batch" */
  Batch_aggregate: Batch_Aggregate;
  /** fetch data from the table: "Batch" using primary key columns */
  Batch_by_pk?: Maybe<Batch>;
  /** fetch data from the table: "Batcher" */
  Batcher: Array<Batcher>;
  /** fetch data from the table: "Batcher" using primary key columns */
  Batcher_by_pk?: Maybe<Batcher>;
  /** fetch data from the table: "Contract" */
  Contract: Array<Contract>;
  /** fetch data from the table: "Contract" using primary key columns */
  Contract_by_pk?: Maybe<Contract>;
  /** fetch data from the table: "DeprecatedStream" */
  DeprecatedStream: Array<DeprecatedStream>;
  /** fetch data from the table: "DeprecatedStream" using primary key columns */
  DeprecatedStream_by_pk?: Maybe<DeprecatedStream>;
  /** fetch data from the table: "Stream" */
  Stream: Array<Stream>;
  /** fetch aggregated fields from the table: "Stream" */
  Stream_aggregate: Stream_Aggregate;
  /** fetch data from the table: "Stream" using primary key columns */
  Stream_by_pk?: Maybe<Stream>;
  /** fetch data from the table: "Watcher" */
  Watcher: Array<Watcher>;
  /** fetch data from the table: "Watcher" using primary key columns */
  Watcher_by_pk?: Maybe<Watcher>;
  /** fetch data from the table: "_meta" */
  _meta: Array<_Meta>;
  /** fetch data from the table: "chain_metadata" */
  chain_metadata: Array<Chain_Metadata>;
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


export type Query_RootAction_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Action_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Action_Order_By>>;
  where?: InputMaybe<Action_Bool_Exp>;
};


export type Query_RootAction_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootAssetArgs = {
  distinct_on?: InputMaybe<Array<Asset_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Asset_Order_By>>;
  where?: InputMaybe<Asset_Bool_Exp>;
};


export type Query_RootAsset_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Asset_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Asset_Order_By>>;
  where?: InputMaybe<Asset_Bool_Exp>;
};


export type Query_RootAsset_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootBatchArgs = {
  distinct_on?: InputMaybe<Array<Batch_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Batch_Order_By>>;
  where?: InputMaybe<Batch_Bool_Exp>;
};


export type Query_RootBatch_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Batch_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Batch_Order_By>>;
  where?: InputMaybe<Batch_Bool_Exp>;
};


export type Query_RootBatch_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootBatcherArgs = {
  distinct_on?: InputMaybe<Array<Batcher_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Batcher_Order_By>>;
  where?: InputMaybe<Batcher_Bool_Exp>;
};


export type Query_RootBatcher_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootContractArgs = {
  distinct_on?: InputMaybe<Array<Contract_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contract_Order_By>>;
  where?: InputMaybe<Contract_Bool_Exp>;
};


export type Query_RootContract_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootDeprecatedStreamArgs = {
  distinct_on?: InputMaybe<Array<DeprecatedStream_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DeprecatedStream_Order_By>>;
  where?: InputMaybe<DeprecatedStream_Bool_Exp>;
};


export type Query_RootDeprecatedStream_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootStreamArgs = {
  distinct_on?: InputMaybe<Array<Stream_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stream_Order_By>>;
  where?: InputMaybe<Stream_Bool_Exp>;
};


export type Query_RootStream_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Stream_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stream_Order_By>>;
  where?: InputMaybe<Stream_Bool_Exp>;
};


export type Query_RootStream_By_PkArgs = {
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


export type Query_Root_MetaArgs = {
  distinct_on?: InputMaybe<Array<_Meta_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<_Meta_Order_By>>;
  where?: InputMaybe<_Meta_Bool_Exp>;
};


export type Query_RootChain_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Chain_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chain_Metadata_Order_By>>;
  where?: InputMaybe<Chain_Metadata_Bool_Exp>;
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
  event_id?: InputMaybe<Scalars['numeric']['input']>;
  event_name?: InputMaybe<Scalars['String']['input']>;
  log_index?: InputMaybe<Scalars['Int']['input']>;
  params?: InputMaybe<Scalars['jsonb']['input']>;
  serial?: InputMaybe<Scalars['Int']['input']>;
  src_address?: InputMaybe<Scalars['String']['input']>;
  transaction_fields?: InputMaybe<Scalars['jsonb']['input']>;
};

/** Boolean expression to compare columns of type "streamcategory". All fields are combined with logical 'AND'. */
export type Streamcategory_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['streamcategory']['input']>;
  _gt?: InputMaybe<Scalars['streamcategory']['input']>;
  _gte?: InputMaybe<Scalars['streamcategory']['input']>;
  _in?: InputMaybe<Array<Scalars['streamcategory']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['streamcategory']['input']>;
  _lte?: InputMaybe<Scalars['streamcategory']['input']>;
  _neq?: InputMaybe<Scalars['streamcategory']['input']>;
  _nin?: InputMaybe<Array<Scalars['streamcategory']['input']>>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "Action" */
  Action: Array<Action>;
  /** fetch aggregated fields from the table: "Action" */
  Action_aggregate: Action_Aggregate;
  /** fetch data from the table: "Action" using primary key columns */
  Action_by_pk?: Maybe<Action>;
  /** fetch data from the table in a streaming manner: "Action" */
  Action_stream: Array<Action>;
  /** fetch data from the table: "Asset" */
  Asset: Array<Asset>;
  /** fetch aggregated fields from the table: "Asset" */
  Asset_aggregate: Asset_Aggregate;
  /** fetch data from the table: "Asset" using primary key columns */
  Asset_by_pk?: Maybe<Asset>;
  /** fetch data from the table in a streaming manner: "Asset" */
  Asset_stream: Array<Asset>;
  /** fetch data from the table: "Batch" */
  Batch: Array<Batch>;
  /** fetch aggregated fields from the table: "Batch" */
  Batch_aggregate: Batch_Aggregate;
  /** fetch data from the table: "Batch" using primary key columns */
  Batch_by_pk?: Maybe<Batch>;
  /** fetch data from the table in a streaming manner: "Batch" */
  Batch_stream: Array<Batch>;
  /** fetch data from the table: "Batcher" */
  Batcher: Array<Batcher>;
  /** fetch data from the table: "Batcher" using primary key columns */
  Batcher_by_pk?: Maybe<Batcher>;
  /** fetch data from the table in a streaming manner: "Batcher" */
  Batcher_stream: Array<Batcher>;
  /** fetch data from the table: "Contract" */
  Contract: Array<Contract>;
  /** fetch data from the table: "Contract" using primary key columns */
  Contract_by_pk?: Maybe<Contract>;
  /** fetch data from the table in a streaming manner: "Contract" */
  Contract_stream: Array<Contract>;
  /** fetch data from the table: "DeprecatedStream" */
  DeprecatedStream: Array<DeprecatedStream>;
  /** fetch data from the table: "DeprecatedStream" using primary key columns */
  DeprecatedStream_by_pk?: Maybe<DeprecatedStream>;
  /** fetch data from the table in a streaming manner: "DeprecatedStream" */
  DeprecatedStream_stream: Array<DeprecatedStream>;
  /** fetch data from the table: "Stream" */
  Stream: Array<Stream>;
  /** fetch aggregated fields from the table: "Stream" */
  Stream_aggregate: Stream_Aggregate;
  /** fetch data from the table: "Stream" using primary key columns */
  Stream_by_pk?: Maybe<Stream>;
  /** fetch data from the table in a streaming manner: "Stream" */
  Stream_stream: Array<Stream>;
  /** fetch data from the table: "Watcher" */
  Watcher: Array<Watcher>;
  /** fetch data from the table: "Watcher" using primary key columns */
  Watcher_by_pk?: Maybe<Watcher>;
  /** fetch data from the table in a streaming manner: "Watcher" */
  Watcher_stream: Array<Watcher>;
  /** fetch data from the table: "_meta" */
  _meta: Array<_Meta>;
  /** fetch data from the table in a streaming manner: "_meta" */
  _meta_stream: Array<_Meta>;
  /** fetch data from the table: "chain_metadata" */
  chain_metadata: Array<Chain_Metadata>;
  /** fetch data from the table in a streaming manner: "chain_metadata" */
  chain_metadata_stream: Array<Chain_Metadata>;
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


export type Subscription_RootAction_AggregateArgs = {
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


export type Subscription_RootAssetArgs = {
  distinct_on?: InputMaybe<Array<Asset_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Asset_Order_By>>;
  where?: InputMaybe<Asset_Bool_Exp>;
};


export type Subscription_RootAsset_AggregateArgs = {
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


export type Subscription_RootBatchArgs = {
  distinct_on?: InputMaybe<Array<Batch_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Batch_Order_By>>;
  where?: InputMaybe<Batch_Bool_Exp>;
};


export type Subscription_RootBatch_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Batch_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Batch_Order_By>>;
  where?: InputMaybe<Batch_Bool_Exp>;
};


export type Subscription_RootBatch_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootBatch_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Batch_Stream_Cursor_Input>>;
  where?: InputMaybe<Batch_Bool_Exp>;
};


export type Subscription_RootBatcherArgs = {
  distinct_on?: InputMaybe<Array<Batcher_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Batcher_Order_By>>;
  where?: InputMaybe<Batcher_Bool_Exp>;
};


export type Subscription_RootBatcher_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootBatcher_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Batcher_Stream_Cursor_Input>>;
  where?: InputMaybe<Batcher_Bool_Exp>;
};


export type Subscription_RootContractArgs = {
  distinct_on?: InputMaybe<Array<Contract_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contract_Order_By>>;
  where?: InputMaybe<Contract_Bool_Exp>;
};


export type Subscription_RootContract_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootContract_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Contract_Stream_Cursor_Input>>;
  where?: InputMaybe<Contract_Bool_Exp>;
};


export type Subscription_RootDeprecatedStreamArgs = {
  distinct_on?: InputMaybe<Array<DeprecatedStream_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DeprecatedStream_Order_By>>;
  where?: InputMaybe<DeprecatedStream_Bool_Exp>;
};


export type Subscription_RootDeprecatedStream_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootDeprecatedStream_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<DeprecatedStream_Stream_Cursor_Input>>;
  where?: InputMaybe<DeprecatedStream_Bool_Exp>;
};


export type Subscription_RootStreamArgs = {
  distinct_on?: InputMaybe<Array<Stream_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stream_Order_By>>;
  where?: InputMaybe<Stream_Bool_Exp>;
};


export type Subscription_RootStream_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Stream_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stream_Order_By>>;
  where?: InputMaybe<Stream_Bool_Exp>;
};


export type Subscription_RootStream_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootStream_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Stream_Stream_Cursor_Input>>;
  where?: InputMaybe<Stream_Bool_Exp>;
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


export type Subscription_Root_MetaArgs = {
  distinct_on?: InputMaybe<Array<_Meta_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<_Meta_Order_By>>;
  where?: InputMaybe<_Meta_Bool_Exp>;
};


export type Subscription_Root_Meta_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<_Meta_Stream_Cursor_Input>>;
  where?: InputMaybe<_Meta_Bool_Exp>;
};


export type Subscription_RootChain_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Chain_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chain_Metadata_Order_By>>;
  where?: InputMaybe<Chain_Metadata_Bool_Exp>;
};


export type Subscription_RootChain_Metadata_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Chain_Metadata_Stream_Cursor_Input>>;
  where?: InputMaybe<Chain_Metadata_Bool_Exp>;
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

export type ActionFragmentFragment = { __typename?: 'Action', id: string, addressA?: string | null, addressB?: string | null, amountA?: any | null, amountB?: any | null, block: any, category: any, chainId: any, contract: string, fee?: any | null, from: string, hash: string, subgraphId: any, timestamp: any, stream?: { __typename?: 'Stream', id: string } | null };

export type AssetFragmentFragment = { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string };

export type BatchFragmentFragment = { __typename?: 'Batch', id: string, hash?: string | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null };

export type StreamFragmentFragment = { __typename?: 'Stream', id: string, alias: string, availableAmount: any, category: any, chainId: any, creator: string, contract: string, depletionTime: any, depositedAmount: any, forgivenDebt: any, hash: string, lastAdjustmentTimestamp: any, paused: boolean, pausedTime?: any | null, position: any, ratePerSecond: any, recipient: string, refundedAmount: any, sender: string, snapshotAmount: any, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, voided: boolean, voidedTime?: any | null, withdrawnAmount: any, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, batch?: { __typename?: 'Batch', id: string, hash?: string | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null } | null, lastAdjustmentAction?: { __typename?: 'Action', id: string } | null, pausedAction?: { __typename?: 'Action', id: string } | null, voidedAction?: { __typename?: 'Action', id: string } | null };

export type GetActionsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderDirection: Order_By;
  where?: InputMaybe<Action_Bool_Exp>;
}>;


export type GetActionsQuery = { __typename?: 'query_root', actions: Array<{ __typename?: 'Action', id: string, addressA?: string | null, addressB?: string | null, amountA?: any | null, amountB?: any | null, block: any, category: any, chainId: any, contract: string, fee?: any | null, from: string, hash: string, subgraphId: any, timestamp: any, stream?: { __typename?: 'Stream', id: string, alias: string, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null } | null }> };

export type GetStreamQueryVariables = Exact<{
  streamId: Scalars['String']['input'];
}>;


export type GetStreamQuery = { __typename?: 'query_root', stream?: { __typename?: 'Stream', id: string, alias: string, availableAmount: any, category: any, chainId: any, creator: string, contract: string, depletionTime: any, depositedAmount: any, forgivenDebt: any, hash: string, lastAdjustmentTimestamp: any, paused: boolean, pausedTime?: any | null, position: any, ratePerSecond: any, recipient: string, refundedAmount: any, sender: string, snapshotAmount: any, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, voided: boolean, voidedTime?: any | null, withdrawnAmount: any, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, batch?: { __typename?: 'Batch', id: string, hash?: string | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null } | null, lastAdjustmentAction?: { __typename?: 'Action', id: string } | null, pausedAction?: { __typename?: 'Action', id: string } | null, voidedAction?: { __typename?: 'Action', id: string } | null } | null };

export type GetStreamWithActionsQueryVariables = Exact<{
  streamId: Scalars['String']['input'];
}>;


export type GetStreamWithActionsQuery = { __typename?: 'query_root', stream?: { __typename?: 'Stream', id: string, alias: string, availableAmount: any, category: any, chainId: any, creator: string, contract: string, depletionTime: any, depositedAmount: any, forgivenDebt: any, hash: string, lastAdjustmentTimestamp: any, paused: boolean, pausedTime?: any | null, position: any, ratePerSecond: any, recipient: string, refundedAmount: any, sender: string, snapshotAmount: any, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, voided: boolean, voidedTime?: any | null, withdrawnAmount: any, actions: Array<{ __typename?: 'Action', id: string, addressA?: string | null, addressB?: string | null, amountA?: any | null, amountB?: any | null, block: any, category: any, chainId: any, contract: string, fee?: any | null, from: string, hash: string, subgraphId: any, timestamp: any, stream?: { __typename?: 'Stream', id: string } | null }>, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, batch?: { __typename?: 'Batch', id: string, hash?: string | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null } | null, lastAdjustmentAction?: { __typename?: 'Action', id: string } | null, pausedAction?: { __typename?: 'Action', id: string } | null, voidedAction?: { __typename?: 'Action', id: string } | null } | null };

export type GetStreamsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderDirection: Order_By;
  where?: InputMaybe<Stream_Bool_Exp>;
}>;


export type GetStreamsQuery = { __typename?: 'query_root', streams: Array<{ __typename?: 'Stream', id: string, alias: string, availableAmount: any, category: any, chainId: any, creator: string, contract: string, depletionTime: any, depositedAmount: any, forgivenDebt: any, hash: string, lastAdjustmentTimestamp: any, paused: boolean, pausedTime?: any | null, position: any, ratePerSecond: any, recipient: string, refundedAmount: any, sender: string, snapshotAmount: any, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, voided: boolean, voidedTime?: any | null, withdrawnAmount: any, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, batch?: { __typename?: 'Batch', id: string, hash?: string | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null } | null, lastAdjustmentAction?: { __typename?: 'Action', id: string } | null, pausedAction?: { __typename?: 'Action', id: string } | null, voidedAction?: { __typename?: 'Action', id: string } | null }> };

export type GetStreamsWithActionsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderDirection: Order_By;
  where?: InputMaybe<Stream_Bool_Exp>;
}>;


export type GetStreamsWithActionsQuery = { __typename?: 'query_root', streams: Array<{ __typename?: 'Stream', id: string, alias: string, availableAmount: any, category: any, chainId: any, creator: string, contract: string, depletionTime: any, depositedAmount: any, forgivenDebt: any, hash: string, lastAdjustmentTimestamp: any, paused: boolean, pausedTime?: any | null, position: any, ratePerSecond: any, recipient: string, refundedAmount: any, sender: string, snapshotAmount: any, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, voided: boolean, voidedTime?: any | null, withdrawnAmount: any, actions: Array<{ __typename?: 'Action', id: string, addressA?: string | null, addressB?: string | null, amountA?: any | null, amountB?: any | null, block: any, category: any, chainId: any, contract: string, fee?: any | null, from: string, hash: string, subgraphId: any, timestamp: any, stream?: { __typename?: 'Stream', id: string } | null }>, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, batch?: { __typename?: 'Batch', id: string, hash?: string | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null } | null, lastAdjustmentAction?: { __typename?: 'Action', id: string } | null, pausedAction?: { __typename?: 'Action', id: string } | null, voidedAction?: { __typename?: 'Action', id: string } | null }> };

export const ActionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addressA"}},{"kind":"Field","name":{"kind":"Name","value":"addressB"}},{"kind":"Field","name":{"kind":"Name","value":"amountA"}},{"kind":"Field","name":{"kind":"Name","value":"amountB"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"stream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ActionFragmentFragment, unknown>;
export const AssetFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]} as unknown as DocumentNode<AssetFragmentFragment, unknown>;
export const BatchFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<BatchFragmentFragment, unknown>;
export const StreamFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"availableAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depletionTime"}},{"kind":"Field","name":{"kind":"Name","value":"depositedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"forgivenDebt"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"pausedTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"refundedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"snapshotAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"voided"}},{"kind":"Field","name":{"kind":"Name","value":"voidedTime"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pausedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voidedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<StreamFragmentFragment, unknown>;
export const GetActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getActions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"order_by"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Action_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"actions"},"name":{"kind":"Name","value":"Action"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"distinct_on"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"subgraphId"}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}},{"kind":"Field","name":{"kind":"Name","value":"stream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addressA"}},{"kind":"Field","name":{"kind":"Name","value":"addressB"}},{"kind":"Field","name":{"kind":"Name","value":"amountA"}},{"kind":"Field","name":{"kind":"Name","value":"amountB"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"stream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]} as unknown as DocumentNode<GetActionsQuery, GetActionsQueryVariables>;
export const GetStreamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStream"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"streamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"stream"},"name":{"kind":"Name","value":"Stream_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"streamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"availableAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depletionTime"}},{"kind":"Field","name":{"kind":"Name","value":"depositedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"forgivenDebt"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"pausedTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"refundedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"snapshotAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"voided"}},{"kind":"Field","name":{"kind":"Name","value":"voidedTime"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pausedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voidedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetStreamQuery, GetStreamQueryVariables>;
export const GetStreamWithActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStreamWithActions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"streamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"stream"},"name":{"kind":"Name","value":"Stream_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"streamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragment"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"distinct_on"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"subgraphId"}]}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"availableAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depletionTime"}},{"kind":"Field","name":{"kind":"Name","value":"depositedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"forgivenDebt"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"pausedTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"refundedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"snapshotAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"voided"}},{"kind":"Field","name":{"kind":"Name","value":"voidedTime"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pausedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voidedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addressA"}},{"kind":"Field","name":{"kind":"Name","value":"addressB"}},{"kind":"Field","name":{"kind":"Name","value":"amountA"}},{"kind":"Field","name":{"kind":"Name","value":"amountB"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"stream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetStreamWithActionsQuery, GetStreamWithActionsQueryVariables>;
export const GetStreamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStreams"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"order_by"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Stream_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"streams"},"name":{"kind":"Name","value":"Stream"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"distinct_on"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"subgraphId"}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"availableAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depletionTime"}},{"kind":"Field","name":{"kind":"Name","value":"depositedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"forgivenDebt"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"pausedTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"refundedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"snapshotAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"voided"}},{"kind":"Field","name":{"kind":"Name","value":"voidedTime"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pausedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voidedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetStreamsQuery, GetStreamsQueryVariables>;
export const GetStreamsWithActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStreamsWithActions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"order_by"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Stream_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"streams"},"name":{"kind":"Name","value":"Stream"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"distinct_on"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"subgraphId"}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragment"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"distinct_on"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"subgraphId"}]}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"availableAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depletionTime"}},{"kind":"Field","name":{"kind":"Name","value":"depositedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"forgivenDebt"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"pausedTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"refundedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"snapshotAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"voided"}},{"kind":"Field","name":{"kind":"Name","value":"voidedTime"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastAdjustmentAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pausedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voidedAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addressA"}},{"kind":"Field","name":{"kind":"Name","value":"addressB"}},{"kind":"Field","name":{"kind":"Name","value":"amountA"}},{"kind":"Field","name":{"kind":"Name","value":"amountB"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"stream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetStreamsWithActionsQuery, GetStreamsWithActionsQueryVariables>;