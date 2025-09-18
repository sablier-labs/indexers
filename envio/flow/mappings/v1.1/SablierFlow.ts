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

Contract.Flow_v1_1.AdjustFlowStream.handler(adjustStream.handler);
Contract.Flow_v1_1.Approval.handler(approval.handler);
Contract.Flow_v1_1.ApprovalForAll.handler(approvalForAll.handler);
Contract.Flow_v1_1.CreateFlowStream.handler(createStream.handler);
Contract.Flow_v1_1.DepositFlowStream.handler(depositStream.handler);
Contract.Flow_v1_1.PauseFlowStream.handler(pauseStream.handler);
Contract.Flow_v1_1.RefundFromFlowStream.handler(refundStream.handler);
Contract.Flow_v1_1.RestartFlowStream.handler(restartStream.handler);
Contract.Flow_v1_1.Transfer.handler(transfer.handler);
Contract.Flow_v1_1.VoidFlowStream.handler(voidStream.handler);
Contract.Flow_v1_1.WithdrawFromFlowStream.handler(withdrawStream.handler);
