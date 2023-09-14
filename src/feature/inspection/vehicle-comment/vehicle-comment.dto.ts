import { IsNotEmpty, IsString } from "class-validator";

export class CreateVehicleCommentDto {
  @IsString()
  @IsNotEmpty()
  identification_number: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
