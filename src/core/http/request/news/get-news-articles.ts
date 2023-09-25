import { IsNotEmpty } from "class-validator";

export class GetNewsDTO {
  @IsNotEmpty()
  limit!: number;

  @IsNotEmpty()
  query!: string;
}
