import "reflect-metadata";
import { Controllers } from "..";
import Routes from "../../routes/routes";
import { inject, injectable } from "inversify";
import { Body, Get, JsonController, Post, QueryParams } from "routing-controllers";
import AuthUseCases from "../../../infastructure/domain/usecases/auth/auth-usecases";
import { AuthorizeUserDTO } from "../../../infastructure/domain/dtos/request/authorize-user-dto";
import AuthenticateAdminDTO from "../../../infastructure/domain/dtos/request/admin/authenticate-admin-dto";

@injectable()
@JsonController(Controllers.Auth)
export class AuthController {
  constructor(@inject(AuthUseCases) private authUseCases: AuthUseCases) {}

  @Post(Routes.Auth.Authorize)
  async authorizeUser(@Body({ validate: true }) authorizeUserDTO: AuthorizeUserDTO) {
    return await this.authUseCases.authorizeUser(authorizeUserDTO);
  }

  @Post(Routes.Auth.AuthenticateAdmin)
  async authenticateAdmin(@Body({ validate: true }) authenticateAdminDTO: AuthenticateAdminDTO) {
    return await this.authUseCases.authenticateAdmin(authenticateAdminDTO);
  }
}
