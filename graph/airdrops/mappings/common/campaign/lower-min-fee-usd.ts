import { ethereum } from "@graphprotocol/graph-ts";
import { Params } from "../../../helpers/types";
import { Store } from "../../../store";

/**
 * We do not check for equality of the previous and new minimum fee USD because it is not possible to emit
 * this event without a lower minimum fee.
 * @see https://github.com/sablier-labs/airdrops/blob/v2.0/src/abstracts/SablierMerkleBase.sol#L177-L180
 */
export function handleLowerMinFeeUSD(event: ethereum.Event, params: Params.LowerMinFeeUSD): void {
  const campaign = Store.Campaign.get(event.address);
  if (campaign === null) {
    return;
  }

  /* -------------------------------- CAMPAIGN -------------------------------- */
  Store.Campaign.updateFee(campaign, params.newMinFeeUSD);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(event, {
    campaign: campaign.id,
    category: "LowerMinFeeUSD",
    fee: params.newMinFeeUSD,
  } as Params.Action);
}
