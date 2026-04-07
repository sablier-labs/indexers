import { Id } from "../../../../common/id.js";
import type { SablierMerkleVCA_v3_0_ClaimVCA_handler } from "../../../bindings/src/Indexer.gen.js";
import { Store } from "../../../store/index.js";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = SablierMerkleVCA_v3_0_ClaimVCA_handler;

const handler: Handler = async ({ context, event }) => {
  /* -------------------------------- ENTITIES -------------------------------- */
  const activityId = Id.activity(event);
  const campaignId = Id.campaign(event.srcAddress, event.chainId);

  const [activity, campaign, watcher] = await Promise.all([
    context.Activity.get(activityId),
    context.Campaign.get(campaignId),
    context.Watcher.get(event.chainId.toString()),
  ]);

  if (!campaign) {
    context.log.error("Campaign not saved before this claim VCA event", { campaignId, event });
    return;
  }

  const ensuredWatcher = watcher ?? Store.Watcher.create(event.chainId);
  if (!watcher) {
    context.Watcher.set(ensuredWatcher);
  }

  const createdActivity = activity ?? Store.Activity.create(context, event, campaign.id);

  /* -------------------------------- CAMPAIGN -------------------------------- */
  Store.Campaign.updateClaimed(context, campaign, event.params.claimAmount);
  Store.Campaign.updateForgoneAmount(context, campaign, event.params.forgoneAmount);

  /* -------------------------------- ACTIVITY -------------------------------- */
  Store.Activity.update(context, createdActivity, event.params.claimAmount);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, ensuredWatcher, {
    campaignId: campaign.id,
    category: "Claim",
    claimAmount: event.params.claimAmount,
    claimIndex: event.params.index,
    claimRecipient: event.params.recipient,
    claimTo: event.params.to,
    fee: event.transaction.value,
    vcaForgoneAmount: event.params.forgoneAmount,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementActionCounter(context, ensuredWatcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const claimVCA = { handler };
