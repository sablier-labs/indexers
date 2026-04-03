import type { Tranche } from "./lockup-types";

export function convertTranches(eventTranches: [bigint, bigint][]) {
  const tranches: Tranche[] = [];
  for (const eventTranche of eventTranches) {
    const amount = eventTranche[0];
    const timestamp = eventTranche[1];
    tranches.push({ amount, timestamp });
  }
  return tranches;
}
