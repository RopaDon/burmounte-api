import { IsNotEmpty } from "class-validator";

export class EmployeeAddress {
  @IsNotEmpty()
  country!: string;

  @IsNotEmpty()
  addressLine1!: string;

  addressLine2?: string;

  @IsNotEmpty()
  city!: string;

  @IsNotEmpty()
  postalCode!: string;
}

export class BankingAddress {
  @IsNotEmpty()
  country!: string;

  @IsNotEmpty()
  addressLine1!: string;

  addressLine2?: string;

  @IsNotEmpty()
  city!: string;

  @IsNotEmpty()
  postalCode!: string;
}

export class BankingInformation {
  @IsNotEmpty()
  currency!: string;

  @IsNotEmpty()
  accountNumber!: string;

  routingNumber?: string;

  branchCode?: string;

  @IsNotEmpty()
  transferType!: string;

  swiftCode?: string;

  bankName?: string;

  @IsNotEmpty()
  accountType?: string;

  accountHolderName?: string;

  @IsNotEmpty()
  address!: BankingAddress;
}

export class CreateEmployeeDTO {
  email?: string;

  @IsNotEmpty()
  firstName!: string;

  @IsNotEmpty()
  lastName!: string;

  @IsNotEmpty()
  salaryCurrency!: string;

  @IsNotEmpty()
  nationality!: string;

  @IsNotEmpty()
  countryOfBirth!: string;

  @IsNotEmpty()
  salary!: number;

  phoneNumber?: string;

  dateOfBirth?: string;

  statusId!: number;

  displayPhoto?: string;

  @IsNotEmpty()
  clientId!: number;

  @IsNotEmpty()
  jobId!: number;

  @IsNotEmpty()
  address!: EmployeeAddress;

  @IsNotEmpty()
  bankingInformation!: BankingInformation;
}
