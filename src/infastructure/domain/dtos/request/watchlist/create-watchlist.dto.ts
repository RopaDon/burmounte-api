import { IsNotEmpty } from "class-validator";

export class CreateWatchListDTO {
  @IsNotEmpty()
  userId!: number;

  @IsNotEmpty()
  title!: string;
}
