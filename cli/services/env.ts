import path from "node:path";
import dotenv from "dotenv";
import { Context, Effect, Layer, Option } from "effect";

export class CliEnv extends Context.Tag("CliEnv")<
  CliEnv,
  {
    readonly argv: readonly string[];
    readonly cwd: string;
    readonly get: (key: string) => Effect.Effect<Option.Option<string>>;
    readonly getString: (key: string) => Effect.Effect<string | undefined>;
    readonly relativeToCwd: (target: string) => string;
    readonly resolveFromCwd: (target: string) => string;
  }
>() {}

export const CliEnvLive = Layer.effect(
  CliEnv,
  Effect.sync(() => {
    dotenv.config({ quiet: true });

    const cwd = process.cwd();
    const argv = [...process.argv];

    return {
      argv,
      cwd,
      get: (key: string) => Effect.sync(() => Option.fromNullable(process.env[key])),
      getString: (key: string) => Effect.sync(() => process.env[key]),
      relativeToCwd: (target: string) => `./${path.relative(cwd, target)}`,
      resolveFromCwd: (target: string) => path.resolve(cwd, target),
    };
  })
);
