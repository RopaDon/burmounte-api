import { injectable } from "inversify";
import { TrendingSymbol } from "@prisma/client";
import { prisma } from "../../../../core/services/prisma-client";
import { LoggerService } from "../../../../core/services/logger-service";
import ServiceHubExceptionDelegate from "../../../../core/exceptions/handler";

@injectable()
export default class TrendingSymbolsUseCases {
  private logger: LoggerService;
  constructor() {
    this.logger = new LoggerService(this.constructor.name);
  }

  public async getTrendingSymbols(): Promise<TrendingSymbol[]> {
    // Count the occurrence of each symbol in the database
    const symbolCounts = await prisma.trendingSymbol.groupBy({
      by: ["symbol"],
      _count: {
        symbol: true,
        _all: true,
      },
    });

    // Sort the symbols by their occurrence in descending order
    const sortedSymbols = symbolCounts.sort((a, b) => b._count.symbol - a._count.symbol);

    // Extract the top 10 symbols
    const top10Symbols = sortedSymbols.slice(0, 10);

    // Retrieve the full records for the top 10 symbols
    const trendingSymbols = await prisma.trendingSymbol.findMany({
      where: {
        symbol: {
          in: top10Symbols.map((symbolCount) => symbolCount.symbol),
        },
      },
    });

    // Add a 'popularity' field to each item based on their occurrence count
    const trendingSymbolsWithPopularity = trendingSymbols.map((symbol) => {
      const symbolCount = symbolCounts.find((count) => count.symbol === symbol.symbol);
      const popularity = symbolCount ? symbolCount._count.symbol : 0;
      return { ...symbol, popularity };
    });

    return trendingSymbolsWithPopularity;
  }
}
