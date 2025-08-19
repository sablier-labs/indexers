import _ from "lodash";
import { sablier } from "sablier";
import { gnosis, tangle } from "sablier/dist/chains";
import { describe, expect, it } from "vitest";
import { envioChains } from "../../../../src/indexers/envio";
import { coinConfigs } from "../../effects/coingecko";

const EXCLUDED_CHAINS = [gnosis.id, tangle.id];
const chains = envioChains
  .filter((envioChain) => !EXCLUDED_CHAINS.includes(envioChain.id))
  .map((envioChain) => sablier.chains.getOrThrow(envioChain.id));

describe("CoinGecko Effects", () => {
  describe("fetchCryptoPrice coverage", () => {
    it("should have an effect defined for every supported chain's native currency", () => {
      const missingCurrencies: string[] = [];
      const supportedCurrencies = _.keys(coinConfigs);

      // Get all unique native currencies
      const uniqueCurrencies = new Set<string>();
      const chainsByCurrency = new Map<string, string[]>();

      _.forEach(chains, (chain) => {
        const nativeCurrencySymbol = chain.nativeCurrency.symbol;

        uniqueCurrencies.add(nativeCurrencySymbol);

        if (!chainsByCurrency.has(nativeCurrencySymbol)) {
          chainsByCurrency.set(nativeCurrencySymbol, []);
        }
        chainsByCurrency.get(nativeCurrencySymbol)?.push(chain.name);

        if (!supportedCurrencies.includes(nativeCurrencySymbol)) {
          missingCurrencies.push(`${chain.name} (${nativeCurrencySymbol})`);
        }
      });

      if (missingCurrencies.length > 0) {
        const errorMessage = [
          `Missing CoinGecko effects for ${missingCurrencies.length} chains:`,
          ...missingCurrencies.map((chain) => `  - ${chain}`),
          "",
          `Total chains: ${chains.length}`,
          `Unique currencies: ${uniqueCurrencies.size}`,
          `Supported currencies: ${supportedCurrencies.length}`,
          "",
          "Chains by currency:",
          ...Array.from(chainsByCurrency.entries()).map(
            ([currency, chains]) =>
              `  ${currency}: ${chains.join(", ")} ${supportedCurrencies.includes(currency) ? "✅" : "❌"}`,
          ),
        ].join("\n");

        throw new Error(errorMessage);
      }

      expect(missingCurrencies).toEqual([]);
    });

    it("should not have unused effects (effects not mapped to any envioChains)", () => {
      const supportedCurrencies = _.keys(coinConfigs);
      const usedCurrencies = new Set<string>();

      _.forEach(chains, (chain) => {
        usedCurrencies.add(chain.nativeCurrency.symbol);
      });

      const unusedEffects = supportedCurrencies.filter(
        (currency) => currency !== "GBP" && !usedCurrencies.has(currency),
      );

      expect(unusedEffects).toEqual([]);
    });
  });
});
