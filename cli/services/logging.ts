import { dirname } from "node:path";
import { FileSystem } from "@effect/platform";
import { Context, DateTime, Effect, Layer } from "effect";
import type { FileOperationError } from "../errors.js";
import { toFileOperationError } from "../errors.js";

export type CliFileLoggerInstance = {
  readonly log: (message: string) => Effect.Effect<void, FileOperationError>;
  readonly createLogFile: () => Effect.Effect<void, FileOperationError>;
};

/**
 * File logger factory for writing CLI log files.
 *
 * Used by graph-deploy-all to track deployment progress and results.
 */
export class CliFileLogger extends Context.Tag("CliFileLogger")<
  CliFileLogger,
  {
    readonly make: (logFilePath: string) => Effect.Effect<CliFileLoggerInstance>;
  }
>() {}

export const CliFileLoggerLive = Layer.effect(
  CliFileLogger,
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;

    return {
      make: (logFilePath: string) =>
        Effect.succeed({
          createLogFile: () =>
            fs
              .makeDirectory(dirname(logFilePath), { recursive: true })
              .pipe(
                Effect.zipRight(fs.writeFileString(logFilePath, "")),
                Effect.mapError(toFileOperationError(logFilePath, "write"))
              ),
          log: (message: string) =>
            Effect.gen(function* () {
              const timestamp = yield* DateTime.now.pipe(Effect.map(DateTime.formatIso));
              const entry = `${timestamp} ${message}\n`;
              const exists = yield* fs.exists(logFilePath);
              const existingContent = exists ? yield* fs.readFileString(logFilePath) : "";

              yield* fs.writeFileString(logFilePath, `${existingContent}${entry}`);
            }).pipe(Effect.mapError(toFileOperationError(logFilePath, "write"))),
        } satisfies CliFileLoggerInstance),
    };
  })
);
