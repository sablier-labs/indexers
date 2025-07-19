/**
 * @file Use this file to define new indexers for The Graph.
 *
 * ⚠️ NOTE: not all chain names used by The Graph are the same as the chain's slug defined in the Sablier SDK.
 * @see https://thegraph.com/docs/en/supported-networks
 */
import { chains, Protocol, sablier } from "sablier";
import { SUBGRAPH_STUDIO_USER_ID } from "../constants";
import { Vendor } from "../enums";
import type { Indexer } from "../types";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

const CHAIN_SLUG_OVERRIDES: { [chainId: number]: string } = {
  [chains.arbitrum.id]: "arbitrum-one",
  [chains.blast.id]: "blast-mainnet",
  [chains.mode.id]: "mode-mainnet",
  [chains.sei.id]: "sei-mainnet",
};

const NAME_TEMPLATING_VAR = "{SUBGRAPH_NAME}";

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

export function getGraphChainSlug(chainId: number): string {
  return CHAIN_SLUG_OVERRIDES[chainId] ?? sablier.chains.getOrThrow(chainId).slug;
}

function getSubgraphName(chainId: number, protocol: Indexer.Protocol): string {
  const graphChainName = getGraphChainSlug(chainId);
  return `sablier-${protocol}-${graphChainName}`;
}

/**
 * Sort indexers alphabetically by chain name.
 */
function resolveCustom(protocol: Indexer.Protocol, chainId: number, templateURL: string): Indexer {
  if (!templateURL.includes(NAME_TEMPLATING_VAR)) {
    throw new Error(`Template URL for custom Graph indexer does not include ${NAME_TEMPLATING_VAR}`);
  }
  const subgraphName = getSubgraphName(chainId, protocol);
  return {
    chainId,
    endpoint: {
      url: templateURL.replace(NAME_TEMPLATING_VAR, subgraphName),
    },
    kind: "custom",
    name: subgraphName,
    protocol,
    vendor: Vendor.Graph,
  };
}

function resolveOfficial(protocol: Indexer.Protocol, chainId: number, subgraphId: string): Indexer {
  const subgraphName = getSubgraphName(chainId, protocol);
  return {
    chainId,
    endpoint: {
      id: subgraphId,
      url: `https://gateway.thegraph.com/api/subgraphs/id/${subgraphId}`,
    },
    explorerURL: `https://thegraph.com/explorer/subgraphs/${subgraphId}`,
    kind: "official",
    name: subgraphName,
    protocol,
    testingURL: `https://api.studio.thegraph.com/query/${SUBGRAPH_STUDIO_USER_ID}/${subgraphName}/version/latest`,
    vendor: Vendor.Graph,
  };
}

/* -------------------------------------------------------------------------- */
/*                                 DEFINITIONS                                */
/* -------------------------------------------------------------------------- */

type SubgraphId = string;
type SubgraphIdMap = Record<Indexer.Protocol, SubgraphId>;
type IndexerGraphMap = Record<Indexer.Protocol, Indexer>;

function custom(chainId: number, baseURL: string): IndexerGraphMap {
  return {
    airdrops: resolveCustom(Protocol.Airdrops, chainId, baseURL),
    flow: resolveCustom(Protocol.Flow, chainId, baseURL),
    lockup: resolveCustom(Protocol.Lockup, chainId, baseURL),
  };
}

function official(chainId: number, idMap: SubgraphIdMap): IndexerGraphMap {
  return {
    airdrops: resolveOfficial(Protocol.Airdrops, chainId, idMap.airdrops),
    flow: resolveOfficial(Protocol.Flow, chainId, idMap.flow),
    lockup: resolveOfficial(Protocol.Lockup, chainId, idMap.lockup),
  };
}

const CUSTOMS: IndexerGraphMap[] = [
  custom(
    chains.form.id,
    "https://formapi.0xgraph.xyz/api/public/5961fb30-8fdc-45ad-9a35-555dd5e0dd56/subgraphs/{SUBGRAPH_NAME}/2.3_1.0.0/gn",
  ),
  custom(chains.lightlink.id, "https://graph.phoenix.lightlink.io/query/subgraphs/name/lightlink/{SUBGRAPH_NAME}"),
  custom(chains.xdc.id, "https://graphql.xinfin.network/subgraphs/name/xdc/{SUBGRAPH_NAME}"),
];

const OFFICIALS: IndexerGraphMap[] = [
  /* -------------------------------------------------------------------------- */
  /*                                  MAINNETS                                  */
  /* -------------------------------------------------------------------------- */
  official(chains.mainnet.id, {
    airdrops: "DFD73EcSue44R7mpHvXeyvcgaT8tR1iKakZFjBsiFpjs",
    flow: "ECxBJhKceBGaVvK6vqmK3VQAncKwPeAQutEb8TeiUiod",
    lockup: "AvDAMYYHGaEwn9F9585uqq6MM5CfvRtYcb7KjK7LKPCt",
  }),
  official(chains.abstract.id, {
    airdrops: "DRrf6mYEhRt9QieKvTjDHnSWcBm3GW96hpedMKVxLABx",
    flow: "Gq3e1gihMoSynURwGXQnPoKGVZzdsyomdrMH934vQHuG",
    lockup: "2QjTdDFY233faXksUruMERMiDoQDdtGG5hBLC27aT1Pw",
  }),
  official(chains.arbitrum.id, {
    airdrops: "HkHDg6NVVVeobhpcU4pTPMktyC25zd6xAQBGpYrWDgRr",
    flow: "C3kBBUVtW2rxqGpAgSgEuSaT49izkH6Q8UibRt7XFTyW",
    lockup: "yvDXXHSyv6rGPSzfpbBcbQmMFrECac3Q2zADkYsMxam",
  }),
  official(chains.avalanche.id, {
    airdrops: "CpbN5Ps25UzqfdoqYdrjoSK4Him6nwDvdLK6a2sGS1PA",
    flow: "6PAizjTALVqLLB7Ycq6XnpTeck8Z8QUpDFnVznMnisUh",
    lockup: "FTDmonvFEm1VGkzECcnDY2CPHcW5dSmHRurSjEEfTkCX",
  }),
  official(chains.base.id, {
    airdrops: "4SxPXkQNifgBYqje2C4yP5gz69erZwtD7GuLWgXHSLGe",
    flow: "4XSxXh8ZgkzaA35nrbQG9Ry3FYz3ZFD8QBdWwVg5pF9W",
    lockup: "778GfecD9tsyB4xNnz4wfuAyfHU6rqGr79VCPZKu3t2F",
  }),
  official(chains.berachain.id, {
    airdrops: "CnYsdmzuY3Mebwywvqv1WrXw9UZuPMTrxoGgR2UdThJE",
    flow: "J87eaBLfTe7kKWgUGqe5TxntNCzA4pyWmqJowMddehuh",
    lockup: "C2r13APcUemQtVdPFm7p7T3aJkU2rH2EvdZzrQ53zi14",
  }),
  official(chains.blast.id, {
    airdrops: "657bogqYaDSSeqsoJcJ1kRqGnc3jC15UmcVLzsYxyxKK",
    flow: "8joiC9LpUbSV6eGRr3RWXDArM8p9Q65FKiFekAakkyia",
    lockup: "8MBBc6ET4izgJRrybgWzPjokhZKSjk43BNY1q3xcb8Es",
  }),
  official(chains.bsc.id, {
    airdrops: "FXQT42kQPvpMJgsF5Bs6CqpxVvPP1LBqEhWThCCLMeGL",
    flow: "2vU8KF4yWh3vvFjtg7MrRXMnYF3hPX2T3cvVBdaiXhNb",
    lockup: "A8Vc9hi7j45u7P8Uw5dg4uqYJgPo4x1rB4oZtTVaiccK",
  }),
  official(chains.chiliz.id, {
    airdrops: "6LK1aqrhzZCp6c88MEBDAR1VDLpZQiXpBKkceJ5Lu4LU",
    flow: "7QX7tJsANNFpxFLLjqzmXRzfY1wPGp3Lty5xGbhgADa6",
    lockup: "4KsXUFvsKFHH7Q8k3BPgEv2NhCJJGwG78gCPAUpncYb",
  }),
  official(chains.gnosis.id, {
    airdrops: "kQEY5PYbjx4SMKyMUwqJHRLDzKH1aUqGsf1cnibU7Kn",
    flow: "4KiJ53cTNKdFWPBPmDNQ55tYj8hn1WQg8R4UcTY2STLL",
    lockup: "DtKniy1RvB19q1r2g1WLN4reMNKDacEnuAjh284rW2iK",
  }),
  official(chains.iotex.id, {
    airdrops: "G39uCzr1FDY7pBFe8DwShAxhMeC6dbZetutVg6wjtks3",
    flow: "6No3QmRiC8HXLEerDFoBpF47jUPRjhntmv28HHEMxcA2",
    lockup: "2P3sxwmcWBjMUv1C79Jh4h6VopBaBZeTocYWDUQqwWFV",
  }),
  official(chains.linea.id, {
    airdrops: "6koYFSd8FQizdQWLTdRpL1yTmAbpMgN1vZN5W6ajZiTN",
    flow: "DV9XgcCCPKzUn6pgetg4yPetpW2fNoRKBUQC43aNeLG6",
    lockup: "GvpecytqVzLzuwuQB3enozXoaZRFoVx8Kr7qrfMiE9bs",
  }),
  official(chains.mode.id, {
    airdrops: "HZMkVX5c2qf7BqbidwpcQMsHGWTDdEKwVjnwenzo9s6m",
    flow: "9TwfoUZoxYUyxzDgspCPyxW6uMUKetWQDaTGsZjY1qJZ",
    lockup: "oSBvUM371as1pJh8HQ72NMRMb3foV3wuheULfkNf5vy",
  }),
  official(chains.optimism.id, {
    airdrops: "CHJtCNDzPqngpa1YJoaVrjuufZL6k6VkEkG9ZFUMQzF7",
    flow: "AygPgsehNGSB4K7DYYtvBPhTpEiU4dCu3nt95bh9FhRf",
    lockup: "NZHzd2JNFKhHP5EWUiDxa5TaxGCFbSD4g6YnYr8JGi6",
  }),
  official(chains.polygon.id, {
    airdrops: "FRbBKiDyM5YpFAqHLXRfQWwQdMGzFL82hqoPXPpXzAHE",
    flow: "ykp38sLarwz3cpmjSSPqo7UuTjYtkZ1KiL4PM2qwmT8",
    lockup: "8fgeQMEQ8sskVeWE5nvtsVL2VpezDrAkx2d1VeiHiheu",
  }),
  official(chains.scroll.id, {
    airdrops: "Ev4xS8VxuoUcpgqz5A2BkTgQxQeskm4Fg41XzVJ2DX9",
    flow: "HFpTrPzJyrHKWZ9ebb4VFRQSxRwpepyfz5wd138daFkF",
    lockup: "GycpYx8c9eRqxvEAfqnpNd1ZfXeuLzjRhnG7vvYaqEE1",
  }),
  official(chains.sei.id, {
    airdrops: "HCxLCRqd5MorHXxmXFUBBcA71zTGXnn97Xk2uaBmStsy",
    flow: "41ZGYcFgL2N7L5ng78S4sD6NHDNYEYcNFxnz4T8Zh3iU",
    lockup: "AJU5rBfbuApuJpeZeaz6NYuYnnhAhEy4gFkqsSdAT6xb",
  }),
  official(chains.unichain.id, {
    airdrops: "4rQMJ85hKNhcaDyirGipGvcqS4auGU3QCFRBnpiexyNy",
    flow: "Cb5uDYfy4ukN9fjhQ3PQZgDzyo6G66ztn1e847rS7Xa8",
    lockup: "3MUG4H3gZcp9fpGLiJMTMeUFcQQ6QdT317P4wYKyns9M",
  }),
  official(chains.zksync.id, {
    airdrops: "64iDUwNVWKukw67nqTXif5taEfLug4Qf1c2suAv5hrqN",
    flow: "9DRgWhDAMovpkej3eT8izum6jxEKHE62ciArffsTAScx",
    lockup: "5yDtFSxyRuqyjvGJyyuQhMEW3Uah7Ddy2KFSKVhy9VMa",
  }),
  /* -------------------------------------------------------------------------- */
  /*                                  TESTNETS                                  */
  /* -------------------------------------------------------------------------- */
  official(chains.arbitrumSepolia.id, {
    airdrops: "3S7v3VkDq8XMBd8EFVhKur2Vk44xScaW8a4BRjoPuYWk",
    flow: "2uWnxpYiDMkEMu1urxqt925mLfuax9XbvfcBoD97AU6d",
    lockup: "ApEFvaPGARHedGmFp6TRQu7DoDHQKwt1LPWi1ka6DFHT",
  }),
  official(chains.baseSepolia.id, {
    airdrops: "4R2hm27YJ7CVEJ97BbBJz2r4KTKYc8sTqqzrD8UzEfJt",
    flow: "AsnKT1waQMvuQxZAqfFuYwtRtAfN8uekDu75jPttfyLh",
    lockup: "DdiYENuyh5ztSybRJnBnCZuUgESkFasjGFHZUbURpKHz",
  }),
  official(chains.optimismSepolia.id, {
    airdrops: "3kp1eR2T1XpvvLkSZ7Wtt45DbDaiykTes478RZ7zwTz",
    flow: "EFKqBB6TeH6etGuHCffnbMbETEgDZ6U29Lgpc4gpYvdB",
    lockup: "2LFYyhMVMUMYA2q7XMMnBvCs6v6awWxBeMuMk3tMtmiT",
  }),
  official(chains.sepolia.id, {
    airdrops: "8PLGDyXEsPgRTAnozL7MAjmTUFY4TBzs8i4F9Pq3wwSh",
    flow: "EU9AWmJjrjMRkjxcdHfuWPZvPTNAL3hiXfNGN5MwUpvm",
    lockup: "5yDtFSxyRuqyjvGJyyuQhMEW3Uah7Ddy2KFSKVhy9VMa",
  }),
];

const ALL: IndexerGraphMap[] = [...CUSTOMS, ...OFFICIALS];

function toSortedArray(indexerMaps: IndexerGraphMap[], protocol: Indexer.Protocol): Indexer[] {
  return indexerMaps
    .map((indexerMap) => indexerMap[protocol])
    .sort((a, b) => {
      const chainNameA = sablier.chains.getOrThrow(a.chainId).name;
      const chainNameB = sablier.chains.getOrThrow(b.chainId).name;
      return chainNameA.localeCompare(chainNameB);
    });
}

export const graph: Record<Indexer.Protocol, Indexer[]> = {
  airdrops: toSortedArray(ALL, Protocol.Airdrops),
  flow: toSortedArray(ALL, Protocol.Flow),
  lockup: toSortedArray(ALL, Protocol.Lockup),
};

// It doesn't matter what protocol we are using since each chain supports all protocols.
export const graphChains = graph.lockup.map((c) => c.chainId);
