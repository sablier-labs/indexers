/**
 * @file Use this file to define new indexers for The Graph.
 *
 */
import { sablier } from "sablier";
import { chains } from "sablier/evm";
import { SUBGRAPH_STUDIO_USER_ID } from "../constants.js";
import { Vendor } from "../enums.js";
import type { Indexer } from "../types.js";
import { getProtocolForIndexerKey } from "./mappers.js";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

/**
 * Custom chain slugs used by The Graph.
 *
 * ⚠️ NOTE: not all chain names used by The Graph are the same as the chain's slug defined in the Sablier SDK.
 * @see https://thegraph.com/docs/en/supported-networks
 */
const CHAIN_SLUG_GRAPH_OVERRIDES: { [chainId: number]: string } = {
  [chains.arbitrum.id]: "arbitrum-one",
  [chains.denergy.id]: "denergychain",
  [chains.polygon.id]: "matic",
  [chains.zksync.id]: "zksync-era",
};

/**
 * Custom chain slugs used by Sablier subgraphs.
 */
const CHAIN_SLUG_SABLIER_OVERRIDES: { [chainId: number]: string } = {
  [chains.denergy.id]: "denergychain",
  [chains.mainnet.id]: "ethereum",
};

/**
 * Some chains have made the really bad design choice of using custom network identifiers
 * in their subgraph.yaml files.
 */
const CHAIN_SLUG_SUBGRAPH_YAML: { [chainId: number]: string } = {
  [chains.lightlink.id]: "mainnet",
};

const NAME_TEMPLATING_VAR = "{SUBGRAPH_NAME}";

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

export function getGraphChainSlug(chainId: number): string {
  return CHAIN_SLUG_GRAPH_OVERRIDES[chainId] ?? sablier.chains.getOrThrow(chainId).slug;
}

export function getSablierChainSlug(chainId: number): string {
  return CHAIN_SLUG_SABLIER_OVERRIDES[chainId] ?? sablier.chains.getOrThrow(chainId).slug;
}

export function getSubgraphYamlChainSlug(chainId: number): string {
  return CHAIN_SLUG_SUBGRAPH_YAML[chainId] ?? getGraphChainSlug(chainId);
}

// Internal indexer representation, indexed by protocol. The public `indexer`
// key is attached later by `toPublicIndexers`.
type ProtocolGraphIndexer = Omit<Indexer, "indexer">;

function getSubgraphName(chainId: number, protocol: Indexer.Protocol): string {
  const graphChainName = getSablierChainSlug(chainId);
  return `sablier-${protocol}-${graphChainName}`;
}

function resolveCustom(
  protocol: Indexer.Protocol,
  chainId: number,
  templateURL: string
): ProtocolGraphIndexer {
  if (!templateURL.includes(NAME_TEMPLATING_VAR)) {
    throw new Error(
      `Template URL for custom Graph indexer does not include ${NAME_TEMPLATING_VAR}`
    );
  }
  const subgraphName = getSubgraphName(chainId, protocol);

  const endpointUrl = templateURL.replace(NAME_TEMPLATING_VAR, subgraphName);
  return {
    chainId,
    explorerURL: `${endpointUrl}/graphql`,
    kind: "custom",
    name: subgraphName,
    vendor: Vendor.Graph,
    endpoint: {
      url: endpointUrl,
    },
  };
}

function resolveOfficial(
  protocol: Indexer.Protocol,
  chainId: number,
  subgraphId: string
): ProtocolGraphIndexer {
  const subgraphName = getSubgraphName(chainId, protocol);
  return {
    chainId,
    explorerURL: `https://thegraph.com/explorer/subgraphs/${subgraphId}`,
    kind: "official",
    name: subgraphName,
    testingURL: `https://api.studio.thegraph.com/query/${SUBGRAPH_STUDIO_USER_ID}/${subgraphName}/version/latest`,
    vendor: Vendor.Graph,
    endpoint: {
      id: subgraphId,
      url: `https://gateway.thegraph.com/api/subgraphs/id/${subgraphId}`,
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                                 DEFINITIONS                                */
/* -------------------------------------------------------------------------- */

// `streams` covers both flow and lockup data: the legacy Lockup subgraph was
// extended to index Flow events as well, so only one subgraph ID is needed
// per chain.
type SubgraphIdMap = Record<Indexer.IndexerKey, string>;
type ProtocolIndexerGraphMap = Record<Indexer.IndexerKey, ProtocolGraphIndexer>;

function custom(chainId: number, baseURL: string): ProtocolIndexerGraphMap {
  return {
    airdrops: resolveCustom(getProtocolForIndexerKey("airdrops"), chainId, baseURL),
    streams: resolveCustom(getProtocolForIndexerKey("streams"), chainId, baseURL),
  };
}

function official(chainId: number, idMap: SubgraphIdMap): ProtocolIndexerGraphMap {
  return {
    airdrops: resolveOfficial(getProtocolForIndexerKey("airdrops"), chainId, idMap.airdrops),
    streams: resolveOfficial(getProtocolForIndexerKey("streams"), chainId, idMap.streams),
  };
}

const CUSTOMS: ProtocolIndexerGraphMap[] = [
  custom(
    chains.lightlink.id,
    "https://graph.phoenix.lightlink.io/query/subgraphs/name/lightlink/{SUBGRAPH_NAME}"
  ),
  custom(
    chains.denergy.id,
    "https://thegraph.denergychain.com/subgraphs/name/denergychain/{SUBGRAPH_NAME}"
  ),
];

const OFFICIALS: ProtocolIndexerGraphMap[] = [
  /* -------------------------------------------------------------------------- */
  /*                                  MAINNETS                                  */
  /* -------------------------------------------------------------------------- */
  official(chains.mainnet.id, {
    airdrops: "DFD73EcSue44R7mpHvXeyvcgaT8tR1iKakZFjBsiFpjs",
    streams: "AvDAMYYHGaEwn9F9585uqq6MM5CfvRtYcb7KjK7LKPCt",
  }),
  official(chains.abstract.id, {
    airdrops: "DRrf6mYEhRt9QieKvTjDHnSWcBm3GW96hpedMKVxLABx",
    streams: "2QjTdDFY233faXksUruMERMiDoQDdtGG5hBLC27aT1Pw",
  }),
  official(chains.arbitrum.id, {
    airdrops: "HkHDg6NVVVeobhpcU4pTPMktyC25zd6xAQBGpYrWDgRr",
    streams: "yvDXXHSyv6rGPSzfpbBcbQmMFrECac3Q2zADkYsMxam",
  }),
  official(chains.avalanche.id, {
    airdrops: "CpbN5Ps25UzqfdoqYdrjoSK4Him6nwDvdLK6a2sGS1PA",
    streams: "FTDmonvFEm1VGkzECcnDY2CPHcW5dSmHRurSjEEfTkCX",
  }),
  official(chains.base.id, {
    airdrops: "4SxPXkQNifgBYqje2C4yP5gz69erZwtD7GuLWgXHSLGe",
    streams: "778GfecD9tsyB4xNnz4wfuAyfHU6rqGr79VCPZKu3t2F",
  }),
  official(chains.berachain.id, {
    airdrops: "CnYsdmzuY3Mebwywvqv1WrXw9UZuPMTrxoGgR2UdThJE",
    streams: "C2r13APcUemQtVdPFm7p7T3aJkU2rH2EvdZzrQ53zi14",
  }),
  official(chains.bsc.id, {
    airdrops: "FXQT42kQPvpMJgsF5Bs6CqpxVvPP1LBqEhWThCCLMeGL",
    streams: "A8Vc9hi7j45u7P8Uw5dg4uqYJgPo4x1rB4oZtTVaiccK",
  }),
  official(chains.chiliz.id, {
    airdrops: "6LK1aqrhzZCp6c88MEBDAR1VDLpZQiXpBKkceJ5Lu4LU",
    streams: "4KsXUFvsKFHH7Q8k3BPgEv2NhCJJGwG78gCPAUpncYb",
  }),
  official(chains.gnosis.id, {
    airdrops: "kQEY5PYbjx4SMKyMUwqJHRLDzKH1aUqGsf1cnibU7Kn",
    streams: "DtKniy1RvB19q1r2g1WLN4reMNKDacEnuAjh284rW2iK",
  }),
  official(chains.linea.id, {
    airdrops: "6koYFSd8FQizdQWLTdRpL1yTmAbpMgN1vZN5W6ajZiTN",
    streams: "GvpecytqVzLzuwuQB3enozXoaZRFoVx8Kr7qrfMiE9bs",
  }),
  official(chains.optimism.id, {
    airdrops: "CHJtCNDzPqngpa1YJoaVrjuufZL6k6VkEkG9ZFUMQzF7",
    streams: "NZHzd2JNFKhHP5EWUiDxa5TaxGCFbSD4g6YnYr8JGi6",
  }),
  official(chains.polygon.id, {
    airdrops: "FRbBKiDyM5YpFAqHLXRfQWwQdMGzFL82hqoPXPpXzAHE",
    streams: "8fgeQMEQ8sskVeWE5nvtsVL2VpezDrAkx2d1VeiHiheu",
  }),
  official(chains.scroll.id, {
    airdrops: "Ev4xS8VxuoUcpgqz5A2BkTgQxQeskm4Fg41XzVJ2DX9",
    streams: "GycpYx8c9eRqxvEAfqnpNd1ZfXeuLzjRhnG7vvYaqEE1",
  }),
  official(chains.sonic.id, {
    airdrops: "5g8orwpm5Rf83G8eqDzDjodt3sG2D64cbiLC98Utmv4Q",
    streams: "GnaSPX9XLkPn219CqbGFU1NgveuQk2Hh3c8WxjtesaEh",
  }),
  official(chains.unichain.id, {
    airdrops: "4rQMJ85hKNhcaDyirGipGvcqS4auGU3QCFRBnpiexyNy",
    streams: "3MUG4H3gZcp9fpGLiJMTMeUFcQQ6QdT317P4wYKyns9M",
  }),
  official(chains.zksync.id, {
    airdrops: "64iDUwNVWKukw67nqTXif5taEfLug4Qf1c2suAv5hrqN",
    streams: "7SuEYGYwZ835LjVGB85ZE8z5zmqdKgmRh8kAEeJefWQN",
  }),
  /* -------------------------------------------------------------------------- */
  /*                                  TESTNETS                                  */
  /* -------------------------------------------------------------------------- */
  official(chains.baseSepolia.id, {
    airdrops: "4R2hm27YJ7CVEJ97BbBJz2r4KTKYc8sTqqzrD8UzEfJt",
    streams: "DdiYENuyh5ztSybRJnBnCZuUgESkFasjGFHZUbURpKHz",
  }),
  official(chains.sepolia.id, {
    airdrops: "8PLGDyXEsPgRTAnozL7MAjmTUFY4TBzs8i4F9Pq3wwSh",
    streams: "5yDtFSxyRuqyjvGJyyuQhMEW3Uah7Ddy2KFSKVhy9VMa",
  }),
];

const ALL: ProtocolIndexerGraphMap[] = [...CUSTOMS, ...OFFICIALS];

function toSortedArray(
  indexerMaps: ProtocolIndexerGraphMap[],
  indexer: Indexer.IndexerKey
): ProtocolGraphIndexer[] {
  return indexerMaps
    .map((indexerMap) => indexerMap[indexer])
    .sort((a, b) => {
      const chainNameA = sablier.chains.getOrThrow(a.chainId).name;
      const chainNameB = sablier.chains.getOrThrow(b.chainId).name;
      return chainNameA.localeCompare(chainNameB);
    });
}

function toPublicIndexers(
  indexers: ProtocolGraphIndexer[],
  indexer: Indexer.IndexerKey
): Indexer[] {
  return indexers.map((entry) => ({ ...entry, indexer }));
}

// The public `streams` entry is built from the internal Lockup subgraph deployment,
// which now indexes the merged flow + lockup events under a single subgraph per chain.
export const graph: Record<Indexer.IndexerKey, Indexer[]> = {
  airdrops: toPublicIndexers(toSortedArray(ALL, "airdrops"), "airdrops"),
  streams: toPublicIndexers(toSortedArray(ALL, "streams"), "streams"),
};

// `streams` covers every chain we support on The Graph; airdrops are deployed
// to the same chain set, so either key yields the same list.
export const graphChains = graph.streams.map((c) => c.chainId);
