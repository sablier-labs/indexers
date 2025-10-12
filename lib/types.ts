/**
 * Types needed for all indexers: Envio and The Graph.
 */
import type { Sablier } from "sablier";
import type { Indexer } from "../src";

export namespace Types {
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
    indexers: Array<Indexer.Name>;
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
