import { BigInt } from "@graphprotocol/graph-ts";
import { CreateMerkleLTTranchesWithPercentagesStruct as StructTrancheV1_3 } from "../bindings/SablierMerkleFactory_v1_3/SablierMerkleFactory";
import { CreateMerkleLTTranchesWithPercentagesStruct as StructTrancheV1_2 } from "../bindings/SablierV2MerkleLockupFactory_v1_2/SablierV2MerkleLockupFactory";

import { TrancheWithPercentage } from "./types";

export function convertTranchesV1_2(tranches: StructTrancheV1_2[]): TrancheWithPercentage[] {
  return convertTranches<StructTrancheV1_2>(
    tranches,
    (tranche) => tranche.unlockPercentage,
    (tranche) => tranche.duration,
  );
}

export function convertTranchesV1_3(tranches: StructTrancheV1_3[]): TrancheWithPercentage[] {
  return convertTranches<StructTrancheV1_3>(
    tranches,
    (tranche) => tranche.unlockPercentage,
    (tranche) => tranche.duration,
  );
}

function convertTranches<T>(
  tranches: T[],
  getUnlockPercentage: (tranche: T) => BigInt,
  getDuration: (tranche: T) => BigInt,
): TrancheWithPercentage[] {
  const result: TrancheWithPercentage[] = [];

  for (let i = 0; i < tranches.length; i++) {
    const tranche = tranches[i];

    const unlockPercentage = getUnlockPercentage(tranche);
    const duration = getDuration(tranche);

    result.push(new TrancheWithPercentage(unlockPercentage, duration));
  }

  return result;
}
