import { createAction } from "./entity-action";
import { getOrCreateAsset } from "./entity-asset";
import { createStreamDynamic, createStreamLinear, createStreamTranched, getStream } from "./entity-stream";
import { getOrCreateWatcher } from "./entity-watcher";

export namespace Store {
  export namespace Action {
    export const create = createAction;
  }

  export namespace Asset {
    export const getOrCreate = getOrCreateAsset;
  }

  export namespace Stream {
    export const createDynamic = createStreamDynamic;
    export const createLinear = createStreamLinear;
    export const createTranched = createStreamTranched;
    export const get = getStream;
  }

  export namespace Watcher {
    export const getOrCreate = getOrCreateWatcher;
  }
}
