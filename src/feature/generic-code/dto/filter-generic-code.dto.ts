import { IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class FilterGenericCodeDto {
  @ApiProperty({ required: false })
  @Transform(({ value }) => value.toLowerCase())
  @IsOptional()
  q?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  company_code?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  key_type?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  attribute?: string;
}
