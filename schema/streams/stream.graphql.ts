import { gql } from "graphql-tag";
import { streamDefs as commonStreamDefs } from "../common/stream.graphql.js";

/* -------------------------------------------------------------------------- */
/*                             FLOW STREAM DEFS                               */
/* -------------------------------------------------------------------------- */

/**
 * Replaces references to unprefixed entities with prefixed ones:
 * - `Action` → `FlowAction`
 * - `Batch` → `FlowBatch`
 * - `StreamCategory` → `FlowStreamCategory`
 */
const flowCommonStreamDefs = commonStreamDefs
  .replace(/: \[Action!\]!/g, ": [FlowAction!]!")
  .replace(/: Action/g, ": FlowAction")
  .replace(/: Batch!/g, ": FlowBatch!")
  .replace(/: StreamCategory!/g, ": FlowStreamCategory!");

/* -------------------------------------------------------------------------- */
/*                            LOCKUP STREAM DEFS                              */
/* -------------------------------------------------------------------------- */

const lockupCommonStreamDefs = commonStreamDefs
  .replace(/: \[Action!\]!/g, ": [LockupAction!]!")
  .replace(/: Action/g, ": LockupAction")
  .replace(/: Batch!/g, ": LockupBatch!")
  .replace(/: StreamCategory!/g, ": LockupStreamCategory!");

/* -------------------------------------------------------------------------- */
/*                              MERGED EXPORT                                 */
/* -------------------------------------------------------------------------- */

export const streamsStreamDefs = gql`
  type FlowStream @entity(immutable: false) {
    ${flowCommonStreamDefs}

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
    lastAdjustmentAction: FlowAction

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
    pausedAction: FlowAction

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
    voidedAction: FlowAction

    """
    Unix timestamp for when the stream was voided.
    """
    voidedTime: BigInt
  }

  type LockupStream @entity(immutable: false) {
    ${lockupCommonStreamDefs}

    # --------------------------------- LOCKUP --------------------------------- #
    """
    Action in which the stream was canceled.
    """
    canceledAction: LockupAction

    """
    Action in which the stream was made non-cancelable.
    Note: if the stream was made non-cancelable from the get-go, this is the same as the Create action.
    """
    renounceAction: LockupAction

    """
    Flag indicating the cancelability of the stream.
    """
    cancelable: Boolean!

    """
    Flag indicating if the stream was canceled.
    """
    canceled: Boolean!

    """
    Unix timestamp for the when the stream was canceled.
    """
    canceledTime: BigInt

    """
    The amount deposited when the stream was created.
    """
    depositAmount: BigInt!

    """
    Snapshot of the duration in seconds (the difference between end and start time).
    """
    duration: BigInt!

    """
    Unix timestamp for the end of the stream.
    """
    endTime: BigInt!

    """
    The account that funded the stream, which can be different from the sender.
    """
    funder: Bytes!

    """
    The amount that is still held by the stream regardless of whether if was fully vested or not.
    This is the difference between the deposit amount and all withdrawn amounts.
    """
    intactAmount: BigInt!

    """
    Flag indicating if the stream has been fully withdrawn (intactAmount is zero).
    """
    depleted: Boolean!

    """
    Owner of the proxy when the stream is created through a PRBProxy (https://github.com/PaulRBerg/prb-proxy)
    Note that proxy = stream sender, and proxender = owner of proxy
    """
    proxender: Bytes

    """
    Flag for streams created through a PRBProxy.
    """
    proxied: Boolean!

    """
    Unix timestamp for when the stream was made non-cancelable. This can coincide with the create time.
    """
    renounceTime: BigInt

    """
    An optional parameter to specify the shape of the distribution.
    Available since Lockup v2.0.
    """
    shape: String

    """
    The source of the shape value: Event (from contract event) or Inferred (computed by indexer).
    """
    shapeSource: ShapeSource

    # ------------------------------ LOCKUP-LINEAR ----------------------------- #
    """
    Flag for Linear streams with a cliff.
    """
    cliff: Boolean

    """
    The amount that will unlock at the cliff time.
    """
    cliffAmount: BigInt

    """
    Unix timestamp for the start of the cliff.
    """
    cliffTime: BigInt

    """
    Flag for Linear stream with an initial unlock.
    Available since Lockup v2.0.
    """
    initial: Boolean

    """
    The initial unlock amount of a Linear stream.
    Available since Lockup v2.0.
    """
    initialAmount: BigInt

    # ----------------------------- LOCKUP DYNAMIC ----------------------------- #
    """
    Segments of a Dynamic stream.
    """
    segments: [Segment!]! @derivedFrom(field: "stream")

    # ----------------------------- LOCKUP TRANCHED ---------------------------- #
    """
    Segments of a Tranched stream.
    """
    tranches: [Tranche!]! @derivedFrom(field: "stream")
  }
`;
