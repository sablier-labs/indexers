import { Id } from "../../../../common/id.js";
import type { SablierMerkleVCA_v3_0_EnableRedistribution_handler } from "../../../bindings/src/Types.js";
import { Store } from "../../../store.js";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = SablierMerkleVCA_v3_0_EnableRedistribution_handler;

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
    context.log.error("Campaign not saved before this enable redistribution event", {
      campaignId,
      event,
    });
    return;
  }

  const ensuredWatcher = watcher ?? Store.Watcher.create(event.chainId);
  if (!watcher) {
    context.Watcher.set(ensuredWatcher);
  }

  /* -------------------------------- CAMPAIGN -------------------------------- */
  Store.Campaign.updateEnableRedistribution(context, campaign);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, ensuredWatcher, {
    campaignId: campaign.id,
    category: "RedistributionEnabled",
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementActionCounter(context, ensuredWatcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const redistributionEnabled = { handler };
