import { Id } from "../../../common/id";
import { Contract } from "../../bindings";
import { Store } from "../../store";
import * as common from "../common";

Contract.Campaign.MerkleInstant_v1_3.Clawback.handlerWithLoader(common.clawback);
Contract.Campaign.MerkleInstant_v1_3.TransferAdmin.handlerWithLoader(common.transferAdmin);

// biome-ignore assist/source/useSortedKeys: handler/loader order matters
Contract.Campaign.MerkleInstant_v1_3.Claim.handlerWithLoader({
  loader: async ({ context, event }) => {
    const activityId = Id.activity(event);
    const activity = await context.Activity.get(activityId);

    const campaignId = Id.campaign(event.srcAddress, event.chainId);
    const campaign = await context.Campaign.getOrThrow(campaignId);

    const watcherId = event.chainId.toString();
    const watcher = await context.Watcher.getOrThrow(watcherId);

    return {
      activity,
      campaign,
      watcher,
    };
  },
  handler: async ({ context, event, loaderReturn }) => {
    const { campaign, watcher } = loaderReturn;
    const activity = loaderReturn.activity ?? Store.Activity.create(context, event, campaign.id);

    /* -------------------------------- CAMPAIGN -------------------------------- */
    Store.Campaign.updateClaimed(context, campaign, event.params.amount);

    /* -------------------------------- ACTIVITY -------------------------------- */
    Store.Activity.update(context, activity, event.params.amount);

    /* --------------------------------- ACTION --------------------------------- */
    const actionEntities = {
      campaign,
      watcher,
    };
    Store.Action.create(context, event, actionEntities, {
      category: "Claim",
      claimAmount: event.params.amount,
      claimIndex: event.params.index,
      claimRecipient: event.params.recipient,
      fee: event.transaction.value,
    });

    /* --------------------------------- WATCHER -------------------------------- */
    Store.Watcher.incrementActionCounter(context, watcher);
  },
});
