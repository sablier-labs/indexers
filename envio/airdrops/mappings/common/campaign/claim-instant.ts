import { Id } from "../../../../common/id";
import type { SablierMerkleInstant_v1_3_Claim_handler as Handler } from "../../../bindings/src/Types.gen";
import { Store } from "../../../store";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

const handler: Handler = async ({ context, event }) => {
  const activityId = Id.activity(event);
  const campaignId = Id.campaign(event.srcAddress, event.chainId);

  const [activity, campaign, watcher] = await Promise.all([
    context.Activity.get(activityId),
    context.Campaign.getOrThrow(campaignId),
    context.Watcher.getOrThrow(event.chainId.toString()),
  ]);

  if (context.isPreload) {
    return;
  }

  const createdActivity = activity ?? Store.Activity.create(context, event, campaign.id);

  /* -------------------------------- CAMPAIGN -------------------------------- */
  Store.Campaign.updateClaimed(context, campaign, event.params.amount);

  /* -------------------------------- ACTIVITY -------------------------------- */
  Store.Activity.update(context, createdActivity, event.params.amount);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, watcher, {
    campaignId: campaign.id,
    category: "Claim",
    claimAmount: event.params.amount,
    claimIndex: event.params.index,
    claimRecipient: event.params.recipient,
    fee: event.transaction.value,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementActionCounter(context, watcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const claimInstant = { handler };
