/**
 * @file CLI for generating GraphQL schema files
 *
 * @example
 * pnpm tsx cli codegen schema --vendor all --indexer all
 * pnpm tsx cli codegen schema --vendor all --indexer flow
 * pnpm tsx cli codegen schema --vendor graph --indexer flow
 *
 * @param --vendor - Required: 'graph', 'envio', or 'all'
 * @param --indexer - Required: 'airdrops', 'flow', 'lockup', or 'all'
 */

import type { Command } from "commander";
import * as fs from "fs-extra";
import { print } from "graphql";
import _ from "lodash";
import paths from "../../../lib/paths";
import { getMergedSchema } from "../../../schema";
import type { Indexer } from "../../../src";
import { AUTOGEN_COMMENT, INDEXERS, VENDORS } from "../../constants";
import * as helpers from "../../helpers";
import type { IndexerArg } from "../../types";

/* -------------------------------------------------------------------------- */
/*                                  COMMAND                                   */
/* -------------------------------------------------------------------------- */

function createSchemaCommand(): Command {
  const command = helpers.createBaseCmd("Generate GraphQL schema files");

  helpers.addVendorOpt(command);
  helpers.addIndexerOpt(command);

  command.action(async (options) => {
    const vendorArg = helpers.parseVendorOpt(options.vendor);
    const indexerArg = helpers.parseIndexerOpt(options.indexer);

    if (vendorArg === "all") {
      generateAllVendorSchemas(indexerArg);
      return;
    }

    if (indexerArg === "all") {
      generateAllIndexerSchemas(vendorArg);
      return;
    }

    generateSchema(vendorArg, indexerArg);
  });

  return command;
}

export const schemaCmd = createSchemaCommand();

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */

function generateAllVendorSchemas(indexerArg: IndexerArg): void {
  for (const v of VENDORS) {
    if (indexerArg === "all") {
      generateAllIndexerSchemas(v, true);
    } else {
      generateSchema(v, indexerArg);
    }
  }

  console.log("🎉 Generated all GraphQL schemas");
}

function generateAllIndexerSchemas(vendor: Indexer.Vendor, skipLogs: boolean = false): void {
  for (const i of INDEXERS) {
    generateSchema(vendor, i);
  }
  if (!skipLogs) {
    console.log("🎉 Generated all GraphQL schemas");
  }
}

const EXCLUDED_INDEXERS: Indexer.Name[] = ["analytics"];

/**
 * Generates and writes a GraphQL schema for a specific indexer
 * @param vendor The vendor to generate schemas for
 * @param indexer The indexer to generate a schema for
 * @returns Result of the schema generation
 */
function generateSchema(vendor: Indexer.Vendor, indexer: Indexer.Name): void {
  if (EXCLUDED_INDEXERS.includes(indexer)) {
    return;
  }

  const mergedSchema = print(getMergedSchema(indexer));
  const schema = `${AUTOGEN_COMMENT}${mergedSchema}`;

  const outputPath = paths.schema(vendor, indexer);
  fs.writeFileSync(outputPath, schema);

  console.log(`✅ Generated GraphQL schema for ${_.capitalize(vendor)} vendor and ${_.capitalize(indexer)} indexer`);
  console.log(`📁 Output path: ${helpers.getRelative(outputPath)}`);
  console.log("");
}
