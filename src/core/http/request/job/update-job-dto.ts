import { IsNotEmpty } from "class-validator";

export class UpdateJobDTO {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  description!: string;
}
