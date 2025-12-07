import * as fs from "node:fs";
import * as path from "node:path";
import winston, { format } from "winston";
import { LOG_FILE_PATH } from "./constants";

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: format.combine(
      format.colorize(),
      format.printf(({ level, message }) => {
        if (!message) {
          return "";
        }
        return `${level}: ${message}`;
      }),
    ),
  }),
];

if (LOG_FILE_PATH) {
  const logDir = path.dirname(LOG_FILE_PATH);
  fs.mkdirSync(logDir, { recursive: true });

  const fileTransport = new winston.transports.File({
    filename: LOG_FILE_PATH,
    format: format.combine(
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
      }),
    ),
  });
  transports.push(fileTransport);
}

export default transports;
