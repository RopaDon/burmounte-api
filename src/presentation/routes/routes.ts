export default class Routes {
  static ActiveSymbols = {
    GetSymbols: "",
    Search: "/search",
    GetTrendingSymbols: "/trending",
    GetSymbolMetadata: "/metadata",
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
    RemoveItemFromWatchList: "/:watchlistId/remove/:symbol",
  };
}
