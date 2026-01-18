import type { GraphManifest } from "../manifest-types.js";
import { getSources } from "./get-sources.js";

export function getLockupSources(chainId: number): GraphManifest.Source[] {
  return getSources("lockup", chainId);
}
