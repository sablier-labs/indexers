import { LogLevel } from "effect";
import type { Sablier } from "sablier";

export function formatRelease(release: Sablier.Release) {
  return `${release.protocol} ${release.version}`;
}

export const parseLogLevel = (level: string): LogLevel.LogLevel => {
  const map: Record<string, LogLevel.LogLevel> = {
    debug: LogLevel.Debug,
    error: LogLevel.Error,
    info: LogLevel.Info,
    silly: LogLevel.Trace,
    verbose: LogLevel.Debug,
    warn: LogLevel.Warning,
  };
  return map[level.toLowerCase()] ?? LogLevel.Info;
};
