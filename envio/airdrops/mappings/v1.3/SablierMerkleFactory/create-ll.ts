import { isOfficialLockup } from "../../../../common/helpers.js";
import { Contract } from "../../../bindings.js";
import type { Params } from "../../../helpers/index.js";
import { Store } from "../../../store/index.js";
import { createMerkle, preloadCreateEntities } from "../../common/factory/index.js";

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

Contract.Factory.MerkleFactory_v1_3.CreateMerkleLL.contractRegister(({ context, event }) => {
  const lockupAddress = event.params.lockup;
  if (!isOfficialLockup(context.log, event, lockupAddress)) {
    return;
  }
  const campaignAddress = event.params.merkleLL;
  context.addSablierMerkleLL_v1_3(campaignAddress);
});

Contract.Factory.MerkleFactory_v1_3.CreateMerkleLL.handler(async ({ context, event }) => {
  const baseParams = event.params.baseParams;
  const admin = baseParams.initialAdmin;
  const asset = baseParams.token;
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
    campaignStartTime: BigInt(event.block.timestamp),
    cancelable: event.params.cancelable,
    category: "LockupLinear",
    cliffDuration: event.params.schedule.cliffDuration,
    cliffPercentage: event.params.schedule.cliffPercentage,
    expiration: baseParams.expiration,
    ipfsCID: baseParams.ipfsCID,
    lockup: event.params.lockup,
    merkleRoot: baseParams.merkleRoot,
    minimumFee: event.params.fee,
    name: baseParams.campaignName,
    recipientCount: event.params.recipientCount,
    shape: baseParams.shape,
    startPercentage: event.params.schedule.startPercentage,
    startTime: event.params.schedule.startTime,
    totalDuration: event.params.schedule.totalDuration,
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
