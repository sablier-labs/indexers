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
  contract_type: { input: any; output: any; }
  jsonb: { input: any; output: any; }
  numeric: { input: any; output: any; }
  streamcategory: { input: any; output: any; }
  timestamp: { input: any; output: any; }
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
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
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
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  fee?: InputMaybe<Numeric_Comparison_Exp>;
  from?: InputMaybe<String_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  stream?: InputMaybe<Stream_Bool_Exp>;
  stream_id?: InputMaybe<String_Comparison_Exp>;
  subgraphId?: InputMaybe<Numeric_Comparison_Exp>;
  timestamp?: InputMaybe<Numeric_Comparison_Exp>;
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
  db_write_timestamp?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  stream_id?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
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
  db_write_timestamp?: InputMaybe<Order_By>;
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
  db_write_timestamp?: InputMaybe<Order_By>;
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
  StreamId = 'stream_id',
  /** column name */
  SubgraphId = 'subgraphId',
  /** column name */
  Timestamp = 'timestamp'
}

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
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  fee?: InputMaybe<Scalars['numeric']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  stream_id?: InputMaybe<Scalars['String']['input']>;
  subgraphId?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
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
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  decimals: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** An array relationship */
  streams: Array<Stream>;
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

/** Boolean expression to filter rows from the table "Asset". All fields are combined with a logical 'AND'. */
export type Asset_Bool_Exp = {
  _and?: InputMaybe<Array<Asset_Bool_Exp>>;
  _not?: InputMaybe<Asset_Bool_Exp>;
  _or?: InputMaybe<Array<Asset_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  chainId?: InputMaybe<Numeric_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  decimals?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  streams?: InputMaybe<Stream_Bool_Exp>;
  symbol?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Asset". */
export type Asset_Order_By = {
  address?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
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

/** columns and relationships of "Batch" */
export type Batch = {
  __typename?: 'Batch';
  /** An object relationship */
  batcher?: Maybe<Batcher>;
  batcher_id?: Maybe<Scalars['String']['output']>;
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  position?: Maybe<Scalars['numeric']['output']>;
  size: Scalars['numeric']['output'];
  /** An array relationship */
  streams: Array<Stream>;
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
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  position?: InputMaybe<Numeric_Comparison_Exp>;
  size?: InputMaybe<Numeric_Comparison_Exp>;
  streams?: InputMaybe<Stream_Bool_Exp>;
  timestamp?: InputMaybe<Numeric_Comparison_Exp>;
};

/** order by max() on columns of table "Batch" */
export type Batch_Max_Order_By = {
  batcher_id?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "Batch" */
export type Batch_Min_Order_By = {
  batcher_id?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
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
  db_write_timestamp?: InputMaybe<Order_By>;
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
  DbWriteTimestamp = 'db_write_timestamp',
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

/** order by stddev() on columns of table "Batch" */
export type Batch_Stddev_Order_By = {
  position?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "Batch" */
export type Batch_Stddev_Pop_Order_By = {
  position?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
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
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['numeric']['input']>;
  size?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
};

/** order by sum() on columns of table "Batch" */
export type Batch_Sum_Order_By = {
  position?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "Batch" */
export type Batch_Var_Pop_Order_By = {
  position?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "Batch" */
export type Batch_Var_Samp_Order_By = {
  position?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
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
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
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

/** Boolean expression to filter rows from the table "Batcher". All fields are combined with a logical 'AND'. */
export type Batcher_Bool_Exp = {
  _and?: InputMaybe<Array<Batcher_Bool_Exp>>;
  _not?: InputMaybe<Batcher_Bool_Exp>;
  _or?: InputMaybe<Array<Batcher_Bool_Exp>>;
  batchCounter?: InputMaybe<Numeric_Comparison_Exp>;
  batches?: InputMaybe<Batch_Bool_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Batcher". */
export type Batcher_Order_By = {
  batchCounter?: InputMaybe<Order_By>;
  batches_aggregate?: InputMaybe<Batch_Aggregate_Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** select columns of table "Batcher" */
export enum Batcher_Select_Column {
  /** column name */
  BatchCounter = 'batchCounter',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
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
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
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

/** columns and relationships of "Segment" */
export type Segment = {
  __typename?: 'Segment';
  amount: Scalars['numeric']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  endAmount: Scalars['numeric']['output'];
  endTime: Scalars['numeric']['output'];
  exponent: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  position: Scalars['numeric']['output'];
  startAmount: Scalars['numeric']['output'];
  startTime: Scalars['numeric']['output'];
  /** An object relationship */
  stream?: Maybe<Stream>;
  stream_id: Scalars['String']['output'];
};

/** order by aggregate values of table "Segment" */
export type Segment_Aggregate_Order_By = {
  avg?: InputMaybe<Segment_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Segment_Max_Order_By>;
  min?: InputMaybe<Segment_Min_Order_By>;
  stddev?: InputMaybe<Segment_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Segment_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Segment_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Segment_Sum_Order_By>;
  var_pop?: InputMaybe<Segment_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Segment_Var_Samp_Order_By>;
  variance?: InputMaybe<Segment_Variance_Order_By>;
};

/** order by avg() on columns of table "Segment" */
export type Segment_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  exponent?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Segment". All fields are combined with a logical 'AND'. */
export type Segment_Bool_Exp = {
  _and?: InputMaybe<Array<Segment_Bool_Exp>>;
  _not?: InputMaybe<Segment_Bool_Exp>;
  _or?: InputMaybe<Array<Segment_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  endAmount?: InputMaybe<Numeric_Comparison_Exp>;
  endTime?: InputMaybe<Numeric_Comparison_Exp>;
  exponent?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  position?: InputMaybe<Numeric_Comparison_Exp>;
  startAmount?: InputMaybe<Numeric_Comparison_Exp>;
  startTime?: InputMaybe<Numeric_Comparison_Exp>;
  stream?: InputMaybe<Stream_Bool_Exp>;
  stream_id?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "Segment" */
export type Segment_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  exponent?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  stream_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "Segment" */
export type Segment_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  exponent?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  stream_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "Segment". */
export type Segment_Order_By = {
  amount?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  exponent?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  stream?: InputMaybe<Stream_Order_By>;
  stream_id?: InputMaybe<Order_By>;
};

/** select columns of table "Segment" */
export enum Segment_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  EndAmount = 'endAmount',
  /** column name */
  EndTime = 'endTime',
  /** column name */
  Exponent = 'exponent',
  /** column name */
  Id = 'id',
  /** column name */
  Position = 'position',
  /** column name */
  StartAmount = 'startAmount',
  /** column name */
  StartTime = 'startTime',
  /** column name */
  StreamId = 'stream_id'
}

/** order by stddev() on columns of table "Segment" */
export type Segment_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  exponent?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "Segment" */
export type Segment_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  exponent?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "Segment" */
export type Segment_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  exponent?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "Segment" */
export type Segment_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Segment_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Segment_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  endAmount?: InputMaybe<Scalars['numeric']['input']>;
  endTime?: InputMaybe<Scalars['numeric']['input']>;
  exponent?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['numeric']['input']>;
  startAmount?: InputMaybe<Scalars['numeric']['input']>;
  startTime?: InputMaybe<Scalars['numeric']['input']>;
  stream_id?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "Segment" */
export type Segment_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  exponent?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "Segment" */
export type Segment_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  exponent?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "Segment" */
export type Segment_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  exponent?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "Segment" */
export type Segment_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  exponent?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
};

/** columns and relationships of "Stream" */
export type Stream = {
  __typename?: 'Stream';
  /** An array relationship */
  actions: Array<Action>;
  alias: Scalars['String']['output'];
  /** An object relationship */
  asset?: Maybe<Asset>;
  assetDecimalsValue: Scalars['numeric']['output'];
  asset_id: Scalars['String']['output'];
  /** An object relationship */
  batch?: Maybe<Batch>;
  batch_id: Scalars['String']['output'];
  cancelable: Scalars['Boolean']['output'];
  canceled: Scalars['Boolean']['output'];
  /** An object relationship */
  canceledAction?: Maybe<Action>;
  canceledAction_id?: Maybe<Scalars['String']['output']>;
  canceledTime?: Maybe<Scalars['numeric']['output']>;
  category: Scalars['streamcategory']['output'];
  chainId: Scalars['numeric']['output'];
  cliff?: Maybe<Scalars['Boolean']['output']>;
  cliffAmount?: Maybe<Scalars['numeric']['output']>;
  cliffTime?: Maybe<Scalars['numeric']['output']>;
  contract: Scalars['String']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  depositAmount: Scalars['numeric']['output'];
  duration: Scalars['numeric']['output'];
  endTime: Scalars['numeric']['output'];
  funder: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initial?: Maybe<Scalars['Boolean']['output']>;
  initialAmount?: Maybe<Scalars['numeric']['output']>;
  intactAmount: Scalars['numeric']['output'];
  parties: Array<Scalars['String']['output']>;
  position: Scalars['numeric']['output'];
  proxender?: Maybe<Scalars['String']['output']>;
  proxied: Scalars['Boolean']['output'];
  recipient: Scalars['String']['output'];
  /** An object relationship */
  renounceAction?: Maybe<Action>;
  renounceAction_id?: Maybe<Scalars['String']['output']>;
  renounceTime?: Maybe<Scalars['numeric']['output']>;
  /** An array relationship */
  segments: Array<Segment>;
  sender: Scalars['String']['output'];
  shape?: Maybe<Scalars['String']['output']>;
  startTime: Scalars['numeric']['output'];
  subgraphId: Scalars['numeric']['output'];
  timestamp: Scalars['numeric']['output'];
  tokenId: Scalars['numeric']['output'];
  /** An array relationship */
  tranches: Array<Tranche>;
  transferable: Scalars['Boolean']['output'];
  version: Scalars['String']['output'];
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
export type StreamSegmentsArgs = {
  distinct_on?: InputMaybe<Array<Segment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Segment_Order_By>>;
  where?: InputMaybe<Segment_Bool_Exp>;
};


/** columns and relationships of "Stream" */
export type StreamTranchesArgs = {
  distinct_on?: InputMaybe<Array<Tranche_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tranche_Order_By>>;
  where?: InputMaybe<Tranche_Bool_Exp>;
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

/** order by avg() on columns of table "Stream" */
export type Stream_Avg_Order_By = {
  assetDecimalsValue?: InputMaybe<Order_By>;
  canceledTime?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  cliffAmount?: InputMaybe<Order_By>;
  cliffTime?: InputMaybe<Order_By>;
  depositAmount?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  initialAmount?: InputMaybe<Order_By>;
  intactAmount?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  renounceTime?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Stream". All fields are combined with a logical 'AND'. */
export type Stream_Bool_Exp = {
  _and?: InputMaybe<Array<Stream_Bool_Exp>>;
  _not?: InputMaybe<Stream_Bool_Exp>;
  _or?: InputMaybe<Array<Stream_Bool_Exp>>;
  actions?: InputMaybe<Action_Bool_Exp>;
  alias?: InputMaybe<String_Comparison_Exp>;
  asset?: InputMaybe<Asset_Bool_Exp>;
  assetDecimalsValue?: InputMaybe<Numeric_Comparison_Exp>;
  asset_id?: InputMaybe<String_Comparison_Exp>;
  batch?: InputMaybe<Batch_Bool_Exp>;
  batch_id?: InputMaybe<String_Comparison_Exp>;
  cancelable?: InputMaybe<Boolean_Comparison_Exp>;
  canceled?: InputMaybe<Boolean_Comparison_Exp>;
  canceledAction?: InputMaybe<Action_Bool_Exp>;
  canceledAction_id?: InputMaybe<String_Comparison_Exp>;
  canceledTime?: InputMaybe<Numeric_Comparison_Exp>;
  category?: InputMaybe<Streamcategory_Comparison_Exp>;
  chainId?: InputMaybe<Numeric_Comparison_Exp>;
  cliff?: InputMaybe<Boolean_Comparison_Exp>;
  cliffAmount?: InputMaybe<Numeric_Comparison_Exp>;
  cliffTime?: InputMaybe<Numeric_Comparison_Exp>;
  contract?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  depositAmount?: InputMaybe<Numeric_Comparison_Exp>;
  duration?: InputMaybe<Numeric_Comparison_Exp>;
  endTime?: InputMaybe<Numeric_Comparison_Exp>;
  funder?: InputMaybe<String_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  initial?: InputMaybe<Boolean_Comparison_Exp>;
  initialAmount?: InputMaybe<Numeric_Comparison_Exp>;
  intactAmount?: InputMaybe<Numeric_Comparison_Exp>;
  parties?: InputMaybe<String_Array_Comparison_Exp>;
  position?: InputMaybe<Numeric_Comparison_Exp>;
  proxender?: InputMaybe<String_Comparison_Exp>;
  proxied?: InputMaybe<Boolean_Comparison_Exp>;
  recipient?: InputMaybe<String_Comparison_Exp>;
  renounceAction?: InputMaybe<Action_Bool_Exp>;
  renounceAction_id?: InputMaybe<String_Comparison_Exp>;
  renounceTime?: InputMaybe<Numeric_Comparison_Exp>;
  segments?: InputMaybe<Segment_Bool_Exp>;
  sender?: InputMaybe<String_Comparison_Exp>;
  shape?: InputMaybe<String_Comparison_Exp>;
  startTime?: InputMaybe<Numeric_Comparison_Exp>;
  subgraphId?: InputMaybe<Numeric_Comparison_Exp>;
  timestamp?: InputMaybe<Numeric_Comparison_Exp>;
  tokenId?: InputMaybe<Numeric_Comparison_Exp>;
  tranches?: InputMaybe<Tranche_Bool_Exp>;
  transferable?: InputMaybe<Boolean_Comparison_Exp>;
  version?: InputMaybe<String_Comparison_Exp>;
  withdrawnAmount?: InputMaybe<Numeric_Comparison_Exp>;
};

/** order by max() on columns of table "Stream" */
export type Stream_Max_Order_By = {
  alias?: InputMaybe<Order_By>;
  assetDecimalsValue?: InputMaybe<Order_By>;
  asset_id?: InputMaybe<Order_By>;
  batch_id?: InputMaybe<Order_By>;
  canceledAction_id?: InputMaybe<Order_By>;
  canceledTime?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  cliffAmount?: InputMaybe<Order_By>;
  cliffTime?: InputMaybe<Order_By>;
  contract?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  depositAmount?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  funder?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  initialAmount?: InputMaybe<Order_By>;
  intactAmount?: InputMaybe<Order_By>;
  parties?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  proxender?: InputMaybe<Order_By>;
  recipient?: InputMaybe<Order_By>;
  renounceAction_id?: InputMaybe<Order_By>;
  renounceTime?: InputMaybe<Order_By>;
  sender?: InputMaybe<Order_By>;
  shape?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "Stream" */
export type Stream_Min_Order_By = {
  alias?: InputMaybe<Order_By>;
  assetDecimalsValue?: InputMaybe<Order_By>;
  asset_id?: InputMaybe<Order_By>;
  batch_id?: InputMaybe<Order_By>;
  canceledAction_id?: InputMaybe<Order_By>;
  canceledTime?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  cliffAmount?: InputMaybe<Order_By>;
  cliffTime?: InputMaybe<Order_By>;
  contract?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  depositAmount?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  funder?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  initialAmount?: InputMaybe<Order_By>;
  intactAmount?: InputMaybe<Order_By>;
  parties?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  proxender?: InputMaybe<Order_By>;
  recipient?: InputMaybe<Order_By>;
  renounceAction_id?: InputMaybe<Order_By>;
  renounceTime?: InputMaybe<Order_By>;
  sender?: InputMaybe<Order_By>;
  shape?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "Stream". */
export type Stream_Order_By = {
  actions_aggregate?: InputMaybe<Action_Aggregate_Order_By>;
  alias?: InputMaybe<Order_By>;
  asset?: InputMaybe<Asset_Order_By>;
  assetDecimalsValue?: InputMaybe<Order_By>;
  asset_id?: InputMaybe<Order_By>;
  batch?: InputMaybe<Batch_Order_By>;
  batch_id?: InputMaybe<Order_By>;
  cancelable?: InputMaybe<Order_By>;
  canceled?: InputMaybe<Order_By>;
  canceledAction?: InputMaybe<Action_Order_By>;
  canceledAction_id?: InputMaybe<Order_By>;
  canceledTime?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  cliff?: InputMaybe<Order_By>;
  cliffAmount?: InputMaybe<Order_By>;
  cliffTime?: InputMaybe<Order_By>;
  contract?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  depositAmount?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  funder?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  initial?: InputMaybe<Order_By>;
  initialAmount?: InputMaybe<Order_By>;
  intactAmount?: InputMaybe<Order_By>;
  parties?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  proxender?: InputMaybe<Order_By>;
  proxied?: InputMaybe<Order_By>;
  recipient?: InputMaybe<Order_By>;
  renounceAction?: InputMaybe<Action_Order_By>;
  renounceAction_id?: InputMaybe<Order_By>;
  renounceTime?: InputMaybe<Order_By>;
  segments_aggregate?: InputMaybe<Segment_Aggregate_Order_By>;
  sender?: InputMaybe<Order_By>;
  shape?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  tranches_aggregate?: InputMaybe<Tranche_Aggregate_Order_By>;
  transferable?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
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
  BatchId = 'batch_id',
  /** column name */
  Cancelable = 'cancelable',
  /** column name */
  Canceled = 'canceled',
  /** column name */
  CanceledActionId = 'canceledAction_id',
  /** column name */
  CanceledTime = 'canceledTime',
  /** column name */
  Category = 'category',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  Cliff = 'cliff',
  /** column name */
  CliffAmount = 'cliffAmount',
  /** column name */
  CliffTime = 'cliffTime',
  /** column name */
  Contract = 'contract',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  DepositAmount = 'depositAmount',
  /** column name */
  Duration = 'duration',
  /** column name */
  EndTime = 'endTime',
  /** column name */
  Funder = 'funder',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  Initial = 'initial',
  /** column name */
  InitialAmount = 'initialAmount',
  /** column name */
  IntactAmount = 'intactAmount',
  /** column name */
  Parties = 'parties',
  /** column name */
  Position = 'position',
  /** column name */
  Proxender = 'proxender',
  /** column name */
  Proxied = 'proxied',
  /** column name */
  Recipient = 'recipient',
  /** column name */
  RenounceActionId = 'renounceAction_id',
  /** column name */
  RenounceTime = 'renounceTime',
  /** column name */
  Sender = 'sender',
  /** column name */
  Shape = 'shape',
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
  WithdrawnAmount = 'withdrawnAmount'
}

/** order by stddev() on columns of table "Stream" */
export type Stream_Stddev_Order_By = {
  assetDecimalsValue?: InputMaybe<Order_By>;
  canceledTime?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  cliffAmount?: InputMaybe<Order_By>;
  cliffTime?: InputMaybe<Order_By>;
  depositAmount?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  initialAmount?: InputMaybe<Order_By>;
  intactAmount?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  renounceTime?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "Stream" */
export type Stream_Stddev_Pop_Order_By = {
  assetDecimalsValue?: InputMaybe<Order_By>;
  canceledTime?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  cliffAmount?: InputMaybe<Order_By>;
  cliffTime?: InputMaybe<Order_By>;
  depositAmount?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  initialAmount?: InputMaybe<Order_By>;
  intactAmount?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  renounceTime?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "Stream" */
export type Stream_Stddev_Samp_Order_By = {
  assetDecimalsValue?: InputMaybe<Order_By>;
  canceledTime?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  cliffAmount?: InputMaybe<Order_By>;
  cliffTime?: InputMaybe<Order_By>;
  depositAmount?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  initialAmount?: InputMaybe<Order_By>;
  intactAmount?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  renounceTime?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
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
  batch_id?: InputMaybe<Scalars['String']['input']>;
  cancelable?: InputMaybe<Scalars['Boolean']['input']>;
  canceled?: InputMaybe<Scalars['Boolean']['input']>;
  canceledAction_id?: InputMaybe<Scalars['String']['input']>;
  canceledTime?: InputMaybe<Scalars['numeric']['input']>;
  category?: InputMaybe<Scalars['streamcategory']['input']>;
  chainId?: InputMaybe<Scalars['numeric']['input']>;
  cliff?: InputMaybe<Scalars['Boolean']['input']>;
  cliffAmount?: InputMaybe<Scalars['numeric']['input']>;
  cliffTime?: InputMaybe<Scalars['numeric']['input']>;
  contract?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  depositAmount?: InputMaybe<Scalars['numeric']['input']>;
  duration?: InputMaybe<Scalars['numeric']['input']>;
  endTime?: InputMaybe<Scalars['numeric']['input']>;
  funder?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  initial?: InputMaybe<Scalars['Boolean']['input']>;
  initialAmount?: InputMaybe<Scalars['numeric']['input']>;
  intactAmount?: InputMaybe<Scalars['numeric']['input']>;
  parties?: InputMaybe<Array<Scalars['String']['input']>>;
  position?: InputMaybe<Scalars['numeric']['input']>;
  proxender?: InputMaybe<Scalars['String']['input']>;
  proxied?: InputMaybe<Scalars['Boolean']['input']>;
  recipient?: InputMaybe<Scalars['String']['input']>;
  renounceAction_id?: InputMaybe<Scalars['String']['input']>;
  renounceTime?: InputMaybe<Scalars['numeric']['input']>;
  sender?: InputMaybe<Scalars['String']['input']>;
  shape?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['numeric']['input']>;
  subgraphId?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
  tokenId?: InputMaybe<Scalars['numeric']['input']>;
  transferable?: InputMaybe<Scalars['Boolean']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
  withdrawnAmount?: InputMaybe<Scalars['numeric']['input']>;
};

/** order by sum() on columns of table "Stream" */
export type Stream_Sum_Order_By = {
  assetDecimalsValue?: InputMaybe<Order_By>;
  canceledTime?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  cliffAmount?: InputMaybe<Order_By>;
  cliffTime?: InputMaybe<Order_By>;
  depositAmount?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  initialAmount?: InputMaybe<Order_By>;
  intactAmount?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  renounceTime?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "Stream" */
export type Stream_Var_Pop_Order_By = {
  assetDecimalsValue?: InputMaybe<Order_By>;
  canceledTime?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  cliffAmount?: InputMaybe<Order_By>;
  cliffTime?: InputMaybe<Order_By>;
  depositAmount?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  initialAmount?: InputMaybe<Order_By>;
  intactAmount?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  renounceTime?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "Stream" */
export type Stream_Var_Samp_Order_By = {
  assetDecimalsValue?: InputMaybe<Order_By>;
  canceledTime?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  cliffAmount?: InputMaybe<Order_By>;
  cliffTime?: InputMaybe<Order_By>;
  depositAmount?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  initialAmount?: InputMaybe<Order_By>;
  intactAmount?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  renounceTime?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "Stream" */
export type Stream_Variance_Order_By = {
  assetDecimalsValue?: InputMaybe<Order_By>;
  canceledTime?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  cliffAmount?: InputMaybe<Order_By>;
  cliffTime?: InputMaybe<Order_By>;
  depositAmount?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  initialAmount?: InputMaybe<Order_By>;
  intactAmount?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  renounceTime?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  withdrawnAmount?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Array_Comparison_Exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['String']['input']>>;
  _eq?: InputMaybe<Array<Scalars['String']['input']>>;
  _gt?: InputMaybe<Array<Scalars['String']['input']>>;
  _gte?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['String']['input']>>;
  _lte?: InputMaybe<Array<Scalars['String']['input']>>;
  _neq?: InputMaybe<Array<Scalars['String']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
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
  amount: Scalars['numeric']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  endAmount: Scalars['numeric']['output'];
  endTime: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  position: Scalars['numeric']['output'];
  startAmount: Scalars['numeric']['output'];
  startTime: Scalars['numeric']['output'];
  /** An object relationship */
  stream?: Maybe<Stream>;
  stream_id: Scalars['String']['output'];
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
  amount?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Tranche". All fields are combined with a logical 'AND'. */
export type Tranche_Bool_Exp = {
  _and?: InputMaybe<Array<Tranche_Bool_Exp>>;
  _not?: InputMaybe<Tranche_Bool_Exp>;
  _or?: InputMaybe<Array<Tranche_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  endAmount?: InputMaybe<Numeric_Comparison_Exp>;
  endTime?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  position?: InputMaybe<Numeric_Comparison_Exp>;
  startAmount?: InputMaybe<Numeric_Comparison_Exp>;
  startTime?: InputMaybe<Numeric_Comparison_Exp>;
  stream?: InputMaybe<Stream_Bool_Exp>;
  stream_id?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "Tranche" */
export type Tranche_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  stream_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "Tranche" */
export type Tranche_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  stream_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "Tranche". */
export type Tranche_Order_By = {
  amount?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  stream?: InputMaybe<Stream_Order_By>;
  stream_id?: InputMaybe<Order_By>;
};

/** select columns of table "Tranche" */
export enum Tranche_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  EndAmount = 'endAmount',
  /** column name */
  EndTime = 'endTime',
  /** column name */
  Id = 'id',
  /** column name */
  Position = 'position',
  /** column name */
  StartAmount = 'startAmount',
  /** column name */
  StartTime = 'startTime',
  /** column name */
  StreamId = 'stream_id'
}

/** order by stddev() on columns of table "Tranche" */
export type Tranche_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "Tranche" */
export type Tranche_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "Tranche" */
export type Tranche_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
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
  amount?: InputMaybe<Scalars['numeric']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  endAmount?: InputMaybe<Scalars['numeric']['input']>;
  endTime?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['numeric']['input']>;
  startAmount?: InputMaybe<Scalars['numeric']['input']>;
  startTime?: InputMaybe<Scalars['numeric']['input']>;
  stream_id?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "Tranche" */
export type Tranche_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "Tranche" */
export type Tranche_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "Tranche" */
export type Tranche_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "Tranche" */
export type Tranche_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  endAmount?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  startAmount?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
};

/** columns and relationships of "Watcher" */
export type Watcher = {
  __typename?: 'Watcher';
  actionCounter: Scalars['numeric']['output'];
  chainId: Scalars['numeric']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
  logs?: Maybe<Array<Scalars['String']['output']>>;
  streamCounter: Scalars['numeric']['output'];
};

/** Boolean expression to filter rows from the table "Watcher". All fields are combined with a logical 'AND'. */
export type Watcher_Bool_Exp = {
  _and?: InputMaybe<Array<Watcher_Bool_Exp>>;
  _not?: InputMaybe<Watcher_Bool_Exp>;
  _or?: InputMaybe<Array<Watcher_Bool_Exp>>;
  actionCounter?: InputMaybe<Numeric_Comparison_Exp>;
  chainId?: InputMaybe<Numeric_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  logs?: InputMaybe<String_Array_Comparison_Exp>;
  streamCounter?: InputMaybe<Numeric_Comparison_Exp>;
};

/** Ordering options when selecting data from "Watcher". */
export type Watcher_Order_By = {
  actionCounter?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  logs?: InputMaybe<Order_By>;
  streamCounter?: InputMaybe<Order_By>;
};

/** select columns of table "Watcher" */
export enum Watcher_Select_Column {
  /** column name */
  ActionCounter = 'actionCounter',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id',
  /** column name */
  Logs = 'logs',
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
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  logs?: InputMaybe<Array<Scalars['String']['input']>>;
  streamCounter?: InputMaybe<Scalars['numeric']['input']>;
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
  /** fetch data from the table: "Asset" */
  Asset: Array<Asset>;
  /** fetch data from the table: "Asset" using primary key columns */
  Asset_by_pk?: Maybe<Asset>;
  /** fetch data from the table: "Batch" */
  Batch: Array<Batch>;
  /** fetch data from the table: "Batch" using primary key columns */
  Batch_by_pk?: Maybe<Batch>;
  /** fetch data from the table: "Batcher" */
  Batcher: Array<Batcher>;
  /** fetch data from the table: "Batcher" using primary key columns */
  Batcher_by_pk?: Maybe<Batcher>;
  /** fetch data from the table: "Segment" */
  Segment: Array<Segment>;
  /** fetch data from the table: "Segment" using primary key columns */
  Segment_by_pk?: Maybe<Segment>;
  /** fetch data from the table: "Stream" */
  Stream: Array<Stream>;
  /** fetch data from the table: "Stream" using primary key columns */
  Stream_by_pk?: Maybe<Stream>;
  /** fetch data from the table: "Tranche" */
  Tranche: Array<Tranche>;
  /** fetch data from the table: "Tranche" using primary key columns */
  Tranche_by_pk?: Maybe<Tranche>;
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


export type Query_RootBatchArgs = {
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


export type Query_RootSegmentArgs = {
  distinct_on?: InputMaybe<Array<Segment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Segment_Order_By>>;
  where?: InputMaybe<Segment_Bool_Exp>;
};


export type Query_RootSegment_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootStreamArgs = {
  distinct_on?: InputMaybe<Array<Stream_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stream_Order_By>>;
  where?: InputMaybe<Stream_Bool_Exp>;
};


export type Query_RootStream_By_PkArgs = {
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
  /** fetch data from the table: "Action" using primary key columns */
  Action_by_pk?: Maybe<Action>;
  /** fetch data from the table in a streaming manner: "Action" */
  Action_stream: Array<Action>;
  /** fetch data from the table: "Asset" */
  Asset: Array<Asset>;
  /** fetch data from the table: "Asset" using primary key columns */
  Asset_by_pk?: Maybe<Asset>;
  /** fetch data from the table in a streaming manner: "Asset" */
  Asset_stream: Array<Asset>;
  /** fetch data from the table: "Batch" */
  Batch: Array<Batch>;
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
  /** fetch data from the table: "Segment" */
  Segment: Array<Segment>;
  /** fetch data from the table: "Segment" using primary key columns */
  Segment_by_pk?: Maybe<Segment>;
  /** fetch data from the table in a streaming manner: "Segment" */
  Segment_stream: Array<Segment>;
  /** fetch data from the table: "Stream" */
  Stream: Array<Stream>;
  /** fetch data from the table: "Stream" using primary key columns */
  Stream_by_pk?: Maybe<Stream>;
  /** fetch data from the table in a streaming manner: "Stream" */
  Stream_stream: Array<Stream>;
  /** fetch data from the table: "Tranche" */
  Tranche: Array<Tranche>;
  /** fetch data from the table: "Tranche" using primary key columns */
  Tranche_by_pk?: Maybe<Tranche>;
  /** fetch data from the table in a streaming manner: "Tranche" */
  Tranche_stream: Array<Tranche>;
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


export type Subscription_RootBatchArgs = {
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


export type Subscription_RootSegmentArgs = {
  distinct_on?: InputMaybe<Array<Segment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Segment_Order_By>>;
  where?: InputMaybe<Segment_Bool_Exp>;
};


export type Subscription_RootSegment_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootSegment_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Segment_Stream_Cursor_Input>>;
  where?: InputMaybe<Segment_Bool_Exp>;
};


export type Subscription_RootStreamArgs = {
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

export type ActionFragmentFragment = { __typename?: 'Action', id: string, addressA?: string | null, addressB?: string | null, amountA?: any | null, amountB?: any | null, block: any, category: any, chainId: any, contract: string, fee?: any | null, from: string, hash: string, subgraphId: any, timestamp: any, stream?: { __typename?: 'Stream', id: string } | null };

export type AssetFragmentFragment = { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string };

export type BatchFragmentFragment = { __typename?: 'Batch', id: string, hash?: string | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null };

export type SegmentFragmentFragment = { __typename?: 'Segment', id: string, amount: any, endAmount: any, endTime: any, exponent: any, position: any, startAmount: any, startTime: any };

export type StreamFragmentBaseFragment = { __typename?: 'Stream', id: string, alias: string, assetDecimalsValue: any, cancelable: boolean, canceled: boolean, canceledTime?: any | null, category: any, chainId: any, cliff?: boolean | null, cliffAmount?: any | null, cliffTime?: any | null, contract: string, depositAmount: any, duration: any, endTime: any, funder: string, hash: string, initial?: boolean | null, initialAmount?: any | null, intactAmount: any, position: any, proxender?: string | null, proxied: boolean, recipient: string, renounceTime?: any | null, sender: string, shape?: string | null, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, withdrawnAmount: any, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, batch?: { __typename?: 'Batch', id: string, hash?: string | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null } | null };

export type TrancheFragmentFragment = { __typename?: 'Tranche', id: string, amount: any, endAmount: any, endTime: any, position: any, startAmount: any, startTime: any };

export type StreamFragmentFragment = { __typename?: 'Stream', id: string, alias: string, assetDecimalsValue: any, cancelable: boolean, canceled: boolean, canceledTime?: any | null, category: any, chainId: any, cliff?: boolean | null, cliffAmount?: any | null, cliffTime?: any | null, contract: string, depositAmount: any, duration: any, endTime: any, funder: string, hash: string, initial?: boolean | null, initialAmount?: any | null, intactAmount: any, position: any, proxender?: string | null, proxied: boolean, recipient: string, renounceTime?: any | null, sender: string, shape?: string | null, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, withdrawnAmount: any, segments: Array<{ __typename?: 'Segment', id: string, amount: any, endAmount: any, endTime: any, exponent: any, position: any, startAmount: any, startTime: any }>, tranches: Array<{ __typename?: 'Tranche', id: string, amount: any, endAmount: any, endTime: any, position: any, startAmount: any, startTime: any }>, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, batch?: { __typename?: 'Batch', id: string, hash?: string | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null } | null };

export type GetStreamQueryVariables = Exact<{
  streamId: Scalars['String']['input'];
}>;


export type GetStreamQuery = { __typename?: 'query_root', stream?: { __typename?: 'Stream', id: string, alias: string, assetDecimalsValue: any, cancelable: boolean, canceled: boolean, canceledTime?: any | null, category: any, chainId: any, cliff?: boolean | null, cliffAmount?: any | null, cliffTime?: any | null, contract: string, depositAmount: any, duration: any, endTime: any, funder: string, hash: string, initial?: boolean | null, initialAmount?: any | null, intactAmount: any, position: any, proxender?: string | null, proxied: boolean, recipient: string, renounceTime?: any | null, sender: string, shape?: string | null, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, withdrawnAmount: any, segments: Array<{ __typename?: 'Segment', id: string, amount: any, endAmount: any, endTime: any, exponent: any, position: any, startAmount: any, startTime: any }>, tranches: Array<{ __typename?: 'Tranche', id: string, amount: any, endAmount: any, endTime: any, position: any, startAmount: any, startTime: any }>, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, batch?: { __typename?: 'Batch', id: string, hash?: string | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null } | null } | null };

export type GetStreamWithActionsQueryVariables = Exact<{
  streamId: Scalars['String']['input'];
}>;


export type GetStreamWithActionsQuery = { __typename?: 'query_root', stream?: { __typename?: 'Stream', id: string, alias: string, assetDecimalsValue: any, cancelable: boolean, canceled: boolean, canceledTime?: any | null, category: any, chainId: any, cliff?: boolean | null, cliffAmount?: any | null, cliffTime?: any | null, contract: string, depositAmount: any, duration: any, endTime: any, funder: string, hash: string, initial?: boolean | null, initialAmount?: any | null, intactAmount: any, position: any, proxender?: string | null, proxied: boolean, recipient: string, renounceTime?: any | null, sender: string, shape?: string | null, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, withdrawnAmount: any, actions: Array<{ __typename?: 'Action', id: string, addressA?: string | null, addressB?: string | null, amountA?: any | null, amountB?: any | null, block: any, category: any, chainId: any, contract: string, fee?: any | null, from: string, hash: string, subgraphId: any, timestamp: any, stream?: { __typename?: 'Stream', id: string } | null }>, segments: Array<{ __typename?: 'Segment', id: string, amount: any, endAmount: any, endTime: any, exponent: any, position: any, startAmount: any, startTime: any }>, tranches: Array<{ __typename?: 'Tranche', id: string, amount: any, endAmount: any, endTime: any, position: any, startAmount: any, startTime: any }>, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, batch?: { __typename?: 'Batch', id: string, hash?: string | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null } | null } | null };

export type GetStreamsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderDirection: Order_By;
  where?: InputMaybe<Stream_Bool_Exp>;
}>;


export type GetStreamsQuery = { __typename?: 'query_root', streams: Array<{ __typename?: 'Stream', id: string, alias: string, assetDecimalsValue: any, cancelable: boolean, canceled: boolean, canceledTime?: any | null, category: any, chainId: any, cliff?: boolean | null, cliffAmount?: any | null, cliffTime?: any | null, contract: string, depositAmount: any, duration: any, endTime: any, funder: string, hash: string, initial?: boolean | null, initialAmount?: any | null, intactAmount: any, position: any, proxender?: string | null, proxied: boolean, recipient: string, renounceTime?: any | null, sender: string, shape?: string | null, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, withdrawnAmount: any, segments: Array<{ __typename?: 'Segment', id: string, amount: any, endAmount: any, endTime: any, exponent: any, position: any, startAmount: any, startTime: any }>, tranches: Array<{ __typename?: 'Tranche', id: string, amount: any, endAmount: any, endTime: any, position: any, startAmount: any, startTime: any }>, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, batch?: { __typename?: 'Batch', id: string, hash?: string | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null } | null }> };

export type GetStreamsWithActionsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  orderDirection: Order_By;
  where?: InputMaybe<Stream_Bool_Exp>;
}>;


export type GetStreamsWithActionsQuery = { __typename?: 'query_root', streams: Array<{ __typename?: 'Stream', id: string, alias: string, assetDecimalsValue: any, cancelable: boolean, canceled: boolean, canceledTime?: any | null, category: any, chainId: any, cliff?: boolean | null, cliffAmount?: any | null, cliffTime?: any | null, contract: string, depositAmount: any, duration: any, endTime: any, funder: string, hash: string, initial?: boolean | null, initialAmount?: any | null, intactAmount: any, position: any, proxender?: string | null, proxied: boolean, recipient: string, renounceTime?: any | null, sender: string, shape?: string | null, startTime: any, subgraphId: any, timestamp: any, tokenId: any, transferable: boolean, version: string, withdrawnAmount: any, actions: Array<{ __typename?: 'Action', id: string, addressA?: string | null, addressB?: string | null, amountA?: any | null, amountB?: any | null, block: any, category: any, chainId: any, contract: string, fee?: any | null, from: string, hash: string, subgraphId: any, timestamp: any, stream?: { __typename?: 'Stream', id: string } | null }>, segments: Array<{ __typename?: 'Segment', id: string, amount: any, endAmount: any, endTime: any, exponent: any, position: any, startAmount: any, startTime: any }>, tranches: Array<{ __typename?: 'Tranche', id: string, amount: any, endAmount: any, endTime: any, position: any, startAmount: any, startTime: any }>, asset?: { __typename?: 'Asset', id: string, address: string, chainId: any, decimals: any, name: string, symbol: string } | null, batch?: { __typename?: 'Batch', id: string, hash?: string | null, timestamp?: any | null, size: any, batcher?: { __typename?: 'Batcher', id: string } | null } | null }> };

export const ActionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addressA"}},{"kind":"Field","name":{"kind":"Name","value":"addressB"}},{"kind":"Field","name":{"kind":"Name","value":"amountA"}},{"kind":"Field","name":{"kind":"Name","value":"amountB"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"stream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ActionFragmentFragment, unknown>;
export const AssetFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]} as unknown as DocumentNode<AssetFragmentFragment, unknown>;
export const BatchFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<BatchFragmentFragment, unknown>;
export const StreamFragmentBaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"assetDecimalsValue"}},{"kind":"Field","name":{"kind":"Name","value":"cancelable"}},{"kind":"Field","name":{"kind":"Name","value":"canceled"}},{"kind":"Field","name":{"kind":"Name","value":"canceledTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"cliff"}},{"kind":"Field","name":{"kind":"Name","value":"cliffAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cliffTime"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depositAmount"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"funder"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"initial"}},{"kind":"Field","name":{"kind":"Name","value":"initialAmount"}},{"kind":"Field","name":{"kind":"Name","value":"intactAmount"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"proxender"}},{"kind":"Field","name":{"kind":"Name","value":"proxied"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"renounceTime"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"shape"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<StreamFragmentBaseFragment, unknown>;
export const SegmentFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SegmentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Segment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"exponent"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}}]} as unknown as DocumentNode<SegmentFragmentFragment, unknown>;
export const TrancheFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}}]} as unknown as DocumentNode<TrancheFragmentFragment, unknown>;
export const StreamFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SegmentFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"assetDecimalsValue"}},{"kind":"Field","name":{"kind":"Name","value":"cancelable"}},{"kind":"Field","name":{"kind":"Name","value":"canceled"}},{"kind":"Field","name":{"kind":"Name","value":"canceledTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"cliff"}},{"kind":"Field","name":{"kind":"Name","value":"cliffAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cliffTime"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depositAmount"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"funder"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"initial"}},{"kind":"Field","name":{"kind":"Name","value":"initialAmount"}},{"kind":"Field","name":{"kind":"Name","value":"intactAmount"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"proxender"}},{"kind":"Field","name":{"kind":"Name","value":"proxied"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"renounceTime"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"shape"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SegmentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Segment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"exponent"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}}]} as unknown as DocumentNode<StreamFragmentFragment, unknown>;
export const GetStreamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStream"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"streamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"stream"},"name":{"kind":"Name","value":"Stream_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"streamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"assetDecimalsValue"}},{"kind":"Field","name":{"kind":"Name","value":"cancelable"}},{"kind":"Field","name":{"kind":"Name","value":"canceled"}},{"kind":"Field","name":{"kind":"Name","value":"canceledTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"cliff"}},{"kind":"Field","name":{"kind":"Name","value":"cliffAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cliffTime"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depositAmount"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"funder"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"initial"}},{"kind":"Field","name":{"kind":"Name","value":"initialAmount"}},{"kind":"Field","name":{"kind":"Name","value":"intactAmount"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"proxender"}},{"kind":"Field","name":{"kind":"Name","value":"proxied"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"renounceTime"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"shape"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SegmentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Segment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"exponent"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SegmentFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}}]} as unknown as DocumentNode<GetStreamQuery, GetStreamQueryVariables>;
export const GetStreamWithActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStreamWithActions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"streamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"stream"},"name":{"kind":"Name","value":"Stream_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"streamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragment"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"assetDecimalsValue"}},{"kind":"Field","name":{"kind":"Name","value":"cancelable"}},{"kind":"Field","name":{"kind":"Name","value":"canceled"}},{"kind":"Field","name":{"kind":"Name","value":"canceledTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"cliff"}},{"kind":"Field","name":{"kind":"Name","value":"cliffAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cliffTime"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depositAmount"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"funder"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"initial"}},{"kind":"Field","name":{"kind":"Name","value":"initialAmount"}},{"kind":"Field","name":{"kind":"Name","value":"intactAmount"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"proxender"}},{"kind":"Field","name":{"kind":"Name","value":"proxied"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"renounceTime"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"shape"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SegmentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Segment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"exponent"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SegmentFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addressA"}},{"kind":"Field","name":{"kind":"Name","value":"addressB"}},{"kind":"Field","name":{"kind":"Name","value":"amountA"}},{"kind":"Field","name":{"kind":"Name","value":"amountB"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"stream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetStreamWithActionsQuery, GetStreamWithActionsQueryVariables>;
export const GetStreamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStreams"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"order_by"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Stream_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"streams"},"name":{"kind":"Name","value":"Stream"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"assetDecimalsValue"}},{"kind":"Field","name":{"kind":"Name","value":"cancelable"}},{"kind":"Field","name":{"kind":"Name","value":"canceled"}},{"kind":"Field","name":{"kind":"Name","value":"canceledTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"cliff"}},{"kind":"Field","name":{"kind":"Name","value":"cliffAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cliffTime"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depositAmount"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"funder"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"initial"}},{"kind":"Field","name":{"kind":"Name","value":"initialAmount"}},{"kind":"Field","name":{"kind":"Name","value":"intactAmount"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"proxender"}},{"kind":"Field","name":{"kind":"Name","value":"proxied"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"renounceTime"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"shape"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SegmentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Segment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"exponent"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SegmentFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}}]} as unknown as DocumentNode<GetStreamsQuery, GetStreamsQueryVariables>;
export const GetStreamsWithActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStreamsWithActions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"order_by"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Stream_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"streams"},"name":{"kind":"Name","value":"Stream"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragment"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BatchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Batch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"batcher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"assetDecimalsValue"}},{"kind":"Field","name":{"kind":"Name","value":"cancelable"}},{"kind":"Field","name":{"kind":"Name","value":"canceled"}},{"kind":"Field","name":{"kind":"Name","value":"canceledTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"cliff"}},{"kind":"Field","name":{"kind":"Name","value":"cliffAmount"}},{"kind":"Field","name":{"kind":"Name","value":"cliffTime"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"depositAmount"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"funder"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"initial"}},{"kind":"Field","name":{"kind":"Name","value":"initialAmount"}},{"kind":"Field","name":{"kind":"Name","value":"intactAmount"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"proxender"}},{"kind":"Field","name":{"kind":"Name","value":"proxied"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"renounceTime"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"shape"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transferable"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BatchFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SegmentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Segment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"exponent"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"endAmount"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startAmount"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Stream"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StreamFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"segments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SegmentFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addressA"}},{"kind":"Field","name":{"kind":"Name","value":"addressB"}},{"kind":"Field","name":{"kind":"Name","value":"amountA"}},{"kind":"Field","name":{"kind":"Name","value":"amountB"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"stream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetStreamsWithActionsQuery, GetStreamsWithActionsQueryVariables>;