/**
 * @file Reusable Envio loaders
 * @see https://docs.envio.dev/docs/HyperIndex/loaders
 */

import { Version } from "sablier";
import type { Envio } from "../../../common/bindings";
import { Effects } from "../../../common/effects";
import { Id } from "../../../common/id";
import type { RPCData } from "../../../common/types";
import type { Context } from "../../bindings";
import type {
  SablierV2LockupLinear_v1_0_Approval_loaderArgs as ApprovalArgs_v1_0,
  SablierV2LockupLinear_v1_1_Approval_loaderArgs as ApprovalArgs_v1_1,
  SablierV2LockupLinear_v1_2_Approval_loaderArgs as ApprovalArgs_v1_2,
  SablierLockup_v2_0_Approval_loaderArgs as ApprovalArgs_v2_0,
  SablierV2LockupLinear_v1_0_CancelLockupStream_loaderArgs as CancelArgs_v1_0,
  SablierV2LockupLinear_v1_1_CancelLockupStream_loaderArgs as CancelArgs_v1_1_to_v2_0,
  SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_loaderArgs as CreateDynamicArgs_v1_0,
  SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_loaderArgs as CreateDynamicArgs_v1_1,
  SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_loaderArgs as CreateDynamicArgs_v1_2,
  SablierLockup_v2_0_CreateLockupDynamicStream_loaderArgs as CreateDynamicArgs_v2_0,
  SablierV2LockupLinear_v1_0_CreateLockupLinearStream_loaderArgs as CreateLinearArgs_v1_0,
  SablierV2LockupLinear_v1_1_CreateLockupLinearStream_loaderArgs as CreateLinearArgs_v1_1,
  SablierV2LockupLinear_v1_2_CreateLockupLinearStream_loaderArgs as CreateLinearArgs_v1_2,
  SablierLockup_v2_0_CreateLockupLinearStream_loaderArgs as CreateLinearArgs_v2_0,
  SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_loaderArgs as CreateTranchedArgs_v1_2,
  SablierLockup_v2_0_CreateLockupTranchedStream_loaderArgs as CreateTranchedArgs_v2_0,
  SablierV2LockupLinear_v1_0_RenounceLockupStream_loaderArgs as RenounceArgs_v1_0,
  SablierV2LockupLinear_v1_1_RenounceLockupStream_loaderArgs as RenounceArgs_v1_1,
  SablierV2LockupLinear_v1_2_RenounceLockupStream_loaderArgs as RenounceArgs_v1_2,
  SablierLockup_v2_0_RenounceLockupStream_loaderArgs as RenounceArgs_v2_0,
  SablierV2LockupLinear_v1_0_Transfer_loaderArgs as TransferArgs_v1_0,
  SablierV2LockupLinear_v1_1_Transfer_loaderArgs as TransferArgs_v1_1,
  SablierV2LockupLinear_v1_2_Transfer_loaderArgs as TransferArgs_v1_2,
  SablierLockup_v2_0_Transfer_loaderArgs as TransferArgs_v2_0,
  SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_loaderArgs as WithdrawArgs_v1_0,
  SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_loaderArgs as WithdrawArgs_v1_1_to_v2_0,
} from "../../bindings/src/Types.gen";

export namespace Loader {
  /* -------------------------------------------------------------------------- */
  /*                                    BASE                                    */
  /* -------------------------------------------------------------------------- */

  type BaseArgs =
    | ApprovalArgs_v1_0
    | ApprovalArgs_v1_1
    | ApprovalArgs_v1_2
    | ApprovalArgs_v2_0
    | CancelArgs_v1_0
    | CancelArgs_v1_1_to_v2_0
    | RenounceArgs_v1_0
    | RenounceArgs_v1_1
    | RenounceArgs_v1_2
    | RenounceArgs_v2_0
    | TransferArgs_v1_0
    | TransferArgs_v1_1
    | TransferArgs_v1_2
    | TransferArgs_v2_0
    | WithdrawArgs_v1_0
    | WithdrawArgs_v1_1_to_v2_0;

  export type BaseReturn = Awaited<ReturnType<typeof base>>;

  // Define base loader without explicit return type to let TypeScript infer it
  export const base = async ({ context, event }: BaseArgs) => {
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

  type EventParams = {
    asset: Envio.Address;
    funder: Envio.Address;
    recipient: Envio.Address;
    sender: Envio.Address;
  };

  // Define loaderForCreate without explicit return type to let TypeScript infer it
  async function loaderForCreate(context: Context.Loader, event: Envio.Event, params: EventParams) {
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

  export type CreateReturn = Awaited<ReturnType<typeof loaderForCreate>>;

  type CreateArgsV1_0 = CreateDynamicArgs_v1_0 | CreateLinearArgs_v1_0;
  const createV1_0 = async ({ context, event }: CreateArgsV1_0) => {
    return loaderForCreate(context, event, event.params);
  };

  type CreateArgsV1_1 = CreateDynamicArgs_v1_1 | CreateLinearArgs_v1_1;
  const createV1_1 = async ({ context, event }: CreateArgsV1_1) => {
    return loaderForCreate(context, event, event.params);
  };

  type CreateArgsV1_2 = CreateDynamicArgs_v1_2 | CreateLinearArgs_v1_2 | CreateTranchedArgs_v1_2;
  const createV1_2 = async ({ context, event }: CreateArgsV1_2) => {
    return loaderForCreate(context, event, event.params);
  };

  /**
   * @see {@link: file://./../v2.0/SablierLockup/create-linear.ts}
   */
  type CreateArgsV2_0 = CreateDynamicArgs_v2_0 | CreateLinearArgs_v2_0 | CreateTranchedArgs_v2_0;

  const createV2_0 = async ({ context, event }: CreateArgsV2_0) => {
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
