export default class Routes {
  static ActiveSymbols = {
    Search: "/search",
    GetActiveSymbols: "",
    GetActiveSymbol: "/:symbol",
    GetTrendingSymbols: "/trending",
    GetActiveSymbolsForLanding: "/landing",
  };
  static Currencies = {
    Get: "",
  };
  static TransactionMethod = {
    Get: "",
  };
  static Auth = {
    Authorize: "/authorize",
    AuthenticateAdmin: "/admin",
  };
  static News = {
    GetArticles: "/articles",
  };

  static Notifications = {
    GetUserNotifications: "/:id",
  };

  static Subscriptions = {
    GetUserSubscriptions: "/:id",
  };

  static Watchlist = {
    CreateUserWatchlist: "",
    AddItemToWatchList: "/add",
    GetUserWatchlist: "/:userId",
    DeleteUserWatchlist: "/:watchlistId",
    GetUserWatchlistSymbols: "/symbols/:watchlistId",
    RemoveItemFromWatchList: "/:watchlistId/remove/:symbol",
  };
}
