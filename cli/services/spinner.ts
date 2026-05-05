import { Cause, Context, Effect, Exit, Layer } from "effect";
import type { Ora } from "ora";
import ora from "ora";

export type SpinnerStatus = "success" | "fail" | "stop";

export type SpinnerHandle = {
  readonly fail: (message?: string) => Effect.Effect<void>;
  readonly setText: (message: string) => Effect.Effect<void>;
  readonly stop: () => Effect.Effect<void>;
  readonly succeed: (message?: string) => Effect.Effect<void>;
};

function makeSpinnerHandle(spinner: Ora): SpinnerHandle {
  return {
    fail: (message?: string) => Effect.sync(() => void spinner.fail(message)),
    setText: (message: string) =>
      Effect.sync(() => {
        spinner.text = message;
      }),
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
    Effect.acquireUseRelease(
      Effect.sync(() => ora(message).start()),
      () => effect,
      (spinner, exit) =>
        Effect.sync(() => {
          if (Exit.isSuccess(exit)) {
            spinner.succeed();
          } else if (Cause.isInterruptedOnly(exit.cause)) {
            spinner.stop();
          } else {
            spinner.fail();
          }
        })
    ),
});
