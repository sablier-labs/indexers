import { FileSystem } from "@effect/platform";
import { NodeFileSystem } from "@effect/platform-node";

/**
 * FileSystem layer - re-export from platform-node
 *
 * Provides file system operations for reading, writing, and manipulating files.
 */
export const FileSystemLive = NodeFileSystem.layer;

/**
 * Tagged FileSystem service for dependency injection
 */
export const FileSystemService = FileSystem.FileSystem;
