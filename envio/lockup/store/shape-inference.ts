import { Shape } from "sablier";
import { UD2X18_ONE } from "../../common/constants";
import type { Segment, Tranche } from "../helpers/types";

export type LockupShape = `${Shape.Lockup}`;

/**
 * Map of legacy (non-prefixed) shape names to their canonical prefixed forms.
 * Historically, shapes didn't have prefixes, but now they do.
 */
const SHAPE_NORMALIZATION_MAP: Record<string, LockupShape> = {
  backweighted: Shape.Lockup.TranchedBackweighted,
  cliffExponential: Shape.Lockup.DynamicCliffExponential,
  doubleCliff: Shape.Lockup.DynamicDoubleUnlock,
  doubleUnlock: Shape.Lockup.DynamicDoubleUnlock,
  dynamicDoubleCliff: Shape.Lockup.DynamicDoubleUnlock,
  exponential: Shape.Lockup.DynamicExponential,
  monthly: Shape.Lockup.TranchedMonthly,
  stepper: Shape.Lockup.TranchedStepper,
  timelock: Shape.Lockup.TranchedTimelock,
  unlockCliff: Shape.Lockup.LinearUnlockCliff,
  unlockLinear: Shape.Lockup.LinearUnlockLinear,
};

/**
 * Normalize a shape from an event to its canonical prefixed form.
 * Returns the shape unchanged if it's already in canonical form.
 */
export function normalizeEventShape(shape: string): LockupShape {
  return SHAPE_NORMALIZATION_MAP[shape] ?? (shape as LockupShape);
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
export function inferDynamicShape(segments: Segment[]): LockupShape | undefined {
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
    // Single segment with exponent <= 1.0 (UD2x18) is mathematically linear
    return hasCliff ? Shape.Lockup.Cliff : Shape.Lockup.Linear;
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
