import { experimental_createEffect, S } from "envio";
import _ from "lodash";
import { erc20Abi, erc20Abi_bytes32, hexToString, trim } from "viem";
import type { Envio } from "../bindings";
import { DECIMALS_DEFAULT } from "../constants";
import { getClient } from "../rpc-clients";
import { initDataEntry } from "../rpc-data";
import { RPCData } from "../types";

const UNKNOWN = {
  decimals: 0,
  name: "Unknown",
  symbol: "Unknown",
};

const input = {
  address: S.string,
  chainId: S.number,
};

const output = S.schema({
  decimals: S.number,
  name: S.string,
  symbol: S.string,
});

/**
 * Reads the ERC-20 metadata from the cache or, if not found, fetches it from the RPC.
 * If the metadata is not found, it is not written to the cache.
 *
 * @see https://docs.envio.dev/docs/HyperIndex/event-handlers#contexteffect-experimental
 */
export const readOrFetchMetadata = experimental_createEffect(
  {
    input,
    name: "readOrFetchMetadata",
    output,
  },
  async ({ context, input }) => {
    // Check the cache first.
    const dataKey = input.address.toLowerCase();
    const data = initDataEntry(RPCData.Category.ERC20, input.chainId, context.log);
    const cachedMetadata = data.read(dataKey);
    if (!_.isEmpty(cachedMetadata)) {
      return cachedMetadata;
    }

    // Otherwise, fetch the metadata from the RPC.
    try {
      const metadata = await fetch(input.chainId, input.address);
      if (metadata.name !== UNKNOWN.name) {
        data.write({ [dataKey]: metadata });
      }
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
    const metadata = { decimals, name: String(results[1].result), symbol: String(results[2].result) };
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

  const decimals = results[0].result ?? DECIMALS_DEFAULT;
  const name = results[1].result ? fromHex(results[1].result) : UNKNOWN.name;
  const symbol = results[2].result ? fromHex(results[2].result) : UNKNOWN.symbol;

  return {
    decimals,
    name,
    symbol,
  };
}
