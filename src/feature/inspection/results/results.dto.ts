import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsInt,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
  IsOptional,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";

export class InspectionResult {
  @IsOptional()
  @IsString()
  sticker_number: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  odo_distance: number;

  @IsOptional()
  @IsInt()
  reason_id: number;

  @IsOptional()
  @IsString()
  reason_content: string;

  @IsOptional()
  @IsInt()
  comment_id: number;

  @IsOptional()
  @IsString()
  comment_content: string;
}

export class ItemResult {
  @IsInt()
  @IsNotEmpty()
  inspection_schedule_result_id: number;

  @IsInt()
  @IsNotEmpty()
  inspection_item_id: number;

  @IsInt()
  @IsNotEmpty()
  input_type: number;

  @IsString()
  @IsNotEmpty()
  inspection_data: string;

  @IsString()
  @IsOptional()
  inspection_data_en: string;
}

export class StoreDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  inspection_schedule_result_id: number;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => InspectionResult)
  insResult: InspectionResult;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(150)
  @ValidateNested({ each: true })
  @Type(() => ItemResult)
  items: ItemResult[];
}
