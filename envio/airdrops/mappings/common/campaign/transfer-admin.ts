import { zeroAddress } from "viem";
import { Id } from "../../../../common/id";
import { CommonStore } from "../../../../common/store";
import type { Entity } from "../../../bindings";
import type {
  SablierV2MerkleStreamerLL_v1_1_TransferAdmin_handler as Handler_v1_1,
  SablierV2MerkleLL_v1_2_TransferAdmin_handler as Handler_v1_2,
  SablierMerkleInstant_v1_3_TransferAdmin_handler as Handler_v1_3,
  SablierV2MerkleStreamerLL_v1_1_TransferAdmin_loader as Loader_v1_1,
  SablierV2MerkleLL_v1_2_TransferAdmin_loader as Loader_v1_2,
  SablierMerkleInstant_v1_3_TransferAdmin_loader as Loader_v1_3,
} from "../../../bindings/src/Types.gen";
import { Store } from "../../../store";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */
type LoaderReturn = {
  campaign: Entity.Campaign;
  users: {
    caller?: Entity.User;
    oldAdmin?: Entity.User;
    newAdmin?: Entity.User;
  };
  watcher: Entity.Watcher;
};

type Loader<T> = Loader_v1_1<T> & Loader_v1_2<T> & Loader_v1_3<T>;

export const loader: Loader<LoaderReturn | undefined> = async ({ context, event }) => {
  // Starting with v1.3, the constructor emits a TransferAdmin event.
  if (event.params.oldAdmin === zeroAddress) {
    return undefined;
  }
  const campaignId = Id.campaign(event.srcAddress, event.chainId);
  const watcherId = event.chainId.toString();

  const [campaign, watcher] = await Promise.all([
    context.Campaign.getOrThrow(campaignId),
    context.Watcher.getOrThrow(watcherId),
  ]);

  const users = {
    caller: await context.User.get(Id.user(event.chainId, event.transaction.from)),
    newAdmin: await context.User.get(Id.user(event.chainId, event.params.newAdmin)),
    oldAdmin: await context.User.get(Id.user(event.chainId, event.params.oldAdmin)),
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

type Handler<T> = Handler_v1_1<T> & Handler_v1_2<T> & Handler_v1_3<T>;

const handler: Handler<LoaderReturn | undefined> = async ({ context, event, loaderReturn }) => {
  if (!loaderReturn) {
    return;
  }
  const { campaign, users, watcher } = loaderReturn;

  /* -------------------------------- CAMPAIGN -------------------------------- */
  Store.Campaign.updateAdmin(context, campaign, event.params.newAdmin);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, watcher, {
    campaignId: campaign.id,
    category: "TransferAdmin",
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementActionCounter(context, watcher);

  /* ---------------------------------- USER ---------------------------------- */
  await CommonStore.User.createOrUpdate(context, event, [
    { address: event.transaction.from, entity: users.caller },
    { address: event.params.oldAdmin, entity: users.oldAdmin },
    { address: event.params.newAdmin, entity: users.newAdmin },
  ]);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const transferAdmin = { handler, loader };
