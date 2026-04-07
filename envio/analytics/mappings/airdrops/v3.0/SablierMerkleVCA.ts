import { Contract } from "../../../bindings.js";
import { Store } from "../../../store/index.js";

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/evm-monorepo/blob/airdrops@v3.0/airdrops/src/interfaces/ISablierMerkleVCA.sol
──────────────────────────────────────────────────────────────

event ClaimVCA(
    uint256 index,
    address indexed recipient,
    uint128 claimAmount,
    uint128 forgoneAmount,
    address to,
    bool viaSig
);

event EnableRedistribution();

──────────────────────────────────────────────────────────────
*/

Contract.Airdrops.Campaign.MerkleVCA_v3_0.ClaimVCA.handler(async ({ context, event }) => {
  const isAirdropClaim = true;
  await Store.User.createOrUpdate(
    context,
    event,
    [event.params.recipient, event.params.to, event.transaction.from],
    isAirdropClaim
  );
  await Store.Fees.createOrUpdate(context, event);
});

Contract.Airdrops.Campaign.MerkleVCA_v3_0.Clawback.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [
    event.params.admin,
    event.params.to,
    event.transaction.from,
  ]);
});

Contract.Airdrops.Campaign.MerkleVCA_v3_0.TransferAdmin.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [
    event.params.oldAdmin,
    event.params.newAdmin,
    event.transaction.from,
  ]);
});

Contract.Airdrops.Campaign.MerkleVCA_v3_0.EnableRedistribution.handler(
  async ({ context, event }) => {
    await Store.User.createOrUpdate(context, event, [event.transaction.from]);
  }
);
