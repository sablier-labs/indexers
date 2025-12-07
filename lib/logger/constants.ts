import * as path from "node:path";
import { LogLevel } from "effect";
import { ROOT_DIR } from "../paths";

export const LOG_LEVEL: string = process.env.LOG_LEVEL || "info";
export const LOG_FILE_PATH: string = process.env.LOG_FILE_PATH || path.join(ROOT_DIR, `.logs/${LOG_LEVEL}.log`);

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
