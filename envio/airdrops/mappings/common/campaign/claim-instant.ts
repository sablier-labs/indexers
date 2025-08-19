import { Id } from "../../../../common/id";
import { CommonStore } from "../../../../common/store";
import type {
  SablierMerkleInstant_v1_3_Claim_handlerArgs,
  SablierMerkleInstant_v1_3_Claim_loaderArgs,
} from "../../../bindings/src/Types.gen";
import { Store } from "../../../store";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type LoaderArgs = SablierMerkleInstant_v1_3_Claim_loaderArgs;
type LoaderReturn = Awaited<ReturnType<typeof loader>>;

const loader = async ({ context, event }: LoaderArgs) => {
  const activityId = Id.activity(event);
  const campaignId = Id.campaign(event.srcAddress, event.chainId);
  const revenueId = Id.revenue(event.chainId, event.block.timestamp);

  const [activity, campaign, revenue, watcher] = await Promise.all([
    context.Activity.get(activityId),
    context.Campaign.getOrThrow(campaignId),
    context.Revenue.get(revenueId),
    context.Watcher.getOrThrow(event.chainId.toString()),
  ]);

  const [caller, recipient] = await Promise.all([
    context.User.get(Id.user(event.chainId, event.transaction.from)),
    context.User.get(Id.user(event.chainId, event.params.recipient)),
  ]);

  return {
    activity,
    campaign,
    revenue,
    users: { caller, recipient },
    watcher,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type HandlerArgs = SablierMerkleInstant_v1_3_Claim_handlerArgs<LoaderReturn>;

const handler = async ({ context, event, loaderReturn }: HandlerArgs) => {
  const { campaign, revenue, users, watcher } = loaderReturn;
  const activity = loaderReturn.activity ?? Store.Activity.create(context, event, campaign.id);

  /* -------------------------------- CAMPAIGN -------------------------------- */
  Store.Campaign.updateClaimed(context, campaign, event.params.amount);

  /* -------------------------------- ACTIVITY -------------------------------- */
  Store.Activity.update(context, activity, event.params.amount);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, watcher, {
    campaignId: campaign.id,
    category: "Claim",
    claimAmount: event.params.amount,
    claimIndex: event.params.index,
    claimRecipient: event.params.recipient,
    fee: event.transaction.value,
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

export const claimInstant = { handler, loader };
