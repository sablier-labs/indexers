import { zeroAddress } from "viem";
import { Id } from "../../../../common/id";
import type {
  SablierMerkleInstant_v1_3_TransferAdmin_handler as HandlerInstant_v1_3,
  SablierV2MerkleStreamerLL_v1_1_TransferAdmin_handler as HandlerLL_v1_1,
  SablierV2MerkleLL_v1_2_TransferAdmin_handler as HandlerLL_v1_2,
} from "../../../bindings/src/Types.gen";
import { Store } from "../../../store";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = HandlerLL_v1_1 & HandlerLL_v1_2 & HandlerInstant_v1_3;

const handler: Handler = async ({ context, event }) => {
  // Starting with v1.3, the constructor emits a TransferAdmin event.
  if (event.params.oldAdmin === zeroAddress) {
    return;
  }

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
