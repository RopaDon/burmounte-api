import { IsNotEmpty } from "class-validator";

export class GetActiveSymbolsDTO {
  @IsNotEmpty()
  type!: string;

  symbols?: string[];
}
