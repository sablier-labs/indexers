import type { Envio } from "../../common/bindings";
import { CommonStore } from "../../common/store";
import type { CommonParams } from "../../common/types";
import type { Context, Entity } from "../bindings";

export function create(
  context: Context.Handler,
  event: Envio.Event,
  watcher: Entity.Watcher,
  params: CommonParams.Action,
): Entity.Action {
  return CommonStore.Action.create<Entity.Action>(context, event, watcher, params);
}
