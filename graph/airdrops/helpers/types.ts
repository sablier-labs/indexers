import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";

export namespace Params {
  export class Action {
    campaign: string;
    category: string;
    claimAmount: BigInt | null;
    claimIndex: BigInt | null;
    claimRecipient: Address | null;
    claimStreamId: string | null;
    claimTokenId: BigInt | null;
    clawbackAmount: BigInt | null;
    clawbackFrom: Address | null;
    clawbackTo: Address | null;
    fee: BigInt | null;
  }

  export class ClaimLockup {
    amount: BigInt;
    index: BigInt;
    recipient: Address;
    streamId: BigInt;
  }

  export class Clawback {
    admin: Address;
    amount: BigInt;
    to: Address;
  }

  export class CreateCampaignBase {
    admin: Address;
    aggregateAmount: BigInt;
    asset: Address;
    campaignAddress: Address;
    category: string;
    expiration: BigInt;
    minimumFee: BigInt | null;
    ipfsCID: string;
    merkleRoot: Bytes;
    name: string | null;
    recipientCount: BigInt;
  }

  export class CreateCampaignLockup {
    cancelable: boolean = false;
    lockup: Address = Address.zero();
    shape: string | null = null;
    startTime: BigInt | null = null;
    transferable: boolean = false;
    totalDuration: BigInt = BigInt.zero();
  }
  export class CreateCampaignLL extends CreateCampaignLockup {
    cliffDuration: BigInt;
    cliffPercentage: BigInt | null;
    startPercentage: BigInt | null;
  }

  export class CreateCampaignLT extends CreateCampaignLockup {
    tranchesWithPercentages: TrancheWithPercentage[];
  }

  export class TransferAdmin {
    newAdmin: Address;
    oldAdmin: Address;
  }
}

export class TrancheWithPercentage {
  unlockPercentage: BigInt;
  duration: BigInt;

  constructor(unlockPercentage: BigInt, duration: BigInt) {
    this.unlockPercentage = unlockPercentage;
    this.duration = duration;
  }
}
