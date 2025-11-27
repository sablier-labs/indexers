import type { Logger } from "envio";
import { experimental_createEffect, S } from "envio";
import { isVersionAfter } from "sablier";
import { Version } from "sablier/evm";
import { zeroAddress } from "viem";
import PRBProxyABI from "../../../abi/PRBProxy.json";
import PRBProxyRegistryABI from "../../../abi/PRBProxyRegistry.json";
import type { Envio } from "../../common/bindings";
import { NOT_AVAILABLE, PRB_PROXY_REGISTRY_v4_0_0, PRB_PROXY_REGISTRY_v4_0_1 } from "../../common/constants";
import { getContractVersion } from "../../common/deployments";
import { getClient } from "../../common/rpc-clients";

/**
 * Reads the proxy owner from the cache or, if not found, fetches it from the RPC.
 * The proxender is the owner of the proxy contract, which is the sender of the stream.
 * @see https://github.com/PaulRBerg/prb-proxy
 * @see https://docs.envio.dev/docs/HyperIndex/event-handlers#contexteffect-experimental
 */
export const fetchProxender = experimental_createEffect(
  {
    cache: true,
    input: S.tuple((t) => ({
      chainId: t.item(0, S.number),
      lockupAddress: t.item(1, S.string),
      streamSender: t.item(2, S.string),
    })),
    name: "proxender",
    output: S.union([S.shape(S.schema(0), (_) => NOT_AVAILABLE), S.string]),
  },
  async ({ context, input }) => {
    // PRBProxy was only used in Lockup v1.0
    const version = getContractVersion("lockup", input.chainId, input.lockupAddress as Envio.Address);
    if (isVersionAfter(version, Version.Lockup.V1_0)) {
      return NOT_AVAILABLE;
    }

    const owner = await fetchProxyOwner(context.log, input.chainId, input.streamSender as Envio.Address);
    if (!owner) {
      return NOT_AVAILABLE;
    }

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

  const proxy = streamSender as `0x${string}`;
  try {
    const ownerResult = await client.readContract({
      abi: PRBProxyABI,
      address: proxy,
      functionName: "owner",
    });
    const owner = (ownerResult as Envio.Address).toLowerCase();

    // See https://github.com/sablier-labs/indexers/issues/148
    let reverse = await fetchReverse(chainId, PRB_PROXY_REGISTRY_v4_0_1, owner);

    if (!reverse || reverse === zeroAddress || reverse !== proxy) {
      reverse = await fetchReverse(chainId, PRB_PROXY_REGISTRY_v4_0_0, owner);
    }

    // Check that the registry knows about the proxy.
    if (!reverse || reverse === zeroAddress || reverse !== proxy) {
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
