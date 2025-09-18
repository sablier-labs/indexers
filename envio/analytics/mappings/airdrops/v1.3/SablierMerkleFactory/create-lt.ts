import { isOfficialLockup } from "../../../../../common/helpers";
import { Contract } from "../../../../bindings";
import { Store } from "../../../../store";

Contract.Airdrops.Factory.MerkleFactory_v1_3.CreateMerkleLT.contractRegister(({ context, event }) => {
  const lockupAddress = event.params.lockup;
  if (!isOfficialLockup(context.log, event, lockupAddress, { allowAll: true })) {
    return;
  }
  const campaignAddress = event.params.merkleLT;
  context.addSablierMerkleLT_v1_3(campaignAddress);
});

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/airdrops/blob/v1.3/src/types/DataTypes.sol
https://github.com/sablier-labs/airdrops/blob/v1.3/src/interfaces/ISablierMerkleFactory.sol#L51-L63
──────────────────────────────────────────────────────────────

event CreateMerkleLT(
    ISablierMerkleLT indexed merkleLT,
    MerkleBase.ConstructorParams baseParams,
    ISablierLockup lockup,
    bool cancelable,
    bool transferable,
    uint40 streamStartTime,
    MerkleLT.TrancheWithPercentage[] tranchesWithPercentages,
    uint256 totalDuration,
    uint256 aggregateAmount,
    uint256 recipientCount,
    uint256 fee
);

struct ConstructorParams {
    IERC20 token;         [0]
    uint40 expiration;    [1]
    address initialAdmin; [2]
    string ipfsCID;       [3]
    bytes32 merkleRoot;   [4]
    string campaignName;  [5]
    string shape;         [6]
}

──────────────────────────────────────────────────────────────
*/

Contract.Airdrops.Factory.MerkleFactory_v1_3.CreateMerkleLT.handler(async ({ context, event }) => {
  const lockupAddress = event.params.lockup;
  if (!isOfficialLockup(context.log, event, lockupAddress, { allowAll: true })) {
    return;
  }
  const initialAdmin = event.params.baseParams[2];
  await Store.User.createOrUpdate(context, event, [initialAdmin, event.transaction.from]);
});
