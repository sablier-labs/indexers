import fs from "node:fs";
import path from "node:path";
import { Effect, Layer, Logger, ManagedRuntime } from "effect";
import { LOG_FILE_PATH, LOG_LEVEL } from "./constants";
import { parseLogLevel } from "./helpers";

const level = parseLogLevel(LOG_LEVEL);

const consoleLogger = Logger.withLeveledConsole(Logger.prettyLoggerDefault);

const fileLogger = LOG_FILE_PATH
  ? (() => {
      fs.mkdirSync(path.dirname(LOG_FILE_PATH), { recursive: true });
      return Logger.make(({ date, logLevel, message }) => {
        const line = `${date.toISOString()} ${logLevel.label}: ${message}\n`;
        fs.appendFileSync(LOG_FILE_PATH, line);
      });
    })()
  : // biome-ignore lint/suspicious/noEmptyBlockStatements: empty block is fine here
    Logger.make(() => {});

const combined = LOG_FILE_PATH ? Logger.zip(consoleLogger, fileLogger) : consoleLogger;

export const LoggerLayer = Layer.merge(
  Logger.minimumLogLevel(level),
  Logger.replace(Logger.defaultLogger, combined)
);

const runtime = ManagedRuntime.make(LoggerLayer);

export const logger = {
  debug: (msg: string) => runtime.runSync(Effect.logDebug(msg)),
  error: (msg: string) => runtime.runSync(Effect.logError(msg)),
  info: (msg: string) => runtime.runSync(Effect.logInfo(msg)),
  trace: (msg: string) => runtime.runSync(Effect.logTrace(msg)),
  warn: (msg: string) => runtime.runSync(Effect.logWarning(msg)),
} as const;
