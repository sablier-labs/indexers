/**
 * @file CLI for generating GraphQL schema files
 *
 * @example
 * pnpm tsx cli codegen schema --vendor all --indexer all
 * pnpm tsx cli codegen schema --vendor all --indexer flow
 * pnpm tsx cli codegen schema --vendor graph --indexer flow
 *
 * @param --vendor - Required: 'graph', 'envio', or 'all'
 * @param --indexer - Required: 'airdrops', 'flow', 'lockup', 'analytics', or 'all'
 */

import { Command, Options } from "@effect/cli";
import { FileSystem } from "@effect/platform";
import chalk from "chalk";
import { Console, Effect } from "effect";
import { print } from "graphql";
import _ from "lodash";
import paths from "../../../lib/paths";
import { getMergedSchema } from "../../../schema";
import type { Indexer } from "../../../src";
import { AUTOGEN_COMMENT, INDEXERS, VENDORS } from "../../constants";
import { ProcessError } from "../../errors";
import * as helpers from "../../helpers";
import { colors, createTable, displayHeader } from "../../shared/display-utils";

/* -------------------------------------------------------------------------- */
/*                                   OPTIONS                                  */
/* -------------------------------------------------------------------------- */

const vendorOption = Options.choice("vendor", ["graph", "envio", "all"] as const).pipe(
  Options.withAlias("v"),
  Options.withDescription("Vendor to generate schemas for")
);

const indexerOption = Options.choice("indexer", [
  "airdrops",
  "flow",
  "lockup",
  "analytics",
  "all",
] as const).pipe(Options.withAlias("i"), Options.withDescription("Indexer to generate schema for"));

/* -------------------------------------------------------------------------- */
/*                                   COMMAND                                  */
/* -------------------------------------------------------------------------- */

type SchemaResult = {
  indexer: Indexer.Name;
  outputPath: string;
  status: "generated" | "error" | "skipped";
  vendor: Indexer.Vendor;
};

/**
 * Generates and writes a GraphQL schema for a specific indexer with result tracking
 */
function generateSchemaWithResult(
  vendor: Indexer.Vendor,
  indexer: Indexer.Name
): Effect.Effect<SchemaResult, never, FileSystem.FileSystem> {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const mergedSchema = print(getMergedSchema(indexer));
    const schema = `${AUTOGEN_COMMENT}${mergedSchema}`;
    const outputPath = paths.schema(vendor, indexer);

    yield* fs.writeFileString(outputPath, schema);

    return {
      indexer,
      outputPath: helpers.getRelative(outputPath),
      status: "generated" as const,
      vendor,
    };
  }).pipe(
    Effect.catchAll(() =>
      Effect.succeed({
        indexer,
        outputPath: "",
        status: "error" as const,
        vendor,
      })
    )
  );
}

/**
 * Generates and writes a GraphQL schema for a specific indexer
 */
function generateSchema(
  vendor: Indexer.Vendor,
  indexer: Indexer.Name
): Effect.Effect<void, never, FileSystem.FileSystem> {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const mergedSchema = print(getMergedSchema(indexer));
    const schema = `${AUTOGEN_COMMENT}${mergedSchema}`;
    const outputPath = paths.schema(vendor, indexer);

    yield* fs.writeFileString(outputPath, schema);

    yield* Console.log(
      `✅ Generated GraphQL schema for ${_.capitalize(vendor)} vendor and ${_.capitalize(indexer)} indexer`
    );
    yield* Console.log(`📁 Output path: ${helpers.getRelative(outputPath)}`);
    yield* Console.log("");
  }).pipe(Effect.orDie);
}

function generateAllIndexerSchemas(
  vendor: Indexer.Vendor
): Effect.Effect<void, ProcessError, FileSystem.FileSystem> {
  return Effect.gen(function* () {
    displayHeader("📝 GENERATING GRAPHQL SCHEMAS", "cyan");

    const results = yield* Effect.forEach(INDEXERS, (indexer) =>
      generateSchemaWithResult(vendor, indexer)
    );

    // Display results table
    yield* Console.log("");
    const table = createTable({
      colWidths: [15, 15, 50, 15],
      head: ["Vendor", "Indexer", "Output Path", "Status"],
      theme: "cyan",
    });

    for (const result of results) {
      if (result.status === "skipped") {
        continue;
      }

      const statusText =
        result.status === "generated" ? colors.success("✅ Generated") : colors.error("❌ Error");
      table.push([
        colors.value(_.capitalize(result.vendor)),
        colors.value(_.capitalize(result.indexer)),
        colors.dim(result.outputPath),
        statusText,
      ]);
    }

    yield* Console.log(table.toString());

    // Summary statistics
    const generated = results.filter((r) => r.status === "generated").length;
    const errors = results.filter((r) => r.status === "error").length;
    const skipped = results.filter((r) => r.status === "skipped").length;

    yield* Console.log("");
    const summaryTable = createTable({
      colWidths: [20, 10],
      head: ["Status", "Count"],
      theme: "cyan",
    });

    summaryTable.push(
      [colors.success("Generated"), colors.value(generated.toString())],
      [colors.error("Errors"), colors.value(errors.toString())],
      [colors.dim("Skipped"), colors.value(skipped.toString())],
      [chalk.cyan.bold("Total Schemas"), chalk.white.bold((results.length - skipped).toString())]
    );

    yield* Console.log(summaryTable.toString());

    yield* Console.log("");
    if (errors === 0) {
      yield* Console.log(colors.success(`✅ Successfully generated ${generated} GraphQL schemas`));
    } else {
      yield* Console.log(colors.error(`❌ Generation completed with ${errors} errors`));
      return yield* Effect.fail(
        new ProcessError({
          command: "codegen schema",
          message: `Schema generation completed with ${errors} errors`,
        })
      );
    }
  });
}

function generateAllVendorSchemas(
  indexerArg: Indexer.Name | "all"
): Effect.Effect<void, ProcessError, FileSystem.FileSystem> {
  return Effect.gen(function* () {
    displayHeader("📝 GENERATING GRAPHQL SCHEMAS", "cyan");

    // Build list of vendor/indexer combinations to process
    const combinations: Array<{ vendor: Indexer.Vendor; indexer: Indexer.Name }> = [];
    for (const v of VENDORS) {
      if (indexerArg === "all") {
        for (const i of INDEXERS) {
          combinations.push({ indexer: i, vendor: v });
        }
      } else {
        combinations.push({ indexer: indexerArg, vendor: v });
      }
    }

    // Generate schemas with Effect.forEach
    const results = yield* Effect.forEach(combinations, ({ vendor, indexer }) =>
      generateSchemaWithResult(vendor, indexer)
    );

    // Display results table
    yield* Console.log("");
    const table = createTable({
      colWidths: [15, 15, 50, 15],
      head: ["Vendor", "Indexer", "Output Path", "Status"],
      theme: "cyan",
    });

    for (const result of results) {
      if (result.status === "skipped") {
        continue;
      }

      const statusText =
        result.status === "generated" ? colors.success("✅ Generated") : colors.error("❌ Error");
      table.push([
        colors.value(_.capitalize(result.vendor)),
        colors.value(_.capitalize(result.indexer)),
        colors.dim(result.outputPath),
        statusText,
      ]);
    }

    yield* Console.log(table.toString());

    // Summary statistics
    const generated = results.filter((r) => r.status === "generated").length;
    const errors = results.filter((r) => r.status === "error").length;
    const skipped = results.filter((r) => r.status === "skipped").length;

    yield* Console.log("");
    const summaryTable = createTable({
      colWidths: [20, 10],
      head: ["Status", "Count"],
      theme: "cyan",
    });

    summaryTable.push(
      [colors.success("Generated"), colors.value(generated.toString())],
      [colors.error("Errors"), colors.value(errors.toString())],
      [colors.dim("Skipped"), colors.value(skipped.toString())],
      [chalk.cyan.bold("Total Schemas"), chalk.white.bold((results.length - skipped).toString())]
    );

    yield* Console.log(summaryTable.toString());

    yield* Console.log("");
    if (errors === 0) {
      yield* Console.log(colors.success(`✅ Successfully generated ${generated} GraphQL schemas`));
    } else {
      yield* Console.log(colors.error(`❌ Generation completed with ${errors} errors`));
      return yield* Effect.fail(
        new ProcessError({
          command: "codegen schema",
          message: `Schema generation completed with ${errors} errors`,
        })
      );
    }
  });
}

const schemaLogic = (options: {
  readonly vendor: "graph" | "envio" | "all";
  readonly indexer: Indexer.Name | "all";
}) =>
  Effect.gen(function* () {
    const vendorArg = options.vendor;
    const indexerArg = options.indexer;

    // Analytics has a manually maintained schema, skip generation
    if (indexerArg === "analytics") {
      yield* Console.log("⏭️  Skipping analytics (uses manually maintained schema)");
      return;
    }

    if (vendorArg === "all") {
      return yield* generateAllVendorSchemas(indexerArg);
    }

    if (indexerArg === "all") {
      return yield* generateAllIndexerSchemas(vendorArg);
    }

    return yield* generateSchema(vendorArg, indexerArg);
  });

export const schemaCommand = Command.make(
  "schema",
  { indexer: indexerOption, vendor: vendorOption },
  schemaLogic
);
