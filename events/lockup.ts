import type { Sablier } from "sablier";
import { contracts } from "sablier";
import type { Types } from "../lib/types";
import { erc721 } from "./common/erc721";

function get(version: Sablier.Version.Lockup, contractName: string, eventName: string): Types.Event {
  return {
    contractName,
    eventName,
    protocol: "lockup",
    version,
  };
}

function dynamic(version: Sablier.Version.Lockup): Types.Event[] {
  const contractName = contracts.names.SABLIER_V2_LOCKUP_DYNAMIC;
  return [
    ...erc721("lockup", version, contractName),
    get(version, contractName, "CancelLockupStream"),
    get(version, contractName, "CreateLockupDynamicStream"),
    get(version, contractName, "RenounceLockupStream"),
    get(version, contractName, "WithdrawFromLockupStream"),
  ];
}

function linear(version: Sablier.Version.Lockup): Types.Event[] {
  const contractName = contracts.names.SABLIER_V2_LOCKUP_LINEAR;
  return [
    ...erc721("lockup", version, contractName),
    get(version, contractName, "CancelLockupStream"),
    get(version, contractName, "CreateLockupLinearStream"),
    get(version, contractName, "RenounceLockupStream"),
    get(version, contractName, "WithdrawFromLockupStream"),
  ];
}

function tranched(version: Sablier.Version.Lockup): Types.Event[] {
  const contractName = contracts.names.SABLIER_V2_LOCKUP_TRANCHED;
  return [
    ...erc721("lockup", version, contractName),
    get(version, contractName, "CancelLockupStream"),
    get(version, contractName, "CreateLockupTranchedStream"),
    get(version, contractName, "RenounceLockupStream"),
    get(version, contractName, "WithdrawFromLockupStream"),
  ];
}

function lockup(version: Sablier.Version.Lockup): Types.Event[] {
  const contractName = contracts.names.SABLIER_LOCKUP;
  return [
    ...erc721("lockup", version, contractName),
    get(version, contractName, "CancelLockupStream"),
    get(version, contractName, "CreateLockupDynamicStream"),
    get(version, contractName, "CreateLockupLinearStream"),
    get(version, contractName, "CreateLockupTranchedStream"),
    get(version, contractName, "RenounceLockupStream"),
    get(version, contractName, "WithdrawFromLockupStream"),
  ];
}

const lockupEvents: Types.EventMap = {
  [contracts.names.SABLIER_V2_LOCKUP_DYNAMIC]: {
    "v1.0": dynamic("v1.0"),
    "v1.1": dynamic("v1.1"),
    "v1.2": dynamic("v1.2"),
  },
  [contracts.names.SABLIER_V2_LOCKUP_LINEAR]: {
    "v1.0": linear("v1.0"),
    "v1.1": linear("v1.1"),
    "v1.2": linear("v1.2"),
  },
  [contracts.names.SABLIER_V2_LOCKUP_TRANCHED]: {
    "v1.2": tranched("v1.2"),
  },
  [contracts.names.SABLIER_LOCKUP]: {
    "v2.0": lockup("v2.0"),
  },
} as const;

export default lockupEvents;
