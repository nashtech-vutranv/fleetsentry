import { IsNumber, IsNotEmpty, IsDate } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "../../../utils";

export class ScheduleBobyDto extends BaseDto {
  @ApiProperty({ example: 1, required: true, description: "ID of site" })
  @IsNumber()
  @IsNotEmpty()
  site_id: number;

  @ApiProperty({ example: 1, required: true, description: "ID of inspection type" })
  @IsNumber()
  @IsNotEmpty()
  inspection_type_id: number;

  @ApiProperty({ example: "2023-08-17", required: true, description: "The begin date of schedule" })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  begin: Date;

  @ApiProperty({ example: "2023-08-30", required: true, description: "The end date of schedule" })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  end: Date;
}
