import { Contract } from "../../../bindings";
import type { Params } from "../../../helpers/types";
import { Store } from "../../../store";
import { createMerkle, preloadCreateEntities } from "../../common/factory";

Contract.Factory.MerkleFactory_v1_3.CreateMerkleInstant.contractRegister(({ event, context }) => {
  context.addSablierMerkleInstant_v1_3(event.params.merkleInstant);
});

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/airdrops/blob/v1.3/src/types/DataTypes.sol
https://github.com/sablier-labs/airdrops/blob/v1.3/src/interfaces/ISablierMerkleFactory.sol#L29-L35
──────────────────────────────────────────────────────────────

event CreateMerkleInstant(
    ISablierMerkleInstant indexed merkleInstant,
    MerkleBase.ConstructorParams baseParams,
    uint256 aggregateAmount,
    uint256 recipientCount,
    uint256 fee
);

struct ConstructorParams {
    IERC20 token;         [0]
    uint40 expiration;    [1]
    address initialAdmin; [2]
    string ipfsCID;       [3]
    bytes32 merkleRoot;   [4]
    string campaignName;  [5]
    string shape;         [6]
}

──────────────────────────────────────────────────────────────
*/

Contract.Factory.MerkleFactory_v1_3.CreateMerkleInstant.handler(async ({ context, event }) => {
  const baseParams = event.params.baseParams;
  const admin = event.params.baseParams[2];
  const asset = event.params.baseParams[0];
  const result = await preloadCreateEntities({ context, event, params: { admin, asset } });
  if (!result) {
    return;
  }
  const { entities } = result;

  const params: Params.CreateCampaignBase = {
    admin,
    aggregateAmount: event.params.aggregateAmount,
    asset,
    campaignAddress: event.params.merkleInstant,
    category: "Instant",
    expiration: baseParams[1],
    ipfsCID: baseParams[3],
    merkleRoot: baseParams[4],
    minimumFee: event.params.fee,
    name: baseParams[5],
    recipientCount: event.params.recipientCount,
  };
  await createMerkle({
    context,
    createInStore: Store.Campaign.createInstant,
    entities,
    event,
    params,
  });
});
