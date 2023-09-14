import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsNumber, IsOptional } from "class-validator";
import { SortTypeEnum } from "src/constants/constants";

export class GetListMailTemplateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  programName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  templateName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsIn([0, 1])
  defaultFlag?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  author?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  fromCreatedDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  toCreatedDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  fromUpdatedDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  toUpdatedDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  sortField?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  sortType?: SortTypeEnum;

  // @ApiProperty({ required: false })
  // @IsOptional()
  // @Type(() => Number)
  // @IsNumber()
  // page?: number;

  // @ApiProperty({ required: false })
  // @IsOptional()
  // @Type(() => Number)
  // @IsNumber()
  // limit?: number;
}
