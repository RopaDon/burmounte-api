import { adminSdk } from "./firebase.config";
import { inject, injectable } from "inversify";
import { ExceptionTypes } from "../../../../core/exceptions/types";
import { HttpStatusCodes } from "../../../../core/http/status-codes";
import { LoggerService } from "../../../../core/services/logger-service";
import { ConfigService } from "../../../../core/services/config-service";
import ServiceHubException from "../../../../core/exceptions/service-hub-exception";

@injectable()
export default class FirebaseUseCases {
  private firebaseClient: typeof adminSdk;
  constructor() {
    this.firebaseClient = adminSdk;
  }

  public async uploadFileToFirebaseStorage(file: Express.Multer.File, destinationPath: string): Promise<string> {
    try {
      const bucket = this.firebaseClient.storage().bucket();
      const fileBuffer = file.buffer;

      await bucket.file(destinationPath).save(fileBuffer, {});

      return destinationPath;
    } catch (err) {
      throw new ServiceHubException(HttpStatusCodes.BAD_REQUEST, "An error occured uploading this file ");
    }
  }

  public async getSignedUrl(destinationPath: string): Promise<string> {
    const bucket = this.firebaseClient.storage().bucket();

    const downloadURL = await bucket.file(destinationPath).getSignedUrl({
      action: "read",
      expires: "01-01-9000", // Set an appropriate expiration date or duration
    });

    return downloadURL[0];
  }
}
