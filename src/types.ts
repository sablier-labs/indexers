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

  export type Name = Protocol | "analytics";

  export type Protocol = Exclude<Sablier.Protocol, "bob" | "legacy">;

  export type Vendor = `${enums.Vendor}` | enums.Vendor;
}

/**
 * Types needed for all indexers: Envio and The Graph.
 */
export namespace Model {
  export type ComponentMap<T> = {
    [contractName: string]: {
      [version: string]: T;
    };
  };

  /**
   * A variation of the Sablier.Contract with the `alias` and `block` fields required.
   * @see Sablier.Contract
   */
  export type Contract = Sablier.Contract & {
    alias: string;
    block: number;
    version: Sablier.Version;
  };

  export type ContractSource<V extends Version> = {
    /** The name of the contract, e.g., SablierFlow. */
    name: string;
    /** Whether the contract is a template, i.e., deployed by a factory. */
    isTemplate: boolean;
    /** The Sablier versions the contract is part of. */
    versions: V[];
  };

  /**
   * Event emitted by a Sablier contract that is tracked and processed by our indexers.
   * This type defines the metadata needed to identify and handle specific contract events
   * across different versions and protocols.
   */
  export type Event = {
    /** Name of contract whose ABI contains the event, e.g., SablierLockup. */
    contractName: string;
    /** Event name, e.g., Approval. */
    eventName: string;
    /** Indexers that should process the event, e.g., analytics. */
    indexers: Indexer.Name[];
    /** Protocol of contract, e.g., flow. */
    protocol: Indexer.Protocol;
    /** Version of contract, e.g., v1.0. */
    version: Version;
  };

  export type EventMap = ComponentMap<Event[]>;

  export type ProtocolMap<T> = {
    [protocol in Indexer.Protocol]: T;
  };

  export type Version = Sablier.Version.Airdrops | Sablier.Version.Flow | Sablier.Version.Lockup;
}
