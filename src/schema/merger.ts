import * as path from "node:path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { type DocumentNode } from "graphql";
import { Protocol } from "sablier";
import { SCHEMA_DIR } from "../paths";
import { type Types } from "../types";
import { getAssetDefs, getWatcherDefs } from "./common";
import { getEnumDefs } from "./enums";
import { flowStreamDefs } from "./flow/stream.graphql";
import { lockupStreamDefs } from "./lockup/stream.graphql";

/**
 * Generates a merged schema for a given protocol.
 *
 * @param protocol - The protocol to generate a schema for.
 * @returns A merged schema for the given protocol.
 */
export function getMergedSchema(protocol: Types.Protocol): DocumentNode {
  // Defs common to all protocols
  const userDefs = getDefs("common", "user");
  const gqlDefs: string[] = [userDefs];

  const enumDefs = getEnumDefs(protocol);
  const assetDefs = getAssetDefs(protocol);
  const watcherDefs = getWatcherDefs(protocol);
  const tsDefs: DocumentNode[] = [enumDefs, assetDefs, watcherDefs];

  // Defs unique to Airdrops
  if (protocol === Protocol.Airdrops) {
    const activityDefs = getDefs(protocol, "activity");
    const actionDefs = getDefs(protocol, "action");
    const campaignDefs = getDefs(protocol, "campaign");
    const factoryDefs = getDefs(protocol, "factory");
    const trancheDefs = getDefs(protocol, "tranche");
    gqlDefs.push(activityDefs, actionDefs, campaignDefs, factoryDefs, trancheDefs);
  }
  // Defs common to Flow and Lockup
  else {
    const actionDefs = getDefs("common", "action");
    const batchDefs = getDefs("common", "batch");
    gqlDefs.push(actionDefs, batchDefs, userDefs);

    const streamDefs = protocol === Protocol.Lockup ? lockupStreamDefs : flowStreamDefs;
    tsDefs.push(streamDefs);

    // Defs unique to Lockup
    if (protocol === Protocol.Lockup) {
      const segmentDefs = getDefs(protocol, "segment");
      const trancheDefs = getDefs(protocol, "tranche");
      gqlDefs.push(segmentDefs, trancheDefs);
    }
  }

  const loadedGqlDefs = loadFilesSync(gqlDefs);
  const allDefs = [...loadedGqlDefs, ...tsDefs];
  const mergedSchema = mergeTypeDefs(allDefs, { throwOnConflict: true });
  return mergedSchema;
}

function getDefs(protocol: Types.Protocol | "common", file: string): string {
  return path.join(SCHEMA_DIR, protocol, `${file}.graphql`);
}
