import { IsString, IsInt, IsOptional, IsNumberString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class IndexMstCarBodyTypeDto {
  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "DBA" })
  @Expose()
  company_code: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "DBA-URJ201W" })
  @Expose()
  type_of_model: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "Toyota" })
  @Expose()
  maker: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, example: 5 })
  @Expose()
  type_classification_start: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, example: 12 })
  @Expose()
  type_classification_end: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, example: 2600 })
  @Expose()
  car_model_lower_limit: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, example: 2650 })
  @Expose()
  car_model_upper_limit: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, example: 6.5 })
  @Expose()
  fuel: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, example: 357 })
  @Expose()
  co2: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "JC08" })
  @Expose()
  measurement_mode: string;

  @ApiProperty({ name: "sort_field", required: false })
  @Expose()
  sortField: string;

  @ApiProperty({ name: "sort_type", required: false, enum: ["ASC", "DESC"] })
  @Expose({ name: "sort_type" })
  sortType: "ASC" | "DESC";
}

export class CreateMstCarBodyTypeDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "DBA-URJ201W" })
  @Expose()
  type_of_model: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "Toyota" })
  @Expose()
  maker: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, example: 5 })
  @Expose()
  type_classification_start: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, example: 12 })
  @Expose()
  type_classification_end: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, example: 2600 })
  @Expose()
  car_model_lower_limit: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, example: 2650 })
  @Expose()
  car_model_upper_limit: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, example: 6.5 })
  @Expose()
  fuel: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, example: 357 })
  @Expose()
  co2: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "JC08" })
  @Expose()
  measurement_mode: string;
}

export class UpdateMstCarBodyTypeDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "DBA-URJ201W" })
  @Expose()
  type_of_model: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "Toyota" })
  @Expose()
  maker: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, example: 5 })
  @Expose()
  type_classification_start: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, example: 12 })
  @Expose()
  type_classification_end: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, example: 2600 })
  @Expose()
  car_model_lower_limit: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, example: 2650 })
  @Expose()
  car_model_upper_limit: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, example: 6.5 })
  @Expose()
  fuel: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, example: 357 })
  @Expose()
  co2: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "JC08" })
  @Expose()
  measurement_mode: string;
}
