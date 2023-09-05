import internal from "stream";
import * as AWS from "aws-sdk";
import { Logger } from "winston";
import { inject, injectable } from "inversify";
import { LoggerService } from "../logger-service";
import { ConfigService } from "../config-service";
import { Multer } from "multer";
import ServiceHubException from "../../exceptions/service-hub-exception";
import { HttpStatusCodes } from "../../http/status-codes";
import { ExceptionTypes } from "../../exceptions/types";

@injectable()
class S3BucketService {
  private s3: AWS.S3;

  constructor(@inject(LoggerService) private logger: LoggerService, @inject(ConfigService) private configService: ConfigService) {
    this.s3 = new AWS.S3({
      region: configService.get("AWS_REGION"),
      accessKeyId: configService.get("AWS_ACCESS_KEY_ID"),
      secretAccessKey: configService.get("AWS_SECRET_ACCESS_KEY"),
    });
  }

  public async uploadFile(file: Express.Multer.File, key: string): Promise<string> {
    const params = {
      Key: key,
      ACL: "public-read",
      Body: file.buffer,
      ContentType: file.mimetype,
      Bucket: this.configService.get("S3_BUCKET"),
    };

    try {
      const { Location } = await this.s3.upload(params).promise();
      return Location;
    } catch (error) {
      this.logger.error("An error occured while uploading a your file to S3", error);
      throw new ServiceHubException(ExceptionTypes.S3_BUCKET_ERROR, HttpStatusCodes.BAD_REQUEST, "An error occured while uploading a your file to S3");
    }
  }

  public async getSignedUrl(key: string): Promise<string> {
    try {
      const bucketName = this.configService.get("S3_BUCKET");

      const expirationTimeInSeconds = 60 * 5; // 5 minutes (adjust as needed)

      const params = { Key: key, Bucket: bucketName };

      const signedUrl = this.s3.getSignedUrl("getObject", params);

      return signedUrl;
    } catch (error) {
      this.logger.error("An error occured while getting your signed url", error);
      throw new ServiceHubException(ExceptionTypes.S3_BUCKET_ERROR, HttpStatusCodes.BAD_REQUEST, "An error occured while getting your signed url");
    }
  }
}

export default S3BucketService;
