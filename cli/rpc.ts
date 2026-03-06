import type { Sablier } from "sablier";
import { sablier } from "sablier";
import { ValidationError } from "./errors.js";

const ROUTEMESH_URL_REGEX = /^https:\/\/lb\.routeme\.sh\/rpc\/(\d+)\/.+$/;

export type CliRpcConfig = {
  chain: Sablier.Chain;
  displayRpcUrls: string[];
  rpcUrls: string[];
};

function maskRouteMeshUrl(url: string): string {
  const match = ROUTEMESH_URL_REGEX.exec(url);
  if (!match) {
    return url;
  }

  return `https://lb.routeme.sh/rpc/${match[1]}/[redacted]`;
}

function dedupeStrings(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const deduped: string[] = [];

  for (const value of values) {
    if (seen.has(value)) {
      continue;
    }

    seen.add(value);
    deduped.push(value);
  }

  return deduped;
}

export function resolveCliRpcConfig(
  chainId: number,
  routeMeshApiKey = process.env.ENVIO_ROUTEMESH_API_KEY
): CliRpcConfig {
  if (chainId <= 0) {
    throw new ValidationError({
      field: "chainId",
      message: "Chain ID must be a positive number",
    });
  }

  const chain = sablier.chains.get(chainId);
  if (!chain) {
    throw new ValidationError({
      field: "chainId",
      message: "Unknown chain ID",
    });
  }

  const sanitizedRouteMeshApiKey = routeMeshApiKey?.trim();
  const routeMeshUrl =
    sanitizedRouteMeshApiKey && chain.rpc.routemesh
      ? chain.rpc.routemesh(sanitizedRouteMeshApiKey)
      : undefined;
  const rpcUrls = routeMeshUrl ? [routeMeshUrl, ...chain.rpc.defaults] : [...chain.rpc.defaults];

  const dedupedRpcUrls = dedupeStrings(rpcUrls);
  if (dedupedRpcUrls.length === 0) {
    throw new ValidationError({
      field: "chainId",
      message: "Chain does not expose any RPC URLs",
    });
  }

  return {
    chain,
    displayRpcUrls: dedupedRpcUrls.map(maskRouteMeshUrl),
    rpcUrls: dedupedRpcUrls,
  };
}
