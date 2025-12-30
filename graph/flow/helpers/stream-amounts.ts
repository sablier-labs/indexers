import { BigInt } from "@graphprotocol/graph-ts";
import { ZERO } from "../../common/constants";
import { Stream } from "../bindings/schema";
import { scale } from "./amounts";

/**
 * Compute the current snapshot amount for a stream.
 * Guards against computing elapsed time before stream starts.
 */
export function computeSnapshotAmount(stream: Stream, now: BigInt): BigInt {
  if (!now.gt(stream.startTime)) {
    return stream.snapshotAmount;
  }
  const actualAdjustmentTime = stream.lastAdjustmentTimestamp.gt(stream.startTime)
    ? stream.lastAdjustmentTimestamp
    : stream.startTime;
  const elapsedTime = now.minus(actualAdjustmentTime);
  return stream.snapshotAmount.plus(stream.ratePerSecond.times(elapsedTime));
}

/**
 * Compute the depletion time for a stream.
 * Returns `now` if stream has debt (available <= notWithdrawn) or rate is zero.
 *
 * Note: v1.0/v1.1 allowed zero rate for adjust events; v2.0+ disallows it.
 * Guard against zero to handle all versions.
 */
export function computeDepletionTime(
  stream: Stream,
  now: BigInt,
  snapshotAmount: BigInt,
  ratePerSecond: BigInt
): BigInt {
  const availableAmount = scale(stream.availableAmount, stream.assetDecimalsValue);
  const withdrawnAmount = scale(stream.withdrawnAmount, stream.assetDecimalsValue);
  const notWithdrawnAmount = snapshotAmount.minus(withdrawnAmount);

  if (availableAmount.gt(notWithdrawnAmount) && ratePerSecond.gt(ZERO)) {
    const extraAmount = availableAmount.minus(notWithdrawnAmount);
    const actualStartTime = now.gt(stream.startTime) ? now : stream.startTime;
    return actualStartTime.plus(extraAmount.div(ratePerSecond));
  }
  return now;
}
