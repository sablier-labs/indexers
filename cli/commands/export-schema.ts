import { Command } from "@effect/cli";
import { FileSystem } from "@effect/platform";
import chalk from "chalk";
import { Console, Effect } from "effect";
import { print } from "graphql";
import _ from "lodash";
import paths from "../../lib/paths.js";
import { getMergedSchema } from "../../schema/index.js";
import { PROTOCOLS } from "../constants.js";
import { colors, createTable, displayHeader } from "../display.js";
import { ProcessError } from "../errors.js";
import { getRelative } from "../helpers.js";

type ExportResult = {
  outputPath: string;
  protocol: string;
  status: "exported" | "error";
};

const exportSchemaLogic = () =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;

    displayHeader("📦 EXPORTING GRAPHQL SCHEMAS", "cyan");

    // Ensure the export directory exists
    const exportDir = paths.exports.schemas();
    yield* fs.makeDirectory(exportDir, { recursive: true });

    const results: ExportResult[] = [];

    // Process each protocol
    for (const protocol of PROTOCOLS) {
      const result = yield* Effect.gen(function* () {
        // Using Envio because they have the most complete schema. See the User and Revenue entities.
        const schema = print(getMergedSchema(protocol));
        const outputPath = paths.exports.schema(protocol);
        yield* fs.writeFileString(outputPath, schema);
        return { outputPath: getRelative(outputPath), protocol, status: "exported" as const };
      }).pipe(
        Effect.catchAll(() =>
          Effect.succeed({ outputPath: "", protocol, status: "error" as const })
        )
      );

      results.push(result);
    }

    // Display results table
    yield* Console.log("");
    const table = createTable({
      colWidths: [20, 50, 15],
      head: ["Protocol", "Output Path", "Status"],
      theme: "cyan",
    });

    for (const result of results) {
      const statusText =
        result.status === "exported" ? colors.success("✅ Exported") : colors.error("❌ Error");
      table.push([
        colors.value(_.capitalize(result.protocol)),
        colors.dim(result.outputPath),
        statusText,
      ]);
    }

    yield* Console.log(table.toString());

    // Summary statistics
    const exported = results.filter((r) => r.status === "exported").length;
    const errors = results.filter((r) => r.status === "error").length;

    yield* Console.log("");
    const summaryTable = createTable({
      colWidths: [20, 10],
      head: ["Status", "Count"],
      theme: "cyan",
    });

    summaryTable.push(
      [colors.success("Exported"), colors.value(exported.toString())],
      [colors.error("Errors"), colors.value(errors.toString())],
      [chalk.cyan.bold("Total Schemas"), chalk.white.bold(results.length.toString())]
    );

    yield* Console.log(summaryTable.toString());

    yield* Console.log("");
    if (errors === 0) {
      yield* Console.log(colors.success(`✅ Successfully exported ${exported} GraphQL schemas`));
    } else {
      yield* Console.log(colors.error(`❌ Export completed with ${errors} errors`));
      return yield* Effect.fail(
        new ProcessError({
          command: "export-schema",
          message: `Export completed with ${errors} errors`,
        })
      );
    }
  });

export const exportSchemaCommand = Command.make("export-schema", {}, exportSchemaLogic);
