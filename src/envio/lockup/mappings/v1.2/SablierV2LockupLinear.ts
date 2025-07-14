import { Contract } from "../../bindings";
import { type Params } from "../../helpers/types";
import { approval, approvalForAll, cancelStream, renounceStream, transfer, withdrawStream } from "../common";
import { createLinearStream } from "../common/create-stream";
import { Loader } from "../common/loader";

Contract.LockupLinear_v1_2.ApprovalForAll.handlerWithLoader(approvalForAll);
Contract.LockupLinear_v1_2.Approval.handlerWithLoader(approval);
Contract.LockupLinear_v1_2.CancelLockupStream.handlerWithLoader(cancelStream);
Contract.LockupLinear_v1_2.RenounceLockupStream.handlerWithLoader(renounceStream);
Contract.LockupLinear_v1_2.Transfer.handlerWithLoader(transfer);
Contract.LockupLinear_v1_2.WithdrawFromLockupStream.handlerWithLoader(withdrawStream);

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/lockup/blob/v1.2/src/types/DataTypes.sol
https://github.com/sablier-labs/lockup/blob/v1.2/src/interfaces/ISablierV2LockupLinear.sol#L29-L40
──────────────────────────────────────────────────────────────

struct Timestamps {
    uint40 start; [0]
    uint40 cliff; [1]
    uint40 end;   [2]
}

event CreateLockupLinearStream(
    uint256 streamId,
    address funder,
    address indexed sender,
    address indexed recipient,
    Lockup.CreateAmounts amounts,
    IERC20 indexed asset,
    bool cancelable,
    bool transferable,
    LockupLinear.Timestamps timestamps,
    address broker
);
──────────────────────────────────────────────────────────────
*/
Contract.LockupLinear_v1_2.CreateLockupLinearStream.handlerWithLoader({
  handler: async ({ context, event, loaderReturn }) => {
    const params: Params.CreateStreamLinear = {
      asset: event.params.asset,
      cancelable: event.params.cancelable,
      category: "LockupLinear",
      cliffTime: event.params.timestamps[1],
      depositAmount: event.params.amounts[0],
      endTime: event.params.timestamps[2],
      funder: event.params.funder,
      recipient: event.params.recipient,
      sender: event.params.sender,
      startTime: event.params.timestamps[0],
      tokenId: event.params.streamId,
      transferable: event.params.transferable,
    };
    await createLinearStream({
      context,
      event,
      loaderReturn,
      params,
    });
  },
  loader: Loader.create["v1.2"],
});
