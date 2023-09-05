import { IsNotEmpty } from "class-validator";

export class CreateJobDTO {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  description!: string;
}
