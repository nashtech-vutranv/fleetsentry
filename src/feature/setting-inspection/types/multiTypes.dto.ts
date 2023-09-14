import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateMultiTypeDto {
  @IsString()
  @IsNotEmpty()
  inspection_name: string;

  @IsNumber()
  inspection_type_id_1: number;

  @IsNumber()
  inspection_type_id_2: number;
}

export class UpdateMultiTypeDto {
  @IsString()
  @IsNotEmpty()
  inspection_name: string;

  @IsNumber()
  inspection_type_id_1: number;

  @IsNumber()
  inspection_type_id_2: number;
}
