import { Effect } from "effect";
import type { SpinnerHandle, SpinnerStatus } from "./services/spinner.js";
import { CliSpinner } from "./services/spinner.js";

export type { SpinnerHandle, SpinnerStatus } from "./services/spinner.js";

export const startSpinner = Effect.fn("startSpinner")(function* (message: string) {
  const spinner = yield* CliSpinner;
  return yield* spinner.start(message);
});

export function finishSpinner(
  spinner: SpinnerHandle,
  status: SpinnerStatus,
  message?: string
): Effect.Effect<void> {
  switch (status) {
    case "success":
      return spinner.succeed(message);
    case "fail":
      return spinner.fail(message);
    default:
      return spinner.stop();
  }
}

export const withSpinner = Effect.fn("withSpinner")(
  <A, E, R>(message: string, effect: Effect.Effect<A, E, R>) =>
    Effect.gen(function* () {
      const spinner = yield* CliSpinner;
      return yield* spinner.withSpinner(message, effect);
    })
);
