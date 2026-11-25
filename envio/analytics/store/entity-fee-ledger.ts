/**
 * @see {@link: file://./../analytics.graphql}
 */
import { sablier } from "sablier";
import { tangle } from "sablier/evm/chains";
import type { Entity, HandlerContext } from "../bindings.js";
import { Id } from "../helpers/index.js";

/** Testnet ETH has no value, and TNT is not transferable. */
export const FEE_EXCLUDED_CHAINS: number[] = [
  ...sablier.chains.getTestnets().map((c) => c.id),
  tangle.id,
];

export type LedgerKey = { kind: "contract"; address: string } | { kind: "comptroller" };

type LedgerContext = {
  FeeLedger: Pick<HandlerContext["FeeLedger"], "get" | "set">;
};

/** Adds `amount` to the ledger's cumulative attributed fees. */
export async function attribute(
  context: LedgerContext,
  chainId: number,
  key: LedgerKey,
  amount: bigint
): Promise<void> {
  const ledger = await load(context, chainId, key);
  context.FeeLedger.set({ ...ledger, attributed: ledger.attributed + amount });
}

/** Adds `amount` to the ledger's cumulative collected fees and returns `collected - attributed` after the update. */
export async function collect(
  context: LedgerContext,
  chainId: number,
  key: LedgerKey,
  amount: bigint
): Promise<bigint> {
  const ledger = await load(context, chainId, key);
  const collected = ledger.collected + amount;
  context.FeeLedger.set({ ...ledger, collected });
  return collected - ledger.attributed;
}

async function load(
  context: LedgerContext,
  chainId: number,
  key: LedgerKey
): Promise<Entity<"FeeLedger">> {
  const contractAddress = key.kind === "contract" ? key.address.toLowerCase() : undefined;
  const id = Id.feeLedger(chainId, contractAddress);
  const existing = await context.FeeLedger.get(id);
  return (
    existing ?? {
      attributed: 0n,
      chainId: BigInt(chainId),
      collected: 0n,
      contractAddress,
      id,
    }
  );
}
