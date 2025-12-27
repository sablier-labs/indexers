import { BigInt, ethereum } from "@graphprotocol/graph-ts";
import { ONE } from "../../common/constants";
import { getDay } from "../../common/helpers";
import { Id } from "../../common/id";
import * as Entity from "../bindings/schema";

export function createOrUpdateActivity(
  event: ethereum.Event,
  campaign: Entity.Campaign,
  amount: BigInt
): Entity.Activity {
  const timestamp = event.block.timestamp;
  const day = getDay(timestamp);
  const id = Id.activity(event);

  let activity = Entity.Activity.load(id);
  if (activity === null) {
    activity = new Entity.Activity(id);
    activity.amount = amount;
    activity.campaign = campaign.id;
    activity.claims = ONE;
    activity.day = day;
    activity.timestamp = timestamp;
  } else {
    activity.amount = activity.amount.plus(amount);
    activity.claims = activity.claims.plus(ONE);
  }

  activity.save();
  return activity;
}
