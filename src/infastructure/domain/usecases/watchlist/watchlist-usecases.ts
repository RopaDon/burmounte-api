import { inject, injectable } from "inversify";
import { Watchlist, WatchlistSymbol } from "@prisma/client";
import Actions from "../../../../core/http/actions";
import { ActionResult } from "../../../../core/types";
import { prisma } from "../../../../core/services/prisma-client";
import { HttpStatusCodes } from "../../../../core/http/status-codes";
import { LoggerService } from "../../../../core/services/logger-service";
import ServiceHubExceptionDelegate from "../../../../core/exceptions/handler";
import ServiceHubException from "../../../../core/exceptions/service-hub-exception";
import { CreateWatchListDTO } from "../../dtos/request/watchlist/create-watchlist.dto";
import { AddWatchlistSymbolDTO } from "../../dtos/request/watchlist/add-watchlist-symbol.dto";
import { RemoveWatchlistSymbolDTO } from "../../dtos/request/watchlist/remove-symbol-watchlist.dto";
import ActiveSymbolUseCases from "../active-symbol/active-symbol-usecases";

@injectable()
export default class WatchListUseCases {
  private logger: LoggerService;
  constructor(@inject(ActiveSymbolUseCases) private activeSymbolUseCases: ActiveSymbolUseCases) {
    this.logger = new LoggerService(this.constructor.name);
  }

  public async getUserWatchlist(userId: number): Promise<Watchlist[]> {
    try {
      const watchlists = await prisma.watchlist.findMany({
        where: { userId },
        include: {
          symbols: {
            include: {
              associatedSymbolData: true,
            },
          },
        },
      });

      // Process the watchlists to add the symbol names and count
      const processedWatchlists = watchlists.map((watchlist) => {
        // Extract symbol names and join them with commas if needed
        const symbolNames = watchlist.symbols.map((symbol) => symbol.associatedSymbolData.readableName).join(", ");

        // Count the number of symbols
        const symbolCount = watchlist.symbols.length;

        // Create a new object with the additional properties
        return {
          ...watchlist,
          symbolNames,
          symbolCount,
          symbols: undefined,
        };
      });

      return processedWatchlists;
    } catch (exception) {
      throw ServiceHubExceptionDelegate(exception, this.logger);
    }
  }

  public async getUserWatchlistSymbols(watchlistId: number): Promise<any> {
    try {
      const watchlist = await prisma.watchlist.findUnique({
        where: { id: watchlistId },
        include: {
          symbols: {
            include: {
              associatedSymbolData: true,
            },
          },
        },
      });

      const symbolNames = watchlist?.symbols.map((symbol) => symbol.name).join(", ") ?? "";

      // Count the number of symbols
      const symbolCount = watchlist?.symbols.length ?? 0;

      const symbols = watchlist?.symbols.map((symbol) => symbol.symbol);

      const fetchedSymbols = await this.activeSymbolUseCases.getActiveSymbols({
        type: "brief",
        symbols,
      });

      // Assign fetchedSymbols to associatedSymbolData based on symbol matching
      if (watchlist) {
        watchlist.symbols.forEach((watchlistSymbol) => {
          const matchingSymbol = fetchedSymbols.find((fetchedSymbol) => fetchedSymbol.symbol === watchlistSymbol.symbol);
          if (matchingSymbol) {
            watchlistSymbol.associatedSymbolData = matchingSymbol;
          }
        });
      }

      return { ...watchlist, symbolNames, symbolCount };
    } catch (exception) {
      throw ServiceHubExceptionDelegate(exception, this.logger);
    }
  }

  public async createWatchList(createWatchListDTO: CreateWatchListDTO): Promise<number | ServiceHubException> {
    try {
      const watchlist = await prisma.watchlist.findMany({ where: { title: createWatchListDTO.title } });

      if (watchlist.length > 0) {
        throw new ServiceHubException(HttpStatusCodes.BAD_REQUEST, `You already have a watchlist with the name ${createWatchListDTO.title}`);
      }

      const createdWatchList = await prisma.watchlist.create({ data: createWatchListDTO });

      if (!createdWatchList) {
        throw new ServiceHubException(HttpStatusCodes.BAD_REQUEST, "Unable to create watchlist.");
      }
      return createdWatchList.id;
    } catch (exception) {
      throw ServiceHubExceptionDelegate(exception, this.logger);
    }
  }

  public async deleteWatchList(id: number): Promise<ActionResult> {
    try {
      const watchlist = await prisma.watchlist.delete({ where: { id } });

      if (!watchlist) {
        throw new ServiceHubException(HttpStatusCodes.BAD_REQUEST, `Unable to delete watchlist`);
      }

      return { action: Actions.WatchList.DELETED };
    } catch (exception) {
      throw ServiceHubExceptionDelegate(exception, this.logger);
    }
  }

  public async addSymbolToWatchlist(addWatchlistSymbolDTO: AddWatchlistSymbolDTO): Promise<ActionResult> {
    try {
      const symbol = await prisma.watchlistSymbol.findFirst({ where: { symbol: addWatchlistSymbolDTO.symbol } });

      if (symbol) {
        throw new ServiceHubException(HttpStatusCodes.BAD_REQUEST, `This asset has already been added to your watchlist`);
      }

      const createdWatchlistSymbol = await prisma.watchlistSymbol.create({ data: addWatchlistSymbolDTO });

      if (!createdWatchlistSymbol) {
        throw new ServiceHubException(HttpStatusCodes.BAD_REQUEST, "Unable to add asset to your watchlist");
      }
      return { action: Actions.WatchList.SYMBOL_ADDED };
    } catch (exception) {
      throw ServiceHubExceptionDelegate(exception, this.logger);
    }
  }

  public async deleteSymbolFromWatchList(removeWatchlistSymbolDTO: RemoveWatchlistSymbolDTO): Promise<ActionResult> {
    const { watchlistId, symbol } = removeWatchlistSymbolDTO;

    try {
      const watchlist = await prisma.watchlistSymbol.findFirst({ where: { watchlistId, symbol } });

      const deletedRecord = await prisma.watchlistSymbol.delete({ where: { id: watchlist!.id } });

      if (!deletedRecord) {
        throw new ServiceHubException(HttpStatusCodes.BAD_REQUEST, `Unable to delete asset from watchlist`);
      }

      return { action: Actions.WatchList.DELETED };
    } catch (exception) {
      throw ServiceHubExceptionDelegate(exception, this.logger);
    }
  }
}
