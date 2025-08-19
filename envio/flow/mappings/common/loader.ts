/**
 * @file Reusable Envio loaders
 * @see https://docs.envio.dev/docs/HyperIndex/loaders
 */
import { Id } from "../../../common/id";
import type {
  SablierFlow_v1_0_AdjustFlowStream_loaderArgs as AdjustArgs_v1_0,
  SablierFlow_v1_1_AdjustFlowStream_loaderArgs as AdjustArgs_v1_1,
  SablierFlow_v1_0_Approval_loaderArgs as ApprovalArgs_v1_0,
  SablierFlow_v1_1_Approval_loaderArgs as ApprovalArgs_v1_1,
  SablierFlow_v1_0_DepositFlowStream_loaderArgs as DepositArgs_v1_0,
  SablierFlow_v1_1_DepositFlowStream_loaderArgs as DepositArgs_v1_1,
  SablierFlow_v1_0_PauseFlowStream_loaderArgs as PauseArgs_v1_0,
  SablierFlow_v1_1_PauseFlowStream_loaderArgs as PauseArgs_v1_1,
  SablierFlow_v1_0_RefundFromFlowStream_loaderArgs as RefundArgs_v1_0,
  SablierFlow_v1_1_RefundFromFlowStream_loaderArgs as RefundArgs_v1_1,
  SablierFlow_v1_0_RestartFlowStream_loaderArgs as RestartArgs_v1_0,
  SablierFlow_v1_1_RestartFlowStream_loaderArgs as RestartArgs_v1_1,
  SablierFlow_v1_0_Transfer_loaderArgs as TransferArgs_v1_0,
  SablierFlow_v1_1_Transfer_loaderArgs as TransferArgs_v1_1,
  SablierFlow_v1_0_VoidFlowStream_loaderArgs as VoidArgs_v1_0,
  SablierFlow_v1_1_VoidFlowStream_loaderArgs as VoidArgs_v1_1,
  SablierFlow_v1_0_WithdrawFromFlowStream_loaderArgs as WithdrawArgs_v1_0,
  SablierFlow_v1_1_WithdrawFromFlowStream_loaderArgs as WithdrawArgs_v1_1,
} from "../../bindings/src/Types.gen";

export namespace Loader {
  type BaseArgs =
    | AdjustArgs_v1_0
    | AdjustArgs_v1_1
    | ApprovalArgs_v1_0
    | ApprovalArgs_v1_1
    | DepositArgs_v1_0
    | DepositArgs_v1_1
    | PauseArgs_v1_0
    | PauseArgs_v1_1
    | RefundArgs_v1_0
    | RefundArgs_v1_1
    | RestartArgs_v1_0
    | RestartArgs_v1_1
    | TransferArgs_v1_0
    | TransferArgs_v1_1
    | VoidArgs_v1_0
    | VoidArgs_v1_1
    | WithdrawArgs_v1_0
    | WithdrawArgs_v1_1;

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
}
