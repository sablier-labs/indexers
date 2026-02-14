export type UsdcInfo = {
  address: `0x${string}`;
  decimals: number;
};

/** USDC contract addresses and decimals per chain */
export const usdc: Record<number, UsdcInfo> = {
  1: { address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", decimals: 6 },
  10: { address: "0x0b2c639c533813f4aa9d7837caf62653d097ff85", decimals: 6 },
  56: { address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d", decimals: 18 }, // Binance-Peg
  100: { address: "0xddafbb505ad214d7b80b1f830fccc89b60fb7a83", decimals: 6 },
  137: { address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359", decimals: 6 },
  146: { address: "0x29219dd400f2bf60e5a23d13be72b486d4038894", decimals: 6 },
  324: { address: "0x1d17cbcf0d6d143135ae902365d2e5e2a16538d4", decimals: 6 },
  8453: { address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913", decimals: 6 },
  42161: { address: "0xaf88d065e77c8cc2239327c5edb3a432268e5831", decimals: 6 },
  43114: { address: "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e", decimals: 6 },
  59144: { address: "0x176211869ca2b568f2a7d4ee941e073a821ee1ff", decimals: 6 },
  84532: { address: "0x036cbd53842c5426634e7929541ec2318f3dcf7e", decimals: 6 },
  421614: { address: "0x75faf114eafb1bdbe2f0316df893fd58ce46aa4d", decimals: 6 },
  534352: { address: "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4", decimals: 6 },
  11155111: { address: "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238", decimals: 6 },
};
