import type { AbiEventParameter } from "abitype";
import * as fs from "fs-extra";
import { type Abi, type AbiEvent, type AbiParameter, getAbiItem } from "viem";
import { sanitizeContractName } from "../../lib/helpers";
import paths from "../../lib/paths";
import type { Types } from "../../lib/types";
import { logger } from "../../lib/winston";
import type { GraphManifest } from "./manifest-types";

/**
 * Resolves an event handler for The Graph manifest.
 * @param event The event object; @see Types.Event
 * @returns A {@link GraphManifest.EventHandler} object
 */
export function resolveEventHandler(event: Types.Event): GraphManifest.EventHandler {
  const { contractName, eventName, protocol, version } = event;
  const abiPath = paths.abi(contractName, protocol, version);

  try {
    const sanitizedContractName = sanitizeContractName(contractName, version);
    const abiContent: Abi = JSON.parse(fs.readFileSync(abiPath, "utf-8"));
    const abiItem = getAbiItem({ abi: abiContent, name: eventName });
    const abiEvent = abiItem?.type === "event" ? (abiItem as AbiEvent) : undefined;
    if (!abiEvent) {
      throw new Error(`Event ${eventName} not found in ABI of contract ${contractName}`);
    }

    const eventSignature = buildEventSignature(abiEvent, eventName);
    return {
      event: eventSignature,
      handler: `handle_${sanitizedContractName}_${eventName}`,
    };
  } catch (error) {
    logger.error(`Error processing ABI for contract ${contractName} and event ${eventName}: ${error}`);
    throw error;
  }
}

/* -------------------------------------------------------------------------- */
/*                                COMMON LOGIC                                */
/* -------------------------------------------------------------------------- */

/**
 * Builds the event signature string from the event definition. Note that this will not include parameter names.
 * @example Approval(indexed address,indexed address,uint256)
 * @example CreateLockupLinearStream(uint256,address,indexed address,indexed address,(uint128,uint128,uint128),indexed address,bool,bool,(uint40,uint40,uint40),address)
 */
function buildEventSignature(event: AbiEvent, name: string): string {
  if (!event.inputs || event.inputs.length === 0) {
    return `${name}()`;
  }

  const inputs = event.inputs
    .map((input: AbiEventParameter) => {
      let typeStr: string;

      // Handle tuple types (tuple and tuple[]) by unpacking their component types
      if (input.type.startsWith("tuple")) {
        typeStr = processComponentsType(input);
      } else {
        typeStr = input.type;
      }

      return input.indexed ? `indexed ${typeStr}` : typeStr;
    })
    .join(",");

  return `${name}(${inputs})`;
}

/**
 * Recursively processes tuple components to handle nested tuples
 */
function processComponentsType(input: AbiEventParameter): string {
  if ("components" in input === false) {
    return input.type;
  }

  const typeStr = input.components
    .map((comp: AbiParameter) => {
      if (comp.type === "tuple") {
        return processComponentsType(comp);
      }
      return comp.type;
    })
    .join(",");

  const tupleStr = `(${typeStr})`;
  const arrayNotation = input.type.includes("[]") ? "[]" : "";
  return `${tupleStr}${arrayNotation}`;
}
