import type { Indexer } from "../../src/index.js";

export type ChainArg = string | "all";
export type TargetArg = Indexer.Target | "all";
export type VendorArg = "graph" | "envio" | "all";
