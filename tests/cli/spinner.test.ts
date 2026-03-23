import { Effect, Layer } from "effect";
import { describe, expect, it } from "vitest";
import { CliSpinner } from "../../cli/services/spinner.js";
import { startSpinner, withSpinner } from "../../cli/spinner.js";

describe("spinner helpers", () => {
  it("supports updating spinner text on an active handle", () => {
    const events: string[] = [];

    const layer = Layer.succeed(CliSpinner, {
      start: (message: string) =>
        Effect.sync(() => {
          events.push(`start:${message}`);
          return {
            fail: (nextMessage?: string) =>
              Effect.sync(() => {
                events.push(`fail:${nextMessage ?? ""}`);
              }),
            setText: (nextMessage: string) =>
              Effect.sync(() => {
                events.push(`text:${nextMessage}`);
              }),
            stop: () =>
              Effect.sync(() => {
                events.push("stop");
              }),
            succeed: (nextMessage?: string) =>
              Effect.sync(() => {
                events.push(`success:${nextMessage ?? ""}`);
              }),
          };
        }),
      withSpinner: () => Effect.die("unused"),
    });

    const spinner = Effect.runSync(startSpinner("Deploying").pipe(Effect.provide(layer)));
    Effect.runSync(spinner.setText("Retrying").pipe(Effect.provide(layer)));

    expect(events).toEqual(["start:Deploying", "text:Retrying"]);
  });

  it("delegates spinner lifecycle to the configured service", () => {
    const events: string[] = [];

    const layer = Layer.succeed(CliSpinner, {
      start: () => Effect.die("unused"),
      withSpinner: <A, E, R>(message: string, effect: Effect.Effect<A, E, R>) =>
        Effect.gen(function* () {
          events.push(`start:${message}`);
          const result = yield* effect;
          events.push(`stop:${message}`);
          return result;
        }),
    });

    const result = Effect.runSync(
      withSpinner("Testing spinner", Effect.succeed(42)).pipe(Effect.provide(layer))
    );

    expect(result).toBe(42);
    expect(events).toEqual(["start:Testing spinner", "stop:Testing spinner"]);
  });
});
