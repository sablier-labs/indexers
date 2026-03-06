import { Context, Effect, Layer } from "effect";
import type { Ora } from "ora";
import ora from "ora";

export type SpinnerStatus = "success" | "fail" | "stop";

export type SpinnerHandle = {
  readonly fail: (message?: string) => Effect.Effect<void>;
  readonly stop: () => Effect.Effect<void>;
  readonly succeed: (message?: string) => Effect.Effect<void>;
};

function makeSpinnerHandle(spinner: Ora): SpinnerHandle {
  return {
    fail: (message?: string) => Effect.sync(() => void spinner.fail(message)),
    stop: () => Effect.sync(() => void spinner.stop()),
    succeed: (message?: string) => Effect.sync(() => void spinner.succeed(message)),
  };
}

export class CliSpinner extends Context.Tag("CliSpinner")<
  CliSpinner,
  {
    readonly start: (message: string) => Effect.Effect<SpinnerHandle>;
    readonly withSpinner: <A, E, R>(
      message: string,
      effect: Effect.Effect<A, E, R>
    ) => Effect.Effect<A, E, R>;
  }
>() {}

export const CliSpinnerLive = Layer.succeed(CliSpinner, {
  start: (message: string) => Effect.sync(() => makeSpinnerHandle(ora(message).start())),
  withSpinner: <A, E, R>(message: string, effect: Effect.Effect<A, E, R>) =>
    Effect.scoped(
      Effect.gen(function* () {
        yield* Effect.acquireRelease(
          Effect.sync(() => ora(message).start()),
          (spinner) => Effect.sync(() => void spinner.stop())
        );
        return yield* effect;
      })
    ),
});
