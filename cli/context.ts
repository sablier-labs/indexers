import { CliConfig } from "@effect/cli";
import { NodeContext } from "@effect/platform-node";
import { Layer } from "effect";
import { CliEnvLive } from "./services/env.js";
import { FileSystemLive } from "./services/filesystem.js";
import { HttpClientLive } from "./services/http.js";
import { CliFileLoggerLive } from "./services/logging.js";
import { PromptServiceLayerLive } from "./services/prompt.js";
import { CliSpinnerLive } from "./services/spinner.js";
import { CliUiLive } from "./services/ui.js";

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
  FileSystemLive,
  CliEnvLive,
  CliFileLoggerLive.pipe(Layer.provide(FileSystemLive)),
  CliUiLive,
  CliSpinnerLive,
  HttpClientLive,
  PromptServiceLayerLive,
  CliConfig.layer({ showBuiltIns: false })
);
