/**
 * @file Reusable Envio loaders
 * @see https://docs.envio.dev/docs/HyperIndex/loaders
 */

import { Version } from "sablier";
import type { Envio } from "../../../common/bindings";
import { Effects } from "../../../common/effects";
import { Id } from "../../../common/id";
import type { RPCData } from "../../../common/types";
import type { Context, Entity } from "../../bindings";
import type {
  SablierV2LockupLinear_v1_0_Approval_loader as Approval_v1_0,
  SablierV2LockupLinear_v1_1_Approval_loader as Approval_v1_1,
  SablierV2LockupLinear_v1_2_Approval_loader as Approval_v1_2,
  SablierLockup_v2_0_Approval_loader as Approval_v2_0,
  SablierV2LockupLinear_v1_0_CancelLockupStream_loader as Cancel_v1_0,
  SablierV2LockupLinear_v1_1_CancelLockupStream_loader as Cancel_v1_1_to_v2_0,
  SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_loader as CreateDynamic_v1_0,
  SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_loader as CreateDynamic_v1_1,
  SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_loader as CreateDynamic_v1_2,
  SablierLockup_v2_0_CreateLockupDynamicStream_loader as CreateDynamic_v2_0,
  SablierV2LockupLinear_v1_0_CreateLockupLinearStream_loader as CreateLinear_v1_0,
  SablierV2LockupLinear_v1_1_CreateLockupLinearStream_loader as CreateLinear_v1_1,
  SablierV2LockupLinear_v1_2_CreateLockupLinearStream_loader as CreateLinear_v1_2,
  SablierLockup_v2_0_CreateLockupLinearStream_loader as CreateLinear_v2_0,
  SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_loader as CreateTranched_v1_2,
  SablierLockup_v2_0_CreateLockupTranchedStream_loader as CreateTranched_v2_0,
  SablierV2LockupLinear_v1_0_RenounceLockupStream_loader as Renounce_v1_0,
  SablierV2LockupLinear_v1_1_RenounceLockupStream_loader as Renounce_v1_1,
  SablierV2LockupLinear_v1_2_RenounceLockupStream_loader as Renounce_v1_2,
  SablierLockup_v2_0_RenounceLockupStream_loader as Renounce_v2_0,
  SablierV2LockupLinear_v1_0_Transfer_loader as Transfer_v1_0,
  SablierV2LockupLinear_v1_1_Transfer_loader as Transfer_v1_1,
  SablierV2LockupLinear_v1_2_Transfer_loader as Transfer_v1_2,
  SablierLockup_v2_0_Transfer_loader as Transfer_v2_0,
  SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_loader as Withdraw_v1_0,
  SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_loader as Withdraw_v1_1_to_v2_0,
} from "../../bindings/src/Types.gen";

export namespace Loader {
  /* -------------------------------------------------------------------------- */
  /*                                    BASE                                    */
  /* -------------------------------------------------------------------------- */

  type Base<T> = Approval_v1_0<T> &
    Approval_v1_1<T> &
    Approval_v1_2<T> &
    Approval_v2_0<T> &
    Cancel_v1_0<T> &
    Cancel_v1_1_to_v2_0<T> &
    Renounce_v1_0<T> &
    Renounce_v1_1<T> &
    Renounce_v1_2<T> &
    Renounce_v2_0<T> &
    Transfer_v1_0<T> &
    Transfer_v1_1<T> &
    Transfer_v1_2<T> &
    Transfer_v2_0<T> &
    Withdraw_v1_0<T> &
    Withdraw_v1_1_to_v2_0<T>;

  export type BaseReturn = {
    stream: Entity.Stream;
    users: {
      caller?: Entity.User; // event.transaction.from, same as tx.origin
      sender?: Entity.User; // msg.sender
    };
    watcher: Entity.Watcher;
  };

  export const base: Base<BaseReturn> = async ({ context, event }): Promise<BaseReturn> => {
    let tokenId: bigint | undefined;
    if ("streamId" in event.params) {
      tokenId = event.params.streamId;
    } else if ("tokenId" in event.params) {
      tokenId = event.params.tokenId;
    } else {
      throw new Error("Neither tokenId nor streamId found in event params");
    }
    const streamId = Id.stream(event.srcAddress, event.chainId, tokenId);
    const watcherId = event.chainId.toString();

    const [stream, watcher] = await Promise.all([
      context.Stream.getOrThrow(streamId),
      context.Watcher.getOrThrow(watcherId),
    ]);

    const [caller, sender] = await Promise.all([
      context.User.get(Id.user(event.chainId, event.transaction.from)),
      context.User.get(Id.user(event.chainId, stream.sender)),
    ]);

    return {
      stream,
      users: { caller, sender },
      watcher,
    };
  };

  /* -------------------------------------------------------------------------- */
  /*                                   CREATE                                   */
  /* -------------------------------------------------------------------------- */

  export type CreateReturn = {
    entities: {
      asset?: Entity.Asset;
      batch?: Entity.Batch;
      batcher?: Entity.Batcher;
      users: {
        caller?: Entity.User;
        funder?: Entity.User;
        recipient?: Entity.User;
        sender?: Entity.User;
      };
      watcher?: Entity.Watcher;
    };
    rpcData: {
      assetMetadata: RPCData.ERC20Metadata;
      proxender?: Envio.Address;
    };
  };

  type EventParams = {
    asset: Envio.Address;
    funder: Envio.Address;
    recipient: Envio.Address;
    sender: Envio.Address;
  };

  async function loaderForCreate(
    context: Context.Loader,
    event: Envio.Event,
    params: EventParams,
  ): Promise<CreateReturn> {
    const assetId = Id.asset(event.chainId, params.asset);
    const batchId = Id.batch(event, params.sender);
    const batcherId = Id.batcher(event.chainId, params.sender);
    const watcherId = event.chainId.toString();

    const [asset, batch, batcher, watcher] = await Promise.all([
      context.Asset.get(assetId),
      context.Batch.get(batchId),
      context.Batcher.get(batcherId),
      context.Watcher.get(watcherId),
    ]);
    const [caller, funder, recipient, sender] = await Promise.all([
      context.User.get(Id.user(event.chainId, event.transaction.from)),
      context.User.get(Id.user(event.chainId, params.funder)),
      context.User.get(Id.user(event.chainId, params.recipient)),
      context.User.get(Id.user(event.chainId, params.sender)),
    ]);

    let assetMetadata: RPCData.ERC20Metadata;
    if (asset) {
      assetMetadata = {
        decimals: Number(asset.decimals),
        name: asset.name,
        symbol: asset.symbol,
      };
    } else {
      assetMetadata = await context.effect(Effects.TokenMetadata.readOrFetchMetadata, {
        address: params.asset,
        chainId: event.chainId,
      });
    }

    const proxender = await context.effect(Effects.Proxender.readOrFetchProxender, {
      chainId: event.chainId,
      lockupAddress: event.srcAddress,
      streamSender: params.sender,
    });

    return {
      entities: {
        asset,
        batch,
        batcher,
        users: {
          caller,
          funder,
          recipient,
          sender,
        },
        watcher,
      },
      rpcData: {
        assetMetadata,
        proxender,
      },
    };
  }

  type CreateV1_0<T> = CreateDynamic_v1_0<T> & CreateLinear_v1_0<T>;
  const createV1_0: CreateV1_0<CreateReturn> = async ({ context, event }): Promise<CreateReturn> => {
    return loaderForCreate(context, event, event.params);
  };

  type CreateV1_1<T> = CreateDynamic_v1_1<T> & CreateLinear_v1_1<T>;
  const createV1_1: CreateV1_1<CreateReturn> = async ({ context, event }): Promise<CreateReturn> => {
    return loaderForCreate(context, event, event.params);
  };

  type CreateV1_2<T> = CreateDynamic_v1_2<T> & CreateLinear_v1_2<T> & CreateTranched_v1_2<T>;
  const createV1_2: CreateV1_2<CreateReturn> = async ({ context, event }): Promise<CreateReturn> => {
    return loaderForCreate(context, event, event.params);
  };

  /**
   * @see {@link: file://./../v2.0/SablierLockup/create-linear.ts}
   */
  type CreateV2_0<T> = CreateDynamic_v2_0<T> & CreateLinear_v2_0<T> & CreateTranched_v2_0<T>;
  const createV2_0: CreateV2_0<CreateReturn> = async ({ context, event }): Promise<CreateReturn> => {
    return loaderForCreate(context, event, {
      asset: event.params.commonParams[4],
      funder: event.params.commonParams[0],
      recipient: event.params.commonParams[2],
      sender: event.params.commonParams[1],
    });
  };

  export const create = {
    [Version.Lockup.V1_0]: createV1_0,
    [Version.Lockup.V1_1]: createV1_1,
    [Version.Lockup.V1_2]: createV1_2,
    [Version.Lockup.V2_0]: createV2_0,
  };
}
