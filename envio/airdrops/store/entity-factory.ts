import type { Address } from "viem";
import { getContractAlias } from "../../common/deployments.js";
import { Id } from "../../common/id.js";
import type { Context, Entity } from "../bindings.js";

export function create(
  context: Context.Handler,
  chainId: number,
  factoryAddress: Address
): Entity.Factory {
  const factory: Entity.Factory = {
    address: factoryAddress,
    alias: getContractAlias("airdrops", chainId, factoryAddress),
    campaignCounter: 0n,
    chainId: BigInt(chainId),
    id: Id.factory(chainId, factoryAddress),
  };
  context.Factory.set(factory);
  return factory;
}
