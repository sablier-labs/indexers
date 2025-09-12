import type { Sablier } from "sablier";
import { contracts, Version } from "sablier";
import type { Types } from "../lib/types";

export const flowContracts: Types.ContractSource<Sablier.Version.Flow>[] = [
  {
    isTemplate: false,
    name: contracts.names.SABLIER_FLOW,
    versions: [Version.Flow.V1_0, Version.Flow.V1_1, Version.Flow.V1_2],
  },
];
