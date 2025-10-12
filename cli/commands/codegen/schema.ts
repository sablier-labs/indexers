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

import chalk from "chalk";
import type { Command } from "commander";
import * as fs from "fs-extra";
import { print } from "graphql";
import _ from "lodash";
import paths from "../../../lib/paths";
import { getMergedSchema } from "../../../schema";
import type { Indexer } from "../../../src";
import { AUTOGEN_COMMENT, INDEXERS, VENDORS } from "../../constants";
import * as helpers from "../../helpers";
import { colors, createTable, displayHeader } from "../../shared/display-utils";
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
  displayHeader("📝 GENERATING GRAPHQL SCHEMAS", "cyan");

  type SchemaResult = {
    indexer: Indexer.Name;
    outputPath: string;
    status: "generated" | "error" | "skipped";
    vendor: Indexer.Vendor;
  };

  const results: SchemaResult[] = [];

  for (const v of VENDORS) {
    if (indexerArg === "all") {
      for (const i of INDEXERS) {
        const result = generateSchemaWithResult(v, i);
        results.push(result);
      }
    } else {
      const result = generateSchemaWithResult(v, indexerArg);
      results.push(result);
    }
  }

  // Display results table
  console.log("");
  const table = createTable({
    colWidths: [15, 15, 50, 15],
    head: ["Vendor", "Indexer", "Output Path", "Status"],
    theme: "cyan",
  });

  for (const result of results) {
    if (result.status === "skipped") continue;

    const statusText = result.status === "generated" ? colors.success("✅ Generated") : colors.error("❌ Error");
    table.push([
      colors.value(_.capitalize(result.vendor)),
      colors.value(_.capitalize(result.indexer)),
      colors.dim(result.outputPath),
      statusText,
    ]);
  }

  console.log(table.toString());

  // Summary statistics
  const generated = results.filter((r) => r.status === "generated").length;
  const errors = results.filter((r) => r.status === "error").length;
  const skipped = results.filter((r) => r.status === "skipped").length;

  console.log("");
  const summaryTable = createTable({
    colWidths: [20, 10],
    head: ["Status", "Count"],
    theme: "cyan",
  });

  summaryTable.push(
    [colors.success("Generated"), colors.value(generated.toString())],
    [colors.error("Errors"), colors.value(errors.toString())],
    [colors.dim("Skipped"), colors.value(skipped.toString())],
    [chalk.cyan.bold("Total Schemas"), chalk.white.bold((results.length - skipped).toString())],
  );

  console.log(summaryTable.toString());

  console.log("");
  if (errors === 0) {
    console.log(colors.success(`✅ Successfully generated ${generated} GraphQL schemas`));
  } else {
    console.log(colors.error(`❌ Generation completed with ${errors} errors`));
    process.exit(1);
  }
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

type SchemaResult = {
  indexer: Indexer.Name;
  outputPath: string;
  status: "generated" | "error" | "skipped";
  vendor: Indexer.Vendor;
};

/**
 * Generates and writes a GraphQL schema for a specific indexer with result tracking
 */
function generateSchemaWithResult(vendor: Indexer.Vendor, indexer: Indexer.Name): SchemaResult {
  if (EXCLUDED_INDEXERS.includes(indexer)) {
    return {
      indexer,
      outputPath: "",
      status: "skipped",
      vendor,
    };
  }

  try {
    const mergedSchema = print(getMergedSchema(indexer));
    const schema = `${AUTOGEN_COMMENT}${mergedSchema}`;

    const outputPath = paths.schema(vendor, indexer);
    fs.writeFileSync(outputPath, schema);

    return {
      indexer,
      outputPath: helpers.getRelative(outputPath),
      status: "generated",
      vendor,
    };
  } catch {
    return {
      indexer,
      outputPath: "",
      status: "error",
      vendor,
    };
  }
}

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
