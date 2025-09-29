import type { Sablier } from "sablier";
import { contracts } from "sablier";
import type { Types } from "../lib/types";
import { erc721 } from "./common/erc721";

function get(version: Sablier.Version.Flow, contractName: string, eventName: string): Types.Event {
  return {
    contractName,
    eventName,
    protocol: "flow",
    version,
  };
}

function base(version: Sablier.Version.Flow): Types.Event[] {
  const name = contracts.names.SABLIER_FLOW;
  return [
    ...erc721("flow", version, name),
    get(version, name, "AdjustFlowStream"),
    get(version, name, "CreateFlowStream"),
    get(version, name, "DepositFlowStream"),
    get(version, name, "PauseFlowStream"),
    get(version, name, "RefundFromFlowStream"),
    get(version, name, "RestartFlowStream"),
    get(version, name, "VoidFlowStream"),
    get(version, name, "WithdrawFromFlowStream"),
  ];
}

const v1_0Events = base("v1.0");

// v1.1 includes all v1.0 events plus CollectFees
const v1_1Events: Types.Event[] = [...base("v1.1"), get("v1.1", contracts.names.SABLIER_FLOW, "CollectFees")];

const flowEvents: Types.EventMap = {
  [contracts.names.SABLIER_FLOW]: {
    "v1.0": v1_0Events,
    "v1.1": v1_1Events,
  },
} as const;

export default flowEvents;
