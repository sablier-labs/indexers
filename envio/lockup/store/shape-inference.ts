import { Shape } from "sablier";
import { UD2X18_ONE } from "../../common/constants";
import type { Segment, Tranche } from "../helpers/types";

/** Maximum duration (in seconds) for an unlock segment to be considered a timelock. */
const TIMELOCK_MAX_DURATION = 1n;

export type LockupShape = `${Shape.Lockup}`;

/**
 * Map of legacy (non-prefixed) shape names to their canonical prefixed forms.
 * Keys are lowercase with spaces removed for normalized matching.
 * Historically, shapes didn't have prefixes, but now they do.
 */
const SHAPE_NORMALIZATION_MAP: Record<string, LockupShape> = {
  backweighted: Shape.Lockup.TranchedBackweighted,
  cliff: Shape.Lockup.Cliff,
  cliffexponential: Shape.Lockup.DynamicCliffExponential,
  clifflinear: Shape.Lockup.Cliff,
  discreteweekly: Shape.Lockup.TranchedStepper,
  doublecliff: Shape.Lockup.DynamicDoubleUnlock,
  doubleunlock: Shape.Lockup.DynamicDoubleUnlock,
  dynamicdoublecliff: Shape.Lockup.DynamicDoubleUnlock,
  dynamicexponential: Shape.Lockup.DynamicExponential,
  dynamicmonthly: Shape.Lockup.DynamicMonthly,
  dynamicstepper: Shape.Lockup.DynamicStepper,
  dynamictimelock: Shape.Lockup.DynamicTimelock,
  dynamicunlockcliff: Shape.Lockup.DynamicUnlockCliff,
  dynamicunlocklinear: Shape.Lockup.DynamicUnlockLinear,
  exponential: Shape.Lockup.DynamicExponential,
  exponentialdynamic: Shape.Lockup.DynamicExponential,
  linear: Shape.Lockup.Linear,
  monthly: Shape.Lockup.TranchedMonthly,
  stepper: Shape.Lockup.TranchedStepper,
  timelock: Shape.Lockup.TranchedTimelock,
  unlockcliff: Shape.Lockup.LinearUnlockCliff,
  unlocklinear: Shape.Lockup.LinearUnlockLinear,
};

/**
 * Normalize a shape from an event to its canonical prefixed form.
 * Handles uppercase first letters, spaces, and word reordering.
 * Returns the shape unchanged if it's already in canonical form.
 */
export function normalizeEventShape(shape: string): LockupShape | undefined {
  if (!shape) {
    return undefined;
  }
  // Normalize: lowercase and remove spaces for map lookup
  const key = shape.toLowerCase().replace(/ /g, "");
  if (SHAPE_NORMALIZATION_MAP[key]) {
    return SHAPE_NORMALIZATION_MAP[key];
  }
  // For canonical shapes, just lowercase the first character
  const normalized = shape.charAt(0).toLowerCase() + shape.slice(1);
  return normalized as LockupShape;
}

/**
 * Infer the shape of a linear stream based on whether it has a cliff.
 */
export function inferLinearShape(cliff: boolean): LockupShape {
  return cliff ? Shape.Lockup.Cliff : Shape.Lockup.Linear;
}

/**
 * Infer the shape of a dynamic stream based on its segments.
 * Returns undefined if there are no segments.
 */
export function inferDynamicShape(segments: Segment[], startTime: bigint): LockupShape | undefined {
  if (segments.length === 0) {
    return undefined;
  }

  // Detect cliff by finding leading zero-amount segments
  const firstNonZeroIndex = segments.findIndex((seg) => seg.amount > 0n);
  const hasCliff = firstNonZeroIndex > 0;

  // Count non-zero segments and get the exponent of the first non-zero segment
  let nonZeroCount = 0;
  let exponent = 0n;
  for (const seg of segments) {
    if (seg.amount > 0n) {
      nonZeroCount += 1;
      if (nonZeroCount === 1) {
        exponent = seg.exponent;
      }
    }
  }

  if (nonZeroCount === 1) {
    if (exponent > UD2X18_ONE) {
      return hasCliff ? Shape.Lockup.DynamicCliffExponential : Shape.Lockup.DynamicExponential;
    }

    // Detect legacy dynamicTimelock: cliff followed by short unlock duration (≤ 1 second)
    if (hasCliff) {
      const unlockMilestone = segments[firstNonZeroIndex].milestone;
      const prevMilestone = segments[firstNonZeroIndex - 1].milestone;
      const duration = unlockMilestone - prevMilestone;
      if (duration <= TIMELOCK_MAX_DURATION) {
        return Shape.Lockup.DynamicTimelock;
      }
    }

    // Single segment with exponent <= 1.0 (UD2x18) is mathematically linear
    return hasCliff ? Shape.Lockup.Cliff : Shape.Lockup.Linear;
  }

  // Detect DynamicUnlockLinear: 2 segments, both non-zero, seg[0] duration ≤ 1s, seg[1] exponent ≤ UD2X18_ONE
  if (segments.length === 2 && nonZeroCount === 2) {
    const seg0Duration = segments[0].milestone - startTime;
    if (seg0Duration <= TIMELOCK_MAX_DURATION && segments[1].exponent <= UD2X18_ONE) {
      return Shape.Lockup.DynamicUnlockLinear;
    }
  }

  // Detect DynamicUnlockCliff: 4 segments with specific pattern
  if (segments.length === 4) {
    const seg0Amount = segments[0].amount;
    const seg1Amount = segments[1].amount;
    const seg2Amount = segments[2].amount;
    const seg3Amount = segments[3].amount;

    if (seg0Amount > 0n && seg1Amount === 0n && seg2Amount > 0n && seg3Amount > 0n) {
      const seg0Duration = segments[0].milestone - startTime;
      const seg2Duration = segments[2].milestone - segments[1].milestone;
      if (
        seg0Duration <= TIMELOCK_MAX_DURATION &&
        seg2Duration <= TIMELOCK_MAX_DURATION &&
        segments[3].exponent <= UD2X18_ONE
      ) {
        return Shape.Lockup.DynamicUnlockCliff;
      }
    }
  }

  // Detect DynamicMonthly/DynamicStepper: even count > 2, alternating pattern
  // Monthly uses calendar months (variable durations), Stepper uses equal time divisions
  if (
    segments.length > 2 &&
    segments.length % 2 === 0 &&
    isAlternatingStepPattern(segments, startTime)
  ) {
    const allEvenDurationsEqual = areEvenSegmentDurationsEqual(segments, startTime);
    return allEvenDurationsEqual ? Shape.Lockup.DynamicStepper : Shape.Lockup.DynamicMonthly;
  }

  if (segments.length > 1) {
    // Note: We check segments.length, not nonZeroCount, because the protocol enforces depositAmount > 0,
    // meaning at least one segment must have a non-zero amount. Zero-amount segments are only used for cliffs.
    return Shape.Lockup.TranchedBackweighted;
  }

  // Defensive: protocol invariants guarantee at least one non-zero segment when depositAmount > 0,
  // so this path should be unreachable. Return undefined to handle gracefully if invariants are violated.
  return undefined;
}

/**
 * Check if segments follow an alternating step pattern:
 * - Even indices: amount = 0
 * - Odd indices: amount > 0 with duration ≤ 1s
 */
function isAlternatingStepPattern(segments: Segment[], startTime: bigint): boolean {
  for (let i = 0; i < segments.length; i++) {
    if (i % 2 === 0) {
      // Even index: should have zero amount
      if (segments[i].amount !== 0n) {
        return false;
      }
    } else {
      // Odd index: should have non-zero amount
      if (segments[i].amount === 0n) {
        return false;
      }
      // Check if duration is ≤ 1s
      const prevMilestone = i === 0 ? startTime : segments[i - 1].milestone;
      const duration = segments[i].milestone - prevMilestone;
      if (duration > TIMELOCK_MAX_DURATION) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Check if all even-indexed segments have equal durations.
 * Returns true if all even segments have the same duration.
 */
function areEvenSegmentDurationsEqual(segments: Segment[], startTime: bigint): boolean {
  if (segments.length < 2) {
    return true;
  }

  // Calculate duration of first even segment
  const firstDuration = segments[0].milestone - startTime;

  // Check all other even-indexed segments
  for (let i = 2; i < segments.length; i += 2) {
    const duration = segments[i].milestone - segments[i - 1].milestone;
    if (duration !== firstDuration) {
      return false;
    }
  }

  return true;
}

/**
 * Infer the shape of a tranched stream based on its tranches.
 * Returns undefined if there are no tranches.
 */
export function inferTranchedShape(tranches: Tranche[]): LockupShape | undefined {
  const count = tranches.length;
  if (count === 0) {
    return undefined;
  }

  if (count === 1) {
    return Shape.Lockup.TranchedTimelock;
  }

  if (count === 2) {
    return Shape.Lockup.DynamicDoubleUnlock;
  }

  const firstAmount = tranches[0].amount;
  const allEqual = tranches.every((t) => t.amount === firstAmount);
  return allEqual ? Shape.Lockup.TranchedMonthly : Shape.Lockup.TranchedStepper;
}
