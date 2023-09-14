import { IsInt, IsNotEmpty, IsOptional, IsDate, IsNumber } from "class-validator";
import { Transform, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommonExceptionDayDto {
  @ApiProperty({ example: "2023-08-31", required: true })
  @Transform(({ value }) => new Date(value))
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  dayoff_flag: number | null;

  @ApiProperty({ example: "08:00", required: false })
  @IsOptional()
  possible_time_from: string | null;

  @ApiProperty({ example: "18:00", required: false })
  @IsOptional()
  possible_time_to: string | null;

  @ApiProperty({ example: 5, required: false })
  @IsOptional()
  possible_count: number | null;

  @ApiProperty({ example: 3, required: true })
  @IsNumber()
  created_by: number;

  @ApiProperty({ example: 3, required: true })
  @IsNumber()
  updated_by: number;
}

export class UpdateCommonExceptionDayDto extends CreateCommonExceptionDayDto {
  @ApiProperty({ example: 1, required: true })
  @IsNotEmpty()
  @IsInt()
  id: number;
}
