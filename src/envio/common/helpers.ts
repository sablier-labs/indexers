/**
 * This function converts a Unix timestamp to a "day number" by calculating how many full days have elapsed since
 * the Unix epoch.
 */
export function getDay(timestamp: number): bigint {
  // 60 seconds * 60 minutes * 24 hours
  return BigInt(timestamp) / (60n * 60n * 24n);
}

/**
 * @see https://github.com/enviodev/hyperindex/issues/446
 */
export function sanitizeString(str: string): string {
  // TODO: remove this once we upgrade to envio 2.25.1
  // biome-ignore lint/suspicious/noControlCharactersInRegex: needing to remove null bytes
  return str.replace(/\x00/g, "");
}
