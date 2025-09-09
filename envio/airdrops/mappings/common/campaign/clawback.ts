import { Id } from "../../../../common/id";
import type {
  SablierMerkleInstant_v1_3_Clawback_handler as HandlerInstant_v1_3,
  SablierMerkleInstant_v1_4_Clawback_handler as HandlerInstant_v1_4,
  SablierV2MerkleStreamerLL_v1_1_Clawback_handler as HandlerLL_v1_1,
  SablierV2MerkleLL_v1_2_Clawback_handler as HandlerLL_v1_2,
  SablierMerkleLL_v1_3_Clawback_handler as HandlerLL_v1_3,
  SablierMerkleLL_v1_4_Clawback_handler as HandlerLL_v1_4,
  SablierV2MerkleLT_v1_2_Clawback_handler as HandlerLT_v1_2,
  SablierMerkleLT_v1_3_Clawback_handler as HandlerLT_v1_3,
    SablierMerkleLT_v1_4_Clawback_handler as HandlerLT_v1_4,
} from "../../../bindings/src/Types.gen";
import { Store } from "../../../store";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = HandlerLL_v1_1 & HandlerLL_v1_2 & HandlerLL_v1_3 & HandlerLL_v1_4 & HandlerLT_v1_2 & HandlerLT_v1_3   HandlerLT_v1_4 &
  HandlerInstant_v1_3 &
  HandlerInstant_v1_4;

const handler: Handler = async ({ context, event }) => {
  // Load entities for actual processing
  /* -------------------------------- ENTITIES -------------------------------- */
  const campaignId = Id.campaign(event.srcAddress, event.chainId);
  const watcherId = event.chainId.toString();

  const [campaign, watcher] = await Promise.all([
    context.Campaign.getOrThrow(campaignId),
    context.Watcher.getOrThrow(watcherId),
  ]);

  if (context.isPreload) {
    return;
  }

  /* -------------------------------- CAMPAIGN -------------------------------- */
  Store.Campaign.updateClawback(context, event, campaign);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, watcher, {
    campaignId: campaign.id,
    category: "Clawback",
    clawbackAmount: event.params.amount,
    clawbackFrom: event.params.admin,
    clawbackTo: event.params.to,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementActionCounter(context, watcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const clawback = { handler };
