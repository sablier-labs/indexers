import { FileSystem } from "@effect/platform";
import chalk from "chalk";
import { Cause, Console, Effect, Either, Exit } from "effect";
import * as _ from "lodash-es";
import { sablier } from "sablier";
import type { Indexer } from "../../../../src/index.js";
import { graphChains } from "../../../../src/indexers/graph.js";
import { getChain } from "../../../utils/args.js";
import { GRAPH_TARGETS } from "../../../utils/constants.js";
import { colors, createTable, displayHeader } from "../../../utils/display.js";
import { toFileOperationError } from "../../../utils/errors.js";
import paths, { getRelative } from "../../../utils/paths.js";
import { dumpYAML } from "../helpers.js";
import { createGraphManifest } from "./index.js";

type ManifestResult = {
  chainId: number;
  chainName: string;
  manifestPath: string;
  status: "generated" | "error";
};

/**
 * Writes the subgraph manifest to a file.
 * @returns The relative path to the manifest file.
 */
function writeManifestToFile(target: Indexer.GraphTarget, chainId: number) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const manifest = yield* createGraphManifest(target, chainId);
    const yaml = dumpYAML(manifest);
    const manifestPath = paths.graph.manifest(target, chainId);
    yield* fs
      .writeFileString(manifestPath, yaml)
      .pipe(Effect.mapError(toFileOperationError(manifestPath, "write")));

    return yield* getRelative(manifestPath);
  });
}

function generateManifest(target: Indexer.GraphTarget, chainArg: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const chain = yield* getChain(chainArg);
    const manifestsDir = paths.graph.manifests(target);
    yield* fs
      .makeDirectory(manifestsDir, { recursive: true })
      .pipe(Effect.mapError(toFileOperationError(manifestsDir, "write")));

    const manifestPath = yield* writeManifestToFile(target, chain.id);
    yield* Console.log(`✅ Generated subgraph manifest for ${chainArg}`);
    yield* Console.log(`📁 Manifest path: ${manifestPath}`);
    yield* Console.log();
  });
}

function generateAllChainManifests(target: Indexer.GraphTarget, suppressFinalLog = false) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const manifestsDir = paths.graph.manifests(target);

    if (yield* fs.exists(manifestsDir)) {
      yield* fs
        .remove(manifestsDir, { recursive: true })
        .pipe(Effect.mapError(toFileOperationError(manifestsDir, "delete")));
    }
    yield* fs
      .makeDirectory(manifestsDir, { recursive: true })
      .pipe(Effect.mapError(toFileOperationError(manifestsDir, "write")));
    yield* fs
      .writeFileString(`${manifestsDir}/.gitkeep`, "")
      .pipe(Effect.mapError(toFileOperationError(`${manifestsDir}/.gitkeep`, "write")));

    const results: ManifestResult[] = [];

    for (const chainId of graphChains) {
      const chainName = sablier.chains.get(chainId)?.name ?? "Unknown";
      const result = yield* Effect.exit(writeManifestToFile(target, chainId));

      if (Exit.isSuccess(result)) {
        results.push({
          chainId,
          chainName,
          manifestPath: result.value,
          status: "generated",
        });
      } else {
        if (Cause.isInterrupted(result.cause)) {
          return yield* Effect.failCause(result.cause);
        }
        const error = Cause.squash(result.cause);
        const message = error instanceof Error ? error.message : String(error);
        yield* Console.error(
          `❌ ${target} manifest for ${chainName} (${chainId}) failed with ${message}`
        );
        results.push({
          chainId,
          chainName,
          manifestPath: "",
          status: "error",
        });
      }
    }

    if (results.length === 0) {
      return yield* Effect.fail(
        new Error(`No manifests generated for target ${_.capitalize(target)}. This is a bug.`)
      );
    }

    const generated = results.filter((r) => r.status === "generated").length;
    const errors = results.length - generated;

    if (!suppressFinalLog) {
      yield* displayHeader(
        `📋 GENERATING GRAPH MANIFESTS: ${_.capitalize(target).toUpperCase()}`,
        "cyan"
      );

      yield* Console.log("");
      const table = createTable({
        colWidths: [25, 10, 50, 15],
        head: ["Chain Name", "Chain ID", "Manifest Path", "Status"],
        theme: "cyan",
      });

      for (const result of results) {
        const statusText =
          result.status === "generated" ? colors.success("✅ Generated") : colors.error("❌ Error");
        table.push([
          colors.value(result.chainName),
          colors.dim(result.chainId.toString()),
          colors.dim(result.manifestPath),
          statusText,
        ]);
      }

      yield* Console.log(table.toString());

      yield* Console.log("");
      const summaryTable = createTable({
        colWidths: [20, 10],
        head: ["Status", "Count"],
        theme: "cyan",
      });

      summaryTable.push(
        [colors.success("Generated"), colors.value(generated.toString())],
        [colors.error("Errors"), colors.value(errors.toString())],
        [chalk.white.bold("Total Manifests"), chalk.white.bold(results.length.toString())]
      );

      yield* Console.log(summaryTable.toString());

      yield* Console.log("");
      yield* Console.log(
        errors === 0
          ? colors.success(`✅ Successfully generated ${generated} manifests`)
          : `Generated ${generated} of ${results.length} manifests`
      );
      yield* Console.log(colors.dim(`📁 Output directory: ${yield* getRelative(manifestsDir)}`));
    }

    return { errors, generated };
  });
}

function generateAllIndexerManifests(chainArg: string) {
  return Effect.gen(function* () {
    if (chainArg !== "all") {
      for (const target of GRAPH_TARGETS) {
        yield* generateManifest(target, chainArg);
      }
      return;
    }

    const failures: string[] = [];
    let totalCount = 0;
    for (const target of GRAPH_TARGETS) {
      const result = yield* Effect.either(generateAllChainManifests(target, true));
      if (Either.isLeft(result)) {
        failures.push(`Failed to generate ${target} manifests. ${result.left.message}`);
        continue;
      }

      const { errors, generated } = result.right;
      totalCount += generated;
      if (errors > 0) {
        failures.push(`Failed to generate ${target} manifests (${errors} failed)`);
      }
      yield* Console.log(
        errors === 0
          ? `✅ Generated ${generated} manifests for ${_.capitalize(target)} target`
          : `Generated ${generated} of ${generated + errors} manifests for ${_.capitalize(target)} target`
      );
    }

    yield* Console.log(
      `${failures.length === 0 ? "🎉 " : ""}Generated ${totalCount} manifests in total`
    );
    yield* Console.log();
    if (failures.length > 0) {
      return yield* Effect.fail(new Error(failures.join("\n")));
    }
  });
}

export const handler = (options: {
  readonly indexer: "airdrops" | "streams" | "all";
  readonly chain: string;
}) =>
  Effect.gen(function* () {
    const targetArg = options.indexer;
    const chainArg = options.chain;

    if (targetArg === "all") {
      return yield* generateAllIndexerManifests(chainArg);
    }

    if (chainArg === "all") {
      const { errors } = yield* generateAllChainManifests(targetArg);
      if (errors > 0) {
        return yield* Effect.fail(
          new Error(`Failed to generate ${targetArg} manifests (${errors} failed)`)
        );
      }
      return;
    }

    return yield* generateManifest(targetArg, chainArg);
  });
