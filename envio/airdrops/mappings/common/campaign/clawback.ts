import { Id } from "../../../../common/id.js";
import type {
  SablierMerkleInstant_v1_3_Clawback_handler as HandlerInstant_v1_3,
  SablierMerkleInstant_v2_0_Clawback_handler as HandlerInstant_v2_0,
  SablierV2MerkleStreamerLL_v1_1_Clawback_handler as HandlerLL_v1_1,
  SablierV2MerkleLL_v1_2_Clawback_handler as HandlerLL_v1_2,
  SablierMerkleLL_v1_3_Clawback_handler as HandlerLL_v1_3,
  SablierMerkleLL_v2_0_Clawback_handler as HandlerLL_v2_0,
  SablierMerkleLL_v3_0_Clawback_handler as HandlerLL_v3_0,
  SablierV2MerkleLT_v1_2_Clawback_handler as HandlerLT_v1_2,
  SablierMerkleLT_v1_3_Clawback_handler as HandlerLT_v1_3,
  SablierMerkleLT_v2_0_Clawback_handler as HandlerLT_v2_0,
  SablierMerkleLT_v3_0_Clawback_handler as HandlerLT_v3_0,
  SablierMerkleVCA_v3_0_Clawback_handler as HandlerVCA_v3_0,
} from "../../../bindings/src/Indexer.gen.js";
import { Store } from "../../../store/index.js";

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
  HandlerLT_v3_0 &
  HandlerInstant_v1_3 &
  HandlerInstant_v2_0 &
  HandlerVCA_v3_0;

const handler: Handler = async ({ context, event }) => {
  // Load entities for actual processing
  /* -------------------------------- ENTITIES -------------------------------- */
  const campaignId = Id.campaign(event.srcAddress, event.chainId);
  const watcherId = event.chainId.toString();

  const [campaign, watcher] = await Promise.all([
    context.Campaign.get(campaignId),
    context.Watcher.get(watcherId),
  ]);

  if (!campaign) {
    context.log.error("Campaign not saved before this clawback event", { campaignId, event });
    return;
  }

  const ensuredWatcher = watcher ?? Store.Watcher.create(event.chainId);
  if (!watcher) {
    context.Watcher.set(ensuredWatcher);
  }

  /* -------------------------------- CAMPAIGN -------------------------------- */
  Store.Campaign.updateClawback(context, event, campaign);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, ensuredWatcher, {
    campaignId: campaign.id,
    category: "Clawback",
    clawbackAmount: event.params.amount,
    clawbackFrom: event.params.admin,
    clawbackTo: event.params.to,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementActionCounter(context, ensuredWatcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const clawback = { handler };
