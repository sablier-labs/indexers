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
  jsonb: { input: any; output: any; }
  numeric: { input: any; output: any; }
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
  fee?: Maybe<Scalars['numeric']['output']>;
  from: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
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
  block?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  claimAmount?: Maybe<Scalars['Float']['output']>;
  claimIndex?: Maybe<Scalars['Float']['output']>;
  claimTokenId?: Maybe<Scalars['Float']['output']>;
  clawbackAmount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
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
  fee?: InputMaybe<Numeric_Comparison_Exp>;
  from?: InputMaybe<String_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  subgraphId?: InputMaybe<Numeric_Comparison_Exp>;
  timestamp?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Action_Max_Fields = {
  __typename?: 'Action_max_fields';
  block?: Maybe<Scalars['numeric']['output']>;
  campaign_id?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['actioncategory']['output']>;
  chainId?: Maybe<Scalars['numeric']['output']>;
  claimAmount?: Maybe<Scalars['numeric']['output']>;
  claimIndex?: Maybe<Scalars['numeric']['output']>;
  claimRecipient?: Maybe<Scalars['String']['output']>;
  claimStreamId?: Maybe<Scalars['String']['output']>;
  claimTokenId?: Maybe<Scalars['numeric']['output']>;
  clawbackAmount?: Maybe<Scalars['numeric']['output']>;
  clawbackFrom?: Maybe<Scalars['String']['output']>;
  clawbackTo?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  subgraphId?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
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
  fee?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  subgraphId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Action_Min_Fields = {
  __typename?: 'Action_min_fields';
  block?: Maybe<Scalars['numeric']['output']>;
  campaign_id?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['actioncategory']['output']>;
  chainId?: Maybe<Scalars['numeric']['output']>;
  claimAmount?: Maybe<Scalars['numeric']['output']>;
  claimIndex?: Maybe<Scalars['numeric']['output']>;
  claimRecipient?: Maybe<Scalars['String']['output']>;
  claimStreamId?: Maybe<Scalars['String']['output']>;
  claimTokenId?: Maybe<Scalars['numeric']['output']>;
  clawbackAmount?: Maybe<Scalars['numeric']['output']>;
  clawbackFrom?: Maybe<Scalars['String']['output']>;
  clawbackTo?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  subgraphId?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
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

/** aggregate stddev on columns */
export type Action_Stddev_Fields = {
  __typename?: 'Action_stddev_fields';
  block?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  claimAmount?: Maybe<Scalars['Float']['output']>;
  claimIndex?: Maybe<Scalars['Float']['output']>;
  claimTokenId?: Maybe<Scalars['Float']['output']>;
  clawbackAmount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

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

/** aggregate stddev_pop on columns */
export type Action_Stddev_Pop_Fields = {
  __typename?: 'Action_stddev_pop_fields';
  block?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  claimAmount?: Maybe<Scalars['Float']['output']>;
  claimIndex?: Maybe<Scalars['Float']['output']>;
  claimTokenId?: Maybe<Scalars['Float']['output']>;
  clawbackAmount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
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

/** aggregate stddev_samp on columns */
export type Action_Stddev_Samp_Fields = {
  __typename?: 'Action_stddev_samp_fields';
  block?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  claimAmount?: Maybe<Scalars['Float']['output']>;
  claimIndex?: Maybe<Scalars['Float']['output']>;
  claimTokenId?: Maybe<Scalars['Float']['output']>;
  clawbackAmount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
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
  fee?: InputMaybe<Scalars['numeric']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  subgraphId?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Action_Sum_Fields = {
  __typename?: 'Action_sum_fields';
  block?: Maybe<Scalars['numeric']['output']>;
  chainId?: Maybe<Scalars['numeric']['output']>;
  claimAmount?: Maybe<Scalars['numeric']['output']>;
  claimIndex?: Maybe<Scalars['numeric']['output']>;
  claimTokenId?: Maybe<Scalars['numeric']['output']>;
  clawbackAmount?: Maybe<Scalars['numeric']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  subgraphId?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
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

/** aggregate var_pop on columns */
export type Action_Var_Pop_Fields = {
  __typename?: 'Action_var_pop_fields';
  block?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  claimAmount?: Maybe<Scalars['Float']['output']>;
  claimIndex?: Maybe<Scalars['Float']['output']>;
  claimTokenId?: Maybe<Scalars['Float']['output']>;
  clawbackAmount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
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

/** aggregate var_samp on columns */
export type Action_Var_Samp_Fields = {
  __typename?: 'Action_var_samp_fields';
  block?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  claimAmount?: Maybe<Scalars['Float']['output']>;
  claimIndex?: Maybe<Scalars['Float']['output']>;
  claimTokenId?: Maybe<Scalars['Float']['output']>;
  clawbackAmount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
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

/** aggregate variance on columns */
export type Action_Variance_Fields = {
  __typename?: 'Action_variance_fields';
  block?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  claimAmount?: Maybe<Scalars['Float']['output']>;
  claimIndex?: Maybe<Scalars['Float']['output']>;
  claimTokenId?: Maybe<Scalars['Float']['output']>;
  clawbackAmount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
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
  id: Scalars['String']['output'];
  timestamp: Scalars['numeric']['output'];
};

/** aggregated selection of "Activity" */
export type Activity_Aggregate = {
  __typename?: 'Activity_aggregate';
  aggregate?: Maybe<Activity_Aggregate_Fields>;
  nodes: Array<Activity>;
};

export type Activity_Aggregate_Bool_Exp = {
  count?: InputMaybe<Activity_Aggregate_Bool_Exp_Count>;
};

export type Activity_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Activity_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Activity_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "Activity" */
export type Activity_Aggregate_Fields = {
  __typename?: 'Activity_aggregate_fields';
  avg?: Maybe<Activity_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Activity_Max_Fields>;
  min?: Maybe<Activity_Min_Fields>;
  stddev?: Maybe<Activity_Stddev_Fields>;
  stddev_pop?: Maybe<Activity_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Activity_Stddev_Samp_Fields>;
  sum?: Maybe<Activity_Sum_Fields>;
  var_pop?: Maybe<Activity_Var_Pop_Fields>;
  var_samp?: Maybe<Activity_Var_Samp_Fields>;
  variance?: Maybe<Activity_Variance_Fields>;
};


/** aggregate fields of "Activity" */
export type Activity_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Activity_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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

/** aggregate avg on columns */
export type Activity_Avg_Fields = {
  __typename?: 'Activity_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  claims?: Maybe<Scalars['Float']['output']>;
  day?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
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
  id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Activity_Max_Fields = {
  __typename?: 'Activity_max_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  campaign_id?: Maybe<Scalars['String']['output']>;
  claims?: Maybe<Scalars['numeric']['output']>;
  day?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "Activity" */
export type Activity_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  campaign_id?: InputMaybe<Order_By>;
  claims?: InputMaybe<Order_By>;
  day?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Activity_Min_Fields = {
  __typename?: 'Activity_min_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  campaign_id?: Maybe<Scalars['String']['output']>;
  claims?: Maybe<Scalars['numeric']['output']>;
  day?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "Activity" */
export type Activity_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  campaign_id?: InputMaybe<Order_By>;
  claims?: InputMaybe<Order_By>;
  day?: InputMaybe<Order_By>;
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
  Id = 'id',
  /** column name */
  Timestamp = 'timestamp'
}

/** aggregate stddev on columns */
export type Activity_Stddev_Fields = {
  __typename?: 'Activity_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  claims?: Maybe<Scalars['Float']['output']>;
  day?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "Activity" */
export type Activity_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  claims?: InputMaybe<Order_By>;
  day?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Activity_Stddev_Pop_Fields = {
  __typename?: 'Activity_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  claims?: Maybe<Scalars['Float']['output']>;
  day?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "Activity" */
export type Activity_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  claims?: InputMaybe<Order_By>;
  day?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Activity_Stddev_Samp_Fields = {
  __typename?: 'Activity_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  claims?: Maybe<Scalars['Float']['output']>;
  day?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
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
  id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Activity_Sum_Fields = {
  __typename?: 'Activity_sum_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  claims?: Maybe<Scalars['numeric']['output']>;
  day?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "Activity" */
export type Activity_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  claims?: InputMaybe<Order_By>;
  day?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Activity_Var_Pop_Fields = {
  __typename?: 'Activity_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  claims?: Maybe<Scalars['Float']['output']>;
  day?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "Activity" */
export type Activity_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  claims?: InputMaybe<Order_By>;
  day?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Activity_Var_Samp_Fields = {
  __typename?: 'Activity_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  claims?: Maybe<Scalars['Float']['output']>;
  day?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "Activity" */
export type Activity_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  claims?: InputMaybe<Order_By>;
  day?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Activity_Variance_Fields = {
  __typename?: 'Activity_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  claims?: Maybe<Scalars['Float']['output']>;
  day?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
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
  /** An aggregate relationship */
  campaigns_aggregate: Campaign_Aggregate;
  chainId: Scalars['numeric']['output'];
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


/** columns and relationships of "Asset" */
export type AssetCampaigns_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Campaign_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Campaign_Order_By>>;
  where?: InputMaybe<Campaign_Bool_Exp>;
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
  campaigns?: InputMaybe<Campaign_Bool_Exp>;
  campaigns_aggregate?: InputMaybe<Campaign_Aggregate_Bool_Exp>;
  chainId?: InputMaybe<Numeric_Comparison_Exp>;
  decimals?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
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
  campaigns_aggregate?: InputMaybe<Campaign_Aggregate_Order_By>;
  chainId?: InputMaybe<Order_By>;
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
  /** An aggregate relationship */
  actions_aggregate: Action_Aggregate;
  /** An array relationship */
  activities: Array<Activity>;
  /** An aggregate relationship */
  activities_aggregate: Activity_Aggregate;
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
export type CampaignActions_AggregateArgs = {
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
export type CampaignActivities_AggregateArgs = {
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

/** aggregated selection of "Campaign" */
export type Campaign_Aggregate = {
  __typename?: 'Campaign_aggregate';
  aggregate?: Maybe<Campaign_Aggregate_Fields>;
  nodes: Array<Campaign>;
};

export type Campaign_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Campaign_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Campaign_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Campaign_Aggregate_Bool_Exp_Count>;
};

export type Campaign_Aggregate_Bool_Exp_Bool_And = {
  arguments: Campaign_Select_Column_Campaign_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Campaign_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Campaign_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Campaign_Select_Column_Campaign_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Campaign_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Campaign_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Campaign_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Campaign_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "Campaign" */
export type Campaign_Aggregate_Fields = {
  __typename?: 'Campaign_aggregate_fields';
  avg?: Maybe<Campaign_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Campaign_Max_Fields>;
  min?: Maybe<Campaign_Min_Fields>;
  stddev?: Maybe<Campaign_Stddev_Fields>;
  stddev_pop?: Maybe<Campaign_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Campaign_Stddev_Samp_Fields>;
  sum?: Maybe<Campaign_Sum_Fields>;
  var_pop?: Maybe<Campaign_Var_Pop_Fields>;
  var_samp?: Maybe<Campaign_Var_Samp_Fields>;
  variance?: Maybe<Campaign_Variance_Fields>;
};


/** aggregate fields of "Campaign" */
export type Campaign_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Campaign_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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

/** aggregate avg on columns */
export type Campaign_Avg_Fields = {
  __typename?: 'Campaign_avg_fields';
  aggregateAmount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  claimedAmount?: Maybe<Scalars['Float']['output']>;
  claimedCount?: Maybe<Scalars['Float']['output']>;
  clawbackTime?: Maybe<Scalars['Float']['output']>;
  expiration?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  streamCliffDuration?: Maybe<Scalars['Float']['output']>;
  streamCliffPercentage?: Maybe<Scalars['Float']['output']>;
  streamInitialPercentage?: Maybe<Scalars['Float']['output']>;
  streamStartTime?: Maybe<Scalars['Float']['output']>;
  streamTotalDuration?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  totalRecipients?: Maybe<Scalars['Float']['output']>;
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
  actions_aggregate?: InputMaybe<Action_Aggregate_Bool_Exp>;
  activities?: InputMaybe<Activity_Bool_Exp>;
  activities_aggregate?: InputMaybe<Activity_Aggregate_Bool_Exp>;
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

/** aggregate max on columns */
export type Campaign_Max_Fields = {
  __typename?: 'Campaign_max_fields';
  address?: Maybe<Scalars['String']['output']>;
  admin?: Maybe<Scalars['String']['output']>;
  aggregateAmount?: Maybe<Scalars['numeric']['output']>;
  asset_id?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['campaigncategory']['output']>;
  chainId?: Maybe<Scalars['numeric']['output']>;
  claimedAmount?: Maybe<Scalars['numeric']['output']>;
  claimedCount?: Maybe<Scalars['numeric']['output']>;
  clawbackAction_id?: Maybe<Scalars['String']['output']>;
  clawbackTime?: Maybe<Scalars['numeric']['output']>;
  expiration?: Maybe<Scalars['numeric']['output']>;
  factory_id?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  ipfsCID?: Maybe<Scalars['String']['output']>;
  lockup?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['numeric']['output']>;
  root?: Maybe<Scalars['String']['output']>;
  streamCliffDuration?: Maybe<Scalars['numeric']['output']>;
  streamCliffPercentage?: Maybe<Scalars['numeric']['output']>;
  streamInitialPercentage?: Maybe<Scalars['numeric']['output']>;
  streamShape?: Maybe<Scalars['String']['output']>;
  streamStartTime?: Maybe<Scalars['numeric']['output']>;
  streamTotalDuration?: Maybe<Scalars['numeric']['output']>;
  subgraphId?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
  totalRecipients?: Maybe<Scalars['numeric']['output']>;
  version?: Maybe<Scalars['String']['output']>;
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

/** aggregate min on columns */
export type Campaign_Min_Fields = {
  __typename?: 'Campaign_min_fields';
  address?: Maybe<Scalars['String']['output']>;
  admin?: Maybe<Scalars['String']['output']>;
  aggregateAmount?: Maybe<Scalars['numeric']['output']>;
  asset_id?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['campaigncategory']['output']>;
  chainId?: Maybe<Scalars['numeric']['output']>;
  claimedAmount?: Maybe<Scalars['numeric']['output']>;
  claimedCount?: Maybe<Scalars['numeric']['output']>;
  clawbackAction_id?: Maybe<Scalars['String']['output']>;
  clawbackTime?: Maybe<Scalars['numeric']['output']>;
  expiration?: Maybe<Scalars['numeric']['output']>;
  factory_id?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  ipfsCID?: Maybe<Scalars['String']['output']>;
  lockup?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['numeric']['output']>;
  root?: Maybe<Scalars['String']['output']>;
  streamCliffDuration?: Maybe<Scalars['numeric']['output']>;
  streamCliffPercentage?: Maybe<Scalars['numeric']['output']>;
  streamInitialPercentage?: Maybe<Scalars['numeric']['output']>;
  streamShape?: Maybe<Scalars['String']['output']>;
  streamStartTime?: Maybe<Scalars['numeric']['output']>;
  streamTotalDuration?: Maybe<Scalars['numeric']['output']>;
  subgraphId?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
  totalRecipients?: Maybe<Scalars['numeric']['output']>;
  version?: Maybe<Scalars['String']['output']>;
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

/** select "Campaign_aggregate_bool_exp_bool_and_arguments_columns" columns of table "Campaign" */
export enum Campaign_Select_Column_Campaign_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Expires = 'expires',
  /** column name */
  StreamCancelable = 'streamCancelable',
  /** column name */
  StreamCliff = 'streamCliff',
  /** column name */
  StreamInitial = 'streamInitial',
  /** column name */
  StreamStart = 'streamStart',
  /** column name */
  StreamTransferable = 'streamTransferable'
}

/** select "Campaign_aggregate_bool_exp_bool_or_arguments_columns" columns of table "Campaign" */
export enum Campaign_Select_Column_Campaign_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Expires = 'expires',
  /** column name */
  StreamCancelable = 'streamCancelable',
  /** column name */
  StreamCliff = 'streamCliff',
  /** column name */
  StreamInitial = 'streamInitial',
  /** column name */
  StreamStart = 'streamStart',
  /** column name */
  StreamTransferable = 'streamTransferable'
}

/** aggregate stddev on columns */
export type Campaign_Stddev_Fields = {
  __typename?: 'Campaign_stddev_fields';
  aggregateAmount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  claimedAmount?: Maybe<Scalars['Float']['output']>;
  claimedCount?: Maybe<Scalars['Float']['output']>;
  clawbackTime?: Maybe<Scalars['Float']['output']>;
  expiration?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  streamCliffDuration?: Maybe<Scalars['Float']['output']>;
  streamCliffPercentage?: Maybe<Scalars['Float']['output']>;
  streamInitialPercentage?: Maybe<Scalars['Float']['output']>;
  streamStartTime?: Maybe<Scalars['Float']['output']>;
  streamTotalDuration?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  totalRecipients?: Maybe<Scalars['Float']['output']>;
};

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

/** aggregate stddev_pop on columns */
export type Campaign_Stddev_Pop_Fields = {
  __typename?: 'Campaign_stddev_pop_fields';
  aggregateAmount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  claimedAmount?: Maybe<Scalars['Float']['output']>;
  claimedCount?: Maybe<Scalars['Float']['output']>;
  clawbackTime?: Maybe<Scalars['Float']['output']>;
  expiration?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  streamCliffDuration?: Maybe<Scalars['Float']['output']>;
  streamCliffPercentage?: Maybe<Scalars['Float']['output']>;
  streamInitialPercentage?: Maybe<Scalars['Float']['output']>;
  streamStartTime?: Maybe<Scalars['Float']['output']>;
  streamTotalDuration?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  totalRecipients?: Maybe<Scalars['Float']['output']>;
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

/** aggregate stddev_samp on columns */
export type Campaign_Stddev_Samp_Fields = {
  __typename?: 'Campaign_stddev_samp_fields';
  aggregateAmount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  claimedAmount?: Maybe<Scalars['Float']['output']>;
  claimedCount?: Maybe<Scalars['Float']['output']>;
  clawbackTime?: Maybe<Scalars['Float']['output']>;
  expiration?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  streamCliffDuration?: Maybe<Scalars['Float']['output']>;
  streamCliffPercentage?: Maybe<Scalars['Float']['output']>;
  streamInitialPercentage?: Maybe<Scalars['Float']['output']>;
  streamStartTime?: Maybe<Scalars['Float']['output']>;
  streamTotalDuration?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  totalRecipients?: Maybe<Scalars['Float']['output']>;
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

/** aggregate sum on columns */
export type Campaign_Sum_Fields = {
  __typename?: 'Campaign_sum_fields';
  aggregateAmount?: Maybe<Scalars['numeric']['output']>;
  chainId?: Maybe<Scalars['numeric']['output']>;
  claimedAmount?: Maybe<Scalars['numeric']['output']>;
  claimedCount?: Maybe<Scalars['numeric']['output']>;
  clawbackTime?: Maybe<Scalars['numeric']['output']>;
  expiration?: Maybe<Scalars['numeric']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['numeric']['output']>;
  streamCliffDuration?: Maybe<Scalars['numeric']['output']>;
  streamCliffPercentage?: Maybe<Scalars['numeric']['output']>;
  streamInitialPercentage?: Maybe<Scalars['numeric']['output']>;
  streamStartTime?: Maybe<Scalars['numeric']['output']>;
  streamTotalDuration?: Maybe<Scalars['numeric']['output']>;
  subgraphId?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
  totalRecipients?: Maybe<Scalars['numeric']['output']>;
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

/** aggregate var_pop on columns */
export type Campaign_Var_Pop_Fields = {
  __typename?: 'Campaign_var_pop_fields';
  aggregateAmount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  claimedAmount?: Maybe<Scalars['Float']['output']>;
  claimedCount?: Maybe<Scalars['Float']['output']>;
  clawbackTime?: Maybe<Scalars['Float']['output']>;
  expiration?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  streamCliffDuration?: Maybe<Scalars['Float']['output']>;
  streamCliffPercentage?: Maybe<Scalars['Float']['output']>;
  streamInitialPercentage?: Maybe<Scalars['Float']['output']>;
  streamStartTime?: Maybe<Scalars['Float']['output']>;
  streamTotalDuration?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  totalRecipients?: Maybe<Scalars['Float']['output']>;
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

/** aggregate var_samp on columns */
export type Campaign_Var_Samp_Fields = {
  __typename?: 'Campaign_var_samp_fields';
  aggregateAmount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  claimedAmount?: Maybe<Scalars['Float']['output']>;
  claimedCount?: Maybe<Scalars['Float']['output']>;
  clawbackTime?: Maybe<Scalars['Float']['output']>;
  expiration?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  streamCliffDuration?: Maybe<Scalars['Float']['output']>;
  streamCliffPercentage?: Maybe<Scalars['Float']['output']>;
  streamInitialPercentage?: Maybe<Scalars['Float']['output']>;
  streamStartTime?: Maybe<Scalars['Float']['output']>;
  streamTotalDuration?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  totalRecipients?: Maybe<Scalars['Float']['output']>;
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

/** aggregate variance on columns */
export type Campaign_Variance_Fields = {
  __typename?: 'Campaign_variance_fields';
  aggregateAmount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  claimedAmount?: Maybe<Scalars['Float']['output']>;
  claimedCount?: Maybe<Scalars['Float']['output']>;
  clawbackTime?: Maybe<Scalars['Float']['output']>;
  expiration?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  streamCliffDuration?: Maybe<Scalars['Float']['output']>;
  streamCliffPercentage?: Maybe<Scalars['Float']['output']>;
  streamInitialPercentage?: Maybe<Scalars['Float']['output']>;
  streamStartTime?: Maybe<Scalars['Float']['output']>;
  streamTotalDuration?: Maybe<Scalars['Float']['output']>;
  subgraphId?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  totalRecipients?: Maybe<Scalars['Float']['output']>;
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
  /** An aggregate relationship */
  campaigns_aggregate: Campaign_Aggregate;
  chainId: Scalars['numeric']['output'];
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


/** columns and relationships of "Factory" */
export type FactoryCampaigns_AggregateArgs = {
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
  campaigns_aggregate?: InputMaybe<Campaign_Aggregate_Bool_Exp>;
  chainId?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Factory". */
export type Factory_Order_By = {
  address?: InputMaybe<Order_By>;
  alias?: InputMaybe<Order_By>;
  campaignCounter?: InputMaybe<Order_By>;
  campaigns_aggregate?: InputMaybe<Campaign_Aggregate_Order_By>;
  chainId?: InputMaybe<Order_By>;
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

/** columns and relationships of "Watcher" */
export type Watcher = {
  __typename?: 'Watcher';
  actionCounter: Scalars['numeric']['output'];
  campaignCounter: Scalars['numeric']['output'];
  chainId: Scalars['numeric']['output'];
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
  id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Watcher". */
export type Watcher_Order_By = {
  actionCounter?: InputMaybe<Order_By>;
  campaignCounter?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
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
  id?: InputMaybe<Scalars['String']['input']>;
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
  /** fetch data from the table: "Activity" */
  Activity: Array<Activity>;
  /** fetch aggregated fields from the table: "Activity" */
  Activity_aggregate: Activity_Aggregate;
  /** fetch data from the table: "Activity" using primary key columns */
  Activity_by_pk?: Maybe<Activity>;
  /** fetch data from the table: "Asset" */
  Asset: Array<Asset>;
  /** fetch aggregated fields from the table: "Asset" */
  Asset_aggregate: Asset_Aggregate;
  /** fetch data from the table: "Asset" using primary key columns */
  Asset_by_pk?: Maybe<Asset>;
  /** fetch data from the table: "Campaign" */
  Campaign: Array<Campaign>;
  /** fetch aggregated fields from the table: "Campaign" */
  Campaign_aggregate: Campaign_Aggregate;
  /** fetch data from the table: "Campaign" using primary key columns */
  Campaign_by_pk?: Maybe<Campaign>;
  /** fetch data from the table: "Factory" */
  Factory: Array<Factory>;
  /** fetch data from the table: "Factory" using primary key columns */
  Factory_by_pk?: Maybe<Factory>;
  /** fetch data from the table: "Tranche" */
  Tranche: Array<Tranche>;
  /** fetch data from the table: "Tranche" using primary key columns */
  Tranche_by_pk?: Maybe<Tranche>;
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


export type Query_RootActivityArgs = {
  distinct_on?: InputMaybe<Array<Activity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Activity_Order_By>>;
  where?: InputMaybe<Activity_Bool_Exp>;
};


export type Query_RootActivity_AggregateArgs = {
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


export type Query_RootCampaignArgs = {
  distinct_on?: InputMaybe<Array<Campaign_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Campaign_Order_By>>;
  where?: InputMaybe<Campaign_Bool_Exp>;
};


export type Query_RootCampaign_AggregateArgs = {
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
  /** fetch data from the table: "Activity" */
  Activity: Array<Activity>;
  /** fetch aggregated fields from the table: "Activity" */
  Activity_aggregate: Activity_Aggregate;
  /** fetch data from the table: "Activity" using primary key columns */
  Activity_by_pk?: Maybe<Activity>;
  /** fetch data from the table in a streaming manner: "Activity" */
  Activity_stream: Array<Activity>;
  /** fetch data from the table: "Asset" */
  Asset: Array<Asset>;
  /** fetch aggregated fields from the table: "Asset" */
  Asset_aggregate: Asset_Aggregate;
  /** fetch data from the table: "Asset" using primary key columns */
  Asset_by_pk?: Maybe<Asset>;
  /** fetch data from the table in a streaming manner: "Asset" */
  Asset_stream: Array<Asset>;
  /** fetch data from the table: "Campaign" */
  Campaign: Array<Campaign>;
  /** fetch aggregated fields from the table: "Campaign" */
  Campaign_aggregate: Campaign_Aggregate;
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


export type Subscription_RootActivityArgs = {
  distinct_on?: InputMaybe<Array<Activity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Activity_Order_By>>;
  where?: InputMaybe<Activity_Bool_Exp>;
};


export type Subscription_RootActivity_AggregateArgs = {
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


export type Subscription_RootCampaignArgs = {
  distinct_on?: InputMaybe<Array<Campaign_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Campaign_Order_By>>;
  where?: InputMaybe<Campaign_Bool_Exp>;
};


export type Subscription_RootCampaign_AggregateArgs = {
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
export const GetCampaignsWithActivitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCampaignsWithActivities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"order_by"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"campaigns"},"name":{"kind":"Name","value":"Campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"distinct_on"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"subgraphId"}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragment"}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"timestamp"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActivityFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"streamTranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActivityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Activity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"claims"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetCampaignsWithActivitiesQuery, GetCampaignsWithActivitiesQueryVariables>;
export const GetCampaignsWithActionsAndActivitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCampaignsWithActionsAndActivities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"order_by"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"campaigns"},"name":{"kind":"Name","value":"Campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"distinct_on"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"subgraphId"}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragment"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"timestamp"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActivityFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"streamTranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimIndex"}},{"kind":"Field","name":{"kind":"Name","value":"claimRecipient"}},{"kind":"Field","name":{"kind":"Name","value":"claimStreamId"}},{"kind":"Field","name":{"kind":"Name","value":"claimTokenId"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackFrom"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTo"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActivityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Activity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"claims"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetCampaignsWithActionsAndActivitiesQuery, GetCampaignsWithActionsAndActivitiesQueryVariables>;
export const GetCampaignsWithClaimsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCampaignsWithClaims"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"claimer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"order_by"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"campaigns"},"name":{"kind":"Name","value":"Campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subgraphId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragment"}},{"kind":"Field","name":{"kind":"Name","value":"actions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"claimRecipient"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"claimer"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"category"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"StringValue","value":"Claim","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FactoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Factory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragmentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"aggregateAmount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimedCount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"ipfsCID"}},{"kind":"Field","name":{"kind":"Name","value":"lockup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"streamCancelable"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliff"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamCliffPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitial"}},{"kind":"Field","name":{"kind":"Name","value":"streamInitialPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"streamShape"}},{"kind":"Field","name":{"kind":"Name","value":"streamStart"}},{"kind":"Field","name":{"kind":"Name","value":"streamStartTime"}},{"kind":"Field","name":{"kind":"Name","value":"streamTotalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"streamTransferable"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecipients"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FactoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrancheFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tranche"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"endDuration"}},{"kind":"Field","name":{"kind":"Name","value":"endPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDuration"}},{"kind":"Field","name":{"kind":"Name","value":"startPercentage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CampaignFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Campaign"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CampaignFragmentBase"}},{"kind":"Field","name":{"kind":"Name","value":"streamTranches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrancheFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"claimAmount"}},{"kind":"Field","name":{"kind":"Name","value":"claimIndex"}},{"kind":"Field","name":{"kind":"Name","value":"claimRecipient"}},{"kind":"Field","name":{"kind":"Name","value":"claimStreamId"}},{"kind":"Field","name":{"kind":"Name","value":"claimTokenId"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackAmount"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackFrom"}},{"kind":"Field","name":{"kind":"Name","value":"clawbackTo"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"subgraphId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}}]} as unknown as DocumentNode<GetCampaignsWithClaimsQuery, GetCampaignsWithClaimsQueryVariables>;