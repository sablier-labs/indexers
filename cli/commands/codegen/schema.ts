/**
 * @file CLI for generating GraphQL schema files
 *
 * @example
 * pnpm tsx cli codegen schema --vendor all --indexer all
 * pnpm tsx cli codegen schema --vendor all --indexer streams
 * pnpm tsx cli codegen schema --vendor graph --indexer streams
 *
 * @param --vendor - Required: 'graph', 'envio', or 'all'
 * @param --indexer - Required: 'airdrops', 'streams', 'analytics', or 'all'
 */

import { Command, Options } from "@effect/cli";
import { FileSystem } from "@effect/platform";
import chalk from "chalk";
import { Console, Effect } from "effect";
import { print } from "graphql";
import _ from "lodash";
import { getMergedSchema } from "../../../schema/index.js";
import type { Indexer } from "../../../src/index.js";
import { AUTOGEN_COMMENT, GRAPH_TARGETS, TARGET_OPTIONS, VENDORS } from "../../constants.js";
import { colors, createTable, displayHeader } from "../../display.js";
import { ProcessError } from "../../errors.js";
import * as helpers from "../../helpers.js";
import paths from "../../paths.js";

/* -------------------------------------------------------------------------- */
/*                                   OPTIONS                                  */
/* -------------------------------------------------------------------------- */

const vendorOption = Options.choice("vendor", ["graph", "envio", "all"] as const).pipe(
  Options.withAlias("v"),
  Options.withDescription("Vendor to generate schemas for")
);

const indexerOption = Options.choice("indexer", TARGET_OPTIONS).pipe(
  Options.withAlias("i"),
  Options.withDescription("Indexer to generate schema for")
);

/**
 * Generates and writes a GraphQL schema for a specific indexer with result tracking
 */
function generateSchemaWithResult(vendor: Indexer.Vendor, target: Indexer.GraphTarget) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const mergedSchema = print(getMergedSchema(target, vendor));
    const schema = `${AUTOGEN_COMMENT}${mergedSchema}`;
    const outputPath = paths.schema(vendor, target);

    yield* fs.writeFileString(outputPath, schema);

    return {
      target,
      outputPath: yield* helpers.getRelative(outputPath),
      status: "generated" as const,
      vendor,
    };
  }).pipe(
    Effect.catchAll(() =>
      Effect.succeed({
        target,
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
function generateSchema(vendor: Indexer.Vendor, target: Indexer.GraphTarget) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const mergedSchema = print(getMergedSchema(target, vendor));
    const schema = `${AUTOGEN_COMMENT}${mergedSchema}`;
    const outputPath = paths.schema(vendor, target);

    yield* fs.writeFileString(outputPath, schema);

    yield* Console.log(
      `✅ Generated GraphQL schema for ${_.capitalize(vendor)} vendor and ${_.capitalize(target)} target`
    );
    yield* Console.log(`📁 Output path: ${yield* helpers.getRelative(outputPath)}`);
    yield* Console.log("");
  });
}

function generateAllIndexerSchemas(vendor: Indexer.Vendor) {
  return Effect.gen(function* () {
    yield* displayHeader("📝 GENERATING GRAPHQL SCHEMAS", "cyan");

    // Analytics uses a manually maintained schema
    const targets = GRAPH_TARGETS;
    const results = yield* Effect.forEach(targets, (target) =>
      generateSchemaWithResult(vendor, target)
    );

    // Display results table
    yield* Console.log("");
    const table = createTable({
      colWidths: [15, 15, 50, 15],
      head: ["Vendor", "Indexer", "Output Path", "Status"],
      theme: "cyan",
    });

    for (const result of results) {
      const statusText =
        result.status === "generated" ? colors.success("✅ Generated") : colors.error("❌ Error");
      table.push([
        colors.value(_.capitalize(result.vendor)),
        colors.value(_.capitalize(result.target)),
        colors.dim(result.outputPath),
        statusText,
      ]);
    }

    yield* Console.log(table.toString());

    // Summary statistics
    const generated = results.filter((r) => r.status === "generated").length;
    const errors = results.filter((r) => r.status === "error").length;
    yield* Console.log("");
    const summaryTable = createTable({
      colWidths: [20, 10],
      head: ["Status", "Count"],
      theme: "cyan",
    });

    summaryTable.push(
      [colors.success("Generated"), colors.value(generated.toString())],
      [colors.error("Errors"), colors.value(errors.toString())],
      [chalk.cyan.bold("Total Schemas"), chalk.white.bold(results.length.toString())]
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

function generateAllVendorSchemas(indexerArg: Indexer.GraphTarget | "all") {
  return Effect.gen(function* () {
    yield* displayHeader("📝 GENERATING GRAPHQL SCHEMAS", "cyan");

    // Build list of vendor/indexer combinations to process
    // Analytics uses a manually maintained schema
    const graphTargets = GRAPH_TARGETS;
    const combinations: Array<{ target: Indexer.GraphTarget; vendor: Indexer.Vendor }> = [];
    for (const v of VENDORS) {
      if (indexerArg === "all") {
        for (const target of graphTargets) {
          combinations.push({ target, vendor: v });
        }
      } else {
        combinations.push({ target: indexerArg, vendor: v });
      }
    }

    // Generate schemas with Effect.forEach
    const results = yield* Effect.forEach(combinations, ({ target, vendor }) =>
      generateSchemaWithResult(vendor, target)
    );

    // Display results table
    yield* Console.log("");
    const table = createTable({
      colWidths: [15, 15, 50, 15],
      head: ["Vendor", "Indexer", "Output Path", "Status"],
      theme: "cyan",
    });

    for (const result of results) {
      const statusText =
        result.status === "generated" ? colors.success("✅ Generated") : colors.error("❌ Error");
      table.push([
        colors.value(_.capitalize(result.vendor)),
        colors.value(_.capitalize(result.target)),
        colors.dim(result.outputPath),
        statusText,
      ]);
    }

    yield* Console.log(table.toString());

    // Summary statistics
    const generated = results.filter((r) => r.status === "generated").length;
    const errors = results.filter((r) => r.status === "error").length;
    yield* Console.log("");
    const summaryTable = createTable({
      colWidths: [20, 10],
      head: ["Status", "Count"],
      theme: "cyan",
    });

    summaryTable.push(
      [colors.success("Generated"), colors.value(generated.toString())],
      [colors.error("Errors"), colors.value(errors.toString())],
      [chalk.cyan.bold("Total Schemas"), chalk.white.bold(results.length.toString())]
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
  readonly indexer: Indexer.Target | "all";
}) =>
  Effect.gen(function* () {
    const vendorArg = options.vendor;
    const targetArg = options.indexer;

    // Analytics has a manually maintained schema, skip generation
    if (targetArg === "analytics") {
      yield* Console.log("⏭️  Skipping (uses manually maintained schema)");
      return;
    }

    if (vendorArg === "all") {
      return yield* generateAllVendorSchemas(targetArg);
    }

    if (targetArg === "all") {
      return yield* generateAllIndexerSchemas(vendorArg);
    }

    return yield* generateSchema(vendorArg, targetArg);
  });

export const schemaCommand = Command.make(
  "schema",
  { indexer: indexerOption, vendor: vendorOption },
  schemaLogic
);
