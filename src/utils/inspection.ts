import { MstInspectionItemEntity } from "src/entities";
import { InputTypeEnum } from "src/enums";

export class Inspection {
  /**
   * @param obj MstInspectionItemEntity
   */
  public static toItem(obj: MstInspectionItemEntity | null): any {
    if (!obj) return null;

    let option: any = null;
    switch (obj.input_type) {
      case InputTypeEnum.TextNumber:
        option = {
          min_digits: obj.min_digits,
          max_digits: obj.max_digits,
          decimal_point_digits: obj.decimal_point_digits,
          unit: obj.unit,
        };
        break;

      case InputTypeEnum.TextBox:
        option = {
          min_digits: obj.min_digits,
          max_digits: obj.max_digits,
        };
        break;

      case InputTypeEnum.Date:
        option = {
          future_date_flag: obj.future_date_flag,
          max_future_days: obj.max_future_days,
          past_date_flag: obj.past_date_flag,
          max_past_days: obj.max_past_days,
        };
        break;

      case InputTypeEnum.Image:
        option = {
          image_size: obj.image_size,
        };
        break;

      case InputTypeEnum.OnOff:
        option = {
          label: obj.label,
          label_en: obj.label_en,
          value: obj.value,
        };
        break;
      case InputTypeEnum.Dropdown:
        option = {
          key_type: obj.key_type,
        };
        break;
      case InputTypeEnum.Coordinate:
        option = {
          key_type_1: obj.key_type_1,
          key_type_2: obj.key_type_2,
        };
        break;
      case InputTypeEnum.Radio:
        option = { items: [] };
        break;
      default:
        break;
    }

    obj.option = option;
    delete obj.min_digits;
    delete obj.max_digits;
    delete obj.decimal_point_digits;
    delete obj.unit;
    delete obj.future_date_flag;
    delete obj.max_future_days;
    delete obj.past_date_flag;
    delete obj.max_past_days;
    delete obj.label;
    delete obj.label_en;
    delete obj.value;
    delete obj.key_type;
    delete obj.key_type_1;
    delete obj.key_type_2;
    delete obj.image_size;
    delete obj.created_by;
    delete obj.updated_by;
    delete obj.created_at;
    delete obj.updated_at;
    delete obj.deleted_at;

    return obj;
  }
}
