import { UD2X18_ONE, ZERO } from "../../common/constants";
import { LockupShape } from "../../common/shapes";
import { Segment, Tranche } from "../helpers/types";

/**
 * Infer the shape of a linear stream based on whether it has a cliff.
 */
export function inferLinearShape(cliff: boolean): string {
  return cliff ? LockupShape.Cliff : LockupShape.Linear;
}

/**
 * Infer the shape of a dynamic stream based on its segments.
 * Returns null if there are no segments.
 */
export function inferDynamicShape(segments: Segment[]): string | null {
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
    // Single segment with exponent <= 1.0 (UD2x18) is mathematically linear
    return hasCliff ? LockupShape.Cliff : LockupShape.Linear;
  }

  if (segments.length > 1) {
    // Note: We check segments.length, not nonZeroCount, because the protocol enforces depositAmount > 0,
    // meaning at least one segment must have a non-zero amount. Zero-amount segments are only used for cliffs.
    return LockupShape.TranchedBackweighted;
  }

  // Defensive: protocol invariants guarantee at least one non-zero segment when depositAmount > 0,
  // so this path should be unreachable. Return null to handle gracefully if invariants are violated.
  return null;
}

/**
 * Infer the shape of a tranched stream based on its tranches.
 * Returns null if there are no tranches.
 */
export function inferTranchedShape(tranches: Tranche[]): string | null {
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

  const firstAmount = tranches[0].amount;
  let allEqual = true;
  for (let i = 1; i < count; i++) {
    if (!tranches[i].amount.equals(firstAmount)) {
      allEqual = false;
      break;
    }
  }
  return allEqual ? LockupShape.TranchedMonthly : LockupShape.TranchedStepper;
}
