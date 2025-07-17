import { Contract } from "../../bindings";
import { isOfficialLockup, type Params } from "../../helpers";
import { Store } from "../../store";
import { createMerkle, Loader } from "../common/factory/create-merkle";

Contract.Factory.MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.contractRegister(({ context, event }) => {
  const lockupAddress = event.params.lockupLinear;
  if (!isOfficialLockup(context.log, event, lockupAddress)) {
    return;
  }
  const campaignAddress = event.params.merkleStreamer;
  context.addSablierV2MerkleStreamerLL_v1_1(campaignAddress);
});

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/v2-periphery/blob/v1.1.1/src/types/DataTypes.sol
https://github.com/sablier-labs/v2-periphery/blob/v1.1.1/src/interfaces/ISablierV2MerkleStreamerFactory.sol#L18-L31
──────────────────────────────────────────────────────────────

event CreateMerkleStreamerLL(
    ISablierV2MerkleStreamerLL merkleStreamer,
    address indexed admin,
    ISablierV2LockupLinear indexed lockupLinear,
    IERC20 indexed asset,
    bytes32 merkleRoot,
    uint40 expiration,
    LockupLinear.Durations streamDurations,
    bool cancelable,
    bool transferable,
    string ipfsCID,
    uint256 aggregateAmount,
    uint256 recipientsCount
);

struct Durations {
    uint40 cliff; [0]
    uint40 total; [1]
}

──────────────────────────────────────────────────────────────
*/

Contract.Factory.MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.handlerWithLoader({
  handler: async ({ context, event, loaderReturn }) => {
    const params: Params.CreateCampaignLL = {
      admin: event.params.admin,
      aggregateAmount: event.params.aggregateAmount,
      asset: event.params.asset,
      campaignAddress: event.params.merkleStreamer,
      cancelable: event.params.cancelable,
      category: "LockupLinear",
      cliffDuration: event.params.streamDurations[0],
      cliffPercentage: undefined,
      expiration: event.params.expiration,
      ipfsCID: event.params.ipfsCID,
      lockup: event.params.lockupLinear,
      merkleRoot: event.params.merkleRoot,
      minimumFee: undefined,
      name: undefined,
      recipientCount: event.params.recipientsCount,
      shape: undefined,
      startPercentage: undefined,
      startTime: undefined, // all v1.1 streams use the claim time as the start time
      totalDuration: event.params.streamDurations[1],
      transferable: event.params.transferable,
    };
    await createMerkle({
      context,
      createInStore: Store.Campaign.createLL,
      event,
      loaderReturn,
      params,
    });
  },
  loader: Loader.create["v1.1"],
});
