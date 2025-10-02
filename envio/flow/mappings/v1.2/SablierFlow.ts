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

Contract.Flow_v1_2.AdjustFlowStream.handler(adjustStream.handler);
Contract.Flow_v1_2.Approval.handler(approval.handler);
Contract.Flow_v1_2.ApprovalForAll.handler(approvalForAll.handler);
Contract.Flow_v1_2.CreateFlowStream.handler(createStream.handler);
Contract.Flow_v1_2.DepositFlowStream.handler(depositStream.handler);
Contract.Flow_v1_2.PauseFlowStream.handler(pauseStream.handler);
Contract.Flow_v1_2.RefundFromFlowStream.handler(refundStream.handler);
Contract.Flow_v1_2.RestartFlowStream.handler(restartStream.handler);
Contract.Flow_v1_2.Transfer.handler(transfer.handler);
Contract.Flow_v1_2.VoidFlowStream.handler(voidStream.handler);
Contract.Flow_v1_2.WithdrawFromFlowStream.handler(withdrawStream.handler);
