/* TypeScript file generated from Types.res by genType. */

/* eslint-disable */
/* tslint:disable */

import type {HandlerContext as $$handlerContext} from './Types.ts';

import type {HandlerWithOptions as $$fnWithEventConfig} from './bindings/OpaqueTypes.ts';

import type {LoaderContext as $$loaderContext} from './Types.ts';

import type {RevenueTransaction_t as Entities_RevenueTransaction_t} from '../src/db/Entities.gen';

import type {Revenue_t as Entities_Revenue_t} from '../src/db/Entities.gen';

import type {SingleOrMultiple as $$SingleOrMultiple_t} from './bindings/OpaqueTypes';

import type {UserTransaction_t as Entities_UserTransaction_t} from '../src/db/Entities.gen';

import type {User_t as Entities_User_t} from '../src/db/Entities.gen';

import type {entityHandlerContext as Internal_entityHandlerContext} from 'envio/src/Internal.gen';

import type {eventOptions as Internal_eventOptions} from 'envio/src/Internal.gen';

import type {genericContractRegisterArgs as Internal_genericContractRegisterArgs} from 'envio/src/Internal.gen';

import type {genericContractRegister as Internal_genericContractRegister} from 'envio/src/Internal.gen';

import type {genericEvent as Internal_genericEvent} from 'envio/src/Internal.gen';

import type {genericHandlerArgs as Internal_genericHandlerArgs} from 'envio/src/Internal.gen';

import type {genericHandlerWithLoader as Internal_genericHandlerWithLoader} from 'envio/src/Internal.gen';

import type {genericHandler as Internal_genericHandler} from 'envio/src/Internal.gen';

import type {genericLoaderArgs as Internal_genericLoaderArgs} from 'envio/src/Internal.gen';

import type {genericLoader as Internal_genericLoader} from 'envio/src/Internal.gen';

import type {logger as Envio_logger} from 'envio/src/Envio.gen';

import type {t as Address_t} from 'envio/src/Address.gen';

export type id = string;
export type Id = id;

export type contractRegistrations = {
  readonly log: Envio_logger; 
  readonly addSablierFlow_v1_0: (_1:Address_t) => void; 
  readonly addSablierFlow_v1_1: (_1:Address_t) => void; 
  readonly addSablierLockup_v2_0: (_1:Address_t) => void; 
  readonly addSablierMerkleFactory_v1_3: (_1:Address_t) => void; 
  readonly addSablierMerkleInstant_v1_3: (_1:Address_t) => void; 
  readonly addSablierMerkleLL_v1_3: (_1:Address_t) => void; 
  readonly addSablierMerkleLT_v1_3: (_1:Address_t) => void; 
  readonly addSablierV2LockupDynamic_v1_0: (_1:Address_t) => void; 
  readonly addSablierV2LockupDynamic_v1_1: (_1:Address_t) => void; 
  readonly addSablierV2LockupDynamic_v1_2: (_1:Address_t) => void; 
  readonly addSablierV2LockupLinear_v1_0: (_1:Address_t) => void; 
  readonly addSablierV2LockupLinear_v1_1: (_1:Address_t) => void; 
  readonly addSablierV2LockupLinear_v1_2: (_1:Address_t) => void; 
  readonly addSablierV2LockupTranched_v1_2: (_1:Address_t) => void; 
  readonly addSablierV2MerkleLL_v1_2: (_1:Address_t) => void; 
  readonly addSablierV2MerkleLT_v1_2: (_1:Address_t) => void; 
  readonly addSablierV2MerkleLockupFactory_v1_2: (_1:Address_t) => void; 
  readonly addSablierV2MerkleStreamerFactory_v1_1: (_1:Address_t) => void; 
  readonly addSablierV2MerkleStreamerLL_v1_1: (_1:Address_t) => void
};

export type entityLoaderContext<entity,indexedFieldOperations> = {
  readonly get: (_1:id) => Promise<(undefined | entity)>; 
  readonly getOrThrow: (_1:id, message:(undefined | string)) => Promise<entity>; 
  readonly getWhere: indexedFieldOperations; 
  readonly getOrCreate: (_1:entity) => Promise<entity>; 
  readonly set: (_1:entity) => void; 
  readonly deleteUnsafe: (_1:id) => void
};

export type loaderContext = $$loaderContext;

export type entityHandlerContext<entity> = Internal_entityHandlerContext<entity>;

export type handlerContext = $$handlerContext;

export type revenue = Entities_Revenue_t;
export type Revenue = revenue;

export type revenueTransaction = Entities_RevenueTransaction_t;
export type RevenueTransaction = revenueTransaction;

export type user = Entities_User_t;
export type User = user;

export type userTransaction = Entities_UserTransaction_t;
export type UserTransaction = userTransaction;

export type eventIdentifier = {
  readonly chainId: number; 
  readonly blockTimestamp: number; 
  readonly blockNumber: number; 
  readonly logIndex: number
};

export type entityUpdateAction<entityType> = "Delete" | { TAG: "Set"; _0: entityType };

export type entityUpdate<entityType> = {
  readonly eventIdentifier: eventIdentifier; 
  readonly entityId: id; 
  readonly entityUpdateAction: entityUpdateAction<entityType>
};

export type entityValueAtStartOfBatch<entityType> = 
    "NotSet"
  | { TAG: "AlreadySet"; _0: entityType };

export type updatedValue<entityType> = {
  readonly latest: entityUpdate<entityType>; 
  readonly history: entityUpdate<entityType>[]; 
  readonly containsRollbackDiffChange: boolean
};

export type inMemoryStoreRowEntity<entityType> = 
    { TAG: "Updated"; _0: updatedValue<entityType> }
  | { TAG: "InitialReadFromDb"; _0: entityValueAtStartOfBatch<entityType> };

export type Transaction_t = {
  readonly from: (undefined | Address_t); 
  readonly hash: string; 
  readonly to: (undefined | Address_t); 
  readonly transactionIndex: number; 
  readonly value: bigint
};

export type Block_t = {
  readonly number: number; 
  readonly timestamp: number; 
  readonly hash: string
};

export type AggregatedBlock_t = {
  readonly hash: string; 
  readonly number: number; 
  readonly timestamp: number
};

export type AggregatedTransaction_t = {
  readonly from: (undefined | Address_t); 
  readonly hash: string; 
  readonly to: (undefined | Address_t); 
  readonly transactionIndex: number; 
  readonly value: bigint
};

export type eventLog<params> = Internal_genericEvent<params,Block_t,Transaction_t>;
export type EventLog<params> = eventLog<params>;

export type SingleOrMultiple_t<a> = $$SingleOrMultiple_t<a>;

export type HandlerTypes_args<eventArgs,context> = { readonly event: eventLog<eventArgs>; readonly context: context };

export type HandlerTypes_contractRegisterArgs<eventArgs> = Internal_genericContractRegisterArgs<eventLog<eventArgs>,contractRegistrations>;

export type HandlerTypes_contractRegister<eventArgs> = Internal_genericContractRegister<HandlerTypes_contractRegisterArgs<eventArgs>>;

export type HandlerTypes_loaderArgs<eventArgs> = Internal_genericLoaderArgs<eventLog<eventArgs>,loaderContext>;

export type HandlerTypes_loader<eventArgs,loaderReturn> = Internal_genericLoader<HandlerTypes_loaderArgs<eventArgs>,loaderReturn>;

export type HandlerTypes_handlerArgs<eventArgs,loaderReturn> = Internal_genericHandlerArgs<eventLog<eventArgs>,handlerContext,loaderReturn>;

export type HandlerTypes_handler<eventArgs,loaderReturn> = Internal_genericHandler<HandlerTypes_handlerArgs<eventArgs,loaderReturn>>;

export type HandlerTypes_loaderHandler<eventArgs,loaderReturn,eventFilters> = Internal_genericHandlerWithLoader<HandlerTypes_loader<eventArgs,loaderReturn>,HandlerTypes_handler<eventArgs,loaderReturn>,eventFilters>;

export type HandlerTypes_eventConfig<eventFilters> = Internal_eventOptions<eventFilters>;

export type fnWithEventConfig<fn,eventConfig> = $$fnWithEventConfig<fn,eventConfig>;

export type handlerWithOptions<eventArgs,loaderReturn,eventFilters> = fnWithEventConfig<HandlerTypes_handler<eventArgs,loaderReturn>,HandlerTypes_eventConfig<eventFilters>>;

export type contractRegisterWithOptions<eventArgs,eventFilters> = fnWithEventConfig<HandlerTypes_contractRegister<eventArgs>,HandlerTypes_eventConfig<eventFilters>>;

export type SablierFlow_v1_0_chainId = 
    1
  | 10
  | 56
  | 100
  | 137
  | 324
  | 1890
  | 2741
  | 2818
  | 5330
  | 5845
  | 8453
  | 34443
  | 42161
  | 43114
  | 59144
  | 81457
  | 84532
  | 88888
  | 534352
  | 11155111;

export type SablierFlow_v1_0_Approval_eventArgs = {
  readonly owner: Address_t; 
  readonly approved: Address_t; 
  readonly tokenId: bigint
};

export type SablierFlow_v1_0_Approval_block = Block_t;

export type SablierFlow_v1_0_Approval_transaction = Transaction_t;

export type SablierFlow_v1_0_Approval_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_0_Approval_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_0_Approval_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_0_Approval_block
};

export type SablierFlow_v1_0_Approval_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_0_Approval_event,loaderContext>;

export type SablierFlow_v1_0_Approval_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_0_Approval_loaderArgs,loaderReturn>;

export type SablierFlow_v1_0_Approval_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_0_Approval_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_0_Approval_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_0_Approval_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_0_Approval_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_0_Approval_event,contractRegistrations>>;

export type SablierFlow_v1_0_Approval_eventFilter = {
  readonly owner?: SingleOrMultiple_t<Address_t>; 
  readonly approved?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierFlow_v1_0_Approval_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_0_Approval_eventFiltersDefinition = 
    SablierFlow_v1_0_Approval_eventFilter
  | SablierFlow_v1_0_Approval_eventFilter[];

export type SablierFlow_v1_0_Approval_eventFilters = 
    SablierFlow_v1_0_Approval_eventFilter
  | SablierFlow_v1_0_Approval_eventFilter[]
  | ((_1:SablierFlow_v1_0_Approval_eventFiltersArgs) => SablierFlow_v1_0_Approval_eventFiltersDefinition);

export type SablierFlow_v1_0_ApprovalForAll_eventArgs = {
  readonly owner: Address_t; 
  readonly operator: Address_t; 
  readonly approved: boolean
};

export type SablierFlow_v1_0_ApprovalForAll_block = Block_t;

export type SablierFlow_v1_0_ApprovalForAll_transaction = Transaction_t;

export type SablierFlow_v1_0_ApprovalForAll_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_0_ApprovalForAll_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_0_ApprovalForAll_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_0_ApprovalForAll_block
};

export type SablierFlow_v1_0_ApprovalForAll_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_0_ApprovalForAll_event,loaderContext>;

export type SablierFlow_v1_0_ApprovalForAll_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_0_ApprovalForAll_loaderArgs,loaderReturn>;

export type SablierFlow_v1_0_ApprovalForAll_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_0_ApprovalForAll_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_0_ApprovalForAll_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_0_ApprovalForAll_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_0_ApprovalForAll_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_0_ApprovalForAll_event,contractRegistrations>>;

export type SablierFlow_v1_0_ApprovalForAll_eventFilter = { readonly owner?: SingleOrMultiple_t<Address_t>; readonly operator?: SingleOrMultiple_t<Address_t> };

export type SablierFlow_v1_0_ApprovalForAll_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_0_ApprovalForAll_eventFiltersDefinition = 
    SablierFlow_v1_0_ApprovalForAll_eventFilter
  | SablierFlow_v1_0_ApprovalForAll_eventFilter[];

export type SablierFlow_v1_0_ApprovalForAll_eventFilters = 
    SablierFlow_v1_0_ApprovalForAll_eventFilter
  | SablierFlow_v1_0_ApprovalForAll_eventFilter[]
  | ((_1:SablierFlow_v1_0_ApprovalForAll_eventFiltersArgs) => SablierFlow_v1_0_ApprovalForAll_eventFiltersDefinition);

export type SablierFlow_v1_0_Transfer_eventArgs = {
  readonly from: Address_t; 
  readonly to: Address_t; 
  readonly tokenId: bigint
};

export type SablierFlow_v1_0_Transfer_block = Block_t;

export type SablierFlow_v1_0_Transfer_transaction = Transaction_t;

export type SablierFlow_v1_0_Transfer_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_0_Transfer_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_0_Transfer_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_0_Transfer_block
};

export type SablierFlow_v1_0_Transfer_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_0_Transfer_event,loaderContext>;

export type SablierFlow_v1_0_Transfer_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_0_Transfer_loaderArgs,loaderReturn>;

export type SablierFlow_v1_0_Transfer_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_0_Transfer_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_0_Transfer_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_0_Transfer_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_0_Transfer_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_0_Transfer_event,contractRegistrations>>;

export type SablierFlow_v1_0_Transfer_eventFilter = {
  readonly from?: SingleOrMultiple_t<Address_t>; 
  readonly to?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierFlow_v1_0_Transfer_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_0_Transfer_eventFiltersDefinition = 
    SablierFlow_v1_0_Transfer_eventFilter
  | SablierFlow_v1_0_Transfer_eventFilter[];

export type SablierFlow_v1_0_Transfer_eventFilters = 
    SablierFlow_v1_0_Transfer_eventFilter
  | SablierFlow_v1_0_Transfer_eventFilter[]
  | ((_1:SablierFlow_v1_0_Transfer_eventFiltersArgs) => SablierFlow_v1_0_Transfer_eventFiltersDefinition);

export type SablierFlow_v1_0_AdjustFlowStream_eventArgs = {
  readonly streamId: bigint; 
  readonly totalDebt: bigint; 
  readonly oldRatePerSecond: bigint; 
  readonly newRatePerSecond: bigint
};

export type SablierFlow_v1_0_AdjustFlowStream_block = Block_t;

export type SablierFlow_v1_0_AdjustFlowStream_transaction = Transaction_t;

export type SablierFlow_v1_0_AdjustFlowStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_0_AdjustFlowStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_0_AdjustFlowStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_0_AdjustFlowStream_block
};

export type SablierFlow_v1_0_AdjustFlowStream_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_0_AdjustFlowStream_event,loaderContext>;

export type SablierFlow_v1_0_AdjustFlowStream_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_0_AdjustFlowStream_loaderArgs,loaderReturn>;

export type SablierFlow_v1_0_AdjustFlowStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_0_AdjustFlowStream_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_0_AdjustFlowStream_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_0_AdjustFlowStream_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_0_AdjustFlowStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_0_AdjustFlowStream_event,contractRegistrations>>;

export type SablierFlow_v1_0_AdjustFlowStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint> };

export type SablierFlow_v1_0_AdjustFlowStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_0_AdjustFlowStream_eventFiltersDefinition = 
    SablierFlow_v1_0_AdjustFlowStream_eventFilter
  | SablierFlow_v1_0_AdjustFlowStream_eventFilter[];

export type SablierFlow_v1_0_AdjustFlowStream_eventFilters = 
    SablierFlow_v1_0_AdjustFlowStream_eventFilter
  | SablierFlow_v1_0_AdjustFlowStream_eventFilter[]
  | ((_1:SablierFlow_v1_0_AdjustFlowStream_eventFiltersArgs) => SablierFlow_v1_0_AdjustFlowStream_eventFiltersDefinition);

export type SablierFlow_v1_0_CreateFlowStream_eventArgs = {
  readonly streamId: bigint; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly ratePerSecond: bigint; 
  readonly token: Address_t; 
  readonly transferable: boolean
};

export type SablierFlow_v1_0_CreateFlowStream_block = Block_t;

export type SablierFlow_v1_0_CreateFlowStream_transaction = Transaction_t;

export type SablierFlow_v1_0_CreateFlowStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_0_CreateFlowStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_0_CreateFlowStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_0_CreateFlowStream_block
};

export type SablierFlow_v1_0_CreateFlowStream_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_0_CreateFlowStream_event,loaderContext>;

export type SablierFlow_v1_0_CreateFlowStream_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_0_CreateFlowStream_loaderArgs,loaderReturn>;

export type SablierFlow_v1_0_CreateFlowStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_0_CreateFlowStream_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_0_CreateFlowStream_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_0_CreateFlowStream_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_0_CreateFlowStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_0_CreateFlowStream_event,contractRegistrations>>;

export type SablierFlow_v1_0_CreateFlowStream_eventFilter = {
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>; 
  readonly token?: SingleOrMultiple_t<Address_t>
};

export type SablierFlow_v1_0_CreateFlowStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_0_CreateFlowStream_eventFiltersDefinition = 
    SablierFlow_v1_0_CreateFlowStream_eventFilter
  | SablierFlow_v1_0_CreateFlowStream_eventFilter[];

export type SablierFlow_v1_0_CreateFlowStream_eventFilters = 
    SablierFlow_v1_0_CreateFlowStream_eventFilter
  | SablierFlow_v1_0_CreateFlowStream_eventFilter[]
  | ((_1:SablierFlow_v1_0_CreateFlowStream_eventFiltersArgs) => SablierFlow_v1_0_CreateFlowStream_eventFiltersDefinition);

export type SablierFlow_v1_0_DepositFlowStream_eventArgs = {
  readonly streamId: bigint; 
  readonly funder: Address_t; 
  readonly amount: bigint
};

export type SablierFlow_v1_0_DepositFlowStream_block = Block_t;

export type SablierFlow_v1_0_DepositFlowStream_transaction = Transaction_t;

export type SablierFlow_v1_0_DepositFlowStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_0_DepositFlowStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_0_DepositFlowStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_0_DepositFlowStream_block
};

export type SablierFlow_v1_0_DepositFlowStream_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_0_DepositFlowStream_event,loaderContext>;

export type SablierFlow_v1_0_DepositFlowStream_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_0_DepositFlowStream_loaderArgs,loaderReturn>;

export type SablierFlow_v1_0_DepositFlowStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_0_DepositFlowStream_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_0_DepositFlowStream_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_0_DepositFlowStream_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_0_DepositFlowStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_0_DepositFlowStream_event,contractRegistrations>>;

export type SablierFlow_v1_0_DepositFlowStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint>; readonly funder?: SingleOrMultiple_t<Address_t> };

export type SablierFlow_v1_0_DepositFlowStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_0_DepositFlowStream_eventFiltersDefinition = 
    SablierFlow_v1_0_DepositFlowStream_eventFilter
  | SablierFlow_v1_0_DepositFlowStream_eventFilter[];

export type SablierFlow_v1_0_DepositFlowStream_eventFilters = 
    SablierFlow_v1_0_DepositFlowStream_eventFilter
  | SablierFlow_v1_0_DepositFlowStream_eventFilter[]
  | ((_1:SablierFlow_v1_0_DepositFlowStream_eventFiltersArgs) => SablierFlow_v1_0_DepositFlowStream_eventFiltersDefinition);

export type SablierFlow_v1_0_PauseFlowStream_eventArgs = {
  readonly streamId: bigint; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly totalDebt: bigint
};

export type SablierFlow_v1_0_PauseFlowStream_block = Block_t;

export type SablierFlow_v1_0_PauseFlowStream_transaction = Transaction_t;

export type SablierFlow_v1_0_PauseFlowStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_0_PauseFlowStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_0_PauseFlowStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_0_PauseFlowStream_block
};

export type SablierFlow_v1_0_PauseFlowStream_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_0_PauseFlowStream_event,loaderContext>;

export type SablierFlow_v1_0_PauseFlowStream_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_0_PauseFlowStream_loaderArgs,loaderReturn>;

export type SablierFlow_v1_0_PauseFlowStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_0_PauseFlowStream_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_0_PauseFlowStream_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_0_PauseFlowStream_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_0_PauseFlowStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_0_PauseFlowStream_event,contractRegistrations>>;

export type SablierFlow_v1_0_PauseFlowStream_eventFilter = {
  readonly streamId?: SingleOrMultiple_t<bigint>; 
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>
};

export type SablierFlow_v1_0_PauseFlowStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_0_PauseFlowStream_eventFiltersDefinition = 
    SablierFlow_v1_0_PauseFlowStream_eventFilter
  | SablierFlow_v1_0_PauseFlowStream_eventFilter[];

export type SablierFlow_v1_0_PauseFlowStream_eventFilters = 
    SablierFlow_v1_0_PauseFlowStream_eventFilter
  | SablierFlow_v1_0_PauseFlowStream_eventFilter[]
  | ((_1:SablierFlow_v1_0_PauseFlowStream_eventFiltersArgs) => SablierFlow_v1_0_PauseFlowStream_eventFiltersDefinition);

export type SablierFlow_v1_0_RefundFromFlowStream_eventArgs = {
  readonly streamId: bigint; 
  readonly sender: Address_t; 
  readonly amount: bigint
};

export type SablierFlow_v1_0_RefundFromFlowStream_block = Block_t;

export type SablierFlow_v1_0_RefundFromFlowStream_transaction = Transaction_t;

export type SablierFlow_v1_0_RefundFromFlowStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_0_RefundFromFlowStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_0_RefundFromFlowStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_0_RefundFromFlowStream_block
};

export type SablierFlow_v1_0_RefundFromFlowStream_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_0_RefundFromFlowStream_event,loaderContext>;

export type SablierFlow_v1_0_RefundFromFlowStream_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_0_RefundFromFlowStream_loaderArgs,loaderReturn>;

export type SablierFlow_v1_0_RefundFromFlowStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_0_RefundFromFlowStream_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_0_RefundFromFlowStream_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_0_RefundFromFlowStream_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_0_RefundFromFlowStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_0_RefundFromFlowStream_event,contractRegistrations>>;

export type SablierFlow_v1_0_RefundFromFlowStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint>; readonly sender?: SingleOrMultiple_t<Address_t> };

export type SablierFlow_v1_0_RefundFromFlowStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_0_RefundFromFlowStream_eventFiltersDefinition = 
    SablierFlow_v1_0_RefundFromFlowStream_eventFilter
  | SablierFlow_v1_0_RefundFromFlowStream_eventFilter[];

export type SablierFlow_v1_0_RefundFromFlowStream_eventFilters = 
    SablierFlow_v1_0_RefundFromFlowStream_eventFilter
  | SablierFlow_v1_0_RefundFromFlowStream_eventFilter[]
  | ((_1:SablierFlow_v1_0_RefundFromFlowStream_eventFiltersArgs) => SablierFlow_v1_0_RefundFromFlowStream_eventFiltersDefinition);

export type SablierFlow_v1_0_RestartFlowStream_eventArgs = {
  readonly streamId: bigint; 
  readonly sender: Address_t; 
  readonly ratePerSecond: bigint
};

export type SablierFlow_v1_0_RestartFlowStream_block = Block_t;

export type SablierFlow_v1_0_RestartFlowStream_transaction = Transaction_t;

export type SablierFlow_v1_0_RestartFlowStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_0_RestartFlowStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_0_RestartFlowStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_0_RestartFlowStream_block
};

export type SablierFlow_v1_0_RestartFlowStream_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_0_RestartFlowStream_event,loaderContext>;

export type SablierFlow_v1_0_RestartFlowStream_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_0_RestartFlowStream_loaderArgs,loaderReturn>;

export type SablierFlow_v1_0_RestartFlowStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_0_RestartFlowStream_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_0_RestartFlowStream_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_0_RestartFlowStream_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_0_RestartFlowStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_0_RestartFlowStream_event,contractRegistrations>>;

export type SablierFlow_v1_0_RestartFlowStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint>; readonly sender?: SingleOrMultiple_t<Address_t> };

export type SablierFlow_v1_0_RestartFlowStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_0_RestartFlowStream_eventFiltersDefinition = 
    SablierFlow_v1_0_RestartFlowStream_eventFilter
  | SablierFlow_v1_0_RestartFlowStream_eventFilter[];

export type SablierFlow_v1_0_RestartFlowStream_eventFilters = 
    SablierFlow_v1_0_RestartFlowStream_eventFilter
  | SablierFlow_v1_0_RestartFlowStream_eventFilter[]
  | ((_1:SablierFlow_v1_0_RestartFlowStream_eventFiltersArgs) => SablierFlow_v1_0_RestartFlowStream_eventFiltersDefinition);

export type SablierFlow_v1_0_VoidFlowStream_eventArgs = {
  readonly streamId: bigint; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly caller: Address_t; 
  readonly newTotalDebt: bigint; 
  readonly writtenOffDebt: bigint
};

export type SablierFlow_v1_0_VoidFlowStream_block = Block_t;

export type SablierFlow_v1_0_VoidFlowStream_transaction = Transaction_t;

export type SablierFlow_v1_0_VoidFlowStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_0_VoidFlowStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_0_VoidFlowStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_0_VoidFlowStream_block
};

export type SablierFlow_v1_0_VoidFlowStream_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_0_VoidFlowStream_event,loaderContext>;

export type SablierFlow_v1_0_VoidFlowStream_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_0_VoidFlowStream_loaderArgs,loaderReturn>;

export type SablierFlow_v1_0_VoidFlowStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_0_VoidFlowStream_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_0_VoidFlowStream_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_0_VoidFlowStream_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_0_VoidFlowStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_0_VoidFlowStream_event,contractRegistrations>>;

export type SablierFlow_v1_0_VoidFlowStream_eventFilter = {
  readonly streamId?: SingleOrMultiple_t<bigint>; 
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>
};

export type SablierFlow_v1_0_VoidFlowStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_0_VoidFlowStream_eventFiltersDefinition = 
    SablierFlow_v1_0_VoidFlowStream_eventFilter
  | SablierFlow_v1_0_VoidFlowStream_eventFilter[];

export type SablierFlow_v1_0_VoidFlowStream_eventFilters = 
    SablierFlow_v1_0_VoidFlowStream_eventFilter
  | SablierFlow_v1_0_VoidFlowStream_eventFilter[]
  | ((_1:SablierFlow_v1_0_VoidFlowStream_eventFiltersArgs) => SablierFlow_v1_0_VoidFlowStream_eventFiltersDefinition);

export type SablierFlow_v1_0_WithdrawFromFlowStream_eventArgs = {
  readonly streamId: bigint; 
  readonly to: Address_t; 
  readonly token: Address_t; 
  readonly caller: Address_t; 
  readonly withdrawAmount: bigint; 
  readonly protocolFeeAmount: bigint
};

export type SablierFlow_v1_0_WithdrawFromFlowStream_block = Block_t;

export type SablierFlow_v1_0_WithdrawFromFlowStream_transaction = Transaction_t;

export type SablierFlow_v1_0_WithdrawFromFlowStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_0_WithdrawFromFlowStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_0_WithdrawFromFlowStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_0_WithdrawFromFlowStream_block
};

export type SablierFlow_v1_0_WithdrawFromFlowStream_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_0_WithdrawFromFlowStream_event,loaderContext>;

export type SablierFlow_v1_0_WithdrawFromFlowStream_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_0_WithdrawFromFlowStream_loaderArgs,loaderReturn>;

export type SablierFlow_v1_0_WithdrawFromFlowStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_0_WithdrawFromFlowStream_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_0_WithdrawFromFlowStream_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_0_WithdrawFromFlowStream_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_0_WithdrawFromFlowStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_0_WithdrawFromFlowStream_event,contractRegistrations>>;

export type SablierFlow_v1_0_WithdrawFromFlowStream_eventFilter = {
  readonly streamId?: SingleOrMultiple_t<bigint>; 
  readonly to?: SingleOrMultiple_t<Address_t>; 
  readonly token?: SingleOrMultiple_t<Address_t>
};

export type SablierFlow_v1_0_WithdrawFromFlowStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_0_WithdrawFromFlowStream_eventFiltersDefinition = 
    SablierFlow_v1_0_WithdrawFromFlowStream_eventFilter
  | SablierFlow_v1_0_WithdrawFromFlowStream_eventFilter[];

export type SablierFlow_v1_0_WithdrawFromFlowStream_eventFilters = 
    SablierFlow_v1_0_WithdrawFromFlowStream_eventFilter
  | SablierFlow_v1_0_WithdrawFromFlowStream_eventFilter[]
  | ((_1:SablierFlow_v1_0_WithdrawFromFlowStream_eventFiltersArgs) => SablierFlow_v1_0_WithdrawFromFlowStream_eventFiltersDefinition);

export type SablierFlow_v1_1_chainId = 
    1
  | 10
  | 50
  | 56
  | 100
  | 130
  | 137
  | 324
  | 478
  | 1890
  | 2741
  | 2818
  | 5330
  | 5845
  | 8453
  | 34443
  | 42161
  | 43114
  | 50104
  | 59144
  | 80094
  | 81457
  | 84532
  | 88888
  | 534352
  | 11155111;

export type SablierFlow_v1_1_Approval_eventArgs = {
  readonly owner: Address_t; 
  readonly approved: Address_t; 
  readonly tokenId: bigint
};

export type SablierFlow_v1_1_Approval_block = Block_t;

export type SablierFlow_v1_1_Approval_transaction = Transaction_t;

export type SablierFlow_v1_1_Approval_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_1_Approval_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_1_Approval_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_1_Approval_block
};

export type SablierFlow_v1_1_Approval_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_1_Approval_event,loaderContext>;

export type SablierFlow_v1_1_Approval_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_1_Approval_loaderArgs,loaderReturn>;

export type SablierFlow_v1_1_Approval_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_1_Approval_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_1_Approval_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_1_Approval_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_1_Approval_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_1_Approval_event,contractRegistrations>>;

export type SablierFlow_v1_1_Approval_eventFilter = {
  readonly owner?: SingleOrMultiple_t<Address_t>; 
  readonly approved?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierFlow_v1_1_Approval_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_1_Approval_eventFiltersDefinition = 
    SablierFlow_v1_1_Approval_eventFilter
  | SablierFlow_v1_1_Approval_eventFilter[];

export type SablierFlow_v1_1_Approval_eventFilters = 
    SablierFlow_v1_1_Approval_eventFilter
  | SablierFlow_v1_1_Approval_eventFilter[]
  | ((_1:SablierFlow_v1_1_Approval_eventFiltersArgs) => SablierFlow_v1_1_Approval_eventFiltersDefinition);

export type SablierFlow_v1_1_ApprovalForAll_eventArgs = {
  readonly owner: Address_t; 
  readonly operator: Address_t; 
  readonly approved: boolean
};

export type SablierFlow_v1_1_ApprovalForAll_block = Block_t;

export type SablierFlow_v1_1_ApprovalForAll_transaction = Transaction_t;

export type SablierFlow_v1_1_ApprovalForAll_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_1_ApprovalForAll_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_1_ApprovalForAll_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_1_ApprovalForAll_block
};

export type SablierFlow_v1_1_ApprovalForAll_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_1_ApprovalForAll_event,loaderContext>;

export type SablierFlow_v1_1_ApprovalForAll_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_1_ApprovalForAll_loaderArgs,loaderReturn>;

export type SablierFlow_v1_1_ApprovalForAll_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_1_ApprovalForAll_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_1_ApprovalForAll_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_1_ApprovalForAll_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_1_ApprovalForAll_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_1_ApprovalForAll_event,contractRegistrations>>;

export type SablierFlow_v1_1_ApprovalForAll_eventFilter = { readonly owner?: SingleOrMultiple_t<Address_t>; readonly operator?: SingleOrMultiple_t<Address_t> };

export type SablierFlow_v1_1_ApprovalForAll_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_1_ApprovalForAll_eventFiltersDefinition = 
    SablierFlow_v1_1_ApprovalForAll_eventFilter
  | SablierFlow_v1_1_ApprovalForAll_eventFilter[];

export type SablierFlow_v1_1_ApprovalForAll_eventFilters = 
    SablierFlow_v1_1_ApprovalForAll_eventFilter
  | SablierFlow_v1_1_ApprovalForAll_eventFilter[]
  | ((_1:SablierFlow_v1_1_ApprovalForAll_eventFiltersArgs) => SablierFlow_v1_1_ApprovalForAll_eventFiltersDefinition);

export type SablierFlow_v1_1_Transfer_eventArgs = {
  readonly from: Address_t; 
  readonly to: Address_t; 
  readonly tokenId: bigint
};

export type SablierFlow_v1_1_Transfer_block = Block_t;

export type SablierFlow_v1_1_Transfer_transaction = Transaction_t;

export type SablierFlow_v1_1_Transfer_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_1_Transfer_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_1_Transfer_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_1_Transfer_block
};

export type SablierFlow_v1_1_Transfer_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_1_Transfer_event,loaderContext>;

export type SablierFlow_v1_1_Transfer_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_1_Transfer_loaderArgs,loaderReturn>;

export type SablierFlow_v1_1_Transfer_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_1_Transfer_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_1_Transfer_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_1_Transfer_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_1_Transfer_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_1_Transfer_event,contractRegistrations>>;

export type SablierFlow_v1_1_Transfer_eventFilter = {
  readonly from?: SingleOrMultiple_t<Address_t>; 
  readonly to?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierFlow_v1_1_Transfer_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_1_Transfer_eventFiltersDefinition = 
    SablierFlow_v1_1_Transfer_eventFilter
  | SablierFlow_v1_1_Transfer_eventFilter[];

export type SablierFlow_v1_1_Transfer_eventFilters = 
    SablierFlow_v1_1_Transfer_eventFilter
  | SablierFlow_v1_1_Transfer_eventFilter[]
  | ((_1:SablierFlow_v1_1_Transfer_eventFiltersArgs) => SablierFlow_v1_1_Transfer_eventFiltersDefinition);

export type SablierFlow_v1_1_AdjustFlowStream_eventArgs = {
  readonly streamId: bigint; 
  readonly totalDebt: bigint; 
  readonly oldRatePerSecond: bigint; 
  readonly newRatePerSecond: bigint
};

export type SablierFlow_v1_1_AdjustFlowStream_block = Block_t;

export type SablierFlow_v1_1_AdjustFlowStream_transaction = Transaction_t;

export type SablierFlow_v1_1_AdjustFlowStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_1_AdjustFlowStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_1_AdjustFlowStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_1_AdjustFlowStream_block
};

export type SablierFlow_v1_1_AdjustFlowStream_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_1_AdjustFlowStream_event,loaderContext>;

export type SablierFlow_v1_1_AdjustFlowStream_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_1_AdjustFlowStream_loaderArgs,loaderReturn>;

export type SablierFlow_v1_1_AdjustFlowStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_1_AdjustFlowStream_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_1_AdjustFlowStream_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_1_AdjustFlowStream_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_1_AdjustFlowStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_1_AdjustFlowStream_event,contractRegistrations>>;

export type SablierFlow_v1_1_AdjustFlowStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint> };

export type SablierFlow_v1_1_AdjustFlowStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_1_AdjustFlowStream_eventFiltersDefinition = 
    SablierFlow_v1_1_AdjustFlowStream_eventFilter
  | SablierFlow_v1_1_AdjustFlowStream_eventFilter[];

export type SablierFlow_v1_1_AdjustFlowStream_eventFilters = 
    SablierFlow_v1_1_AdjustFlowStream_eventFilter
  | SablierFlow_v1_1_AdjustFlowStream_eventFilter[]
  | ((_1:SablierFlow_v1_1_AdjustFlowStream_eventFiltersArgs) => SablierFlow_v1_1_AdjustFlowStream_eventFiltersDefinition);

export type SablierFlow_v1_1_CreateFlowStream_eventArgs = {
  readonly streamId: bigint; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly ratePerSecond: bigint; 
  readonly token: Address_t; 
  readonly transferable: boolean
};

export type SablierFlow_v1_1_CreateFlowStream_block = Block_t;

export type SablierFlow_v1_1_CreateFlowStream_transaction = Transaction_t;

export type SablierFlow_v1_1_CreateFlowStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_1_CreateFlowStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_1_CreateFlowStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_1_CreateFlowStream_block
};

export type SablierFlow_v1_1_CreateFlowStream_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_1_CreateFlowStream_event,loaderContext>;

export type SablierFlow_v1_1_CreateFlowStream_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_1_CreateFlowStream_loaderArgs,loaderReturn>;

export type SablierFlow_v1_1_CreateFlowStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_1_CreateFlowStream_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_1_CreateFlowStream_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_1_CreateFlowStream_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_1_CreateFlowStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_1_CreateFlowStream_event,contractRegistrations>>;

export type SablierFlow_v1_1_CreateFlowStream_eventFilter = {
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>; 
  readonly token?: SingleOrMultiple_t<Address_t>
};

export type SablierFlow_v1_1_CreateFlowStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_1_CreateFlowStream_eventFiltersDefinition = 
    SablierFlow_v1_1_CreateFlowStream_eventFilter
  | SablierFlow_v1_1_CreateFlowStream_eventFilter[];

export type SablierFlow_v1_1_CreateFlowStream_eventFilters = 
    SablierFlow_v1_1_CreateFlowStream_eventFilter
  | SablierFlow_v1_1_CreateFlowStream_eventFilter[]
  | ((_1:SablierFlow_v1_1_CreateFlowStream_eventFiltersArgs) => SablierFlow_v1_1_CreateFlowStream_eventFiltersDefinition);

export type SablierFlow_v1_1_DepositFlowStream_eventArgs = {
  readonly streamId: bigint; 
  readonly funder: Address_t; 
  readonly amount: bigint
};

export type SablierFlow_v1_1_DepositFlowStream_block = Block_t;

export type SablierFlow_v1_1_DepositFlowStream_transaction = Transaction_t;

export type SablierFlow_v1_1_DepositFlowStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_1_DepositFlowStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_1_DepositFlowStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_1_DepositFlowStream_block
};

export type SablierFlow_v1_1_DepositFlowStream_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_1_DepositFlowStream_event,loaderContext>;

export type SablierFlow_v1_1_DepositFlowStream_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_1_DepositFlowStream_loaderArgs,loaderReturn>;

export type SablierFlow_v1_1_DepositFlowStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_1_DepositFlowStream_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_1_DepositFlowStream_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_1_DepositFlowStream_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_1_DepositFlowStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_1_DepositFlowStream_event,contractRegistrations>>;

export type SablierFlow_v1_1_DepositFlowStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint>; readonly funder?: SingleOrMultiple_t<Address_t> };

export type SablierFlow_v1_1_DepositFlowStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_1_DepositFlowStream_eventFiltersDefinition = 
    SablierFlow_v1_1_DepositFlowStream_eventFilter
  | SablierFlow_v1_1_DepositFlowStream_eventFilter[];

export type SablierFlow_v1_1_DepositFlowStream_eventFilters = 
    SablierFlow_v1_1_DepositFlowStream_eventFilter
  | SablierFlow_v1_1_DepositFlowStream_eventFilter[]
  | ((_1:SablierFlow_v1_1_DepositFlowStream_eventFiltersArgs) => SablierFlow_v1_1_DepositFlowStream_eventFiltersDefinition);

export type SablierFlow_v1_1_PauseFlowStream_eventArgs = {
  readonly streamId: bigint; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly totalDebt: bigint
};

export type SablierFlow_v1_1_PauseFlowStream_block = Block_t;

export type SablierFlow_v1_1_PauseFlowStream_transaction = Transaction_t;

export type SablierFlow_v1_1_PauseFlowStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_1_PauseFlowStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_1_PauseFlowStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_1_PauseFlowStream_block
};

export type SablierFlow_v1_1_PauseFlowStream_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_1_PauseFlowStream_event,loaderContext>;

export type SablierFlow_v1_1_PauseFlowStream_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_1_PauseFlowStream_loaderArgs,loaderReturn>;

export type SablierFlow_v1_1_PauseFlowStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_1_PauseFlowStream_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_1_PauseFlowStream_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_1_PauseFlowStream_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_1_PauseFlowStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_1_PauseFlowStream_event,contractRegistrations>>;

export type SablierFlow_v1_1_PauseFlowStream_eventFilter = {
  readonly streamId?: SingleOrMultiple_t<bigint>; 
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>
};

export type SablierFlow_v1_1_PauseFlowStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_1_PauseFlowStream_eventFiltersDefinition = 
    SablierFlow_v1_1_PauseFlowStream_eventFilter
  | SablierFlow_v1_1_PauseFlowStream_eventFilter[];

export type SablierFlow_v1_1_PauseFlowStream_eventFilters = 
    SablierFlow_v1_1_PauseFlowStream_eventFilter
  | SablierFlow_v1_1_PauseFlowStream_eventFilter[]
  | ((_1:SablierFlow_v1_1_PauseFlowStream_eventFiltersArgs) => SablierFlow_v1_1_PauseFlowStream_eventFiltersDefinition);

export type SablierFlow_v1_1_RefundFromFlowStream_eventArgs = {
  readonly streamId: bigint; 
  readonly sender: Address_t; 
  readonly amount: bigint
};

export type SablierFlow_v1_1_RefundFromFlowStream_block = Block_t;

export type SablierFlow_v1_1_RefundFromFlowStream_transaction = Transaction_t;

export type SablierFlow_v1_1_RefundFromFlowStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_1_RefundFromFlowStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_1_RefundFromFlowStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_1_RefundFromFlowStream_block
};

export type SablierFlow_v1_1_RefundFromFlowStream_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_1_RefundFromFlowStream_event,loaderContext>;

export type SablierFlow_v1_1_RefundFromFlowStream_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_1_RefundFromFlowStream_loaderArgs,loaderReturn>;

export type SablierFlow_v1_1_RefundFromFlowStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_1_RefundFromFlowStream_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_1_RefundFromFlowStream_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_1_RefundFromFlowStream_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_1_RefundFromFlowStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_1_RefundFromFlowStream_event,contractRegistrations>>;

export type SablierFlow_v1_1_RefundFromFlowStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint>; readonly sender?: SingleOrMultiple_t<Address_t> };

export type SablierFlow_v1_1_RefundFromFlowStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_1_RefundFromFlowStream_eventFiltersDefinition = 
    SablierFlow_v1_1_RefundFromFlowStream_eventFilter
  | SablierFlow_v1_1_RefundFromFlowStream_eventFilter[];

export type SablierFlow_v1_1_RefundFromFlowStream_eventFilters = 
    SablierFlow_v1_1_RefundFromFlowStream_eventFilter
  | SablierFlow_v1_1_RefundFromFlowStream_eventFilter[]
  | ((_1:SablierFlow_v1_1_RefundFromFlowStream_eventFiltersArgs) => SablierFlow_v1_1_RefundFromFlowStream_eventFiltersDefinition);

export type SablierFlow_v1_1_RestartFlowStream_eventArgs = {
  readonly streamId: bigint; 
  readonly sender: Address_t; 
  readonly ratePerSecond: bigint
};

export type SablierFlow_v1_1_RestartFlowStream_block = Block_t;

export type SablierFlow_v1_1_RestartFlowStream_transaction = Transaction_t;

export type SablierFlow_v1_1_RestartFlowStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_1_RestartFlowStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_1_RestartFlowStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_1_RestartFlowStream_block
};

export type SablierFlow_v1_1_RestartFlowStream_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_1_RestartFlowStream_event,loaderContext>;

export type SablierFlow_v1_1_RestartFlowStream_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_1_RestartFlowStream_loaderArgs,loaderReturn>;

export type SablierFlow_v1_1_RestartFlowStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_1_RestartFlowStream_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_1_RestartFlowStream_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_1_RestartFlowStream_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_1_RestartFlowStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_1_RestartFlowStream_event,contractRegistrations>>;

export type SablierFlow_v1_1_RestartFlowStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint>; readonly sender?: SingleOrMultiple_t<Address_t> };

export type SablierFlow_v1_1_RestartFlowStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_1_RestartFlowStream_eventFiltersDefinition = 
    SablierFlow_v1_1_RestartFlowStream_eventFilter
  | SablierFlow_v1_1_RestartFlowStream_eventFilter[];

export type SablierFlow_v1_1_RestartFlowStream_eventFilters = 
    SablierFlow_v1_1_RestartFlowStream_eventFilter
  | SablierFlow_v1_1_RestartFlowStream_eventFilter[]
  | ((_1:SablierFlow_v1_1_RestartFlowStream_eventFiltersArgs) => SablierFlow_v1_1_RestartFlowStream_eventFiltersDefinition);

export type SablierFlow_v1_1_VoidFlowStream_eventArgs = {
  readonly streamId: bigint; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly caller: Address_t; 
  readonly newTotalDebt: bigint; 
  readonly writtenOffDebt: bigint
};

export type SablierFlow_v1_1_VoidFlowStream_block = Block_t;

export type SablierFlow_v1_1_VoidFlowStream_transaction = Transaction_t;

export type SablierFlow_v1_1_VoidFlowStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_1_VoidFlowStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_1_VoidFlowStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_1_VoidFlowStream_block
};

export type SablierFlow_v1_1_VoidFlowStream_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_1_VoidFlowStream_event,loaderContext>;

export type SablierFlow_v1_1_VoidFlowStream_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_1_VoidFlowStream_loaderArgs,loaderReturn>;

export type SablierFlow_v1_1_VoidFlowStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_1_VoidFlowStream_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_1_VoidFlowStream_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_1_VoidFlowStream_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_1_VoidFlowStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_1_VoidFlowStream_event,contractRegistrations>>;

export type SablierFlow_v1_1_VoidFlowStream_eventFilter = {
  readonly streamId?: SingleOrMultiple_t<bigint>; 
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>
};

export type SablierFlow_v1_1_VoidFlowStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_1_VoidFlowStream_eventFiltersDefinition = 
    SablierFlow_v1_1_VoidFlowStream_eventFilter
  | SablierFlow_v1_1_VoidFlowStream_eventFilter[];

export type SablierFlow_v1_1_VoidFlowStream_eventFilters = 
    SablierFlow_v1_1_VoidFlowStream_eventFilter
  | SablierFlow_v1_1_VoidFlowStream_eventFilter[]
  | ((_1:SablierFlow_v1_1_VoidFlowStream_eventFiltersArgs) => SablierFlow_v1_1_VoidFlowStream_eventFiltersDefinition);

export type SablierFlow_v1_1_WithdrawFromFlowStream_eventArgs = {
  readonly streamId: bigint; 
  readonly to: Address_t; 
  readonly token: Address_t; 
  readonly caller: Address_t; 
  readonly withdrawAmount: bigint; 
  readonly protocolFeeAmount: bigint
};

export type SablierFlow_v1_1_WithdrawFromFlowStream_block = Block_t;

export type SablierFlow_v1_1_WithdrawFromFlowStream_transaction = Transaction_t;

export type SablierFlow_v1_1_WithdrawFromFlowStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierFlow_v1_1_WithdrawFromFlowStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierFlow_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierFlow_v1_1_WithdrawFromFlowStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierFlow_v1_1_WithdrawFromFlowStream_block
};

export type SablierFlow_v1_1_WithdrawFromFlowStream_loaderArgs = Internal_genericLoaderArgs<SablierFlow_v1_1_WithdrawFromFlowStream_event,loaderContext>;

export type SablierFlow_v1_1_WithdrawFromFlowStream_loader<loaderReturn> = Internal_genericLoader<SablierFlow_v1_1_WithdrawFromFlowStream_loaderArgs,loaderReturn>;

export type SablierFlow_v1_1_WithdrawFromFlowStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierFlow_v1_1_WithdrawFromFlowStream_event,handlerContext,loaderReturn>;

export type SablierFlow_v1_1_WithdrawFromFlowStream_handler<loaderReturn> = Internal_genericHandler<SablierFlow_v1_1_WithdrawFromFlowStream_handlerArgs<loaderReturn>>;

export type SablierFlow_v1_1_WithdrawFromFlowStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierFlow_v1_1_WithdrawFromFlowStream_event,contractRegistrations>>;

export type SablierFlow_v1_1_WithdrawFromFlowStream_eventFilter = {
  readonly streamId?: SingleOrMultiple_t<bigint>; 
  readonly to?: SingleOrMultiple_t<Address_t>; 
  readonly token?: SingleOrMultiple_t<Address_t>
};

export type SablierFlow_v1_1_WithdrawFromFlowStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierFlow_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierFlow_v1_1_WithdrawFromFlowStream_eventFiltersDefinition = 
    SablierFlow_v1_1_WithdrawFromFlowStream_eventFilter
  | SablierFlow_v1_1_WithdrawFromFlowStream_eventFilter[];

export type SablierFlow_v1_1_WithdrawFromFlowStream_eventFilters = 
    SablierFlow_v1_1_WithdrawFromFlowStream_eventFilter
  | SablierFlow_v1_1_WithdrawFromFlowStream_eventFilter[]
  | ((_1:SablierFlow_v1_1_WithdrawFromFlowStream_eventFiltersArgs) => SablierFlow_v1_1_WithdrawFromFlowStream_eventFiltersDefinition);

export type SablierLockup_v2_0_chainId = 
    1
  | 10
  | 50
  | 56
  | 100
  | 130
  | 137
  | 324
  | 478
  | 1890
  | 2741
  | 2818
  | 5330
  | 5845
  | 8453
  | 34443
  | 42161
  | 43114
  | 50104
  | 59144
  | 80094
  | 81457
  | 84532
  | 88888
  | 534352
  | 11155111;

export type SablierLockup_v2_0_Approval_eventArgs = {
  readonly owner: Address_t; 
  readonly approved: Address_t; 
  readonly tokenId: bigint
};

export type SablierLockup_v2_0_Approval_block = Block_t;

export type SablierLockup_v2_0_Approval_transaction = Transaction_t;

export type SablierLockup_v2_0_Approval_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierLockup_v2_0_Approval_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierLockup_v2_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierLockup_v2_0_Approval_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierLockup_v2_0_Approval_block
};

export type SablierLockup_v2_0_Approval_loaderArgs = Internal_genericLoaderArgs<SablierLockup_v2_0_Approval_event,loaderContext>;

export type SablierLockup_v2_0_Approval_loader<loaderReturn> = Internal_genericLoader<SablierLockup_v2_0_Approval_loaderArgs,loaderReturn>;

export type SablierLockup_v2_0_Approval_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierLockup_v2_0_Approval_event,handlerContext,loaderReturn>;

export type SablierLockup_v2_0_Approval_handler<loaderReturn> = Internal_genericHandler<SablierLockup_v2_0_Approval_handlerArgs<loaderReturn>>;

export type SablierLockup_v2_0_Approval_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierLockup_v2_0_Approval_event,contractRegistrations>>;

export type SablierLockup_v2_0_Approval_eventFilter = {
  readonly owner?: SingleOrMultiple_t<Address_t>; 
  readonly approved?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierLockup_v2_0_Approval_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierLockup_v2_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierLockup_v2_0_Approval_eventFiltersDefinition = 
    SablierLockup_v2_0_Approval_eventFilter
  | SablierLockup_v2_0_Approval_eventFilter[];

export type SablierLockup_v2_0_Approval_eventFilters = 
    SablierLockup_v2_0_Approval_eventFilter
  | SablierLockup_v2_0_Approval_eventFilter[]
  | ((_1:SablierLockup_v2_0_Approval_eventFiltersArgs) => SablierLockup_v2_0_Approval_eventFiltersDefinition);

export type SablierLockup_v2_0_ApprovalForAll_eventArgs = {
  readonly owner: Address_t; 
  readonly operator: Address_t; 
  readonly approved: boolean
};

export type SablierLockup_v2_0_ApprovalForAll_block = Block_t;

export type SablierLockup_v2_0_ApprovalForAll_transaction = Transaction_t;

export type SablierLockup_v2_0_ApprovalForAll_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierLockup_v2_0_ApprovalForAll_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierLockup_v2_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierLockup_v2_0_ApprovalForAll_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierLockup_v2_0_ApprovalForAll_block
};

export type SablierLockup_v2_0_ApprovalForAll_loaderArgs = Internal_genericLoaderArgs<SablierLockup_v2_0_ApprovalForAll_event,loaderContext>;

export type SablierLockup_v2_0_ApprovalForAll_loader<loaderReturn> = Internal_genericLoader<SablierLockup_v2_0_ApprovalForAll_loaderArgs,loaderReturn>;

export type SablierLockup_v2_0_ApprovalForAll_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierLockup_v2_0_ApprovalForAll_event,handlerContext,loaderReturn>;

export type SablierLockup_v2_0_ApprovalForAll_handler<loaderReturn> = Internal_genericHandler<SablierLockup_v2_0_ApprovalForAll_handlerArgs<loaderReturn>>;

export type SablierLockup_v2_0_ApprovalForAll_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierLockup_v2_0_ApprovalForAll_event,contractRegistrations>>;

export type SablierLockup_v2_0_ApprovalForAll_eventFilter = { readonly owner?: SingleOrMultiple_t<Address_t>; readonly operator?: SingleOrMultiple_t<Address_t> };

export type SablierLockup_v2_0_ApprovalForAll_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierLockup_v2_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierLockup_v2_0_ApprovalForAll_eventFiltersDefinition = 
    SablierLockup_v2_0_ApprovalForAll_eventFilter
  | SablierLockup_v2_0_ApprovalForAll_eventFilter[];

export type SablierLockup_v2_0_ApprovalForAll_eventFilters = 
    SablierLockup_v2_0_ApprovalForAll_eventFilter
  | SablierLockup_v2_0_ApprovalForAll_eventFilter[]
  | ((_1:SablierLockup_v2_0_ApprovalForAll_eventFiltersArgs) => SablierLockup_v2_0_ApprovalForAll_eventFiltersDefinition);

export type SablierLockup_v2_0_Transfer_eventArgs = {
  readonly from: Address_t; 
  readonly to: Address_t; 
  readonly tokenId: bigint
};

export type SablierLockup_v2_0_Transfer_block = Block_t;

export type SablierLockup_v2_0_Transfer_transaction = Transaction_t;

export type SablierLockup_v2_0_Transfer_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierLockup_v2_0_Transfer_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierLockup_v2_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierLockup_v2_0_Transfer_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierLockup_v2_0_Transfer_block
};

export type SablierLockup_v2_0_Transfer_loaderArgs = Internal_genericLoaderArgs<SablierLockup_v2_0_Transfer_event,loaderContext>;

export type SablierLockup_v2_0_Transfer_loader<loaderReturn> = Internal_genericLoader<SablierLockup_v2_0_Transfer_loaderArgs,loaderReturn>;

export type SablierLockup_v2_0_Transfer_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierLockup_v2_0_Transfer_event,handlerContext,loaderReturn>;

export type SablierLockup_v2_0_Transfer_handler<loaderReturn> = Internal_genericHandler<SablierLockup_v2_0_Transfer_handlerArgs<loaderReturn>>;

export type SablierLockup_v2_0_Transfer_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierLockup_v2_0_Transfer_event,contractRegistrations>>;

export type SablierLockup_v2_0_Transfer_eventFilter = {
  readonly from?: SingleOrMultiple_t<Address_t>; 
  readonly to?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierLockup_v2_0_Transfer_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierLockup_v2_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierLockup_v2_0_Transfer_eventFiltersDefinition = 
    SablierLockup_v2_0_Transfer_eventFilter
  | SablierLockup_v2_0_Transfer_eventFilter[];

export type SablierLockup_v2_0_Transfer_eventFilters = 
    SablierLockup_v2_0_Transfer_eventFilter
  | SablierLockup_v2_0_Transfer_eventFilter[]
  | ((_1:SablierLockup_v2_0_Transfer_eventFiltersArgs) => SablierLockup_v2_0_Transfer_eventFiltersDefinition);

export type SablierLockup_v2_0_CancelLockupStream_eventArgs = {
  readonly streamId: bigint; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly token: Address_t; 
  readonly senderAmount: bigint; 
  readonly recipientAmount: bigint
};

export type SablierLockup_v2_0_CancelLockupStream_block = Block_t;

export type SablierLockup_v2_0_CancelLockupStream_transaction = Transaction_t;

export type SablierLockup_v2_0_CancelLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierLockup_v2_0_CancelLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierLockup_v2_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierLockup_v2_0_CancelLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierLockup_v2_0_CancelLockupStream_block
};

export type SablierLockup_v2_0_CancelLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierLockup_v2_0_CancelLockupStream_event,loaderContext>;

export type SablierLockup_v2_0_CancelLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierLockup_v2_0_CancelLockupStream_loaderArgs,loaderReturn>;

export type SablierLockup_v2_0_CancelLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierLockup_v2_0_CancelLockupStream_event,handlerContext,loaderReturn>;

export type SablierLockup_v2_0_CancelLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierLockup_v2_0_CancelLockupStream_handlerArgs<loaderReturn>>;

export type SablierLockup_v2_0_CancelLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierLockup_v2_0_CancelLockupStream_event,contractRegistrations>>;

export type SablierLockup_v2_0_CancelLockupStream_eventFilter = {
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>; 
  readonly token?: SingleOrMultiple_t<Address_t>
};

export type SablierLockup_v2_0_CancelLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierLockup_v2_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierLockup_v2_0_CancelLockupStream_eventFiltersDefinition = 
    SablierLockup_v2_0_CancelLockupStream_eventFilter
  | SablierLockup_v2_0_CancelLockupStream_eventFilter[];

export type SablierLockup_v2_0_CancelLockupStream_eventFilters = 
    SablierLockup_v2_0_CancelLockupStream_eventFilter
  | SablierLockup_v2_0_CancelLockupStream_eventFilter[]
  | ((_1:SablierLockup_v2_0_CancelLockupStream_eventFiltersArgs) => SablierLockup_v2_0_CancelLockupStream_eventFiltersDefinition);

export type SablierLockup_v2_0_CreateLockupDynamicStream_eventArgs = {
  readonly streamId: bigint; 
  readonly commonParams: [Address_t, Address_t, Address_t, [bigint, bigint], Address_t, boolean, boolean, [bigint, bigint], string, Address_t]; 
  readonly segments: Array<[bigint, bigint, bigint]>
};

export type SablierLockup_v2_0_CreateLockupDynamicStream_block = Block_t;

export type SablierLockup_v2_0_CreateLockupDynamicStream_transaction = Transaction_t;

export type SablierLockup_v2_0_CreateLockupDynamicStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierLockup_v2_0_CreateLockupDynamicStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierLockup_v2_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierLockup_v2_0_CreateLockupDynamicStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierLockup_v2_0_CreateLockupDynamicStream_block
};

export type SablierLockup_v2_0_CreateLockupDynamicStream_loaderArgs = Internal_genericLoaderArgs<SablierLockup_v2_0_CreateLockupDynamicStream_event,loaderContext>;

export type SablierLockup_v2_0_CreateLockupDynamicStream_loader<loaderReturn> = Internal_genericLoader<SablierLockup_v2_0_CreateLockupDynamicStream_loaderArgs,loaderReturn>;

export type SablierLockup_v2_0_CreateLockupDynamicStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierLockup_v2_0_CreateLockupDynamicStream_event,handlerContext,loaderReturn>;

export type SablierLockup_v2_0_CreateLockupDynamicStream_handler<loaderReturn> = Internal_genericHandler<SablierLockup_v2_0_CreateLockupDynamicStream_handlerArgs<loaderReturn>>;

export type SablierLockup_v2_0_CreateLockupDynamicStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierLockup_v2_0_CreateLockupDynamicStream_event,contractRegistrations>>;

export type SablierLockup_v2_0_CreateLockupDynamicStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint> };

export type SablierLockup_v2_0_CreateLockupDynamicStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierLockup_v2_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierLockup_v2_0_CreateLockupDynamicStream_eventFiltersDefinition = 
    SablierLockup_v2_0_CreateLockupDynamicStream_eventFilter
  | SablierLockup_v2_0_CreateLockupDynamicStream_eventFilter[];

export type SablierLockup_v2_0_CreateLockupDynamicStream_eventFilters = 
    SablierLockup_v2_0_CreateLockupDynamicStream_eventFilter
  | SablierLockup_v2_0_CreateLockupDynamicStream_eventFilter[]
  | ((_1:SablierLockup_v2_0_CreateLockupDynamicStream_eventFiltersArgs) => SablierLockup_v2_0_CreateLockupDynamicStream_eventFiltersDefinition);

export type SablierLockup_v2_0_CreateLockupLinearStream_eventArgs = {
  readonly streamId: bigint; 
  readonly commonParams: [Address_t, Address_t, Address_t, [bigint, bigint], Address_t, boolean, boolean, [bigint, bigint], string, Address_t]; 
  readonly cliffTime: bigint; 
  readonly unlockAmounts: [bigint, bigint]
};

export type SablierLockup_v2_0_CreateLockupLinearStream_block = Block_t;

export type SablierLockup_v2_0_CreateLockupLinearStream_transaction = Transaction_t;

export type SablierLockup_v2_0_CreateLockupLinearStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierLockup_v2_0_CreateLockupLinearStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierLockup_v2_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierLockup_v2_0_CreateLockupLinearStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierLockup_v2_0_CreateLockupLinearStream_block
};

export type SablierLockup_v2_0_CreateLockupLinearStream_loaderArgs = Internal_genericLoaderArgs<SablierLockup_v2_0_CreateLockupLinearStream_event,loaderContext>;

export type SablierLockup_v2_0_CreateLockupLinearStream_loader<loaderReturn> = Internal_genericLoader<SablierLockup_v2_0_CreateLockupLinearStream_loaderArgs,loaderReturn>;

export type SablierLockup_v2_0_CreateLockupLinearStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierLockup_v2_0_CreateLockupLinearStream_event,handlerContext,loaderReturn>;

export type SablierLockup_v2_0_CreateLockupLinearStream_handler<loaderReturn> = Internal_genericHandler<SablierLockup_v2_0_CreateLockupLinearStream_handlerArgs<loaderReturn>>;

export type SablierLockup_v2_0_CreateLockupLinearStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierLockup_v2_0_CreateLockupLinearStream_event,contractRegistrations>>;

export type SablierLockup_v2_0_CreateLockupLinearStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint> };

export type SablierLockup_v2_0_CreateLockupLinearStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierLockup_v2_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierLockup_v2_0_CreateLockupLinearStream_eventFiltersDefinition = 
    SablierLockup_v2_0_CreateLockupLinearStream_eventFilter
  | SablierLockup_v2_0_CreateLockupLinearStream_eventFilter[];

export type SablierLockup_v2_0_CreateLockupLinearStream_eventFilters = 
    SablierLockup_v2_0_CreateLockupLinearStream_eventFilter
  | SablierLockup_v2_0_CreateLockupLinearStream_eventFilter[]
  | ((_1:SablierLockup_v2_0_CreateLockupLinearStream_eventFiltersArgs) => SablierLockup_v2_0_CreateLockupLinearStream_eventFiltersDefinition);

export type SablierLockup_v2_0_CreateLockupTranchedStream_eventArgs = {
  readonly streamId: bigint; 
  readonly commonParams: [Address_t, Address_t, Address_t, [bigint, bigint], Address_t, boolean, boolean, [bigint, bigint], string, Address_t]; 
  readonly tranches: Array<[bigint, bigint]>
};

export type SablierLockup_v2_0_CreateLockupTranchedStream_block = Block_t;

export type SablierLockup_v2_0_CreateLockupTranchedStream_transaction = Transaction_t;

export type SablierLockup_v2_0_CreateLockupTranchedStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierLockup_v2_0_CreateLockupTranchedStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierLockup_v2_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierLockup_v2_0_CreateLockupTranchedStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierLockup_v2_0_CreateLockupTranchedStream_block
};

export type SablierLockup_v2_0_CreateLockupTranchedStream_loaderArgs = Internal_genericLoaderArgs<SablierLockup_v2_0_CreateLockupTranchedStream_event,loaderContext>;

export type SablierLockup_v2_0_CreateLockupTranchedStream_loader<loaderReturn> = Internal_genericLoader<SablierLockup_v2_0_CreateLockupTranchedStream_loaderArgs,loaderReturn>;

export type SablierLockup_v2_0_CreateLockupTranchedStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierLockup_v2_0_CreateLockupTranchedStream_event,handlerContext,loaderReturn>;

export type SablierLockup_v2_0_CreateLockupTranchedStream_handler<loaderReturn> = Internal_genericHandler<SablierLockup_v2_0_CreateLockupTranchedStream_handlerArgs<loaderReturn>>;

export type SablierLockup_v2_0_CreateLockupTranchedStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierLockup_v2_0_CreateLockupTranchedStream_event,contractRegistrations>>;

export type SablierLockup_v2_0_CreateLockupTranchedStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint> };

export type SablierLockup_v2_0_CreateLockupTranchedStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierLockup_v2_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierLockup_v2_0_CreateLockupTranchedStream_eventFiltersDefinition = 
    SablierLockup_v2_0_CreateLockupTranchedStream_eventFilter
  | SablierLockup_v2_0_CreateLockupTranchedStream_eventFilter[];

export type SablierLockup_v2_0_CreateLockupTranchedStream_eventFilters = 
    SablierLockup_v2_0_CreateLockupTranchedStream_eventFilter
  | SablierLockup_v2_0_CreateLockupTranchedStream_eventFilter[]
  | ((_1:SablierLockup_v2_0_CreateLockupTranchedStream_eventFiltersArgs) => SablierLockup_v2_0_CreateLockupTranchedStream_eventFiltersDefinition);

export type SablierLockup_v2_0_RenounceLockupStream_eventArgs = { readonly streamId: bigint };

export type SablierLockup_v2_0_RenounceLockupStream_block = Block_t;

export type SablierLockup_v2_0_RenounceLockupStream_transaction = Transaction_t;

export type SablierLockup_v2_0_RenounceLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierLockup_v2_0_RenounceLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierLockup_v2_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierLockup_v2_0_RenounceLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierLockup_v2_0_RenounceLockupStream_block
};

export type SablierLockup_v2_0_RenounceLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierLockup_v2_0_RenounceLockupStream_event,loaderContext>;

export type SablierLockup_v2_0_RenounceLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierLockup_v2_0_RenounceLockupStream_loaderArgs,loaderReturn>;

export type SablierLockup_v2_0_RenounceLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierLockup_v2_0_RenounceLockupStream_event,handlerContext,loaderReturn>;

export type SablierLockup_v2_0_RenounceLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierLockup_v2_0_RenounceLockupStream_handlerArgs<loaderReturn>>;

export type SablierLockup_v2_0_RenounceLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierLockup_v2_0_RenounceLockupStream_event,contractRegistrations>>;

export type SablierLockup_v2_0_RenounceLockupStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint> };

export type SablierLockup_v2_0_RenounceLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierLockup_v2_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierLockup_v2_0_RenounceLockupStream_eventFiltersDefinition = 
    SablierLockup_v2_0_RenounceLockupStream_eventFilter
  | SablierLockup_v2_0_RenounceLockupStream_eventFilter[];

export type SablierLockup_v2_0_RenounceLockupStream_eventFilters = 
    SablierLockup_v2_0_RenounceLockupStream_eventFilter
  | SablierLockup_v2_0_RenounceLockupStream_eventFilter[]
  | ((_1:SablierLockup_v2_0_RenounceLockupStream_eventFiltersArgs) => SablierLockup_v2_0_RenounceLockupStream_eventFiltersDefinition);

export type SablierLockup_v2_0_WithdrawFromLockupStream_eventArgs = {
  readonly streamId: bigint; 
  readonly to: Address_t; 
  readonly token: Address_t; 
  readonly amount: bigint
};

export type SablierLockup_v2_0_WithdrawFromLockupStream_block = Block_t;

export type SablierLockup_v2_0_WithdrawFromLockupStream_transaction = Transaction_t;

export type SablierLockup_v2_0_WithdrawFromLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierLockup_v2_0_WithdrawFromLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierLockup_v2_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierLockup_v2_0_WithdrawFromLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierLockup_v2_0_WithdrawFromLockupStream_block
};

export type SablierLockup_v2_0_WithdrawFromLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierLockup_v2_0_WithdrawFromLockupStream_event,loaderContext>;

export type SablierLockup_v2_0_WithdrawFromLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierLockup_v2_0_WithdrawFromLockupStream_loaderArgs,loaderReturn>;

export type SablierLockup_v2_0_WithdrawFromLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierLockup_v2_0_WithdrawFromLockupStream_event,handlerContext,loaderReturn>;

export type SablierLockup_v2_0_WithdrawFromLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierLockup_v2_0_WithdrawFromLockupStream_handlerArgs<loaderReturn>>;

export type SablierLockup_v2_0_WithdrawFromLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierLockup_v2_0_WithdrawFromLockupStream_event,contractRegistrations>>;

export type SablierLockup_v2_0_WithdrawFromLockupStream_eventFilter = {
  readonly streamId?: SingleOrMultiple_t<bigint>; 
  readonly to?: SingleOrMultiple_t<Address_t>; 
  readonly token?: SingleOrMultiple_t<Address_t>
};

export type SablierLockup_v2_0_WithdrawFromLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierLockup_v2_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierLockup_v2_0_WithdrawFromLockupStream_eventFiltersDefinition = 
    SablierLockup_v2_0_WithdrawFromLockupStream_eventFilter
  | SablierLockup_v2_0_WithdrawFromLockupStream_eventFilter[];

export type SablierLockup_v2_0_WithdrawFromLockupStream_eventFilters = 
    SablierLockup_v2_0_WithdrawFromLockupStream_eventFilter
  | SablierLockup_v2_0_WithdrawFromLockupStream_eventFilter[]
  | ((_1:SablierLockup_v2_0_WithdrawFromLockupStream_eventFiltersArgs) => SablierLockup_v2_0_WithdrawFromLockupStream_eventFiltersDefinition);

export type SablierMerkleFactory_v1_3_chainId = 
    1
  | 10
  | 50
  | 56
  | 100
  | 130
  | 137
  | 324
  | 478
  | 1890
  | 2741
  | 2818
  | 5330
  | 5845
  | 8453
  | 34443
  | 42161
  | 43114
  | 50104
  | 59144
  | 80094
  | 81457
  | 84532
  | 88888
  | 534352
  | 11155111;

export type SablierMerkleFactory_v1_3_CreateMerkleInstant_eventArgs = {
  readonly merkleInstant: Address_t; 
  readonly baseParams: [Address_t, bigint, Address_t, string, string, string, string]; 
  readonly aggregateAmount: bigint; 
  readonly recipientCount: bigint; 
  readonly fee: bigint
};

export type SablierMerkleFactory_v1_3_CreateMerkleInstant_block = Block_t;

export type SablierMerkleFactory_v1_3_CreateMerkleInstant_transaction = Transaction_t;

export type SablierMerkleFactory_v1_3_CreateMerkleInstant_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierMerkleFactory_v1_3_CreateMerkleInstant_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierMerkleFactory_v1_3_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierMerkleFactory_v1_3_CreateMerkleInstant_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierMerkleFactory_v1_3_CreateMerkleInstant_block
};

export type SablierMerkleFactory_v1_3_CreateMerkleInstant_loaderArgs = Internal_genericLoaderArgs<SablierMerkleFactory_v1_3_CreateMerkleInstant_event,loaderContext>;

export type SablierMerkleFactory_v1_3_CreateMerkleInstant_loader<loaderReturn> = Internal_genericLoader<SablierMerkleFactory_v1_3_CreateMerkleInstant_loaderArgs,loaderReturn>;

export type SablierMerkleFactory_v1_3_CreateMerkleInstant_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierMerkleFactory_v1_3_CreateMerkleInstant_event,handlerContext,loaderReturn>;

export type SablierMerkleFactory_v1_3_CreateMerkleInstant_handler<loaderReturn> = Internal_genericHandler<SablierMerkleFactory_v1_3_CreateMerkleInstant_handlerArgs<loaderReturn>>;

export type SablierMerkleFactory_v1_3_CreateMerkleInstant_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierMerkleFactory_v1_3_CreateMerkleInstant_event,contractRegistrations>>;

export type SablierMerkleFactory_v1_3_CreateMerkleInstant_eventFilter = { readonly merkleInstant?: SingleOrMultiple_t<Address_t> };

export type SablierMerkleFactory_v1_3_CreateMerkleInstant_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierMerkleFactory_v1_3_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierMerkleFactory_v1_3_CreateMerkleInstant_eventFiltersDefinition = 
    SablierMerkleFactory_v1_3_CreateMerkleInstant_eventFilter
  | SablierMerkleFactory_v1_3_CreateMerkleInstant_eventFilter[];

export type SablierMerkleFactory_v1_3_CreateMerkleInstant_eventFilters = 
    SablierMerkleFactory_v1_3_CreateMerkleInstant_eventFilter
  | SablierMerkleFactory_v1_3_CreateMerkleInstant_eventFilter[]
  | ((_1:SablierMerkleFactory_v1_3_CreateMerkleInstant_eventFiltersArgs) => SablierMerkleFactory_v1_3_CreateMerkleInstant_eventFiltersDefinition);

export type SablierMerkleFactory_v1_3_CreateMerkleLL_eventArgs = {
  readonly merkleLL: Address_t; 
  readonly baseParams: [Address_t, bigint, Address_t, string, string, string, string]; 
  readonly lockup: Address_t; 
  readonly cancelable: boolean; 
  readonly transferable: boolean; 
  readonly schedule: [bigint, bigint, bigint, bigint, bigint]; 
  readonly aggregateAmount: bigint; 
  readonly recipientCount: bigint; 
  readonly fee: bigint
};

export type SablierMerkleFactory_v1_3_CreateMerkleLL_block = Block_t;

export type SablierMerkleFactory_v1_3_CreateMerkleLL_transaction = Transaction_t;

export type SablierMerkleFactory_v1_3_CreateMerkleLL_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierMerkleFactory_v1_3_CreateMerkleLL_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierMerkleFactory_v1_3_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierMerkleFactory_v1_3_CreateMerkleLL_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierMerkleFactory_v1_3_CreateMerkleLL_block
};

export type SablierMerkleFactory_v1_3_CreateMerkleLL_loaderArgs = Internal_genericLoaderArgs<SablierMerkleFactory_v1_3_CreateMerkleLL_event,loaderContext>;

export type SablierMerkleFactory_v1_3_CreateMerkleLL_loader<loaderReturn> = Internal_genericLoader<SablierMerkleFactory_v1_3_CreateMerkleLL_loaderArgs,loaderReturn>;

export type SablierMerkleFactory_v1_3_CreateMerkleLL_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierMerkleFactory_v1_3_CreateMerkleLL_event,handlerContext,loaderReturn>;

export type SablierMerkleFactory_v1_3_CreateMerkleLL_handler<loaderReturn> = Internal_genericHandler<SablierMerkleFactory_v1_3_CreateMerkleLL_handlerArgs<loaderReturn>>;

export type SablierMerkleFactory_v1_3_CreateMerkleLL_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierMerkleFactory_v1_3_CreateMerkleLL_event,contractRegistrations>>;

export type SablierMerkleFactory_v1_3_CreateMerkleLL_eventFilter = { readonly merkleLL?: SingleOrMultiple_t<Address_t> };

export type SablierMerkleFactory_v1_3_CreateMerkleLL_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierMerkleFactory_v1_3_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierMerkleFactory_v1_3_CreateMerkleLL_eventFiltersDefinition = 
    SablierMerkleFactory_v1_3_CreateMerkleLL_eventFilter
  | SablierMerkleFactory_v1_3_CreateMerkleLL_eventFilter[];

export type SablierMerkleFactory_v1_3_CreateMerkleLL_eventFilters = 
    SablierMerkleFactory_v1_3_CreateMerkleLL_eventFilter
  | SablierMerkleFactory_v1_3_CreateMerkleLL_eventFilter[]
  | ((_1:SablierMerkleFactory_v1_3_CreateMerkleLL_eventFiltersArgs) => SablierMerkleFactory_v1_3_CreateMerkleLL_eventFiltersDefinition);

export type SablierMerkleFactory_v1_3_CreateMerkleLT_eventArgs = {
  readonly merkleLT: Address_t; 
  readonly baseParams: [Address_t, bigint, Address_t, string, string, string, string]; 
  readonly lockup: Address_t; 
  readonly cancelable: boolean; 
  readonly transferable: boolean; 
  readonly streamStartTime: bigint; 
  readonly tranchesWithPercentages: Array<[bigint, bigint]>; 
  readonly totalDuration: bigint; 
  readonly aggregateAmount: bigint; 
  readonly recipientCount: bigint; 
  readonly fee: bigint
};

export type SablierMerkleFactory_v1_3_CreateMerkleLT_block = Block_t;

export type SablierMerkleFactory_v1_3_CreateMerkleLT_transaction = Transaction_t;

export type SablierMerkleFactory_v1_3_CreateMerkleLT_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierMerkleFactory_v1_3_CreateMerkleLT_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierMerkleFactory_v1_3_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierMerkleFactory_v1_3_CreateMerkleLT_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierMerkleFactory_v1_3_CreateMerkleLT_block
};

export type SablierMerkleFactory_v1_3_CreateMerkleLT_loaderArgs = Internal_genericLoaderArgs<SablierMerkleFactory_v1_3_CreateMerkleLT_event,loaderContext>;

export type SablierMerkleFactory_v1_3_CreateMerkleLT_loader<loaderReturn> = Internal_genericLoader<SablierMerkleFactory_v1_3_CreateMerkleLT_loaderArgs,loaderReturn>;

export type SablierMerkleFactory_v1_3_CreateMerkleLT_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierMerkleFactory_v1_3_CreateMerkleLT_event,handlerContext,loaderReturn>;

export type SablierMerkleFactory_v1_3_CreateMerkleLT_handler<loaderReturn> = Internal_genericHandler<SablierMerkleFactory_v1_3_CreateMerkleLT_handlerArgs<loaderReturn>>;

export type SablierMerkleFactory_v1_3_CreateMerkleLT_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierMerkleFactory_v1_3_CreateMerkleLT_event,contractRegistrations>>;

export type SablierMerkleFactory_v1_3_CreateMerkleLT_eventFilter = { readonly merkleLT?: SingleOrMultiple_t<Address_t> };

export type SablierMerkleFactory_v1_3_CreateMerkleLT_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierMerkleFactory_v1_3_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierMerkleFactory_v1_3_CreateMerkleLT_eventFiltersDefinition = 
    SablierMerkleFactory_v1_3_CreateMerkleLT_eventFilter
  | SablierMerkleFactory_v1_3_CreateMerkleLT_eventFilter[];

export type SablierMerkleFactory_v1_3_CreateMerkleLT_eventFilters = 
    SablierMerkleFactory_v1_3_CreateMerkleLT_eventFilter
  | SablierMerkleFactory_v1_3_CreateMerkleLT_eventFilter[]
  | ((_1:SablierMerkleFactory_v1_3_CreateMerkleLT_eventFiltersArgs) => SablierMerkleFactory_v1_3_CreateMerkleLT_eventFiltersDefinition);

export type SablierMerkleInstant_v1_3_chainId = 
    1
  | 10
  | 50
  | 56
  | 100
  | 130
  | 137
  | 324
  | 478
  | 1890
  | 2741
  | 2818
  | 5330
  | 5845
  | 8453
  | 34443
  | 42161
  | 43114
  | 50104
  | 59144
  | 80094
  | 81457
  | 84532
  | 88888
  | 534352
  | 11155111;

export type SablierMerkleInstant_v1_3_TransferAdmin_eventArgs = { readonly oldAdmin: Address_t; readonly newAdmin: Address_t };

export type SablierMerkleInstant_v1_3_TransferAdmin_block = Block_t;

export type SablierMerkleInstant_v1_3_TransferAdmin_transaction = Transaction_t;

export type SablierMerkleInstant_v1_3_TransferAdmin_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierMerkleInstant_v1_3_TransferAdmin_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierMerkleInstant_v1_3_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierMerkleInstant_v1_3_TransferAdmin_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierMerkleInstant_v1_3_TransferAdmin_block
};

export type SablierMerkleInstant_v1_3_TransferAdmin_loaderArgs = Internal_genericLoaderArgs<SablierMerkleInstant_v1_3_TransferAdmin_event,loaderContext>;

export type SablierMerkleInstant_v1_3_TransferAdmin_loader<loaderReturn> = Internal_genericLoader<SablierMerkleInstant_v1_3_TransferAdmin_loaderArgs,loaderReturn>;

export type SablierMerkleInstant_v1_3_TransferAdmin_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierMerkleInstant_v1_3_TransferAdmin_event,handlerContext,loaderReturn>;

export type SablierMerkleInstant_v1_3_TransferAdmin_handler<loaderReturn> = Internal_genericHandler<SablierMerkleInstant_v1_3_TransferAdmin_handlerArgs<loaderReturn>>;

export type SablierMerkleInstant_v1_3_TransferAdmin_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierMerkleInstant_v1_3_TransferAdmin_event,contractRegistrations>>;

export type SablierMerkleInstant_v1_3_TransferAdmin_eventFilter = { readonly oldAdmin?: SingleOrMultiple_t<Address_t>; readonly newAdmin?: SingleOrMultiple_t<Address_t> };

export type SablierMerkleInstant_v1_3_TransferAdmin_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierMerkleInstant_v1_3_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierMerkleInstant_v1_3_TransferAdmin_eventFiltersDefinition = 
    SablierMerkleInstant_v1_3_TransferAdmin_eventFilter
  | SablierMerkleInstant_v1_3_TransferAdmin_eventFilter[];

export type SablierMerkleInstant_v1_3_TransferAdmin_eventFilters = 
    SablierMerkleInstant_v1_3_TransferAdmin_eventFilter
  | SablierMerkleInstant_v1_3_TransferAdmin_eventFilter[]
  | ((_1:SablierMerkleInstant_v1_3_TransferAdmin_eventFiltersArgs) => SablierMerkleInstant_v1_3_TransferAdmin_eventFiltersDefinition);

export type SablierMerkleInstant_v1_3_Clawback_eventArgs = {
  readonly admin: Address_t; 
  readonly to: Address_t; 
  readonly amount: bigint
};

export type SablierMerkleInstant_v1_3_Clawback_block = Block_t;

export type SablierMerkleInstant_v1_3_Clawback_transaction = Transaction_t;

export type SablierMerkleInstant_v1_3_Clawback_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierMerkleInstant_v1_3_Clawback_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierMerkleInstant_v1_3_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierMerkleInstant_v1_3_Clawback_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierMerkleInstant_v1_3_Clawback_block
};

export type SablierMerkleInstant_v1_3_Clawback_loaderArgs = Internal_genericLoaderArgs<SablierMerkleInstant_v1_3_Clawback_event,loaderContext>;

export type SablierMerkleInstant_v1_3_Clawback_loader<loaderReturn> = Internal_genericLoader<SablierMerkleInstant_v1_3_Clawback_loaderArgs,loaderReturn>;

export type SablierMerkleInstant_v1_3_Clawback_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierMerkleInstant_v1_3_Clawback_event,handlerContext,loaderReturn>;

export type SablierMerkleInstant_v1_3_Clawback_handler<loaderReturn> = Internal_genericHandler<SablierMerkleInstant_v1_3_Clawback_handlerArgs<loaderReturn>>;

export type SablierMerkleInstant_v1_3_Clawback_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierMerkleInstant_v1_3_Clawback_event,contractRegistrations>>;

export type SablierMerkleInstant_v1_3_Clawback_eventFilter = { readonly admin?: SingleOrMultiple_t<Address_t>; readonly to?: SingleOrMultiple_t<Address_t> };

export type SablierMerkleInstant_v1_3_Clawback_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierMerkleInstant_v1_3_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierMerkleInstant_v1_3_Clawback_eventFiltersDefinition = 
    SablierMerkleInstant_v1_3_Clawback_eventFilter
  | SablierMerkleInstant_v1_3_Clawback_eventFilter[];

export type SablierMerkleInstant_v1_3_Clawback_eventFilters = 
    SablierMerkleInstant_v1_3_Clawback_eventFilter
  | SablierMerkleInstant_v1_3_Clawback_eventFilter[]
  | ((_1:SablierMerkleInstant_v1_3_Clawback_eventFiltersArgs) => SablierMerkleInstant_v1_3_Clawback_eventFiltersDefinition);

export type SablierMerkleInstant_v1_3_Claim_eventArgs = {
  readonly index: bigint; 
  readonly recipient: Address_t; 
  readonly amount: bigint
};

export type SablierMerkleInstant_v1_3_Claim_block = Block_t;

export type SablierMerkleInstant_v1_3_Claim_transaction = Transaction_t;

export type SablierMerkleInstant_v1_3_Claim_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierMerkleInstant_v1_3_Claim_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierMerkleInstant_v1_3_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierMerkleInstant_v1_3_Claim_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierMerkleInstant_v1_3_Claim_block
};

export type SablierMerkleInstant_v1_3_Claim_loaderArgs = Internal_genericLoaderArgs<SablierMerkleInstant_v1_3_Claim_event,loaderContext>;

export type SablierMerkleInstant_v1_3_Claim_loader<loaderReturn> = Internal_genericLoader<SablierMerkleInstant_v1_3_Claim_loaderArgs,loaderReturn>;

export type SablierMerkleInstant_v1_3_Claim_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierMerkleInstant_v1_3_Claim_event,handlerContext,loaderReturn>;

export type SablierMerkleInstant_v1_3_Claim_handler<loaderReturn> = Internal_genericHandler<SablierMerkleInstant_v1_3_Claim_handlerArgs<loaderReturn>>;

export type SablierMerkleInstant_v1_3_Claim_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierMerkleInstant_v1_3_Claim_event,contractRegistrations>>;

export type SablierMerkleInstant_v1_3_Claim_eventFilter = { readonly recipient?: SingleOrMultiple_t<Address_t> };

export type SablierMerkleInstant_v1_3_Claim_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierMerkleInstant_v1_3_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierMerkleInstant_v1_3_Claim_eventFiltersDefinition = 
    SablierMerkleInstant_v1_3_Claim_eventFilter
  | SablierMerkleInstant_v1_3_Claim_eventFilter[];

export type SablierMerkleInstant_v1_3_Claim_eventFilters = 
    SablierMerkleInstant_v1_3_Claim_eventFilter
  | SablierMerkleInstant_v1_3_Claim_eventFilter[]
  | ((_1:SablierMerkleInstant_v1_3_Claim_eventFiltersArgs) => SablierMerkleInstant_v1_3_Claim_eventFiltersDefinition);

export type SablierMerkleLL_v1_3_chainId = 
    1
  | 10
  | 50
  | 56
  | 100
  | 130
  | 137
  | 324
  | 478
  | 1890
  | 2741
  | 2818
  | 5330
  | 5845
  | 8453
  | 34443
  | 42161
  | 43114
  | 50104
  | 59144
  | 80094
  | 81457
  | 84532
  | 88888
  | 534352
  | 11155111;

export type SablierMerkleLL_v1_3_TransferAdmin_eventArgs = { readonly oldAdmin: Address_t; readonly newAdmin: Address_t };

export type SablierMerkleLL_v1_3_TransferAdmin_block = Block_t;

export type SablierMerkleLL_v1_3_TransferAdmin_transaction = Transaction_t;

export type SablierMerkleLL_v1_3_TransferAdmin_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierMerkleLL_v1_3_TransferAdmin_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierMerkleLL_v1_3_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierMerkleLL_v1_3_TransferAdmin_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierMerkleLL_v1_3_TransferAdmin_block
};

export type SablierMerkleLL_v1_3_TransferAdmin_loaderArgs = Internal_genericLoaderArgs<SablierMerkleLL_v1_3_TransferAdmin_event,loaderContext>;

export type SablierMerkleLL_v1_3_TransferAdmin_loader<loaderReturn> = Internal_genericLoader<SablierMerkleLL_v1_3_TransferAdmin_loaderArgs,loaderReturn>;

export type SablierMerkleLL_v1_3_TransferAdmin_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierMerkleLL_v1_3_TransferAdmin_event,handlerContext,loaderReturn>;

export type SablierMerkleLL_v1_3_TransferAdmin_handler<loaderReturn> = Internal_genericHandler<SablierMerkleLL_v1_3_TransferAdmin_handlerArgs<loaderReturn>>;

export type SablierMerkleLL_v1_3_TransferAdmin_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierMerkleLL_v1_3_TransferAdmin_event,contractRegistrations>>;

export type SablierMerkleLL_v1_3_TransferAdmin_eventFilter = { readonly oldAdmin?: SingleOrMultiple_t<Address_t>; readonly newAdmin?: SingleOrMultiple_t<Address_t> };

export type SablierMerkleLL_v1_3_TransferAdmin_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierMerkleLL_v1_3_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierMerkleLL_v1_3_TransferAdmin_eventFiltersDefinition = 
    SablierMerkleLL_v1_3_TransferAdmin_eventFilter
  | SablierMerkleLL_v1_3_TransferAdmin_eventFilter[];

export type SablierMerkleLL_v1_3_TransferAdmin_eventFilters = 
    SablierMerkleLL_v1_3_TransferAdmin_eventFilter
  | SablierMerkleLL_v1_3_TransferAdmin_eventFilter[]
  | ((_1:SablierMerkleLL_v1_3_TransferAdmin_eventFiltersArgs) => SablierMerkleLL_v1_3_TransferAdmin_eventFiltersDefinition);

export type SablierMerkleLL_v1_3_Clawback_eventArgs = {
  readonly admin: Address_t; 
  readonly to: Address_t; 
  readonly amount: bigint
};

export type SablierMerkleLL_v1_3_Clawback_block = Block_t;

export type SablierMerkleLL_v1_3_Clawback_transaction = Transaction_t;

export type SablierMerkleLL_v1_3_Clawback_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierMerkleLL_v1_3_Clawback_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierMerkleLL_v1_3_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierMerkleLL_v1_3_Clawback_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierMerkleLL_v1_3_Clawback_block
};

export type SablierMerkleLL_v1_3_Clawback_loaderArgs = Internal_genericLoaderArgs<SablierMerkleLL_v1_3_Clawback_event,loaderContext>;

export type SablierMerkleLL_v1_3_Clawback_loader<loaderReturn> = Internal_genericLoader<SablierMerkleLL_v1_3_Clawback_loaderArgs,loaderReturn>;

export type SablierMerkleLL_v1_3_Clawback_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierMerkleLL_v1_3_Clawback_event,handlerContext,loaderReturn>;

export type SablierMerkleLL_v1_3_Clawback_handler<loaderReturn> = Internal_genericHandler<SablierMerkleLL_v1_3_Clawback_handlerArgs<loaderReturn>>;

export type SablierMerkleLL_v1_3_Clawback_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierMerkleLL_v1_3_Clawback_event,contractRegistrations>>;

export type SablierMerkleLL_v1_3_Clawback_eventFilter = { readonly admin?: SingleOrMultiple_t<Address_t>; readonly to?: SingleOrMultiple_t<Address_t> };

export type SablierMerkleLL_v1_3_Clawback_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierMerkleLL_v1_3_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierMerkleLL_v1_3_Clawback_eventFiltersDefinition = 
    SablierMerkleLL_v1_3_Clawback_eventFilter
  | SablierMerkleLL_v1_3_Clawback_eventFilter[];

export type SablierMerkleLL_v1_3_Clawback_eventFilters = 
    SablierMerkleLL_v1_3_Clawback_eventFilter
  | SablierMerkleLL_v1_3_Clawback_eventFilter[]
  | ((_1:SablierMerkleLL_v1_3_Clawback_eventFiltersArgs) => SablierMerkleLL_v1_3_Clawback_eventFiltersDefinition);

export type SablierMerkleLL_v1_3_Claim_eventArgs = {
  readonly index: bigint; 
  readonly recipient: Address_t; 
  readonly amount: bigint; 
  readonly streamId: bigint
};

export type SablierMerkleLL_v1_3_Claim_block = Block_t;

export type SablierMerkleLL_v1_3_Claim_transaction = Transaction_t;

export type SablierMerkleLL_v1_3_Claim_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierMerkleLL_v1_3_Claim_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierMerkleLL_v1_3_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierMerkleLL_v1_3_Claim_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierMerkleLL_v1_3_Claim_block
};

export type SablierMerkleLL_v1_3_Claim_loaderArgs = Internal_genericLoaderArgs<SablierMerkleLL_v1_3_Claim_event,loaderContext>;

export type SablierMerkleLL_v1_3_Claim_loader<loaderReturn> = Internal_genericLoader<SablierMerkleLL_v1_3_Claim_loaderArgs,loaderReturn>;

export type SablierMerkleLL_v1_3_Claim_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierMerkleLL_v1_3_Claim_event,handlerContext,loaderReturn>;

export type SablierMerkleLL_v1_3_Claim_handler<loaderReturn> = Internal_genericHandler<SablierMerkleLL_v1_3_Claim_handlerArgs<loaderReturn>>;

export type SablierMerkleLL_v1_3_Claim_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierMerkleLL_v1_3_Claim_event,contractRegistrations>>;

export type SablierMerkleLL_v1_3_Claim_eventFilter = { readonly recipient?: SingleOrMultiple_t<Address_t>; readonly streamId?: SingleOrMultiple_t<bigint> };

export type SablierMerkleLL_v1_3_Claim_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierMerkleLL_v1_3_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierMerkleLL_v1_3_Claim_eventFiltersDefinition = 
    SablierMerkleLL_v1_3_Claim_eventFilter
  | SablierMerkleLL_v1_3_Claim_eventFilter[];

export type SablierMerkleLL_v1_3_Claim_eventFilters = 
    SablierMerkleLL_v1_3_Claim_eventFilter
  | SablierMerkleLL_v1_3_Claim_eventFilter[]
  | ((_1:SablierMerkleLL_v1_3_Claim_eventFiltersArgs) => SablierMerkleLL_v1_3_Claim_eventFiltersDefinition);

export type SablierMerkleLT_v1_3_chainId = 
    1
  | 10
  | 50
  | 56
  | 100
  | 130
  | 137
  | 324
  | 478
  | 1890
  | 2741
  | 2818
  | 5330
  | 5845
  | 8453
  | 34443
  | 42161
  | 43114
  | 50104
  | 59144
  | 80094
  | 81457
  | 84532
  | 88888
  | 534352
  | 11155111;

export type SablierMerkleLT_v1_3_TransferAdmin_eventArgs = { readonly oldAdmin: Address_t; readonly newAdmin: Address_t };

export type SablierMerkleLT_v1_3_TransferAdmin_block = Block_t;

export type SablierMerkleLT_v1_3_TransferAdmin_transaction = Transaction_t;

export type SablierMerkleLT_v1_3_TransferAdmin_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierMerkleLT_v1_3_TransferAdmin_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierMerkleLT_v1_3_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierMerkleLT_v1_3_TransferAdmin_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierMerkleLT_v1_3_TransferAdmin_block
};

export type SablierMerkleLT_v1_3_TransferAdmin_loaderArgs = Internal_genericLoaderArgs<SablierMerkleLT_v1_3_TransferAdmin_event,loaderContext>;

export type SablierMerkleLT_v1_3_TransferAdmin_loader<loaderReturn> = Internal_genericLoader<SablierMerkleLT_v1_3_TransferAdmin_loaderArgs,loaderReturn>;

export type SablierMerkleLT_v1_3_TransferAdmin_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierMerkleLT_v1_3_TransferAdmin_event,handlerContext,loaderReturn>;

export type SablierMerkleLT_v1_3_TransferAdmin_handler<loaderReturn> = Internal_genericHandler<SablierMerkleLT_v1_3_TransferAdmin_handlerArgs<loaderReturn>>;

export type SablierMerkleLT_v1_3_TransferAdmin_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierMerkleLT_v1_3_TransferAdmin_event,contractRegistrations>>;

export type SablierMerkleLT_v1_3_TransferAdmin_eventFilter = { readonly oldAdmin?: SingleOrMultiple_t<Address_t>; readonly newAdmin?: SingleOrMultiple_t<Address_t> };

export type SablierMerkleLT_v1_3_TransferAdmin_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierMerkleLT_v1_3_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierMerkleLT_v1_3_TransferAdmin_eventFiltersDefinition = 
    SablierMerkleLT_v1_3_TransferAdmin_eventFilter
  | SablierMerkleLT_v1_3_TransferAdmin_eventFilter[];

export type SablierMerkleLT_v1_3_TransferAdmin_eventFilters = 
    SablierMerkleLT_v1_3_TransferAdmin_eventFilter
  | SablierMerkleLT_v1_3_TransferAdmin_eventFilter[]
  | ((_1:SablierMerkleLT_v1_3_TransferAdmin_eventFiltersArgs) => SablierMerkleLT_v1_3_TransferAdmin_eventFiltersDefinition);

export type SablierMerkleLT_v1_3_Clawback_eventArgs = {
  readonly admin: Address_t; 
  readonly to: Address_t; 
  readonly amount: bigint
};

export type SablierMerkleLT_v1_3_Clawback_block = Block_t;

export type SablierMerkleLT_v1_3_Clawback_transaction = Transaction_t;

export type SablierMerkleLT_v1_3_Clawback_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierMerkleLT_v1_3_Clawback_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierMerkleLT_v1_3_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierMerkleLT_v1_3_Clawback_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierMerkleLT_v1_3_Clawback_block
};

export type SablierMerkleLT_v1_3_Clawback_loaderArgs = Internal_genericLoaderArgs<SablierMerkleLT_v1_3_Clawback_event,loaderContext>;

export type SablierMerkleLT_v1_3_Clawback_loader<loaderReturn> = Internal_genericLoader<SablierMerkleLT_v1_3_Clawback_loaderArgs,loaderReturn>;

export type SablierMerkleLT_v1_3_Clawback_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierMerkleLT_v1_3_Clawback_event,handlerContext,loaderReturn>;

export type SablierMerkleLT_v1_3_Clawback_handler<loaderReturn> = Internal_genericHandler<SablierMerkleLT_v1_3_Clawback_handlerArgs<loaderReturn>>;

export type SablierMerkleLT_v1_3_Clawback_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierMerkleLT_v1_3_Clawback_event,contractRegistrations>>;

export type SablierMerkleLT_v1_3_Clawback_eventFilter = { readonly admin?: SingleOrMultiple_t<Address_t>; readonly to?: SingleOrMultiple_t<Address_t> };

export type SablierMerkleLT_v1_3_Clawback_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierMerkleLT_v1_3_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierMerkleLT_v1_3_Clawback_eventFiltersDefinition = 
    SablierMerkleLT_v1_3_Clawback_eventFilter
  | SablierMerkleLT_v1_3_Clawback_eventFilter[];

export type SablierMerkleLT_v1_3_Clawback_eventFilters = 
    SablierMerkleLT_v1_3_Clawback_eventFilter
  | SablierMerkleLT_v1_3_Clawback_eventFilter[]
  | ((_1:SablierMerkleLT_v1_3_Clawback_eventFiltersArgs) => SablierMerkleLT_v1_3_Clawback_eventFiltersDefinition);

export type SablierMerkleLT_v1_3_Claim_eventArgs = {
  readonly index: bigint; 
  readonly recipient: Address_t; 
  readonly amount: bigint; 
  readonly streamId: bigint
};

export type SablierMerkleLT_v1_3_Claim_block = Block_t;

export type SablierMerkleLT_v1_3_Claim_transaction = Transaction_t;

export type SablierMerkleLT_v1_3_Claim_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierMerkleLT_v1_3_Claim_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierMerkleLT_v1_3_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierMerkleLT_v1_3_Claim_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierMerkleLT_v1_3_Claim_block
};

export type SablierMerkleLT_v1_3_Claim_loaderArgs = Internal_genericLoaderArgs<SablierMerkleLT_v1_3_Claim_event,loaderContext>;

export type SablierMerkleLT_v1_3_Claim_loader<loaderReturn> = Internal_genericLoader<SablierMerkleLT_v1_3_Claim_loaderArgs,loaderReturn>;

export type SablierMerkleLT_v1_3_Claim_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierMerkleLT_v1_3_Claim_event,handlerContext,loaderReturn>;

export type SablierMerkleLT_v1_3_Claim_handler<loaderReturn> = Internal_genericHandler<SablierMerkleLT_v1_3_Claim_handlerArgs<loaderReturn>>;

export type SablierMerkleLT_v1_3_Claim_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierMerkleLT_v1_3_Claim_event,contractRegistrations>>;

export type SablierMerkleLT_v1_3_Claim_eventFilter = { readonly recipient?: SingleOrMultiple_t<Address_t>; readonly streamId?: SingleOrMultiple_t<bigint> };

export type SablierMerkleLT_v1_3_Claim_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierMerkleLT_v1_3_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierMerkleLT_v1_3_Claim_eventFiltersDefinition = 
    SablierMerkleLT_v1_3_Claim_eventFilter
  | SablierMerkleLT_v1_3_Claim_eventFilter[];

export type SablierMerkleLT_v1_3_Claim_eventFilters = 
    SablierMerkleLT_v1_3_Claim_eventFilter
  | SablierMerkleLT_v1_3_Claim_eventFilter[]
  | ((_1:SablierMerkleLT_v1_3_Claim_eventFiltersArgs) => SablierMerkleLT_v1_3_Claim_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_0_chainId = 
    1
  | 10
  | 56
  | 100
  | 137
  | 8453
  | 42161
  | 43114
  | 534352
  | 11155111;

export type SablierV2LockupDynamic_v1_0_Approval_eventArgs = {
  readonly owner: Address_t; 
  readonly approved: Address_t; 
  readonly tokenId: bigint
};

export type SablierV2LockupDynamic_v1_0_Approval_block = Block_t;

export type SablierV2LockupDynamic_v1_0_Approval_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_0_Approval_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_0_Approval_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_0_Approval_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_0_Approval_block
};

export type SablierV2LockupDynamic_v1_0_Approval_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_0_Approval_event,loaderContext>;

export type SablierV2LockupDynamic_v1_0_Approval_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_0_Approval_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_0_Approval_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_0_Approval_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_0_Approval_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_0_Approval_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_0_Approval_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_0_Approval_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_0_Approval_eventFilter = {
  readonly owner?: SingleOrMultiple_t<Address_t>; 
  readonly approved?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierV2LockupDynamic_v1_0_Approval_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_0_Approval_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_0_Approval_eventFilter
  | SablierV2LockupDynamic_v1_0_Approval_eventFilter[];

export type SablierV2LockupDynamic_v1_0_Approval_eventFilters = 
    SablierV2LockupDynamic_v1_0_Approval_eventFilter
  | SablierV2LockupDynamic_v1_0_Approval_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_0_Approval_eventFiltersArgs) => SablierV2LockupDynamic_v1_0_Approval_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_0_ApprovalForAll_eventArgs = {
  readonly owner: Address_t; 
  readonly operator: Address_t; 
  readonly approved: boolean
};

export type SablierV2LockupDynamic_v1_0_ApprovalForAll_block = Block_t;

export type SablierV2LockupDynamic_v1_0_ApprovalForAll_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_0_ApprovalForAll_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_0_ApprovalForAll_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_0_ApprovalForAll_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_0_ApprovalForAll_block
};

export type SablierV2LockupDynamic_v1_0_ApprovalForAll_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_0_ApprovalForAll_event,loaderContext>;

export type SablierV2LockupDynamic_v1_0_ApprovalForAll_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_0_ApprovalForAll_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_0_ApprovalForAll_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_0_ApprovalForAll_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_0_ApprovalForAll_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_0_ApprovalForAll_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_0_ApprovalForAll_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_0_ApprovalForAll_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_0_ApprovalForAll_eventFilter = { readonly owner?: SingleOrMultiple_t<Address_t>; readonly operator?: SingleOrMultiple_t<Address_t> };

export type SablierV2LockupDynamic_v1_0_ApprovalForAll_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_0_ApprovalForAll_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_0_ApprovalForAll_eventFilter
  | SablierV2LockupDynamic_v1_0_ApprovalForAll_eventFilter[];

export type SablierV2LockupDynamic_v1_0_ApprovalForAll_eventFilters = 
    SablierV2LockupDynamic_v1_0_ApprovalForAll_eventFilter
  | SablierV2LockupDynamic_v1_0_ApprovalForAll_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_0_ApprovalForAll_eventFiltersArgs) => SablierV2LockupDynamic_v1_0_ApprovalForAll_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_0_Transfer_eventArgs = {
  readonly from: Address_t; 
  readonly to: Address_t; 
  readonly tokenId: bigint
};

export type SablierV2LockupDynamic_v1_0_Transfer_block = Block_t;

export type SablierV2LockupDynamic_v1_0_Transfer_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_0_Transfer_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_0_Transfer_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_0_Transfer_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_0_Transfer_block
};

export type SablierV2LockupDynamic_v1_0_Transfer_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_0_Transfer_event,loaderContext>;

export type SablierV2LockupDynamic_v1_0_Transfer_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_0_Transfer_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_0_Transfer_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_0_Transfer_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_0_Transfer_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_0_Transfer_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_0_Transfer_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_0_Transfer_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_0_Transfer_eventFilter = {
  readonly from?: SingleOrMultiple_t<Address_t>; 
  readonly to?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierV2LockupDynamic_v1_0_Transfer_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_0_Transfer_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_0_Transfer_eventFilter
  | SablierV2LockupDynamic_v1_0_Transfer_eventFilter[];

export type SablierV2LockupDynamic_v1_0_Transfer_eventFilters = 
    SablierV2LockupDynamic_v1_0_Transfer_eventFilter
  | SablierV2LockupDynamic_v1_0_Transfer_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_0_Transfer_eventFiltersArgs) => SablierV2LockupDynamic_v1_0_Transfer_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_0_CancelLockupStream_eventArgs = {
  readonly streamId: bigint; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly senderAmount: bigint; 
  readonly recipientAmount: bigint
};

export type SablierV2LockupDynamic_v1_0_CancelLockupStream_block = Block_t;

export type SablierV2LockupDynamic_v1_0_CancelLockupStream_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_0_CancelLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_0_CancelLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_0_CancelLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_0_CancelLockupStream_block
};

export type SablierV2LockupDynamic_v1_0_CancelLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_0_CancelLockupStream_event,loaderContext>;

export type SablierV2LockupDynamic_v1_0_CancelLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_0_CancelLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_0_CancelLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_0_CancelLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_0_CancelLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_0_CancelLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_0_CancelLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_0_CancelLockupStream_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_0_CancelLockupStream_eventFilter = {
  readonly streamId?: SingleOrMultiple_t<bigint>; 
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>
};

export type SablierV2LockupDynamic_v1_0_CancelLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_0_CancelLockupStream_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_0_CancelLockupStream_eventFilter
  | SablierV2LockupDynamic_v1_0_CancelLockupStream_eventFilter[];

export type SablierV2LockupDynamic_v1_0_CancelLockupStream_eventFilters = 
    SablierV2LockupDynamic_v1_0_CancelLockupStream_eventFilter
  | SablierV2LockupDynamic_v1_0_CancelLockupStream_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_0_CancelLockupStream_eventFiltersArgs) => SablierV2LockupDynamic_v1_0_CancelLockupStream_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventArgs = {
  readonly streamId: bigint; 
  readonly funder: Address_t; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly amounts: [bigint, bigint, bigint]; 
  readonly asset: Address_t; 
  readonly cancelable: boolean; 
  readonly segments: Array<[bigint, bigint, bigint]>; 
  readonly range: [bigint, bigint]; 
  readonly broker: Address_t
};

export type SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_block = Block_t;

export type SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_block
};

export type SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_event,loaderContext>;

export type SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventFilter = {
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>; 
  readonly asset?: SingleOrMultiple_t<Address_t>
};

export type SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventFilter
  | SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventFilter[];

export type SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventFilters = 
    SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventFilter
  | SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventFiltersArgs) => SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventArgs = { readonly streamId: bigint };

export type SablierV2LockupDynamic_v1_0_RenounceLockupStream_block = Block_t;

export type SablierV2LockupDynamic_v1_0_RenounceLockupStream_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_0_RenounceLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_0_RenounceLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_0_RenounceLockupStream_block
};

export type SablierV2LockupDynamic_v1_0_RenounceLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_0_RenounceLockupStream_event,loaderContext>;

export type SablierV2LockupDynamic_v1_0_RenounceLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_0_RenounceLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_0_RenounceLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_0_RenounceLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_0_RenounceLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_0_RenounceLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_0_RenounceLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_0_RenounceLockupStream_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint> };

export type SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventFilter
  | SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventFilter[];

export type SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventFilters = 
    SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventFilter
  | SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventFiltersArgs) => SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventArgs = {
  readonly streamId: bigint; 
  readonly to: Address_t; 
  readonly amount: bigint
};

export type SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_block = Block_t;

export type SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_block
};

export type SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_event,loaderContext>;

export type SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint>; readonly to?: SingleOrMultiple_t<Address_t> };

export type SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventFilter
  | SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventFilter[];

export type SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventFilters = 
    SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventFilter
  | SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventFiltersArgs) => SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_1_chainId = 
    1
  | 10
  | 56
  | 100
  | 137
  | 324
  | 1890
  | 8453
  | 42161
  | 43114
  | 81457
  | 84532
  | 534352
  | 11155111;

export type SablierV2LockupDynamic_v1_1_Approval_eventArgs = {
  readonly owner: Address_t; 
  readonly approved: Address_t; 
  readonly tokenId: bigint
};

export type SablierV2LockupDynamic_v1_1_Approval_block = Block_t;

export type SablierV2LockupDynamic_v1_1_Approval_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_1_Approval_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_1_Approval_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_1_Approval_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_1_Approval_block
};

export type SablierV2LockupDynamic_v1_1_Approval_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_1_Approval_event,loaderContext>;

export type SablierV2LockupDynamic_v1_1_Approval_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_1_Approval_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_1_Approval_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_1_Approval_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_1_Approval_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_1_Approval_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_1_Approval_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_1_Approval_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_1_Approval_eventFilter = {
  readonly owner?: SingleOrMultiple_t<Address_t>; 
  readonly approved?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierV2LockupDynamic_v1_1_Approval_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_1_Approval_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_1_Approval_eventFilter
  | SablierV2LockupDynamic_v1_1_Approval_eventFilter[];

export type SablierV2LockupDynamic_v1_1_Approval_eventFilters = 
    SablierV2LockupDynamic_v1_1_Approval_eventFilter
  | SablierV2LockupDynamic_v1_1_Approval_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_1_Approval_eventFiltersArgs) => SablierV2LockupDynamic_v1_1_Approval_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_1_ApprovalForAll_eventArgs = {
  readonly owner: Address_t; 
  readonly operator: Address_t; 
  readonly approved: boolean
};

export type SablierV2LockupDynamic_v1_1_ApprovalForAll_block = Block_t;

export type SablierV2LockupDynamic_v1_1_ApprovalForAll_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_1_ApprovalForAll_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_1_ApprovalForAll_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_1_ApprovalForAll_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_1_ApprovalForAll_block
};

export type SablierV2LockupDynamic_v1_1_ApprovalForAll_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_1_ApprovalForAll_event,loaderContext>;

export type SablierV2LockupDynamic_v1_1_ApprovalForAll_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_1_ApprovalForAll_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_1_ApprovalForAll_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_1_ApprovalForAll_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_1_ApprovalForAll_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_1_ApprovalForAll_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_1_ApprovalForAll_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_1_ApprovalForAll_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_1_ApprovalForAll_eventFilter = { readonly owner?: SingleOrMultiple_t<Address_t>; readonly operator?: SingleOrMultiple_t<Address_t> };

export type SablierV2LockupDynamic_v1_1_ApprovalForAll_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_1_ApprovalForAll_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_1_ApprovalForAll_eventFilter
  | SablierV2LockupDynamic_v1_1_ApprovalForAll_eventFilter[];

export type SablierV2LockupDynamic_v1_1_ApprovalForAll_eventFilters = 
    SablierV2LockupDynamic_v1_1_ApprovalForAll_eventFilter
  | SablierV2LockupDynamic_v1_1_ApprovalForAll_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_1_ApprovalForAll_eventFiltersArgs) => SablierV2LockupDynamic_v1_1_ApprovalForAll_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_1_Transfer_eventArgs = {
  readonly from: Address_t; 
  readonly to: Address_t; 
  readonly tokenId: bigint
};

export type SablierV2LockupDynamic_v1_1_Transfer_block = Block_t;

export type SablierV2LockupDynamic_v1_1_Transfer_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_1_Transfer_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_1_Transfer_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_1_Transfer_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_1_Transfer_block
};

export type SablierV2LockupDynamic_v1_1_Transfer_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_1_Transfer_event,loaderContext>;

export type SablierV2LockupDynamic_v1_1_Transfer_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_1_Transfer_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_1_Transfer_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_1_Transfer_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_1_Transfer_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_1_Transfer_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_1_Transfer_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_1_Transfer_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_1_Transfer_eventFilter = {
  readonly from?: SingleOrMultiple_t<Address_t>; 
  readonly to?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierV2LockupDynamic_v1_1_Transfer_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_1_Transfer_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_1_Transfer_eventFilter
  | SablierV2LockupDynamic_v1_1_Transfer_eventFilter[];

export type SablierV2LockupDynamic_v1_1_Transfer_eventFilters = 
    SablierV2LockupDynamic_v1_1_Transfer_eventFilter
  | SablierV2LockupDynamic_v1_1_Transfer_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_1_Transfer_eventFiltersArgs) => SablierV2LockupDynamic_v1_1_Transfer_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_1_CancelLockupStream_eventArgs = {
  readonly streamId: bigint; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly asset: Address_t; 
  readonly senderAmount: bigint; 
  readonly recipientAmount: bigint
};

export type SablierV2LockupDynamic_v1_1_CancelLockupStream_block = Block_t;

export type SablierV2LockupDynamic_v1_1_CancelLockupStream_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_1_CancelLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_1_CancelLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_1_CancelLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_1_CancelLockupStream_block
};

export type SablierV2LockupDynamic_v1_1_CancelLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_1_CancelLockupStream_event,loaderContext>;

export type SablierV2LockupDynamic_v1_1_CancelLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_1_CancelLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_1_CancelLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_1_CancelLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_1_CancelLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_1_CancelLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_1_CancelLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_1_CancelLockupStream_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_1_CancelLockupStream_eventFilter = {
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>; 
  readonly asset?: SingleOrMultiple_t<Address_t>
};

export type SablierV2LockupDynamic_v1_1_CancelLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_1_CancelLockupStream_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_1_CancelLockupStream_eventFilter
  | SablierV2LockupDynamic_v1_1_CancelLockupStream_eventFilter[];

export type SablierV2LockupDynamic_v1_1_CancelLockupStream_eventFilters = 
    SablierV2LockupDynamic_v1_1_CancelLockupStream_eventFilter
  | SablierV2LockupDynamic_v1_1_CancelLockupStream_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_1_CancelLockupStream_eventFiltersArgs) => SablierV2LockupDynamic_v1_1_CancelLockupStream_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventArgs = {
  readonly streamId: bigint; 
  readonly funder: Address_t; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly amounts: [bigint, bigint, bigint]; 
  readonly asset: Address_t; 
  readonly cancelable: boolean; 
  readonly transferable: boolean; 
  readonly segments: Array<[bigint, bigint, bigint]>; 
  readonly range: [bigint, bigint]; 
  readonly broker: Address_t
};

export type SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_block = Block_t;

export type SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_block
};

export type SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_event,loaderContext>;

export type SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventFilter = {
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>; 
  readonly asset?: SingleOrMultiple_t<Address_t>
};

export type SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventFilter
  | SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventFilter[];

export type SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventFilters = 
    SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventFilter
  | SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventFiltersArgs) => SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventArgs = { readonly streamId: bigint };

export type SablierV2LockupDynamic_v1_1_RenounceLockupStream_block = Block_t;

export type SablierV2LockupDynamic_v1_1_RenounceLockupStream_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_1_RenounceLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_1_RenounceLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_1_RenounceLockupStream_block
};

export type SablierV2LockupDynamic_v1_1_RenounceLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_1_RenounceLockupStream_event,loaderContext>;

export type SablierV2LockupDynamic_v1_1_RenounceLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_1_RenounceLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_1_RenounceLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_1_RenounceLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_1_RenounceLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_1_RenounceLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_1_RenounceLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_1_RenounceLockupStream_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint> };

export type SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventFilter
  | SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventFilter[];

export type SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventFilters = 
    SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventFilter
  | SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventFiltersArgs) => SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventArgs = {
  readonly streamId: bigint; 
  readonly to: Address_t; 
  readonly asset: Address_t; 
  readonly amount: bigint
};

export type SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_block = Block_t;

export type SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_block
};

export type SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_event,loaderContext>;

export type SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventFilter = {
  readonly streamId?: SingleOrMultiple_t<bigint>; 
  readonly to?: SingleOrMultiple_t<Address_t>; 
  readonly asset?: SingleOrMultiple_t<Address_t>
};

export type SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventFilter
  | SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventFilter[];

export type SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventFilters = 
    SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventFilter
  | SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventFiltersArgs) => SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_2_chainId = 
    1
  | 10
  | 56
  | 100
  | 137
  | 324
  | 1890
  | 2741
  | 2818
  | 5330
  | 5845
  | 8453
  | 34443
  | 42161
  | 43114
  | 59144
  | 81457
  | 84532
  | 88888
  | 534352
  | 11155111;

export type SablierV2LockupDynamic_v1_2_Approval_eventArgs = {
  readonly owner: Address_t; 
  readonly approved: Address_t; 
  readonly tokenId: bigint
};

export type SablierV2LockupDynamic_v1_2_Approval_block = Block_t;

export type SablierV2LockupDynamic_v1_2_Approval_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_2_Approval_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_2_Approval_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_2_Approval_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_2_Approval_block
};

export type SablierV2LockupDynamic_v1_2_Approval_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_2_Approval_event,loaderContext>;

export type SablierV2LockupDynamic_v1_2_Approval_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_2_Approval_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_2_Approval_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_2_Approval_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_2_Approval_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_2_Approval_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_2_Approval_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_2_Approval_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_2_Approval_eventFilter = {
  readonly owner?: SingleOrMultiple_t<Address_t>; 
  readonly approved?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierV2LockupDynamic_v1_2_Approval_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_2_Approval_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_2_Approval_eventFilter
  | SablierV2LockupDynamic_v1_2_Approval_eventFilter[];

export type SablierV2LockupDynamic_v1_2_Approval_eventFilters = 
    SablierV2LockupDynamic_v1_2_Approval_eventFilter
  | SablierV2LockupDynamic_v1_2_Approval_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_2_Approval_eventFiltersArgs) => SablierV2LockupDynamic_v1_2_Approval_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_2_ApprovalForAll_eventArgs = {
  readonly owner: Address_t; 
  readonly operator: Address_t; 
  readonly approved: boolean
};

export type SablierV2LockupDynamic_v1_2_ApprovalForAll_block = Block_t;

export type SablierV2LockupDynamic_v1_2_ApprovalForAll_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_2_ApprovalForAll_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_2_ApprovalForAll_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_2_ApprovalForAll_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_2_ApprovalForAll_block
};

export type SablierV2LockupDynamic_v1_2_ApprovalForAll_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_2_ApprovalForAll_event,loaderContext>;

export type SablierV2LockupDynamic_v1_2_ApprovalForAll_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_2_ApprovalForAll_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_2_ApprovalForAll_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_2_ApprovalForAll_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_2_ApprovalForAll_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_2_ApprovalForAll_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_2_ApprovalForAll_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_2_ApprovalForAll_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_2_ApprovalForAll_eventFilter = { readonly owner?: SingleOrMultiple_t<Address_t>; readonly operator?: SingleOrMultiple_t<Address_t> };

export type SablierV2LockupDynamic_v1_2_ApprovalForAll_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_2_ApprovalForAll_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_2_ApprovalForAll_eventFilter
  | SablierV2LockupDynamic_v1_2_ApprovalForAll_eventFilter[];

export type SablierV2LockupDynamic_v1_2_ApprovalForAll_eventFilters = 
    SablierV2LockupDynamic_v1_2_ApprovalForAll_eventFilter
  | SablierV2LockupDynamic_v1_2_ApprovalForAll_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_2_ApprovalForAll_eventFiltersArgs) => SablierV2LockupDynamic_v1_2_ApprovalForAll_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_2_Transfer_eventArgs = {
  readonly from: Address_t; 
  readonly to: Address_t; 
  readonly tokenId: bigint
};

export type SablierV2LockupDynamic_v1_2_Transfer_block = Block_t;

export type SablierV2LockupDynamic_v1_2_Transfer_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_2_Transfer_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_2_Transfer_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_2_Transfer_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_2_Transfer_block
};

export type SablierV2LockupDynamic_v1_2_Transfer_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_2_Transfer_event,loaderContext>;

export type SablierV2LockupDynamic_v1_2_Transfer_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_2_Transfer_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_2_Transfer_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_2_Transfer_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_2_Transfer_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_2_Transfer_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_2_Transfer_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_2_Transfer_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_2_Transfer_eventFilter = {
  readonly from?: SingleOrMultiple_t<Address_t>; 
  readonly to?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierV2LockupDynamic_v1_2_Transfer_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_2_Transfer_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_2_Transfer_eventFilter
  | SablierV2LockupDynamic_v1_2_Transfer_eventFilter[];

export type SablierV2LockupDynamic_v1_2_Transfer_eventFilters = 
    SablierV2LockupDynamic_v1_2_Transfer_eventFilter
  | SablierV2LockupDynamic_v1_2_Transfer_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_2_Transfer_eventFiltersArgs) => SablierV2LockupDynamic_v1_2_Transfer_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_2_CancelLockupStream_eventArgs = {
  readonly streamId: bigint; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly asset: Address_t; 
  readonly senderAmount: bigint; 
  readonly recipientAmount: bigint
};

export type SablierV2LockupDynamic_v1_2_CancelLockupStream_block = Block_t;

export type SablierV2LockupDynamic_v1_2_CancelLockupStream_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_2_CancelLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_2_CancelLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_2_CancelLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_2_CancelLockupStream_block
};

export type SablierV2LockupDynamic_v1_2_CancelLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_2_CancelLockupStream_event,loaderContext>;

export type SablierV2LockupDynamic_v1_2_CancelLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_2_CancelLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_2_CancelLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_2_CancelLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_2_CancelLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_2_CancelLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_2_CancelLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_2_CancelLockupStream_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_2_CancelLockupStream_eventFilter = {
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>; 
  readonly asset?: SingleOrMultiple_t<Address_t>
};

export type SablierV2LockupDynamic_v1_2_CancelLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_2_CancelLockupStream_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_2_CancelLockupStream_eventFilter
  | SablierV2LockupDynamic_v1_2_CancelLockupStream_eventFilter[];

export type SablierV2LockupDynamic_v1_2_CancelLockupStream_eventFilters = 
    SablierV2LockupDynamic_v1_2_CancelLockupStream_eventFilter
  | SablierV2LockupDynamic_v1_2_CancelLockupStream_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_2_CancelLockupStream_eventFiltersArgs) => SablierV2LockupDynamic_v1_2_CancelLockupStream_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventArgs = {
  readonly streamId: bigint; 
  readonly funder: Address_t; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly amounts: [bigint, bigint]; 
  readonly asset: Address_t; 
  readonly cancelable: boolean; 
  readonly transferable: boolean; 
  readonly segments: Array<[bigint, bigint, bigint]>; 
  readonly timestamps: [bigint, bigint]; 
  readonly broker: Address_t
};

export type SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_block = Block_t;

export type SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_block
};

export type SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_event,loaderContext>;

export type SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventFilter = {
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>; 
  readonly asset?: SingleOrMultiple_t<Address_t>
};

export type SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventFilter
  | SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventFilter[];

export type SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventFilters = 
    SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventFilter
  | SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventFiltersArgs) => SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventArgs = { readonly streamId: bigint };

export type SablierV2LockupDynamic_v1_2_RenounceLockupStream_block = Block_t;

export type SablierV2LockupDynamic_v1_2_RenounceLockupStream_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_2_RenounceLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_2_RenounceLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_2_RenounceLockupStream_block
};

export type SablierV2LockupDynamic_v1_2_RenounceLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_2_RenounceLockupStream_event,loaderContext>;

export type SablierV2LockupDynamic_v1_2_RenounceLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_2_RenounceLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_2_RenounceLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_2_RenounceLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_2_RenounceLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_2_RenounceLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_2_RenounceLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_2_RenounceLockupStream_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint> };

export type SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventFilter
  | SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventFilter[];

export type SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventFilters = 
    SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventFilter
  | SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventFiltersArgs) => SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventFiltersDefinition);

export type SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventArgs = {
  readonly streamId: bigint; 
  readonly to: Address_t; 
  readonly asset: Address_t; 
  readonly amount: bigint
};

export type SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_block = Block_t;

export type SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_transaction = Transaction_t;

export type SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupDynamic_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_block
};

export type SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_event,loaderContext>;

export type SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_event,contractRegistrations>>;

export type SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventFilter = {
  readonly streamId?: SingleOrMultiple_t<bigint>; 
  readonly to?: SingleOrMultiple_t<Address_t>; 
  readonly asset?: SingleOrMultiple_t<Address_t>
};

export type SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupDynamic_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventFiltersDefinition = 
    SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventFilter
  | SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventFilter[];

export type SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventFilters = 
    SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventFilter
  | SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventFilter[]
  | ((_1:SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventFiltersArgs) => SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_0_chainId = 
    1
  | 10
  | 56
  | 100
  | 137
  | 8453
  | 42161
  | 43114
  | 534352
  | 11155111;

export type SablierV2LockupLinear_v1_0_Approval_eventArgs = {
  readonly owner: Address_t; 
  readonly approved: Address_t; 
  readonly tokenId: bigint
};

export type SablierV2LockupLinear_v1_0_Approval_block = Block_t;

export type SablierV2LockupLinear_v1_0_Approval_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_0_Approval_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_0_Approval_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_0_Approval_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_0_Approval_block
};

export type SablierV2LockupLinear_v1_0_Approval_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_0_Approval_event,loaderContext>;

export type SablierV2LockupLinear_v1_0_Approval_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_0_Approval_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_0_Approval_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_0_Approval_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_0_Approval_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_0_Approval_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_0_Approval_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_0_Approval_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_0_Approval_eventFilter = {
  readonly owner?: SingleOrMultiple_t<Address_t>; 
  readonly approved?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierV2LockupLinear_v1_0_Approval_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_0_Approval_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_0_Approval_eventFilter
  | SablierV2LockupLinear_v1_0_Approval_eventFilter[];

export type SablierV2LockupLinear_v1_0_Approval_eventFilters = 
    SablierV2LockupLinear_v1_0_Approval_eventFilter
  | SablierV2LockupLinear_v1_0_Approval_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_0_Approval_eventFiltersArgs) => SablierV2LockupLinear_v1_0_Approval_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_0_ApprovalForAll_eventArgs = {
  readonly owner: Address_t; 
  readonly operator: Address_t; 
  readonly approved: boolean
};

export type SablierV2LockupLinear_v1_0_ApprovalForAll_block = Block_t;

export type SablierV2LockupLinear_v1_0_ApprovalForAll_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_0_ApprovalForAll_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_0_ApprovalForAll_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_0_ApprovalForAll_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_0_ApprovalForAll_block
};

export type SablierV2LockupLinear_v1_0_ApprovalForAll_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_0_ApprovalForAll_event,loaderContext>;

export type SablierV2LockupLinear_v1_0_ApprovalForAll_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_0_ApprovalForAll_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_0_ApprovalForAll_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_0_ApprovalForAll_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_0_ApprovalForAll_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_0_ApprovalForAll_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_0_ApprovalForAll_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_0_ApprovalForAll_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_0_ApprovalForAll_eventFilter = { readonly owner?: SingleOrMultiple_t<Address_t>; readonly operator?: SingleOrMultiple_t<Address_t> };

export type SablierV2LockupLinear_v1_0_ApprovalForAll_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_0_ApprovalForAll_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_0_ApprovalForAll_eventFilter
  | SablierV2LockupLinear_v1_0_ApprovalForAll_eventFilter[];

export type SablierV2LockupLinear_v1_0_ApprovalForAll_eventFilters = 
    SablierV2LockupLinear_v1_0_ApprovalForAll_eventFilter
  | SablierV2LockupLinear_v1_0_ApprovalForAll_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_0_ApprovalForAll_eventFiltersArgs) => SablierV2LockupLinear_v1_0_ApprovalForAll_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_0_Transfer_eventArgs = {
  readonly from: Address_t; 
  readonly to: Address_t; 
  readonly tokenId: bigint
};

export type SablierV2LockupLinear_v1_0_Transfer_block = Block_t;

export type SablierV2LockupLinear_v1_0_Transfer_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_0_Transfer_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_0_Transfer_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_0_Transfer_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_0_Transfer_block
};

export type SablierV2LockupLinear_v1_0_Transfer_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_0_Transfer_event,loaderContext>;

export type SablierV2LockupLinear_v1_0_Transfer_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_0_Transfer_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_0_Transfer_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_0_Transfer_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_0_Transfer_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_0_Transfer_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_0_Transfer_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_0_Transfer_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_0_Transfer_eventFilter = {
  readonly from?: SingleOrMultiple_t<Address_t>; 
  readonly to?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierV2LockupLinear_v1_0_Transfer_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_0_Transfer_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_0_Transfer_eventFilter
  | SablierV2LockupLinear_v1_0_Transfer_eventFilter[];

export type SablierV2LockupLinear_v1_0_Transfer_eventFilters = 
    SablierV2LockupLinear_v1_0_Transfer_eventFilter
  | SablierV2LockupLinear_v1_0_Transfer_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_0_Transfer_eventFiltersArgs) => SablierV2LockupLinear_v1_0_Transfer_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_0_CancelLockupStream_eventArgs = {
  readonly streamId: bigint; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly senderAmount: bigint; 
  readonly recipientAmount: bigint
};

export type SablierV2LockupLinear_v1_0_CancelLockupStream_block = Block_t;

export type SablierV2LockupLinear_v1_0_CancelLockupStream_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_0_CancelLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_0_CancelLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_0_CancelLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_0_CancelLockupStream_block
};

export type SablierV2LockupLinear_v1_0_CancelLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_0_CancelLockupStream_event,loaderContext>;

export type SablierV2LockupLinear_v1_0_CancelLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_0_CancelLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_0_CancelLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_0_CancelLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_0_CancelLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_0_CancelLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_0_CancelLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_0_CancelLockupStream_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_0_CancelLockupStream_eventFilter = {
  readonly streamId?: SingleOrMultiple_t<bigint>; 
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>
};

export type SablierV2LockupLinear_v1_0_CancelLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_0_CancelLockupStream_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_0_CancelLockupStream_eventFilter
  | SablierV2LockupLinear_v1_0_CancelLockupStream_eventFilter[];

export type SablierV2LockupLinear_v1_0_CancelLockupStream_eventFilters = 
    SablierV2LockupLinear_v1_0_CancelLockupStream_eventFilter
  | SablierV2LockupLinear_v1_0_CancelLockupStream_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_0_CancelLockupStream_eventFiltersArgs) => SablierV2LockupLinear_v1_0_CancelLockupStream_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventArgs = {
  readonly streamId: bigint; 
  readonly funder: Address_t; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly amounts: [bigint, bigint, bigint]; 
  readonly asset: Address_t; 
  readonly cancelable: boolean; 
  readonly range: [bigint, bigint, bigint]; 
  readonly broker: Address_t
};

export type SablierV2LockupLinear_v1_0_CreateLockupLinearStream_block = Block_t;

export type SablierV2LockupLinear_v1_0_CreateLockupLinearStream_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_0_CreateLockupLinearStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_0_CreateLockupLinearStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_0_CreateLockupLinearStream_block
};

export type SablierV2LockupLinear_v1_0_CreateLockupLinearStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_0_CreateLockupLinearStream_event,loaderContext>;

export type SablierV2LockupLinear_v1_0_CreateLockupLinearStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_0_CreateLockupLinearStream_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_0_CreateLockupLinearStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_0_CreateLockupLinearStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_0_CreateLockupLinearStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_0_CreateLockupLinearStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_0_CreateLockupLinearStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_0_CreateLockupLinearStream_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventFilter = {
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>; 
  readonly asset?: SingleOrMultiple_t<Address_t>
};

export type SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventFilter
  | SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventFilter[];

export type SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventFilters = 
    SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventFilter
  | SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventFiltersArgs) => SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_0_RenounceLockupStream_eventArgs = { readonly streamId: bigint };

export type SablierV2LockupLinear_v1_0_RenounceLockupStream_block = Block_t;

export type SablierV2LockupLinear_v1_0_RenounceLockupStream_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_0_RenounceLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_0_RenounceLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_0_RenounceLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_0_RenounceLockupStream_block
};

export type SablierV2LockupLinear_v1_0_RenounceLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_0_RenounceLockupStream_event,loaderContext>;

export type SablierV2LockupLinear_v1_0_RenounceLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_0_RenounceLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_0_RenounceLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_0_RenounceLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_0_RenounceLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_0_RenounceLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_0_RenounceLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_0_RenounceLockupStream_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_0_RenounceLockupStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint> };

export type SablierV2LockupLinear_v1_0_RenounceLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_0_RenounceLockupStream_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_0_RenounceLockupStream_eventFilter
  | SablierV2LockupLinear_v1_0_RenounceLockupStream_eventFilter[];

export type SablierV2LockupLinear_v1_0_RenounceLockupStream_eventFilters = 
    SablierV2LockupLinear_v1_0_RenounceLockupStream_eventFilter
  | SablierV2LockupLinear_v1_0_RenounceLockupStream_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_0_RenounceLockupStream_eventFiltersArgs) => SablierV2LockupLinear_v1_0_RenounceLockupStream_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventArgs = {
  readonly streamId: bigint; 
  readonly to: Address_t; 
  readonly amount: bigint
};

export type SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_block = Block_t;

export type SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_0_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_block
};

export type SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_event,loaderContext>;

export type SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint>; readonly to?: SingleOrMultiple_t<Address_t> };

export type SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_0_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventFilter
  | SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventFilter[];

export type SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventFilters = 
    SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventFilter
  | SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventFiltersArgs) => SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_1_chainId = 
    1
  | 10
  | 56
  | 100
  | 137
  | 324
  | 1890
  | 8453
  | 42161
  | 43114
  | 81457
  | 84532
  | 534352
  | 11155111;

export type SablierV2LockupLinear_v1_1_Approval_eventArgs = {
  readonly owner: Address_t; 
  readonly approved: Address_t; 
  readonly tokenId: bigint
};

export type SablierV2LockupLinear_v1_1_Approval_block = Block_t;

export type SablierV2LockupLinear_v1_1_Approval_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_1_Approval_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_1_Approval_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_1_Approval_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_1_Approval_block
};

export type SablierV2LockupLinear_v1_1_Approval_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_1_Approval_event,loaderContext>;

export type SablierV2LockupLinear_v1_1_Approval_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_1_Approval_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_1_Approval_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_1_Approval_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_1_Approval_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_1_Approval_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_1_Approval_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_1_Approval_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_1_Approval_eventFilter = {
  readonly owner?: SingleOrMultiple_t<Address_t>; 
  readonly approved?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierV2LockupLinear_v1_1_Approval_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_1_Approval_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_1_Approval_eventFilter
  | SablierV2LockupLinear_v1_1_Approval_eventFilter[];

export type SablierV2LockupLinear_v1_1_Approval_eventFilters = 
    SablierV2LockupLinear_v1_1_Approval_eventFilter
  | SablierV2LockupLinear_v1_1_Approval_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_1_Approval_eventFiltersArgs) => SablierV2LockupLinear_v1_1_Approval_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_1_ApprovalForAll_eventArgs = {
  readonly owner: Address_t; 
  readonly operator: Address_t; 
  readonly approved: boolean
};

export type SablierV2LockupLinear_v1_1_ApprovalForAll_block = Block_t;

export type SablierV2LockupLinear_v1_1_ApprovalForAll_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_1_ApprovalForAll_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_1_ApprovalForAll_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_1_ApprovalForAll_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_1_ApprovalForAll_block
};

export type SablierV2LockupLinear_v1_1_ApprovalForAll_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_1_ApprovalForAll_event,loaderContext>;

export type SablierV2LockupLinear_v1_1_ApprovalForAll_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_1_ApprovalForAll_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_1_ApprovalForAll_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_1_ApprovalForAll_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_1_ApprovalForAll_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_1_ApprovalForAll_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_1_ApprovalForAll_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_1_ApprovalForAll_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_1_ApprovalForAll_eventFilter = { readonly owner?: SingleOrMultiple_t<Address_t>; readonly operator?: SingleOrMultiple_t<Address_t> };

export type SablierV2LockupLinear_v1_1_ApprovalForAll_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_1_ApprovalForAll_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_1_ApprovalForAll_eventFilter
  | SablierV2LockupLinear_v1_1_ApprovalForAll_eventFilter[];

export type SablierV2LockupLinear_v1_1_ApprovalForAll_eventFilters = 
    SablierV2LockupLinear_v1_1_ApprovalForAll_eventFilter
  | SablierV2LockupLinear_v1_1_ApprovalForAll_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_1_ApprovalForAll_eventFiltersArgs) => SablierV2LockupLinear_v1_1_ApprovalForAll_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_1_Transfer_eventArgs = {
  readonly from: Address_t; 
  readonly to: Address_t; 
  readonly tokenId: bigint
};

export type SablierV2LockupLinear_v1_1_Transfer_block = Block_t;

export type SablierV2LockupLinear_v1_1_Transfer_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_1_Transfer_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_1_Transfer_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_1_Transfer_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_1_Transfer_block
};

export type SablierV2LockupLinear_v1_1_Transfer_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_1_Transfer_event,loaderContext>;

export type SablierV2LockupLinear_v1_1_Transfer_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_1_Transfer_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_1_Transfer_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_1_Transfer_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_1_Transfer_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_1_Transfer_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_1_Transfer_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_1_Transfer_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_1_Transfer_eventFilter = {
  readonly from?: SingleOrMultiple_t<Address_t>; 
  readonly to?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierV2LockupLinear_v1_1_Transfer_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_1_Transfer_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_1_Transfer_eventFilter
  | SablierV2LockupLinear_v1_1_Transfer_eventFilter[];

export type SablierV2LockupLinear_v1_1_Transfer_eventFilters = 
    SablierV2LockupLinear_v1_1_Transfer_eventFilter
  | SablierV2LockupLinear_v1_1_Transfer_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_1_Transfer_eventFiltersArgs) => SablierV2LockupLinear_v1_1_Transfer_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_1_CancelLockupStream_eventArgs = {
  readonly streamId: bigint; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly asset: Address_t; 
  readonly senderAmount: bigint; 
  readonly recipientAmount: bigint
};

export type SablierV2LockupLinear_v1_1_CancelLockupStream_block = Block_t;

export type SablierV2LockupLinear_v1_1_CancelLockupStream_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_1_CancelLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_1_CancelLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_1_CancelLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_1_CancelLockupStream_block
};

export type SablierV2LockupLinear_v1_1_CancelLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_1_CancelLockupStream_event,loaderContext>;

export type SablierV2LockupLinear_v1_1_CancelLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_1_CancelLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_1_CancelLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_1_CancelLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_1_CancelLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_1_CancelLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_1_CancelLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_1_CancelLockupStream_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_1_CancelLockupStream_eventFilter = {
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>; 
  readonly asset?: SingleOrMultiple_t<Address_t>
};

export type SablierV2LockupLinear_v1_1_CancelLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_1_CancelLockupStream_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_1_CancelLockupStream_eventFilter
  | SablierV2LockupLinear_v1_1_CancelLockupStream_eventFilter[];

export type SablierV2LockupLinear_v1_1_CancelLockupStream_eventFilters = 
    SablierV2LockupLinear_v1_1_CancelLockupStream_eventFilter
  | SablierV2LockupLinear_v1_1_CancelLockupStream_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_1_CancelLockupStream_eventFiltersArgs) => SablierV2LockupLinear_v1_1_CancelLockupStream_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventArgs = {
  readonly streamId: bigint; 
  readonly funder: Address_t; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly amounts: [bigint, bigint, bigint]; 
  readonly asset: Address_t; 
  readonly cancelable: boolean; 
  readonly transferable: boolean; 
  readonly range: [bigint, bigint, bigint]; 
  readonly broker: Address_t
};

export type SablierV2LockupLinear_v1_1_CreateLockupLinearStream_block = Block_t;

export type SablierV2LockupLinear_v1_1_CreateLockupLinearStream_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_1_CreateLockupLinearStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_1_CreateLockupLinearStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_1_CreateLockupLinearStream_block
};

export type SablierV2LockupLinear_v1_1_CreateLockupLinearStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_1_CreateLockupLinearStream_event,loaderContext>;

export type SablierV2LockupLinear_v1_1_CreateLockupLinearStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_1_CreateLockupLinearStream_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_1_CreateLockupLinearStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_1_CreateLockupLinearStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_1_CreateLockupLinearStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_1_CreateLockupLinearStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_1_CreateLockupLinearStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_1_CreateLockupLinearStream_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventFilter = {
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>; 
  readonly asset?: SingleOrMultiple_t<Address_t>
};

export type SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventFilter
  | SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventFilter[];

export type SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventFilters = 
    SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventFilter
  | SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventFiltersArgs) => SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_1_RenounceLockupStream_eventArgs = { readonly streamId: bigint };

export type SablierV2LockupLinear_v1_1_RenounceLockupStream_block = Block_t;

export type SablierV2LockupLinear_v1_1_RenounceLockupStream_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_1_RenounceLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_1_RenounceLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_1_RenounceLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_1_RenounceLockupStream_block
};

export type SablierV2LockupLinear_v1_1_RenounceLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_1_RenounceLockupStream_event,loaderContext>;

export type SablierV2LockupLinear_v1_1_RenounceLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_1_RenounceLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_1_RenounceLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_1_RenounceLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_1_RenounceLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_1_RenounceLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_1_RenounceLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_1_RenounceLockupStream_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_1_RenounceLockupStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint> };

export type SablierV2LockupLinear_v1_1_RenounceLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_1_RenounceLockupStream_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_1_RenounceLockupStream_eventFilter
  | SablierV2LockupLinear_v1_1_RenounceLockupStream_eventFilter[];

export type SablierV2LockupLinear_v1_1_RenounceLockupStream_eventFilters = 
    SablierV2LockupLinear_v1_1_RenounceLockupStream_eventFilter
  | SablierV2LockupLinear_v1_1_RenounceLockupStream_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_1_RenounceLockupStream_eventFiltersArgs) => SablierV2LockupLinear_v1_1_RenounceLockupStream_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventArgs = {
  readonly streamId: bigint; 
  readonly to: Address_t; 
  readonly asset: Address_t; 
  readonly amount: bigint
};

export type SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_block = Block_t;

export type SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_block
};

export type SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_event,loaderContext>;

export type SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventFilter = {
  readonly streamId?: SingleOrMultiple_t<bigint>; 
  readonly to?: SingleOrMultiple_t<Address_t>; 
  readonly asset?: SingleOrMultiple_t<Address_t>
};

export type SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventFilter
  | SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventFilter[];

export type SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventFilters = 
    SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventFilter
  | SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventFiltersArgs) => SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_2_chainId = 
    1
  | 10
  | 56
  | 100
  | 137
  | 324
  | 1890
  | 2741
  | 2818
  | 5330
  | 5845
  | 8453
  | 34443
  | 42161
  | 43114
  | 59144
  | 81457
  | 84532
  | 88888
  | 534352
  | 11155111;

export type SablierV2LockupLinear_v1_2_Approval_eventArgs = {
  readonly owner: Address_t; 
  readonly approved: Address_t; 
  readonly tokenId: bigint
};

export type SablierV2LockupLinear_v1_2_Approval_block = Block_t;

export type SablierV2LockupLinear_v1_2_Approval_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_2_Approval_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_2_Approval_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_2_Approval_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_2_Approval_block
};

export type SablierV2LockupLinear_v1_2_Approval_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_2_Approval_event,loaderContext>;

export type SablierV2LockupLinear_v1_2_Approval_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_2_Approval_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_2_Approval_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_2_Approval_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_2_Approval_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_2_Approval_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_2_Approval_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_2_Approval_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_2_Approval_eventFilter = {
  readonly owner?: SingleOrMultiple_t<Address_t>; 
  readonly approved?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierV2LockupLinear_v1_2_Approval_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_2_Approval_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_2_Approval_eventFilter
  | SablierV2LockupLinear_v1_2_Approval_eventFilter[];

export type SablierV2LockupLinear_v1_2_Approval_eventFilters = 
    SablierV2LockupLinear_v1_2_Approval_eventFilter
  | SablierV2LockupLinear_v1_2_Approval_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_2_Approval_eventFiltersArgs) => SablierV2LockupLinear_v1_2_Approval_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_2_ApprovalForAll_eventArgs = {
  readonly owner: Address_t; 
  readonly operator: Address_t; 
  readonly approved: boolean
};

export type SablierV2LockupLinear_v1_2_ApprovalForAll_block = Block_t;

export type SablierV2LockupLinear_v1_2_ApprovalForAll_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_2_ApprovalForAll_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_2_ApprovalForAll_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_2_ApprovalForAll_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_2_ApprovalForAll_block
};

export type SablierV2LockupLinear_v1_2_ApprovalForAll_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_2_ApprovalForAll_event,loaderContext>;

export type SablierV2LockupLinear_v1_2_ApprovalForAll_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_2_ApprovalForAll_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_2_ApprovalForAll_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_2_ApprovalForAll_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_2_ApprovalForAll_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_2_ApprovalForAll_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_2_ApprovalForAll_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_2_ApprovalForAll_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_2_ApprovalForAll_eventFilter = { readonly owner?: SingleOrMultiple_t<Address_t>; readonly operator?: SingleOrMultiple_t<Address_t> };

export type SablierV2LockupLinear_v1_2_ApprovalForAll_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_2_ApprovalForAll_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_2_ApprovalForAll_eventFilter
  | SablierV2LockupLinear_v1_2_ApprovalForAll_eventFilter[];

export type SablierV2LockupLinear_v1_2_ApprovalForAll_eventFilters = 
    SablierV2LockupLinear_v1_2_ApprovalForAll_eventFilter
  | SablierV2LockupLinear_v1_2_ApprovalForAll_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_2_ApprovalForAll_eventFiltersArgs) => SablierV2LockupLinear_v1_2_ApprovalForAll_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_2_Transfer_eventArgs = {
  readonly from: Address_t; 
  readonly to: Address_t; 
  readonly tokenId: bigint
};

export type SablierV2LockupLinear_v1_2_Transfer_block = Block_t;

export type SablierV2LockupLinear_v1_2_Transfer_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_2_Transfer_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_2_Transfer_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_2_Transfer_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_2_Transfer_block
};

export type SablierV2LockupLinear_v1_2_Transfer_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_2_Transfer_event,loaderContext>;

export type SablierV2LockupLinear_v1_2_Transfer_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_2_Transfer_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_2_Transfer_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_2_Transfer_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_2_Transfer_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_2_Transfer_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_2_Transfer_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_2_Transfer_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_2_Transfer_eventFilter = {
  readonly from?: SingleOrMultiple_t<Address_t>; 
  readonly to?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierV2LockupLinear_v1_2_Transfer_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_2_Transfer_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_2_Transfer_eventFilter
  | SablierV2LockupLinear_v1_2_Transfer_eventFilter[];

export type SablierV2LockupLinear_v1_2_Transfer_eventFilters = 
    SablierV2LockupLinear_v1_2_Transfer_eventFilter
  | SablierV2LockupLinear_v1_2_Transfer_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_2_Transfer_eventFiltersArgs) => SablierV2LockupLinear_v1_2_Transfer_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_2_CancelLockupStream_eventArgs = {
  readonly streamId: bigint; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly asset: Address_t; 
  readonly senderAmount: bigint; 
  readonly recipientAmount: bigint
};

export type SablierV2LockupLinear_v1_2_CancelLockupStream_block = Block_t;

export type SablierV2LockupLinear_v1_2_CancelLockupStream_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_2_CancelLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_2_CancelLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_2_CancelLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_2_CancelLockupStream_block
};

export type SablierV2LockupLinear_v1_2_CancelLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_2_CancelLockupStream_event,loaderContext>;

export type SablierV2LockupLinear_v1_2_CancelLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_2_CancelLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_2_CancelLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_2_CancelLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_2_CancelLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_2_CancelLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_2_CancelLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_2_CancelLockupStream_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_2_CancelLockupStream_eventFilter = {
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>; 
  readonly asset?: SingleOrMultiple_t<Address_t>
};

export type SablierV2LockupLinear_v1_2_CancelLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_2_CancelLockupStream_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_2_CancelLockupStream_eventFilter
  | SablierV2LockupLinear_v1_2_CancelLockupStream_eventFilter[];

export type SablierV2LockupLinear_v1_2_CancelLockupStream_eventFilters = 
    SablierV2LockupLinear_v1_2_CancelLockupStream_eventFilter
  | SablierV2LockupLinear_v1_2_CancelLockupStream_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_2_CancelLockupStream_eventFiltersArgs) => SablierV2LockupLinear_v1_2_CancelLockupStream_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventArgs = {
  readonly streamId: bigint; 
  readonly funder: Address_t; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly amounts: [bigint, bigint]; 
  readonly asset: Address_t; 
  readonly cancelable: boolean; 
  readonly transferable: boolean; 
  readonly timestamps: [bigint, bigint, bigint]; 
  readonly broker: Address_t
};

export type SablierV2LockupLinear_v1_2_CreateLockupLinearStream_block = Block_t;

export type SablierV2LockupLinear_v1_2_CreateLockupLinearStream_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_2_CreateLockupLinearStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_2_CreateLockupLinearStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_2_CreateLockupLinearStream_block
};

export type SablierV2LockupLinear_v1_2_CreateLockupLinearStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_2_CreateLockupLinearStream_event,loaderContext>;

export type SablierV2LockupLinear_v1_2_CreateLockupLinearStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_2_CreateLockupLinearStream_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_2_CreateLockupLinearStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_2_CreateLockupLinearStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_2_CreateLockupLinearStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_2_CreateLockupLinearStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_2_CreateLockupLinearStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_2_CreateLockupLinearStream_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventFilter = {
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>; 
  readonly asset?: SingleOrMultiple_t<Address_t>
};

export type SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventFilter
  | SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventFilter[];

export type SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventFilters = 
    SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventFilter
  | SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventFiltersArgs) => SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_2_RenounceLockupStream_eventArgs = { readonly streamId: bigint };

export type SablierV2LockupLinear_v1_2_RenounceLockupStream_block = Block_t;

export type SablierV2LockupLinear_v1_2_RenounceLockupStream_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_2_RenounceLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_2_RenounceLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_2_RenounceLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_2_RenounceLockupStream_block
};

export type SablierV2LockupLinear_v1_2_RenounceLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_2_RenounceLockupStream_event,loaderContext>;

export type SablierV2LockupLinear_v1_2_RenounceLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_2_RenounceLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_2_RenounceLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_2_RenounceLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_2_RenounceLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_2_RenounceLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_2_RenounceLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_2_RenounceLockupStream_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_2_RenounceLockupStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint> };

export type SablierV2LockupLinear_v1_2_RenounceLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_2_RenounceLockupStream_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_2_RenounceLockupStream_eventFilter
  | SablierV2LockupLinear_v1_2_RenounceLockupStream_eventFilter[];

export type SablierV2LockupLinear_v1_2_RenounceLockupStream_eventFilters = 
    SablierV2LockupLinear_v1_2_RenounceLockupStream_eventFilter
  | SablierV2LockupLinear_v1_2_RenounceLockupStream_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_2_RenounceLockupStream_eventFiltersArgs) => SablierV2LockupLinear_v1_2_RenounceLockupStream_eventFiltersDefinition);

export type SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventArgs = {
  readonly streamId: bigint; 
  readonly to: Address_t; 
  readonly asset: Address_t; 
  readonly amount: bigint
};

export type SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_block = Block_t;

export type SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_transaction = Transaction_t;

export type SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupLinear_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_block
};

export type SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_event,loaderContext>;

export type SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_event,contractRegistrations>>;

export type SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventFilter = {
  readonly streamId?: SingleOrMultiple_t<bigint>; 
  readonly to?: SingleOrMultiple_t<Address_t>; 
  readonly asset?: SingleOrMultiple_t<Address_t>
};

export type SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupLinear_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventFiltersDefinition = 
    SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventFilter
  | SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventFilter[];

export type SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventFilters = 
    SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventFilter
  | SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventFilter[]
  | ((_1:SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventFiltersArgs) => SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventFiltersDefinition);

export type SablierV2LockupTranched_v1_2_chainId = 
    1
  | 10
  | 56
  | 100
  | 137
  | 324
  | 1890
  | 2741
  | 2818
  | 5330
  | 5845
  | 8453
  | 34443
  | 42161
  | 43114
  | 59144
  | 81457
  | 84532
  | 88888
  | 534352
  | 11155111;

export type SablierV2LockupTranched_v1_2_Approval_eventArgs = {
  readonly owner: Address_t; 
  readonly approved: Address_t; 
  readonly tokenId: bigint
};

export type SablierV2LockupTranched_v1_2_Approval_block = Block_t;

export type SablierV2LockupTranched_v1_2_Approval_transaction = Transaction_t;

export type SablierV2LockupTranched_v1_2_Approval_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupTranched_v1_2_Approval_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupTranched_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupTranched_v1_2_Approval_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupTranched_v1_2_Approval_block
};

export type SablierV2LockupTranched_v1_2_Approval_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupTranched_v1_2_Approval_event,loaderContext>;

export type SablierV2LockupTranched_v1_2_Approval_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupTranched_v1_2_Approval_loaderArgs,loaderReturn>;

export type SablierV2LockupTranched_v1_2_Approval_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupTranched_v1_2_Approval_event,handlerContext,loaderReturn>;

export type SablierV2LockupTranched_v1_2_Approval_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupTranched_v1_2_Approval_handlerArgs<loaderReturn>>;

export type SablierV2LockupTranched_v1_2_Approval_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupTranched_v1_2_Approval_event,contractRegistrations>>;

export type SablierV2LockupTranched_v1_2_Approval_eventFilter = {
  readonly owner?: SingleOrMultiple_t<Address_t>; 
  readonly approved?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierV2LockupTranched_v1_2_Approval_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupTranched_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupTranched_v1_2_Approval_eventFiltersDefinition = 
    SablierV2LockupTranched_v1_2_Approval_eventFilter
  | SablierV2LockupTranched_v1_2_Approval_eventFilter[];

export type SablierV2LockupTranched_v1_2_Approval_eventFilters = 
    SablierV2LockupTranched_v1_2_Approval_eventFilter
  | SablierV2LockupTranched_v1_2_Approval_eventFilter[]
  | ((_1:SablierV2LockupTranched_v1_2_Approval_eventFiltersArgs) => SablierV2LockupTranched_v1_2_Approval_eventFiltersDefinition);

export type SablierV2LockupTranched_v1_2_ApprovalForAll_eventArgs = {
  readonly owner: Address_t; 
  readonly operator: Address_t; 
  readonly approved: boolean
};

export type SablierV2LockupTranched_v1_2_ApprovalForAll_block = Block_t;

export type SablierV2LockupTranched_v1_2_ApprovalForAll_transaction = Transaction_t;

export type SablierV2LockupTranched_v1_2_ApprovalForAll_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupTranched_v1_2_ApprovalForAll_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupTranched_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupTranched_v1_2_ApprovalForAll_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupTranched_v1_2_ApprovalForAll_block
};

export type SablierV2LockupTranched_v1_2_ApprovalForAll_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupTranched_v1_2_ApprovalForAll_event,loaderContext>;

export type SablierV2LockupTranched_v1_2_ApprovalForAll_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupTranched_v1_2_ApprovalForAll_loaderArgs,loaderReturn>;

export type SablierV2LockupTranched_v1_2_ApprovalForAll_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupTranched_v1_2_ApprovalForAll_event,handlerContext,loaderReturn>;

export type SablierV2LockupTranched_v1_2_ApprovalForAll_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupTranched_v1_2_ApprovalForAll_handlerArgs<loaderReturn>>;

export type SablierV2LockupTranched_v1_2_ApprovalForAll_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupTranched_v1_2_ApprovalForAll_event,contractRegistrations>>;

export type SablierV2LockupTranched_v1_2_ApprovalForAll_eventFilter = { readonly owner?: SingleOrMultiple_t<Address_t>; readonly operator?: SingleOrMultiple_t<Address_t> };

export type SablierV2LockupTranched_v1_2_ApprovalForAll_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupTranched_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupTranched_v1_2_ApprovalForAll_eventFiltersDefinition = 
    SablierV2LockupTranched_v1_2_ApprovalForAll_eventFilter
  | SablierV2LockupTranched_v1_2_ApprovalForAll_eventFilter[];

export type SablierV2LockupTranched_v1_2_ApprovalForAll_eventFilters = 
    SablierV2LockupTranched_v1_2_ApprovalForAll_eventFilter
  | SablierV2LockupTranched_v1_2_ApprovalForAll_eventFilter[]
  | ((_1:SablierV2LockupTranched_v1_2_ApprovalForAll_eventFiltersArgs) => SablierV2LockupTranched_v1_2_ApprovalForAll_eventFiltersDefinition);

export type SablierV2LockupTranched_v1_2_Transfer_eventArgs = {
  readonly from: Address_t; 
  readonly to: Address_t; 
  readonly tokenId: bigint
};

export type SablierV2LockupTranched_v1_2_Transfer_block = Block_t;

export type SablierV2LockupTranched_v1_2_Transfer_transaction = Transaction_t;

export type SablierV2LockupTranched_v1_2_Transfer_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupTranched_v1_2_Transfer_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupTranched_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupTranched_v1_2_Transfer_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupTranched_v1_2_Transfer_block
};

export type SablierV2LockupTranched_v1_2_Transfer_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupTranched_v1_2_Transfer_event,loaderContext>;

export type SablierV2LockupTranched_v1_2_Transfer_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupTranched_v1_2_Transfer_loaderArgs,loaderReturn>;

export type SablierV2LockupTranched_v1_2_Transfer_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupTranched_v1_2_Transfer_event,handlerContext,loaderReturn>;

export type SablierV2LockupTranched_v1_2_Transfer_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupTranched_v1_2_Transfer_handlerArgs<loaderReturn>>;

export type SablierV2LockupTranched_v1_2_Transfer_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupTranched_v1_2_Transfer_event,contractRegistrations>>;

export type SablierV2LockupTranched_v1_2_Transfer_eventFilter = {
  readonly from?: SingleOrMultiple_t<Address_t>; 
  readonly to?: SingleOrMultiple_t<Address_t>; 
  readonly tokenId?: SingleOrMultiple_t<bigint>
};

export type SablierV2LockupTranched_v1_2_Transfer_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupTranched_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupTranched_v1_2_Transfer_eventFiltersDefinition = 
    SablierV2LockupTranched_v1_2_Transfer_eventFilter
  | SablierV2LockupTranched_v1_2_Transfer_eventFilter[];

export type SablierV2LockupTranched_v1_2_Transfer_eventFilters = 
    SablierV2LockupTranched_v1_2_Transfer_eventFilter
  | SablierV2LockupTranched_v1_2_Transfer_eventFilter[]
  | ((_1:SablierV2LockupTranched_v1_2_Transfer_eventFiltersArgs) => SablierV2LockupTranched_v1_2_Transfer_eventFiltersDefinition);

export type SablierV2LockupTranched_v1_2_CancelLockupStream_eventArgs = {
  readonly streamId: bigint; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly asset: Address_t; 
  readonly senderAmount: bigint; 
  readonly recipientAmount: bigint
};

export type SablierV2LockupTranched_v1_2_CancelLockupStream_block = Block_t;

export type SablierV2LockupTranched_v1_2_CancelLockupStream_transaction = Transaction_t;

export type SablierV2LockupTranched_v1_2_CancelLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupTranched_v1_2_CancelLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupTranched_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupTranched_v1_2_CancelLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupTranched_v1_2_CancelLockupStream_block
};

export type SablierV2LockupTranched_v1_2_CancelLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupTranched_v1_2_CancelLockupStream_event,loaderContext>;

export type SablierV2LockupTranched_v1_2_CancelLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupTranched_v1_2_CancelLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupTranched_v1_2_CancelLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupTranched_v1_2_CancelLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupTranched_v1_2_CancelLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupTranched_v1_2_CancelLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupTranched_v1_2_CancelLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupTranched_v1_2_CancelLockupStream_event,contractRegistrations>>;

export type SablierV2LockupTranched_v1_2_CancelLockupStream_eventFilter = {
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>; 
  readonly asset?: SingleOrMultiple_t<Address_t>
};

export type SablierV2LockupTranched_v1_2_CancelLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupTranched_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupTranched_v1_2_CancelLockupStream_eventFiltersDefinition = 
    SablierV2LockupTranched_v1_2_CancelLockupStream_eventFilter
  | SablierV2LockupTranched_v1_2_CancelLockupStream_eventFilter[];

export type SablierV2LockupTranched_v1_2_CancelLockupStream_eventFilters = 
    SablierV2LockupTranched_v1_2_CancelLockupStream_eventFilter
  | SablierV2LockupTranched_v1_2_CancelLockupStream_eventFilter[]
  | ((_1:SablierV2LockupTranched_v1_2_CancelLockupStream_eventFiltersArgs) => SablierV2LockupTranched_v1_2_CancelLockupStream_eventFiltersDefinition);

export type SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventArgs = {
  readonly streamId: bigint; 
  readonly funder: Address_t; 
  readonly sender: Address_t; 
  readonly recipient: Address_t; 
  readonly amounts: [bigint, bigint]; 
  readonly asset: Address_t; 
  readonly cancelable: boolean; 
  readonly transferable: boolean; 
  readonly tranches: Array<[bigint, bigint]>; 
  readonly timestamps: [bigint, bigint]; 
  readonly broker: Address_t
};

export type SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_block = Block_t;

export type SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_transaction = Transaction_t;

export type SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupTranched_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_block
};

export type SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_event,loaderContext>;

export type SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_loaderArgs,loaderReturn>;

export type SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_event,contractRegistrations>>;

export type SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventFilter = {
  readonly sender?: SingleOrMultiple_t<Address_t>; 
  readonly recipient?: SingleOrMultiple_t<Address_t>; 
  readonly asset?: SingleOrMultiple_t<Address_t>
};

export type SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupTranched_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventFiltersDefinition = 
    SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventFilter
  | SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventFilter[];

export type SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventFilters = 
    SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventFilter
  | SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventFilter[]
  | ((_1:SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventFiltersArgs) => SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventFiltersDefinition);

export type SablierV2LockupTranched_v1_2_RenounceLockupStream_eventArgs = { readonly streamId: bigint };

export type SablierV2LockupTranched_v1_2_RenounceLockupStream_block = Block_t;

export type SablierV2LockupTranched_v1_2_RenounceLockupStream_transaction = Transaction_t;

export type SablierV2LockupTranched_v1_2_RenounceLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupTranched_v1_2_RenounceLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupTranched_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupTranched_v1_2_RenounceLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupTranched_v1_2_RenounceLockupStream_block
};

export type SablierV2LockupTranched_v1_2_RenounceLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupTranched_v1_2_RenounceLockupStream_event,loaderContext>;

export type SablierV2LockupTranched_v1_2_RenounceLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupTranched_v1_2_RenounceLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupTranched_v1_2_RenounceLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupTranched_v1_2_RenounceLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupTranched_v1_2_RenounceLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupTranched_v1_2_RenounceLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupTranched_v1_2_RenounceLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupTranched_v1_2_RenounceLockupStream_event,contractRegistrations>>;

export type SablierV2LockupTranched_v1_2_RenounceLockupStream_eventFilter = { readonly streamId?: SingleOrMultiple_t<bigint> };

export type SablierV2LockupTranched_v1_2_RenounceLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupTranched_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupTranched_v1_2_RenounceLockupStream_eventFiltersDefinition = 
    SablierV2LockupTranched_v1_2_RenounceLockupStream_eventFilter
  | SablierV2LockupTranched_v1_2_RenounceLockupStream_eventFilter[];

export type SablierV2LockupTranched_v1_2_RenounceLockupStream_eventFilters = 
    SablierV2LockupTranched_v1_2_RenounceLockupStream_eventFilter
  | SablierV2LockupTranched_v1_2_RenounceLockupStream_eventFilter[]
  | ((_1:SablierV2LockupTranched_v1_2_RenounceLockupStream_eventFiltersArgs) => SablierV2LockupTranched_v1_2_RenounceLockupStream_eventFiltersDefinition);

export type SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventArgs = {
  readonly streamId: bigint; 
  readonly to: Address_t; 
  readonly asset: Address_t; 
  readonly amount: bigint
};

export type SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_block = Block_t;

export type SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_transaction = Transaction_t;

export type SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2LockupTranched_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_block
};

export type SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_loaderArgs = Internal_genericLoaderArgs<SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_event,loaderContext>;

export type SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_loader<loaderReturn> = Internal_genericLoader<SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_loaderArgs,loaderReturn>;

export type SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_event,handlerContext,loaderReturn>;

export type SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_handler<loaderReturn> = Internal_genericHandler<SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_handlerArgs<loaderReturn>>;

export type SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_event,contractRegistrations>>;

export type SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventFilter = {
  readonly streamId?: SingleOrMultiple_t<bigint>; 
  readonly to?: SingleOrMultiple_t<Address_t>; 
  readonly asset?: SingleOrMultiple_t<Address_t>
};

export type SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2LockupTranched_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventFiltersDefinition = 
    SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventFilter
  | SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventFilter[];

export type SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventFilters = 
    SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventFilter
  | SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventFilter[]
  | ((_1:SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventFiltersArgs) => SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventFiltersDefinition);

export type SablierV2MerkleLL_v1_2_chainId = 
    1
  | 10
  | 56
  | 100
  | 137
  | 324
  | 1890
  | 2741
  | 2818
  | 5330
  | 5845
  | 8453
  | 34443
  | 42161
  | 43114
  | 59144
  | 81457
  | 84532
  | 88888
  | 534352
  | 11155111;

export type SablierV2MerkleLL_v1_2_TransferAdmin_eventArgs = { readonly oldAdmin: Address_t; readonly newAdmin: Address_t };

export type SablierV2MerkleLL_v1_2_TransferAdmin_block = Block_t;

export type SablierV2MerkleLL_v1_2_TransferAdmin_transaction = Transaction_t;

export type SablierV2MerkleLL_v1_2_TransferAdmin_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2MerkleLL_v1_2_TransferAdmin_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2MerkleLL_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2MerkleLL_v1_2_TransferAdmin_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2MerkleLL_v1_2_TransferAdmin_block
};

export type SablierV2MerkleLL_v1_2_TransferAdmin_loaderArgs = Internal_genericLoaderArgs<SablierV2MerkleLL_v1_2_TransferAdmin_event,loaderContext>;

export type SablierV2MerkleLL_v1_2_TransferAdmin_loader<loaderReturn> = Internal_genericLoader<SablierV2MerkleLL_v1_2_TransferAdmin_loaderArgs,loaderReturn>;

export type SablierV2MerkleLL_v1_2_TransferAdmin_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2MerkleLL_v1_2_TransferAdmin_event,handlerContext,loaderReturn>;

export type SablierV2MerkleLL_v1_2_TransferAdmin_handler<loaderReturn> = Internal_genericHandler<SablierV2MerkleLL_v1_2_TransferAdmin_handlerArgs<loaderReturn>>;

export type SablierV2MerkleLL_v1_2_TransferAdmin_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2MerkleLL_v1_2_TransferAdmin_event,contractRegistrations>>;

export type SablierV2MerkleLL_v1_2_TransferAdmin_eventFilter = { readonly oldAdmin?: SingleOrMultiple_t<Address_t>; readonly newAdmin?: SingleOrMultiple_t<Address_t> };

export type SablierV2MerkleLL_v1_2_TransferAdmin_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2MerkleLL_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2MerkleLL_v1_2_TransferAdmin_eventFiltersDefinition = 
    SablierV2MerkleLL_v1_2_TransferAdmin_eventFilter
  | SablierV2MerkleLL_v1_2_TransferAdmin_eventFilter[];

export type SablierV2MerkleLL_v1_2_TransferAdmin_eventFilters = 
    SablierV2MerkleLL_v1_2_TransferAdmin_eventFilter
  | SablierV2MerkleLL_v1_2_TransferAdmin_eventFilter[]
  | ((_1:SablierV2MerkleLL_v1_2_TransferAdmin_eventFiltersArgs) => SablierV2MerkleLL_v1_2_TransferAdmin_eventFiltersDefinition);

export type SablierV2MerkleLL_v1_2_Clawback_eventArgs = {
  readonly admin: Address_t; 
  readonly to: Address_t; 
  readonly amount: bigint
};

export type SablierV2MerkleLL_v1_2_Clawback_block = Block_t;

export type SablierV2MerkleLL_v1_2_Clawback_transaction = Transaction_t;

export type SablierV2MerkleLL_v1_2_Clawback_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2MerkleLL_v1_2_Clawback_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2MerkleLL_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2MerkleLL_v1_2_Clawback_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2MerkleLL_v1_2_Clawback_block
};

export type SablierV2MerkleLL_v1_2_Clawback_loaderArgs = Internal_genericLoaderArgs<SablierV2MerkleLL_v1_2_Clawback_event,loaderContext>;

export type SablierV2MerkleLL_v1_2_Clawback_loader<loaderReturn> = Internal_genericLoader<SablierV2MerkleLL_v1_2_Clawback_loaderArgs,loaderReturn>;

export type SablierV2MerkleLL_v1_2_Clawback_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2MerkleLL_v1_2_Clawback_event,handlerContext,loaderReturn>;

export type SablierV2MerkleLL_v1_2_Clawback_handler<loaderReturn> = Internal_genericHandler<SablierV2MerkleLL_v1_2_Clawback_handlerArgs<loaderReturn>>;

export type SablierV2MerkleLL_v1_2_Clawback_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2MerkleLL_v1_2_Clawback_event,contractRegistrations>>;

export type SablierV2MerkleLL_v1_2_Clawback_eventFilter = { readonly admin?: SingleOrMultiple_t<Address_t>; readonly to?: SingleOrMultiple_t<Address_t> };

export type SablierV2MerkleLL_v1_2_Clawback_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2MerkleLL_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2MerkleLL_v1_2_Clawback_eventFiltersDefinition = 
    SablierV2MerkleLL_v1_2_Clawback_eventFilter
  | SablierV2MerkleLL_v1_2_Clawback_eventFilter[];

export type SablierV2MerkleLL_v1_2_Clawback_eventFilters = 
    SablierV2MerkleLL_v1_2_Clawback_eventFilter
  | SablierV2MerkleLL_v1_2_Clawback_eventFilter[]
  | ((_1:SablierV2MerkleLL_v1_2_Clawback_eventFiltersArgs) => SablierV2MerkleLL_v1_2_Clawback_eventFiltersDefinition);

export type SablierV2MerkleLL_v1_2_Claim_eventArgs = {
  readonly index: bigint; 
  readonly recipient: Address_t; 
  readonly amount: bigint; 
  readonly streamId: bigint
};

export type SablierV2MerkleLL_v1_2_Claim_block = Block_t;

export type SablierV2MerkleLL_v1_2_Claim_transaction = Transaction_t;

export type SablierV2MerkleLL_v1_2_Claim_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2MerkleLL_v1_2_Claim_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2MerkleLL_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2MerkleLL_v1_2_Claim_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2MerkleLL_v1_2_Claim_block
};

export type SablierV2MerkleLL_v1_2_Claim_loaderArgs = Internal_genericLoaderArgs<SablierV2MerkleLL_v1_2_Claim_event,loaderContext>;

export type SablierV2MerkleLL_v1_2_Claim_loader<loaderReturn> = Internal_genericLoader<SablierV2MerkleLL_v1_2_Claim_loaderArgs,loaderReturn>;

export type SablierV2MerkleLL_v1_2_Claim_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2MerkleLL_v1_2_Claim_event,handlerContext,loaderReturn>;

export type SablierV2MerkleLL_v1_2_Claim_handler<loaderReturn> = Internal_genericHandler<SablierV2MerkleLL_v1_2_Claim_handlerArgs<loaderReturn>>;

export type SablierV2MerkleLL_v1_2_Claim_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2MerkleLL_v1_2_Claim_event,contractRegistrations>>;

export type SablierV2MerkleLL_v1_2_Claim_eventFilter = { readonly recipient?: SingleOrMultiple_t<Address_t>; readonly streamId?: SingleOrMultiple_t<bigint> };

export type SablierV2MerkleLL_v1_2_Claim_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2MerkleLL_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2MerkleLL_v1_2_Claim_eventFiltersDefinition = 
    SablierV2MerkleLL_v1_2_Claim_eventFilter
  | SablierV2MerkleLL_v1_2_Claim_eventFilter[];

export type SablierV2MerkleLL_v1_2_Claim_eventFilters = 
    SablierV2MerkleLL_v1_2_Claim_eventFilter
  | SablierV2MerkleLL_v1_2_Claim_eventFilter[]
  | ((_1:SablierV2MerkleLL_v1_2_Claim_eventFiltersArgs) => SablierV2MerkleLL_v1_2_Claim_eventFiltersDefinition);

export type SablierV2MerkleLT_v1_2_chainId = 
    1
  | 10
  | 56
  | 100
  | 137
  | 324
  | 1890
  | 2741
  | 2818
  | 5330
  | 5845
  | 8453
  | 34443
  | 42161
  | 43114
  | 59144
  | 81457
  | 84532
  | 88888
  | 534352
  | 11155111;

export type SablierV2MerkleLT_v1_2_TransferAdmin_eventArgs = { readonly oldAdmin: Address_t; readonly newAdmin: Address_t };

export type SablierV2MerkleLT_v1_2_TransferAdmin_block = Block_t;

export type SablierV2MerkleLT_v1_2_TransferAdmin_transaction = Transaction_t;

export type SablierV2MerkleLT_v1_2_TransferAdmin_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2MerkleLT_v1_2_TransferAdmin_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2MerkleLT_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2MerkleLT_v1_2_TransferAdmin_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2MerkleLT_v1_2_TransferAdmin_block
};

export type SablierV2MerkleLT_v1_2_TransferAdmin_loaderArgs = Internal_genericLoaderArgs<SablierV2MerkleLT_v1_2_TransferAdmin_event,loaderContext>;

export type SablierV2MerkleLT_v1_2_TransferAdmin_loader<loaderReturn> = Internal_genericLoader<SablierV2MerkleLT_v1_2_TransferAdmin_loaderArgs,loaderReturn>;

export type SablierV2MerkleLT_v1_2_TransferAdmin_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2MerkleLT_v1_2_TransferAdmin_event,handlerContext,loaderReturn>;

export type SablierV2MerkleLT_v1_2_TransferAdmin_handler<loaderReturn> = Internal_genericHandler<SablierV2MerkleLT_v1_2_TransferAdmin_handlerArgs<loaderReturn>>;

export type SablierV2MerkleLT_v1_2_TransferAdmin_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2MerkleLT_v1_2_TransferAdmin_event,contractRegistrations>>;

export type SablierV2MerkleLT_v1_2_TransferAdmin_eventFilter = { readonly oldAdmin?: SingleOrMultiple_t<Address_t>; readonly newAdmin?: SingleOrMultiple_t<Address_t> };

export type SablierV2MerkleLT_v1_2_TransferAdmin_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2MerkleLT_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2MerkleLT_v1_2_TransferAdmin_eventFiltersDefinition = 
    SablierV2MerkleLT_v1_2_TransferAdmin_eventFilter
  | SablierV2MerkleLT_v1_2_TransferAdmin_eventFilter[];

export type SablierV2MerkleLT_v1_2_TransferAdmin_eventFilters = 
    SablierV2MerkleLT_v1_2_TransferAdmin_eventFilter
  | SablierV2MerkleLT_v1_2_TransferAdmin_eventFilter[]
  | ((_1:SablierV2MerkleLT_v1_2_TransferAdmin_eventFiltersArgs) => SablierV2MerkleLT_v1_2_TransferAdmin_eventFiltersDefinition);

export type SablierV2MerkleLT_v1_2_Clawback_eventArgs = {
  readonly admin: Address_t; 
  readonly to: Address_t; 
  readonly amount: bigint
};

export type SablierV2MerkleLT_v1_2_Clawback_block = Block_t;

export type SablierV2MerkleLT_v1_2_Clawback_transaction = Transaction_t;

export type SablierV2MerkleLT_v1_2_Clawback_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2MerkleLT_v1_2_Clawback_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2MerkleLT_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2MerkleLT_v1_2_Clawback_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2MerkleLT_v1_2_Clawback_block
};

export type SablierV2MerkleLT_v1_2_Clawback_loaderArgs = Internal_genericLoaderArgs<SablierV2MerkleLT_v1_2_Clawback_event,loaderContext>;

export type SablierV2MerkleLT_v1_2_Clawback_loader<loaderReturn> = Internal_genericLoader<SablierV2MerkleLT_v1_2_Clawback_loaderArgs,loaderReturn>;

export type SablierV2MerkleLT_v1_2_Clawback_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2MerkleLT_v1_2_Clawback_event,handlerContext,loaderReturn>;

export type SablierV2MerkleLT_v1_2_Clawback_handler<loaderReturn> = Internal_genericHandler<SablierV2MerkleLT_v1_2_Clawback_handlerArgs<loaderReturn>>;

export type SablierV2MerkleLT_v1_2_Clawback_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2MerkleLT_v1_2_Clawback_event,contractRegistrations>>;

export type SablierV2MerkleLT_v1_2_Clawback_eventFilter = { readonly admin?: SingleOrMultiple_t<Address_t>; readonly to?: SingleOrMultiple_t<Address_t> };

export type SablierV2MerkleLT_v1_2_Clawback_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2MerkleLT_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2MerkleLT_v1_2_Clawback_eventFiltersDefinition = 
    SablierV2MerkleLT_v1_2_Clawback_eventFilter
  | SablierV2MerkleLT_v1_2_Clawback_eventFilter[];

export type SablierV2MerkleLT_v1_2_Clawback_eventFilters = 
    SablierV2MerkleLT_v1_2_Clawback_eventFilter
  | SablierV2MerkleLT_v1_2_Clawback_eventFilter[]
  | ((_1:SablierV2MerkleLT_v1_2_Clawback_eventFiltersArgs) => SablierV2MerkleLT_v1_2_Clawback_eventFiltersDefinition);

export type SablierV2MerkleLT_v1_2_Claim_eventArgs = {
  readonly index: bigint; 
  readonly recipient: Address_t; 
  readonly amount: bigint; 
  readonly streamId: bigint
};

export type SablierV2MerkleLT_v1_2_Claim_block = Block_t;

export type SablierV2MerkleLT_v1_2_Claim_transaction = Transaction_t;

export type SablierV2MerkleLT_v1_2_Claim_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2MerkleLT_v1_2_Claim_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2MerkleLT_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2MerkleLT_v1_2_Claim_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2MerkleLT_v1_2_Claim_block
};

export type SablierV2MerkleLT_v1_2_Claim_loaderArgs = Internal_genericLoaderArgs<SablierV2MerkleLT_v1_2_Claim_event,loaderContext>;

export type SablierV2MerkleLT_v1_2_Claim_loader<loaderReturn> = Internal_genericLoader<SablierV2MerkleLT_v1_2_Claim_loaderArgs,loaderReturn>;

export type SablierV2MerkleLT_v1_2_Claim_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2MerkleLT_v1_2_Claim_event,handlerContext,loaderReturn>;

export type SablierV2MerkleLT_v1_2_Claim_handler<loaderReturn> = Internal_genericHandler<SablierV2MerkleLT_v1_2_Claim_handlerArgs<loaderReturn>>;

export type SablierV2MerkleLT_v1_2_Claim_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2MerkleLT_v1_2_Claim_event,contractRegistrations>>;

export type SablierV2MerkleLT_v1_2_Claim_eventFilter = { readonly recipient?: SingleOrMultiple_t<Address_t>; readonly streamId?: SingleOrMultiple_t<bigint> };

export type SablierV2MerkleLT_v1_2_Claim_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2MerkleLT_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2MerkleLT_v1_2_Claim_eventFiltersDefinition = 
    SablierV2MerkleLT_v1_2_Claim_eventFilter
  | SablierV2MerkleLT_v1_2_Claim_eventFilter[];

export type SablierV2MerkleLT_v1_2_Claim_eventFilters = 
    SablierV2MerkleLT_v1_2_Claim_eventFilter
  | SablierV2MerkleLT_v1_2_Claim_eventFilter[]
  | ((_1:SablierV2MerkleLT_v1_2_Claim_eventFiltersArgs) => SablierV2MerkleLT_v1_2_Claim_eventFiltersDefinition);

export type SablierV2MerkleLockupFactory_v1_2_chainId = 
    1
  | 10
  | 56
  | 100
  | 137
  | 324
  | 1890
  | 2741
  | 2818
  | 5330
  | 5845
  | 8453
  | 34443
  | 42161
  | 43114
  | 59144
  | 81457
  | 84532
  | 88888
  | 534352
  | 11155111;

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventArgs = {
  readonly merkleLL: Address_t; 
  readonly baseParams: [Address_t, boolean, bigint, Address_t, string, string, string, boolean]; 
  readonly lockupLinear: Address_t; 
  readonly streamDurations: [bigint, bigint]; 
  readonly aggregateAmount: bigint; 
  readonly recipientCount: bigint
};

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_block = Block_t;

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_transaction = Transaction_t;

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2MerkleLockupFactory_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_block
};

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_loaderArgs = Internal_genericLoaderArgs<SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_event,loaderContext>;

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_loader<loaderReturn> = Internal_genericLoader<SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_loaderArgs,loaderReturn>;

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_event,handlerContext,loaderReturn>;

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_handler<loaderReturn> = Internal_genericHandler<SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_handlerArgs<loaderReturn>>;

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_event,contractRegistrations>>;

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventFilter = { readonly merkleLL?: SingleOrMultiple_t<Address_t> };

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2MerkleLockupFactory_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventFiltersDefinition = 
    SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventFilter
  | SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventFilter[];

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventFilters = 
    SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventFilter
  | SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventFilter[]
  | ((_1:SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventFiltersArgs) => SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventFiltersDefinition);

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventArgs = {
  readonly merkleLT: Address_t; 
  readonly baseParams: [Address_t, boolean, bigint, Address_t, string, string, string, boolean]; 
  readonly lockupTranched: Address_t; 
  readonly tranchesWithPercentages: Array<[bigint, bigint]>; 
  readonly totalDuration: bigint; 
  readonly aggregateAmount: bigint; 
  readonly recipientCount: bigint
};

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_block = Block_t;

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_transaction = Transaction_t;

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2MerkleLockupFactory_v1_2_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_block
};

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_loaderArgs = Internal_genericLoaderArgs<SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_event,loaderContext>;

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_loader<loaderReturn> = Internal_genericLoader<SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_loaderArgs,loaderReturn>;

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_event,handlerContext,loaderReturn>;

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_handler<loaderReturn> = Internal_genericHandler<SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_handlerArgs<loaderReturn>>;

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_event,contractRegistrations>>;

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventFilter = { readonly merkleLT?: SingleOrMultiple_t<Address_t> };

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2MerkleLockupFactory_v1_2_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventFiltersDefinition = 
    SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventFilter
  | SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventFilter[];

export type SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventFilters = 
    SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventFilter
  | SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventFilter[]
  | ((_1:SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventFiltersArgs) => SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventFiltersDefinition);

export type SablierV2MerkleStreamerFactory_v1_1_chainId = 
    1
  | 10
  | 56
  | 100
  | 137
  | 324
  | 1890
  | 8453
  | 42161
  | 43114
  | 81457
  | 84532
  | 534352
  | 11155111;

export type SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventArgs = {
  readonly merkleStreamer: Address_t; 
  readonly admin: Address_t; 
  readonly lockupLinear: Address_t; 
  readonly asset: Address_t; 
  readonly merkleRoot: string; 
  readonly expiration: bigint; 
  readonly streamDurations: [bigint, bigint]; 
  readonly cancelable: boolean; 
  readonly transferable: boolean; 
  readonly ipfsCID: string; 
  readonly aggregateAmount: bigint; 
  readonly recipientsCount: bigint
};

export type SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_block = Block_t;

export type SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_transaction = Transaction_t;

export type SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2MerkleStreamerFactory_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_block
};

export type SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_loaderArgs = Internal_genericLoaderArgs<SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_event,loaderContext>;

export type SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_loader<loaderReturn> = Internal_genericLoader<SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_loaderArgs,loaderReturn>;

export type SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_event,handlerContext,loaderReturn>;

export type SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_handler<loaderReturn> = Internal_genericHandler<SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_handlerArgs<loaderReturn>>;

export type SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_event,contractRegistrations>>;

export type SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventFilter = {
  readonly admin?: SingleOrMultiple_t<Address_t>; 
  readonly lockupLinear?: SingleOrMultiple_t<Address_t>; 
  readonly asset?: SingleOrMultiple_t<Address_t>
};

export type SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2MerkleStreamerFactory_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventFiltersDefinition = 
    SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventFilter
  | SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventFilter[];

export type SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventFilters = 
    SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventFilter
  | SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventFilter[]
  | ((_1:SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventFiltersArgs) => SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventFiltersDefinition);

export type SablierV2MerkleStreamerLL_v1_1_chainId = 
    1
  | 10
  | 56
  | 100
  | 137
  | 324
  | 1890
  | 8453
  | 42161
  | 43114
  | 81457
  | 84532
  | 534352
  | 11155111;

export type SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventArgs = { readonly oldAdmin: Address_t; readonly newAdmin: Address_t };

export type SablierV2MerkleStreamerLL_v1_1_TransferAdmin_block = Block_t;

export type SablierV2MerkleStreamerLL_v1_1_TransferAdmin_transaction = Transaction_t;

export type SablierV2MerkleStreamerLL_v1_1_TransferAdmin_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2MerkleStreamerLL_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2MerkleStreamerLL_v1_1_TransferAdmin_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2MerkleStreamerLL_v1_1_TransferAdmin_block
};

export type SablierV2MerkleStreamerLL_v1_1_TransferAdmin_loaderArgs = Internal_genericLoaderArgs<SablierV2MerkleStreamerLL_v1_1_TransferAdmin_event,loaderContext>;

export type SablierV2MerkleStreamerLL_v1_1_TransferAdmin_loader<loaderReturn> = Internal_genericLoader<SablierV2MerkleStreamerLL_v1_1_TransferAdmin_loaderArgs,loaderReturn>;

export type SablierV2MerkleStreamerLL_v1_1_TransferAdmin_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2MerkleStreamerLL_v1_1_TransferAdmin_event,handlerContext,loaderReturn>;

export type SablierV2MerkleStreamerLL_v1_1_TransferAdmin_handler<loaderReturn> = Internal_genericHandler<SablierV2MerkleStreamerLL_v1_1_TransferAdmin_handlerArgs<loaderReturn>>;

export type SablierV2MerkleStreamerLL_v1_1_TransferAdmin_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2MerkleStreamerLL_v1_1_TransferAdmin_event,contractRegistrations>>;

export type SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventFilter = { readonly oldAdmin?: SingleOrMultiple_t<Address_t>; readonly newAdmin?: SingleOrMultiple_t<Address_t> };

export type SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2MerkleStreamerLL_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventFiltersDefinition = 
    SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventFilter
  | SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventFilter[];

export type SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventFilters = 
    SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventFilter
  | SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventFilter[]
  | ((_1:SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventFiltersArgs) => SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventFiltersDefinition);

export type SablierV2MerkleStreamerLL_v1_1_Clawback_eventArgs = {
  readonly admin: Address_t; 
  readonly to: Address_t; 
  readonly amount: bigint
};

export type SablierV2MerkleStreamerLL_v1_1_Clawback_block = Block_t;

export type SablierV2MerkleStreamerLL_v1_1_Clawback_transaction = Transaction_t;

export type SablierV2MerkleStreamerLL_v1_1_Clawback_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2MerkleStreamerLL_v1_1_Clawback_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2MerkleStreamerLL_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2MerkleStreamerLL_v1_1_Clawback_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2MerkleStreamerLL_v1_1_Clawback_block
};

export type SablierV2MerkleStreamerLL_v1_1_Clawback_loaderArgs = Internal_genericLoaderArgs<SablierV2MerkleStreamerLL_v1_1_Clawback_event,loaderContext>;

export type SablierV2MerkleStreamerLL_v1_1_Clawback_loader<loaderReturn> = Internal_genericLoader<SablierV2MerkleStreamerLL_v1_1_Clawback_loaderArgs,loaderReturn>;

export type SablierV2MerkleStreamerLL_v1_1_Clawback_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2MerkleStreamerLL_v1_1_Clawback_event,handlerContext,loaderReturn>;

export type SablierV2MerkleStreamerLL_v1_1_Clawback_handler<loaderReturn> = Internal_genericHandler<SablierV2MerkleStreamerLL_v1_1_Clawback_handlerArgs<loaderReturn>>;

export type SablierV2MerkleStreamerLL_v1_1_Clawback_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2MerkleStreamerLL_v1_1_Clawback_event,contractRegistrations>>;

export type SablierV2MerkleStreamerLL_v1_1_Clawback_eventFilter = { readonly admin?: SingleOrMultiple_t<Address_t>; readonly to?: SingleOrMultiple_t<Address_t> };

export type SablierV2MerkleStreamerLL_v1_1_Clawback_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2MerkleStreamerLL_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2MerkleStreamerLL_v1_1_Clawback_eventFiltersDefinition = 
    SablierV2MerkleStreamerLL_v1_1_Clawback_eventFilter
  | SablierV2MerkleStreamerLL_v1_1_Clawback_eventFilter[];

export type SablierV2MerkleStreamerLL_v1_1_Clawback_eventFilters = 
    SablierV2MerkleStreamerLL_v1_1_Clawback_eventFilter
  | SablierV2MerkleStreamerLL_v1_1_Clawback_eventFilter[]
  | ((_1:SablierV2MerkleStreamerLL_v1_1_Clawback_eventFiltersArgs) => SablierV2MerkleStreamerLL_v1_1_Clawback_eventFiltersDefinition);

export type SablierV2MerkleStreamerLL_v1_1_Claim_eventArgs = {
  readonly index: bigint; 
  readonly recipient: Address_t; 
  readonly amount: bigint; 
  readonly streamId: bigint
};

export type SablierV2MerkleStreamerLL_v1_1_Claim_block = Block_t;

export type SablierV2MerkleStreamerLL_v1_1_Claim_transaction = Transaction_t;

export type SablierV2MerkleStreamerLL_v1_1_Claim_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: SablierV2MerkleStreamerLL_v1_1_Claim_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: SablierV2MerkleStreamerLL_v1_1_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: SablierV2MerkleStreamerLL_v1_1_Claim_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: SablierV2MerkleStreamerLL_v1_1_Claim_block
};

export type SablierV2MerkleStreamerLL_v1_1_Claim_loaderArgs = Internal_genericLoaderArgs<SablierV2MerkleStreamerLL_v1_1_Claim_event,loaderContext>;

export type SablierV2MerkleStreamerLL_v1_1_Claim_loader<loaderReturn> = Internal_genericLoader<SablierV2MerkleStreamerLL_v1_1_Claim_loaderArgs,loaderReturn>;

export type SablierV2MerkleStreamerLL_v1_1_Claim_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<SablierV2MerkleStreamerLL_v1_1_Claim_event,handlerContext,loaderReturn>;

export type SablierV2MerkleStreamerLL_v1_1_Claim_handler<loaderReturn> = Internal_genericHandler<SablierV2MerkleStreamerLL_v1_1_Claim_handlerArgs<loaderReturn>>;

export type SablierV2MerkleStreamerLL_v1_1_Claim_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<SablierV2MerkleStreamerLL_v1_1_Claim_event,contractRegistrations>>;

export type SablierV2MerkleStreamerLL_v1_1_Claim_eventFilter = { readonly recipient?: SingleOrMultiple_t<Address_t>; readonly streamId?: SingleOrMultiple_t<bigint> };

export type SablierV2MerkleStreamerLL_v1_1_Claim_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: SablierV2MerkleStreamerLL_v1_1_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type SablierV2MerkleStreamerLL_v1_1_Claim_eventFiltersDefinition = 
    SablierV2MerkleStreamerLL_v1_1_Claim_eventFilter
  | SablierV2MerkleStreamerLL_v1_1_Claim_eventFilter[];

export type SablierV2MerkleStreamerLL_v1_1_Claim_eventFilters = 
    SablierV2MerkleStreamerLL_v1_1_Claim_eventFilter
  | SablierV2MerkleStreamerLL_v1_1_Claim_eventFilter[]
  | ((_1:SablierV2MerkleStreamerLL_v1_1_Claim_eventFiltersArgs) => SablierV2MerkleStreamerLL_v1_1_Claim_eventFiltersDefinition);

export type chainId = number;
