import type { Logger } from "envio";
import { experimental_createEffect, S } from "envio";
import _ from "lodash";
import { Version } from "sablier";
import { zeroAddress } from "viem";
import PRBProxyABI from "../../../abi/PRBProxy.json";
import PRBProxyRegistryABI from "../../../abi/PRBProxyRegistry.json";
import type { Envio } from "../bindings";
import { PRB_PROXY_REGISTRY_v4_0_0, PRB_PROXY_REGISTRY_v4_0_1 } from "../constants";
import { getContractVersion } from "../deployments";
import { getClient } from "../rpc-clients";
import { initDataEntry } from "../rpc-data";
import { RPCData } from "../types";

const input = {
  chainId: S.number,
  lockupAddress: S.string,
  streamSender: S.string,
};

const output = S.optional(S.string);

/**
 * Reads the proxy owner from the cache or, if not found, fetches it from the RPC.
 * The proxender is the owner of the proxy contract, which is the sender of the stream.
 * @see https://github.com/PaulRBerg/prb-proxy
 * @see https://docs.envio.dev/docs/HyperIndex/event-handlers#contexteffect-experimental
 */
export const readOrFetchProxender = experimental_createEffect(
  {
    input,
    name: "readOrFetchProxender",
    output: S.optional(output),
  },
  async ({ context, input }) => {
    // PRBProxy was only used in Lockup v1.0
    const version = getContractVersion("lockup", input.chainId, input.lockupAddress as Envio.Address);
    if (version !== Version.Lockup.V1_0) {
      return undefined;
    }

    const dataKey = input.streamSender.toLowerCase();
    const data = initDataEntry(RPCData.Category.Proxender, input.chainId, context.log);
    const cachedProxender = data.read(dataKey);

    // Proxies cannot be transferred, so we can cache proxy owners.
    if (!_.isEmpty(cachedProxender)) {
      return cachedProxender.owner;
    }

    const owner = await fetchProxyOwner(context.log, input.chainId, input.streamSender as Envio.Address);
    if (!owner) {
      return undefined;
    }

    data.write({ [dataKey]: { owner } });
    return owner;
  },
);

/* -------------------------------------------------------------------------- */
/*                               INTERNAL LOGIC                               */
/* -------------------------------------------------------------------------- */

async function fetchProxyOwner(
  logger: Logger,
  chainId: number,
  streamSender: Envio.Address,
): Promise<Envio.Address | undefined> {
  const client = getClient(chainId);

  const proxy = streamSender.toLowerCase() as `0x${string}`;
  try {
    const ownerResult = await client.readContract({
      abi: PRBProxyABI,
      address: proxy,
      functionName: "owner",
    });
    const owner = (ownerResult as Envio.Address).toLowerCase();

    // See https://github.com/sablier-labs/indexers/issues/148
    let reverse = await fetchReverse(chainId, PRB_PROXY_REGISTRY_v4_0_1, owner);
    if (!reverse || reverse === zeroAddress) {
      reverse = await fetchReverse(chainId, PRB_PROXY_REGISTRY_v4_0_0, owner);
    }

    // Check that the registry knows about the proxy.
    if (!reverse || reverse === zeroAddress) {
      logger.error("Could not verify owner for proxy", {
        chainId,
        owner,
        proxy,
        reverse,
      });
      return undefined;
    }

    return owner;
  } catch {
    // If the call reverted, it means that the stream sender is not a proxy.
    return undefined;
  }
}

async function fetchReverse(
  chainId: number,
  registry: Envio.Address,
  owner: Envio.Address,
): Promise<Envio.Address | undefined> {
  const client = getClient(chainId);

  const reverse = await client.readContract({
    abi: PRBProxyRegistryABI,
    address: registry as `0x${string}`,
    args: [owner],
    functionName: "getProxy",
  });

  if (!reverse) {
    return undefined;
  }

  return (reverse as Envio.Address).toLowerCase();
}
