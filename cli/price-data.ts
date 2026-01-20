import { sablier } from "sablier";
import { envioChains } from "../src/indexers/envio.js";

export type PriceDataFile = {
  name: string;
  sourceDir: "crypto" | "forex";
};

type SablierChain = NonNullable<ReturnType<typeof sablier.evm.chains.get>>;

type NativeCurrencyConfig = {
  coinGeckoId: string;
  symbol: string;
};

export function getRequiredPriceDataFiles(): PriceDataFile[] {
  const files: PriceDataFile[] = [];

  for (const { symbol } of getNativeCurrencyConfigs()) {
    files.push({
      name: `${symbol}_USD.tsv`,
      sourceDir: "crypto",
    });
  }

  files.push({
    name: "GBP_USD.tsv",
    sourceDir: "forex",
  });

  return files;
}

function getNativeCurrencyConfigs(): NativeCurrencyConfig[] {
  const configs = new Map<string, NativeCurrencyConfig>();
  const chains = envioChains
    .map((chain) => sablier.evm.chains.get(chain.id))
    .filter((chain): chain is SablierChain => chain !== undefined);

  for (const chain of chains) {
    const coinGeckoId = chain.nativeCurrency?.coinGeckoId;
    const symbol = chain.nativeCurrency?.symbol;

    if (typeof coinGeckoId === "string" && typeof symbol === "string" && !configs.has(symbol)) {
      configs.set(symbol, { coinGeckoId, symbol });
    }
  }

  return [...configs.values()].sort((a, b) => a.symbol.localeCompare(b.symbol));
}
