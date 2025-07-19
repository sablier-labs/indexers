import type { Segment } from "./types";

export function convertSegments(eventSegments: [bigint, bigint, bigint][]) {
  const segments: Segment[] = [];
  for (const eventSegment of eventSegments) {
    const amount = eventSegment[0];
    const exponent = eventSegment[1];
    const milestone = eventSegment[2];
    segments.push({ amount, exponent, milestone });
  }
  return segments;
}
