import { formatUnits } from "viem";
import { USDC } from "../../bindings/src/Handlers.gen";
import type {
  USDC_Transfer_event as Event,
  USDC_Transfer_handler as Handler,
} from "../../bindings/src/Types.gen";

const TREASURY = "0xb1bef51ebca01eb12001a639bdbbff6eeca12b9f";
const USDC_DECIMALS: Record<number, number> = { 56: 18 }; // BNB USDC
const DEFAULT_USDC_DECIMALS = 6;

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

const handler: Handler = async ({ context, event }) => {
  /* -------------------------------- VALIDATE -------------------------------- */
  if (event.params.to !== TREASURY) {
    return;
  }
  if (!event.transaction.from) {
    return;
  }
  if (event.params.amount === 0n) {
    return;
  }

  const decimals = USDC_DECIMALS[event.chainId] ?? DEFAULT_USDC_DECIMALS;

  /* -------------------------------- SPONSOR --------------------------------- */
  const sponsor = await getOrCreateSponsor(context, event, decimals);

  /* ------------------------------ SPONSORSHIP ------------------------------- */
  createSponsorship(context, event, sponsor.id, decimals);
};

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

async function getOrCreateSponsor(
  context: Parameters<Handler>[0]["context"],
  event: Event,
  decimals: number
) {
  const address = event.transaction.from as string;
  const id = `${event.chainId}_${address.toLowerCase()}`;
  const sponsor = await context.Sponsor.get(id);

  if (sponsor) {
    const totalAmount = sponsor.totalAmount + event.params.amount;
    const updated = {
      ...sponsor,
      sponsorshipCount: sponsor.sponsorshipCount + 1,
      totalAmount,
      totalAmountScaled: formatUnits(totalAmount, decimals),
    };
    context.Sponsor.set(updated);
    return updated;
  }

  const newSponsor = {
    address,
    chainId: event.chainId,
    id,
    sponsorshipCount: 1,
    totalAmount: event.params.amount,
    totalAmountScaled: formatUnits(event.params.amount, decimals),
  };
  context.Sponsor.set(newSponsor);
  return newSponsor;
}

function createSponsorship(
  context: Parameters<Handler>[0]["context"],
  event: Event,
  sponsorEntityId: string,
  decimals: number
) {
  const id = `${event.chainId}_${event.transaction.hash}_${event.logIndex}`;
  context.Sponsorship.set({
    amount: event.params.amount,
    amountScaled: formatUnits(event.params.amount, decimals),
    block: event.block.number,
    chainId: event.chainId,
    from: event.params.from,
    id,
    logIndex: event.logIndex,
    sender: event.transaction.from as string,
    sponsor_id: sponsorEntityId,
    timestamp: event.block.timestamp,
    to: event.params.to,
    txHash: event.transaction.hash,
  });
}

/* -------------------------------------------------------------------------- */
/*                                  REGISTER                                  */
/* -------------------------------------------------------------------------- */

USDC.Transfer.handler(handler, {
  eventFilters: () => [{ to: TREASURY }],
});
