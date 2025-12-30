import { DateTime } from "effect";

/**
 * This function converts a Unix timestamp to a date in the format YYYY-MM-DD.
 * @param timestampInSeconds - The Unix timestamp to convert, in seconds.
 * @returns The date in the format YYYY-MM-DD.
 */
export function getDate(timestampInSeconds: number): string {
  const dt = DateTime.unsafeMake(timestampInSeconds * 1000);
  return DateTime.formatIsoDateUtc(dt);
}

export function getDateTimestamp(timestampInSeconds: number): Date {
  const dt = DateTime.unsafeMake(timestampInSeconds * 1000);
  return DateTime.toDateUtc(DateTime.startOf(dt, "day"));
}

/**
 * This function converts a Unix timestamp to a Date object, preserving the full timestamp (hours, minutes, seconds).
 * @param timestampInSeconds - The Unix timestamp to convert, in seconds.
 * @returns The Date object with the full timestamp.
 */
export function getTimestamp(timestampInSeconds: number): Date {
  return DateTime.toDateUtc(DateTime.unsafeMake(timestampInSeconds * 1000));
}

/**
 * This function converts a Unix timestamp to a "day number" by calculating how many full days have elapsed since
 * the Unix epoch.
 */
export function getDay(timestamp: number): bigint {
  return BigInt(timestamp) / (60n * 60n * 24n); // 60 seconds * 60 minutes * 24 hours
}

/**
 * This function converts a Unix timestamp to a month in the format YYYY-MM.
 * @param timestampInSeconds - The Unix timestamp to convert, in seconds.
 * @returns The month in the format YYYY-MM.
 */
export function getMonth(timestampInSeconds: number): string {
  const dt = DateTime.unsafeMake(timestampInSeconds * 1000);
  const parts = DateTime.toPartsUtc(dt);
  return `${parts.year}-${String(parts.month).padStart(2, "0")}`;
}

/**
 * Check if a date string (YYYY-MM-DD format) is today in UTC.
 */
export function isToday(date: string): boolean {
  const input = DateTime.unsafeMake(date);
  const now = DateTime.unsafeNow();
  const inputDate = DateTime.formatIsoDateUtc(input);
  const todayDate = DateTime.formatIsoDateUtc(now);
  return inputDate === todayDate;
}

/**
 * This function converts a Unix timestamp to the first day of that month at 00:00:00.
 * @param timestampInSeconds - The Unix timestamp to convert, in seconds.
 * @returns The Date object representing the first day of the month at 00:00:00.
 */
export function getMonthTimestamp(timestampInSeconds: number): Date {
  const dt = DateTime.unsafeMake(timestampInSeconds * 1000);
  return DateTime.toDateUtc(DateTime.startOf(dt, "month"));
}
