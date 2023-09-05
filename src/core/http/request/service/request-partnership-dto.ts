import { IsNotEmpty } from "class-validator";

export class RequestPartnershipDTO {
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  companyName!: string;

  @IsNotEmpty()
  fullName!: string;

  @IsNotEmpty()
  contactNumber!: string;

  @IsNotEmpty()
  partnershipDescription!: string;
}
