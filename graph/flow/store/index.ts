import { createAction } from "./entity-action";
import { getOrCreateAsset } from "./entity-asset";
import { getOrCreateBatcher } from "./entity-batcher";
import { createStream, getStream } from "./entity-stream";
import { getOrCreateWatcher } from "./entity-watcher";

export namespace Store {
  export namespace Action {
    export const create = createAction;
  }

  export namespace Asset {
    export const getOrCreate = getOrCreateAsset;
  }
  export namespace Batcher {
    export const getOrCreate = getOrCreateBatcher;
  }

  export namespace Stream {
    export const create = createStream;
    export const get = getStream;
  }

  export namespace Watcher {
    export const getOrCreate = getOrCreateWatcher;
  }
}
