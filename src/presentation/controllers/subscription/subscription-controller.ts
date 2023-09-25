import "reflect-metadata";
import { Controllers } from "..";
import Routes from "../../routes/routes";
import { inject, injectable } from "inversify";
import { Get, JsonController, Param, QueryParams } from "routing-controllers";
import SubscriptionUseCases from "../../../infastructure/domain/usecases/subscription/subscription-usecases";

@injectable()
@JsonController(Controllers.Subscription)
export class SusbcriptionController {
  constructor(@inject(SubscriptionUseCases) private subscriptionUseCases: SubscriptionUseCases) {}

  @Get(Routes.Subscriptions.GetUserSubscriptions)
  async getUserNotifications(@Param("id") userId: number) {
    return await this.subscriptionUseCases.getUserSubscriptions(userId);
  }
}
