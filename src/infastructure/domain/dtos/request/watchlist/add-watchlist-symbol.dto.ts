import { IsNotEmpty } from "class-validator";
export class AddWatchlistSymbolDTO {
  @IsNotEmpty()
  symbol!: string;

  @IsNotEmpty()
  watchlistId!: number;
}
