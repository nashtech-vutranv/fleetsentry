import { IsInt, IsOptional, Min } from "class-validator";

export class CreateInspectorQualificationDto {
  @IsInt()
  inspector_id: number;

  @IsInt()
  inspection_type_id: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  approval_permission_flag: number;
}
