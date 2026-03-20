import { isOfficialLockup } from "../../../../common/helpers";
import { Contract } from "../../../bindings";
import { convertTranches } from "../../../helpers";
import type { Params } from "../../../helpers/types";
import { Store } from "../../../store";
import { preloadCreateEntities } from "../../common/factory";
import { createMerkle } from "../../common/factory/create-merkle";

Contract.Factory.FactoryMerkleLT_v3_0.CreateMerkleLT.contractRegister(({ context, event }) => {
  const lockupAddress = event.params.campaignParams[7];
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
      admin: event.params.campaignParams[5],
      asset: event.params.campaignParams[10],
    },
  });
  if (!result) {
    return;
  }

  const { entities } = result;
  const baseParams = event.params.campaignParams;
  const params: Params.CreateCampaignLT = {
    admin: baseParams[5],
    aggregateAmount: event.params.aggregateAmount,
    asset: baseParams[10],
    campaignAddress: event.params.merkleLT,
    campaignStartTime: baseParams[1],
    cancelable: baseParams[2],
    category: "LockupTranched",
    expiration: baseParams[4],
    ipfsCID: baseParams[6],
    lockup: baseParams[7],
    merkleRoot: baseParams[8],
    minimumFee: event.params.minFeeUSD,
    name: baseParams[0],
    recipientCount: event.params.recipientCount,
    shape: baseParams[9],
    startTime: baseParams[13],
    totalDuration: event.params.totalDuration,
    tranchesWithPercentages: convertTranches(baseParams[11]),
    transferable: baseParams[12],
  };
  await createMerkle({
    context,
    createInStore: Store.Campaign.createLT,
    entities,
    event,
    params,
  });
});
