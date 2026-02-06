import type { Sablier } from "sablier";
import { contracts, Version } from "sablier/evm";
import type { Types } from "../lib/types.js";

const { names } = contracts;

export const airdropsContracts: Types.ContractSource<Sablier.Version.Airdrops>[] = [
  /* -------------------------------------------------------------------------- */
  /*                                    V1.1                                    */
  /* -------------------------------------------------------------------------- */
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
  /* -------------------------------------------------------------------------- */
  /*                                    V1.2                                    */
  /* -------------------------------------------------------------------------- */
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
  /* -------------------------------------------------------------------------- */
  /*                                    V1.3                                    */
  /* -------------------------------------------------------------------------- */
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
  /* -------------------------------------------------------------------------- */
  /*                                    V2.0                                    */
  /* -------------------------------------------------------------------------- */
  {
    isTemplate: false,
    name: names.SABLIER_FACTORY_MERKLE_INSTANT,
    versions: [Version.Airdrops.V2_0],
  },
  {
    isTemplate: false,
    name: names.SABLIER_FACTORY_MERKLE_LL,
    versions: [Version.Airdrops.V2_0],
  },
  {
    isTemplate: false,
    name: names.SABLIER_FACTORY_MERKLE_LT,
    versions: [Version.Airdrops.V2_0],
  },
  {
    isTemplate: true,
    name: names.SABLIER_MERKLE_INSTANT,
    versions: [Version.Airdrops.V2_0],
  },
  {
    isTemplate: true,
    name: names.SABLIER_MERKLE_LL,
    versions: [Version.Airdrops.V2_0],
  },
  {
    isTemplate: true,
    name: names.SABLIER_MERKLE_LT,
    versions: [Version.Airdrops.V2_0],
  },
  {
    isTemplate: false,
    name: names.SABLIER_FACTORY_MERKLE_VCA,
    versions: [Version.Airdrops.V3_0],
  },
  {
    isTemplate: true,
    name: names.SABLIER_MERKLE_VCA,
    versions: [Version.Airdrops.V3_0],
  },
];
