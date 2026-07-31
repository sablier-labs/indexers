import { randomUUID } from "node:crypto";
import path from "node:path";
import { CommandExecutor, FileSystem, Command as PlatformCommand } from "@effect/platform";
import { Clock, Effect } from "effect";
import * as yaml from "js-yaml";
import { ROOT_DIR } from "../../../utils/paths.js";
import type { GraphManifest } from "../../codegen/graph-manifest/manifest-types.js";
import { dumpYAML } from "../../codegen/helpers.js";

type DeploymentMetadata = {
  commitHash: string;
  deployedAt: number;
  versionLabel: string;
};

type ContextValue = {
  data: string;
};

type DeploymentManifest = {
  dataSources?: Array<{
    context?: {
      commitHash?: ContextValue;
      deployedAt?: ContextValue;
      versionLabel?: ContextValue;
    };
    name?: string;
  }>;
};

/**
 * Replaces the development placeholders in an IndexerInfo data source.
 */
export function applyIndexerInfoMetadata<T extends DeploymentManifest>(
  manifest: T,
  metadata: DeploymentMetadata
): T {
  const source = manifest.dataSources?.find((dataSource) => dataSource.name === "IndexerInfo");
  const context = source?.context;
  if (!context?.commitHash || !context.deployedAt || !context.versionLabel) {
    throw new Error("IndexerInfo deployment context is missing from the Graph manifest");
  }

  context.commitHash.data = metadata.commitHash;
  context.deployedAt.data = metadata.deployedAt.toString();
  context.versionLabel.data = metadata.versionLabel;
  return manifest;
}

/**
 * Creates a temporary sibling manifest containing deployment-specific metadata.
 * Keeping it beside the generated manifest preserves all relative schema, ABI, and mapping paths.
 */
export function prepareDeploymentManifest(manifestPath: string, versionLabel: string) {
  return Effect.acquireRelease(
    Effect.gen(function* () {
      const executor = yield* CommandExecutor.CommandExecutor;
      const fs = yield* FileSystem.FileSystem;
      const [contents, commitHash, timestampMs] = yield* Effect.all([
        fs.readFileString(manifestPath),
        executor.string(
          PlatformCommand.make("git", "rev-parse", "HEAD").pipe(
            PlatformCommand.workingDirectory(ROOT_DIR)
          )
        ),
        Clock.currentTimeMillis,
      ]);

      const manifest = yield* Effect.try({
        catch: (error) => new Error(`Failed to prepare Graph manifest: ${String(error)}`),
        try: () =>
          applyIndexerInfoMetadata(yaml.load(contents) as DeploymentManifest, {
            commitHash: commitHash.trim(),
            deployedAt: Math.trunc(timestampMs / 1000),
            versionLabel,
          }),
      });

      const parsedPath = path.parse(manifestPath);
      const deploymentPath = path.join(
        parsedPath.dir,
        `.${parsedPath.name}.deploy-${randomUUID()}${parsedPath.ext}`
      );
      yield* fs.writeFileString(deploymentPath, dumpYAML(manifest as GraphManifest.TopSection));
      return deploymentPath;
    }),
    (deploymentPath) =>
      FileSystem.FileSystem.pipe(
        Effect.flatMap((fs) => fs.remove(deploymentPath)),
        Effect.catchAll(() => Effect.void)
      )
  );
}
