import { Contract } from "../../bindings";
import {
  adjustStream,
  approval,
  approvalForAll,
  createStream,
  depositStream,
  pauseStream,
  refundStream,
  restartStream,
  transfer,
  voidStream,
  withdrawStream,
} from "../common";

Contract.Flow_v1_0.AdjustFlowStream.handler(adjustStream.handler);
Contract.Flow_v1_0.Approval.handler(approval.handler);
Contract.Flow_v1_0.ApprovalForAll.handler(approvalForAll.handler);
Contract.Flow_v1_0.CreateFlowStream.handler(createStream.handler);
Contract.Flow_v1_0.DepositFlowStream.handler(depositStream.handler);
Contract.Flow_v1_0.PauseFlowStream.handler(pauseStream.handler);
Contract.Flow_v1_0.RefundFromFlowStream.handler(refundStream.handler);
Contract.Flow_v1_0.RestartFlowStream.handler(restartStream.handler);
Contract.Flow_v1_0.Transfer.handler(transfer.handler);
Contract.Flow_v1_0.VoidFlowStream.handler(voidStream.handler);
Contract.Flow_v1_0.WithdrawFromFlowStream.handler(withdrawStream.handler);
