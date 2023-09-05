import "reflect-metadata";
import { Controllers } from "..";
import { injectable } from "inversify";
import { Get, JsonController } from "routing-controllers";
import moment from "moment-timezone";

@injectable()
@JsonController()
export class AppController {
  constructor() {}

  @Get()
  async getHeartbeat() {
    return `API Status: Running - Last Checked: ${moment(new Date()).format("LL - LT")}`;
  }
}
