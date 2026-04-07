import { Contract } from "../../../bindings.js";
import { Store } from "../../../store/index.js";

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/evm-monorepo/blob/airdrops@v3.0/airdrops/src/interfaces/ISablierMerkleLL.sol
──────────────────────────────────────────────────────────────

event ClaimLLWithTransfer(
    uint256 index,
    address indexed recipient,
    address indexed to,
    bool viaSig,
    uint128 amount
);

event ClaimLLWithVesting(
    uint256 index,
    address indexed recipient,
    address indexed to,
    bool viaSig,
    uint128 amount,
    uint256 indexed streamId
);

──────────────────────────────────────────────────────────────
*/

Contract.Airdrops.Campaign.MerkleLL_v3_0.ClaimLLWithTransfer.handler(async ({ context, event }) => {
  const isAirdropClaim = true;
  await Store.User.createOrUpdate(
    context,
    event,
    [event.params.recipient, event.params.to, event.transaction.from],
    isAirdropClaim
  );
  await Store.Fees.createOrUpdate(context, event);
});

Contract.Airdrops.Campaign.MerkleLL_v3_0.ClaimLLWithVesting.handler(async ({ context, event }) => {
  const isAirdropClaim = true;
  await Store.User.createOrUpdate(
    context,
    event,
    [event.params.recipient, event.params.to, event.transaction.from],
    isAirdropClaim
  );
  await Store.Fees.createOrUpdate(context, event);
});

Contract.Airdrops.Campaign.MerkleLL_v3_0.Clawback.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [
    event.params.admin,
    event.params.to,
    event.transaction.from,
  ]);
});

Contract.Airdrops.Campaign.MerkleLL_v3_0.TransferAdmin.handler(async ({ context, event }) => {
  await Store.User.createOrUpdate(context, event, [
    event.params.oldAdmin,
    event.params.newAdmin,
    event.transaction.from,
  ]);
});
