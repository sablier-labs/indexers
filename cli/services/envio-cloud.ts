import path from "node:path";
import { CommandExecutor, Command as PlatformCommand } from "@effect/platform";
import { Context, Effect, Layer, Schema, Stream } from "effect";
import { ROOT_DIR } from "../utils/paths.js";
import type { CloudProcessOutput } from "./envio-cloud.types.js";
import { CloudIndexerSchema, ENVIO_CLOUD_ORG, EnvioCloudError } from "./envio-cloud.types.js";

const CLOUD_BIN = path.join(ROOT_DIR, "node_modules", ".bin", "envio-cloud");
const MAX_OUTPUT_BYTES = 4 * 1024 * 1024;

export type CloudCommandRunner = (
  args: readonly string[]
) => Effect.Effect<CloudProcessOutput, EnvioCloudError>;

function readOutput<E>(stream: Stream.Stream<Uint8Array, E>, operation: string) {
  return Stream.runFoldEffect(stream, Buffer.alloc(0), (output, chunk) =>
    output.byteLength + chunk.byteLength > MAX_OUTPUT_BYTES
      ? Effect.fail(new EnvioCloudError({ message: "CLI output exceeded 4 MiB", operation }))
      : Effect.succeed(Buffer.concat([output, chunk]))
  ).pipe(Effect.map((output) => output.toString("utf8")));
}

function executeCloudCommand(executor: CommandExecutor.CommandExecutor, args: readonly string[]) {
  const operation = args.slice(0, 2).join(" ");
  return Effect.scoped(
    Effect.gen(function* () {
      const process = yield* executor.start(
        PlatformCommand.make(CLOUD_BIN, ...args).pipe(PlatformCommand.workingDirectory(ROOT_DIR))
      );
      const [stdout, stderr, exitCode] = yield* Effect.all(
        [
          readOutput(process.stdout, operation),
          readOutput(process.stderr, operation),
          process.exitCode,
        ],
        { concurrency: "unbounded" }
      );
      return { exitCode, stderr, stdout };
    })
  ).pipe(
    Effect.timeoutFail({
      duration: "60 seconds",
      onTimeout: () =>
        new EnvioCloudError({ message: "CLI command timed out after 60 seconds", operation }),
    }),
    Effect.mapError((error) =>
      error instanceof EnvioCloudError
        ? error
        : new EnvioCloudError({ message: "Unable to execute the Envio Cloud CLI", operation })
    )
  );
}

export function makeEnvioCloud(run: CloudCommandRunner) {
  const readJson = <A, I>(args: readonly string[], schema: Schema.Schema<A, I>) => {
    const operation = args.slice(0, 2).join(" ");
    return Effect.gen(function* () {
      const result = yield* run([...args, "--org", ENVIO_CLOUD_ORG, "--output", "json"]);
      // Some CLI commands return success without data. Exit status alone is insufficient.
      if (result.exitCode !== 0) {
        return yield* Effect.fail(
          new EnvioCloudError({
            exitCode: result.exitCode,
            message: `CLI command failed with exit code ${result.exitCode}; check envio-cloud login`,
            operation,
          })
        );
      }
      const envelope = yield* Schema.decodeUnknown(
        Schema.parseJson(Schema.Struct({ data: Schema.Unknown, ok: Schema.Literal(true) }))
      )(result.stdout).pipe(
        Effect.mapError(
          () =>
            new EnvioCloudError({
              message: "CLI returned invalid JSON or an unsuccessful envelope",
              operation,
            })
        )
      );
      if (envelope.data === undefined || envelope.data === null) {
        return yield* Effect.fail(
          new EnvioCloudError({ message: "CLI response is missing data", operation })
        );
      }
      return yield* Schema.decodeUnknown(schema)(envelope.data).pipe(
        Effect.mapError(
          () => new EnvioCloudError({ message: "CLI response data failed validation", operation })
        )
      );
    });
  };

  return {
    getIndexer: (name: string) =>
      readJson(["indexer", "get", name], CloudIndexerSchema).pipe(
        Effect.flatMap((indexer) =>
          indexer.indexer_id === name
            ? Effect.succeed(indexer)
            : Effect.fail(
                new EnvioCloudError({
                  message: "CLI returned a different indexer",
                  operation: "indexer get",
                })
              )
        )
      ),
    listIndexers: () => readJson(["indexer", "list"], Schema.Array(CloudIndexerSchema)),
    runCommand: (args: readonly string[]) => run([...args, "--org", ENVIO_CLOUD_ORG]),
    readJson,
  };
}

export class EnvioCloud extends Context.Tag("EnvioCloud")<
  EnvioCloud,
  ReturnType<typeof makeEnvioCloud>
>() {}

export const EnvioCloudLive = Layer.effect(
  EnvioCloud,
  Effect.map(CommandExecutor.CommandExecutor, (executor) =>
    makeEnvioCloud((args) => executeCloudCommand(executor, args))
  )
);
