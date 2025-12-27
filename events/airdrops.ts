/**
 * @see https://github.com/sablier-labs/airdrops/blob/main/CHANGELOG.md
 */
import type { Sablier } from "sablier";
import { contracts } from "sablier/evm";
import type { Types } from "../lib/types";
import type { Indexer } from "../src/types";

type CampaignType = "instant" | "LL" | "LT";

// Centralized version-specific claim events configuration
type ClaimEventsConfig = {
  [K in CampaignType]: Record<Sablier.Version.Airdrops, readonly string[]>;
};

const CLAIM_EVENTS: ClaimEventsConfig = {
  instant: { "v1.1": ["Claim"], "v1.2": ["Claim"], "v1.3": ["Claim"], "v2.0": ["ClaimInstant"] },
  LL: {
    "v1.1": ["Claim"],
    "v1.2": ["Claim"],
    "v1.3": ["Claim"],
    "v2.0": ["ClaimLLWithTransfer", "ClaimLLWithVesting"],
  },
  LT: {
    "v1.1": ["Claim"],
    "v1.2": ["Claim"],
    "v1.3": ["Claim"],
    "v2.0": ["ClaimLTWithTransfer", "ClaimLTWithVesting"],
  },
};

const names = contracts.names;

const DEFAULT_INDEXERS: Indexer.Name[] = ["airdrops", "analytics"];

const LOWER_MIN_FEE_EVENTS: Record<Sablier.Version.Airdrops, readonly string[]> = {
  "v1.1": [],
  "v1.2": [],
  "v1.3": [],
  "v2.0": ["LowerMinFeeUSD"],
};

function get(
  version: Sablier.Version.Airdrops,
  contractName: string,
  eventName: string,
  indexers: Indexer.Name[] = DEFAULT_INDEXERS
): Types.Event {
  return {
    contractName,
    eventName,
    indexers,
    protocol: "airdrops",
    version,
  };
}

// Generic merkle contract builder for campaign events
function campaign(
  type: CampaignType,
  version: Sablier.Version.Airdrops,
  contractName: string
): Types.Event[] {
  return [
    get(version, contractName, "TransferAdmin"),
    get(version, contractName, "Clawback"),
    ...CLAIM_EVENTS[type][version].map((event) => get(version, contractName, event)),
    ...LOWER_MIN_FEE_EVENTS[version].map((event) =>
      get(version, contractName, event, ["airdrops"])
    ),
  ];
}

// Helper for factory contracts with multiple events
function factory(
  version: Sablier.Version.Airdrops,
  contractName: string,
  events: string[],
  indexerOverrides?: Record<string, Indexer.Name[]>
): Record<string, Record<string, Types.Event[]>> {
  return {
    [contractName]: {
      [version]: events.map((e) => get(version, contractName, e, indexerOverrides?.[e])),
    },
  };
}

// Helper for contracts that exist in multiple versions
function versions<T>(builder: (v: Sablier.Version.Airdrops) => T) {
  return (versions: Sablier.Version.Airdrops[]): Record<string, T> =>
    Object.fromEntries(versions.map((v) => [v, builder(v)]));
}

const airdropHandlers: Types.EventMap = {
  /* -------------------------------------------------------------------------- */
  /*                                    V1.1                                    */
  /* -------------------------------------------------------------------------- */
  ...factory("v1.1", names.SABLIER_V2_MERKLE_STREAMER_FACTORY, ["CreateMerkleStreamerLL"]),
  [names.SABLIER_V2_MERKLE_STREAMER_LL]: {
    "v1.1": campaign("instant", "v1.1", names.SABLIER_V2_MERKLE_STREAMER_LL),
  },

  /* -------------------------------------------------------------------------- */
  /*                                    V1.2                                    */
  /* -------------------------------------------------------------------------- */
  ...factory("v1.2", names.SABLIER_V2_MERKLE_LOCKUP_FACTORY, ["CreateMerkleLL", "CreateMerkleLT"]),
  [names.SABLIER_V2_MERKLE_LL]: {
    "v1.2": campaign("LL", "v1.2", names.SABLIER_V2_MERKLE_LL),
  },
  [names.SABLIER_V2_MERKLE_LT]: {
    "v1.2": campaign("LT", "v1.2", names.SABLIER_V2_MERKLE_LT),
  },

  /* -------------------------------------------------------------------------- */
  /*                                    V1.3                                    */
  /* -------------------------------------------------------------------------- */
  ...factory(
    "v1.3",
    names.SABLIER_MERKLE_FACTORY,
    ["CollectFees", "CreateMerkleInstant", "CreateMerkleLL", "CreateMerkleLT"],
    {
      CollectFees: ["analytics"], // index "CollectFees" event only in the Analytics indexer
    }
  ),

  /* -------------------------------------------------------------------------- */
  /*                                V1.3 and V2.0                               */
  /* -------------------------------------------------------------------------- */
  [names.SABLIER_MERKLE_INSTANT]: versions((v) =>
    campaign("instant", v, names.SABLIER_MERKLE_INSTANT)
  )(["v1.3", "v2.0"]),
  [names.SABLIER_MERKLE_LL]: versions((v) => campaign("LL", v, names.SABLIER_MERKLE_LL))([
    "v1.3",
    "v2.0",
  ]),
  [names.SABLIER_MERKLE_LT]: versions((v) => campaign("LT", v, names.SABLIER_MERKLE_LT))([
    "v1.3",
    "v2.0",
  ]),

  /* -------------------------------------------------------------------------- */
  /*                                    V2.0                                    */
  /* -------------------------------------------------------------------------- */
  ...factory("v2.0", names.SABLIER_FACTORY_MERKLE_INSTANT, ["CreateMerkleInstant"]),
  ...factory("v2.0", names.SABLIER_FACTORY_MERKLE_LL, ["CreateMerkleLL"]),
  ...factory("v2.0", names.SABLIER_FACTORY_MERKLE_LT, ["CreateMerkleLT"]),
} as const;

export default airdropHandlers;
