/* TypeScript file generated from Entities.res by genType. */

/* eslint-disable */
/* tslint:disable */

export type id = string;

export type whereOperations<entity,fieldType> = { readonly eq: (_1:fieldType) => Promise<entity[]>; readonly gt: (_1:fieldType) => Promise<entity[]> };

export type Revenue_t = {
  readonly amount: number; 
  readonly chainId: bigint; 
  readonly currency: string; 
  readonly date: string; 
  readonly dateTimestamp: Date; 
  readonly id: id
};

export type Revenue_indexedFieldOperations = {};

export type RevenueTransaction_t = {
  readonly amount: number; 
  readonly block: bigint; 
  readonly hash: string; 
  readonly id: id; 
  readonly revenue_id: id; 
  readonly timestamp: bigint
};

export type RevenueTransaction_indexedFieldOperations = {};

export type User_t = {
  readonly address: string; 
  readonly chainId: bigint; 
  readonly id: id; 
  readonly isOnlyAirdropClaimer: boolean
};

export type User_indexedFieldOperations = {};

export type UserTransaction_t = {
  readonly block: bigint; 
  readonly fee: number; 
  readonly hash: string; 
  readonly id: id; 
  readonly isAirdropClaim: boolean; 
  readonly timestamp: bigint; 
  readonly user_id: id
};

export type UserTransaction_indexedFieldOperations = {};
