import { getSources } from "./get-sources.js";

export function getLockupSources(chainId: number) {
  return getSources("lockup", chainId);
}
