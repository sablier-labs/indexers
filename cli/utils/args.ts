import { Effect } from "effect";
import type { Sablier } from "sablier";
import { sablier } from "sablier";
import { ChainNotFoundError } from "./errors.js";

export function getChain(chainArg: string): Effect.Effect<Sablier.Chain, ChainNotFoundError> {
  const chain = sablier.chains.getBySlug(chainArg);
  if (!chain) {
    return Effect.fail(new ChainNotFoundError({ chainSlug: chainArg }));
  }
  return Effect.succeed(chain);
}
