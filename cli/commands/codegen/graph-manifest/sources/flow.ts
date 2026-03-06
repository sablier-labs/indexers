import { getSources } from "./get-sources.js";

export function getFlowSources(chainId: number) {
  return getSources("flow", chainId);
}
