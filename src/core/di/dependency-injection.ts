// inversify.config.ts
import { Container } from "inversify";
import { DerivAPI } from "../services/deriv-api";
import { NewsApi } from "../services/news-service";
import { EmailService } from "../services/email-service";
import { LoggerService } from "../services/logger-service";
import { ConfigService } from "../services/config-service";
import AuthUseCases from "../../infastructure/domain/usecases/auth/auth-usecases";
import NewsUseCases from "../../infastructure/domain/usecases/news/news-usecases";
import { NewsController } from "../../presentation/controllers/news/news-controller";
import { AuthController } from "../../presentation/controllers/auth/auth-controller";
import StripeUseCases from "../../infastructure/domain/usecases/stripe/stripe-usecases";
import CurrencyUseCases from "../../infastructure/domain/usecases/currency/curreny-usecases";
import { CurrencyController } from "../../presentation/controllers/currency/currency-controller";
import NotificationUseCases from "../../infastructure/domain/usecases/notification/notification-usecases";
import ActiveSymbolUseCases from "../../infastructure/domain/usecases/active-symbol/active-symbol-usecases";
import { ActiveSymbolController } from "../../presentation/controllers/active-symbol/active-symbol-controller";
import { NotificationController } from "../../presentation/controllers/notifications/notifications-controller";
import TransactionMethodsUseCases from "../../infastructure/domain/usecases/transaction-method/transaction-method-usecases";
import { TransactionMethodsController } from "../../presentation/controllers/transaction-methods/transaction-method-controller";
import WatchListUseCases from "../../infastructure/domain/usecases/watchlist/watchlist-usecases";
import { WatchListController } from "../../presentation/controllers/watchlist/watchlist-controller";
import SubscriptionUseCases from "../../infastructure/domain/usecases/subscription/subscription-usecases";
import { SusbcriptionController } from "../../presentation/controllers/subscription/subscription-controller";
import TrendingSymbolsUseCases from "../../infastructure/domain/usecases/trending-symbols/trending-symbols-usecases";

const container = new Container();

container.bind<NewsApi>(NewsApi).toSelf();

container.bind<EmailService>(EmailService).toSelf();

container.bind<AuthUseCases>(AuthUseCases).toSelf();
container.bind<AuthController>(AuthController).toSelf();

container.bind<NewsUseCases>(NewsUseCases).toSelf();
container.bind<NewsController>(NewsController).toSelf();

container.bind<StripeUseCases>(StripeUseCases).toSelf();

container.bind<DerivAPI>(DerivAPI).toSelf().inSingletonScope();

container.bind<CurrencyUseCases>(CurrencyUseCases).toSelf();
container.bind<CurrencyController>(CurrencyController).toSelf();

container.bind<ActiveSymbolUseCases>(ActiveSymbolUseCases).toSelf();
container.bind<ActiveSymbolController>(ActiveSymbolController).toSelf();

container.bind<LoggerService>(LoggerService).toSelf().inSingletonScope();
container.bind<ConfigService>(ConfigService).toSelf().inSingletonScope();

container.bind<NotificationUseCases>(NotificationUseCases).toSelf();
container.bind<NotificationController>(NotificationController).toSelf();

container.bind<WatchListUseCases>(WatchListUseCases).toSelf();
container.bind<WatchListController>(WatchListController).toSelf();

container.bind<TrendingSymbolsUseCases>(TrendingSymbolsUseCases).toSelf();

container.bind<SubscriptionUseCases>(SubscriptionUseCases).toSelf();
container.bind<SusbcriptionController>(SusbcriptionController).toSelf();

container.bind<TransactionMethodsUseCases>(TransactionMethodsUseCases).toSelf();
container.bind<TransactionMethodsController>(TransactionMethodsController).toSelf();

export { container };
