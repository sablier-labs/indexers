import * as fs from "node:fs";
import type { AbiEventParameter } from "abitype";
import type { Abi, AbiEvent, AbiParameter } from "viem";
import { getAbiItem } from "viem";
import { sanitizeContractName } from "../../../../lib/helpers";
import { logger } from "../../../../lib/logger";
import paths from "../../../../lib/paths";
import type { Types } from "../../../../lib/types";
import type { Indexer } from "../../../../src/types";
import type { GraphManifest } from "./manifest-types";

/**
 * Resolves an event handler for The Graph manifest.
 * @param indexer The indexer that should process the event; @see Indexer.Name
 * @param event The event object; @see Types.Event
 * @returns A {@link typeof GraphManifest.EventHandler} object
 */
export function resolveEventHandler(
  indexer: Indexer.Name,
  event: Types.Event,
): GraphManifest.EventHandler | null {
  const { contractName, eventName, indexers, protocol, version } = event;
  if (!indexers.includes(indexer)) {
    return null;
  }
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
    logger.error(
      `Error processing ABI for contract ${contractName} and event ${eventName}: ${error}`,
    );
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
      if (comp.type.startsWith("tuple")) {
        return processComponentsType(comp);
      }
      return comp.type;
    })
    .join(",");

  const tupleStr = `(${typeStr})`;
  const arrayNotation = input.type.includes("[]") ? "[]" : "";
  return `${tupleStr}${arrayNotation}`;
}
