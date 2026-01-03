import * as EntityAction from "./entity-action";
import * as EntityAsset from "./entity-asset";
import * as EntityContract from "./entity-contract";
import * as EntityDeprecatedStream from "./entity-deprecated-stream";
import * as EntityWatcher from "./entity-watcher";

export const CommonStore = {
  Action: EntityAction,
  Asset: EntityAsset,
  Contract: EntityContract,
  DeprecatedStream: EntityDeprecatedStream,
  Watcher: EntityWatcher,
};

export * as Contract from "./entity-contract";
