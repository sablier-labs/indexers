import { CreateLockupLinearStream } from "../../../bindings/SablierLockup_v3_0/SablierLockup";
import { Store } from "../../../store";

export function handle_SablierLockup_v3_0_CreateLockupLinearStream(
  event: CreateLockupLinearStream
): void {
  const params = event.params;
  const commonParams = params.commonParams;

  Store.Stream.createLinear(
    event,
    {
      asset: commonParams.token,
      cancelable: commonParams.cancelable,
      category: "LockupLinear",
      depositAmount: commonParams.depositAmount,
      endTime: commonParams.timestamps.end,
      funder: commonParams.funder,
      recipient: commonParams.recipient,
      sender: commonParams.sender,
      shape: commonParams.shape,
      startTime: commonParams.timestamps.start,
      streamId: params.streamId,
      transferable: commonParams.transferable,
    },
    {
      cliffTime: params.cliffTime,
      unlockAmountCliff: params.unlockAmounts.cliff,
      unlockAmountStart: params.unlockAmounts.start,
    }
  );
}
