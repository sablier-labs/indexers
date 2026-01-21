import * as yaml from "js-yaml";
import { AUTOGEN_COMMENT } from "../../constants.js";
import type { EnvioConfig } from "./envio-config/config-types.js";
import type { GraphManifest } from "./graph-manifest/manifest-types.js";

export function dumpYAML(input: GraphManifest.TopSection | EnvioConfig.TopSection): string {
  const yamlContent = yaml.dump(input, {
    forceQuotes: true, // Force quotes for all strings
    lineWidth: -1, // Prevent line wrapping
    quotingType: '"', // Use double quotes for strings
  });

  return `${AUTOGEN_COMMENT}${yamlContent}`;
}
