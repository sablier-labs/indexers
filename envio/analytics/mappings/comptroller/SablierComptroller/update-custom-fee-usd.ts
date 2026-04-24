import { Contract } from "../../../bindings.js";
import { Store } from "../../../store/index.js";

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/utils/blob/main/src/interfaces/ISablierComptroller.sol

──────────────────────────────────────────────────────────────

event UpdateCustomFeeUSD(
    Protocol indexed protocol,
    address caller,
    address indexed user,
    uint256 previousMinFeeUSD,
    uint256 newMinFeeUSD
);

──────────────────────────────────────────────────────────────
*/

Contract.Comptroller.UpdateCustomFeeUSD.handler(async ({ context, event }) => {
  await Store.CustomFee.upsertComptrollerFee(context, event, {
    newMinFeeUSD: event.params.newMinFeeUSD,
    protocol: event.params.protocol,
    user: event.params.user,
  });
});
