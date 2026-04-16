/**
 * @file Use this file to define new indexers for Envio.
 *
 * @see https://docs.envio.dev/docs/HyperSync/hypersync-supported-networks
 */
import { chains } from "sablier/evm";
import { Vendor } from "../enums.js";
import type { Indexer } from "../types.js";
import { getEnvioDeployment } from "./envio-deployments.js";
import { getProtocolForIndexerKey } from "./mappers.js";

type EnvioChainConfig = {
  /**
   * @see https://github.com/sablier-labs/indexers/discussions/147
   * @see https://github.com/enviodev/hyperindex/issues/599
   */
  hypersync?: string;
  /**
   * Chains indexed only through RPC. No HyperSync support.
   * @see https://docs.envio.dev/docs/HyperIndex/rpc-sync
   */
  rpcOnly?: boolean;
};

type EnvioChain = {
  config?: EnvioChainConfig;
  id: number;
};

function get(id: number, config?: EnvioChainConfig): EnvioChain {
  return { config, id };
}

const SUPPORTED_CHAINS = [
  /* -------------------------------------------------------------------------- */
  /*                                  MAINNETS                                  */
  /* -------------------------------------------------------------------------- */
  get(chains.abstract.id),
  get(chains.arbitrum.id),
  get(chains.avalanche.id),
  get(chains.base.id),
  get(chains.blast.id),
  get(chains.berachain.id),
  get(chains.bsc.id),
  get(chains.chiliz.id, { hypersync: "chiliz" }),
  get(chains.gnosis.id),
  get(chains.hyperevm.id),
  get(chains.linea.id),
  get(chains.mainnet.id),
  get(chains.mode.id),
  get(chains.monad.id),
  get(chains.morph.id),
  get(chains.optimism.id),
  get(chains.polygon.id),
  get(chains.sonic.id),
  get(chains.scroll.id),
  get(chains.sei.id, { hypersync: "sei" }),
  get(chains.sophon.id),
  get(chains.superseed.id),
  get(chains.unichain.id),
  get(chains.xdc.id),
  get(chains.zksync.id),
  /* -------------------------------------------------------------------------- */
  /*                                  TESTNETS                                  */
  /* -------------------------------------------------------------------------- */
  get(chains.baseSepolia.id),
  get(chains.sepolia.id),
] as const;

function getIndexers(indexer: Indexer.IndexerKey): Indexer[] {
  const deploymentTarget = getProtocolForIndexerKey(indexer);
  const deployment = getEnvioDeployment(indexer);
  const testingURL = `https://cloud.hasura.io/public/graphiql?endpoint=${encodeURIComponent(deployment.endpoint.url)}`;
  return SUPPORTED_CHAINS.map((chain) => ({
    chainId: chain.id,
    explorerURL: deployment.explorerURL,
    indexer,
    kind: "official",
    name: `sablier-${deploymentTarget}`,
    testingURL,
    vendor: Vendor.Envio,
    endpoint: {
      id: deployment.endpoint.id,
      url: deployment.endpoint.url,
    },
  }));
}

export const envio: Record<Indexer.IndexerKey, Indexer[]> = {
  airdrops: getIndexers("airdrops"),
  streams: getIndexers("streams"),
} as const;

export const envioChains = SUPPORTED_CHAINS;
