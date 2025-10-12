import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

/**
 * This function converts a Unix timestamp to a date in the format YYYY-MM-DD.
 * @param timestampInSeconds - The Unix timestamp to convert, in seconds.
 * @returns The date in the format YYYY-MM-DD.
 */
export function getDate(timestampInSeconds: number): string {
  const utcDate = dayjs.unix(timestampInSeconds).utc();
  return utcDate.format("YYYY-MM-DD");
}

export function getDateTimestamp(timestampInSeconds: number): Date {
  const utcDate = dayjs.unix(timestampInSeconds).utc();
  return utcDate.startOf("day").toDate();
}

/**
 * This function converts a Unix timestamp to a Date object, preserving the full timestamp (hours, minutes, seconds).
 * @param timestampInSeconds - The Unix timestamp to convert, in seconds.
 * @returns The Date object with the full timestamp.
 */
export function getTimestamp(timestampInSeconds: number): Date {
  return dayjs.unix(timestampInSeconds).utc().toDate();
}

/**
 * This function converts a Unix timestamp to a "day number" by calculating how many full days have elapsed since
 * the Unix epoch.
 */
export function getDay(timestamp: number): bigint {
  return BigInt(timestamp) / (60n * 60n * 24n); // 60 seconds * 60 minutes * 24 hours
}
