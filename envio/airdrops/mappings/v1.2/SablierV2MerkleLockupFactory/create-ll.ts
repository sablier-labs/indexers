import { isDeprecatedContract as isDeprecatedFactory } from "../../../../common/deprecated";
import { isOfficialLockup } from "../../../../common/helpers";
import { Contract } from "../../../bindings";
import type { Params } from "../../../helpers";
import { Store } from "../../../store";
import { createMerkle, preloadCreateEntities } from "../../common/factory";

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

struct Durations {
    uint40 cliff; [0]
    uint40 total; [1]
}

──────────────────────────────────────────────────────────────
*/

Contract.Factory.MerkleLockupFactory_v1_2.CreateMerkleLL.contractRegister(({ context, event }) => {
  const asset = event.params.baseParams[0];
  if (isDeprecatedFactory({ asset, event, protocol: "airdrops" })) {
    return;
  }
  const lockupAddress = event.params.lockupLinear;
  if (!isOfficialLockup(context.log, event, lockupAddress)) {
    return;
  }
  const campaignAddress = event.params.merkleLL;
  context.addSablierV2MerkleLL_v1_2(campaignAddress);
});

Contract.Factory.MerkleLockupFactory_v1_2.CreateMerkleLL.handler(async ({ context, event }) => {
  const admin = event.params.baseParams[3];
  const asset = event.params.baseParams[0];
  const result = await preloadCreateEntities({
    context,
    event,
    params: { admin, asset },
  });
  if (!result) {
    return;
  }
  const { entities } = result;

  const baseParams = event.params.baseParams;
  const params: Params.CreateCampaignLL = {
    admin,
    aggregateAmount: event.params.aggregateAmount,
    asset,
    campaignAddress: event.params.merkleLL,
    cancelable: baseParams[1],
    category: "LockupLinear",
    cliffDuration: event.params.streamDurations[0],
    cliffPercentage: undefined,
    expiration: baseParams[2],
    ipfsCID: baseParams[4],
    lockup: event.params.lockupLinear,
    merkleRoot: baseParams[5],
    minimumFee: undefined,
    name: baseParams[6],
    recipientCount: event.params.recipientCount,
    shape: undefined,
    startPercentage: undefined,
    startTime: undefined, // all v1.2 streams use the claim time as the start time
    totalDuration: event.params.streamDurations[1],
    transferable: baseParams[7],
  };
  await createMerkle({
    context,
    createInStore: Store.Campaign.createLL,
    entities,
    event,
    params,
  });
});
