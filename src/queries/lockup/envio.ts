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

/**
 * Excludes testnets (Sepolia 11155111, Base Sepolia 84532) from the shape distribution
 * to avoid skewing analytics with test data.
 */
const getShapeDistributionQuery = /* GraphQL */ `
  query getShapeDistribution {
    total: Stream_aggregate(where: { chainId: { _nin: ["11155111", "84532"] } }) {
      aggregate {
        count
      }
    }

    # Linear shapes (5)
    cliff: Stream_aggregate(where: { _and: [{ shape: { _eq: "cliff" } }, { chainId: { _nin: ["11155111", "84532"] } }] }) {
      aggregate {
        count
      }
    }
    linear: Stream_aggregate(where: { _and: [{ shape: { _eq: "linear" } }, { chainId: { _nin: ["11155111", "84532"] } }] }) {
      aggregate {
        count
      }
    }
    linearTimelock: Stream_aggregate(where: { _and: [{ shape: { _eq: "linearTimelock" } }, { chainId: { _nin: ["11155111", "84532"] } }] }) {
      aggregate {
        count
      }
    }
    linearUnlockCliff: Stream_aggregate(where: { _and: [{ shape: { _eq: "linearUnlockCliff" } }, { chainId: { _nin: ["11155111", "84532"] } }] }) {
      aggregate {
        count
      }
    }
    linearUnlockLinear: Stream_aggregate(where: { _and: [{ shape: { _eq: "linearUnlockLinear" } }, { chainId: { _nin: ["11155111", "84532"] } }] }) {
      aggregate {
        count
      }
    }

    # Tranched shapes (4)
    tranchedBackweighted: Stream_aggregate(where: { _and: [{ shape: { _eq: "tranchedBackweighted" } }, { chainId: { _nin: ["11155111", "84532"] } }] }) {
      aggregate {
        count
      }
    }
    tranchedMonthly: Stream_aggregate(where: { _and: [{ shape: { _eq: "tranchedMonthly" } }, { chainId: { _nin: ["11155111", "84532"] } }] }) {
      aggregate {
        count
      }
    }
    tranchedStepper: Stream_aggregate(where: { _and: [{ shape: { _eq: "tranchedStepper" } }, { chainId: { _nin: ["11155111", "84532"] } }] }) {
      aggregate {
        count
      }
    }
    tranchedTimelock: Stream_aggregate(where: { _and: [{ shape: { _eq: "tranchedTimelock" } }, { chainId: { _nin: ["11155111", "84532"] } }] }) {
      aggregate {
        count
      }
    }

    # Dynamic shapes (8)
    dynamicCliffExponential: Stream_aggregate(where: { _and: [{ shape: { _eq: "dynamicCliffExponential" } }, { chainId: { _nin: ["11155111", "84532"] } }] }) {
      aggregate {
        count
      }
    }
    dynamicDoubleUnlock: Stream_aggregate(where: { _and: [{ shape: { _eq: "dynamicDoubleUnlock" } }, { chainId: { _nin: ["11155111", "84532"] } }] }) {
      aggregate {
        count
      }
    }
    dynamicExponential: Stream_aggregate(where: { _and: [{ shape: { _eq: "dynamicExponential" } }, { chainId: { _nin: ["11155111", "84532"] } }] }) {
      aggregate {
        count
      }
    }
    dynamicMonthly: Stream_aggregate(where: { _and: [{ shape: { _eq: "dynamicMonthly" } }, { chainId: { _nin: ["11155111", "84532"] } }] }) {
      aggregate {
        count
      }
    }
    dynamicStepper: Stream_aggregate(where: { _and: [{ shape: { _eq: "dynamicStepper" } }, { chainId: { _nin: ["11155111", "84532"] } }] }) {
      aggregate {
        count
      }
    }
    dynamicTimelock: Stream_aggregate(where: { _and: [{ shape: { _eq: "dynamicTimelock" } }, { chainId: { _nin: ["11155111", "84532"] } }] }) {
      aggregate {
        count
      }
    }
    dynamicUnlockLinear: Stream_aggregate(where: { _and: [{ shape: { _eq: "dynamicUnlockLinear" } }, { chainId: { _nin: ["11155111", "84532"] } }] }) {
      aggregate {
        count
      }
    }
    dynamicUnlockCliff: Stream_aggregate(where: { _and: [{ shape: { _eq: "dynamicUnlockCliff" } }, { chainId: { _nin: ["11155111", "84532"] } }] }) {
      aggregate {
        count
      }
    }

    # Special
    unknown: Stream_aggregate(where: { _and: [{ shape: { _eq: "unknown" } }, { chainId: { _nin: ["11155111", "84532"] } }] }) {
      aggregate {
        count
      }
    }
    nullShape: Stream_aggregate(where: { _and: [{ shape: { _is_null: true } }, { chainId: { _nin: ["11155111", "84532"] } }] }) {
      aggregate {
        count
      }
    }
  }
`;

export const getShapeDistribution = gql(getShapeDistributionQuery);
