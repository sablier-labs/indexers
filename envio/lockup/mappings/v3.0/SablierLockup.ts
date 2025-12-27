import { Contract } from "../../bindings";
import {
  approval,
  approvalForAll,
  cancelStream,
  renounceStream,
  transfer,
  withdrawStream,
} from "../common";

Contract.Lockup_v3_0.ApprovalForAll.handler(approvalForAll.handler);
Contract.Lockup_v3_0.Approval.handler(approval.handler);
Contract.Lockup_v3_0.CancelLockupStream.handler(cancelStream.handler);
Contract.Lockup_v3_0.RenounceLockupStream.handler(renounceStream.handler);
Contract.Lockup_v3_0.Transfer.handler(transfer.handler);
Contract.Lockup_v3_0.WithdrawFromLockupStream.handler(withdrawStream.handler);

import "./SablierLockup/create-dynamic";
import "./SablierLockup/create-linear";
import "./SablierLockup/create-tranched";
