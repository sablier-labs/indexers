import * as EntityAction from "./entity-action";
import * as EntityAsset from "./entity-asset";
import * as EntityDeprecatedStream from "./entity-deprecated-stream";
import * as EntityWatcher from "./entity-watcher";

export namespace CommonStore {
  export import Action = EntityAction;
  export import Asset = EntityAsset;
  export import DeprecatedStream = EntityDeprecatedStream;
  export import Watcher = EntityWatcher;
}
