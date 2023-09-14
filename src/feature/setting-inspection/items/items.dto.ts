import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsIn,
  IsBoolean,
  ValidateNested,
  IsArray,
  IsOptional,
  ArrayMinSize, ArrayMaxSize, ValidateIf,
} from "class-validator";
import { InputTypeEnum } from "src/enums";
import { Type } from "class-transformer";
import { TabType } from "../../../entities/enums";

/**
 * (1) - InputTypeEnum.TextNumber
 */
export class NumberOption {
  @IsInt()
  @IsNotEmpty()
  min_digits: number;

  @IsInt()
  @IsNotEmpty()
  max_digits: number;

  @IsInt()
  @IsNotEmpty()
  decimal_point_digits: number;

  @IsString()
  @IsNotEmpty()
  unit: string;
}

/**
 * (2) - InputTypeEnum.TextBox
 */
export class TextOption {
  @IsInt()
  @IsNotEmpty()
  min_digits: number;

  @IsInt()
  @IsNotEmpty()
  max_digits: number;
}

/**
 * (4) - InputTypeEnum.Date
 */
export class DateOption {
  @IsInt()
  @IsIn([0,1])
  @IsNotEmpty()
  future_date_flag: number;

  @IsInt()
  @IsOptional()
  max_future_days: number;

  @IsInt()
  @IsIn([0,1])
  @IsNotEmpty()
  past_date_flag: number;

  @IsInt()
  @IsOptional()
  max_past_days: number;
}

/**
 * (5) - InputTypeEnum.Image
 */
export class ImageOption {
  @IsString()
  @IsNotEmpty()
  image_size: string;
}

/**
 * (6) - InputTypeEnum.OnOff
 */
export class OnOffOption {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  label_en: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

/**
 * (7) - InputTypeEnum.Radio
 */
export class RadioListOption {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => RadioItemOption)
  items: RadioItemOption[];
}

/**
 * (7.1) - InputTypeEnum.Radio
 */
export class RadioItemOption {
  @IsInt()
  @IsOptional()
  id: number; // NULL is CASE CREATE, NOTNULL is CASE update

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  label_en: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

/**
 * (8) - InputTypeEnum.Dropdown
 */
export class SelectOption {
  @IsString()
  @IsNotEmpty()
  key_type: string;
}

/**
 * (9) - InputTypeEnum.Coordinate
 */
export class CoordinateOption {
  @IsString()
  @IsNotEmpty()
  key_type_1: string; // Size.

  @IsString()
  @IsNotEmpty()
  key_type_2: string; // Type.
}

export class CreateBody {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  name_en: string;

  @IsString()
  @IsNotEmpty()
  short_name: string;

  @IsString()
  @IsNotEmpty()
  short_name_en: string;

  @IsIn([
    InputTypeEnum.TextNumber,
    InputTypeEnum.TextBox,
    InputTypeEnum.TextArea,
    InputTypeEnum.Date,
    InputTypeEnum.Image,
    InputTypeEnum.OnOff,
    InputTypeEnum.Radio,
    InputTypeEnum.Dropdown,
    InputTypeEnum.Coordinate,
  ])
  @IsInt()
  @IsNotEmpty()
  input_type: number;

  @ValidateNested()
  @Type((obj) => {
    const inputType = obj.newObject.input_type;
    switch (inputType) {
      case InputTypeEnum.TextNumber:
        return NumberOption;
      case InputTypeEnum.TextBox:
        return TextOption;
      case InputTypeEnum.Date:
        return DateOption;
      case InputTypeEnum.Image:
        return ImageOption;
      case InputTypeEnum.OnOff:
        return OnOffOption;
      case InputTypeEnum.Radio:
        return RadioListOption;
      case InputTypeEnum.Dropdown:
        return SelectOption;
      case InputTypeEnum.Coordinate:
        return CoordinateOption;
      default:
        return null;
    }
  })
  option: any;
}

export class UpdateBody {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  name_en: string;

  @IsString()
  @IsNotEmpty()
  short_name: string;

  @IsString()
  @IsNotEmpty()
  short_name_en: string;

  @IsIn([
    InputTypeEnum.TextNumber,
    InputTypeEnum.TextBox,
    InputTypeEnum.TextArea,
    InputTypeEnum.Date,
    InputTypeEnum.Image,
    InputTypeEnum.OnOff,
    InputTypeEnum.Radio,
    InputTypeEnum.Dropdown,
    InputTypeEnum.Coordinate,
  ])
  @IsInt()
  @IsNotEmpty()
  input_type: number;

  @ValidateIf((object) => object.type === InputTypeEnum.Radio)
  @ValidateNested()
  @Type((obj) => {
    const inputType = obj.newObject.input_type;
    switch (inputType) {
      case InputTypeEnum.TextNumber:
        return NumberOption;
      case InputTypeEnum.TextBox:
        return TextOption;
      case InputTypeEnum.Date:
        return DateOption;
      case InputTypeEnum.Image:
        return ImageOption;
      case InputTypeEnum.OnOff:
        return OnOffOption;
      case InputTypeEnum.Radio:
        return RadioListOption;
      case InputTypeEnum.Dropdown:
        return SelectOption;
      case InputTypeEnum.Coordinate:
        return CoordinateOption;
      default:
        return null;
    }
  })
  option: any;
}
