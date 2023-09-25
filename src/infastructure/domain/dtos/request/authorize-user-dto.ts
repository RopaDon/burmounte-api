import { IsNotEmpty } from "class-validator";

export class AuthorizeUserDTO {
  @IsNotEmpty()
  public derivToken!: string;
  @IsNotEmpty()
  public notificationToken!: string;
}
