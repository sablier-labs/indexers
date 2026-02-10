export type TransferEvent = {
  chainId: number;
  params: { from: string; to: string; value: bigint };
  transaction: { from: string | undefined; hash: string };
  block: { number: number; timestamp: number };
  logIndex: number;
};

export type ValidationResult = {
  isValid: boolean;
  reason?: string;
};
