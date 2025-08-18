import { gql } from "../../gql/flow/graph/gql";
import * as actionsQueries from "../common/actions/graph";
import * as streamsQueries from "../common/streams/graph";

export const getActions = gql(actionsQueries.getActions);
export const getStream = gql(streamsQueries.getStream);
export const getStreamWithActions = gql(streamsQueries.getStreamWithActions);
export const getStreams = gql(streamsQueries.getStreams);
export const getStreamsWithActions = gql(streamsQueries.getStreamsWithActions);
