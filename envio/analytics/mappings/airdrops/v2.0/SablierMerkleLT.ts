import { Contract } from "../../../bindings";
import { Store } from "../../../store";

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/airdrops/blob/v2.0/src/interfaces/ISablierMerkleLT.sol
──────────────────────────────────────────────────────────────

event ClaimLTWithTransfer(
    uint256 index,
    address indexed recipient,
    address indexed to,
    bool viaSig,
    uint128 amount
);

event ClaimLTWithVesting(
    uint256 index,
    address indexed recipient,
    address indexed to,
    bool viaSig,
    uint128 amount,
    uint256 indexed streamId
);

──────────────────────────────────────────────────────────────
*/

Contract.Airdrops.Campaign.MerkleLT_v2_0.ClaimLTWithTransfer.handler(async ({ context, event }) => {
  const isAirdropClaim = true;
  await Store.User.createOrUpdate(
    context,
    event,
    [event.params.recipient, event.params.to, event.transaction.from],
    isAirdropClaim,
  );
  await Store.Fees.createOrUpdate(context, event);
});

Contract.Airdrops.Campaign.MerkleLT_v2_0.ClaimLTWithVesting.handler(async ({ context, event }) => {
  const isAirdropClaim = true;
  await Store.User.createOrUpdate(
    context,
    event,
    [event.params.recipient, event.params.to, event.transaction.from],
    isAirdropClaim,
  );
  await Store.Fees.createOrUpdate(context, event);
});

Contract.Airdrops.Campaign.MerkleLT_v2_0.Clawback.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [event.params.admin, event.params.to, event.transaction.from]);
});

Contract.Airdrops.Campaign.MerkleLT_v2_0.TransferAdmin.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [
    event.params.oldAdmin,
    event.params.newAdmin,
    event.transaction.from,
  ]);
});
