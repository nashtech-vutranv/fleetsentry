import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class InspectorDto {
  @ApiProperty({ description: "The user ID of the inspector", example: 1 })
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @ApiProperty({ description: "The type code of the inspector", example: "Type A" })
  @IsNotEmpty()
  @IsString()
  inspector_type_code: string;

  @ApiProperty({ description: "The visitable flag", example: 1 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  visit_able_flag: number;

  @ApiProperty({ description: "The internal inspector flag", example: 0 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  internal_inspector_flag: number;

  @ApiProperty({ description: "The ID of the creator", example: 2, required: false })
  @IsInt()
  created_by?: number;

  @ApiProperty({ description: "The ID of the updater", example: 3, required: false })
  @IsInt()
  updated_by?: number;
}
