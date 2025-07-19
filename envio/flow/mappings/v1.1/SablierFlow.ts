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

Contract.Flow_v1_1.AdjustFlowStream.handlerWithLoader(adjustStream);
Contract.Flow_v1_1.Approval.handlerWithLoader(approval);
Contract.Flow_v1_1.ApprovalForAll.handlerWithLoader(approvalForAll);
Contract.Flow_v1_1.CreateFlowStream.handlerWithLoader(createStream);
Contract.Flow_v1_1.DepositFlowStream.handlerWithLoader(depositStream);
Contract.Flow_v1_1.PauseFlowStream.handlerWithLoader(pauseStream);
Contract.Flow_v1_1.RefundFromFlowStream.handlerWithLoader(refundStream);
Contract.Flow_v1_1.RestartFlowStream.handlerWithLoader(restartStream);
Contract.Flow_v1_1.Transfer.handlerWithLoader(transfer);
Contract.Flow_v1_1.VoidFlowStream.handlerWithLoader(voidStream);
Contract.Flow_v1_1.WithdrawFromFlowStream.handlerWithLoader(withdrawStream);
