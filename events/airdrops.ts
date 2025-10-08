import type { Sablier } from "sablier";
import { contracts } from "sablier";
import type { Types } from "../lib/types";
import type { Indexer } from "../src/types";

const names = contracts.names;

function get(
  version: Sablier.Version.Airdrops,
  contractName: string,
  eventName: string,
  indexers: Array<Indexer.Name> = ["airdrops", "analytics"],
): Types.Event {
  return {
    contractName,
    eventName,
    indexers,
    protocol: "airdrops",
    version,
  };
}

function campaign(version: Sablier.Version.Airdrops, contractName: string): Types.Event[] {
  return [get(version, contractName, "TransferAdmin"), get(version, contractName, "Clawback")];
}

// Helper functions for contracts that appear in multiple versions
function merkleInstant(version: Sablier.Version.Airdrops): Types.Event[] {
  const contractName = names.SABLIER_MERKLE_INSTANT;
  if (version === "v1.3") {
    return [...campaign(version, contractName), get(version, contractName, "Claim")];
  }
  return [...campaign(version, contractName), get(version, contractName, "ClaimInstant")];
}

function merkleLL(version: Sablier.Version.Airdrops): Types.Event[] {
  const contractName = names.SABLIER_MERKLE_LL;
  if (version === "v1.3") {
    return [...campaign(version, contractName), get(version, contractName, "Claim")];
  }
  return [
    ...campaign(version, contractName),
    get(version, contractName, "ClaimLLWithTransfer"),
    get(version, contractName, "ClaimLLWithVesting"),
  ];
}

function merkleLT(version: Sablier.Version.Airdrops): Types.Event[] {
  const contractName = names.SABLIER_MERKLE_LT;
  if (version === "v1.3") {
    return [...campaign(version, contractName), get(version, contractName, "Claim")];
  }
  return [
    ...campaign(version, contractName),
    get(version, contractName, "ClaimLTWithTransfer"),
    get(version, contractName, "ClaimLTWithVesting"),
  ];
}

const airdropHandlers: Types.EventMap = {
  /* -------------------------------------------------------------------------- */
  /*                                    V1.1                                    */
  /* -------------------------------------------------------------------------- */
  [names.SABLIER_V2_MERKLE_STREAMER_FACTORY]: {
    "v1.1": [get("v1.1", names.SABLIER_V2_MERKLE_STREAMER_FACTORY, "CreateMerkleStreamerLL")],
  },
  [names.SABLIER_V2_MERKLE_STREAMER_LL]: {
    "v1.1": [
      ...campaign("v1.1", names.SABLIER_V2_MERKLE_STREAMER_LL),
      get("v1.1", names.SABLIER_V2_MERKLE_STREAMER_LL, "Claim"),
    ],
  },

  /* -------------------------------------------------------------------------- */
  /*                                    V1.2                                    */
  /* -------------------------------------------------------------------------- */
  [names.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: {
    "v1.2": [
      get("v1.2", names.SABLIER_V2_MERKLE_LOCKUP_FACTORY, "CreateMerkleLL"),
      get("v1.2", names.SABLIER_V2_MERKLE_LOCKUP_FACTORY, "CreateMerkleLT"),
    ],
  },
  [names.SABLIER_V2_MERKLE_LL]: {
    "v1.2": [...campaign("v1.2", names.SABLIER_V2_MERKLE_LL), get("v1.2", names.SABLIER_V2_MERKLE_LL, "Claim")],
  },
  [names.SABLIER_V2_MERKLE_LT]: {
    "v1.2": [...campaign("v1.2", names.SABLIER_V2_MERKLE_LT), get("v1.2", names.SABLIER_V2_MERKLE_LT, "Claim")],
  },

  /* -------------------------------------------------------------------------- */
  /*                                    V1.3                                    */
  /* -------------------------------------------------------------------------- */
  [names.SABLIER_MERKLE_FACTORY]: {
    "v1.3": [
      get("v1.3", names.SABLIER_MERKLE_FACTORY, "CollectFees", ["analytics"]),
      get("v1.3", names.SABLIER_MERKLE_FACTORY, "CreateMerkleInstant"),
      get("v1.3", names.SABLIER_MERKLE_FACTORY, "CreateMerkleLL"),
      get("v1.3", names.SABLIER_MERKLE_FACTORY, "CreateMerkleLT"),
    ],
  },

  /* -------------------------------------------------------------------------- */
  /*                                    V2.0                                    */
  /* -------------------------------------------------------------------------- */
  [names.SABLIER_FACTORY_MERKLE_INSTANT]: {
    "v2.0": [get("v2.0", names.SABLIER_FACTORY_MERKLE_INSTANT, "CreateMerkleInstant")],
  },
  [names.SABLIER_FACTORY_MERKLE_LL]: {
    "v2.0": [get("v2.0", names.SABLIER_FACTORY_MERKLE_LL, "CreateMerkleLL")],
  },
  [names.SABLIER_FACTORY_MERKLE_LT]: {
    "v2.0": [get("v2.0", names.SABLIER_FACTORY_MERKLE_LT, "CreateMerkleLT")],
  },

  /* -------------------------------------------------------------------------- */
  /*                                    V1.3 and V2.0                                    */
  /* -------------------------------------------------------------------------- */
  [names.SABLIER_MERKLE_INSTANT]: {
    "v1.3": merkleInstant("v1.3"),
    "v2.0": merkleInstant("v2.0"),
  },
  [names.SABLIER_MERKLE_LL]: {
    "v1.3": merkleLL("v1.3"),
    "v2.0": merkleLL("v2.0"),
  },
  [names.SABLIER_MERKLE_LT]: {
    "v1.3": merkleLT("v1.3"),
    "v2.0": merkleLT("v2.0"),
  },
} as const;

export default airdropHandlers;
