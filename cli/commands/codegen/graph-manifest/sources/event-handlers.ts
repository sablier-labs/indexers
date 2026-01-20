import _ from "lodash";
import { indexedEvents } from "../../../../../events/index.js";
import type { Types } from "../../../../../lib/types.js";
import type { Indexer } from "../../../../../src/index.js";
import { resolveEventHandler } from "../event-resolver.js";
import type { EventHandlersMap, GraphManifest } from "../manifest-types.js";

function get(protocol: Indexer.Protocol): EventHandlersMap {
  return _.mapValues(indexedEvents[protocol], (versions) =>
    _.mapValues(versions, (events) =>
      events
        .map((event) => resolveEventHandler(protocol as Indexer.Name, event))
        .filter((handler): handler is GraphManifest.EventHandler => handler !== null)
    )
  );
}

const eventHandlersMap: Types.ProtocolMap<EventHandlersMap> = {
  airdrops: get("airdrops"),
  flow: get("flow"),
  lockup: get("lockup"),
};

export default eventHandlersMap;
