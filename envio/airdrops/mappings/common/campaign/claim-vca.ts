import { Id } from "../../../../common/id";
import type { SablierMerkleVCA_v2_0_ClaimVCA_handler } from "../../../bindings/src/Types.gen";
import { Store } from "../../../store";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = SablierMerkleVCA_v2_0_ClaimVCA_handler;

const handler: Handler = async ({ context, event }) => {
  /* -------------------------------- ENTITIES -------------------------------- */
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
  Store.Campaign.updateClaimed(context, campaign, event.params.claimAmount);
  Store.Campaign.updateForgoneAmount(context, campaign, event.params.forgoneAmount);

  /* -------------------------------- ACTIVITY -------------------------------- */
  Store.Activity.update(context, createdActivity, event.params.claimAmount);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, watcher, {
    campaignId: campaign.id,
    category: "Claim",
    claimAmount: event.params.claimAmount,
    claimIndex: event.params.index,
    claimRecipient: event.params.recipient,
    claimTo: event.params.to,
    fee: event.transaction.value,
    forgoneAmount: event.params.forgoneAmount,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementActionCounter(context, watcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const claimVCA = { handler };
