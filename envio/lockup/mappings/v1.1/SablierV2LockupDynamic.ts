import { Contract } from "../../bindings";
import { convertSegments } from "../../helpers";
import type { Params } from "../../helpers/types";
import { Store } from "../../store";
import { approval, approvalForAll, cancelStream, renounceStream, transfer, withdrawStream } from "../common";
import { createStream } from "../common/create-stream";
import { preloadCreateEntities } from "../common/preload";

Contract.LockupDynamic_v1_1.ApprovalForAll.handler(approvalForAll.handler);
Contract.LockupDynamic_v1_1.Approval.handler(approval.handler);
Contract.LockupDynamic_v1_1.CancelLockupStream.handler(cancelStream.handler);
Contract.LockupDynamic_v1_1.RenounceLockupStream.handler(renounceStream.handler);
Contract.LockupDynamic_v1_1.Transfer.handler(transfer.handler);
Contract.LockupDynamic_v1_1.WithdrawFromLockupStream.handler(withdrawStream.handler);

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/lockup/blob/v1.1/src/types/DataTypes.sol
https://github.com/sablier-labs/lockup/blob/v1.1/src/interfaces/ISablierV2LockupDynamic.sol#L29-L41

──────────────────────────────────────────────────────────────

struct Range {
    uint40 start; [0]
    uint40 end;   [1]
}
struct Segment {
    uint128 amount;   [0]
    UD2x18 exponent;  [1]
    uint40 milestone; [2]
}

event CreateLockupDynamicStream(
    uint256 streamId,
    address funder,
    address indexed sender,
    address indexed recipient,
    Lockup.CreateAmounts amounts,
    IERC20 indexed asset,
    bool cancelable,
    bool transferable,
    LockupDynamic.Segment[] segments,
    LockupDynamic.Range range,
    address broker
);

──────────────────────────────────────────────────────────────
*/
Contract.LockupDynamic_v1_1.CreateLockupDynamicStream.handler(async ({ context, event }) => {
  const result = await preloadCreateEntities({ context, event, params: event.params });
  if (!result) {
    return;
  }
  const { entities, proxender } = result;

  const streamParams: Params.CreateStreamDynamic = {
    asset: event.params.asset,
    cancelable: event.params.cancelable,
    category: "LockupDynamic",
    depositAmount: event.params.amounts[0],
    endTime: event.params.range[1],
    funder: event.params.funder,
    proxender: proxender,
    recipient: event.params.recipient,
    segments: convertSegments(event.params.segments),
    sender: event.params.sender,
    startTime: event.params.range[0],
    tokenId: event.params.streamId,
    transferable: event.params.transferable,
  };
  await createStream({
    context,
    createInStore: Store.Stream.createDynamic,
    entities,
    event,
    params: streamParams,
  });
});
