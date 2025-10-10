/**
 * Hardcoded blocklist of token addresses with URLs in their names or symbols.
 *
 * These addresses were identified from historical cache data and return "Unknown"
 * for both name and symbol to prevent displaying misleading URLs.
 *
 * Source: Envio TSV cache files
 * Feel free to edit manually if needed
 */

/**
 * Check if a token address is in the scam token blocklist.
 *
 * @param address The token address to check (case-insensitive)
 * @returns true if the address is a known scam token with URLs
 */
export function isTokenWithUrl(address: string): boolean {
  const lower = address.toLowerCase();

  // Hardcoded scam token addresses (all lowercase for comparison)
  const scamAddresses: string[] = [
    // Chain 324 (zkSync Era)
    "0x006f916db2b2341581a0d12d139ebba1878c1793", // symbol: "Claim on: zk-claim.io"
    "0xd58a0fea5bd63e0bb86afc5aa3025d2144b5029b", // symbol: "ACX [via www.across.events]"

    // Chain 8453 (Base)
    "0x39d00b9ca6dd9ceedaf7d04e9882b82248faaa51", // name: "https://base.blockscout."

    // Chain 43114 (Avalanche)
    "0x714f020c54cc9d104b6f4f6998c63ce2a31d1888", // name: "STEP.APP"
    "0x37502f8d4f395bbf17242a74b0c53a0929497f97", // name: "ABAX (abax.website)"

    // Chain 11155111 (Sepolia testnet)
    "0xa0194c01b45ba58482dc70446cb41af62dd21a47", // name: "pUSDT-pool.com"
  ];

  // Linear search through blocklist (only 6 addresses - very fast)
  for (let i = 0; i < scamAddresses.length; i++) {
    if (lower == scamAddresses[i]) {
      return true;
    }
  }

  return false;
}
