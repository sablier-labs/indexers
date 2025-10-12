import chalk from "chalk";
import type { Command } from "commander";
import * as fs from "fs-extra";
import { print } from "graphql";
import _ from "lodash";
import paths from "../../lib/paths";
import { getMergedSchema } from "../../schema";
import { PROTOCOLS } from "../constants";
import * as helpers from "../helpers";
import { colors, createTable, displayHeader } from "../shared/display-utils";

function exportSchemaCommand(): Command {
  const command = helpers.createBaseCmd("Copy GraphQL schemas to the dist directory");

  command.action(async () => {
    displayHeader("📦 EXPORTING GRAPHQL SCHEMAS", "cyan");

    fs.ensureDirSync(paths.exports.schemas());

    type ExportResult = {
      outputPath: string;
      protocol: string;
      status: "exported" | "error";
    };

    const results: ExportResult[] = [];

    for (const protocol of PROTOCOLS) {
      try {
        // Using Envio because they have the most complete schema. See the User and Revenue entities.
        const schema = print(getMergedSchema(protocol));
        const outputPath = paths.exports.schema(protocol);
        fs.writeFileSync(outputPath, schema);
        results.push({ outputPath: helpers.getRelative(outputPath), protocol, status: "exported" });
      } catch {
        results.push({ outputPath: "", protocol, status: "error" });
      }
    }

    // Display results table
    console.log("");
    const table = createTable({
      colWidths: [20, 50, 15],
      head: ["Protocol", "Output Path", "Status"],
      theme: "cyan",
    });

    for (const result of results) {
      const statusText = result.status === "exported" ? colors.success("✅ Exported") : colors.error("❌ Error");
      table.push([colors.value(_.capitalize(result.protocol)), colors.dim(result.outputPath), statusText]);
    }

    console.log(table.toString());

    // Summary statistics
    const exported = results.filter((r) => r.status === "exported").length;
    const errors = results.filter((r) => r.status === "error").length;

    console.log("");
    const summaryTable = createTable({
      colWidths: [20, 10],
      head: ["Status", "Count"],
      theme: "cyan",
    });

    summaryTable.push(
      [colors.success("Exported"), colors.value(exported.toString())],
      [colors.error("Errors"), colors.value(errors.toString())],
      [chalk.cyan.bold("Total Schemas"), chalk.white.bold(results.length.toString())],
    );

    console.log(summaryTable.toString());

    console.log("");
    if (errors === 0) {
      console.log(colors.success(`✅ Successfully exported ${exported} GraphQL schemas`));
    } else {
      console.log(colors.error(`❌ Export completed with ${errors} errors`));
      process.exit(1);
    }
  });

  return command;
}

export const exportSchemaCmd = exportSchemaCommand();
