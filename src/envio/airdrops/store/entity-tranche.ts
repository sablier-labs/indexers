import { type Context, type Entity } from "../bindings";
import { type TrancheWithPercentage } from "../helpers/types";

export function createTranchesWithPercentages(
  context: Context.Handler,
  campaign: Entity.Campaign,
  tranches: TrancheWithPercentage[],
): void {
  // The start time of the stream is the first tranche's start time, so we use zero for the initial duration.
  let previous = { duration: 0n, unlockPercentage: 0n };

  for (let i = 0; i < tranches.length; i++) {
    const current = tranches[i];

    const id = `${campaign.id}-${i.toString()}`;
    const tranche: Entity.Tranche = {
      campaign_id: campaign.id,
      duration: current.duration,
      endDuration: previous.duration + current.duration,
      endPercentage: previous.unlockPercentage + current.unlockPercentage,
      id,
      percentage: current.unlockPercentage,
      position: BigInt(i),
      startDuration: previous.duration,
      startPercentage: previous.unlockPercentage,
    };
    context.Tranche.set(tranche);

    previous = current;
  }
}
