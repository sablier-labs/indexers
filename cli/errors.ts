import { Data } from "effect";

export class ChainNotFoundError extends Data.TaggedError("ChainNotFoundError")<{
  chainSlug: string;
}> {}

export class VendorApiError extends Data.TaggedError("VendorApiError")<{
  vendor: "envio" | "graph";
  message: string;
}> {}

export class GraphDeployError extends Data.TaggedError("GraphDeployError")<{
  chainSlug: string;
  message: string;
}> {}

export class UserAbortError extends Data.TaggedError("UserAbortError")<Record<string, never>> {}

export class FileOperationError extends Data.TaggedError("FileOperationError")<{
  operation: "read" | "write" | "copy" | "delete";
  path: string;
  message: string;
}> {}

export class ProcessError extends Data.TaggedError("ProcessError")<{
  command: string;
  exitCode?: number;
  message: string;
}> {}

export class ValidationError extends Data.TaggedError("ValidationError")<{
  field: string;
  message: string;
}> {}
