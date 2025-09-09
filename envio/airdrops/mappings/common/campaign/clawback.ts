import { Id } from "../../../../common/id";
import { CommonStore } from "../../../../common/store";
import type { Entity } from "../../../bindings";
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
  SablierMerkleInstant_v1_3_Clawback_loader as LoaderInstant_v1_3,
  SablierMerkleInstant_v1_4_Clawback_loader as LoaderInstant_v1_4,
  SablierV2MerkleStreamerLL_v1_1_Clawback_loader as LoaderLL_v1_1,
  SablierV2MerkleLL_v1_2_Clawback_loader as LoaderLL_v1_2,
  SablierMerkleLL_v1_3_Clawback_loader as LoaderLL_v1_3,
  SablierMerkleLL_v1_4_Clawback_loader as LoaderLL_v1_4,
  SablierV2MerkleLT_v1_2_Clawback_loader as LoaderLT_v1_2,
  SablierMerkleLT_v1_3_Clawback_loader as LoaderLT_v1_3,
  SablierMerkleLT_v1_4_Clawback_loader as LoaderLT_v1_4,
} from "../../../bindings/src/Types.gen";
import { Store } from "../../../store";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */
type LoaderReturn = {
  campaign: Entity.Campaign;
  users: {
    admin?: Entity.User;
    caller?: Entity.User;
  };
  watcher: Entity.Watcher;
};

type Loader<T> = LoaderLL_v1_1<T> &
  LoaderLL_v1_2<T> &
  LoaderLL_v1_3<T> &
  LoaderLL_v1_4<T> &
  LoaderLT_v1_2<T> &
  LoaderLT_v1_3<T> &
  LoaderLT_v1_4<T> &
  LoaderInstant_v1_3<T> &
  LoaderInstant_v1_4<T>;

const loader: Loader<LoaderReturn> = async ({ context, event }) => {
  const campaignId = Id.campaign(event.srcAddress, event.chainId);
  const watcherId = event.chainId.toString();

  const [campaign, watcher] = await Promise.all([
    context.Campaign.getOrThrow(campaignId),
    context.Watcher.getOrThrow(watcherId),
  ]);

  const users = {
    admin: await context.User.get(Id.user(event.chainId, event.params.admin)),
    caller: await context.User.get(Id.user(event.chainId, event.transaction.from)),
  };

  return {
    campaign,
    users,
    watcher,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler<T> = HandlerLL_v1_1<T> &
  HandlerLL_v1_2<T> &
  HandlerLL_v1_3<T> &
  HandlerLL_v1_4<T> &
  HandlerLT_v1_2<T> &
  HandlerLT_v1_3<T> &
  HandlerLT_v1_4<T> &
  HandlerInstant_v1_3<T> &
  HandlerInstant_v1_4<T>;

const handler: Handler<LoaderReturn> = async ({ context, event, loaderReturn }) => {
  const { campaign, users, watcher } = loaderReturn;

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

  /* ---------------------------------- USER ---------------------------------- */
  await CommonStore.User.createOrUpdate(context, event, [
    { address: event.transaction.from, entity: users.caller },
    { address: event.params.admin, entity: users.admin },
  ]);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const clawback = { handler, loader };
