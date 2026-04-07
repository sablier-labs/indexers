import _ from "lodash";
import { Id } from "../../../../common/id.js";
import type {
  SablierMerkleInstant_v1_3_Claim_handler,
  SablierMerkleInstant_v2_0_ClaimInstant_handler,
  SablierMerkleLL_v2_0_ClaimLLWithTransfer_handler,
  SablierMerkleLL_v3_0_ClaimLLWithTransfer_handler,
  SablierMerkleLT_v2_0_ClaimLTWithTransfer_handler,
  SablierMerkleLT_v3_0_ClaimLTWithTransfer_handler,
} from "../../../bindings/src/Types.js";
import { Store } from "../../../store.js";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = SablierMerkleInstant_v1_3_Claim_handler &
  SablierMerkleInstant_v2_0_ClaimInstant_handler &
  SablierMerkleLL_v2_0_ClaimLLWithTransfer_handler &
  SablierMerkleLT_v2_0_ClaimLTWithTransfer_handler &
  SablierMerkleLL_v3_0_ClaimLLWithTransfer_handler &
  SablierMerkleLT_v3_0_ClaimLTWithTransfer_handler;

const handler: Handler = async ({ context, event }) => {
  /* -------------------------------- ENTITIES -------------------------------- */
  const activityId = Id.activity(event);
  const campaignId = Id.campaign(event.srcAddress, event.chainId);

  const [activity, campaign, watcher] = await Promise.all([
    context.Activity.get(activityId),
    context.Campaign.get(campaignId),
    context.Watcher.get(event.chainId.toString()),
  ]);

  if (context.isPreload) {
    return;
  }

  if (!campaign) {
    context.log.error("Campaign not saved before this claim instant event", { campaignId, event });
    return;
  }

  const ensuredWatcher = watcher ?? Store.Watcher.create(event.chainId);
  if (!watcher) {
    context.Watcher.set(ensuredWatcher);
  }

  const createdActivity = activity ?? Store.Activity.create(context, event, campaign.id);

  /* -------------------------------- CAMPAIGN -------------------------------- */
  Store.Campaign.updateClaimed(context, campaign, event.params.amount);

  /* -------------------------------- ACTIVITY -------------------------------- */
  Store.Activity.update(context, createdActivity, event.params.amount);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, ensuredWatcher, {
    campaignId: campaign.id,
    category: "Claim",
    claimAmount: event.params.amount,
    claimIndex: event.params.index,
    claimRecipient: event.params.recipient,
    claimTo: _.get(event.params, "to") ?? event.params.recipient,
    fee: event.transaction.value,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementActionCounter(context, ensuredWatcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const claimInstant = { handler };
