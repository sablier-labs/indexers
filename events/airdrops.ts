/**
 * @see https://github.com/sablier-labs/airdrops/blob/main/CHANGELOG.md
 */
import * as _ from "lodash-es";
import type { Sablier } from "sablier";
import { contracts } from "sablier/evm";
import type { Indexer, Model } from "../src/types.js";

type CampaignType = "instant" | "LL" | "LT" | "VCA";

// Centralized version-specific claim events configuration
type ClaimEventsConfig = {
  [K in CampaignType]: Record<Sablier.Version.Airdrops, readonly string[]>;
};

const CLAIM_EVENTS: ClaimEventsConfig = {
  instant: {
    "v1.1": ["Claim"],
    "v1.2": ["Claim"],
    "v1.3": ["Claim"],
    "v2.0": ["ClaimInstant"],
    "v3.0": ["ClaimInstant"],
  },
  LL: {
    "v1.1": ["Claim"],
    "v1.2": ["Claim"],
    "v1.3": ["Claim"],
    "v2.0": ["ClaimLLWithTransfer", "ClaimLLWithVesting"],
    "v3.0": ["ClaimLLWithTransfer", "ClaimLLWithVesting"],
  },
  LT: {
    "v1.1": ["Claim"],
    "v1.2": ["Claim"],
    "v1.3": ["Claim"],
    "v2.0": ["ClaimLTWithTransfer", "ClaimLTWithVesting"],
    "v3.0": ["ClaimLTWithTransfer", "ClaimLTWithVesting"],
  },
  VCA: {
    "v1.1": [],
    "v1.2": [],
    "v1.3": [],
    "v2.0": [],
    "v3.0": ["ClaimVCA"],
  },
};

const names = contracts.names;

const DEFAULT_INDEXERS: Indexer.Target[] = ["airdrops", "analytics"];

const LOWER_MIN_FEE_EVENTS: Record<Sablier.Version.Airdrops, readonly string[]> = {
  "v1.1": [],
  "v1.2": [],
  "v1.3": [],
  "v2.0": ["LowerMinFeeUSD"],
  "v3.0": ["LowerMinFeeUSD"],
};

const SPONSOR_EVENTS: Record<Sablier.Version.Airdrops, readonly string[]> = {
  "v1.1": [],
  "v1.2": [],
  "v1.3": [],
  "v2.0": [],
  "v3.0": ["Sponsor"],
};

function get(
  version: Sablier.Version.Airdrops,
  contractName: string,
  eventName: string,
  indexers: Indexer.Target[] = DEFAULT_INDEXERS
): Model.Event {
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
): Model.Event[] {
  return [
    get(version, contractName, "TransferAdmin"),
    get(version, contractName, "Clawback"),
    ...CLAIM_EVENTS[type][version].map((event) => get(version, contractName, event)),
    ...LOWER_MIN_FEE_EVENTS[version].map((event) =>
      get(version, contractName, event, ["airdrops"])
    ),
    ...SPONSOR_EVENTS[version].map((event) => get(version, contractName, event, ["airdrops"])),
  ];
}

// Helper for factory contracts with multiple events
function factory(
  version: Sablier.Version.Airdrops,
  contractName: string,
  events: string[],
  indexerOverrides?: Record<string, Indexer.Target[]>
): Record<string, Record<string, Model.Event[]>> {
  return {
    [contractName]: {
      [version]: events.map((e) => get(version, contractName, e, indexerOverrides?.[e])),
    },
  };
}

const airdropHandlers: Model.EventMap = _.merge(
  /* -------------------------------------------------------------------------- */
  /*                                    V1.1                                    */
  /* -------------------------------------------------------------------------- */
  {
    ...factory("v1.1", names.SABLIER_V2_MERKLE_STREAMER_FACTORY, ["CreateMerkleStreamerLL"]),
    [names.SABLIER_V2_MERKLE_STREAMER_LL]: {
      "v1.1": campaign("instant", "v1.1", names.SABLIER_V2_MERKLE_STREAMER_LL),
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                    V1.2                                    */
  /* -------------------------------------------------------------------------- */
  {
    ...factory("v1.2", names.SABLIER_V2_MERKLE_LOCKUP_FACTORY, [
      "CreateMerkleLL",
      "CreateMerkleLT",
    ]),
    [names.SABLIER_V2_MERKLE_LL]: {
      "v1.2": campaign("LL", "v1.2", names.SABLIER_V2_MERKLE_LL),
    },
    [names.SABLIER_V2_MERKLE_LT]: {
      "v1.2": campaign("LT", "v1.2", names.SABLIER_V2_MERKLE_LT),
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                    V1.3                                    */
  /* -------------------------------------------------------------------------- */
  {
    ...factory(
      "v1.3",
      names.SABLIER_MERKLE_FACTORY,
      ["CollectFees", "CreateMerkleInstant", "CreateMerkleLL", "CreateMerkleLT"],
      {
        CollectFees: ["analytics"], // index "CollectFees" event only in the Analytics indexer
      }
    ),
    [names.SABLIER_MERKLE_INSTANT]: {
      "v1.3": campaign("instant", "v1.3", names.SABLIER_MERKLE_INSTANT),
    },
    [names.SABLIER_MERKLE_LL]: {
      "v1.3": campaign("LL", "v1.3", names.SABLIER_MERKLE_LL),
    },
    [names.SABLIER_MERKLE_LT]: {
      "v1.3": campaign("LT", "v1.3", names.SABLIER_MERKLE_LT),
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                    V2.0                                    */
  /* -------------------------------------------------------------------------- */
  {
    [names.SABLIER_FACTORY_MERKLE_INSTANT]: {
      "v2.0": [get("v2.0", names.SABLIER_FACTORY_MERKLE_INSTANT, "CreateMerkleInstant")],
    },
    [names.SABLIER_FACTORY_MERKLE_LL]: {
      "v2.0": [get("v2.0", names.SABLIER_FACTORY_MERKLE_LL, "CreateMerkleLL")],
    },
    [names.SABLIER_FACTORY_MERKLE_LT]: {
      "v2.0": [get("v2.0", names.SABLIER_FACTORY_MERKLE_LT, "CreateMerkleLT")],
    },
    [names.SABLIER_MERKLE_INSTANT]: {
      "v2.0": campaign("instant", "v2.0", names.SABLIER_MERKLE_INSTANT),
    },
    [names.SABLIER_MERKLE_LL]: {
      "v2.0": campaign("LL", "v2.0", names.SABLIER_MERKLE_LL),
    },
    [names.SABLIER_MERKLE_LT]: {
      "v2.0": campaign("LT", "v2.0", names.SABLIER_MERKLE_LT),
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                    V3.0                                    */
  /* -------------------------------------------------------------------------- */
  {
    [names.SABLIER_FACTORY_MERKLE_INSTANT]: {
      "v3.0": [get("v3.0", names.SABLIER_FACTORY_MERKLE_INSTANT, "CreateMerkleInstant")],
    },
    [names.SABLIER_FACTORY_MERKLE_LL]: {
      "v3.0": [get("v3.0", names.SABLIER_FACTORY_MERKLE_LL, "CreateMerkleLL")],
    },
    [names.SABLIER_FACTORY_MERKLE_LT]: {
      "v3.0": [get("v3.0", names.SABLIER_FACTORY_MERKLE_LT, "CreateMerkleLT")],
    },
    ...factory("v3.0", names.SABLIER_FACTORY_MERKLE_VCA, ["CreateMerkleVCA"]),
    [names.SABLIER_MERKLE_INSTANT]: {
      "v3.0": campaign("instant", "v3.0", names.SABLIER_MERKLE_INSTANT),
    },
    [names.SABLIER_MERKLE_LL]: {
      "v3.0": campaign("LL", "v3.0", names.SABLIER_MERKLE_LL),
    },
    [names.SABLIER_MERKLE_LT]: {
      "v3.0": campaign("LT", "v3.0", names.SABLIER_MERKLE_LT),
    },
    [names.SABLIER_MERKLE_VCA]: {
      "v3.0": [
        ...campaign("VCA", "v3.0", names.SABLIER_MERKLE_VCA),
        get("v3.0", names.SABLIER_MERKLE_VCA, "EnableRedistribution"),
      ],
    },
  }
);

export default airdropHandlers;
