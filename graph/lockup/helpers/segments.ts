import { BigInt } from "@graphprotocol/graph-ts";
import { CreateLockupDynamicStreamSegmentsStruct as StructSegmentV2_0 } from "../bindings/SablierLockup_v2_0/SablierLockup";
import { CreateLockupDynamicStreamSegmentsStruct as StructSegmentV1_0 } from "../bindings/SablierV2LockupDynamic_v1_0/SablierV2LockupDynamic";
import { CreateLockupDynamicStreamSegmentsStruct as StructSegmentV1_1 } from "../bindings/SablierV2LockupDynamic_v1_1/SablierV2LockupDynamic";
import { CreateLockupDynamicStreamSegmentsStruct as StructSegmentV1_2 } from "../bindings/SablierV2LockupDynamic_v1_2/SablierV2LockupDynamic";
import { Segment } from "./types";

export function convertSegmentsV1_0(eventSegments: StructSegmentV1_0[]): Segment[] {
  return convertSegments<StructSegmentV1_0>(
    eventSegments,
    (segment) => segment.amount,
    (segment) => segment.exponent,
    (segment) => segment.milestone,
  );
}

export function convertSegmentsV1_1(eventSegments: StructSegmentV1_1[]): Segment[] {
  return convertSegments<StructSegmentV1_1>(
    eventSegments,
    (segment) => segment.amount,
    (segment) => segment.exponent,
    (segment) => segment.milestone,
  );
}

/**
 * `milestone` was renamed to `timestamp` in v1.2
 * @see https://github.com/sablier-labs/lockup/releases/tag/v1.2.0
 */
export function convertSegmentsV1_2(eventSegments: StructSegmentV1_2[]): Segment[] {
  return convertSegments<StructSegmentV1_2>(
    eventSegments,
    (segment) => segment.amount,
    (segment) => segment.exponent,
    (segment) => segment.timestamp,
  );
}

export function convertSegmentsV2_0(eventSegments: StructSegmentV2_0[]): Segment[] {
  return convertSegments<StructSegmentV2_0>(
    eventSegments,
    (segment) => segment.amount,
    (segment) => segment.exponent,
    (segment) => segment.timestamp,
  );
}

function convertSegments<T>(
  eventSegments: T[],
  getAmount: (segment: T) => BigInt,
  getExponent: (segment: T) => BigInt,
  getMilestone: (segment: T) => BigInt,
): Segment[] {
  const result: Segment[] = [];

  for (let i = 0; i < eventSegments.length; i++) {
    const eventSegment = eventSegments[i];

    const amount = getAmount(eventSegment);
    const exponent = getExponent(eventSegment);
    const milestone = getMilestone(eventSegment);

    result.push(new Segment(amount, exponent, milestone));
  }

  return result;
}
