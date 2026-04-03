import { FileSystem } from "@effect/platform";
import type { AbiEventParameter } from "abitype";
import { Effect } from "effect";
import type { Abi, AbiEvent, AbiParameter } from "viem";
import { getAbiItem } from "viem";
import { sanitizeContractName } from "../../../../cli/contract-name.js";
import paths from "../../../../cli/paths.js";
import type { Indexer, Model } from "../../../../src/types.js";
import type { GraphManifest } from "./manifest-types.js";

/**
 * Resolves an event handler for The Graph manifest.
 * @param target The target that should process the event; @see Indexer.Target
 * @param event The event object; @see Model.Event
 * @returns A {@link typeof GraphManifest.EventHandler} object
 */
export function resolveEventHandler(
  target: Indexer.Target,
  event: Model.Event
): Effect.Effect<GraphManifest.EventHandler | null, Error, FileSystem.FileSystem> {
  return Effect.gen(function* () {
    const { contractName, eventName, indexers, protocol, version } = event;
    if (!indexers.includes(target)) {
      return null;
    }

    const fs = yield* FileSystem.FileSystem;
    const abiPath = paths.abi(contractName, protocol, version);
    const sanitizedContractName = sanitizeContractName(contractName, version);
    const abiContent = yield* fs
      .readFileString(abiPath)
      .pipe(
        Effect.mapError((error) => (error instanceof Error ? error : new Error(String(error))))
      );
    const abi = yield* Effect.try({
      catch: (error) => (error instanceof Error ? error : new Error(String(error))),
      try: () => JSON.parse(abiContent) as Abi,
    });
    const abiItem = getAbiItem({ abi, name: eventName });
    const abiEvent = abiItem?.type === "event" ? (abiItem as AbiEvent) : undefined;
    if (!abiEvent) {
      return yield* Effect.fail(
        new Error(`Event ${eventName} not found in ABI of contract ${contractName}`)
      );
    }

    const eventSignature = buildEventSignature(abiEvent, eventName);
    return {
      event: eventSignature,
      handler: `handle_${sanitizedContractName}_${eventName}`,
    };
  });
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
