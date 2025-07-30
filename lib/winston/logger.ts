/**
 * @file Winston logger instance with console and optional file transport
 *
 * @example
 * Basic usage of different log levels:
 *
 * logger.error("This is an error message");
 * logger.warn("This is a warning message");
 * logger.info("This is an info message");
 * logger.verbose("This is a verbose message");
 * logger.debug("This is a debug message");
 * logger.silly("This is a silly message");
 *
 * @example
 * Run with file output by setting the LOG_FILE_PATH environment variable:
 *
 * LOG_FILE_PATH=./.logs/example.log pnpm tsx cli/your-script.ts
 *
 * logger.info("Check your logs directory if LOG_FILE_PATH was set");
 *
 * @example
 * Note that log levels are hierarchical, setting LOG_LEVEL=silly will
 * include all levels: error, warn, info, verbose, debug, silly
 *
 * LOG_LEVEL=silly pnpm tsx cli/your-script.ts
 */
import winston, { format } from "winston";
import { LOG_LEVEL } from "./constants";
import transports from "./transports";

export const logger = winston.createLogger({
  format: format.combine(format.timestamp(), format.errors({ stack: true })),
  level: LOG_LEVEL,
  transports,
});
