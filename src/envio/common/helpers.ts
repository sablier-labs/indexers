/**
 * This function converts a Unix timestamp to a "day number" by calculating how many full days have elapsed since
 * the Unix epoch.
 */
export function getDay(timestamp: number): bigint {
  // 60 seconds * 60 minutes * 24 hours
  return BigInt(timestamp) / (60n * 60n * 24n);
}
