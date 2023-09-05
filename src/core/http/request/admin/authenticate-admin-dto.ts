import { IsNotEmpty } from "class-validator";

export default class AuthenticateAdminDTO {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  password!: string;
}
