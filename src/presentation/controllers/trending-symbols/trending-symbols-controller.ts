import "reflect-metadata";
import { Controllers } from "..";
import Routes from "../../routes/routes";
import { inject, injectable } from "inversify";
import { PaginateOptions } from "../../../core/services/pagination";
import { Get, JsonController, Param, QueryParams } from "routing-controllers";
import NotificationUseCases from "../../../infastructure/domain/usecases/notification/notification-usecases";

@injectable()
@JsonController(Controllers.Notifications)
export class NotificationController {
  constructor(@inject(NotificationUseCases) private notificationCases: NotificationUseCases) {}

  @Get(Routes.Notifications.GetUserNotifications)
  async getUserNotifications(@Param("id") userId: number, @QueryParams() paginate: PaginateOptions) {
    return await this.notificationCases.getUserNotifications(userId, paginate);
  }
}
