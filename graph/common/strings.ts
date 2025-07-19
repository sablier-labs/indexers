/**
 * We abstract away the comparison of strings to avoid an error-prone design where we have to
 * remember to use `==` instead of `===`.
 *
 * The Graph uses AssemblyScript v0.19, in which the `===` operator performs a strict object comparison.
 * @see https://github.com/graphprotocol/graph-node/issues/6044
 * @see https://github.com/AssemblyScript/assemblyscript/issues/621
 */
export function areStringsEqual(a: string, b: string): boolean {
  return a == b;
}
