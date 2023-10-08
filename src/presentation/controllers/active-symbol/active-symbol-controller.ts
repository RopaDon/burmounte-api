import "reflect-metadata";
import { Controllers } from "..";
import Routes from "../../routes/routes";
import { inject, injectable } from "inversify";
import { Get, JsonController, Param, QueryParam, QueryParams } from "routing-controllers";
import { GetActiveSymbolsDTO } from "../../../core/http/request/active-symbol/get-active-symbols";
import ActiveSymbolUseCases from "../../../infastructure/domain/usecases/active-symbol/active-symbol-usecases";

@injectable()
@JsonController(Controllers.ActiveSymbols)
export class ActiveSymbolController {
  constructor(@inject(ActiveSymbolUseCases) private activeSymbolUseCases: ActiveSymbolUseCases) {}

  @Get(Routes.ActiveSymbols.GetActiveSymbols)
  async getActiveSymbols(@QueryParams() getActiveSymbolsDTO: GetActiveSymbolsDTO) {
    return await this.activeSymbolUseCases.getActiveSymbols(getActiveSymbolsDTO);
  }

  @Get(Routes.ActiveSymbols.GetActiveSymbolsForLanding)
  async getActiveSymbolsForLanding() {
    return await this.activeSymbolUseCases.getActiveSymbolsForLanding();
  }

  @Get(Routes.ActiveSymbols.GetActiveSymbol)
  async getActiveSymbolMetadata(@Param("symbol") symbol: string) {
    return await this.activeSymbolUseCases.getActiveSymbolBySymbol(symbol);
  }

  @Get(Routes.ActiveSymbols.Search)
  async search(@QueryParam("term") term: string) {
    return await this.activeSymbolUseCases.search(term);
  }

  @Get(Routes.ActiveSymbols.GetTrendingSymbols)
  async getTrendingSymbols() {
    return await this.activeSymbolUseCases.getTrendingSymbols();
  }
}
