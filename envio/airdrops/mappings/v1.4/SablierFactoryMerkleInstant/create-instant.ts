import { Contract } from "../../../bindings";
import type { Params } from "../../../helpers/types";
import { Store } from "../../../store";
import { createMerkle, Loader } from "../../common/factory/create-merkle";

Contract.Factory.FactoryMerkleInstant_v1_4.CreateMerkleInstant.contractRegister(({ event, context }) => {
  context.addSablierMerkleInstant_v1_4(event.params.merkleInstant);
});

/*
──────────────────────────────────────────────────────────────
[ToDo] Update links
Solidity Event Reference
https://github.com/sablier-labs/airdrops/blob/v1.3/src/types/DataTypes.sol
https://github.com/sablier-labs/airdrops/blob/v1.3/src/interfaces/ISablierMerkleFactory.sol#L29-L35
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
    string campaignName;
    uint40 campaignStartTime;
    uint40 expiration;
    address initialAdmin;
    string ipfsCID;
    bytes32 merkleRoot;
    IERC20 token;
}

──────────────────────────────────────────────────────────────
*/

Contract.Factory.FactoryMerkleInstant_v1_4.CreateMerkleInstant.handlerWithLoader({
  handler: async ({ context, event, loaderReturn }) => {
    const baseParams = event.params.params;
    const params: Params.CreateCampaignBase = {
      admin: baseParams[3],
      aggregateAmount: event.params.aggregateAmount,
      asset: baseParams[6],
      campaignAddress: event.params.merkleInstant,
      campaignStartTime: baseParams[1],
      category: "Instant",
      expiration: baseParams[2],
      ipfsCID: baseParams[4],
      merkleRoot: baseParams[5],
      minimumFee: event.params.minFeeUSD,
      name: baseParams[0],
      recipientCount: event.params.recipientCount,
    };
    await createMerkle({
      context,
      createInStore: Store.Campaign.createInstant,
      event,
      loaderReturn,
      params,
    });
  },
  loader: Loader.create["v1.4"].instant,
});
