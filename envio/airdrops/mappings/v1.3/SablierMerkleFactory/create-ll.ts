import { isOfficialLockup } from "../../../../common/helpers";
import { Contract } from "../../../bindings";
import type { Params } from "../../../helpers";
import { Store } from "../../../store";
import { createMerkle, preloadCreateEntities } from "../../common/factory";

Contract.Factory.MerkleFactory_v1_3.CreateMerkleLL.contractRegister(({ context, event }) => {
  const lockupAddress = event.params.lockup;
  if (!isOfficialLockup(context.log, event, lockupAddress)) {
    return;
  }
  const campaignAddress = event.params.merkleLL;
  context.addSablierMerkleLL_v1_3(campaignAddress);
});

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/airdrops/blob/v1.3/src/types/DataTypes.sol
https://github.com/sablier-labs/airdrops/blob/v1.3/src/interfaces/ISablierMerkleFactory.sol#L38-L48
──────────────────────────────────────────────────────────────

event CreateMerkleLL(
    ISablierMerkleLL indexed merkleLL,
    MerkleBase.ConstructorParams baseParams,
    ISablierLockup lockup,
    bool cancelable,
    bool transferable,
    MerkleLL.Schedule schedule,
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

struct Schedule {
    uint40 startTime;       [0]
    UD2x18 startPercentage; [1]
    uint40 cliffDuration;   [2]
    UD2x18 cliffPercentage; [3]
    uint40 totalDuration;   [4]
}
──────────────────────────────────────────────────────────────
*/

Contract.Factory.MerkleFactory_v1_3.CreateMerkleLL.handler(async ({ context, event }) => {
  const baseParams = event.params.baseParams;
  const admin = baseParams[2];
  const asset = baseParams[0];
  const result = await preloadCreateEntities({ context, event, params: { admin, asset } });
  if (!result) {
    return;
  }
  const { entities } = result;

  const params: Params.CreateCampaignLL = {
    admin,
    aggregateAmount: event.params.aggregateAmount,
    asset,
    campaignAddress: event.params.merkleLL,
    cancelable: event.params.cancelable,
    category: "LockupLinear",
    cliffDuration: event.params.schedule[2],
    cliffPercentage: event.params.schedule[3],
    expiration: baseParams[1],
    ipfsCID: baseParams[3],
    lockup: event.params.lockup,
    merkleRoot: baseParams[4],
    minimumFee: event.params.fee,
    name: baseParams[5],
    recipientCount: event.params.recipientCount,
    shape: baseParams[6],
    startPercentage: event.params.schedule[1],
    startTime: event.params.schedule[0],
    totalDuration: event.params.schedule[4],
    transferable: event.params.transferable,
  };
  await createMerkle({
    context,
    createInStore: Store.Campaign.createLL,
    entities,
    event,
    params,
  });
});
