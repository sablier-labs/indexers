import { isOfficialLockup } from "../../../../common/helpers";
import { Contract } from "../../../bindings";
import type { Params } from "../../../helpers";
import { Store } from "../../../store";
import { preloadCreateEntities } from "../../common/factory";
import { createMerkle } from "../../common/factory/create-merkle";

Contract.Factory.FactoryMerkleLL_v2_0.CreateMerkleLL.contractRegister(({ context, event }) => {
  const lockupAddress = event.params.params[8];
  if (!isOfficialLockup(context.log, event, lockupAddress)) {
    return;
  }
  const campaignAddress = event.params.merkleLL;
  context.addSablierMerkleLL_v2_0(campaignAddress);
});

/*
──────────────────────────────────────────────────────────────
TODO: update links
Solidity Event Reference
https://github.com/sablier-labs/airdrops/blob/v1.3/src/types/DataTypes.sol
https://github.com/sablier-labs/airdrops/blob/v1.3/src/interfaces/ISablierMerkleFactory.sol#L38-L48
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
    string campaignName;
    uint40 campaignStartTime;
    bool cancelable;
    uint40 cliffDuration;
    UD60x18 cliffUnlockPercentage;
    uint40 expiration;
    address initialAdmin;
    string ipfsCID;
    ISablierLockup lockup;
    bytes32 merkleRoot;
    string shape;
    UD60x18 startUnlockPercentage;
    IERC20 token;
    uint40 totalDuration;
    bool transferable;
    uint40 vestingStartTime;
}
──────────────────────────────────────────────────────────────
*/

Contract.Factory.FactoryMerkleLL_v2_0.CreateMerkleLL.handler(async ({ context, event }) => {
  const result = await preloadCreateEntities({
    context,
    event,
    params: {
      admin: event.params.params[6],
      asset: event.params.params[12],
    },
  });
  if (!result) {
    return;
  }

  const { entities } = result;
  const baseParams = event.params.params;
  const params: Params.CreateCampaignLL = {
    admin: baseParams[6],
    aggregateAmount: event.params.aggregateAmount,
    asset: baseParams[12],
    campaignAddress: event.params.merkleLL,
    campaignStartTime: baseParams[1],
    cancelable: baseParams[2],
    category: "LockupLinear",
    cliffDuration: baseParams[3],
    cliffPercentage: baseParams[4],
    expiration: baseParams[5],
    ipfsCID: baseParams[7],
    lockup: baseParams[8],
    merkleRoot: baseParams[9],
    minimumFee: event.params.minFeeUSD,
    name: baseParams[0],
    recipientCount: event.params.recipientCount,
    shape: baseParams[10],
    startPercentage: baseParams[11],
    startTime: baseParams[15],
    totalDuration: baseParams[13],
    transferable: baseParams[14],
  };
  await createMerkle({
    context,
    createInStore: Store.Campaign.createLL,
    entities,
    event,
    params,
  });
});
