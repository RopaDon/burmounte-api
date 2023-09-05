// LoggerService.ts
import winston from "winston";
import { injectable } from "inversify";
import * as moment from "moment-timezone";

import "reflect-metadata";

@injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
        new winston.transports.File({
          level: "silly",
          filename: "logs/app-logger.log",
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({
              format: () => moment.tz("America/Jamaica").format("YYYY-MM-DD hh:mm:ss.SSS A"),
            }),
            winston.format.printf(({ level, message, timestamp, stack }) => {
              if (level === "error") {
                return `${timestamp} [${level}]: ${stack || message}`;
              }
              return `${timestamp} [${level}]: ${message}`;
            })
          ),
        }),
      ],
    });
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public error(message: string, error: any = {}): void {
    this.logger.error(message, error);
  }
}
