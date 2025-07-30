/**
 * Using Envio's new `context.effects` API, we can speed up the indexing by executing requests in parallel for all
 * events in the batch. All calls are automatically memoized, so we don't need to worry about duplicate requests.
 */

import * as ProxenderEffect from "./proxender";
import * as TokenMetadataEffect from "./token-metadata";

export namespace Effects {
  export import Proxender = ProxenderEffect;
  export import TokenMetadata = TokenMetadataEffect;
}
