import { IsNotEmpty } from "class-validator";
import { ClientAddress } from "./create-client-dto";

export class UpdateClientDTO {
  @IsNotEmpty()
  id!: number;

  name!: string;

  email!: string;

  industryId!: number;

  phoneNumber?: string;

  description!: string;

  representative!: string;

  address!: ClientAddress;

  displayPhoto?: Express.Multer.File;
}
