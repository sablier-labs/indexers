import _ from "lodash";
import { sablier } from "sablier";
import { createPublicClient, fallback, http, type PublicClient } from "viem";
import { envioChains } from "../../src/indexers/envio";
import { CriticalError } from "./errors";

/**
 * Global array of pre-configured public clients for all supported chains.
 * Each client is configured with multiple RPC endpoints for failover resilience.
 */
const clients: PublicClient[] = [];

// Initialize RPC clients for all supported chains
for (const envioChain of envioChains) {
  // Get chain configuration from Sablier deployments
  const chain = sablier.chains.getOrThrow(envioChain.id);

  // Build priority-ordered list of RPC URLs
  const rpcUrls: string[] = [];

  // Add Infura and Alchemy endpoints if keys are available
  if (chain.rpc.infura && process.env.ENVIO_INFURA_API_KEY) {
    const infuraURL = chain.rpc.infura(process.env.ENVIO_INFURA_API_KEY);
    rpcUrls.push(infuraURL);
  }
  if (chain.rpc.alchemy && process.env.ENVIO_ALCHEMY_API_KEY) {
    const alchemyURL = chain.rpc.alchemy(process.env.ENVIO_ALCHEMY_API_KEY);
    rpcUrls.push(alchemyURL);
  }

  // Add default chain RPC as provided by the Sablier deployments package, which sources it from Viem.
  rpcUrls.push(chain.rpc.default);

  // Remove duplicates while preserving order
  const uniqueRpcUrls = _.uniq(rpcUrls);

  // Create HTTP transports with batching enabled for performance
  const transports = uniqueRpcUrls.map((url) =>
    http(url, {
      batch: true, // Enable request batching for better performance
    }),
  );

  // Create public client with fallback transport for resilience
  const client = createPublicClient({
    batch: {
      multicall: true, // Enable multicall batching
    },
    chain,
    transport: fallback(transports, {
      rank: false, // Use RPCs in order of priority, not by performance ranking
      retryCount: 5, // Retry failed requests up to 5 times
    }),
  });

  clients.push(client);
}

/**
 * Retrieves a pre-configured public client for the specified chain.
 *
 * @param chainId - The chain ID to get the client for
 * @returns PublicClient configured with multiple RPC endpoints for the chain
 * @throws CriticalError.ClientNotFound if no client exists for the chain
 */
export function getClient(chainId: number): PublicClient {
  const client = _.find(clients, (c) => c?.chain?.id === chainId);

  if (!client) {
    throw new CriticalError.ClientNotFound(chainId);
  }

  return client;
}
