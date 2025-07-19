import { Address } from "@graphprotocol/graph-ts";
import { PRBProxy, PRBProxyRegistry } from "../../common/bindings";
import { PRB_PROXY_REGISTRY_v4_0_0, PRB_PROXY_REGISTRY_v4_0_1 } from "../../common/constants";
import { logError } from "../../common/logger";

/**
 * The proxender is the owner of the proxy that is the sender of the stream.
 */
export function loadProxender(streamSender: Address): Address | null {
  const proxy = PRBProxy.bind(streamSender);
  const owner = proxy.try_owner();

  // If the call reverted, it means that the stream sender is not a proxy.
  if (owner.reverted) {
    return null;
  }

  // Check that the registry knows about the proxy.
  let registry = PRBProxyRegistry.bind(PRB_PROXY_REGISTRY_v4_0_1);
  let reverse = registry.try_getProxy(owner.value);

  // See https://github.com/sablier-labs/indexers/issues/148
  if (reverse.reverted || !reverse.value.equals(Address.zero())) {
    registry = PRBProxyRegistry.bind(PRB_PROXY_REGISTRY_v4_0_0);
    reverse = registry.try_getProxy(owner.value);
  }

  if (reverse.reverted || !reverse.value.equals(streamSender)) {
    logError("Could not verify owner for proxy {}", [streamSender.toHexString()]);
    return null;
  }

  return owner.value;
}
