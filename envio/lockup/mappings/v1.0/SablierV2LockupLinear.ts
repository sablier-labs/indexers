import { Contract } from "../../bindings";
import type { Params } from "../../helpers/types";
import { Store } from "../../store";
import { approval, approvalForAll, cancelStream, renounceStream, transfer, withdrawStream } from "../common";
import { createStream } from "../common/create-stream";
import { preloadCreateEntities } from "../common/preload";

Contract.LockupLinear_v1_0.ApprovalForAll.handler(approvalForAll.handler);
Contract.LockupLinear_v1_0.Approval.handler(approval.handler);
Contract.LockupLinear_v1_0.CancelLockupStream.handler(cancelStream.handler);
Contract.LockupLinear_v1_0.RenounceLockupStream.handler(renounceStream.handler);
Contract.LockupLinear_v1_0.Transfer.handler(transfer.handler);
Contract.LockupLinear_v1_0.WithdrawFromLockupStream.handler(withdrawStream.handler);

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/lockup/blob/v1.0/src/types/DataTypes.sol
https://github.com/sablier-labs/lockup/blob/v1.0/src/interfaces/ISablierV2LockupLinear.sol#L28-L38
──────────────────────────────────────────────────────────────

struct Range {
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
    LockupLinear.Range range,
    address broker
);
──────────────────────────────────────────────────────────────
*/
Contract.LockupLinear_v1_0.CreateLockupLinearStream.handler(async ({ context, event }) => {
  const result = await preloadCreateEntities({ context, event, params: event.params });
  if (!result) {
    return;
  }
  const { entities, proxender } = result;

  const streamParams: Params.CreateStreamLinear = {
    asset: event.params.asset,
    cancelable: event.params.cancelable,
    category: "LockupLinear",
    cliffTime: event.params.range[1],
    depositAmount: event.params.amounts[0],
    endTime: event.params.range[2],
    funder: event.params.funder,
    proxender: proxender,
    recipient: event.params.recipient,
    sender: event.params.sender,
    startTime: event.params.range[0],
    tokenId: event.params.streamId,
    transferable: true, // all v1.0 streams are transferable
  };
  await createStream({
    context,
    createInStore: Store.Stream.createLinear,
    entities,
    event,
    params: streamParams,
  });
});
