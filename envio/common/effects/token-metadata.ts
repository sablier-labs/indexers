import { createEffect, S } from "envio";
import type { Address, PublicClient } from "viem";
import { erc20Abi, erc20Abi_bytes32, hexToString, isHex, trim } from "viem";
import { DECIMALS_DEFAULT } from "../constants.js";
import { sanitizeStringAndRemoveUrls as sanitize } from "../helpers.js";
import { getClient } from "../rpc-clients.js";
import type { RPCData } from "../types.js";

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
export const fetchTokenMetadata = createEffect(
  {
    cache: true,
    input: S.tuple((t) => ({
      address: t.item(1, S.string),
      chainId: t.item(0, S.number),
    })),
    name: "tokenMetadata",
    output: TokenMetadata,
    rateLimit: false,
  },
  async ({ context, input }) => {
    try {
      const metadata = await fetch(input.chainId, input.address as Address);
      return metadata;
    } catch (error) {
      context.log.error("Failed to fetch ERC-20 metadata", {
        assetAddress: input.address,
        chainId: input.chainId,
        error,
      });
      return UNKNOWN;
    }
  }
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
async function fetch(chainId: number, address: Address): Promise<RPCData.ERC20Metadata> {
  const client = getClient(chainId);
  const [decimalsResult, nameResult, symbolResult] = await readMetadataFields(client, {
    abi: erc20Abi,
    address,
  });

  const decimals =
    typeof decimalsResult.result === "number" ? decimalsResult.result : DECIMALS_DEFAULT;
  if (typeof nameResult.result === "string" && typeof symbolResult.result === "string") {
    const metadata = {
      decimals,
      name: sanitize(nameResult.result),
      symbol: sanitize(symbolResult.result),
    };
    return metadata;
  }

  const metadata = await fetchBytes32(chainId, address);
  return metadata;
}

async function fetchBytes32(chainId: number, address: Address): Promise<RPCData.ERC20Metadata> {
  const client = getClient(chainId);
  const [decimalsResult, nameResult, symbolResult] = await readMetadataFields(client, {
    abi: erc20Abi_bytes32,
    address,
  });

  const fromHex = (value: unknown) => {
    if (typeof value !== "string" || !isHex(value)) {
      return undefined;
    }
    const trimmed = trim(value, { dir: "right" });
    return sanitize(hexToString(trimmed));
  };

  const decimals =
    typeof decimalsResult.result === "number" ? decimalsResult.result : UNKNOWN.decimals;
  const name = fromHex(nameResult.result) ?? UNKNOWN.name;
  const symbol = fromHex(symbolResult.result) ?? UNKNOWN.symbol;

  return {
    decimals,
    name,
    symbol,
  };
}

/** The ERC-20 metadata fields we read, in the order the callers destructure them. */
const METADATA_FUNCTION_NAMES = ["decimals", "name", "symbol"] as const;

type MetadataFieldResult = { result?: unknown; status: "failure" | "success" };

/**
 * Reads `decimals`, `name`, and `symbol`, batching them into a single Multicall3 call when the
 * chain declares a `multicall3` deployment and falling back to one `eth_call` per field otherwise.
 *
 * The fallback matters: viem throws `ChainDoesNotSupportContract` from `multicall` before issuing
 * any RPC request when `chain.contracts.multicall3` is undefined. That throw used to escape to the
 * effect's catch-all and degrade *every* token on such a chain to the UNKNOWN sentinel, including
 * `decimals: 0` — which silently rescales amounts in downstream consumers.
 */
function readMetadataFields(
  client: PublicClient,
  erc20: { abi: typeof erc20Abi | typeof erc20Abi_bytes32; address: Address }
): Promise<MetadataFieldResult[]> {
  const contracts = METADATA_FUNCTION_NAMES.map((functionName) => ({ ...erc20, functionName }));

  if (client.chain?.contracts?.multicall3) {
    return client.multicall({ allowFailure: true, contracts });
  }

  return Promise.all(
    contracts.map(async (contract): Promise<MetadataFieldResult> => {
      try {
        return { result: await client.readContract(contract), status: "success" };
      } catch {
        return { status: "failure" };
      }
    })
  );
}
