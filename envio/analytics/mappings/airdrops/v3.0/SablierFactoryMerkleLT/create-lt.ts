import { isOfficialLockup } from "../../../../../common/helpers.js";
import { Contract } from "../../../../bindings.js";
import { Store } from "../../../../store.js";

Contract.Airdrops.Factory.FactoryMerkleLT_v3_0.CreateMerkleLT.contractRegister(
  ({ context, event }) => {
    const lockupAddress = event.params.campaignParams[7];
    if (!isOfficialLockup(context.log, event, lockupAddress, { allowAll: true })) {
      return;
    }
    const campaignAddress = event.params.merkleLT;
    context.addSablierMerkleLT_v3_0(campaignAddress);
  }
);

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/evm-monorepo/blob/airdrops@v3.0/airdrops/src/types/MerkleLT.sol
https://github.com/sablier-labs/evm-monorepo/blob/airdrops@v3.0/airdrops/src/interfaces/ISablierFactoryMerkleLT.sol
──────────────────────────────────────────────────────────────

event CreateMerkleLT(
    ISablierMerkleLT indexed merkleLT,
    MerkleLT.ConstructorParams campaignParams,
    uint256 aggregateAmount,
    uint256 totalDuration,
    uint256 recipientCount,
    address comptroller,
    uint256 minFeeUSD
);

struct ConstructorParams {
    string campaignName;                           [0]
    uint40 campaignStartTime;                      [1]
    bool cancelable;                               [2]
    ClaimType claimType;                           [3]
    uint40 expiration;                             [4]
    address initialAdmin;                          [5]
    string ipfsCID;                                [6]
    ISablierLockup lockup;                         [7]
    bytes32 merkleRoot;                            [8]
    string shape;                                  [9]
    IERC20 token;                                  [10]
    MerkleLT.TrancheWithPercentage[] tranches;     [11]
    bool transferable;                             [12]
    uint40 vestingStartTime;                       [13]
}

──────────────────────────────────────────────────────────────
*/

Contract.Airdrops.Factory.FactoryMerkleLT_v3_0.CreateMerkleLT.handler(
  async ({ context, event }) => {
    const lockupAddress = event.params.campaignParams[7];
    if (!isOfficialLockup(context.log, event, lockupAddress, { allowAll: true })) {
      return;
    }
    const initialAdmin = event.params.campaignParams[5];
    await Store.User.createOrUpdate(context, event, [initialAdmin, event.transaction.from]);
  }
);
