import { Effect, Layer } from "effect";
import { describe, expect, it } from "vitest";
import { CliSpinner } from "../../cli/services/spinner.js";
import { withSpinner } from "../../cli/spinner.js";

describe("spinner helpers", () => {
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
