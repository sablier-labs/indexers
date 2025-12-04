import { NodeCommandExecutor } from "@effect/platform-node";

/**
 * CommandExecutor layer from @effect/platform-node
 *
 * Provides command execution capabilities for running shell commands.
 */
export const CommandExecutorLive = NodeCommandExecutor.layer;
