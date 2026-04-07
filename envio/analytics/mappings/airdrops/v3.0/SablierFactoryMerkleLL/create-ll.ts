import { isOfficialLockup } from "../../../../../common/helpers.js";
import { Contract } from "../../../../bindings.js";
import { Store } from "../../../../store/index.js";

Contract.Airdrops.Factory.FactoryMerkleLL_v3_0.CreateMerkleLL.contractRegister(
  ({ context, event }) => {
    const lockupAddress = event.params.campaignParams[10];
    if (!isOfficialLockup(context.log, event, lockupAddress, { allowAll: true })) {
      return;
    }
    const campaignAddress = event.params.merkleLL;
    context.addSablierMerkleLL_v3_0(campaignAddress);
  }
);

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/evm-monorepo/blob/airdrops@v3.0/airdrops/src/types/MerkleLL.sol
https://github.com/sablier-labs/evm-monorepo/blob/airdrops@v3.0/airdrops/src/interfaces/ISablierFactoryMerkleLL.sol
──────────────────────────────────────────────────────────────

event CreateMerkleLL(
    ISablierMerkleLL indexed merkleLL,
    MerkleLL.ConstructorParams campaignParams,
    uint256 aggregateAmount,
    uint256 recipientCount,
    address comptroller,
    uint256 minFeeUSD
);

struct ConstructorParams {
    string campaignName;              [0]
    uint40 campaignStartTime;         [1]
    bool cancelable;                  [2]
    ClaimType claimType;              [3]
    uint40 cliffDuration;             [4]
    UD60x18 cliffUnlockPercentage;    [5]
    uint40 expiration;                [6]
    uint40 granularity;               [7]
    address initialAdmin;             [8]
    string ipfsCID;                   [9]
    ISablierLockup lockup;            [10]
    bytes32 merkleRoot;               [11]
    string shape;                     [12]
    UD60x18 startUnlockPercentage;    [13]
    IERC20 token;                     [14]
    uint40 totalDuration;             [15]
    bool transferable;                [16]
    uint40 vestingStartTime;          [17]
}

──────────────────────────────────────────────────────────────
*/

Contract.Airdrops.Factory.FactoryMerkleLL_v3_0.CreateMerkleLL.handler(
  async ({ context, event }) => {
    const lockupAddress = event.params.campaignParams[10];
    if (!isOfficialLockup(context.log, event, lockupAddress, { allowAll: true })) {
      return;
    }
    const initialAdmin = event.params.campaignParams[8];
    await Store.User.createOrUpdate(context, event, [initialAdmin, event.transaction.from]);
  }
);
