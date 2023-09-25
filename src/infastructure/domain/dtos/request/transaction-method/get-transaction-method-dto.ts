import { IsNotEmpty } from "class-validator";

export class GetTransactionMethodsDTO {
  @IsNotEmpty()
  public type!: string;
}
