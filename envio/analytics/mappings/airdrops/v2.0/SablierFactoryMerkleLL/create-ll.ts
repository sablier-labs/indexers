import { isOfficialLockup } from "../../../../../common/helpers";
import { Contract } from "../../../../bindings";
import { Store } from "../../../../store";

Contract.Airdrops.Factory.FactoryMerkleLL_v2_0.CreateMerkleLL.contractRegister(
  ({ context, event }) => {
    const lockupAddress = event.params.params[8];
    if (!isOfficialLockup(context.log, event, lockupAddress, { allowAll: true })) {
      return;
    }
    const campaignAddress = event.params.merkleLL;
    context.addSablierMerkleLL_v2_0(campaignAddress);
  }
);

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/airdrops/blob/v2.0/src/types/DataTypes.sol
https://github.com/sablier-labs/airdrops/blob/v2.0/src/interfaces/ISablierFactoryMerkleLL.sol
──────────────────────────────────────────────────────────────

event CreateMerkleLL(
    ISablierMerkleLL indexed merkleLL,
    MerkleLL.ConstructorParams params,
    uint256 aggregateAmount,
    uint256 recipientCount,
    address comptroller,
    uint256 minFeeUSD
);

struct ConstructorParams {
    string campaignName;              [0]
    uint40 campaignStartTime;         [1]
    bool cancelable;                  [2]
    uint40 cliffDuration;             [3]
    UD60x18 cliffUnlockPercentage;    [4]
    uint40 expiration;                [5]
    address initialAdmin;             [6]
    string ipfsCID;                   [7]
    ISablierLockup lockup;            [8]
    bytes32 merkleRoot;               [9]
    string shape;                     [10]
    UD60x18 startUnlockPercentage;    [11]
    IERC20 token;                     [12]
    uint40 totalDuration;             [13]
    bool transferable;                [14]
    uint40 vestingStartTime;          [15]
}

──────────────────────────────────────────────────────────────
*/

Contract.Airdrops.Factory.FactoryMerkleLL_v2_0.CreateMerkleLL.handler(
  async ({ context, event }) => {
    const lockupAddress = event.params.params[8];
    if (!isOfficialLockup(context.log, event, lockupAddress, { allowAll: true })) {
      return;
    }
    const initialAdmin = event.params.params[6];
    await Store.User.createOrUpdate(context, event, [initialAdmin, event.transaction.from]);
  }
);
