import { Transfer as EventTransfer } from "./erc20/ERC20/ERC20";
import { DeployProxy as EventDeployProxy } from "./prb-proxy/PRBProxyRegistry/PRBProxyRegistry";

/**
 * Dummy handler for ERC20 Transfer events.
 * This function exists only to generate the necessary bindings and is not meant to be used in production.
 */
export function handleTransfer(event: EventTransfer): void {
  event.params.from.toHexString();
}

/**
 * Dummy handler for PRBProxyRegistry events.
 * This function exists only to generate the necessary bindings and is not meant to be used in production.
 */
export function handleDeployProxy(event: EventDeployProxy): void {
  event.params.proxy.toHexString();
}
