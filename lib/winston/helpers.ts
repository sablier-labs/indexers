import type { Sablier } from "sablier";

export function formatRelease(release: Sablier.Release) {
  return `${release.protocol} ${release.version}`;
}
