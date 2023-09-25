import "reflect-metadata";
import { Controllers } from "..";
import Routes from "../../routes/routes";
import { inject, injectable } from "inversify";
import { Get, JsonController, Param, QueryParam, QueryParams } from "routing-controllers";
import ActiveSymbolUseCases from "../../../infastructure/domain/usecases/active-symbol/active-symbol-usecases";
import { GetActiveSymbolMetadataDTO } from "../../../core/http/request/active-symbol/get-active-symbol-metadata";
import { GetActiveSymbolsDTO } from "../../../core/http/request/active-symbol/get-active-symbols";

@injectable()
@JsonController(Controllers.ActiveSymbols)
export class ActiveSymbolController {
  constructor(@inject(ActiveSymbolUseCases) private activeSymbolUseCases: ActiveSymbolUseCases) {}

  @Get(Routes.ActiveSymbols.GetSymbols)
  async getActiveSymbols(@QueryParams() getActiveSymbolsDTO: GetActiveSymbolsDTO) {
    return await this.activeSymbolUseCases.getActiveSymbols(getActiveSymbolsDTO);
  }

  @Get(Routes.ActiveSymbols.GetSymbolMetadata)
  async getActiveSymbolMetadata(@QueryParams() getActiveSymbolMetadataDTO: GetActiveSymbolMetadataDTO) {
    return await this.activeSymbolUseCases.getActiveSymbolMetadata(getActiveSymbolMetadataDTO);
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
