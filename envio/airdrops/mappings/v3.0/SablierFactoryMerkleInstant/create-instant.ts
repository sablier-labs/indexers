import { Contract } from "../../../bindings.js";
import type { Params } from "../../../helpers/types.js";
import { Store } from "../../../store/index.js";
import { createMerkle } from "../../common/factory/create-merkle.js";
import { preloadCreateEntities } from "../../common/factory/index.js";

Contract.Factory.FactoryMerkleInstant_v3_0.CreateMerkleInstant.contractRegister(
  ({ event, context }) => {
    context.addSablierMerkleInstant_v3_0(event.params.merkleInstant);
  }
);

/*
──────────────────────────────────────────────────────────────
https://github.com/sablier-labs/evm-monorepo/blob/airdrops@v3.0/airdrops/src/types/MerkleInstant.sol#L21-L30
https://github.com/sablier-labs/evm-monorepo/blob/airdrops@v3.0/airdrops/src/interfaces/ISablierFactoryMerkleInstant.sol#L17-L25
──────────────────────────────────────────────────────────────

event CreateMerkleInstant(
    ISablierMerkleInstant indexed merkleInstant,
    MerkleInstant.ConstructorParams campaignParams,
    uint256 aggregateAmount,
    uint256 recipientCount,
    address comptroller,
    uint256 minFeeUSD
);


struct ConstructorParams {
    string campaignName;
    uint40 campaignStartTime;
    ClaimType claimType;
    uint40 expiration;
    address initialAdmin;
    string ipfsCID;
    bytes32 merkleRoot;
    IERC20 token;
}

──────────────────────────────────────────────────────────────
*/

Contract.Factory.FactoryMerkleInstant_v3_0.CreateMerkleInstant.handler(
  async ({ context, event }) => {
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
