import { IsNotEmpty } from "class-validator";

export class UpdateWaitlistUserDTO {
  @IsNotEmpty()
  firstName!: string;

  @IsNotEmpty()
  lastName!: string;

  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  jobLevelExperienceId!: number;

  @IsNotEmpty()
  industryId!: number;
}
