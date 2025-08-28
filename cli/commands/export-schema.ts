import type { Command } from "commander";
import * as fs from "fs-extra";
import { print } from "graphql";
import paths from "../../lib/paths";
import { getMergedSchema } from "../../schema";
import { PROTOCOLS } from "../constants";
import * as helpers from "../helpers";

function exportSchemaCommand(): Command {
  const command = helpers.createBaseCmd("Copy GraphQL schemas to the dist directory");

  command.action(async () => {
    fs.ensureDirSync(paths.exports.schemas());
    for (const protocol of PROTOCOLS) {
      // Using Envio because they have the most complete schema. See the User and Revenue entities.
      const schema = print(getMergedSchema(protocol));
      const outputPath = paths.exports.schema(protocol);
      fs.writeFileSync(outputPath, schema);
    }
    // TODO: copy the analytics schema
  });

  return command;
}

export const exportSchemaCmd = exportSchemaCommand();
