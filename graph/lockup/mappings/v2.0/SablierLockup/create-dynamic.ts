import { CreateLockupDynamicStream } from "../../../bindings/SablierLockup_v2_0/SablierLockup";
import { convertSegmentsV2_0 } from "../../../helpers";
import { Store } from "../../../store";

export function handle_SablierLockup_v2_0_CreateLockupDynamicStream(event: CreateLockupDynamicStream): void {
  const params = event.params;
  const commonParams = params.commonParams;

  Store.Stream.createDynamic(
    event,
    {
      asset: commonParams.token,
      cancelable: commonParams.cancelable,
      category: "LockupDynamic",
      depositAmount: commonParams.amounts.deposit,
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
      segments: convertSegmentsV2_0(event.params.segments),
    },
  );
}
