import _ from "lodash";
import { Id } from "../../../../common/id.js";
import type {
  SablierV2MerkleStreamerLL_v1_1_Claim_handler as HandlerLL_v1_1,
  SablierV2MerkleLL_v1_2_Claim_handler as HandlerLL_v1_2,
  SablierMerkleLL_v1_3_Claim_handler as HandlerLL_v1_3,
  SablierMerkleLL_v2_0_ClaimLLWithVesting_handler as HandlerLL_v2_0,
  SablierMerkleLL_v3_0_ClaimLLWithVesting_handler as HandlerLL_v3_0,
  SablierV2MerkleLT_v1_2_Claim_handler as HandlerLT_v1_2,
  SablierMerkleLT_v1_3_Claim_handler as HandlerLT_v1_3,
  SablierMerkleLT_v2_0_ClaimLTWithVesting_handler as HandlerLT_v2_0,
  SablierMerkleLT_v3_0_ClaimLTWithVesting_handler as HandlerLT_v3_0,
} from "../../../bindings/src/Types.js";
import { isVersionWithFees } from "../../../helpers.js";
import { Store } from "../../../store.js";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = HandlerLL_v1_1 &
  HandlerLL_v1_2 &
  HandlerLL_v1_3 &
  HandlerLL_v2_0 &
  HandlerLL_v3_0 &
  HandlerLT_v1_2 &
  HandlerLT_v1_3 &
  HandlerLT_v2_0 &
  HandlerLT_v3_0;

const handler: Handler = async ({ context, event }) => {
  /* -------------------------------- ENTITIES -------------------------------- */
  const activityId = Id.activity(event);
  const campaignId = Id.campaign(event.srcAddress, event.chainId);
  const watcherId = event.chainId.toString();

  const [activity, campaign, watcher] = await Promise.all([
    context.Activity.get(activityId),
    context.Campaign.get(campaignId),
    context.Watcher.get(watcherId),
  ]);

  if (context.isPreload) {
    return;
  }

  if (!campaign) {
    context.log.error("Campaign not saved before this claim lockup event", { campaignId, event });
    return;
  }

  const factory = await context.Factory.get(campaign.factory_id);
  if (!factory) {
    context.log.error("Factory not saved before this claim lockup event", {
      campaignId,
      event,
      factoryId: campaign.factory_id,
    });
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
  let fee: bigint | undefined;
  if (isVersionWithFees(event.chainId, factory.address)) {
    fee = event.transaction.value;
  }
  Store.Action.create(context, event, ensuredWatcher, {
    campaignId: campaign.id,
    category: "Claim",
    claimAmount: event.params.amount,
    claimIndex: event.params.index,
    claimRecipient: event.params.recipient,
    claimStreamId: campaign.lockup
      ? Id.stream(campaign.lockup, event.chainId, event.params.streamId)
      : undefined,
    claimTo: _.get(event.params, "to") ?? event.params.recipient,
    claimTokenId: BigInt(event.params.streamId),
    fee,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementActionCounter(context, ensuredWatcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const claimLockup = { handler };
