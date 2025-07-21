import { experimental_createEffect, S } from "envio";
import { erc20Abi, erc20Abi_bytes32, hexToString, trim } from "viem";
import { sanitizeString } from "../../../lib/helpers";
import type { Envio } from "../bindings";
import { DECIMALS_DEFAULT } from "../constants";
import { getClient } from "../rpc-clients";
import { type RPCData } from "../types";

const UNKNOWN = {
  decimals: DECIMALS_DEFAULT,
  name: "Unknown",
  symbol: "UNKNOWN",
};

// We alias the unknown token metadata as "0" to optimize the cache file size.
const TokenMetadata = S.union([
  S.shape(S.schema(0), (_) => ({
    decimals: UNKNOWN.decimals,
    name: UNKNOWN.name,
    symbol: UNKNOWN.symbol,
  })),
  {
    decimals: S.number,
    name: S.string,
    symbol: S.string,
  },
]);

/**
 * Reads the ERC-20 metadata from the cache or, if not found, fetches it from the RPC.
 * We use a tuple instead of an object to optimize the cache file size.
 *
 * @see https://docs.envio.dev/docs/HyperIndex/event-handlers#contexteffect-experimental
 */
export const readOrFetchMetadata = experimental_createEffect(
  {
    input: S.tuple((t) => ({
      address: t.item(0, S.string),
      chainId: t.item(1, S.number),
    })),
    name: "readOrFetchMetadata",
    output: TokenMetadata,
  },
  async ({ context, input }) => {
    try {
      const metadata = await fetch(input.chainId, input.address);
      return metadata;
    } catch (error) {
      context.log.error("Failed to fetch ERC-20 metadata", {
        assetAddress: input.address,
        chainId: input.chainId,
        error,
      });
      return UNKNOWN;
    }
  },
);

/* -------------------------------------------------------------------------- */
/*                               INTERNAL LOGIC                               */
/* -------------------------------------------------------------------------- */

/**
 * Fetches the ERC-20 metadata from the RPC. The logic of the function is:
 *
 * 1. Try standard ERC20 ABI first
 * 2. If the name or the symbol are not found, try the Bytes32 ABI.
 * 3. If that call fails, return UNKNOWN.
 *
 * Note that `decimals`, `name`, and `symbol` are all optional properties in ERC-20.
 *
 * @see https://github.com/sablier-labs/indexers/issues/150
 * @see https://ercs.ethereum.org/ERCS/erc-20
 */
async function fetch(chainId: number, address: Envio.Address): Promise<RPCData.ERC20Metadata> {
  const client = getClient(chainId);
  const erc20 = { abi: erc20Abi, address: address as `0x${string}` };

  const results = await client.multicall({
    allowFailure: true,
    contracts: [
      {
        ...erc20,
        functionName: "decimals",
      },
      {
        ...erc20,
        functionName: "name",
      },
      {
        ...erc20,
        functionName: "symbol",
      },
    ],
  });

  const decimals = results[0].result ?? DECIMALS_DEFAULT;
  if (results[1].status !== "failure" && results[2].status !== "failure") {
    const metadata = { decimals, name: sanitizeString(results[1].result), symbol: sanitizeString(results[2].result) };
    return metadata;
  }

  const metadata = await fetchBytes32(chainId, address);
  return metadata;
}

async function fetchBytes32(chainId: number, address: Envio.Address): Promise<RPCData.ERC20Metadata> {
  const client = getClient(chainId);
  const erc20Bytes32 = { abi: erc20Abi_bytes32, address: address as `0x${string}` };

  const results = await client.multicall({
    allowFailure: true,
    contracts: [
      {
        ...erc20Bytes32,
        functionName: "decimals",
      },
      {
        ...erc20Bytes32,
        functionName: "name",
      },
      {
        ...erc20Bytes32,
        functionName: "symbol",
      },
    ],
  });

  const fromHex = (value: `0x${string}`) => {
    const trimmed = trim(value, { dir: "right" });
    return hexToString(trimmed);
  };

  const decimals = results[0].result ?? UNKNOWN.decimals;
  const name = results[1].result ? sanitizeString(fromHex(results[1].result)) : UNKNOWN.name;
  const symbol = results[2].result ? sanitizeString(fromHex(results[2].result)) : UNKNOWN.symbol;

  return {
    decimals,
    name,
    symbol,
  };
}
