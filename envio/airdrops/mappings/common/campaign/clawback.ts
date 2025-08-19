import { Id } from "../../../../common/id";
import { CommonStore } from "../../../../common/store";
import type {
  SablierV2MerkleStreamerLL_v1_1_Clawback_handlerArgs as HandlerArgsLL_v1_1,
  SablierV2MerkleLL_v1_2_Clawback_handlerArgs as HandlerArgsLL_v1_2,
  SablierMerkleLL_v1_3_Clawback_handlerArgs as HandlerArgsLL_v1_3,
  SablierV2MerkleLT_v1_2_Clawback_handlerArgs as HandlerArgsLT_v1_2,
  SablierMerkleLT_v1_3_Clawback_handlerArgs as HandlerArgsLT_v1_3,
  SablierV2MerkleStreamerLL_v1_1_Clawback_loaderArgs as LoaderArgsLL_v1_1,
  SablierV2MerkleLL_v1_2_Clawback_loaderArgs as LoaderArgsLL_v1_2,
  SablierMerkleLL_v1_3_Clawback_loaderArgs as LoaderArgsLL_v1_3,
  SablierV2MerkleLT_v1_2_Clawback_loaderArgs as LoaderArgsLT_v1_2,
  SablierMerkleLT_v1_3_Clawback_loaderArgs as LoaderArgsLT_v1_3,
} from "../../../bindings/src/Types.gen";
import { Store } from "../../../store";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type LoaderArgs = LoaderArgsLL_v1_1 | LoaderArgsLL_v1_2 | LoaderArgsLL_v1_3 | LoaderArgsLT_v1_2 | LoaderArgsLT_v1_3;
type LoaderReturn = Awaited<ReturnType<typeof loader>>;

const loader = async ({ context, event }: LoaderArgs) => {
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

type HandlerArgs =
  | HandlerArgsLL_v1_1<LoaderReturn>
  | HandlerArgsLL_v1_2<LoaderReturn>
  | HandlerArgsLL_v1_3<LoaderReturn>
  | HandlerArgsLT_v1_2<LoaderReturn>
  | HandlerArgsLT_v1_3<LoaderReturn>;

const handler = async ({ context, event, loaderReturn }: HandlerArgs) => {
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
