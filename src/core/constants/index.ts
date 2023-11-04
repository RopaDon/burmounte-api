import { HttpStatusCodes } from "../http/status-codes";

const successStatusCodes = [HttpStatusCodes.CREATED];

export const action = "ACTION_COMPLETED";

export const activeSymbolMarketDescriptions = [
  {
    name: "Forex",
    description: "Benefit from round-the-clock trading hours (Monday to Friday).",
  },
  {
    name: "Derived",
    description: "Trade on asset prices derived from real-world or simulated markets.",
  },
  {
    name: "Stock Indices",
    description: "Trade global stocks of your favourite household brands and international stock market indices.",
  },
  {
    name: "Cryptocurrencies",
    description: "Take advantage of a highly liquid market with round-the-clock trading.",
  },
  {
    name: "Commodities",
    description: "Speculate on the price movements of silver, gold, oil and more. ",
  },
];
