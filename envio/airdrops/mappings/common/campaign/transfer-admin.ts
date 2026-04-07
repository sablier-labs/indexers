import { zeroAddress } from "viem";
import { Id } from "../../../../common/id.js";
import type {
  SablierMerkleInstant_v2_0_TransferAdmin_handler as Handler_v2_0,
  SablierMerkleVCA_v3_0_TransferAdmin_handler as Handler_v3_0,
  SablierMerkleInstant_v1_3_TransferAdmin_handler as HandlerInstant_v1_3,
  SablierV2MerkleStreamerLL_v1_1_TransferAdmin_handler as HandlerLL_v1_1,
  SablierV2MerkleLL_v1_2_TransferAdmin_handler as HandlerLL_v1_2,
} from "../../../bindings/src/Indexer.gen.js";
import { Store } from "../../../store/index.js";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = HandlerLL_v1_1 & HandlerLL_v1_2 & HandlerInstant_v1_3 & Handler_v2_0 & Handler_v3_0;

const handler: Handler = async ({ context, event }) => {
  // Starting with v1.3, the constructor emits a TransferAdmin event.
  if (event.params.oldAdmin === zeroAddress) {
    return;
  }

  /* -------------------------------- ENTITIES -------------------------------- */
  const campaignId = Id.campaign(event.srcAddress, event.chainId);
  const watcherId = event.chainId.toString();

  const [campaign, watcher] = await Promise.all([
    context.Campaign.get(campaignId),
    context.Watcher.get(watcherId),
  ]);

  if (!campaign) {
    context.log.error("Campaign not saved before this transfer admin event", { campaignId, event });
    return;
  }

  const ensuredWatcher = watcher ?? Store.Watcher.create(event.chainId);
  if (!watcher) {
    context.Watcher.set(ensuredWatcher);
  }

  /* -------------------------------- CAMPAIGN -------------------------------- */
  await Store.Campaign.updateAdmin(context, campaign, event.params.newAdmin);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, ensuredWatcher, {
    campaignId: campaign.id,
    category: "TransferAdmin",
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementActionCounter(context, ensuredWatcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const transferAdmin = { handler };
