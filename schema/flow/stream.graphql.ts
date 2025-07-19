import { gql } from "graphql-tag";
import { streamDefs as commonStreamDefs } from "../common/stream.graphql";

/* -------------------------------------------------------------------------- */
/*                                 FLOW DEFS                                 */
/* -------------------------------------------------------------------------- */
export const flowStreamDefs = gql`
  type Stream @entity(immutable: false) {
    ${commonStreamDefs}

    # ---------------------------------- FLOW ---------------------------------- #

    """
    This is equivalent to the value returned by ERC20.balanceOf, and it changes after deposit and withdrawal.
    """
    availableAmount: BigInt!

    """
    The account that created the stream, which can be different from the sender.
    """
    creator: Bytes!

    """
    Unix timestamp indicating the time when the stream will become insolvent.
    """
    depletionTime: BigInt!

    """
    The sum of all deposits.
    """
    depositedAmount: BigInt!

    """
    The amount of debt forgiven by a void action.
    """
    forgivenDebt: BigInt!

    """
    Action in which the payment rate was adjusted.
    """
    lastAdjustmentAction: Action

    """
    Unix timestamp for when the payment rate was adjusted.
    """
    lastAdjustmentTimestamp: BigInt!

    """
    Flag indicating if a stream is paused.
    """
    paused: Boolean!

    """
    Action in which the stream was paused.
    """
    pausedAction: Action

    """
    Unix timestamp for when the stream was paused.
    """
    pausedTime: BigInt

    """
    Current payment rate per second, denominated in 18 decimals.
    """
    ratePerSecond: BigInt!

    """
    The sum of all refunds.
    """
    refundedAmount: BigInt!

    """
    The amount streamed up until the time of the last adjustment, denominated in 18 decimals.
    """
    snapshotAmount: BigInt!

    """
    Flag indicating if a stream is voided.
    """
    voided: Boolean!

    """
    Action in which the stream was voided.
    """
    voidedAction: Action

    """
    Unix timestamp for when the stream was voided.
    """
    voidedTime: BigInt
  }
`;
