import type { Sablier } from "sablier";
import { contracts, Version } from "sablier/evm";
import type { Types } from "../lib/types.js";

export const flowContracts: Types.ContractSource<Sablier.Version.Flow>[] = [
  {
    isTemplate: false,
    name: contracts.names.SABLIER_FLOW,
    versions: [Version.Flow.V1_0, Version.Flow.V1_1, Version.Flow.V2_0],
  },
];
