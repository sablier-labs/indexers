import type { GraphManifest } from "../manifest-types";
import { getSources } from "./get-sources";

export function getFlowSources(chainId: number): GraphManifest.Source[] {
  return getSources("flow", chainId);
}
