import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { User } from "@prisma/client";
import { inject, injectable } from "inversify";
import { Token } from "../../../../core/types";
import StripeUseCases from "../stripe/stripe-usecases";
import { prisma } from "../../../../core/services/prisma-client";
import { HttpStatusCodes } from "../../../../core/http/status-codes";
import { pascalToCamel, snakeToCamel } from "../../../../core/utils";
import { AuthorizeUserDTO } from "../../dtos/request/authorize-user-dto";
import { LoggerService } from "../../../../core/services/logger-service";
import { ConfigService } from "../../../../core/services/config-service";
import { derivAPI } from "../../../../core/services/deriv-api-connection";
import ServiceHubException from "../../../../core/exceptions/service-hub-exception";
import AuthenticateAdminDTO from "../../dtos/request/admin/authenticate-admin-dto";
import ServiceHubExceptionDelegate from "../../../../core/exceptions/handler";

@injectable()
export default class AuthUseCases {
  private logger: LoggerService;
  constructor(@inject(ConfigService) private configService: ConfigService, @inject(StripeUseCases) private stripeUseCases: StripeUseCases) {
    this.logger = new LoggerService(this.constructor.name);
  }

  public async authorizeUser(authorizeUserDTO: AuthorizeUserDTO): Promise<any> {
    let tokens = [];
    const { derivToken, notificationToken } = authorizeUserDTO;

    try {
      const userSelectQuery = {
        id: true,
        email: true,
        derivUserId: true,
      };

      const derivUser = await derivAPI.authorize(derivToken);

      let burmounteUser = await prisma.user.findFirst({
        where: { email: derivUser.email },
        select: userSelectQuery,
      });

      if (!burmounteUser) {
        const { id: stripeCustomerId } = await this.stripeUseCases.createStripeCustomer(derivUser.authorize);

        const data = {
          stripeCustomerId,
          notificationToken,
          email: derivUser.authorize.email,
          derivUserId: derivUser.authorize.user_id,
        };

        burmounteUser = (await prisma.user.create({
          data,
          select: userSelectQuery,
        })) as User;
      }

      const user = {
        burmounte: burmounteUser,
        deriv: snakeToCamel(derivUser.authorize),
      };

      const accessToken = sign(user, this.configService.get("ACCESS_TOKEN_KEY"), { expiresIn: "999999999y" });
      const refreshToken = sign(user, this.configService.get("REFRESH_TOKEN_KEY"), { expiresIn: "999999999y" });

      tokens.push({ accessToken, refreshToken });

      const accessTokens = {
        deriv: [],
        burmounte: tokens,
      };

      return {
        user,
        accessTokens,
      };
    } catch (error) {
      throw ServiceHubExceptionDelegate(error, this.logger);
    }
  }

  public async authenticateAdmin(authenticateAdminDTO: AuthenticateAdminDTO): Promise<Token> {
    const { username, password } = authenticateAdminDTO;

    this.logger.info(`Attempting to authenticate admin with username ${username}`);

    try {
      // Find the admin with the provided email
      const admin = await prisma.admin.findUnique({
        where: { username },
        include: { role: true, permissions: { include: { permission: true } } },
      });

      if (!admin) {
        throw new ServiceHubException(HttpStatusCodes.UNAUTHORIZED, "Incorrect email or password");
      }

      const passwordMatches = await bcrypt.compare(password, admin.password);
      if (!passwordMatches) {
        throw new ServiceHubException(HttpStatusCodes.UNAUTHORIZED, "Incorrect email or password");
      }

      // Generate an access token
      const accessToken = sign(admin, this.configService.get("ACCESS_TOKEN_KEY"), { expiresIn: "1d" });

      // Generate a refresh token
      const refreshToken = sign(admin, this.configService.get("REFRESH_TOKEN_KEY"), { expiresIn: "1d" });

      await prisma.admin.update({
        where: { id: admin.id },
        data: { lastLogin: new Date() },
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw ServiceHubExceptionDelegate(error, this.logger);
    }
  }
}
