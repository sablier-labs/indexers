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

Contract.Flow_v1_2.AdjustFlowStream.handlerWithLoader(adjustStream);
Contract.Flow_v1_2.Approval.handlerWithLoader(approval);
Contract.Flow_v1_2.ApprovalForAll.handlerWithLoader(approvalForAll);
Contract.Flow_v1_2.CreateFlowStream.handlerWithLoader(createStream);
Contract.Flow_v1_2.DepositFlowStream.handlerWithLoader(depositStream);
Contract.Flow_v1_2.PauseFlowStream.handlerWithLoader(pauseStream);
Contract.Flow_v1_2.RefundFromFlowStream.handlerWithLoader(refundStream);
Contract.Flow_v1_2.RestartFlowStream.handlerWithLoader(restartStream);
Contract.Flow_v1_2.Transfer.handlerWithLoader(transfer);
Contract.Flow_v1_2.VoidFlowStream.handlerWithLoader(voidStream);
Contract.Flow_v1_2.WithdrawFromFlowStream.handlerWithLoader(withdrawStream);
