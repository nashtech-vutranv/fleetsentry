import { IsArray, IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { MyValidateNested } from "src/core/decorators";
import { Type, Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
export class UpdateInspectionDto {
  @ApiProperty({ required: true })
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  id: number;

  @IsOptional()
  @IsString()
  inspection_result?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => ["true", true].indexOf(value) > -1)
  approval_status?: boolean;
}
export class UpdateVehicalDto {
  @ApiProperty({ required: false, enum: [{ id: 1, inspection_result: "pass", approval_status: true }] })
  @IsOptional()
  @IsArray()
  @MyValidateNested({ each: true })
  @Type(() => UpdateInspectionDto)
  items?: UpdateInspectionDto[];
}
