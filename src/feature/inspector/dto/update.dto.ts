import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsInt, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateInspectorQualificationDto } from "src/feature/inspector/qualification/dto";

export class InspectorUpdateInputDto {
  @ApiProperty({ description: "The updated user ID of the inspector", example: 1 })
  @IsOptional()
  @IsInt()
  user_id: number;

  @ApiProperty({ description: "The updated type code of the inspector", example: "Type B" })
  @IsOptional()
  @IsString()
  inspector_type_code: string;

  @ApiProperty({ description: "The updated visitable flag", example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  visit_able_flag: number;

  @ApiProperty({ description: "The updated internal inspector flag", example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  internal_inspector_flag: number;

  @ApiProperty({ description: "The updated default keyboard array", example: "AZERTY" })
  @IsOptional()
  @IsString()
  default_keyboard_array: string;

  @ApiProperty({ description: "The updated ID of the creator", example: 4, required: false })
  @IsOptional()
  @IsInt()
  created_by?: number;

  @ApiProperty({ description: "The updated ID of the updater", example: 5, required: false })
  @IsOptional()
  @IsInt()
  updated_by?: number;

  @ApiProperty({ required: false, isArray: true, type: Array, description: "Authority approved by INS" })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => CreateInspectorQualificationDto)
  authority_approved: CreateInspectorQualificationDto[];
}
