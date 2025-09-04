/**
 * @file Use this file to define new indexers for Envio.
 *
 * @see https://docs.envio.dev/docs/HyperSync/hypersync-supported-networks
 */
import { chains, Protocol } from "sablier";
import { Vendor } from "../enums";
import type { Indexer } from "../types";
import { envioDeployments } from "./envio-deployments";

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
  get(chains.morph.id),
  get(chains.optimism.id),
  get(chains.polygon.id),
  get(chains.sonic.id),
  get(chains.scroll.id),
  get(chains.sophon.id),
  get(chains.superseed.id),
  get(chains.tangle.id, { hypersync: "tangle" }),
  get(chains.unichain.id),
  get(chains.xdc.id),
  get(chains.zksync.id),
  /* -------------------------------------------------------------------------- */
  /*                                  TESTNETS                                  */
  /* -------------------------------------------------------------------------- */
  get(chains.baseSepolia.id),
  get(chains.sepolia.id),
] as const;

function getIndexers(protocol: Indexer.Protocol): Indexer[] {
  return SUPPORTED_CHAINS.map((chain) => {
    const deployment = envioDeployments[protocol];
    return {
      chainId: chain.id,
      endpoint: {
        id: deployment.endpoint.id,
        url: deployment.endpoint.url,
      },
      explorerURL: deployment.explorerURL,
      kind: "official",
      name: `sablier-${protocol}`,
      protocol,
      testingURL: `https://cloud.hasura.io/public/graphiql?endpoint=${encodeURIComponent(deployment.endpoint.url)}`,
      vendor: Vendor.Envio,
    };
  });
}

export const envio: Record<Indexer.Protocol, Indexer[]> = {
  airdrops: getIndexers(Protocol.Airdrops),
  flow: getIndexers(Protocol.Flow),
  lockup: getIndexers(Protocol.Lockup),
} as const;

export const envioChains = SUPPORTED_CHAINS;
