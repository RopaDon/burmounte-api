import { inject, injectable } from "inversify";
import { NewsArticle } from "../../../../core/types";
import { prisma } from "../../../../core/services/prisma-client";
import { HttpStatusCodes } from "../../../../core/http/status-codes";
import ServiceHubException from "../../../../core/exceptions/service-hub-exception";
import { PayoutCurrency } from "@prisma/client";

@injectable()
export default class CurrencyUseCases {
  constructor() {}

  public async getCurrencies(): Promise<{ markets: { value: string; displayName: string }[]; payoutCurrencies: Record<string, PayoutCurrency[]> }> {
    try {
      const currencies = await prisma.payoutCurrency.findMany();

      // Create a separate "markets" array with specific values and display names
      const markets = [
        { value: "Forex", displayName: "Flat" },
        { value: "Cryptocurrency", displayName: "Crypto" },
      ];

      // Group currencies by market
      const payoutCurrencies: Record<string, PayoutCurrency[]> = {};

      currencies.forEach((currency) => {
        const { market } = currency;
        if (!payoutCurrencies[market]) {
          payoutCurrencies[market] = [];
        }
        payoutCurrencies[market].push(currency);
      });

      return { markets, payoutCurrencies };
    } catch (e) {
      throw new ServiceHubException(HttpStatusCodes.BAD_REQUEST, "An error occurred fetching payout currencies");
    }
  }
}
