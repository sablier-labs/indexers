import { Contract } from "../../../bindings";
import { Store } from "../../../store";

Contract.Airdrops.Campaign.MerkleLL_v1_2.Claim.handler(async ({ context, event }) => {
  const isAirdropClaim = true;
  await Store.User.createOrUpdate(
    context,
    event,
    [event.params.recipient, event.transaction.from],
    isAirdropClaim
  );
  // NO revenue tracking - v1.2 has no fees
});

Contract.Airdrops.Campaign.MerkleLL_v1_2.Clawback.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [
    event.params.admin,
    event.params.to,
    event.transaction.from,
  ]);
});

Contract.Airdrops.Campaign.MerkleLL_v1_2.TransferAdmin.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [
    event.params.oldAdmin,
    event.params.newAdmin,
    event.transaction.from,
  ]);
});
