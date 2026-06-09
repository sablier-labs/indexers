import type { Segment } from "./lockup-types.js";

type EventSegment = {
  readonly amount: bigint;
  readonly exponent: bigint;
} & ({ readonly milestone: bigint } | { readonly timestamp: bigint });

export function convertSegments(eventSegments: readonly EventSegment[]) {
  const segments: Segment[] = [];
  for (const eventSegment of eventSegments) {
    const amount = eventSegment.amount;
    const exponent = eventSegment.exponent;
    const milestone = "milestone" in eventSegment ? eventSegment.milestone : eventSegment.timestamp;
    segments.push({ amount, exponent, milestone });
  }
  return segments;
}
