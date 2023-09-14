import { IsString, IsNotEmpty, IsNumber, IsEnum } from "class-validator";
import {
  BooleanNumber,
  InspectionAssignMethod,
  ReInspectionAbleFlag,
  ReInspectionAssignMethod,
  VisitAbleFlag,
} from "./enums/single-type.enum";

export class CreateTypeDto {
  @IsString()
  @IsNotEmpty()
  category_code: string;

  @IsString()
  @IsNotEmpty()
  group_code: string;

  @IsString()
  @IsNotEmpty()
  inspection_code: string;

  @IsEnum(InspectionAssignMethod)
  inspection_assign_method: InspectionAssignMethod;

  @IsEnum(VisitAbleFlag)
  visit_able_flag: VisitAbleFlag;

  @IsEnum(ReInspectionAbleFlag)
  re_inspection_able_flag: ReInspectionAbleFlag;

  @IsEnum(BooleanNumber)
  interval_flag_1: BooleanNumber;

  @IsEnum(BooleanNumber)
  interval_flag_2: BooleanNumber;

  @IsEnum(BooleanNumber)
  certificate_delivery_flag: BooleanNumber;

  @IsEnum(BooleanNumber)
  ns_result_send_flag: BooleanNumber;

  @IsNumber()
  estimated_time: number;

  @IsEnum(ReInspectionAssignMethod)
  re_inspection_assign_method: ReInspectionAssignMethod;

  @IsEnum(BooleanNumber)
  external_inspector_flag: BooleanNumber;

  @IsEnum(BooleanNumber)
  self_assignable_flag: BooleanNumber;

  @IsEnum(BooleanNumber)
  certificate_issue_flag: BooleanNumber;
}

export class UpdateTypeDto {
  @IsString()
  @IsNotEmpty()
  category_code: string;

  @IsString()
  @IsNotEmpty()
  group_code: string;

  @IsString()
  @IsNotEmpty()
  inspection_code: string;

  @IsEnum(InspectionAssignMethod)
  inspection_assign_method: InspectionAssignMethod;

  @IsEnum(VisitAbleFlag)
  visit_able_flag: VisitAbleFlag;

  @IsEnum(ReInspectionAbleFlag)
  re_inspection_able_flag: ReInspectionAbleFlag;

  @IsEnum(BooleanNumber)
  interval_flag_1: BooleanNumber;

  @IsEnum(BooleanNumber)
  interval_flag_2: BooleanNumber;

  @IsEnum(BooleanNumber)
  certificate_delivery_flag: BooleanNumber;

  @IsEnum(BooleanNumber)
  ns_result_send_flag: BooleanNumber;

  @IsNumber()
  estimated_time: number;

  @IsEnum(ReInspectionAssignMethod)
  re_inspection_assign_method: ReInspectionAssignMethod;

  @IsEnum(BooleanNumber)
  external_inspector_flag: BooleanNumber;

  @IsEnum(BooleanNumber)
  self_assignable_flag: BooleanNumber;

  @IsEnum(BooleanNumber)
  certificate_issue_flag: BooleanNumber;
}
