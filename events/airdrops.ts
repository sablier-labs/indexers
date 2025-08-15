import type { Sablier } from "sablier";
import { contracts } from "sablier";
import type { Types } from "../lib/types";

const names = contracts.names;

function get(version: Sablier.Version.Airdrops, contractName: string, eventName: string): Types.Event {
  return {
    contractName,
    eventName,
    protocol: "airdrops",
    version,
  };
}

function campaign(version: Sablier.Version.Airdrops, contractName: string): Types.Event[] {
  return [get(version, contractName, "TransferAdmin"), get(version, contractName, "Clawback")];
}

/* -------------------------------------------------------------------------- */
/*                                    V1.1                                    */
/* -------------------------------------------------------------------------- */

const v1_1: Types.EventMap = {
  [names.SABLIER_V2_MERKLE_STREAMER_FACTORY]: {
    "v1.1": [get("v1.1", names.SABLIER_V2_MERKLE_STREAMER_FACTORY, "CreateMerkleStreamerLL")],
  },
  [names.SABLIER_V2_MERKLE_STREAMER_LL]: {
    "v1.1": [
      ...campaign("v1.1", names.SABLIER_V2_MERKLE_STREAMER_LL),
      get("v1.1", names.SABLIER_V2_MERKLE_STREAMER_LL, "Claim"),
    ],
  },
};

/* -------------------------------------------------------------------------- */
/*                                    V1.2                                    */
/* -------------------------------------------------------------------------- */

const v1_2: Types.EventMap = {
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
};

/* -------------------------------------------------------------------------- */
/*                                    V1.3                                    */
/* -------------------------------------------------------------------------- */

const v1_3: Types.EventMap = {
  [names.SABLIER_MERKLE_FACTORY]: {
    "v1.3": [
      get("v1.3", names.SABLIER_MERKLE_FACTORY, "CreateMerkleInstant"),
      get("v1.3", names.SABLIER_MERKLE_FACTORY, "CreateMerkleLL"),
      get("v1.3", names.SABLIER_MERKLE_FACTORY, "CreateMerkleLT"),
    ],
  },
  [names.SABLIER_MERKLE_INSTANT]: {
    "v1.3": [...campaign("v1.3", names.SABLIER_MERKLE_INSTANT), get("v1.3", names.SABLIER_MERKLE_INSTANT, "Claim")],
  },
  [names.SABLIER_MERKLE_LL]: {
    "v1.3": [...campaign("v1.3", names.SABLIER_MERKLE_LL), get("v1.3", names.SABLIER_MERKLE_LL, "Claim")],
  },
  [names.SABLIER_MERKLE_LT]: {
    "v1.3": [...campaign("v1.3", names.SABLIER_MERKLE_LT), get("v1.3", names.SABLIER_MERKLE_LT, "Claim")],
  },
};

const airdropHandlers: Types.EventMap = {
  ...v1_1,
  ...v1_2,
  ...v1_3,
} as const;

export default airdropHandlers;
