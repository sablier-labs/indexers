import { CreateLockupDynamicStream } from "../../../bindings/SablierLockup_v3_0/SablierLockup";
import { convertSegmentsV3_0 } from "../../../helpers";
import { Store } from "../../../store";

export function handle_SablierLockup_v3_0_CreateLockupDynamicStream(event: CreateLockupDynamicStream): void {
  const params = event.params;
  const commonParams = params.commonParams;

  Store.Stream.createDynamic(
    event,
    {
      asset: commonParams.token,
      cancelable: commonParams.cancelable,
      category: "LockupDynamic",
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
      segments: convertSegmentsV3_0(event.params.segments),
    },
  );
}
