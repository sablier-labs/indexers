import { isOfficialLockup } from "../../../../common/helpers.js";
import { Contract } from "../../../bindings.js";
import { convertTranches } from "../../../helpers/index.js";
import type { Params } from "../../../helpers/types.js";
import { Store } from "../../../store/index.js";
import { createMerkle } from "../../common/factory/create-merkle.js";
import { preloadCreateEntities } from "../../common/factory/index.js";

Contract.Factory.FactoryMerkleLT_v3_0.CreateMerkleLT.contractRegister(({ context, event }) => {
  const lockupAddress = event.params.campaignParams.lockup;
  if (!isOfficialLockup(context.log, event, lockupAddress)) {
    return;
  }
  const campaignAddress = event.params.merkleLT;
  context.addSablierMerkleLT_v3_0(campaignAddress);
});

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/evm-monorepo/blob/airdrops@v3.0/airdrops/src/types/MerkleLT.sol#L31-L46
https://github.com/sablier-labs/evm-monorepo/blob/airdrops@v3.0/airdrops/src/interfaces/ISablierFactoryMerkleLT.sol#L17-L25
──────────────────────────────────────────────────────────────

event CreateMerkleLT(
    ISablierMerkleLT indexed merkleLT,
    MerkleLT.ConstructorParams campaignParams,
    uint256 aggregateAmount,
    uint256 totalDuration,
    uint256 recipientCount,
    address comptroller,
    uint256 minFeeUSD
);

struct ConstructorParams {
    string campaignName;
    uint40 campaignStartTime;
    bool cancelable;
    ClaimType claimType;
    uint40 expiration;
    address initialAdmin;
    string ipfsCID;
    ISablierLockup lockup;
    bytes32 merkleRoot;
    string shape;
    IERC20 token;
    MerkleLT.TrancheWithPercentage[] tranchesWithPercentages;
    bool transferable;
    uint40 vestingStartTime;
}

struct TrancheWithPercentage {
    UD2x18 unlockPercentage;
    uint40 duration;
}

──────────────────────────────────────────────────────────────
*/

Contract.Factory.FactoryMerkleLT_v3_0.CreateMerkleLT.handler(async ({ context, event }) => {
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
  const params: Params.CreateCampaignLT = {
    admin: baseParams.initialAdmin,
    aggregateAmount: event.params.aggregateAmount,
    asset: baseParams.token,
    campaignAddress: event.params.merkleLT,
    campaignStartTime: baseParams.campaignStartTime,
    cancelable: baseParams.cancelable,
    category: "LockupTranched",
    expiration: baseParams.expiration,
    ipfsCID: baseParams.ipfsCID,
    lockup: baseParams.lockup,
    merkleRoot: baseParams.merkleRoot,
    minimumFee: event.params.minFeeUSD,
    name: baseParams.campaignName,
    recipientCount: event.params.recipientCount,
    shape: baseParams.shape,
    startTime: baseParams.vestingStartTime,
    totalDuration: event.params.totalDuration,
    tranchesWithPercentages: convertTranches(baseParams.tranchesWithPercentages),
    transferable: baseParams.transferable,
  };
  await createMerkle({
    context,
    createInStore: Store.Campaign.createLT,
    entities,
    event,
    params,
  });
});
