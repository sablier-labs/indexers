/**
 * @see {@link: file://./../analytics.graphql}
 */
import type { Envio } from "../../common/bindings";
import { getMonth, getMonthTimestamp, getTimestamp } from "../../common/time";
import type { Entity, HandlerContext } from "../bindings";
import { Id } from "../helpers";

export async function trackMonthlyActiveUser(
  context: HandlerContext,
  event: Envio.Event,
  userAddress: string,
): Promise<void> {
  // Stop if it's the preload phase
  if (context.isPreload) {
    return;
  }

  const month = getMonth(event.block.timestamp);

  // Check if this user+month combination has already been counted (persistent check)
  const activityId = Id.userActivityMonth(userAddress, event.block.timestamp);
  const existingActivity = await context.UserActivityMonth.get(activityId);

  if (existingActivity) {
    // This user was already counted for this month
    return;
  }

  // Load the monthly entity
  const monthlyId = Id.usersActiveMonthly(event.block.timestamp);
  let monthly = await context.UsersActiveMonthly.get(monthlyId);

  if (monthly) {
    // Increment the count
    monthly = {
      ...monthly,
      count: monthly.count + 1n,
    };
    context.UsersActiveMonthly.set(monthly);
  } else {
    // Create new monthly entity
    const monthlyEntity: Entity.UsersActiveMonthly = {
      count: 1n,
      id: monthlyId,
      month,
      monthTimestamp: getMonthTimestamp(event.block.timestamp),
    };
    context.UsersActiveMonthly.set(monthlyEntity);
  }

  // Create the activity record to prevent double-counting
  const activityEntity: Entity.UserActivityMonth = {
    firstActivityTimestamp: getTimestamp(event.block.timestamp),
    id: activityId,
    month,
    userAddress: userAddress.toLowerCase(),
  };
  context.UserActivityMonth.set(activityEntity);
}
