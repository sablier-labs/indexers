import type { Cause } from "effect";
import { Effect } from "effect";

export function lazyHandler<M, A, E, R>(
  importFn: () => Promise<M>,
  getEffect: (module: M) => Effect.Effect<A, E, R>
): Effect.Effect<A, E | Cause.UnknownException, R> {
  return Effect.promise(importFn).pipe(Effect.flatMap(getEffect));
}
