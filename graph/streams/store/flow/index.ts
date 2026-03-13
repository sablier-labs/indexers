import { createAction } from "./entity-action";
import { getOrCreateBatcher } from "./entity-batcher";
import { createStream, getStream } from "./entity-stream";

export namespace FlowStore {
  export namespace Action {
    export const create = createAction;
  }

  export namespace Batcher {
    export const getOrCreate = getOrCreateBatcher;
  }

  export namespace Stream {
    export const create = createStream;
    export const get = getStream;
  }
}
