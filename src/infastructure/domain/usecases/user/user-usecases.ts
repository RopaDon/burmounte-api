import { User } from "@prisma/client";
import { inject, injectable } from "inversify";
import FirebaseUseCases from "../firebase/firebase-usecases";
import { prisma } from "../../../../core/services/prisma-client";
import { LoggerService } from "../../../../core/services/logger-service";
import ServiceHubExceptionDelegate from "../../../../core/exceptions/handler";

@injectable()
export default class UserUseCases {
  private logger: LoggerService;
  constructor(@inject(FirebaseUseCases) private firebaseUseCases: FirebaseUseCases) {
    this.logger = new LoggerService(this.constructor.name);
  }

  public async updateUserProfilePic(userId: number, displayPhoto: Express.Multer.File): Promise<User> {
    try {
      let profilePicture: string = await this.firebaseUseCases.uploadFileToFirebaseStorage(displayPhoto, `/users/display-photos/${userId}.png`);

      let result = await prisma.user.update({ where: { id: userId }, data: { profilePicture } });

      result.profilePicture = await this.firebaseUseCases.getSignedUrl(result.profilePicture!);

      return result;
    } catch (exception) {
      throw ServiceHubExceptionDelegate(exception, this.logger);
    }
  }
}
