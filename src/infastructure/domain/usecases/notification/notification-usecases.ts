import { inject, injectable } from "inversify";
import { Notifications, Prisma } from "@prisma/client";
import { prisma } from "../../../../core/services/prisma-client";
import { HttpStatusCodes } from "../../../../core/http/status-codes";
import { LoggerService } from "../../../../core/services/logger-service";
import ServiceHubException from "../../../../core/exceptions/service-hub-exception";
import { PaginateFunction, PaginateOptions, PaginatedResult, paginator } from "../../../../core/services/pagination";
import ServiceHubExceptionDelegate from "../../../../core/exceptions/handler";

@injectable()
export default class NotificationUseCases {
  private logger: LoggerService;
  constructor() {
    this.logger = new LoggerService(this.constructor.name);
  }
  public async getUserNotifications(userId: number, options: PaginateOptions): Promise<PaginatedResult<Notifications>> {
    try {
      const paginate: PaginateFunction<Notifications, Prisma.NotificationsFindManyArgs> = paginator(options);

      let result = await paginate(
        prisma.notifications,
        {
          where: { userId },
        },
        options
      );

      return result;
    } catch (error) {
      throw ServiceHubExceptionDelegate(error, this.logger);
    }
  }
}
