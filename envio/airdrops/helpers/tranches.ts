import type { TrancheWithPercentage } from "./types.js";

export function convertTranches(
  eventTranches: readonly { readonly duration: bigint; readonly unlockPercentage: bigint }[]
) {
  const tranches: TrancheWithPercentage[] = [];
  for (const eventTranche of eventTranches) {
    tranches.push({
      duration: eventTranche.duration,
      unlockPercentage: eventTranche.unlockPercentage,
    });
  }
  return tranches;
}
