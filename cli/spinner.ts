import { Effect } from "effect";
import type { Ora } from "ora";
import ora from "ora";

export function startSpinner(message: string): Ora {
  return ora(message).start();
}

export type SpinnerStatus = "success" | "fail" | "stop";

export function finishSpinner(spinner: Ora, status: SpinnerStatus, message?: string): void {
  switch (status) {
    case "success":
      spinner.succeed(message);
      break;
    case "fail":
      spinner.fail(message);
      break;
    default:
      spinner.stop();
      break;
  }
}

export function withSpinner<A, E, R>(
  message: string,
  effect: Effect.Effect<A, E, R>
): Effect.Effect<A, E, R> {
  return Effect.gen(function* () {
    const spinner = startSpinner(message);
    try {
      return yield* effect;
    } finally {
      spinner.stop();
    }
  });
}
