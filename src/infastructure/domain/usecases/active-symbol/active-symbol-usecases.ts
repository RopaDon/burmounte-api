import fs from "fs";
import { inject, injectable } from "inversify";
import DerivService from "../../../../core/services/deriv-api";
import { NewsApi } from "../../../../core/services/news-service";
import { prisma } from "../../../../core/services/prisma-client";
import { HttpStatusCodes } from "../../../../core/http/status-codes";
import { populateSymbols, snakeToCamel, snakeToCamelCase, updateJSONWithActiveSymbols } from "../../../../core/utils";
import { LoggerService } from "../../../../core/services/logger-service";
import { derivAPI } from "../../../../core/services/deriv-api-connection";
import { ActiveSymbol, PrismaClient, TrendingSymbol } from "@prisma/client";
import ServiceHubExceptionDelegate from "../../../../core/exceptions/handler";
import ServiceHubException from "../../../../core/exceptions/service-hub-exception";
import TrendingSymbolsUseCases from "../trending-symbols/trending-symbols-usecases";
import { GetActiveSymbolsDTO } from "../../../../core/http/request/active-symbol/get-active-symbols";
import { GetActiveSymbolMetadataDTO } from "../../../../core/http/request/active-symbol/get-active-symbol-metadata";
import { ActiveSymbolsQuery } from "../../../../core/enums";
import { activeSymbolMarketDescriptions } from "../../../../core/constants";

@injectable()
export default class ActiveSymbolUseCases {
  private logger: LoggerService;
  constructor(
    @inject(NewsApi) private newsApi: NewsApi,
    @inject(DerivService) private derivService: DerivService,
    @inject(TrendingSymbolsUseCases) private trendingSymbolsUseCases: TrendingSymbolsUseCases
  ) {
    this.logger = new LoggerService(this.constructor.name);
  }

  public async getReadableNameByDisplayNames(displayNames: string[]) {
    try {
      const activeSymbols = await prisma.activeSymbol.findMany({
        where: {
          displayName: {
            in: displayNames,
          },
        },
        select: {
          symbol: true,
          displayPhoto: true,
          readableName: true,
        },
      });

      // Return the readable names from the result.
      return activeSymbols;
    } catch (error) {
      throw ServiceHubExceptionDelegate(error, this.logger);
    }
  }

  public async getActiveSymbols(getActiveSymbolsDTO: GetActiveSymbolsDTO) {
    const { type } = getActiveSymbolsDTO;

    try {
      let take;

      if (type === ActiveSymbolsQuery.Brief) {
        take = Math.ceil((await prisma.activeSymbol.count()) / 2);
      } else {
        take = Math.ceil(await prisma.activeSymbol.count());
      }

      const activeSymbols = await prisma.activeSymbol.findMany({
        take,
      });

      return activeSymbols;
    } catch (error) {
      throw ServiceHubExceptionDelegate(error, this.logger);
    }
  }

  public async getActiveSymbolsForWebLanding() {
    try {
      const activeSymbols = await prisma.activeSymbol.findMany();

      // Create an object to store the grouped symbols
      const groupedSymbols: any = {};

      // Loop through the activeSymbols and group them by marketDisplayName
      activeSymbols.forEach((symbol) => {
        const marketDisplayName: any = symbol.marketDisplayName!;
        if (!groupedSymbols[marketDisplayName]) {
          groupedSymbols[marketDisplayName] = [];
        }
        if (groupedSymbols[marketDisplayName].length < 6) {
          groupedSymbols[marketDisplayName].push(symbol);
        }
      });

      // Convert the groupedSymbols object into an array of objects
      const result = Object.entries(groupedSymbols).map(([displayName, symbols]) => ({
        ...{ displayName, description: activeSymbolMarketDescriptions.find((d) => d.name == displayName)?.description },
        symbols,
      }));

      return result;
    } catch (error) {
      throw ServiceHubExceptionDelegate(error, this.logger);
    }
  }

  public async getActiveSymbolsForLanding() {
    try {
      // Fetch all active symbols from the database
      const activeSymbols = await prisma.activeSymbol.findMany();

      const symbolsByMarket: { [key: number]: ActiveSymbol[] } = {};
      const marketOrder: { [key: string]: number } = {
        Derived: 0,
        Forex: 1,
        Cryptocurrencies: 2,
      };

      // Filter symbols to include only the desired markets
      const filteredSymbols = activeSymbols.filter((activeSymbol) => marketOrder.hasOwnProperty(activeSymbol.marketDisplayName ?? ""));

      // Initialize symbolsByMarket with an empty list for each market
      for (const marketName of Object.values(marketOrder)) {
        symbolsByMarket[marketName] = [];
      }

      // Iterate through the filtered symbols and add them to the appropriate market
      for (const activeSymbol of filteredSymbols) {
        const marketName = activeSymbol.marketDisplayName ?? "";
        const marketIndex = marketOrder[marketName];

        // Limit each group of symbols by market to a maximum of 6
        if (marketIndex !== undefined && symbolsByMarket[marketIndex].length < 6) {
          symbolsByMarket[marketIndex].push(activeSymbol);
        }
      }

      // Create the options map with sorted market names
      const options: { [key: number]: string } = {};
      Object.keys(marketOrder).forEach((key) => {
        options[marketOrder[key]] = key;
      });

      return {
        activeSymbols: symbolsByMarket,
        options: options,
      };
    } catch (error) {
      throw ServiceHubExceptionDelegate(error, this.logger);
    }
  }

  public async getActiveSymbolBySymbol(symbol: string): Promise<ActiveSymbol | null> {
    try {
      let result = await prisma.activeSymbol.findFirst({
        where: {
          symbol,
        },
      });

      return result;
    } catch (error) {
      throw ServiceHubExceptionDelegate(error, this.logger);
    }
  }

  public async getTrendingSymbols(): Promise<TrendingSymbol[]> {
    try {
      const trending = this.trendingSymbolsUseCases.getTrendingSymbols();

      return trending;
    } catch (error) {
      throw ServiceHubExceptionDelegate(error, this.logger);
    }
  }

  public async getMobileTradedableMarkets(): Promise<ActiveSymbol[]> {
    try {
      let results = await prisma.activeSymbol.findMany({
        where: {
          market: {
            in: ["cryptocurrency", "forex", "synthetic_index"],
          },
        },
      });

      return results;
    } catch (error) {
      throw ServiceHubExceptionDelegate(error, this.logger);
    }
  }
  public async search(searchTerm: string): Promise<ActiveSymbol[]> {
    try {
      let results = await prisma.activeSymbol.findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  symbol: {
                    contains: searchTerm,
                  },
                },
                {
                  readableName: {
                    contains: searchTerm,
                  },
                },
              ],
            },
            {
              market: {
                in: ["cryptocurrency", "forex", "synthetic_index"],
              },
            },
          ],
        },
      });

      return results;
    } catch (error) {
      throw ServiceHubExceptionDelegate(error, this.logger);
    }
  }
}
