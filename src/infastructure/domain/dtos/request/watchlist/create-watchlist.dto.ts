import { IsNotEmpty } from "class-validator";

export class CreateWatchListDTO {
  @IsNotEmpty()
  userId!: number;
  @IsNotEmpty()
  title!: string;
  description?: string;
  isPublic?: boolean;
  tags?: string;
  favoriteCount?: number;
  viewCount?: number;
  lastAccessed?: Date;
}
