import type { Sablier } from "sablier";
import { contracts, Version } from "sablier";
import type { Types } from "../lib/types";

const { names } = contracts;

export const airdropsContracts: Types.ContractSource<Sablier.Version.Airdrops>[] = [
  {
    isTemplate: false,
    name: names.SABLIER_V2_MERKLE_STREAMER_FACTORY,
    versions: [Version.Airdrops.V1_1],
  },
  {
    isTemplate: true,
    name: names.SABLIER_V2_MERKLE_STREAMER_LL,
    versions: [Version.Airdrops.V1_1],
  },
  {
    isTemplate: false,
    name: names.SABLIER_V2_MERKLE_LOCKUP_FACTORY,
    versions: [Version.Airdrops.V1_2],
  },
  {
    isTemplate: true,
    name: names.SABLIER_V2_MERKLE_LL,
    versions: [Version.Airdrops.V1_2],
  },
  {
    isTemplate: true,
    name: names.SABLIER_V2_MERKLE_LT,
    versions: [Version.Airdrops.V1_2],
  },
  {
    isTemplate: false,
    name: names.SABLIER_MERKLE_FACTORY,
    versions: [Version.Airdrops.V1_3],
  },
  {
    isTemplate: true,
    name: names.SABLIER_MERKLE_INSTANT,
    versions: [Version.Airdrops.V1_3],
  },
  {
    isTemplate: true,
    name: names.SABLIER_MERKLE_LL,
    versions: [Version.Airdrops.V1_3],
  },
  {
    isTemplate: true,
    name: names.SABLIER_MERKLE_LT,
    versions: [Version.Airdrops.V1_3],
  },
];

export default airdropsContracts;
