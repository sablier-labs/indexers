/**
 * Using Envio's new `context.effects` API, we can speed up the indexing by executing requests in parallel for all
 * events in the batch. All calls are automatically memoized, so we don't need to worry about duplicate requests.
 */
import * as ERC20Effects from "./erc20";
import * as PRBProxyEffects from "./prb-proxy";

export namespace Effects {
  export import ERC20 = ERC20Effects;
  export import PRBProxy = PRBProxyEffects;
}
