import { Id } from "../../../../common/id";
import type { SablierMerkleInstant_v2_0_LowerMinFeeUSD_handler as Handler_v2_0 } from "../../../bindings/src/Types.gen";
import { Store } from "../../../store";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = Handler_v2_0;

/**
 * We do not check for equality of the previous and new minimum fee USD because it is not possible to emit
 * this event without a lower minimum fee.
 * @see https://github.com/sablier-labs/airdrops/blob/v2.0/src/abstracts/SablierMerkleBase.sol#L177-L180
 */
const handler: Handler = async ({ context, event }) => {
  /* -------------------------------- ENTITIES -------------------------------- */
  const campaignId = Id.campaign(event.srcAddress, event.chainId);
  const watcherId = event.chainId.toString();

  const [campaign, watcher] = await Promise.all([
    context.Campaign.get(campaignId),
    context.Watcher.get(watcherId),
  ]);

  if (context.isPreload) {
    return;
  }

  if (!campaign) {
    context.log.error("Campaign not saved before this lower min fee event", { campaignId, event });
    return;
  }

  const ensuredWatcher = watcher ?? Store.Watcher.create(event.chainId);
  if (!watcher) {
    context.Watcher.set(ensuredWatcher);
  }

  /* -------------------------------- CAMPAIGN -------------------------------- */
  Store.Campaign.updateFee(context, campaign, event.params.newMinFeeUSD);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, ensuredWatcher, {
    campaignId: campaign.id,
    category: "LowerMinFeeUSD",
    fee: event.params.newMinFeeUSD,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementActionCounter(context, ensuredWatcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const lowerMinFeeUSD = { handler };
