import { FileSystem } from "@effect/platform";
import { Context, Effect, Layer } from "effect";

/**
 * FileLogger service for writing to log files
 *
 * Used by graph-deploy-all to track deployment progress and results.
 */
export class FileLogger extends Context.Tag("FileLogger")<
  FileLogger,
  {
    readonly appendLog: (message: string) => Effect.Effect<void, Error>;
    readonly createLogFile: (path: string) => Effect.Effect<void, Error>;
  }
>() {}

/**
 * Create a FileLogger layer for a specific log file path
 */
export const makeFileLogger = (logFilePath: string) =>
  Layer.effect(
    FileLogger,
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;

      return {
        appendLog: (message: string) =>
          fs.readFileString(logFilePath).pipe(
            Effect.flatMap((content) => fs.writeFileString(logFilePath, `${content}${message}\n`)),
            Effect.catchAll(() => fs.writeFileString(logFilePath, `${message}\n`)),
            Effect.catchAll((e) => Effect.fail(new Error(String(e)))),
          ),
        createLogFile: (path: string) =>
          fs.writeFileString(path, "").pipe(Effect.catchAll((e) => Effect.fail(new Error(String(e))))),
      };
    }),
  );
