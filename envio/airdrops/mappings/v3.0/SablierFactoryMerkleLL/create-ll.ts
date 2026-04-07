import { isOfficialLockup } from "../../../../common/helpers.js";
import { Contract } from "../../../bindings.js";
import type { Params } from "../../../helpers.js";
import { Store } from "../../../store.js";
import { createMerkle } from "../../common/factory/create-merkle.js";
import { preloadCreateEntities } from "../../common/factory.js";

Contract.Factory.FactoryMerkleLL_v3_0.CreateMerkleLL.contractRegister(({ context, event }) => {
  const lockupAddress = event.params.campaignParams[10];
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
      admin: event.params.campaignParams[8],
      asset: event.params.campaignParams[14],
    },
  });
  if (!result) {
    return;
  }

  const { entities } = result;
  const baseParams = event.params.campaignParams;
  const params: Params.CreateCampaignLL = {
    admin: baseParams[8],
    aggregateAmount: event.params.aggregateAmount,
    asset: baseParams[14],
    campaignAddress: event.params.merkleLL,
    campaignStartTime: baseParams[1],
    cancelable: baseParams[2],
    category: "LockupLinear",
    cliffDuration: baseParams[4],
    cliffPercentage: baseParams[5],
    expiration: baseParams[6],
    ipfsCID: baseParams[9],
    lockup: baseParams[10],
    merkleRoot: baseParams[11],
    minimumFee: event.params.minFeeUSD,
    name: baseParams[0],
    recipientCount: event.params.recipientCount,
    shape: baseParams[12],
    startPercentage: baseParams[13],
    startTime: baseParams[17],
    totalDuration: baseParams[15],
    transferable: baseParams[16],
  };
  await createMerkle({
    context,
    createInStore: Store.Campaign.createLL,
    entities,
    event,
    params,
  });
});
