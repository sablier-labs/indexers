import { Id } from "../../../../common/id";
import { CommonStore } from "../../../../common/store";
import type { Entity } from "../../../bindings";
import type {
  SablierV2MerkleStreamerLL_v1_1_Claim_handler as HandlerLL_v1_1,
  SablierV2MerkleLL_v1_2_Claim_handler as HandlerLL_v1_2,
  SablierMerkleLL_v1_3_Claim_handler as HandlerLL_v1_3,
  SablierV2MerkleLT_v1_2_Claim_handler as HandlerLT_v1_2,
  SablierMerkleLT_v1_3_Claim_handler as HandlerLT_v1_3,
  SablierV2MerkleStreamerLL_v1_1_Claim_loader as LoaderLL_v1_1,
  SablierV2MerkleLL_v1_2_Claim_loader as LoaderLL_v1_2,
  SablierMerkleLL_v1_3_Claim_loader as LoaderLL_v1_3,
  SablierV2MerkleLT_v1_2_Claim_loader as LoaderLT_v1_2,
  SablierMerkleLT_v1_3_Claim_loader as LoaderLT_v1_3,
} from "../../../bindings/src/Types.gen";
import { isVersionWithFees } from "../../../helpers";
import { Store } from "../../../store";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type LoaderReturn = {
  activity?: Entity.Activity;
  campaign: Entity.Campaign;
  factory: Entity.Factory;
  revenue?: Entity.Revenue;
  users: {
    caller?: Entity.User;
    recipient?: Entity.User;
  };
  watcher: Entity.Watcher;
};

type Loader<T> = LoaderLL_v1_1<T> & LoaderLL_v1_2<T> & LoaderLL_v1_3<T> & LoaderLT_v1_2<T> & LoaderLT_v1_3<T>;
const loader: Loader<LoaderReturn> = async ({ context, event }) => {
  const activityId = Id.activity(event);
  const activity = await context.Activity.get(activityId);

  const campaignId = Id.campaign(event.srcAddress, event.chainId);
  const campaign = await context.Campaign.getOrThrow(campaignId);

  const revenueId = Id.revenue(event.chainId, event.block.timestamp);
  const revenue = await context.Revenue.get(revenueId);

  const users = {
    caller: await context.User.get(Id.user(event.chainId, event.transaction.from)),
    recipient: await context.User.get(Id.user(event.chainId, event.params.recipient)),
  };

  const watcherId = event.chainId.toString();
  const watcher = await context.Watcher.getOrThrow(watcherId);

  const factoryId = campaign.factory_id;
  const factory = await context.Factory.getOrThrow(factoryId);

  return {
    activity,
    campaign,
    factory,
    revenue,
    users,
    watcher,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler<T> = HandlerLL_v1_1<T> & HandlerLL_v1_2<T> & HandlerLL_v1_3<T> & HandlerLT_v1_2<T> & HandlerLT_v1_3<T>;

const handler: Handler<LoaderReturn> = async ({ context, event, loaderReturn }) => {
  const { campaign, factory, revenue, users, watcher } = loaderReturn;
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

  /* ---------------------------------- USER ---------------------------------- */
  await CommonStore.User.createOrUpdate(context, event, [
    { address: event.transaction.from, entity: users.caller, isAirdropClaim: true },
    { address: event.params.recipient, entity: users.recipient, isAirdropClaim: true },
  ]);

  /* -------------------------------- REVENUE --------------------------------- */
  await CommonStore.Revenue.createOrUpdate(context, event, revenue);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const claimLockup = { handler, loader };
