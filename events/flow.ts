import type { Sablier } from "sablier";
import { contracts } from "sablier";
import type { Types } from "../lib/types";
import type { Indexer } from "../src/types";
import { erc721 } from "./common/erc721";

/**
 * @param version - The version of the contract.
 * @param contractName - The name of the contract.
 * @param eventName - The name of the event.
 * @param indexers - The indexers that should process the event. By default, it includes "flow" and "analytics".
 * @returns The event object.
 */
function get(
  version: Sablier.Version.Flow,
  contractName: string,
  eventName: string,
  indexers: Array<Indexer.Name> = ["flow", "analytics"],
): Types.Event {
  return {
    contractName,
    eventName,
    indexers,
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
const v1_1Events: Types.Event[] = [
  ...base("v1.1"),
  get("v1.1", contracts.names.SABLIER_FLOW, "CollectFees", ["analytics"]),
];

const flowEvents: Types.EventMap = {
  [contracts.names.SABLIER_FLOW]: {
    "v1.0": v1_0Events,
    "v1.1": v1_1Events,
  },
} as const;

export default flowEvents;
