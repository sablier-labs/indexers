import { gql } from "graphql-tag";
import { streamDefs as commonStreamDefs } from "../common/stream.graphql";

/* -------------------------------------------------------------------------- */
/*                                 LOCKUP DEFS                                */
/* -------------------------------------------------------------------------- */
export const lockupStreamDefs = gql`
  type Stream @entity(immutable: false) {
    ${commonStreamDefs}

    # --------------------------------- LOCKUP --------------------------------- #
    """
    Action in which the stream was canceled.
    """
    canceledAction: Action

    """
    Action in which the stream was made non-cancelable.
    Note: if the stream was made non-cancelable from the get-go, this is the same as the Create action.
    """
    renounceAction: Action

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
