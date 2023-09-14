import { IsNotEmpty, IsString } from "class-validator";

export class KeyTypeGenericCodeDto {
  @IsNotEmpty()
  @IsString()
  keys: string;
}
