import type { Entity } from "../bindings";
import { scale } from "./amounts";

/**
 * Compute the current snapshot amount for a stream.
 * Guards against computing elapsed time before stream starts.
 */
export function computeSnapshotAmount(stream: Entity.Stream, now: bigint): bigint {
  if (now <= stream.startTime) {
    return stream.snapshotAmount;
  }
  const actualAdjustmentTime =
    stream.lastAdjustmentTimestamp > stream.startTime
      ? stream.lastAdjustmentTimestamp
      : stream.startTime;
  const elapsedTime = now - actualAdjustmentTime;
  return stream.snapshotAmount + stream.ratePerSecond * elapsedTime;
}

/**
 * Compute the depletion time for a stream.
 * Returns `now` if stream has debt (available <= notWithdrawn) or rate is zero.
 *
 * Note: v1.0/v1.1 allowed zero rate for adjust events; v2.0+ disallows it.
 * Guard against zero to handle all versions.
 */
export function computeDepletionTime(
  stream: Entity.Stream,
  now: bigint,
  snapshotAmount: bigint,
  ratePerSecond: bigint
): bigint {
  const availableAmount = scale(stream.availableAmount, stream.assetDecimalsValue);
  const withdrawnAmount = scale(stream.withdrawnAmount, stream.assetDecimalsValue);
  const notWithdrawnAmount = snapshotAmount - withdrawnAmount;

  if (availableAmount > notWithdrawnAmount && ratePerSecond > 0n) {
    const extraAmount = availableAmount - notWithdrawnAmount;
    const actualStartTime = now > stream.startTime ? now : stream.startTime;
    return actualStartTime + extraAmount / ratePerSecond;
  }
  return now;
}
