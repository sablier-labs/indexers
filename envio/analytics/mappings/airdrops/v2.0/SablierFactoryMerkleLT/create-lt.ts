import { isOfficialLockup } from "../../../../../common/helpers";
import { Contract } from "../../../../bindings";
import { Store } from "../../../../store";

Contract.Airdrops.Factory.FactoryMerkleLT_v2_0.CreateMerkleLT.contractRegister(
  ({ context, event }) => {
    const lockupAddress = event.params.params[6];
    if (!isOfficialLockup(context.log, event, lockupAddress, { allowAll: true })) {
      return;
    }
    const campaignAddress = event.params.merkleLT;
    context.addSablierMerkleLT_v2_0(campaignAddress);
  }
);

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/airdrops/blob/v2.0/src/types/DataTypes.sol
https://github.com/sablier-labs/airdrops/blob/v2.0/src/interfaces/ISablierFactoryMerkleLT.sol
──────────────────────────────────────────────────────────────

event CreateMerkleLT(
    ISablierMerkleLT indexed merkleLT,
    MerkleLT.ConstructorParams params,
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
    uint40 expiration;                             [3]
    address initialAdmin;                          [4]
    string ipfsCID;                                [5]
    ISablierLockup lockup;                         [6]
    bytes32 merkleRoot;                            [7]
    string shape;                                  [8]
    IERC20 token;                                  [9]
    MerkleLT.TrancheWithPercentage[] tranches;     [10]
    bool transferable;                             [11]
    uint40 vestingStartTime;                       [12]
}

──────────────────────────────────────────────────────────────
*/

Contract.Airdrops.Factory.FactoryMerkleLT_v2_0.CreateMerkleLT.handler(
  async ({ context, event }) => {
    const lockupAddress = event.params.params[6];
    if (!isOfficialLockup(context.log, event, lockupAddress, { allowAll: true })) {
      return;
    }
    const initialAdmin = event.params.params[4];
    await Store.User.createOrUpdate(context, event, [initialAdmin, event.transaction.from]);
  }
);
