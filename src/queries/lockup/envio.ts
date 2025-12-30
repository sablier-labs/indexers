import { gql } from "../../gql/lockup/envio/gql";
import * as actionsQueries from "../common/actions/envio";
import * as streamsQueries from "../common/streams/envio";

export const getActions = gql(actionsQueries.getActions);
export const getStream = gql(streamsQueries.getStream);
export const getStreamWithActions = gql(streamsQueries.getStreamWithActions);
export const getStreams = gql(streamsQueries.getStreams);
export const getStreamsWithActions = gql(streamsQueries.getStreamsWithActions);

/* -------------------------------------------------------------------------- */
/*                            SHAPE DISTRIBUTION                              */
/* -------------------------------------------------------------------------- */

const getShapeDistributionQuery = /* GraphQL */ `
  query getShapeDistribution {
    total: Stream_aggregate {
      aggregate {
        count
      }
    }

    # Linear shapes (5)
    cliff: Stream_aggregate(where: { shape: { _eq: "cliff" } }) {
      aggregate {
        count
      }
    }
    linear: Stream_aggregate(where: { shape: { _eq: "linear" } }) {
      aggregate {
        count
      }
    }
    linearTimelock: Stream_aggregate(where: { shape: { _eq: "linearTimelock" } }) {
      aggregate {
        count
      }
    }
    linearUnlockCliff: Stream_aggregate(where: { shape: { _eq: "linearUnlockCliff" } }) {
      aggregate {
        count
      }
    }
    linearUnlockLinear: Stream_aggregate(where: { shape: { _eq: "linearUnlockLinear" } }) {
      aggregate {
        count
      }
    }

    # Tranched shapes (4)
    tranchedBackweighted: Stream_aggregate(where: { shape: { _eq: "tranchedBackweighted" } }) {
      aggregate {
        count
      }
    }
    tranchedMonthly: Stream_aggregate(where: { shape: { _eq: "tranchedMonthly" } }) {
      aggregate {
        count
      }
    }
    tranchedStepper: Stream_aggregate(where: { shape: { _eq: "tranchedStepper" } }) {
      aggregate {
        count
      }
    }
    tranchedTimelock: Stream_aggregate(where: { shape: { _eq: "tranchedTimelock" } }) {
      aggregate {
        count
      }
    }

    # Dynamic shapes (8)
    dynamicCliffExponential: Stream_aggregate(where: { shape: { _eq: "dynamicCliffExponential" } }) {
      aggregate {
        count
      }
    }
    dynamicDoubleUnlock: Stream_aggregate(where: { shape: { _eq: "dynamicDoubleUnlock" } }) {
      aggregate {
        count
      }
    }
    dynamicExponential: Stream_aggregate(where: { shape: { _eq: "dynamicExponential" } }) {
      aggregate {
        count
      }
    }
    dynamicMonthly: Stream_aggregate(where: { shape: { _eq: "dynamicMonthly" } }) {
      aggregate {
        count
      }
    }
    dynamicStepper: Stream_aggregate(where: { shape: { _eq: "dynamicStepper" } }) {
      aggregate {
        count
      }
    }
    dynamicTimelock: Stream_aggregate(where: { shape: { _eq: "dynamicTimelock" } }) {
      aggregate {
        count
      }
    }
    dynamicUnlockLinear: Stream_aggregate(where: { shape: { _eq: "dynamicUnlockLinear" } }) {
      aggregate {
        count
      }
    }
    dynamicUnlockCliff: Stream_aggregate(where: { shape: { _eq: "dynamicUnlockCliff" } }) {
      aggregate {
        count
      }
    }

    # Special
    unknown: Stream_aggregate(where: { shape: { _eq: "unknown" } }) {
      aggregate {
        count
      }
    }
    nullShape: Stream_aggregate(where: { shape: { _is_null: true } }) {
      aggregate {
        count
      }
    }
  }
`;

export const getShapeDistribution = gql(getShapeDistributionQuery);
