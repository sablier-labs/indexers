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

Contract.Flow_v1_0.AdjustFlowStream.handlerWithLoader(adjustStream);
Contract.Flow_v1_0.Approval.handlerWithLoader(approval);
Contract.Flow_v1_0.ApprovalForAll.handlerWithLoader(approvalForAll);
Contract.Flow_v1_0.CreateFlowStream.handlerWithLoader(createStream);
Contract.Flow_v1_0.DepositFlowStream.handlerWithLoader(depositStream);
Contract.Flow_v1_0.PauseFlowStream.handlerWithLoader(pauseStream);
Contract.Flow_v1_0.RefundFromFlowStream.handlerWithLoader(refundStream);
Contract.Flow_v1_0.RestartFlowStream.handlerWithLoader(restartStream);
Contract.Flow_v1_0.Transfer.handlerWithLoader(transfer);
Contract.Flow_v1_0.VoidFlowStream.handlerWithLoader(voidStream);
Contract.Flow_v1_0.WithdrawFromFlowStream.handlerWithLoader(withdrawStream);
