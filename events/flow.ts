/**
 * @see https://github.com/sablier-labs/flow/blob/main/CHANGELOG.md
 */
import type { Sablier } from "sablier";
import { contracts } from "sablier/evm";
import type { Types } from "../lib/types";
import type { Indexer } from "../src/types";
import { erc721 } from "./common/erc721";

const DEFAULT_INDEXERS: Array<Indexer.Name> = ["flow", "analytics"];

function get(
  version: Sablier.Version.Flow,
  contractName: string,
  eventName: string,
  indexers: Array<Indexer.Name> = DEFAULT_INDEXERS,
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
    ...erc721("flow", DEFAULT_INDEXERS, version, name),
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

const v1_0 = base("v1.0");
const v1_1: Types.Event[] = [...base("v1.1"), get("v1.1", contracts.names.SABLIER_FLOW, "CollectFees", ["analytics"])];
const v2_0: Types.Event[] = base("v2.0");

const flowEvents: Types.EventMap = {
  [contracts.names.SABLIER_FLOW]: {
    "v1.0": v1_0,
    "v1.1": v1_1,
    "v2.0": v2_0,
  },
} as const;

export default flowEvents;
