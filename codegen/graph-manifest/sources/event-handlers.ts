import _ from "lodash";
import { indexedEvents } from "../../../events";
import type { Types } from "../../../lib/types";
import type { Indexer } from "../../../src";
import { resolveEventHandler } from "../event-resolver";
import type { EventHandlersMap } from "../manifest-types";

function get(protocol: Indexer.Protocol): EventHandlersMap {
  return _.mapValues(indexedEvents[protocol], (versions) =>
    _.mapValues(versions, (events) => events.map(resolveEventHandler)),
  );
}

const eventHandlersMap: Types.ProtocolMap<EventHandlersMap> = {
  airdrops: get("airdrops"),
  flow: get("flow"),
  lockup: get("lockup"),
};

export default eventHandlersMap;
