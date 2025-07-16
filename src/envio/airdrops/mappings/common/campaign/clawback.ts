import { Id } from "../../../../common/id";
import type { Entity } from "../../../bindings";
import type {
  SablierV2MerkleStreamerLL_v1_1_Clawback_handler as HandlerLL_v1_1,
  SablierV2MerkleLL_v1_2_Clawback_handler as HandlerLL_v1_2,
  SablierMerkleLL_v1_3_Clawback_handler as HandlerLL_v1_3,
  SablierV2MerkleLT_v1_2_Clawback_handler as HandlerLT_v1_2,
  SablierMerkleLT_v1_3_Clawback_handler as HandlerLT_v1_3,
  SablierV2MerkleStreamerLL_v1_1_Clawback_loader as LoaderLL_v1_1,
  SablierV2MerkleLL_v1_2_Clawback_loader as LoaderLL_v1_2,
  SablierMerkleLL_v1_3_Clawback_loader as LoaderLL_v1_3,
  SablierV2MerkleLT_v1_2_Clawback_loader as LoaderLT_v1_2,
  SablierMerkleLT_v1_3_Clawback_loader as LoaderLT_v1_3,
} from "../../../bindings/src/Types.gen";
import { Store } from "../../../store";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */
type LoaderReturn = {
  campaign: Entity.Campaign;
  watcher: Entity.Watcher;
};

type Loader<T> = LoaderLL_v1_1<T> & LoaderLL_v1_2<T> & LoaderLL_v1_3<T> & LoaderLT_v1_2<T> & LoaderLT_v1_3<T>;

const loader: Loader<LoaderReturn> = async ({ context, event }) => {
  const campaignId = Id.campaign(event.srcAddress, event.chainId);
  const campaign = await context.Campaign.getOrThrow(campaignId);

  const watcherId = event.chainId.toString();
  const watcher = await context.Watcher.getOrThrow(watcherId);

  return {
    campaign,
    watcher,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler<T> = HandlerLL_v1_1<T> & HandlerLL_v1_2<T> & HandlerLL_v1_3<T> & HandlerLT_v1_2<T> & HandlerLT_v1_3<T>;

const handler: Handler<LoaderReturn> = async ({ context, event, loaderReturn }) => {
  const { campaign, watcher } = loaderReturn;

  /* -------------------------------- CAMPAIGN -------------------------------- */
  Store.Campaign.updateClawback(context, event, campaign);

  /* --------------------------------- ACTION --------------------------------- */
  const entities = { campaign, watcher };
  Store.Action.create(context, event, entities, {
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

export const clawback = { handler, loader };
