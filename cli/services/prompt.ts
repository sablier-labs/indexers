import { Terminal } from "@effect/platform";
import { NodeTerminal } from "@effect/platform-node";
import { Context, Effect, Layer } from "effect";
import { UserAbortError } from "../errors";

/**
 * PromptService for terminal user interactions
 */
export class PromptService extends Context.Tag("PromptService")<
  PromptService,
  {
    readonly confirmOrCancel: (message: string) => Effect.Effect<boolean, UserAbortError>;
  }
>() {}

/**
 * Live implementation of PromptService
 */
export const PromptServiceLive = Layer.effect(
  PromptService,
  Effect.gen(function* () {
    const terminal = yield* Terminal.Terminal;

    return {
      confirmOrCancel: (message: string) =>
        Effect.gen(function* () {
          yield* terminal.display(`${message} (y/n): `);
          const input = yield* terminal.readLine;
          const normalized = input.trim().toLowerCase();

          if (normalized === "y" || normalized === "yes") {
            return true;
          }
          if (normalized === "n" || normalized === "no") {
            return false;
          }

          return yield* Effect.fail(new UserAbortError({}));
        }).pipe(Effect.catchAll(() => Effect.fail(new UserAbortError({})))),
    };
  })
);

/**
 * PromptService layer with Terminal dependency
 */
export const PromptServiceLayerLive = PromptServiceLive.pipe(Layer.provide(NodeTerminal.layer));
