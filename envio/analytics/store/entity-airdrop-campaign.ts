/**
 * @see {@link: file://./../analytics.graphql}
 */
import type { HandlerContext } from "../bindings.js";
import { Id } from "../helpers/index.js";

type CampaignContext = {
  AirdropCampaign: Pick<HandlerContext["AirdropCampaign"], "get" | "set">;
};

/** Records a campaign that creates Lockup streams on claim. */
export function register(context: CampaignContext, chainId: number, address: string): void {
  context.AirdropCampaign.set({
    address: address.toLowerCase(),
    chainId: BigInt(chainId),
    id: Id.airdropCampaign(chainId, address),
  });
}

/** Whether `address` is a registered campaign on this chain. */
export async function exists(
  context: CampaignContext,
  chainId: number,
  address: string
): Promise<boolean> {
  return (await context.AirdropCampaign.get(Id.airdropCampaign(chainId, address))) !== undefined;
}
