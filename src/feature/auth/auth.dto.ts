import { IsString, IsNotEmpty } from "class-validator";

export class LoginBody {
  @IsString()
  @IsNotEmpty()
  company_code: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
