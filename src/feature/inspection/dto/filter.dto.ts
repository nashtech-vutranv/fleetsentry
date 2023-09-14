import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsISO8601, IsInt, IsOptional, IsString } from "class-validator";

export class FilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  inspection_type_id?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  seqn?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  identification_number?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsISO8601()
  inspected_date?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  inspected_site_id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  inspector_id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sticker_number?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  inspection_result?: string;

  //TODO:
  ship_name: string;
}
