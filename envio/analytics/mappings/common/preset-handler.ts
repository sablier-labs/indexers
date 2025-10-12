/**
 * @file See the Envio documentation for more details.
 * @see https://docs.envio.dev/docs/HyperIndex/block-handlers#preset-handler
 */

import { onBlock } from "../../bindings/src/Handlers.gen";
import { initializeLightLinkData } from "./lightlink";

// Using Mainnet id but it doesn't really matter what chain we use here
onBlock(
  {
    chain: 1,
    endBlock: 17_613_133,
    name: "Preset",
    startBlock: 17_613_133,
  },
  async ({ context }) => {
    // Disable preload optimization to prevent double-run.
    if (context.isPreload) return;

    // Initialize LightLink data
    await initializeLightLinkData(context);
  },
);
