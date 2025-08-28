import { createAction } from "./entity-action";
import { getOrCreateAsset } from "./entity-asset";
import { getOrCreateBatcher } from "./entity-batcher";
import { loadOrCreateContract } from "./entity-contract";
import { createDeprecatedStream, existsDeprecatedStream } from "./entity-deprecated-stream";
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

  export namespace Contract {
    export const loadOrCreate = loadOrCreateContract;
  }

  export namespace DeprecatedStream {
    export const create = createDeprecatedStream;
    export const exists = existsDeprecatedStream;
  }

  export namespace Stream {
    export const create = createStream;
    export const get = getStream;
  }

  export namespace Watcher {
    export const getOrCreate = getOrCreateWatcher;
  }
}
