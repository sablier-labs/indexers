/**
 * @see {@link: file://./../analytics.graphql}
 */
import type { Envio } from "../../common/bindings";
import { getMonth, getMonthTimestamp } from "../../common/time";
import type { Entity, HandlerContext } from "../bindings";
import { Id } from "../helpers";

// Track user+month combinations we've already counted in this indexing session
const processedUserMonths = new Set<string>();

export async function trackMonthlyActiveUser(
  context: HandlerContext,
  event: Envio.Event,
  userAddress: string,
): Promise<void> {
  const month = getMonth(event.block.timestamp);
  const userMonthKey = `${userAddress}_${month}`;

  // Check if we've already counted this user for this month in this session
  if (processedUserMonths.has(userMonthKey)) {
    return;
  }

  // Load the monthly entity
  const monthlyId = Id.usersActiveMonthly(event.block.timestamp);
  let monthly = await context.UsersActiveMonthly.get(monthlyId);

  // Stop if it's the preload phase
  if (context.isPreload) {
    return;
  }

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

  // Mark this user+month as processed
  processedUserMonths.add(userMonthKey);
}
