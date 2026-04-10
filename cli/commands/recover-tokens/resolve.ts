import { dirname } from "node:path";
import type { FileSystem } from "@effect/platform";
import { Effect, Option } from "effect";
import { sablier } from "sablier";
import { FileOperationError, ValidationError } from "../../errors.js";
import { resolveFromCliCwd } from "../../helpers.js";
import paths, { getQueryAssetsDirectoryName } from "../../paths.js";
import type { RecoverContract, RecoverTokensProtocol } from "./helpers.js";
import {
  getAggregateFunctionName,
  getRecoverTokensContractName,
  getRecoverTokensDefaultFilePath,
  isRecoverVersion,
  parseIndexedAssetFile,
} from "./helpers.js";

export function resolveSablierContracts(protocol: RecoverTokensProtocol, chainId: number) {
  const contractName = getRecoverTokensContractName(protocol);
  const contracts: RecoverContract[] = [];

  for (const release of sablier.releases.getAll({ protocol })) {
    if (!isRecoverVersion(protocol, release.version)) {
      continue;
    }

    const contract = sablier.contracts.get({ chainId, contractName, release });
    if (!contract) {
      continue;
    }

    contracts.push({
      address: contract.address as `0x${string}`,
      aggregateFunctionName: getAggregateFunctionName(protocol, release.version),
      contractName,
      version: release.version,
    });
  }

  if (contracts.length === 0) {
    return Effect.fail(
      new ValidationError({
        field: "protocol",
        message: `No ${contractName} deployments with recover support found for chain ${chainId}`,
      })
    );
  }

  return Effect.succeed(contracts);
}

export function resolveSourcePath(
  fs: FileSystem.FileSystem,
  file: Option.Option<string>,
  chainId: number,
  dateSegment: string
) {
  if (Option.isSome(file)) {
    return resolveFromCliCwd(file.value);
  }

  return Effect.gen(function* () {
    const todayPath = getRecoverTokensDefaultFilePath(chainId, dateSegment);
    if (yield* fs.exists(todayPath)) {
      return todayPath;
    }

    // Fall back to the most recent generated asset file
    const generatedDir = dirname(paths.generated.queryAssets.dir(dateSegment));
    if (!(yield* fs.exists(generatedDir))) {
      return yield* failMissingAssetFile(chainId, todayPath);
    }

    const entries = yield* fs.readDirectory(generatedDir);
    const assetDirPrefix = getQueryAssetsDirectoryName("");
    const dateDirs = entries
      .filter((entry) => entry.startsWith(assetDirPrefix))
      .sort()
      .reverse();

    for (const dir of dateDirs) {
      const candidateDate = dir.slice(assetDirPrefix.length);
      const candidatePath = getRecoverTokensDefaultFilePath(chainId, candidateDate);
      if (yield* fs.exists(candidatePath)) {
        return candidatePath;
      }
    }

    return yield* failMissingAssetFile(chainId, todayPath);
  });
}

function failMissingAssetFile(chainId: number, searchedPath: string) {
  return Effect.fail(
    new FileOperationError({
      message: `No asset file found for chain ${chainId}. Run 'just query::assets --indexer streams' to generate it`,
      operation: "read",
      path: searchedPath,
    })
  );
}

export function readIndexedAssetFile(
  fs: FileSystem.FileSystem,
  filePath: string,
  options: { chainId: number }
) {
  return Effect.gen(function* () {
    const exists = yield* fs.exists(filePath);
    if (!exists) {
      return yield* Effect.fail(
        new FileOperationError({
          message: `Asset file does not exist: ${filePath}`,
          operation: "read",
          path: filePath,
        })
      );
    }

    const content = yield* fs.readFileString(filePath).pipe(
      Effect.mapError(
        (error) =>
          new FileOperationError({
            message: error instanceof Error ? error.message : String(error),
            operation: "read",
            path: filePath,
          })
      )
    );

    const assetFile = yield* Effect.try({
      catch: (error) =>
        new ValidationError({
          field: "file",
          message: error instanceof Error ? error.message : "Invalid asset file",
        }),
      try: () => parseIndexedAssetFile(content),
    });

    if (assetFile.indexer !== "streams") {
      return yield* Effect.fail(
        new ValidationError({
          field: "file",
          message: `Asset file indexer "${assetFile.indexer}" does not match expected indexer "streams"`,
        })
      );
    }

    if (assetFile.chainId !== options.chainId) {
      return yield* Effect.fail(
        new ValidationError({
          field: "file",
          message: `Asset file chain ID ${assetFile.chainId} does not match --chain-id ${options.chainId}`,
        })
      );
    }

    return assetFile;
  });
}
