import { IsNotEmpty } from "class-validator";

export class UpdateStatusDTO {
  @IsNotEmpty()
  statusId!: number;
}
