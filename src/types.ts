import type { Sablier } from "sablier";
import type * as enums from "./enums.js";

export type Indexer = {
  chainId: number;
  explorerURL?: string;
  endpoint: {
    id?: string;
    url: string;
  };
  kind: "custom" | "official";
  name: string;
  protocol: Indexer.Protocol;
  /** GraphQL endpoint that doesn't require an API key. Opening it in the browser may lead to a GraphiQL playground.*/
  testingURL?: string;
  vendor: Indexer.Vendor;
};

export namespace Indexer {
  export type EnvioConfig = {
    chainId: number;
    hypersyncURL?: string;
  };

  export type EnvioDeployment = {
    /** Unix timestamp in seconds for when the indexer ID was created. */
    createdOn?: number;
    endpoint: {
      /** The indexer ID value, e.g. `53b7e25`. */
      id: string;
      /** The URL of the indexer. */
      url: string;
    };
    /** The URL on the Envio Hosted Service. */
    explorerURL: string;
    /** The protocol associated with this indexer. */
    protocol: Indexer.Protocol;
    /**
     * Unix timestamp in seconds for when the indexer ID was used last time in the Sablier Interface.
     * An undefined value means that the indexer ID is no longer used.
     */
    usedUntil?: number;
  };

  export type GraphConfig = {
    chainId: number;
  };

  export type Name = Protocol | "analytics" | "billing";

  export type Protocol = Exclude<Sablier.Protocol, "legacy">;

  export type Vendor = `${enums.Vendor}` | enums.Vendor;
}
