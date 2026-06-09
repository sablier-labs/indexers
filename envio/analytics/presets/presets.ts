/**
 * @file See the Envio documentation for more details.
 * @see https://docs.envio.dev/docs/HyperIndex/block-handlers#preset-handler
 */

import { indexer } from "envio";
import { initializeLightLinkData } from "./lightlink/lightlink.js";

indexer.onBlock(
  {
    name: "Preset",
    where: ({ chain }) => {
      if (chain.id !== 1) {
        return false;
      }
      return {
        block: {
          number: {
            _gte: 17_613_133,
            _lte: 17_613_133,
          },
        },
      };
    },
  },
  async ({ context }) => {
    // Disable preload optimization to prevent double-run.
    if (context.isPreload) {
      return;
    }

    // Initialize LightLink data
    await initializeLightLinkData(context);
  }
);
