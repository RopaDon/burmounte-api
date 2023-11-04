import "reflect-metadata";
import { Controllers } from "..";
import Routes from "../../routes/routes";
import { inject, injectable } from "inversify";
import { Get, JsonController, Param, Put, UploadedFile } from "routing-controllers";
import UserUseCases from "../../../infastructure/domain/usecases/user/user-usecases";

@injectable()
@JsonController(Controllers.Users)
export class UserController {
  constructor(@inject(UserUseCases) private userUseCases: UserUseCases) {}

  @Put(Routes.User.UpdateProfilePhoto)
  async updateUserProfilePic(@Param("userId") userId: number, @UploadedFile("displayPhoto") displayPhoto: Express.Multer.File) {
    return await this.userUseCases.updateUserProfilePic(userId, displayPhoto);
  }
}
