export default class Routes {
  static ActiveSymbols = {
    Search: "/search",
    GetActiveSymbols: "",
    GetActiveSymbol: "/:symbol",
    GetReadableNames: "/get-readable-names",
    GetTrendingSymbols: "/trending",
    GetActiveSymbolsForWebLanding: "/landing/web",
    GetActiveSymbolsForMobileLanding: "/landing/mobile",
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

  static User = {
    UpdateProfilePhoto: "/update-photo/:userId",
  };
}
