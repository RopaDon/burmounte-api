import { IsNotEmpty } from "class-validator";

export class CreateWaitlistUserDTO {
  @IsNotEmpty()
  firstName!: string;

  @IsNotEmpty()
  lastName!: string;

  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  country!: string;

  @IsNotEmpty()
  phoneNumber!: string;

  @IsNotEmpty()
  jobExperienceLevelId!: number;

  @IsNotEmpty()
  industryId!: number;

  @IsNotEmpty()
  hasSuitablelDevice!: boolean;

  @IsNotEmpty()
  hasSuitableInternet!: boolean;
}
