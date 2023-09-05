import { IsNotEmpty } from "class-validator";

export class CreateJobApplicationDTO {
  @IsNotEmpty()
  firstName!: string;

  @IsNotEmpty()
  lastName!: string;

  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  phoneNumber!: string;

  @IsNotEmpty()
  jobPostingId!: number;

  @IsNotEmpty()
  shortDescription!: string;

  @IsNotEmpty()
  resume!: Express.Multer.File;

  @IsNotEmpty()
  coverLetter!: Express.Multer.File;
}
