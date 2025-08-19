import * as EntityAction from "./entity-action";
import * as EntityAsset from "./entity-asset";
import * as EntityWatcher from "./entity-watcher";

export namespace CommonStore {
  export import Action = EntityAction;
  export import Asset = EntityAsset;
  export import Watcher = EntityWatcher;
}
