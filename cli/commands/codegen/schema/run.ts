import { FileSystem } from "@effect/platform";
import chalk from "chalk";
import { Console, Effect } from "effect";
import { print } from "graphql";
import * as _ from "lodash-es";
import { getMergedSchema } from "../../../../schema/index.js";
import type { Indexer } from "../../../../src/index.js";
import { AUTOGEN_COMMENT, GRAPH_TARGETS, VENDORS } from "../../../utils/constants.js";
import { colors, createTable, displayHeader } from "../../../utils/display.js";
import { ProcessError, toFileOperationError } from "../../../utils/errors.js";
import paths, { getRelative } from "../../../utils/paths.js";

function writeSchema(vendor: Indexer.Vendor, target: Indexer.GraphTarget) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const schema = `${AUTOGEN_COMMENT}${print(getMergedSchema(target))}`;
    const outputPath = paths.schema(vendor, target);

    yield* fs
      .writeFileString(outputPath, schema)
      .pipe(Effect.mapError(toFileOperationError(outputPath, "write")));

    return outputPath;
  });
}

function generateSchemaWithResult(vendor: Indexer.Vendor, target: Indexer.GraphTarget) {
  return Effect.gen(function* () {
    const outputPath = yield* writeSchema(vendor, target);

    return {
      target,
      outputPath: yield* getRelative(outputPath),
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

function generateSchema(vendor: Indexer.Vendor, target: Indexer.GraphTarget) {
  return Effect.gen(function* () {
    const outputPath = yield* writeSchema(vendor, target);

    yield* Console.log(
      `✅ Generated GraphQL schema for ${_.capitalize(vendor)} vendor and ${_.capitalize(target)} target`
    );
    yield* Console.log(`📁 Output path: ${yield* getRelative(outputPath)}`);
    yield* Console.log("");
  });
}

type SchemaResult = {
  outputPath: string;
  status: "generated" | "error";
  target: string;
  vendor: string;
};

function displaySchemaResults(results: SchemaResult[]) {
  return Effect.gen(function* () {
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

function generateSchemas(
  vendors: readonly Indexer.Vendor[],
  targets: readonly Indexer.GraphTarget[]
) {
  return Effect.gen(function* () {
    yield* displayHeader("📝 GENERATING GRAPHQL SCHEMAS", "cyan");

    const combinations = vendors.flatMap((vendor) => targets.map((target) => ({ target, vendor })));

    const results = yield* Effect.forEach(combinations, ({ target, vendor }) =>
      generateSchemaWithResult(vendor, target)
    );

    yield* displaySchemaResults(results);
  });
}

export const handler = ({
  indexer,
  vendor,
}: {
  readonly vendor: Indexer.Vendor | "all";
  readonly indexer: Indexer.Target | "all";
}) =>
  Effect.gen(function* () {
    // Analytics has a manually maintained schema, skip generation
    if (indexer === "analytics") {
      yield* Console.log("⏭️  Skipping (uses manually maintained schema)");
      return;
    }

    if (vendor === "all" || indexer === "all") {
      return yield* generateSchemas(
        vendor === "all" ? VENDORS : [vendor],
        indexer === "all" ? GRAPH_TARGETS : [indexer]
      );
    }

    return yield* generateSchema(vendor, indexer);
  });
