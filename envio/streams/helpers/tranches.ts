import type { Tranche } from "./lockup-types.js";

export function convertTranches(
  eventTranches: readonly { readonly amount: bigint; readonly timestamp: bigint }[]
) {
  const tranches: Tranche[] = [];
  for (const eventTranche of eventTranches) {
    tranches.push({ amount: eventTranche.amount, timestamp: eventTranche.timestamp });
  }
  return tranches;
}
