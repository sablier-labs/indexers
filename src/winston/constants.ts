import * as path from "node:path";

export const REPO_ROOT = path.resolve(__dirname, "..", "..");
export const LOG_LEVEL: string = process.env.LOG_LEVEL || "info";
export const LOG_FILE_PATH: string = process.env.LOG_FILE_PATH || path.join(REPO_ROOT, `.logs/${LOG_LEVEL}.log`);
