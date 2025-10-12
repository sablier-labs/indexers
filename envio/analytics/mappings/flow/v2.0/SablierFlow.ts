import { Contract } from "../../../bindings";
import { Store } from "../../../store";
import { handleApproval, handleApprovalForAll, handleTransfer } from "../../common/event-handlers";

/* -------------------------------------------------------------------------- */
/*                                FLOW-SPECIFIC                               */
/* -------------------------------------------------------------------------- */

Contract.Flow.Flow_v2_0.AdjustFlowStream.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [event.transaction.from]);
});

Contract.Flow.Flow_v2_0.CreateFlowStream.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [
    event.params.sender,
    event.params.recipient,
    event.transaction.from,
  ]);
});

Contract.Flow.Flow_v2_0.DepositFlowStream.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [event.params.funder, event.transaction.from]);
});

Contract.Flow.Flow_v2_0.PauseFlowStream.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [event.transaction.from]);
});

Contract.Flow.Flow_v2_0.RefundFromFlowStream.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [event.params.sender, event.transaction.from]);
});

Contract.Flow.Flow_v2_0.RestartFlowStream.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [event.transaction.from]);
});

Contract.Flow.Flow_v2_0.VoidFlowStream.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [event.transaction.from]);
});

Contract.Flow.Flow_v2_0.WithdrawFromFlowStream.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [event.params.to, event.transaction.from]);
  await Store.Fees.createOrUpdate(context, event);
});

/* -------------------------------------------------------------------------- */
/*                                   ERC-721                                  */
/* -------------------------------------------------------------------------- */

Contract.Flow.Flow_v2_0.Transfer.handler(async ({ context, event }) => {
  await handleTransfer(context, event, {
    from: event.params.from,
    to: event.params.to,
  });
});

Contract.Flow.Flow_v2_0.Approval.handler(async ({ context, event }) => {
  await handleApproval(context, event, {
    approved: event.params.approved,
    owner: event.params.owner,
  });
});

Contract.Flow.Flow_v2_0.ApprovalForAll.handler(async ({ context, event }) => {
  await handleApprovalForAll(context, event, {
    operator: event.params.operator,
    owner: event.params.owner,
  });
});
