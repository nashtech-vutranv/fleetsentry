import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsInt, IsNotEmpty, IsOptional, Min } from "class-validator";
import { MyValidateNested } from "src/core/decorators";
import { Type } from "class-transformer";

export class InspectorScheduleDto {
  @ApiProperty({ description: "Inspector ID" })
  @IsNotEmpty()
  @IsInt()
  @IsOptional()
  inspector_id?: number;

  @ApiProperty({ description: "Company code" })
  @IsNotEmpty()
  @IsInt()
  @IsOptional()
  company_code?: number;

  @ApiProperty({ description: "Date" })
  @IsDateString()
  @IsOptional()
  date?: string;

  @ApiProperty({ description: "Operating Time From" })
  @IsOptional()
  operating_time_from?: string;

  @ApiProperty({ description: "Operating Time To" })
  @IsOptional()
  operating_time_to?: string;

  @ApiProperty({ description: "Day off Flag" })
  @IsOptional()
  @IsInt()
  @Min(0)
  dayoff_flag?: number;
}

export class CreateInsSchedulesDto {
  @ApiProperty({
    required: false,
    enum: [
      [
        {
          inspector_id: 1,
          date: "2023-08-24",
          operating_time_from: "09:00",
          operating_time_to: "16:00",
          dayoff_flag: 0,
        },
      ],
    ],
  })
  @IsOptional()
  @IsArray()
  @Type(() => InspectorScheduleDto)
  items?: InspectorScheduleDto[];
}
