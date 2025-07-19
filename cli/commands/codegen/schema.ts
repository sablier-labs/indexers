/**
 * @file CLI for generating GraphQL schema files
 *
 * @example
 * pnpm tsx cli codegen schema --vendor all --protocol all
 * pnpm tsx cli codegen schema --vendor all --protocol flow
 * pnpm tsx cli codegen schema --vendor graph --protocol flow
 *
 * @param --vendor - Required: 'graph', 'envio', or 'all'
 * @param --protocol - Required: 'airdrops', 'flow', 'lockup', or 'all'
 */

import { type Command } from "commander";
import * as fs from "fs-extra";
import { print } from "graphql";
import _ from "lodash";
import paths from "../../../lib/paths";
import type { Types } from "../../../lib/types";
import { getMergedSchema } from "../../../schema";
import { AUTOGEN_COMMENT, PROTOCOLS, VENDORS } from "../../constants";
import * as helpers from "../../helpers";
import { type ProtocolArg } from "../../types";

/* -------------------------------------------------------------------------- */
/*                                  COMMAND                                   */
/* -------------------------------------------------------------------------- */

export function createSchemaCommand(): Command {
  const command = helpers.createBaseCmd("Generate GraphQL schema files");

  helpers.addVendorOpt(command);
  helpers.addProtocolOpt(command);

  command.action(async (options) => {
    const vendorArg = helpers.parseVendorOpt(options.vendor);
    const protocolArg = helpers.parseProtocolOpt(options.protocol);

    if (vendorArg === "all") {
      generateAllVendorSchemas(protocolArg);
      return;
    }

    if (protocolArg === "all") {
      generateAllProtocolSchemas(vendorArg);
      return;
    }

    generateSchema(vendorArg, protocolArg);
  });

  return command;
}

export const schemaCmd = createSchemaCommand();

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */

function generateAllVendorSchemas(protocolArg: ProtocolArg): void {
  for (const v of VENDORS) {
    if (protocolArg === "all") {
      generateAllProtocolSchemas(v, true);
    } else {
      generateSchema(v, protocolArg);
    }
  }

  console.log("🎉 Generated all GraphQL schemas");
}

function generateAllProtocolSchemas(vendor: Types.Vendor, skipLogs: boolean = false): void {
  for (const p of PROTOCOLS) {
    generateSchema(vendor, p);
  }
  if (!skipLogs) {
    console.log("🎉 Generated all GraphQL schemas");
  }
}

/**
 * Generates and writes a GraphQL schema for a specific protocol
 * @param vendor The vendor to generate schemas for
 * @param protocol The protocol to generate a schema for
 * @returns Result of the schema generation
 */
function generateSchema(vendor: Types.Vendor, protocol: Types.Protocol): void {
  const mergedSchema = print(getMergedSchema(vendor, protocol));
  const schema = `${AUTOGEN_COMMENT}${mergedSchema}`;

  const outputPath = paths.schema(vendor, protocol);
  fs.writeFileSync(outputPath, schema);

  console.log(`✅ Generated GraphQL schema for ${_.capitalize(vendor)} vendor and ${_.capitalize(protocol)} protocol`);
  console.log(`📁 Output path: ${helpers.getRelative(outputPath)}`);
  console.log("");
}
