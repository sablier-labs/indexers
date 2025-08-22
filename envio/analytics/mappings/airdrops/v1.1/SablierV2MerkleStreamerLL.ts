import { Contract } from "../../../bindings";
import { Store } from "../../../store";

Contract.Airdrops.Campaign.MerkleStreamerLL_v1_1.Claim.handler(async ({ context, event }) => {
  const isAirdropClaim = true;
  await Store.User.createOrUpdate(context, event, [event.params.recipient, event.transaction.from], isAirdropClaim);
  // NO revenue tracking - v1.1 has no fees
});

Contract.Airdrops.Campaign.MerkleStreamerLL_v1_1.Clawback.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [event.params.admin, event.params.to, event.transaction.from]);
});

Contract.Airdrops.Campaign.MerkleStreamerLL_v1_1.TransferAdmin.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [
    event.params.oldAdmin,
    event.params.newAdmin,
    event.transaction.from,
  ]);
});
