import "reflect-metadata";
import { Controllers } from "..";
import Routes from "../../routes/routes";
import { inject, injectable } from "inversify";
import { Body, Delete, Get, JsonController, Param, Params, Post } from "routing-controllers";
import WatchListUseCases from "../../../infastructure/domain/usecases/watchlist/watchlist-usecases";
import { CreateWatchListDTO } from "../../../infastructure/domain/dtos/request/watchlist/create-watchlist.dto";
import { AddWatchlistSymbolDTO } from "../../../infastructure/domain/dtos/request/watchlist/add-watchlist-symbol.dto";
import { RemoveWatchlistSymbolDTO } from "../../../infastructure/domain/dtos/request/watchlist/remove-symbol-watchlist.dto";

@injectable()
@JsonController(Controllers.WatchList)
export class WatchListController {
  constructor(@inject(WatchListUseCases) private watchListUseCases: WatchListUseCases) {}
  @Get(Routes.Watchlist.GetUserWatchlist)
  async getUserWatchlist(@Param("userId") userId: number) {
    return await this.watchListUseCases.getUserWatchlist(userId);
  }
  @Get(Routes.Watchlist.GetUserWatchlistSymbols)
  async getUserWatchlistSymbols(@Param("watchlistId") watchlistId: number) {
    return await this.watchListUseCases.getUserWatchlistSymbols(watchlistId);
  }
  @Post(Routes.Watchlist.CreateUserWatchlist)
  async createWatchlist(@Body() createWatchListDTO: CreateWatchListDTO) {
    return await this.watchListUseCases.createWatchList(createWatchListDTO);
  }

  @Delete(Routes.Watchlist.DeleteUserWatchlist)
  async deleteWatchList(@Param("watchlistId") watchlistId: number) {
    return await this.watchListUseCases.deleteWatchList(watchlistId);
  }
  @Post(Routes.Watchlist.AddItemToWatchList)
  async addSymbolToWatchlist(@Body() addWatchlistSymbolDTO: AddWatchlistSymbolDTO) {
    return await this.watchListUseCases.addSymbolToWatchlist(addWatchlistSymbolDTO);
  }
  @Delete(Routes.Watchlist.RemoveItemFromWatchList)
  async deleteSymbolFromWatchList(@Params() removeWatchlistSymbolDTO: RemoveWatchlistSymbolDTO) {
    return await this.watchListUseCases.deleteSymbolFromWatchList(removeWatchlistSymbolDTO);
  }
}
