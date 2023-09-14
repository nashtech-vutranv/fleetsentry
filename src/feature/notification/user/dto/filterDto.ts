import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsDateString, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { SortTypeEnum } from "src/constants";

export class GetListNotificationsDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsIn([0, 1])
  importantFlag?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  targetUsers?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  fromReleasedDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  toReleasedDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  sortField?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  sortType?: SortTypeEnum;
}
