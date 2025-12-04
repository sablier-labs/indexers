import { CliConfig } from "@effect/cli";
import { NodeContext } from "@effect/platform-node";
import { Layer } from "effect";
import { HttpClientLive } from "./services/http";
import { PromptServiceLayerLive } from "./services/prompt";

/**
 * Compose all CLI service layers
 *
 * NodeContext.layer provides:
 * - FileSystem (from NodeFileSystem)
 * - Path (from NodePath)
 * - Terminal (from NodeTerminal)
 * - CommandExecutor (from NodeCommandExecutor)
 * - WorkerManager (from NodeWorker)
 *
 * Additional services:
 * - HttpClient (HTTP requests)
 * - PromptService (terminal user interactions)
 * - CliConfig (CLI configuration)
 */
export const CliLive = Layer.mergeAll(
  NodeContext.layer,
  HttpClientLive,
  PromptServiceLayerLive,
  CliConfig.layer({ showBuiltIns: false }),
);
