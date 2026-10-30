import { Data, Schema } from "effect";

export const ENVIO_CLOUD_ORG = "sablier-labs";

export class EnvioCloudError extends Data.TaggedError("EnvioCloudError")<{
  readonly operation: string;
  readonly message: string;
  readonly exitCode?: number;
}> {}

const nonempty = Schema.NonEmptyString;
export const CLOUD_COMMIT_PATTERN = /^[a-f\d]{7,40}$/iu;
export const CloudCommitSchema = Schema.String.pipe(Schema.pattern(CLOUD_COMMIT_PATTERN));
const TIMEZONE_PATTERN = /[zZ]$|[+-]\d\d:\d\d$/u;
const CREATED_TIME_PATTERN = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{1,9})?(?:Z|[+-]\d\d:\d\d)?$/u;
const FRACTION_PATTERN = /\.(?<fraction>\d+)/u;

/** The API omits the timezone on some UTC timestamps. Preserve the source value. */
export function cloudCreatedAtMillis(value: string): number {
  return Date.parse(TIMEZONE_PATTERN.test(value) ? value : `${value}Z`);
}

/** Retain submillisecond ordering from the source's microsecond timestamps. */
export function compareCloudCreationTimes(left: string, right: string): number {
  const millis = cloudCreatedAtMillis(left) - cloudCreatedAtMillis(right);
  if (millis !== 0) {
    return millis;
  }
  const leftFraction = (FRACTION_PATTERN.exec(left)?.groups?.fraction ?? "")
    .padEnd(9, "0")
    .slice(3);
  const rightFraction = (FRACTION_PATTERN.exec(right)?.groups?.fraction ?? "")
    .padEnd(9, "0")
    .slice(3);
  return leftFraction.localeCompare(rightFraction);
}

const createdTime = Schema.String.pipe(
  Schema.filter((value) =>
    CREATED_TIME_PATTERN.test(value) && Number.isFinite(cloudCreatedAtMillis(value))
      ? true
      : "Expected an ISO creation timestamp"
  )
);

const endpoint = Schema.String.pipe(
  Schema.filter((value) => {
    try {
      return new URL(value).protocol === "https:";
    } catch {
      return false;
    }
  })
);

// Fields verified with authenticated envio-cloud@1.0.0 indexer list/get reads.
// Pricing tier deliberately has no role in determining production status.
export const CloudDeploymentSchema = Schema.Struct({
  commit_hash: CloudCommitSchema,
  created_time: createdTime,
  gql_endpoint: Schema.optional(Schema.NullOr(endpoint)),
  indexer_id: nonempty,
  organisation_id: Schema.Literal(ENVIO_CLOUD_ORG),
  prod_status: nonempty,
});

export const CloudIndexerSchema = Schema.Struct({
  access_type: nonempty,
  created_time: createdTime,
  deployments: Schema.Array(CloudDeploymentSchema),
  description: Schema.String,
  indexer_id: nonempty,
  organisation_id: Schema.Literal(ENVIO_CLOUD_ORG),
}).pipe(
  Schema.filter((indexer) =>
    indexer.deployments.every((deployment) => deployment.indexer_id === indexer.indexer_id)
      ? true
      : "Deployment belongs to a different indexer"
  )
);

export type CloudDeployment = typeof CloudDeploymentSchema.Type;
export type CloudIndexer = typeof CloudIndexerSchema.Type;

export type CloudProcessOutput = {
  readonly exitCode: number;
  readonly stdout: string;
  readonly stderr: string;
};
