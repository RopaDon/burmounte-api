import { IsNotEmpty } from "class-validator";

export class UpdateDocumentDTO {
  @IsNotEmpty()
  name!: string;

  file!: Express.Multer.File;

  @IsNotEmpty()
  type!: string;

  @IsNotEmpty()
  description!: string;
}
