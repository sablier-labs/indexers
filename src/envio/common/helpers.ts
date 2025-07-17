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
 * This function converts a Unix timestamp to a "day number" by calculating how many full days have elapsed since
 * the Unix epoch.
 */
export function getDay(timestamp: number): bigint {
  const utcDate = dayjs.unix(timestamp).utc();
  const epochDate = dayjs.unix(0).utc();
  return BigInt(utcDate.diff(epochDate, "day"));
}

/**
 * @see https://github.com/enviodev/hyperindex/issues/446
 */
export function sanitizeString(str: string): string {
  // TODO: remove this once we check that it works without it
  // biome-ignore lint/suspicious/noControlCharactersInRegex: needing to remove null bytes
  return str.replace(/\x00/g, "");
}
