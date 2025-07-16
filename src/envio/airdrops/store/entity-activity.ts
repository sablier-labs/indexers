import type { Envio } from "../../common/bindings";
import { getDay } from "../../common/helpers";
import type { Context, Entity } from "../bindings";

export function create(context: Context.Handler, event: Envio.Event, campaignId: string): Entity.Activity {
  const timestamp = event.block.timestamp;
  const day = getDay(timestamp);

  const activity: Entity.Activity = {
    amount: 0n,
    campaign_id: campaignId,
    claims: 0n,
    day: BigInt(day),
    id: `activity-${campaignId}-${day}`,
    timestamp: BigInt(timestamp),
  };

  context.Activity.set(activity);
  return activity;
}

export function update(context: Context.Handler, activity: Entity.Activity, amount: bigint): Entity.Activity {
  const updatedActivity: Entity.Activity = {
    ...activity,
    amount: activity.amount + amount,
    claims: activity.claims + 1n,
  };
  context.Activity.set(updatedActivity);
  return updatedActivity;
}
