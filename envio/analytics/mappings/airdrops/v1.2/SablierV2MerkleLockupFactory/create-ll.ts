import { isOfficialLockup } from "../../../../../common/helpers";
import { Contract } from "../../../../bindings";
import { Store } from "../../../../store";

Contract.Airdrops.Factory.MerkleLockupFactory_v1_2.CreateMerkleLL.contractRegister(
  ({ context, event }) => {
    const lockupAddress = event.params.lockupLinear;
    if (!isOfficialLockup(context.log, event, lockupAddress, { allowAll: true })) {
      return;
    }
    const campaignAddress = event.params.merkleLL;
    context.addSablierV2MerkleLL_v1_2(campaignAddress);
  }
);

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/v2-periphery/blob/v1.2.0/src/types/DataTypes.sol
https://github.com/sablier-labs/v2-periphery/blob/v1.2.0/src/interfaces/ISablierV2MerkleLockupFactory.sol#L20-L27
──────────────────────────────────────────────────────────────

event CreateMerkleLL(
    ISablierV2MerkleLL indexed merkleLL,
    MerkleLockup.ConstructorParams baseParams,
    ISablierV2LockupLinear lockupLinear,
    LockupLinear.Durations streamDurations,
    uint256 aggregateAmount,
    uint256 recipientCount
);

struct ConstructorParams {
    IERC20 asset;         [0]
    bool cancelable;      [1]
    uint40 expiration;    [2]
    address initialAdmin; [3]
    string ipfsCID;       [4]
    bytes32 merkleRoot;   [5]
    string name;          [6]
    bool transferable;    [7]
}

──────────────────────────────────────────────────────────────
*/

Contract.Airdrops.Factory.MerkleLockupFactory_v1_2.CreateMerkleLL.handler(
  async ({ context, event }) => {
    const lockupAddress = event.params.lockupLinear;
    if (!isOfficialLockup(context.log, event, lockupAddress, { allowAll: true })) {
      return;
    }
    const initialAdmin = event.params.baseParams[3];
    await Store.User.createOrUpdate(context, event, [initialAdmin, event.transaction.from]);
  }
);
