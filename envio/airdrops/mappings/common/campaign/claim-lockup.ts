import { Id } from "../../../../common/id";
import type {
  SablierV2MerkleStreamerLL_v1_1_Claim_handler as HandlerLL_v1_1,
  SablierV2MerkleLL_v1_2_Claim_handler as HandlerLL_v1_2,
  SablierMerkleLL_v1_3_Claim_handler as HandlerLL_v1_3,
  SablierV2MerkleLT_v1_2_Claim_handler as HandlerLT_v1_2,
  SablierMerkleLT_v1_3_Claim_handler as HandlerLT_v1_3,
} from "../../../bindings/src/Types.gen";
import { isVersionWithFees } from "../../../helpers";
import { Store } from "../../../store";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = HandlerLL_v1_1 & HandlerLL_v1_2 & HandlerLL_v1_3 & HandlerLT_v1_2 & HandlerLT_v1_3;

const handler: Handler = async ({ context, event }) => {
  /* -------------------------------- ENTITIES -------------------------------- */
  const activityId = Id.activity(event);
  const campaignId = Id.campaign(event.srcAddress, event.chainId);
  const watcherId = event.chainId.toString();

  const [activity, campaign, watcher] = await Promise.all([
    context.Activity.get(activityId),
    context.Campaign.getOrThrow(campaignId),
    context.Watcher.getOrThrow(watcherId),
  ]);

  const factory = await context.Factory.getOrThrow(campaign.factory_id);

  if (context.isPreload) {
    return;
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
  Store.Action.create(context, event, watcher, {
    campaignId: campaign.id,
    category: "Claim",
    claimAmount: event.params.amount,
    claimIndex: event.params.index,
    claimRecipient: event.params.recipient,
    claimStreamId: campaign.lockup ? Id.stream(campaign.lockup, event.chainId, event.params.streamId) : undefined,
    claimTokenId: BigInt(event.params.streamId),
    fee,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementActionCounter(context, watcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const claimLockup = { handler };
