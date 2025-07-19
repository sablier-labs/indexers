import type { Sablier } from "sablier";
import type { Types } from "../../lib/types";

export type ABIEntriesMap = Types.ComponentMap<GraphManifest.ABI[]>;
export type EntitiesMap = Types.ComponentMap<string[]>;
export type EventHandlersMap = Types.ComponentMap<GraphManifest.EventHandler[]>;

/**
 * @see https://thegraph.com/docs/en/subgraphs/developing/creating/subgraph-manifest/
 */
export namespace GraphManifest {
  export type ABI = {
    name: string;
    file: string;
  };

  export namespace ContextItem {
    export type Address = {
      type: "String";
      data: Sablier.Address;
    };

    export type BigInt = {
      type: "BigInt";
      data: string;
    };
    export type List<T> = {
      type: "List";
      data: T[];
    };
    export type ListAddress = List<Address>;

    export type String = {
      type: "String";
      data: string;
    };
  }
  export type Context = {
    alias: ContextItem.String;
    chainId: ContextItem.BigInt;
    version: ContextItem.String;
    lockups?: ContextItem.ListAddress;
  };

  export type EventHandler = {
    /** Event signature without parameter names. */
    event: string;
    handler: `handle_${string}_${string}`;
  };

  /**
   * The undefined fields are for templates.
   * @see https://thegraph.com/docs/en/subgraphs/developing/creating/subgraph-manifest/#data-source-templates
   */
  export type Source = {
    kind: string;
    name: string;
    network: string;
    context?: Context;
    source: {
      abi: string;
      address?: Sablier.Address;
      startBlock?: number;
    };
    mapping: Mapping;
    /** Will not be included in the manifest. */
    _type?: "data-source" | "template";
  };

  export type Mapping = {
    /** @see https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#versions */
    apiVersion: "0.0.9";
    file: string;
    kind: string;
    language: string;
    abis: ABI[];
    entities: string[];
    eventHandlers: EventHandler[];
  };

  /**
   * This will be inlined. There will not be a `topSection` key in the manifest.
   */
  export type TopSection = {
    /** @see https://thegraph.com/docs/en/subgraphs/developing/creating/subgraph-manifest/#specversion-releases */
    specVersion: "1.3.0";
    description: string;
    repository: string;
    schema: {
      file: string;
    };
    dataSources: Source[];
    templates?: Source[];
  };
}
