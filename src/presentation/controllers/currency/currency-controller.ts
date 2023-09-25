import "reflect-metadata";
import { Controllers } from "..";
import Routes from "../../routes/routes";
import { inject, injectable } from "inversify";
import { Get, JsonController, QueryParams } from "routing-controllers";
import CurrencyUseCases from "../../../infastructure/domain/usecases/currency/curreny-usecases";

@injectable()
@JsonController(Controllers.Currencies)
export class CurrencyController {
  constructor(@inject(CurrencyUseCases) private currencyUseCases: CurrencyUseCases) {}

  @Get(Routes.Currencies.Get)
  async getCurrencies() {
    return await this.currencyUseCases.getCurrencies();
  }
}
