import { Contract } from "../../bindings";
import { convertSegments } from "../../helpers";
import { type Params } from "../../helpers/types";
import { approval, approvalForAll, cancelStream, renounceStream, transfer, withdrawStream } from "../common";
import { createDynamicStream } from "../common/create-stream";
import { Loader } from "../common/loader";

Contract.LockupDynamic_v1_0.ApprovalForAll.handlerWithLoader(approvalForAll);
Contract.LockupDynamic_v1_0.Approval.handlerWithLoader(approval);
Contract.LockupDynamic_v1_0.CancelLockupStream.handlerWithLoader(cancelStream);
Contract.LockupDynamic_v1_0.RenounceLockupStream.handlerWithLoader(renounceStream);
Contract.LockupDynamic_v1_0.Transfer.handlerWithLoader(transfer);
Contract.LockupDynamic_v1_0.WithdrawFromLockupStream.handlerWithLoader(withdrawStream);

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/lockup/blob/v1.0/src/types/DataTypes.sol
https://github.com/sablier-labs/lockup/blob/v1.0/src/interfaces/ISablierV2LockupDynamic.sol#L28-L39

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
    LockupDynamic.Segment[] segments,
    LockupDynamic.Range range,
    address broker
);

──────────────────────────────────────────────────────────────
*/
Contract.LockupDynamic_v1_0.CreateLockupDynamicStream.handlerWithLoader({
  handler: async ({ context, event, loaderReturn }) => {
    const params: Params.CreateStreamDynamic = {
      asset: event.params.asset,
      cancelable: event.params.cancelable,
      category: "LockupDynamic",
      depositAmount: event.params.amounts[0],
      endTime: event.params.range[1],
      funder: event.params.funder,
      proxender: loaderReturn.rpcData.proxender,
      recipient: event.params.recipient,
      segments: convertSegments(event.params.segments),
      sender: event.params.sender,
      startTime: event.params.range[0],
      tokenId: event.params.streamId,
      transferable: true, // all v1.0 streams are transferable
    };
    await createDynamicStream({
      context,
      event,
      loaderReturn,
      params,
    });
  },
  loader: Loader.create["v1.0"],
});
