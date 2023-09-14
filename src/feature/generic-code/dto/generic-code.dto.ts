import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class GenericCodeDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  company_code: string;

  @IsNotEmpty()
  @IsString()
  key_type: string;

  @IsNotEmpty()
  @IsString()
  key_value: string;

  @IsOptional()
  @IsString()
  attribute1: string;

  @IsOptional()
  @IsString()
  attribute2: string;

  
  @IsOptional()
  @IsString()
  attribute3: string;

  @IsNotEmpty()
  @IsString()
  language: string;

  @IsOptional()
  @IsNumber()
  order: number;

  @IsOptional()
  @IsNumber()
  created_by: number;

  @IsOptional()
  @IsNumber()
  updated_by: number;
}
