// inversify.config.ts
import { Container } from "inversify";
import { EmailService } from "../services/email-service";
import { LoggerService } from "../services/logger-service";
import { ConfigService } from "../services/config-service";

const container = new Container();

container.bind<EmailService>(EmailService).toSelf();
container.bind<LoggerService>(LoggerService).toSelf().inSingletonScope();
container.bind<ConfigService>(ConfigService).toSelf().inSingletonScope();

export { container };
