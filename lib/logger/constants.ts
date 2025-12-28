import * as path from "node:path";
import { ROOT_DIR } from "../paths";

export const LOG_LEVEL: string = process.env.LOG_LEVEL || "info";
export const LOG_FILE_PATH: string =
  process.env.LOG_FILE_PATH || path.join(ROOT_DIR, `.logs/${LOG_LEVEL}.log`);
