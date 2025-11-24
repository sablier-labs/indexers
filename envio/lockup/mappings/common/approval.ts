import { isDeprecatedStream } from "../../../common/deprecated";
import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type {
  SablierV2LockupLinear_v1_0_Approval_handler as Handler_v1_0,
  SablierV2LockupLinear_v1_1_Approval_handler as Handler_v1_1,
  SablierV2LockupLinear_v1_2_Approval_handler as Handler_v1_2,
  SablierLockup_v2_0_Approval_handler as Handler_v2_0,
  SablierLockup_v3_0_Approval_handler as Handler_v3_0,
} from "../../bindings/src/Types.gen";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = Handler_v1_0 & Handler_v1_1 & Handler_v1_2 & Handler_v2_0 & Handler_v3_0;

const handler: Handler = async ({ context, event }) => {
  /* -------------------------------- ENTITIES -------------------------------- */
  const streamId = Id.stream(event.srcAddress, event.chainId, event.params.tokenId);
  const isDeprecated = await isDeprecatedStream(context, streamId);
  if (isDeprecated) {
    return;
  }

  const watcherId = event.chainId.toString();

  const [stream, watcher] = await Promise.all([
    context.Stream.getOrThrow(streamId),
    context.Watcher.getOrThrow(watcherId),
  ]);

  if (context.isPreload) {
    return;
  }

  /* --------------------------------- ACTION --------------------------------- */
  CommonStore.Action.create(context, event, watcher, {
    addressA: event.params.owner,
    addressB: event.params.approved,
    category: "Approval",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);
};

export const approval = { handler };
