import type { GraphManifest } from "../manifest-types.js";
import { getSources } from "./get-sources.js";

export function getFlowSources(chainId: number): GraphManifest.Source[] {
  return getSources("flow", chainId);
}
