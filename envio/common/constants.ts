import type { Envio } from "./bindings";

/* -------------------------------------------------------------------------- */
/*                                  ADDRESSES                                 */
/* -------------------------------------------------------------------------- */

export const PRB_PROXY_REGISTRY_v4_0_0: Envio.Address =
  "0xd42a2bb59775694c9df4c7822bffab150e6c699d";
export const PRB_PROXY_REGISTRY_v4_0_1: Envio.Address =
  "0x584009e9ede26e212182c9745f5c000191296a78";

/* -------------------------------------------------------------------------- */
/*                                 CONTRACTS                                */
/* -------------------------------------------------------------------------- */

export const COMPTROLLER = "comptroller" as const;

/* -------------------------------------------------------------------------- */
/*                                    DATES                                   */
/* -------------------------------------------------------------------------- */

export const SEP_19_2025 = 1_758_240_000; // see https://x.com/Sablier/status/1914326014995620114
export const FEB_03_2025 = 1_738_540_800; // see https://x.com/Sablier/status/1879564876122906829

/* -------------------------------------------------------------------------- */
/*                                   NUMBERS                                  */
/* -------------------------------------------------------------------------- */

export const DECIMALS_18 = 18n;
export const DECIMALS_DEFAULT = 0;

/** UD2x18 representation of 1.0 (used for exponent comparisons). */
export const UD2X18_ONE = 1_000_000_000_000_000_000n;

/* -------------------------------------------------------------------------- */
/*                                    MISC                                    */
/* -------------------------------------------------------------------------- */

export const COINGECKO_BASE_URL = "https://pro-api.coingecko.com/api/v3";
export const CURRENCY_FREAKS_BASE_URL = "https://api.currencyfreaks.com/v2.0";
export const FIXER_BASE_URL = "https://data.fixer.io/api";
export const NOT_AVAILABLE = "n/a";
