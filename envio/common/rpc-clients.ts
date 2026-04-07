import _ from "lodash";
import { sablier } from "sablier";
import type { PublicClient } from "viem";
import { createPublicClient, fallback, http } from "viem";
import { CriticalError } from "./errors.js";

/**
 * Cache of pre-configured public clients by chain ID.
 * Each client is configured with multiple RPC endpoints for failover resilience.
 */
const clients: Record<number, PublicClient> = {};

/**
 * Creates a public client for the specified chain ID with multiple RPC endpoints for resilience.
 *
 * @param chainId - The chain ID to create the client for
 * @returns PublicClient configured with multiple RPC endpoints for the chain
 */
function createClient(chainId: number): PublicClient {
  const chain = (() => {
    try {
      return sablier.chains.getOrThrow(chainId);
    } catch {
      throw new CriticalError.ClientNotFound(chainId);
    }
  })();

  // Build priority-ordered list of RPC URLs: RouteMesh first, then public defaults.
  const rpcUrls: string[] = [];

  if (chain.rpc.routemesh && process.env.ENVIO_ROUTEMESH_API_KEY) {
    rpcUrls.push(chain.rpc.routemesh(process.env.ENVIO_ROUTEMESH_API_KEY));
  }

  rpcUrls.push(...chain.rpc.defaults);

  // Remove duplicates while preserving order
  const uniqueRpcUrls = _.uniq(rpcUrls);
  if (uniqueRpcUrls.length === 0) {
    throw new CriticalError.ClientNotFound(chainId);
  }

  // Create HTTP transports with batching enabled for performance
  const transports = uniqueRpcUrls.map((url) =>
    http(url, {
      batch: true, // Enable request batching for better performance
    })
  );

  // Create public client with fallback transport for resilience
  return createPublicClient({
    batch: {
      multicall: true, // Enable multicall batching
    },
    chain,
    transport: fallback(transports, {
      rank: false, // Use RPCs in order of priority, not by performance ranking
      retryCount: 5, // Retry failed requests up to 5 times
    }),
  });
}

/**
 * Retrieves a pre-configured public client for the specified chain.
 * Uses lazy initialization - clients are created only when first requested.
 *
 * @param chainId - The chain ID to get the client for
 * @returns PublicClient configured with multiple RPC endpoints for the chain
 * @throws CriticalError.ClientNotFound if no client exists for the chain
 */
export function getClient(chainId: number): PublicClient {
  // Check if client already exists in cache
  if (clients[chainId]) {
    return clients[chainId];
  }

  // Create and cache the client
  const client = createClient(chainId);
  clients[chainId] = client;

  return client;
}
