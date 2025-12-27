import type { DocumentNode } from "graphql";
import gql from "graphql-tag";
import _ from "lodash";
import { Protocol } from "sablier/evm";
import type { Indexer } from "../src";

export namespace Airdrops {
  export enum ActionCategory {
    Claim = "Claim",
    Clawback = "Clawback",
    Create = "Create",
    LowerMinFeeUSD = "LowerMinFeeUSD",
    TransferAdmin = "TransferAdmin",
  }

  export enum CampaignCategory {
    Instant = "Instant",
    LockupLinear = "LockupLinear",
    LockupTranched = "LockupTranched",
  }
}

export namespace Flow {
  export enum ActionCategory {
    Approval = "Approval",
    ApprovalForAll = "ApprovalForAll",
    Adjust = "Adjust",
    Create = "Create",
    Deposit = "Deposit",
    Pause = "Pause",
    Refund = "Refund",
    Restart = "Restart",
    Transfer = "Transfer",
    Void = "Void",
    Withdraw = "Withdraw",
  }

  export enum StreamCategory {
    Flow = "Flow",
  }
}

export namespace Lockup {
  export enum ActionCategory {
    Approval = "Approval",
    ApprovalForAll = "ApprovalForAll",
    Cancel = "Cancel",
    Create = "Create",
    Renounce = "Renounce",
    Transfer = "Transfer",
    Withdraw = "Withdraw",
  }

  export enum StreamCategory {
    LockupDynamic = "LockupDynamic",
    LockupLinear = "LockupLinear",
    LockupTranched = "LockupTranched",
  }

  export enum ShapeSource {
    Event = "Event",
    Inferred = "Inferred",
  }
}

/**
 * Generates the GraphQL enum definitions for the given protocol.
 * @example
 * ```graphql
 * enum StreamCategory {
 *   LockupDynamic
 *   LockupLinear
 *   LockupTranched
 * }
 * ```
 */
export function getEnumDefs(indexer: Indexer.Name): DocumentNode {
  const enumDefs: string[] = [];

  if (indexer === "analytics") {
    throw new Error(`Unsupported indexer for enum definitions: ${indexer}`);
  }

  switch (indexer) {
    case Protocol.Airdrops:
      enumDefs.push(
        getEnum(Airdrops.ActionCategory, "ActionCategory"),
        getEnum(Airdrops.CampaignCategory, "CampaignCategory")
      );
      break;
    case Protocol.Flow:
      enumDefs.push(
        getEnum(Flow.ActionCategory, "ActionCategory"),
        getEnum(Flow.StreamCategory, "StreamCategory")
      );
      break;
    case Protocol.Lockup:
      enumDefs.push(
        getEnum(Lockup.ActionCategory, "ActionCategory"),
        getEnum(Lockup.StreamCategory, "StreamCategory"),
        getEnum(Lockup.ShapeSource, "ShapeSource")
      );
      break;
  }

  return gql`
    ${enumDefs.join("\n")}
  `;
}

/**
 * @todo: Unit test this function.
 */
function getEnum<T extends Record<string, string>>(enumObj: T, name: string): string {
  const enumValues = _.keys(enumObj)
    .map((key) => `  ${enumObj[key]}`)
    .join("\n");

  return `enum ${name} {\n${enumValues}\n}`;
}
