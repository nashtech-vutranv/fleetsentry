import { IsString, IsNotEmpty, IsInt, IsIn, IsArray, ArrayMinSize, ValidateNested, ValidateIf } from "class-validator";
import { TabMobileInputUnavailableFlag, TabType, TabUploadFlag } from "src/entities/enums";
import { Type } from "class-transformer";

export class TabSeqDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsInt()
  @IsNotEmpty()
  order: number;
}

export class CreateBody {
  @IsInt()
  @IsNotEmpty()
  inspection_type_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  name_en: string;

  @IsInt()
  @IsIn([TabMobileInputUnavailableFlag.Enable, TabMobileInputUnavailableFlag.Disable])
  @IsNotEmpty()
  mobile_input_unavailable_flag: number;

  @IsInt()
  @IsIn([TabUploadFlag.Enable, TabUploadFlag.Disable])
  @IsNotEmpty()
  upload_flag: number;

  @IsString()
  @IsIn([TabType.General, TabType.Coordinate])
  @IsNotEmpty()
  type: string;

  @ValidateIf((object) => object.type === TabType.Coordinate)
  @IsNotEmpty()
  @IsInt()
  drawing_id: number;
}

export class UpdateBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  name_en: string;

  @IsInt()
  @IsIn([TabMobileInputUnavailableFlag.Enable, TabMobileInputUnavailableFlag.Disable])
  @IsNotEmpty()
  mobile_input_unavailable_flag: number;

  @IsInt()
  @IsIn([TabUploadFlag.Enable, TabUploadFlag.Disable])
  @IsNotEmpty()
  upload_flag: number;
}

export class UpdateSeqBody {
  @IsInt()
  @IsNotEmpty()
  inspection_type_id: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => TabSeqDto)
  @ValidateNested()
  items: TabSeqDto[];
}

/**
 * Setup tabs
 */
export class SetupTabsBody {
  @IsInt()
  @IsNotEmpty()
  inspection_type_id: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => TabDto)
  @ValidateNested()
  tabs: TabDto[];
}

export class TabDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsArray()
  @Type(() => InspectionTypeItemDto)
  @ValidateNested()
  items: InspectionTypeItemDto[];
}

export class InspectionTypeItemDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsInt()
  @IsNotEmpty()
  inspection_item_id: number;

  @IsInt()
  @IsNotEmpty()
  required_flag: number;

  @IsInt()
  @IsNotEmpty()
  pass_target_flag: number;

  @IsInt()
  @IsNotEmpty()
  threshold: number;

  @IsString()
  @IsNotEmpty()
  passing_value: string;

  @IsInt()
  @IsNotEmpty()
  used_flag: number;

  @IsInt()
  @IsNotEmpty()
  en_result_required_flag: number;
}
