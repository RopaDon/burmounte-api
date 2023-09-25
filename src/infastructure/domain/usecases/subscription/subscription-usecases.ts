import { injectable } from "inversify";
import { Subscriptions } from "@prisma/client";
import { prisma } from "../../../../core/services/prisma-client";
import { LoggerService } from "../../../../core/services/logger-service";
import ServiceHubExceptionDelegate from "../../../../core/exceptions/handler";

@injectable()
export default class SubscriptionUseCases {
  private logger: LoggerService;
  constructor() {
    this.logger = new LoggerService(this.constructor.name);
  }

  public async getUserSubscriptions(userId: number): Promise<Subscriptions[]> {
    try {
      const subscriptions = prisma.subscriptions.findMany({ where: { userId } });
      return subscriptions;
    } catch (error) {
      throw ServiceHubExceptionDelegate(error, this.logger);
    }
  }
}
