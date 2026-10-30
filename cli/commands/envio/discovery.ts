import { Effect } from "effect";
import { EnvioCloud } from "../../services/envio-cloud.js";
import type { CloudDeployment, CloudIndexer } from "../../services/envio-cloud.types.js";
import {
  CLOUD_COMMIT_PATTERN,
  compareCloudCreationTimes,
  EnvioCloudError,
} from "../../services/envio-cloud.types.js";
import type { EnvioTarget } from "./targets.js";
import { getEnvioTarget } from "./targets.js";

export type DeploymentSelector =
  | { readonly kind: "production" }
  | { readonly kind: "commit"; readonly commit: string }
  | { readonly kind: "latest-nonproduction" };

export function selectDeployment(indexer: CloudIndexer, selector: DeploymentSelector) {
  return Effect.try({
    catch: (error) =>
      new EnvioCloudError({
        message: error instanceof Error ? error.message : "Unable to select deployment",
        operation: "deployment discovery",
      }),
    try: (): CloudDeployment => {
      let matches: readonly CloudDeployment[];
      switch (selector.kind) {
        case "production":
          matches = indexer.deployments.filter((deployment) => deployment.prod_status === "prod");
          break;
        case "commit": {
          if (!CLOUD_COMMIT_PATTERN.test(selector.commit)) {
            throw new Error("Commit selector must contain 7 to 40 hexadecimal characters");
          }
          const commit = selector.commit.toLowerCase();
          matches = indexer.deployments.filter((deployment) => {
            const candidate = deployment.commit_hash.toLowerCase();
            return candidate.startsWith(commit) || commit.startsWith(candidate);
          });
          break;
        }
        case "latest-nonproduction": {
          const candidates = indexer.deployments.filter(
            (deployment) => deployment.prod_status !== "prod"
          );
          const [newest] = [...candidates].sort((left, right) =>
            compareCloudCreationTimes(right.created_time, left.created_time)
          );
          matches = newest
            ? candidates.filter(
                (candidate) =>
                  compareCloudCreationTimes(candidate.created_time, newest.created_time) === 0
              )
            : [];
          break;
        }
      }
      if (matches.length !== 1) {
        throw new Error(
          matches.length === 0
            ? "No deployment matches the selector"
            : "Deployment selector is ambiguous"
        );
      }
      const [selected] = matches;
      if (!selected.gql_endpoint) {
        throw new Error(`Selected deployment ${selected.commit_hash} has no endpoint`);
      }
      return selected;
    },
  });
}

export function discoverDeployment(target: EnvioTarget, selector: DeploymentSelector) {
  return Effect.gen(function* () {
    const cloud = yield* EnvioCloud;
    const resolvedTarget = getEnvioTarget(target);
    const indexer = yield* cloud.getIndexer(resolvedTarget.cloudName);
    const deployment = yield* selectDeployment(indexer, selector);
    return { deployment, indexer, ...resolvedTarget };
  });
}
