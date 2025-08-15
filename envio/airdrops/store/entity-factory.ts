import type { Envio } from "../../common/bindings";
import { getContractAlias } from "../../common/deployments";
import { Id } from "../../common/id";
import type { Context, Entity } from "../bindings";

export function create(context: Context.Handler, chainId: number, factoryAddress: Envio.Address): Entity.Factory {
  const address = factoryAddress.toLowerCase();
  const factory: Entity.Factory = {
    address,
    alias: getContractAlias("airdrops", chainId, address),
    campaignCounter: 0n,
    chainId: BigInt(chainId),
    id: Id.factory(chainId, address),
  };
  context.Factory.set(factory);
  return factory;
}
