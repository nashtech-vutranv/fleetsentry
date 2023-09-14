import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class TodoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sapo: string;

  @IsInt()
  @IsNotEmpty()
  status: number;
}
