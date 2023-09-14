import { IsString, IsNotEmpty, IsDate, IsOptional, IsIn } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "../../../utils";

export class FilterInspectorHistoryDto extends BaseDto {
  @ApiProperty({ example: "string", required: true })
  @IsString()
  order_number: string;

  @ApiProperty({ example: "string", required: true })
  @IsString()
  vin_number: string;

  @ApiProperty({ example: "string", required: true })
  @IsString()
  maker: string;

  @ApiProperty({ example: "string", required: true })
  @IsString()
  type: string;

  @ApiProperty({ example: "string", required: false, nullable: true })
  @IsOptional()
  username: string | null;

  @ApiProperty({ example: 1, required: false, nullable: true })
  @IsOptional()
  inspection_type_id: number | null;

  @ApiProperty({ example: 0, required: false, nullable: true })
  @IsOptional()
  @IsIn(["h", "d", null])
  inspection_flag: "h" | "d" | null;

  @ApiProperty({ example: "2023-08-17", required: true })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  from_date: Date;

  @ApiProperty({ example: "2023-08-18", required: true })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  to_date: Date;
}

export class FilterUserHistoryDto extends BaseDto {
  @ApiProperty({ example: "string", required: true })
  @IsString()
  order_number: string;

  @ApiProperty({ example: "string", required: true })
  @IsString()
  vin_number: string;

  @ApiProperty({ example: "string", required: false, nullable: true })
  @IsOptional()
  username: string | null;

  @ApiProperty({ example: "2023-08-17", required: true })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  from_date: Date;

  @ApiProperty({ example: "2023-08-18", required: true })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  to_date: Date;
}
