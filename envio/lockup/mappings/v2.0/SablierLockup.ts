import { Contract } from "../../bindings";
import { approval, approvalForAll, cancelStream, renounceStream, transfer, withdrawStream } from "../common";

Contract.Lockup_v2_0.ApprovalForAll.handlerWithLoader(approvalForAll);
Contract.Lockup_v2_0.Approval.handlerWithLoader(approval);
Contract.Lockup_v2_0.CancelLockupStream.handlerWithLoader(cancelStream);
Contract.Lockup_v2_0.RenounceLockupStream.handlerWithLoader(renounceStream);
Contract.Lockup_v2_0.Transfer.handlerWithLoader(transfer);
Contract.Lockup_v2_0.WithdrawFromLockupStream.handlerWithLoader(withdrawStream);

import "./SablierLockup/create-dynamic";
import "./SablierLockup/create-linear";
import "./SablierLockup/create-tranched";
