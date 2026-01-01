import { BigInt } from "@graphprotocol/graph-ts";
import { ONE, UD2X18_ONE, ZERO } from "../../common/constants";
import { LockupShape } from "../../common/shapes";
import { Segment, Tranche } from "../helpers/types";

/** Maximum duration (in seconds) for an unlock segment to be considered a timelock. */
const TIMELOCK_MAX_DURATION = ONE;

/**
 * Infer the shape of a linear stream based on whether it has a cliff.
 * Detects linearTimelock when cliff is followed by immediate unlock (≤ 1 second).
 */
export function inferLinearShape(
  cliff: boolean,
  cliffTime: BigInt | null,
  endTime: BigInt
): string {
  if (!cliff) {
    return LockupShape.Linear;
  }
  // Detect linearTimelock: cliff followed by immediate unlock (≤ 1 second)
  if (cliffTime !== null && endTime.minus(cliffTime).le(TIMELOCK_MAX_DURATION)) {
    return LockupShape.LinearTimelock;
  }
  return LockupShape.Cliff;
}

/**
 * Infer the shape of a dynamic stream based on its segments.
 * Returns null if there are no segments.
 */
export function inferDynamicShape(segments: Segment[], startTime: BigInt): string | null {
  if (segments.length == 0) {
    return null;
  }

  // Find first non-zero segment index
  let firstNonZeroIndex = -1;
  for (let i = 0; i < segments.length; i++) {
    if (segments[i].amount.gt(ZERO)) {
      firstNonZeroIndex = i;
      break;
    }
  }
  const hasCliff = firstNonZeroIndex > 0;

  // Count non-zero segments and get exponent of first non-zero
  let nonZeroCount = 0;
  let exponent = ZERO;
  for (let i = 0; i < segments.length; i++) {
    if (segments[i].amount.gt(ZERO)) {
      if (nonZeroCount == 0) {
        exponent = segments[i].exponent;
      }
      nonZeroCount++;
    }
  }

  if (nonZeroCount == 1) {
    if (exponent.gt(UD2X18_ONE)) {
      return hasCliff ? LockupShape.DynamicCliffExponential : LockupShape.DynamicExponential;
    }

    // Detect legacy dynamicTimelock: cliff followed by short unlock duration (≤ 1 second)
    if (hasCliff) {
      const unlockMilestone = segments[firstNonZeroIndex].milestone;
      const prevMilestone = segments[firstNonZeroIndex - 1].milestone;
      const duration = unlockMilestone.minus(prevMilestone);
      if (duration.le(TIMELOCK_MAX_DURATION)) {
        return LockupShape.DynamicTimelock;
      }
    }

    // Single segment with exponent <= 1.0 (UD2x18) is mathematically linear
    return hasCliff ? LockupShape.Cliff : LockupShape.Linear;
  }

  // Detect historical dynamic shapes
  const count = segments.length;

  // Detect DynamicUnlockLinear: 2 segments, both non-zero, seg[0] duration ≤ 1s, seg[1] exponent ≤ UD2X18_ONE
  if (count == 2) {
    const seg0 = segments[0];
    const seg1 = segments[1];

    // Both segments must have non-zero amounts
    if (seg0.amount.gt(ZERO) && seg1.amount.gt(ZERO)) {
      const duration0 = seg0.milestone.minus(startTime);

      // DynamicUnlockLinear: first segment duration ≤ 1 second, second segment is linear
      if (duration0.le(TIMELOCK_MAX_DURATION) && !seg1.exponent.gt(UD2X18_ONE)) {
        return LockupShape.DynamicUnlockLinear;
      }
    }
  }

  // Detect DynamicUnlockCliff: 4 segments with specific pattern
  if (count == 4) {
    const seg0Amount = segments[0].amount;
    const seg1Amount = segments[1].amount;
    const seg2Amount = segments[2].amount;
    const seg3Amount = segments[3].amount;

    // Pattern: non-zero, zero, non-zero, non-zero
    if (
      seg0Amount.gt(ZERO) &&
      seg1Amount.equals(ZERO) &&
      seg2Amount.gt(ZERO) &&
      seg3Amount.gt(ZERO)
    ) {
      const duration0 = segments[0].milestone.minus(startTime);
      const duration2 = segments[2].milestone.minus(segments[1].milestone);

      // DynamicUnlockCliff: seg[0] and seg[2] have short durations (≤ 1s), seg[3] is linear
      if (
        duration0.le(TIMELOCK_MAX_DURATION) &&
        duration2.le(TIMELOCK_MAX_DURATION) &&
        !segments[3].exponent.gt(UD2X18_ONE)
      ) {
        return LockupShape.DynamicUnlockCliff;
      }
    }
  }

  // Detect DynamicMonthly/DynamicStepper: even count > 2, alternating pattern
  // Monthly uses calendar months (variable durations), Stepper uses equal time divisions
  if (count > 2 && count % 2 == 0) {
    // Check alternating pattern: even indices have zero amount, odd indices have non-zero with short duration
    let isAlternatingPattern = true;

    // Check even-indexed segments have zero amount
    for (let i = 0; i < count; i += 2) {
      if (!segments[i].amount.equals(ZERO)) {
        isAlternatingPattern = false;
        break;
      }
    }

    // Check odd-indexed segments have non-zero amount and short duration
    if (isAlternatingPattern) {
      for (let i = 1; i < count; i += 2) {
        if (segments[i].amount.equals(ZERO)) {
          isAlternatingPattern = false;
          break;
        }
        const prevMilestone = segments[i - 1].milestone;
        const duration = segments[i].milestone.minus(prevMilestone);
        if (duration.gt(TIMELOCK_MAX_DURATION)) {
          isAlternatingPattern = false;
          break;
        }
      }
    }

    if (isAlternatingPattern) {
      // Check if all even-indexed segment durations are equal
      // First even segment duration: seg[0].milestone - startTime
      const firstEvenDuration = segments[0].milestone.minus(startTime);
      let allEvenDurationsEqual = true;

      for (let i = 2; i < count; i += 2) {
        const duration = segments[i].milestone.minus(segments[i - 1].milestone);
        if (!duration.equals(firstEvenDuration)) {
          allEvenDurationsEqual = false;
          break;
        }
      }

      // Equal durations = Stepper (equal time divisions), Variable durations = Monthly (calendar months)
      return allEvenDurationsEqual ? LockupShape.DynamicStepper : LockupShape.DynamicMonthly;
    }
  }

  if (segments.length > 1) {
    return LockupShape.Unknown;
  }

  // Defensive: protocol invariants guarantee at least one non-zero segment when depositAmount > 0,
  // so this path should be unreachable. Return null to handle gracefully if invariants are violated.
  return null;
}

/**
 * Infer the shape of a tranched stream based on its tranches.
 * Returns null if there are no tranches.
 */
export function inferTranchedShape(tranches: Tranche[], startTime: BigInt): string | null {
  const count = tranches.length;
  if (count == 0) {
    return null;
  }

  if (count == 1) {
    return LockupShape.TranchedTimelock;
  }

  if (count == 2) {
    return LockupShape.DynamicDoubleUnlock;
  }

  // Calculate first tranche duration (from stream start to first unlock)
  const firstDuration = tranches[0].timestamp.minus(startTime);
  let allDurationsEqual = true;

  // Check if all durations between consecutive tranches are equal
  for (let i = 1; i < count; i++) {
    const duration = tranches[i].timestamp.minus(tranches[i - 1].timestamp);
    if (!duration.equals(firstDuration)) {
      allDurationsEqual = false;
      break;
    }
  }

  // Equal durations = Stepper (equal time divisions), Variable durations = Monthly (calendar months)
  return allDurationsEqual ? LockupShape.TranchedStepper : LockupShape.TranchedMonthly;
}
