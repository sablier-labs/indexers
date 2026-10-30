import { Schema } from "effect";
import * as yaml from "js-yaml";
import { CloudCommitSchema } from "../../services/envio-cloud.types.js";
import type { EnvioTarget } from "./targets.js";

const block = Schema.Number.pipe(
  Schema.int(),
  Schema.nonNegative(),
  Schema.lessThanOrEqualTo(Number.MAX_SAFE_INTEGER)
);
export const SettingsSchema = Schema.Struct({
  auto_deploy: Schema.Boolean,
  branch: Schema.String,
  config_file: Schema.String,
  repository: Schema.String,
  root_dir: Schema.String,
});
export const CommitsSchema = Schema.Array(
  Schema.Struct({ branch: Schema.String, commit_hash: CloudCommitSchema, status: Schema.String })
);
export const MetricsSchema = Schema.Array(
  Schema.Struct({
    block_height: block,
    chain_id: block,
    latest_processed_block: block,
    start_block: block,
  })
);
const ConfigSchema = Schema.Struct({
  chains: Schema.Array(
    Schema.Struct({ end_block: Schema.optional(block), id: block, start_block: block })
  ).pipe(Schema.minItems(1)),
});
export type DeploymentConfig = typeof ConfigSchema.Type;
export type Metrics = typeof MetricsSchema.Type;
export type PreparedDeployment = {
  readonly config: DeploymentConfig;
  readonly configText: string;
  readonly deployedAt: number;
  readonly preparedCommit: string;
  readonly sourceCommit: string;
  readonly target: EnvioTarget;
};

export function parseDeploymentConfig(text: string): DeploymentConfig {
  const config = Schema.decodeUnknownSync(ConfigSchema)(yaml.load(text));
  const ids = config.chains.map((chain) => chain.id);
  if (new Set(ids).size !== ids.length) {
    throw new Error("Deployment config contains duplicate chains");
  }
  if (
    config.chains.some(
      (chain) => chain.end_block !== undefined && chain.end_block < chain.start_block
    )
  ) {
    throw new Error("Configured end block precedes start block");
  }
  return config;
}

/**
 * Only the captured config defines an end block; status API end_block: 0 is a sentinel.
 * Metrics are sampled non-atomically, so processed may briefly exceed the sampled head.
 */
export function syncProgress(config: DeploymentConfig, metrics: Metrics) {
  if (new Set(metrics.map((metric) => metric.chain_id)).size !== metrics.length) {
    throw new Error("Metrics contain duplicate chains");
  }
  return config.chains.map((chain) => {
    const metric = metrics.find((row) => row.chain_id === chain.id);
    const goal =
      metric === undefined
        ? undefined
        : Math.min(metric.block_height, chain.end_block ?? metric.block_height);
    const valid =
      metric !== undefined &&
      metric.start_block === chain.start_block &&
      metric.block_height > 0 &&
      goal !== undefined &&
      goal >= chain.start_block;
    return {
      chainId: chain.id,
      complete: valid && metric.latest_processed_block >= goal,
      goal,
      processed: metric?.latest_processed_block,
    };
  });
}

export function sameCommit(left: string, right: string) {
  return (
    left.toLowerCase().startsWith(right.toLowerCase()) ||
    right.toLowerCase().startsWith(left.toLowerCase())
  );
}

const DURATION_PATTERN = /^(?<count>\d+)(?<unit>s|m|h)$/u;
export function parseTimeout(value: string) {
  const match = DURATION_PATTERN.exec(value);
  if (!match?.groups || Number(match.groups.count) <= 0) {
    throw new Error("Timeout must be a positive duration such as 30s, 60m, or 2h");
  }
  const milliseconds =
    Number(match.groups.count) *
    (match.groups.unit === "h" ? 3_600_000 : match.groups.unit === "m" ? 60_000 : 1000);
  if (!Number.isSafeInteger(milliseconds)) {
    throw new Error("Timeout is too large");
  }
  return milliseconds;
}
