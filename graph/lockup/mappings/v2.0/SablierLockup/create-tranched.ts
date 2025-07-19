import { CreateLockupTranchedStream } from "../../../bindings/SablierLockup_v2_0/SablierLockup";
import { convertTranchesV2_0 } from "../../../helpers";
import { Store } from "../../../store";

export function handle_SablierLockup_v2_0_CreateLockupTranchedStream(event: CreateLockupTranchedStream): void {
  const params = event.params;
  const commonParams = params.commonParams;

  Store.Stream.createTranched(
    event,
    {
      asset: commonParams.token,
      cancelable: commonParams.cancelable,
      category: "LockupTranched",
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
      tranches: convertTranchesV2_0(params.tranches),
    },
  );
}
