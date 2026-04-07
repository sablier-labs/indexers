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
        admin: event.params.campaignParams[4],
        asset: event.params.campaignParams[7],
      },
    });
    if (!result) {
      return;
    }

    const { entities } = result;
    const baseParams = event.params.campaignParams;
    const params: Params.CreateCampaignBase = {
      admin: baseParams[4],
      aggregateAmount: event.params.aggregateAmount,
      asset: baseParams[7],
      campaignAddress: event.params.merkleInstant,
      campaignStartTime: baseParams[1],
      category: "Instant",
      expiration: baseParams[3],
      ipfsCID: baseParams[5],
      merkleRoot: baseParams[6],
      minimumFee: event.params.minFeeUSD,
      name: baseParams[0],
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
