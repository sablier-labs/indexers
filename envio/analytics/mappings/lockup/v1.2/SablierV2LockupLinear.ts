import { Contract } from "../../../bindings";
import { Store } from "../../../store";
import { handleApproval, handleApprovalForAll, handleTransfer } from "../../common/handlers";

/* -------------------------------------------------------------------------- */
/*                               LOCKUP-SPECIFIC                              */
/* -------------------------------------------------------------------------- */

Contract.Lockup.LockupLinear_v1_2.CancelLockupStream.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [
    event.params.sender,
    event.params.recipient,
    event.transaction.from,
  ]);
});

Contract.Lockup.LockupLinear_v1_2.CreateLockupLinearStream.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [
    event.params.sender,
    event.params.recipient,
    event.params.funder,
    event.transaction.from,
  ]);
});

Contract.Lockup.LockupLinear_v1_2.RenounceLockupStream.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [event.transaction.from]);
});

Contract.Lockup.LockupLinear_v1_2.WithdrawFromLockupStream.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [event.params.to, event.transaction.from]);
  // Lockup v1.2 didn't have fees, so we don't need to track revenue
});

/* -------------------------------------------------------------------------- */
/*                                   ERC-721                                  */
/* -------------------------------------------------------------------------- */

Contract.Lockup.LockupLinear_v1_2.Approval.handler(async ({ context, event }) => {
  await handleApproval(context, event, {
    approved: event.params.approved,
    owner: event.params.owner,
  });
});

Contract.Lockup.LockupLinear_v1_2.ApprovalForAll.handler(async ({ context, event }) => {
  await handleApprovalForAll(context, event, {
    operator: event.params.operator,
    owner: event.params.owner,
  });
});

Contract.Lockup.LockupLinear_v1_2.Transfer.handler(async ({ context, event }) => {
  await handleTransfer(context, event, {
    from: event.params.from,
    to: event.params.to,
  });
});
