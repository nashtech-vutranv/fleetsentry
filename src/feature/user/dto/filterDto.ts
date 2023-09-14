import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { SortTypeEnum } from "src/constants/constants";

export class GetListUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  userId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  lastName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  userType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  sortField?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  sortType?: SortTypeEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
