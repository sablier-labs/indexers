import { zeroAddress } from "viem";
import { Id } from "../../../../common/id";
import { CommonStore } from "../../../../common/store";
import type {
  SablierV2MerkleStreamerLL_v1_1_TransferAdmin_handlerArgs as HandlerArgs_v1_1,
  SablierV2MerkleLL_v1_2_TransferAdmin_handlerArgs as HandlerArgs_v1_2,
  SablierMerkleInstant_v1_3_TransferAdmin_handlerArgs as HandlerArgs_v1_3,
  SablierV2MerkleStreamerLL_v1_1_TransferAdmin_loaderArgs as LoaderArgs_v1_1,
  SablierV2MerkleLL_v1_2_TransferAdmin_loaderArgs as LoaderArgs_v1_2,
  SablierMerkleInstant_v1_3_TransferAdmin_loaderArgs as LoaderArgs_v1_3,
} from "../../../bindings/src/Types.gen";
import { Store } from "../../../store";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type LoaderArgs = LoaderArgs_v1_1 | LoaderArgs_v1_2 | LoaderArgs_v1_3;
type LoaderReturn = Awaited<ReturnType<typeof loader>>;

const loader = async ({ context, event }: LoaderArgs) => {
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

type HandlerArgs = HandlerArgs_v1_1<LoaderReturn> | HandlerArgs_v1_2<LoaderReturn> | HandlerArgs_v1_3<LoaderReturn>;

const handler = async ({ context, event, loaderReturn }: HandlerArgs) => {
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
