import { Contract } from "../../../bindings.js";
import type { Params } from "../../../helpers/types.js";
import { Store } from "../../../store/index.js";
import { createMerkle } from "../../common/factory/create-merkle.js";
import { preloadCreateEntities } from "../../common/factory/index.js";

Contract.Factory.FactoryMerkleInstant_v2_0.CreateMerkleInstant.contractRegister(
  ({ event, context }) => {
    context.addSablierMerkleInstant_v2_0(event.params.merkleInstant);
  }
);

/*
──────────────────────────────────────────────────────────────
https://github.com/sablier-labs/airdrops/blob/v2.0/src/types/DataTypes.sol#L22-L30
https://github.com/sablier-labs/airdrops/blob/v2.0/src/interfaces/ISablierFactoryMerkleInstant.sol#L17-L24
──────────────────────────────────────────────────────────────

event CreateMerkleInstant(
    ISablierMerkleInstant indexed merkleInstant,
    MerkleInstant.ConstructorParams params,
    uint256 aggregateAmount,
    uint256 recipientCount,
    address comptroller,
    uint256 minFeeUSD
);

struct ConstructorParams {
    string campaignName;      [0]
    uint40 campaignStartTime; [1]
    uint40 expiration;        [2]
    address initialAdmin;     [3]
    string ipfsCID;           [4]
    bytes32 merkleRoot;       [5]
    IERC20 token;             [6]
}

──────────────────────────────────────────────────────────────
*/

Contract.Factory.FactoryMerkleInstant_v2_0.CreateMerkleInstant.handler(
  async ({ context, event }) => {
    const result = await preloadCreateEntities({
      context,
      event,
      params: {
        admin: event.params.params.initialAdmin,
        asset: event.params.params.token,
      },
    });
    if (!result) {
      return;
    }

    const { entities } = result;
    const baseParams = event.params.params;
    const params: Params.CreateCampaignBase = {
      admin: baseParams.initialAdmin,
      aggregateAmount: event.params.aggregateAmount,
      asset: baseParams.token,
      campaignAddress: event.params.merkleInstant,
      campaignStartTime: baseParams.campaignStartTime,
      category: "Instant",
      expiration: baseParams.expiration,
      ipfsCID: baseParams.ipfsCID,
      merkleRoot: baseParams.merkleRoot,
      minimumFee: event.params.minFeeUSD,
      name: baseParams.campaignName,
      recipientCount: event.params.recipientCount,
    };
    await createMerkle({
      context,
      createInStore: Store.Campaign.createInstant,
      entities,
      event,
      params,
    });
  }
);
