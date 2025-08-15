import type { TrancheWithPercentage } from "./types";

export function convertTranches(eventTranches: [bigint, bigint][]) {
  const tranches: TrancheWithPercentage[] = [];
  for (const eventTranche of eventTranches) {
    const unlockPercentage = eventTranche[0];
    const duration = eventTranche[1];
    tranches.push({ duration, unlockPercentage });
  }
  return tranches;
}
