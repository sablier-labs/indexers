import { formatUnits } from "viem";
import { Id } from "../../../../common/id";
import { usdc } from "../../../../common/usdc";
import type {
  SablierMerkleInstant_v3_0_Sponsor_handler,
  SablierMerkleLL_v3_0_Sponsor_handler,
  SablierMerkleLT_v3_0_Sponsor_handler,
  SablierMerkleVCA_v3_0_Sponsor_handler,
} from "../../../bindings/src/Types.gen";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = SablierMerkleInstant_v3_0_Sponsor_handler &
  SablierMerkleLL_v3_0_Sponsor_handler &
  SablierMerkleLT_v3_0_Sponsor_handler &
  SablierMerkleVCA_v3_0_Sponsor_handler;

const handler: Handler = async ({ context, event }) => {
  /* -------------------------------- VALIDATE -------------------------------- */
  const usdcInfo = usdc[event.chainId];
  if (!usdcInfo) {
    return;
  }
  if (event.params.token.toLowerCase() !== usdcInfo.address.toLowerCase()) {
    return;
  }
  if (event.params.amount === 0n) {
    return;
  }

  const decimals = usdcInfo.decimals;

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
  event: Parameters<Handler>[0]["event"],
  decimals: number
) {
  const address = event.params.biller.toLowerCase();
  const id = `${event.chainId}_${address}`;
  const sponsor = await context.Sponsor.get(id);

  if (sponsor) {
    const totalAmount = sponsor.totalAmount + event.params.amount;
    const updated = {
      ...sponsor,
      sponsorshipCount: sponsor.sponsorshipCount + 1,
      totalAmount,
      totalAmountDisplay: formatUnits(totalAmount, decimals),
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
    totalAmountDisplay: formatUnits(event.params.amount, decimals),
  };
  context.Sponsor.set(newSponsor);
  return newSponsor;
}

function createSponsorship(
  context: Parameters<Handler>[0]["context"],
  event: Parameters<Handler>[0]["event"],
  sponsorEntityId: string,
  decimals: number
) {
  const id = `${event.chainId}_${event.transaction.hash}_${event.logIndex}`;
  const campaignAddress = event.srcAddress.toLowerCase();

  context.Sponsorship.set({
    amount: event.params.amount,
    amountDisplay: formatUnits(event.params.amount, decimals),
    block: event.block.number,
    campaignAddress,
    campaignId: Id.campaign(event.srcAddress, event.chainId),
    chainId: event.chainId,
    id,
    logIndex: event.logIndex,
    sender: event.params.caller.toLowerCase(),
    sponsor_id: sponsorEntityId,
    timestamp: event.block.timestamp,
    token: event.params.token.toLowerCase(),
    txHash: event.transaction.hash,
  });
}

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const sponsorship = { handler };
