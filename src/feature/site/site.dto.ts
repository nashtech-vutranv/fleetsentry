import { IsString, IsInt, IsOptional, IsNumberString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class IndexSiteDto {
  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "0001" })
  @Expose()
  company_code: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "C3" })
  @Expose()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "C3" })
  @Expose()
  name_en: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "eastern Japan" })
  @Expose()
  address: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "eastern Japan" })
  @Expose()
  address_en: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  possible_inspection_id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "ABC123" })
  @Expose()
  default_sales_office_code: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "Nori Yamada" })
  @Expose()
  contact_person: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "yamada@jevic.com" })
  @Expose()
  email_address: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  remarks: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  aei_number: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  monday_standard_time: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  tuesday_standard_time: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  wednesday_standard_time: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  thursday_standard_time: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  friday_standard_time: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  saturday_standard_time: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  sunday_standard_time: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  main_flag: number;

  @ApiProperty({ name: "sort_field", required: false, enum: ["ASC", "DESC"] })
  @Expose({ name: "sort_field" })
  sortField: string;

  @ApiProperty({ name: "sort_type", required: false, enum: ["ASC", "DESC"] })
  @Expose({ name: "sort_type" })
  sortType: "ASC" | "DESC";
}

export class CreateSiteDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "0001" })
  @Expose()
  company_code: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "C3" })
  @Expose()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "C3" })
  @Expose()
  name_en: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "eastern Japan" })
  @Expose()
  address: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "eastern Japan" })
  @Expose()
  address_en: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  possible_inspection_id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "ABC123" })
  @Expose()
  default_sales_office_code: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "Nori Yamada" })
  @Expose()
  contact_person: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "yamada@jevic.com" })
  @Expose()
  email_address: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  remarks: string;
}

export class UpdateSiteDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "C3" })
  @Expose()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "C3" })
  @Expose()
  name_en: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "eastern Japan" })
  @Expose()
  address: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "eastern Japan" })
  @Expose()
  address_en: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  possible_inspection_id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "ABC123" })
  @Expose()
  default_sales_office_code: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "Nori Yamada" })
  @Expose()
  contact_person: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "yamada@jevic.com" })
  @Expose()
  email_address: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  remarks: string;
}
