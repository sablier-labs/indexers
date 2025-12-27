import { Contract } from "../../bindings";
import { convertTranches } from "../../helpers";
import type { Params } from "../../helpers/types";
import { Store } from "../../store";
import {
  approval,
  approvalForAll,
  cancelStream,
  renounceStream,
  transfer,
  withdrawStream,
} from "../common";
import { createStream } from "../common/create-stream";
import { preloadCreateEntities } from "../common/preload";

Contract.LockupTranched_v1_2.ApprovalForAll.handler(approvalForAll.handler);
Contract.LockupTranched_v1_2.Approval.handler(approval.handler);
Contract.LockupTranched_v1_2.CancelLockupStream.handler(cancelStream.handler);
Contract.LockupTranched_v1_2.RenounceLockupStream.handler(renounceStream.handler);
Contract.LockupTranched_v1_2.Transfer.handler(transfer.handler);
Contract.LockupTranched_v1_2.WithdrawFromLockupStream.handler(withdrawStream.handler);

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/lockup/blob/v1.2/src/types/DataTypes.sol
https://github.com/sablier-labs/lockup/blob/v1.2/src/interfaces/ISablierV2LockupTranched.sol#L29-L41

──────────────────────────────────────────────────────────────

struct Timestamps {
    uint40 start; [0]
    uint40 end;   [1]
}
struct Tranche {
    uint128 amount;   [0]
    uint40 timestamp; [1]
}

event CreateLockupTranchedStream(
    uint256 streamId,
    address funder,
    address indexed sender,
    address indexed recipient,
    Lockup.CreateAmounts amounts,
    IERC20 indexed asset,
    bool cancelable,
    bool transferable,
    LockupTranched.Tranche[] tranches,
    LockupTranched.Timestamps timestamps,
    address broker
);

──────────────────────────────────────────────────────────────
*/
Contract.LockupTranched_v1_2.CreateLockupTranchedStream.handler(async ({ context, event }) => {
  const result = await preloadCreateEntities({ context, event, params: event.params });
  if (!result) {
    return;
  }
  const { entities, proxender } = result;

  const streamParams: Params.CreateStreamTranched = {
    asset: event.params.asset,
    cancelable: event.params.cancelable,
    category: "LockupTranched",
    depositAmount: event.params.amounts[0],
    endTime: event.params.timestamps[1],
    funder: event.params.funder,
    proxender,
    recipient: event.params.recipient,
    sender: event.params.sender,
    startTime: event.params.timestamps[0],
    tokenId: event.params.streamId,
    tranches: convertTranches(event.params.tranches),
    transferable: event.params.transferable,
  };
  await createStream({
    context,
    createInStore: Store.Stream.createTranched,
    entities,
    event,
    params: streamParams,
  });
});
