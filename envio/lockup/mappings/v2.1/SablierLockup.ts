import { Contract } from "../../bindings";
import { approval, approvalForAll, cancelStream, renounceStream, transfer, withdrawStream } from "../common";

Contract.Lockup_v2_1.ApprovalForAll.handler(approvalForAll.handler);
Contract.Lockup_v2_1.Approval.handler(approval.handler);
Contract.Lockup_v2_1.CancelLockupStream.handler(cancelStream.handler);
Contract.Lockup_v2_1.RenounceLockupStream.handler(renounceStream.handler);
Contract.Lockup_v2_1.Transfer.handler(transfer.handler);
Contract.Lockup_v2_1.WithdrawFromLockupStream.handler(withdrawStream.handler);

import "./SablierLockup/create-dynamic";
import "./SablierLockup/create-linear";
import "./SablierLockup/create-tranched";
