import { IsNotEmpty } from "class-validator";
export class AddWatchlistSymbolDTO {
  @IsNotEmpty()
  symbol!: string;
  name?: string;
  description?: string;
  rank?: number;
  isFavorite?: boolean;
  watchlistId?: number;
}
