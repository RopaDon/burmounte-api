import { IsNotEmpty } from "class-validator";

export class RemoveWatchlistSymbolDTO {
  @IsNotEmpty()
  symbol!: string;

  @IsNotEmpty()
  watchlistId!: number;
}
