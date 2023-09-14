import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class LanguageLabelDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  company_code: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  japanese: string;

  @IsOptional()
  @IsString()
  english: string;

  @IsOptional()
  @IsString()
  chinese: string;

  @IsOptional()
  @IsString()
  spanish: string;

  @IsOptional()
  @IsString()
  vietnamese: string;

  @IsOptional()
  @IsNumber()
  mobile_flag: number;

  @IsOptional()
  @IsNumber()
  created_by: number;

  @IsOptional()
  @IsNumber()
  updated_by: number;
}
