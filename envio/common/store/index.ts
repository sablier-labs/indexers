import * as EntityAction from "./entity-action.js";
import * as EntityAsset from "./entity-asset.js";
import * as EntityContract from "./entity-contract.js";
import * as EntityDeprecatedStream from "./entity-deprecated-stream.js";
import * as EntityWatcher from "./entity-watcher.js";

export const CommonStore = {
  Action: EntityAction,
  Asset: EntityAsset,
  Contract: EntityContract,
  DeprecatedStream: EntityDeprecatedStream,
  Watcher: EntityWatcher,
};

export * as Contract from "./entity-contract.js";
