import { Id } from "../../../../common/id";
import type {
  SablierV2MerkleStreamerLL_v1_1_Claim_handlerArgs as HandlerArgsLL_v1_1,
  SablierV2MerkleLL_v1_2_Claim_handlerArgs as HandlerArgsLL_v1_2,
  SablierMerkleLL_v1_3_Claim_handlerArgs as HandlerArgsLL_v1_3,
  SablierV2MerkleLT_v1_2_Claim_handlerArgs as HandlerArgsLT_v1_2,
  SablierMerkleLT_v1_3_Claim_handlerArgs as HandlerArgsLT_v1_3,
  SablierV2MerkleStreamerLL_v1_1_Claim_loaderArgs as LoaderArgsLL_v1_1,
  SablierV2MerkleLL_v1_2_Claim_loaderArgs as LoaderArgsLL_v1_2,
  SablierMerkleLL_v1_3_Claim_loaderArgs as LoaderArgsLL_v1_3,
  SablierV2MerkleLT_v1_2_Claim_loaderArgs as LoaderArgsLT_v1_2,
  SablierMerkleLT_v1_3_Claim_loaderArgs as LoaderArgsLT_v1_3,
} from "../../../bindings/src/Types.gen";
import { isVersionWithFees } from "../../../helpers";
import { Store } from "../../../store";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type LoaderArgs = LoaderArgsLL_v1_1 | LoaderArgsLL_v1_2 | LoaderArgsLL_v1_3 | LoaderArgsLT_v1_2 | LoaderArgsLT_v1_3;
type LoaderReturn = Awaited<ReturnType<typeof loader>>;

const loader = async ({ context, event }: LoaderArgs) => {
  const activityId = Id.activity(event);
  const campaignId = Id.campaign(event.srcAddress, event.chainId);
  const watcherId = event.chainId.toString();

  const [activity, campaign, watcher] = await Promise.all([
    context.Activity.get(activityId),
    context.Campaign.getOrThrow(campaignId),
    context.Watcher.getOrThrow(watcherId),
  ]);

  const factory = await context.Factory.getOrThrow(campaign.factory_id);

  return {
    activity,
    campaign,
    factory,
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
  const { campaign, factory, watcher } = loaderReturn;
  const activity = loaderReturn.activity ?? Store.Activity.create(context, event, campaign.id);

  /* -------------------------------- CAMPAIGN -------------------------------- */
  Store.Campaign.updateClaimed(context, campaign, event.params.amount);

  /* -------------------------------- ACTIVITY -------------------------------- */
  Store.Activity.update(context, activity, event.params.amount);

  /* --------------------------------- ACTION --------------------------------- */
  let fee: bigint | undefined;
  if (isVersionWithFees(event.chainId, factory.address)) {
    fee = event.transaction.value;
  }
  Store.Action.create(context, event, watcher, {
    campaignId: campaign.id,
    category: "Claim",
    claimAmount: event.params.amount,
    claimIndex: event.params.index,
    claimRecipient: event.params.recipient,
    claimStreamId: campaign.lockup ? Id.stream(campaign.lockup, event.chainId, event.params.streamId) : undefined,
    claimTokenId: BigInt(event.params.streamId),
    fee,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Store.Watcher.incrementActionCounter(context, watcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const claimLockup = { handler, loader };
