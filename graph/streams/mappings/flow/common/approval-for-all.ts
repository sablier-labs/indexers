import { ethereum } from "@graphprotocol/graph-ts";
import { ONE, ZERO } from "../../../../common/constants";
import { CommonParams } from "../../../../common/types";
import { FlowStore } from "../../../store";

export function handleApprovalForAll(
  event: ethereum.Event,
  params: CommonParams.ApprovalForAll
): void {
  FlowStore.Action.create(event, {
    addressA: params.owner,
    addressB: params.operator,
    amountA: params.approved ? ONE : ZERO,
    category: "ApprovalForAll",
  } as CommonParams.Action);
}
