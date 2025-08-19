import type { Sablier } from "sablier";
import type * as enums from "./enums";

/**
 * Reusing the auto-generated types from the GraphQL codegen.
 * Note that the name of the type has to be the same as the one in the auto-generated types.
 * Also, the types cannot be nested under a namespace.
 * @see {@link file://./gql/airdrops/graph/graphql.ts}
 * @see {@link file://./gql/flow/graph/graphql.ts}
 * @see {@link file://./gql/lockup/graph/graphql.ts}
 */
export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

/**
 * @see {@link file://./gql/airdrops/envio/graphql.ts}
 * @see {@link file://./gql/flow/envio/graphql.ts}
 * @see {@link file://./gql/lockup/envio/graphql.ts}
 */
export enum Order_By {
  Asc = "asc",
  AscNullsFirst = "asc_nulls_first",
  AscNullsLast = "asc_nulls_last",
  Desc = "desc",
  DescNullsFirst = "desc_nulls_first",
  DescNullsLast = "desc_nulls_last",
}

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

  export type Name = Protocol | "analytics";

  export type Protocol = Exclude<Sablier.Protocol, "legacy">;

  export type Vendor = `${enums.Vendor}` | enums.Vendor;
}
