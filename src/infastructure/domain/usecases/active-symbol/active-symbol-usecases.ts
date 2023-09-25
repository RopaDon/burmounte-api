import fs from "fs";
import { inject, injectable } from "inversify";
import { snakeToCamel, snakeToCamelCase } from "../../../../core/utils";
import { ActiveSymbols, PrismaClient, TrendingSymbol } from "@prisma/client";
import { DerivAPI } from "../../../../core/services/deriv-api";
import { NewsApi } from "../../../../core/services/news-service";
import { prisma } from "../../../../core/services/prisma-client";
import { HttpStatusCodes } from "../../../../core/http/status-codes";
import { LoggerService } from "../../../../core/services/logger-service";
import { derivAPI } from "../../../../core/services/deriv-api-connection";
import ServiceHubException from "../../../../core/exceptions/service-hub-exception";
import { GetActiveSymbolsDTO } from "../../../../core/http/request/active-symbol/get-active-symbols";
import { GetActiveSymbolMetadataDTO } from "../../../../core/http/request/active-symbol/get-active-symbol-metadata";
import TrendingSymbolsUseCases from "../trending-symbols/trending-symbols-usecases";
import ServiceHubExceptionDelegate from "../../../../core/exceptions/handler";

@injectable()
export default class ActiveSymbolUseCases {
  private logger: LoggerService;
  constructor(
    @inject(NewsApi) private newsApi: NewsApi,
    @inject(DerivAPI) private derivAPI: DerivAPI,
    @inject(TrendingSymbolsUseCases) private trendingSymbolsUseCases: TrendingSymbolsUseCases
  ) {
    this.logger = new LoggerService(this.constructor.name);
  }

  public async getActiveSymbols(getActiveSymbolsDTO: GetActiveSymbolsDTO) {
    const { type } = getActiveSymbolsDTO;

    try {
      //populateSymbols();
      const result = await derivAPI.activeSymbols(type);

      const symbolsByMarket: Record<string, any[]> = {};

      result.active_symbols.forEach((item: any) => {
        const camelCaseItem: any = {};
        for (const key in item) {
          if (Object.hasOwnProperty.call(item, key)) {
            camelCaseItem[snakeToCamelCase(key)] = item[key];
          }
        }

        const { market } = camelCaseItem;

        if (!symbolsByMarket[market]) {
          symbolsByMarket[market] = [];
        }

        symbolsByMarket[market].push(camelCaseItem);
      });

      // Now, for each group of symbols in the same market, call getActiveSymbolMetadata to get the readableName.
      const symbolsWithReadableNames = await Promise.all(
        Object.entries(symbolsByMarket).map(async ([market, symbols]) => {
          // Extract symbols in the current market.
          const symbolNames = symbols.map((symbol) => symbol.symbol).join(",");

          // Call getActiveSymbolMetadata to get the readableNames for symbols in the current market.
          const metadata = (await this.getActiveSymbolMetadata({ market, symbol: symbolNames })) as ActiveSymbols[];

          // Create a dictionary of readableNames for faster lookup.
          const readableNameDictionary: Record<string, string> = {};
          metadata.forEach((item) => {
            readableNameDictionary[item.symbol] = item?.readableName ?? "";
          });

          // Add the readableName to each symbol based on the dictionary.
          symbols.forEach((symbol) => {
            symbol.readableName = readableNameDictionary[symbol.symbol];
          });

          return symbols;
        })
      );

      // Flatten the array of symbols by market.
      const flattenedSymbols = symbolsWithReadableNames.flat();

      return flattenedSymbols;
    } catch (error) {
      throw ServiceHubExceptionDelegate(error, this.logger);
    }
  }

  public async getActiveSymbolMetadata(
    getActiveSymbolMetadataDTO: GetActiveSymbolMetadataDTO
  ): Promise<(ActiveSymbols & { news?: any[] }) | ActiveSymbols[] | null | undefined> {
    const { market, symbol } = getActiveSymbolMetadataDTO;

    try {
      let queryOptions: any = {
        where: {
          market,
        },
      };

      if (symbol.includes(",")) {
        const symbols = symbol.split(",");
        queryOptions.where.symbol = { in: symbols };
        let result = await prisma.activeSymbols.findMany(queryOptions);

        result = result.map((symbol: any) => {
          symbol.news = [];

          return symbol;
        });

        return result;
      } else {
        queryOptions.where.symbol = symbol;
        let result = (await prisma.activeSymbols.findFirst(queryOptions)) as any;

        if (!result?.readableName) {
          result!.news = [];
          return result;
        }

        result!.news = await this.newsApi.searchNews(result?.readableName);

        return result;
      }
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

  public async search(searchTerm: string): Promise<ActiveSymbols[]> {
    try {
      const allSymbols = await derivAPI.activeSymbols("full");

      let activeSymbols = allSymbols.active_symbols.map((item: any) => snakeToCamel(item));

      const symbols = activeSymbols.map((x: any) => x.symbol);

      let results = await prisma.activeSymbols.findMany({
        where: {
          OR: [
            {
              symbol: {
                in: symbols,
                contains: searchTerm, // Search for 'searchTerm' in 'symbol'
              },
            },
            {
              readableName: {
                contains: searchTerm, // Search for 'searchTerm' in 'readableName'
              },
            },
          ],
        },
      });

      // Merge data from activeSymbols with the results, giving precedence to activeSymbols data
      const mergedResults = results.map((result) => {
        // Find the corresponding symbol data in activeSymbols
        const symbolData = activeSymbols.find((item: any) => item.symbol === result.symbol);

        // Merge the data, giving precedence to symbolData
        const mergedData = {
          ...symbolData,
          ...result,
        };

        // Ensure that symbol and readableName remain searchable
        mergedData.symbol = result.symbol;
        mergedData.readableName = result.readableName;

        return mergedData;
      });

      return mergedResults;
    } catch (error) {
      throw ServiceHubExceptionDelegate(error, this.logger);
    }
  }
}
