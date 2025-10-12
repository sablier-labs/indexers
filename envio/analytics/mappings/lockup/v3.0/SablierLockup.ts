import { Contract } from "../../../bindings";
import { Store } from "../../../store";
import { handleApproval, handleApprovalForAll, handleTransfer } from "../../common/event-handlers";

// See https://github.com/enviodev/hyperindex/issues/765
import "../../common/preset-handler";

/* -------------------------------------------------------------------------- */
/*                               LOCKUP-SPECIFIC                              */
/* -------------------------------------------------------------------------- */

Contract.Lockup.Lockup_v3_0.CancelLockupStream.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [
    event.params.sender,
    event.params.recipient,
    event.transaction.from,
  ]);
});

Contract.Lockup.Lockup_v3_0.RenounceLockupStream.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [event.transaction.from]);
});

Contract.Lockup.Lockup_v3_0.WithdrawFromLockupStream.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [event.params.to, event.transaction.from]);
  // Lockup v3.0 maintains fees tracking
  await Store.Fees.createOrUpdate(context, event);
});

/* -------------------------------------------------------------------------- */
/*                                   ERC-721                                  */
/* -------------------------------------------------------------------------- */

Contract.Lockup.Lockup_v3_0.Approval.handler(async ({ context, event }) => {
  await handleApproval(context, event, {
    approved: event.params.approved,
    owner: event.params.owner,
  });
});

Contract.Lockup.Lockup_v3_0.ApprovalForAll.handler(async ({ context, event }) => {
  await handleApprovalForAll(context, event, {
    operator: event.params.operator,
    owner: event.params.owner,
  });
});

Contract.Lockup.Lockup_v3_0.Transfer.handler(async ({ context, event }) => {
  await handleTransfer(context, event, {
    from: event.params.from,
    to: event.params.to,
  });
});

/* -------------------------------------------------------------------------- */
/*                              CREATE HANDLERS                              */
/* -------------------------------------------------------------------------- */

import "./SablierLockup/create-dynamic";
import "./SablierLockup/create-linear";
import "./SablierLockup/create-tranched";
