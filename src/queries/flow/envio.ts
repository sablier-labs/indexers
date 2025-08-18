import { gql } from "../../gql/flow/envio/gql";
import * as actionsQueries from "../common/actions/envio";
import * as streamsQueries from "../common/streams/envio";

export const getActions = gql(actionsQueries.getActions);
export const getStream = gql(streamsQueries.getStream);
export const getStreamWithActions = gql(streamsQueries.getStreamWithActions);
export const getStreams = gql(streamsQueries.getStreams);
export const getStreamsWithActions = gql(streamsQueries.getStreamsWithActions);
