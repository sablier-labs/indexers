import { Effect } from "effect";
import type { Version } from "sablier/evm";
import { getCompatibleLockupAddresses } from "../../../../../contracts/compatible-lockups.js";
import { CodegenError } from "../../errors.js";
import type { GraphManifest } from "../manifest-types.js";
import { getSources } from "./get-sources.js";

export function getAirdropsSources(chainId: number) {
  return Effect.gen(function* () {
    const sources = yield* getSources("airdrops", chainId, "airdrops");

    for (const source of sources) {
      if (source._type === "template" || !source.context) {
        continue;
      }
      source.context.lockups = yield* getLockups(source.context);
    }

    return sources;
  });
}

/**
 * Retrieves the addresses of official Lockup contracts for a specific chain.
 * The Merkle contract creation functions take a Lockup contract address as a user-provided argument.
 * So users can provide any address when deploying an airdrop contract, but we only index official deployments.
 */
function getLockups(context: GraphManifest.Context) {
  return Effect.gen(function* () {
    const chainId = Number(context.chainId.data);
    const addresses = getCompatibleLockupAddresses(
      chainId,
      context.version?.data as Version.Airdrops
    );
    if (!addresses) {
      return yield* Effect.fail(new CodegenError.ContractsNotFound("lockup", chainId));
    }

    return {
      data: addresses.map((data) => ({ data, type: "String" })),
      type: "List",
    } satisfies GraphManifest.ContextItem.ListAddress;
  });
}
