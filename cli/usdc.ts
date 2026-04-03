import type { Sablier } from "sablier";
import {
  arbitrum,
  avalanche,
  base,
  baseSepolia,
  bsc,
  gnosis,
  linea,
  mainnet,
  optimism,
  polygon,
  scroll,
  sepolia,
  sonic,
  zksync,
} from "sablier/evm/chains";

export type UsdcInfo = {
  address: Sablier.Address;
  decimals: number;
  /** Approximate self-checkout billing rollout block for sponsorship indexing on this chain. */
  startBlock: number;
};

/**
 * USDC contract addresses, decimals, and start blocks per chain.
 *
 * Start blocks correspond roughly to 2026-03-04 00:00:00 UTC (unix 1772582400), when self-checkout billing was
 * enabled (see PR #301). Values were verified with live `cast find-block` checks; BSC used a public RPC fallback
 * because RouteMesh errored on that query.
 */
export const usdc: Record<number, UsdcInfo> = {
  [mainnet.id]: {
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    decimals: 6,
    startBlock: 24_580_372,
  },
  [optimism.id]: {
    address: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
    decimals: 6,
    startBlock: 148_491_812,
  },
  [bsc.id]: {
    address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    decimals: 18,
    startBlock: 84_525_157,
  }, // Binance-Peg
  [gnosis.id]: {
    address: "0xddafbb505ad214d7b80b1f830fccc89b60fb7a83",
    decimals: 6,
    startBlock: 44_969_466,
  },
  [polygon.id]: {
    address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
    decimals: 6,
    startBlock: 83_731_185,
  },
  [sonic.id]: {
    address: "0x29219dd400f2bf60e5a23d13be72b486d4038894",
    decimals: 6,
    startBlock: 64_263_501,
  },
  [zksync.id]: {
    address: "0x1d17cbcf0d6d143135ae902365d2e5e2a16538d4",
    decimals: 6,
    startBlock: 68_888_190,
  },
  [base.id]: {
    address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
    decimals: 6,
    startBlock: 42_896_527,
  },
  [arbitrum.id]: {
    address: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
    decimals: 6,
    startBlock: 438_064_202,
  },
  [avalanche.id]: {
    address: "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e",
    decimals: 6,
    startBlock: 79_496_510,
  },
  [linea.id]: {
    address: "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
    decimals: 6,
    startBlock: 29_431_923,
  },
  [baseSepolia.id]: {
    address: "0x036cbd53842c5426634e7929541ec2318f3dcf7e",
    decimals: 6,
    startBlock: 38_407_056,
  },
  [scroll.id]: {
    address: "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4",
    decimals: 6,
    startBlock: 31_177_436,
  },
  [sepolia.id]: {
    address: "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238",
    decimals: 6,
    startBlock: 10_378_869,
  },
};
