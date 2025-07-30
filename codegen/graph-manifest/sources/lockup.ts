import type { GraphManifest } from "../manifest-types";
import { getSources } from "./get-sources";

export function getLockupSources(chainId: number): GraphManifest.Source[] {
  return getSources("lockup", chainId);
}
