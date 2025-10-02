import { Contract } from "../../../bindings";
import { Store } from "../../../store";

Contract.Airdrops.Campaign.MerkleLL_v1_3.Claim.handler(async ({ context, event }) => {
  const isAirdropClaim = true;
  await Store.User.createOrUpdate(context, event, [event.params.recipient, event.transaction.from], isAirdropClaim);
  await Store.Fees.createOrUpdate(context, event);
});

Contract.Airdrops.Campaign.MerkleLL_v1_3.Clawback.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [event.params.admin, event.params.to, event.transaction.from]);
});

Contract.Airdrops.Campaign.MerkleLL_v1_3.TransferAdmin.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [
    event.params.oldAdmin,
    event.params.newAdmin,
    event.transaction.from,
  ]);
});
