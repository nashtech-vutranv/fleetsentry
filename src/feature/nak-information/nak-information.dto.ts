import { IsString, IsOptional, IsNumberString, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class IndexNakInformationDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "ABC-123" })
  @Expose()
  company_code: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false, example: "2023-08-26 02:29:47" })
  @Expose()
  from_send_at: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false, example: "2023-08-26 02:29:47" })
  @Expose()
  send_at: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false, example: "2023-08-26 02:29:47" })
  @Expose()
  to_send_at: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  send_distance: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  inspection_type_id: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  original_distance: number;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false, example: "2023-08-26 02:29:47" })
  @Expose()
  from_original_measurement_at: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false, example: "2023-08-26 02:29:47" })
  @Expose()
  original_measurement_at: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false, example: "2023-08-26 02:29:47" })
  @Expose()
  to_original_measurement_at: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  auction_site: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  sender_id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  identification_number: string;

  @ApiProperty({ name: "sort_field", required: false })
  @Expose({ name: "sort_field" })
  sortField: string;

  @ApiProperty({ name: "sort_type", required: false, enum: ["ASC", "DESC"] })
  @Expose({ name: "sort_type" })
  sortType: "ASC" | "DESC";
}
