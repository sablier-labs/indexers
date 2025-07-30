import { BigInt } from "@graphprotocol/graph-ts";
import { CreateLockupTranchedStreamTranchesStruct as StructTrancheV2_0 } from "../bindings/SablierLockup_v2_0/SablierLockup";
import { CreateLockupTranchedStreamTranchesStruct as StructTrancheV1_2 } from "../bindings/SablierV2LockupTranched_v1_2/SablierV2LockupTranched";

import { Tranche } from "./types";

export function convertTranchesV1_2(eventTranches: StructTrancheV1_2[]): Tranche[] {
  return convertTranches<StructTrancheV1_2>(
    eventTranches,
    (tranche) => tranche.amount,
    (tranche) => tranche.timestamp,
  );
}

export function convertTranchesV2_0(eventTranches: StructTrancheV2_0[]): Tranche[] {
  return convertTranches<StructTrancheV2_0>(
    eventTranches,
    (tranche) => tranche.amount,
    (tranche) => tranche.timestamp,
  );
}

function convertTranches<T>(
  eventTranches: T[],
  getAmount: (tranche: T) => BigInt,
  getTimestamp: (tranche: T) => BigInt,
): Tranche[] {
  const result: Tranche[] = [];

  for (let i = 0; i < eventTranches.length; i++) {
    const eventTranche = eventTranches[i];

    const amount = getAmount(eventTranche);
    const timestamp = getTimestamp(eventTranche);

    result.push(new Tranche(amount, timestamp));
  }

  return result;
}
