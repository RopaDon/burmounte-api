import { IsNotEmpty } from "class-validator";

export class GetActiveSymbolMetadataDTO {
  @IsNotEmpty()
  market!: string;

  @IsNotEmpty()
  symbol!: string;
}
