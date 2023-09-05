import { IsNotEmpty } from "class-validator";

export class CreateDocumentDTO {
  @IsNotEmpty()
  name!: string;

  file!: Express.Multer.File;

  @IsNotEmpty()
  docuemntTypeId!: number;

  @IsNotEmpty()
  description!: string;
}
