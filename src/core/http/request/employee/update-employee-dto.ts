import { IsNotEmpty } from "class-validator";
import { BankingInformation, EmployeeAddress } from "./create-employee-dto";

export class UpdateEmployeeDTO {
  email?: string;

  @IsNotEmpty()
  firstName!: string;

  @IsNotEmpty()
  lastName!: string;

  @IsNotEmpty()
  dollarRate!: number;

  dateOfBirth?: string;

  displayPhoto?: string;

  employeeStatusId?: number;

  @IsNotEmpty()
  address!: EmployeeAddress;
}
