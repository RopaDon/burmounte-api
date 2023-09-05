import { IsNotEmpty } from "class-validator";

export class CreateClientDTO {
  name!: string;

  email!: string;

  industryId!: string;

  clientStatusId!: string;

  phoneNumber?: string;

  description!: string;

  representative!: string;

  address!: ClientAddress;

  displayPhoto?: Express.Multer.File;
}

export class ClientAddress {
  @IsNotEmpty()
  country!: string;

  @IsNotEmpty()
  addressLine1!: string;

  addressLine2?: string;

  @IsNotEmpty()
  city!: string;

  @IsNotEmpty()
  province!: string;

  @IsNotEmpty()
  postalCode!: string;
}
