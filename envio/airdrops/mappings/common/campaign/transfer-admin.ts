import { zeroAddress } from "viem";
import { Id } from "../../../../common/id";
import type {
  SablierV2MerkleStreamerLL_v1_1_TransferAdmin_handler as HandlerArgs_v1_1,
  SablierV2MerkleLL_v1_2_TransferAdmin_handler as HandlerArgs_v1_2,
  SablierMerkleInstant_v1_3_TransferAdmin_handler as HandlerArgs_v1_3,
} from "../../../bindings/src/Types.gen";
import { Store } from "../../../store";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = HandlerArgs_v1_1 & HandlerArgs_v1_2 & HandlerArgs_v1_3;

const handler: Handler = async ({ context, event }) => {
  // Starting with v1.3, the constructor emits a TransferAdmin event.
  if (event.params.oldAdmin === zeroAddress) {
    return;
  }
  const campaignId = Id.campaign(event.srcAddress, event.chainId);
  const watcherId = event.chainId.toString();

  const [campaign, watcher] = await Promise.all([
    context.Campaign.getOrThrow(campaignId),
    context.Watcher.getOrThrow(watcherId),
  ]);

  // Preload optimization: load entities during preload phase
  if (context.isPreload) {
    return;
  }

  /* -------------------------------- CAMPAIGN -------------------------------- */
  Store.Campaign.updateAdmin(context, campaign, event.params.newAdmin);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, watcher, {
    campaignId: campaign.id,
    category: "TransferAdmin",
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementActionCounter(context, watcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const transferAdmin = { handler };
