import { Shape } from "sablier/evm/shapes";
import { UD2X18_ONE } from "../../common/constants";
import type { Segment, Tranche } from "../helpers/types";

export type LockupShape = `${Shape.Lockup}`;

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
      nonZeroCount++;
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
    return Shape.Lockup.Backweighted;
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
    return Shape.Lockup.Timelock;
  }

  if (count === 2) {
    return Shape.Lockup.DoubleUnlock;
  }

  const firstAmount = tranches[0].amount;
  const allEqual = tranches.every((t) => t.amount === firstAmount);
  return allEqual ? Shape.Lockup.Monthly : Shape.Lockup.Stepper;
}
