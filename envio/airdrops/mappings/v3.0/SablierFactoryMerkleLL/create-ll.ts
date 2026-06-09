import { isOfficialLockup } from "../../../../common/helpers.js";
import { Contract } from "../../../bindings.js";
import type { Params } from "../../../helpers/index.js";
import { Store } from "../../../store/index.js";
import { createMerkle } from "../../common/factory/create-merkle.js";
import { preloadCreateEntities } from "../../common/factory/index.js";

Contract.Factory.FactoryMerkleLL_v3_0.CreateMerkleLL.contractRegister(({ context, event }) => {
  const lockupAddress = event.params.campaignParams.lockup;
  if (!isOfficialLockup(context.log, event, lockupAddress)) {
    return;
  }
  const campaignAddress = event.params.merkleLL;
  context.addSablierMerkleLL_v3_0(campaignAddress);
});

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/evm-monorepo/blob/airdrops@v3.0/airdrops/src/types/MerkleLL.sol#L37-L56
https://github.com/sablier-labs/evm-monorepo/blob/airdrops@v3.0/airdrops/src/interfaces/ISablierFactoryMerkleLL.sol#L17-L24
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
    string campaignName;
    uint40 campaignStartTime;
    bool cancelable;
    ClaimType claimType;
    uint40 cliffDuration;
    UD60x18 cliffUnlockPercentage;
    uint40 expiration;
    uint40 granularity;
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

Contract.Factory.FactoryMerkleLL_v3_0.CreateMerkleLL.handler(async ({ context, event }) => {
  const result = await preloadCreateEntities({
    context,
    event,
    params: {
      admin: event.params.campaignParams.initialAdmin,
      asset: event.params.campaignParams.token,
    },
  });
  if (!result) {
    return;
  }

  const { entities } = result;
  const baseParams = event.params.campaignParams;
  const params: Params.CreateCampaignLL = {
    admin: baseParams.initialAdmin,
    aggregateAmount: event.params.aggregateAmount,
    asset: baseParams.token,
    campaignAddress: event.params.merkleLL,
    campaignStartTime: baseParams.campaignStartTime,
    cancelable: baseParams.cancelable,
    category: "LockupLinear",
    cliffDuration: baseParams.cliffDuration,
    cliffPercentage: baseParams.cliffUnlockPercentage,
    expiration: baseParams.expiration,
    ipfsCID: baseParams.ipfsCID,
    lockup: baseParams.lockup,
    merkleRoot: baseParams.merkleRoot,
    minimumFee: event.params.minFeeUSD,
    name: baseParams.campaignName,
    recipientCount: event.params.recipientCount,
    shape: baseParams.shape,
    startPercentage: baseParams.startUnlockPercentage,
    startTime: baseParams.vestingStartTime,
    totalDuration: baseParams.totalDuration,
    transferable: baseParams.transferable,
  };
  await createMerkle({
    context,
    createInStore: Store.Campaign.createLL,
    entities,
    event,
    params,
  });
});
